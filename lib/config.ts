// Fonte única de configuração. Preço, data, número de livros e contatos
// nunca aparecem hardcoded em componentes: sempre importar daqui.

export const MARCA = "Ecoa Memórias";
export const EDICAO = "natal-2026";
export const LIVROS_NA_EDICAO = 10;
export const DATA_LIMITE = "2026-11-07"; // exibir com formatarData() → "7 de novembro"
export const PRECO_LIVRO = 397; // exibir com formatarPreco() → "R$ 397"
export const PRECO_EXEMPLAR_EXTRA = 149;
export const PARCELAS_MAX = 12;
export const WHATSAPP_NUMERO = "55XXXXXXXXXXX"; // placeholder
export const EMAIL_CONTATO = "contato@ecoamemorias.com.br"; // placeholder

// Ficha técnica do livro (placeholders da spec, seção 3)
export const FORMATO_LIVRO = "21 × 21 cm";
export const PAGINAS_LIVRO = 60;

// Mapa de docs/imagens.md
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

export type ImageKey = keyof typeof IMAGES;

const precoFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** 397 → "R$ 397" */
export function formatarPreco(valor: number): string {
  // Intl usa espaço não separável entre "R$" e o número; normaliza para espaço comum.
  return precoFormatter.format(valor).replace(/ /g, " ");
}

const dataFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

/** "2026-11-07" → "7 de novembro" */
export function formatarData(iso: string): string {
  return dataFormatter.format(new Date(`${iso}T00:00:00Z`));
}
