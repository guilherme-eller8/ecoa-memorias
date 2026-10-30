import { CAPAS } from "@/components/ui/capas";
import { MARCA, WHATSAPP_NUMERO } from "./config";
import type { Lead } from "./lead-schema";
import { registrarLead } from "./registrar-lead";

// O schema mora em ./lead-schema: o formulário o carrega só no envio.

export type { EntradaLead, Lead } from "./lead-schema";

/** "31999998888" → "(31) 99999-8888", também durante a digitação. */
export function mascararWhatsApp(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const corte = resto.length > 8 ? 5 : 4;
  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

export function mensagemWhatsApp(
  lead: Pick<Lead, "nome" | "capa_cor">,
): string {
  let texto = `Olá! Tenho interesse no livro da ${MARCA}. Meu nome é ${lead.nome}.`;
  if (lead.capa_cor) texto += ` Gostei da capa ${CAPAS[lead.capa_cor].nome}.`;
  return texto;
}

/** Primeira mensagem da Ecoa para o lead, pré-preenchida no link do e-mail interno. */
export function mensagemPrimeiroContato(lead: Pick<Lead, "nome">): string {
  const primeiroNome = lead.nome.split(/\s+/)[0];
  return `Olá, ${primeiroNome}! Aqui é da ${MARCA}. Recebemos o seu interesse no livro. Posso te contar como funciona?`;
}

/** Para quem prefere chamar direto, sem o formulário. */
export const MENSAGEM_CONVERSA = `Olá! Quero saber mais sobre o livro da ${MARCA}.`;

export function linkWhatsApp(
  texto: string,
  numero: string = WHATSAPP_NUMERO,
): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export type ResultadoLead =
  { status: "gravado"; url: string } | { status: "fallback"; url: string };

const UTMS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const ESPERA_MAX_MS = 10_000;

function utmsDaUrl(): Partial<Record<(typeof UTMS)[number], string>> {
  const busca = new URLSearchParams(window.location.search);
  const utms: Partial<Record<(typeof UTMS)[number], string>> = {};
  for (const chave of UTMS) {
    const valor = busca.get(chave);
    if (valor) utms[chave] = valor;
  }
  return utms;
}

/**
 * Envia o interesse pela Server Action. Se ela falhar, demorar demais ou não puder gravar,
 * o visitante cai no fallback: o wa.me com a mensagem pronta. Nunca vê erro técnico.
 */
export async function submitLead(lead: Lead): Promise<ResultadoLead> {
  const fallback: ResultadoLead = {
    status: "fallback",
    url: linkWhatsApp(mensagemWhatsApp(lead)),
  };
  try {
    const espera = new Promise<ResultadoLead>((resolve) =>
      setTimeout(() => resolve(fallback), ESPERA_MAX_MS),
    );
    return await Promise.race([
      registrarLead({ ...lead, ...utmsDaUrl() }),
      espera,
    ]);
  } catch {
    return fallback;
  }
}
