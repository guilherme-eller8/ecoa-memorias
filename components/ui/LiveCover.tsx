import type { ReactNode } from "react";
import { BookCover, type FotoCapa } from "./BookCover";
import { CAPA_PADRAO } from "./capas";
import s from "./LiveCover.module.css";

type LiveCoverProps = {
  /** Foto ilustrativa na janela da capa; sem ela, a capa fica só com o título. */
  foto?: FotoCapa;
  /** O que fica encostado na capa (o áudio de WhatsApp do hero). */
  aparte?: ReactNode;
  className?: string;
  /** Posição da capa quando a raiz vira `contents` no grid do hero. */
  objetoClassName?: string;
};

/** A capa do hero, em floresta: entreabre ao passar o mouse e mostra a borda das páginas. */
export function LiveCover({
  foto,
  aparte,
  className,
  objetoClassName,
}: LiveCoverProps) {
  return (
    <div className={[s.live, className].filter(Boolean).join(" ")}>
      <div className={[s.objeto, objetoClassName].filter(Boolean).join(" ")}>
        <BookCover
          color={CAPA_PADRAO.cor}
          title={CAPA_PADRAO.title}
          photo={foto}
          size="xl"
          open
          live
        />
        {aparte ? <div className={s.aparte}>{aparte}</div> : null}
      </div>
    </div>
  );
}
