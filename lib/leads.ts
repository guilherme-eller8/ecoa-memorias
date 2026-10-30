import { z } from "zod";
import { CAPA_PADRAO, CAPAS, CORES_CAPA } from "@/components/ui/capas";
import { MARCA, WHATSAPP_NUMERO } from "./config";

// Sem "server-only": o formulário valida no cliente, e a Server Action do Prompt 6 reusa o mesmo schema.

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

export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export type ResultadoLead =
  { status: "gravado"; url: string } | { status: "fallback"; url: string };

/**
 * Envia o interesse. Por enquanto não há backend: devolve sempre o fallback, o wa.me com a
 * mensagem pronta. No Prompt 6 o miolo vira a Server Action, que cai neste mesmo fallback
 * se qualquer passo falhar.
 */
export async function submitLead(lead: Lead): Promise<ResultadoLead> {
  return { status: "fallback", url: linkWhatsApp(mensagemWhatsApp(lead)) };
}
