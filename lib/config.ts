// Fonte única de configuração. Preço, data, tiragem e contatos saem daqui;
// nenhum componente repete esses valores.

export const MARCA = "Ecoa Memórias";
export const EDICAO = "natal-2026";
export const LIVROS_NA_EDICAO = 10;
export const DATA_LIMITE = "2026-11-07"; // exibir como "7 de novembro"
export const PRECO_LIVRO = 397; // exibir como "R$ 397"
export const PRECO_EXEMPLAR_EXTRA = 149;
export const PARCELAS_MAX = 12;
export const FORMATO_LIVRO = "21 × 21 cm"; // placeholder
export const PAGINAS_LIVRO = 60; // placeholder
export const WHATSAPP_NUMERO = "55XXXXXXXXXXX"; // placeholder
export const EMAIL_CONTATO = "contato@ecoamemorias.com.br"; // placeholder

export const IMAGES = {
  passo2: "/images/passo-2-gravando.webp",
  passo4: "/images/passo-4-livro.webp",
  surpresa: "/images/surpresa-ceia.webp",
  antigaCasa: "/images/antiga-casa.webp",
  antigaCasamento: "/images/antiga-casamento.webp",
  antigaFazenda: "/images/antiga-fazenda.webp",
  antigaTrabalho: "/images/antiga-trabalho.webp",
  antigaFlores: "/images/antiga-flores.webp",
  antigaPraia: "/images/antiga-praia.webp",
} as const;

export type ImagemChave = keyof typeof IMAGES;

/** 397 → "R$ 397" (espaço inseparável, sem centavos quando inteiro). */
export function formatarPreco(valor: number): string {
  return `R$ ${valor.toLocaleString("pt-BR")}`;
}

/** "2026-11-07" → "7 de novembro". */
export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}
