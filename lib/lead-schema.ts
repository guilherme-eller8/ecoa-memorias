import { z } from "zod";
import { CORES_CAPA } from "@/components/ui/capas";

// Sem "server-only": o formulário valida no cliente, e a Server Action reusa o mesmo schema.

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
