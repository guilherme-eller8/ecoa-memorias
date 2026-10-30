// Sem dependências: o formulário usa no primeiro render, sem trazer o zod para o bundle inicial.

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
