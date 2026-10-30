// Os cinco tecidos da capa dura. As cores vivem só dentro do objeto, nunca na interface.
export const CORES_CAPA = [
  "vinho",
  "rosa-antigo",
  "nevoa",
  "petroleo",
  "floresta",
] as const;

export type CorCapa = (typeof CORES_CAPA)[number];

export const CAPAS: Record<
  CorCapa,
  { nome: string; tecido: string; escura: boolean }
> = {
  vinho: { nome: "vinho", tecido: "var(--vinho)", escura: true },
  "rosa-antigo": {
    nome: "rosa-antigo",
    tecido: "var(--rosa-antigo)",
    escura: false,
  },
  nevoa: { nome: "névoa", tecido: "var(--nevoa)", escura: false },
  petroleo: { nome: "petróleo", tecido: "var(--petroleo)", escura: true },
  floresta: { nome: "floresta", tecido: "var(--floresta)", escura: true },
};

// A capa da página: só o título e a foto. O nome de quem conta fica para o livro de cada família.
export const CAPA_PADRAO = {
  cor: "floresta" as CorCapa,
  title: "O que a vida me ensinou",
};
