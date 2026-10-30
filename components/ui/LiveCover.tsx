"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { definirCor, useCapa } from "@/lib/capa";
import { BookCover, type FotoCapa } from "./BookCover";
import { CAPA_PADRAO, CAPAS, CORES_CAPA } from "./capas";
import s from "./LiveCover.module.css";

type LiveCoverProps = {
  /** Foto ilustrativa na janela da capa; sem ela, a capa fica só com o título. */
  foto?: FotoCapa;
  /** O que fica encostado na capa (o áudio de WhatsApp do hero). */
  aparte?: ReactNode;
  className?: string;
  /** Posição da capa e dos controles quando a raiz vira `contents` no grid do hero. */
  objetoClassName?: string;
  controlesClassName?: string;
};

/**
 * A capa do hero: quem visita escolhe o tecido nas cinco lombadas.
 * Sem JS, fica a capa floresta, estática.
 */
export function LiveCover({
  foto,
  aparte,
  className,
  objetoClassName,
  controlesClassName,
}: LiveCoverProps) {
  const { cor } = useCapa();
  const rotuloId = useId();

  return (
    <div className={[s.live, className].filter(Boolean).join(" ")}>
      <div className={[s.objeto, objetoClassName].filter(Boolean).join(" ")}>
        <BookCover
          color={cor}
          title={CAPA_PADRAO.title}
          photo={foto}
          size="xl"
          open
          live
        />
        {aparte ? <div className={s.aparte}>{aparte}</div> : null}
      </div>

      <div
        className={[s.controles, controlesClassName].filter(Boolean).join(" ")}
      >
        <p id={rotuloId} className={s.rotulo}>
          Escolha a cor do tecido
        </p>
        <div className={s.lombadas} role="group" aria-labelledby={rotuloId}>
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
