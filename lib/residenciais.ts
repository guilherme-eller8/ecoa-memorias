import { CASAS, type Casa } from "./casas";
import { MARCA } from "./config";
import { linkWhatsApp } from "./leads";

const MAX_NOME = 40;

/**
 * O nome da casa que vem no link (/residenciais?casa=...). Só texto curto e limpo:
 * letras, números, espaço e ' & . - ( ). Qualquer outra coisa sai; vazio vira undefined.
 */
export function nomeDaCasa(
  param: string | string[] | undefined,
): string | undefined {
  const bruto = Array.isArray(param) ? param[0] : param;
  if (!bruto) return undefined;
  const limpo = bruto
    .normalize("NFC")
    .replace(/[^\p{L}\p{N} '&.\-()]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NOME)
    .trim();
  return limpo.length >= 2 ? limpo : undefined;
}

/** A casa do link: o nome sempre; o cadastro (logo, capa) só para as casas em lib/casas.ts. */
export type CasaDoLink = { nome: string; cadastro?: Casa };

/** "Santé Residencial" → "sante residencial": compara slug e nome sem acento nem caixa. */
function chave(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * ?casa=sante (slug) ou ?casa=Santé (nome, o formato antigo) → a casa cadastrada, com logo.
 * Qualquer outro texto continua como antes: só o nome. Sem parâmetro, undefined.
 */
export function resolverCasa(
  param: string | string[] | undefined,
): CasaDoLink | undefined {
  const nome = nomeDaCasa(param);
  if (!nome) return undefined;
  const k = chave(nome);
  for (const [slug, casa] of Object.entries(CASAS)) {
    if (
      k === chave(slug) ||
      k === chave(casa.nome) ||
      k === chave(casa.nomeCompleto) ||
      (casa.nomeCapa !== undefined && k === chave(casa.nomeCapa))
    ) {
      return { nome: casa.nome, cadastro: casa };
    }
  }
  return { nome };
}

/** "da Santé", "do Residencial X"; sem cadastro, "de X". */
export function daCasa(casa: CasaDoLink): string {
  const artigo = casa.cadastro?.artigo;
  return `${artigo === "a" ? "da" : artigo === "o" ? "do" : "de"} ${casa.nome}`;
}

/** Onde fica o botão "Marcar uma conversa": vira o data-cta do clique. */
export type PosicaoConversa = "residenciais-hero" | "residenciais-fecho";

/** A mensagem do WhatsApp, já com o nome da casa quando o link trouxe. */
export function linkConversaResidencial(casa?: string): string {
  const texto = casa
    ? `Olá! Falo em nome de ${casa} e quero marcar uma conversa sobre o livro de memórias da ${MARCA} para os nossos moradores.`
    : `Olá! Trabalho num residencial e quero marcar uma conversa sobre o livro de memórias da ${MARCA} para os nossos moradores.`;
  return linkWhatsApp(texto);
}
