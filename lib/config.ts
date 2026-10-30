// Fonte única de configuração. Preço, data, quantidades e contatos saem daqui.
export const MARCA = "Ecoa Memórias";
export const EDICAO = "natal-2026";
export const LIVROS_NA_EDICAO = 10;
export const DATA_LIMITE = "2026-11-07"; // exibir como "7 de novembro"
export const PRECO_LIVRO = 397; // exibir como "R$ 397"
export const PRECO_EXEMPLAR_EXTRA = 149;
export const PARCELAS_MAX = 12;
export const FORMATO_LIVRO = "21 × 21 cm"; // placeholder
export const PAGINAS_LIVRO = 80; // máximo, com fotos e histórias; referência interna, não aparece na página
export const WHATSAPP_NUMERO = "5531971454494";
export const EMAIL_CONTATO = "contato@ecoa-memorias.com.br"; // placeholder: a caixa ainda não existe
export const CNPJ = "00.000.000/0001-00"; // placeholder
export const CIDADE = "Belo Horizonte";
export const RESPONSAVEL = "Guilherme Rocha Eller Miranda";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/guilherme-eller-940ab583/";

// Endereço público do site (preview no WhatsApp e QR codes). Ordem: a variável que você define na
// Vercel; senão, o domínio de produção que a própria Vercel informa no build; senão, o local.
const URL_VERCEL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (URL_VERCEL ? `https://${URL_VERCEL}` : "http://localhost:3000");

// Enquanto o dado real não chega, o placeholder não aparece na página (nem link quebrado, nem CNPJ falso)
export const WHATSAPP_PRONTO = /^55\d{10,11}$/.test(WHATSAPP_NUMERO);
export const CNPJ_PRONTO = !CNPJ.startsWith("00.000.000");
export const SEMANAS_DE_PERGUNTAS = 4;

export const IMAGES = {
  surpresa: "/images/surpresa-ceia.webp",
  antigaCasa: "/images/antiga-casa.webp",
  antigaCasamento: "/images/antiga-casamento.webp",
  antigaFazenda: "/images/antiga-fazenda.webp",
  antigaTrabalho: "/images/antiga-trabalho.webp",
  antigaFlores: "/images/antiga-flores.webp",
  antigaPraia: "/images/antiga-praia.webp",
} as const;

export type ImagemChave = keyof typeof IMAGES;

// Loop mudo da faixa da surpresa (ilustrativo; a foto de mesmo nome é o pôster)
export const VIDEOS = {
  surpresa: "/video/surpresa.mp4",
} as const;

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** "2026-11-07" → "7 de novembro" */
export function formatarData(iso: string = DATA_LIMITE): string {
  const [, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]}`;
}

/** 397 → "R$ 397" */
export function formatarPreco(valor: number = PRECO_LIVRO): string {
  return `R$ ${valor.toLocaleString("pt-BR")}`;
}

/** 397 / 12 → "R$ 33,08" (parcelas sem juros) */
export function formatarParcela(
  valor: number = PRECO_LIVRO,
  parcelas: number = PARCELAS_MAX,
): string {
  return (valor / parcelas).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
