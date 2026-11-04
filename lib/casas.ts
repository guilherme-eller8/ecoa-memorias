import type { CorCapa } from "@/components/ui/capas";

/**
 * Casas com a logo real na página /residenciais?casa=<slug>. Casa nova: uma entrada aqui
 * e o PNG em /public/logos (passo a passo em docs/residenciais.md). Nada de CMS ou banco.
 */
export type Casa = {
  /** Como a casa é chamada no texto: "Preparado para a Santé". */
  nome: string;
  /** Nome inteiro, para o alt da logo. */
  nomeCompleto: string;
  /** Nome curto da assinatura no alto da capa ("Edição …"); padrão `nome`. */
  nomeCapa?: string;
  /** "a Santé" / "o Residencial X": vira "da Santé", "do Residencial X". */
  artigo: "a" | "o";
  /** PNG com fundo transparente, nas dimensões reais do arquivo (zero layout shift). */
  logo: { src: string; width: number; height: number };
  /** Altura da logo na linha "Preparado para", em px; padrão 36. Logos altas pedem mais. */
  alturaNaLinha?: number;
  /** Cor principal da logo: só o filete da capa, dentro do objeto. */
  corMarca?: string;
  /** Tecido da capa que sustenta a logo (um dos cinco do design system). */
  capa: CorCapa;
  /** Morador fictício do título da capa: "Memórias de Lourdes". */
  morador: string;
};

export const CASAS: Record<string, Casa> = {
  sante: {
    nome: "Santé",
    nomeCompleto: "Santé Residencial Sênior",
    artigo: "a",
    // Do header do site deles (1024 px), fundo branco tirado por cor, sem redesenho
    logo: { src: "/logos/sante.png", width: 1018, height: 891 },
    corMarca: "#186B0C",
    // A logo é verde-escura: some no floresta, assenta na névoa
    capa: "nevoa",
    morador: "Lourdes",
  },
  alegria: {
    nome: "Residencial Alegria Sênior",
    nomeCompleto: "Residencial Alegria Sênior",
    nomeCapa: "Alegria Sênior",
    artigo: "o",
    // Enviada pelo Guilherme (1000 × 1608, fundo branco), fundo tirado por cor nas duas tintas.
    // O arquivo original já traz restos de marca d'água nas folhas bege: mantidos, sem retoque.
    logo: { src: "/logos/alegria.png", width: 760, height: 1448 },
    // Alta e de traço fino: com 36 px a casa vira um borrão
    alturaNaLinha: 64,
    corMarca: "#BC9983",
    // Traço cinza e folhas bege: some no escuro e no rosa-antigo, assenta na névoa
    capa: "nevoa",
    morador: "Lourdes",
  },
};
