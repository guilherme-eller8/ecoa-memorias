import { z } from "zod";
import { CAPA_PADRAO, CAPAS, CORES_CAPA } from "@/components/ui/capas";
import { MARCA, WHATSAPP_NUMERO } from "./config";
import { registrarLead } from "./registrar-lead";

// Sem "server-only": o formulário valida no cliente, e a Server Action reusa o mesmo schema.

export const PARA_QUEM = [
  "pai",
  "mãe",
  "avô",
  "avó",
  "tio",
  "tia",
  "amigo",
  "outra pessoa",
] as const;

export type ParaQuem = (typeof PARA_QUEM)[number];

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

export const NOME_CAPA_MAX = 28;

export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Escreva o seu nome.")
    .max(80, "Use até 80 caracteres."),
  whatsapp: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^\d{10,11}$/,
          "Confira o número, com DDD. Ex.: (31) 99999-9999",
        ),
    ),
  para_quem: z.enum(PARA_QUEM, "Escolha para quem seria o livro."),
  capa_nome: z.string().trim().max(NOME_CAPA_MAX).optional(),
  capa_cor: z.enum(CORES_CAPA).optional(),
  // Honeypot: gente de verdade não vê o campo, então ele chega vazio.
  site: z.string().max(0).optional(),
});

export type Lead = z.output<typeof leadSchema>;

const utm = z.string().trim().max(200).optional();

/**
 * O que a Server Action recebe. O honeypot aqui aceita texto, para a action poder descartar em
 * silêncio em vez de devolver erro de validação a um robô.
 */
export const entradaLeadSchema = leadSchema.extend({
  site: z.string().optional(),
  utm_source: utm,
  utm_medium: utm,
  utm_campaign: utm,
});

export type EntradaLead = z.input<typeof entradaLeadSchema>;

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
