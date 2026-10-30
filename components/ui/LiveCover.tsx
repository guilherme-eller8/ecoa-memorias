"use client";

import { useId, type CSSProperties } from "react";
import { definirCor, definirNome, useCapa } from "@/lib/capa";
import { BookCover } from "./BookCover";
import { CAPA_PADRAO, CAPAS, CORES_CAPA } from "./capas";
import s from "./LiveCover.module.css";

export const NOME_MAX = 28;

type LiveCoverProps = {
  className?: string;
};

/**
 * A capa do hero: quem visita escreve o nome de quem vai contar e escolhe o tecido.
 * Sem JS, fica a capa estática "O que a vida me ensinou · José Carlos Ribeiro", em floresta.
 */
export function LiveCover({ className }: LiveCoverProps) {
  const { nome, cor } = useCapa();
  const campoId = useId();
  const autor = nome.trim() || CAPA_PADRAO.author;

  return (
    <div className={[s.live, className].filter(Boolean).join(" ")}>
      <BookCover
        color={cor}
        title={CAPA_PADRAO.title}
        author={autor}
        size="xl"
        open
        live
      />

      <div className={s.controles}>
        <label htmlFor={campoId} className={s.rotulo}>
          De quem são as histórias?
        </label>
        <input
          id={campoId}
          className={s.campo}
          type="text"
          value={nome}
          maxLength={NOME_MAX}
          placeholder="Vó Lourdes"
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => definirNome(e.target.value.slice(0, NOME_MAX))}
        />

        <div className={s.lombadas} role="group" aria-label="Cor da capa">
          {CORES_CAPA.map((c) => (
            <button
              key={c}
              type="button"
              className={s.lombada}
              style={{ "--tecido": CAPAS[c].tecido } as CSSProperties}
              aria-pressed={cor === c}
              aria-label={`Capa ${CAPAS[c].nome}`}
              onClick={() => definirCor(c)}
            >
              <span className={s.lombadaFilete} aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
