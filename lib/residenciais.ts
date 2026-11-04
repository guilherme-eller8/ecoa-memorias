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

/** Onde fica o botão "Marcar uma conversa": vira o data-cta do clique. */
export type PosicaoConversa = "residenciais-hero" | "residenciais-fecho";

/** A mensagem do WhatsApp, já com o nome da casa quando o link trouxe. */
export function linkConversaResidencial(casa?: string): string {
  const texto = casa
    ? `Olá! Falo em nome de ${casa} e quero marcar uma conversa sobre o livro de memórias da ${MARCA} para os nossos moradores.`
    : `Olá! Trabalho num residencial e quero marcar uma conversa sobre o livro de memórias da ${MARCA} para os nossos moradores.`;
  return linkWhatsApp(texto);
}
