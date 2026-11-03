// Fonte única de configuração. Preço, data, quantidades e contatos saem daqui.
export const MARCA = "Ecoa Memórias";
export const EDICAO = "natal-2026";
export const LIVROS_NA_EDICAO = 10;
// O começo acontece na ceia: perguntas antes do Natal e a primeira página, grátis, no dia 26
export const PERGUNTAS_DE_NATAL = 3; // exibir por extenso: "três perguntas"
export const DATA_PRIMEIRA_PAGINA = "2026-12-26"; // exibir como "26 de dezembro"
// Do "gostei" da primeira página ao livro pronto (perguntas, edição, prova, gráfica e frete)
export const PRAZO_LIVRO = "cerca de 2 meses";
export const PRECO_LIVRO = 467; // exibir como "R$ 467"
// Devolvido quando quem conta para no meio e a família prefere o livro em PDF, sem impressão
export const DEVOLUCAO_SEM_IMPRESSAO = 149;
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
// Versão dos Termos de Uso aceitos no formulário (gravada no lead). Mudou o texto, muda a data.
export const TERMOS_VERSAO = "2026-11-03";

export const IMAGES = {
  surpresa: "/images/surpresa-ceia.webp",
  antigaCasa: "/images/antiga-casa.webp",
  antigaCasamento: "/images/antiga-casamento.webp",
  antigaFazenda: "/images/antiga-fazenda.webp",
  antigaTrabalho: "/images/antiga-trabalho.webp",
  antigaFlores: "/images/antiga-flores.webp",
  antigaPraia: "/images/antiga-praia.webp",
  // Fotos das páginas "Mensagens da família" (ilustrativas)
  mensagemNeta: "/images/mensagem-neta.webp",
  mensagemFilho: "/images/mensagem-filho.webp",
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

/** "2026-12-26" → "26 de dezembro" */
export function formatarData(iso: string): string {
  const [, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]}`;
}

const POR_EXTENSO = [
  "zero",
  "uma",
  "duas",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
  "dez",
];

/** 3 → "três" (feminino, para "perguntas"; até dez) */
export function porExtenso(n: number): string {
  return POR_EXTENSO[n] ?? String(n);
}

/** "2026-11-02" → "2 de novembro de 2026" */
export function formatarDataComAno(iso: string): string {
  const [ano] = iso.split("-");
  return `${formatarData(iso)} de ${ano}`;
}

/** 467 → "R$ 467" */
export function formatarPreco(valor: number = PRECO_LIVRO): string {
  return `R$ ${valor.toLocaleString("pt-BR")}`;
}

/** 467 / 12 → "R$ 38,92" (parcelas sem juros) */
export function formatarParcela(
  valor: number = PRECO_LIVRO,
  parcelas: number = PARCELAS_MAX,
): string {
  return (valor / parcelas).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
