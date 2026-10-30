import { CAPA_PADRAO, CAPAS } from "@/components/ui/capas";
import { MARCA, WHATSAPP_NUMERO } from "./config";
import type { ParaQuem } from "./lead-campos";
import type { Lead } from "./lead-schema";
import { registrarLead } from "./registrar-lead";

// O schema mora em ./lead-schema: o formulário o carrega só no envio.

export { NOME_CAPA_MAX, PARA_QUEM, type ParaQuem } from "./lead-campos";
export type { EntradaLead, Lead } from "./lead-schema";

const ARTIGO: Record<ParaQuem, string> = {
  pai: "meu pai",
  mãe: "minha mãe",
  avô: "meu avô",
  avó: "minha avó",
  tio: "meu tio",
  tia: "minha tia",
  amigo: "meu amigo",
  "outra pessoa": "outra pessoa",
};

// Na voz da Ecoa, falando com quem deixou o interesse.
const ARTIGO_SEU: Record<ParaQuem, string> = {
  pai: "o seu pai",
  mãe: "a sua mãe",
  avô: "o seu avô",
  avó: "a sua avó",
  tio: "o seu tio",
  tia: "a sua tia",
  amigo: "o seu amigo",
  "outra pessoa": "outra pessoa",
};

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
  lead: Pick<Lead, "nome" | "para_quem" | "capa_nome" | "capa_cor">,
): string {
  let texto = `Olá! Tenho interesse no livro da ${MARCA} para ${ARTIGO[lead.para_quem]}. Meu nome é ${lead.nome}.`;
  if (lead.capa_cor) {
    const autor = lead.capa_nome || CAPA_PADRAO.author;
    texto += ` A capa seria “${CAPA_PADRAO.title} · ${autor}”, em ${CAPAS[lead.capa_cor].nome}.`;
  }
  return texto;
}

/** Primeira mensagem da Ecoa para o lead, pré-preenchida no link do e-mail interno. */
export function mensagemPrimeiroContato(
  lead: Pick<Lead, "nome" | "para_quem">,
): string {
  const primeiroNome = lead.nome.split(/\s+/)[0];
  return `Olá, ${primeiroNome}! Aqui é da ${MARCA}. Recebemos o seu interesse no livro para ${ARTIGO_SEU[lead.para_quem]}. Posso te contar como funciona?`;
}

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
