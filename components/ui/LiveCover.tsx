import type { ReactNode } from "react";
import { BookCover, type BookCoverProps, type FotoCapa } from "./BookCover";
import { CAPA_PADRAO, type CorCapa } from "./capas";
import s from "./LiveCover.module.css";

type LiveCoverProps = {
  /** Foto ilustrativa na janela da capa; sem ela, a capa fica só com o título. */
  foto?: FotoCapa;
  /** O que fica encostado na capa (o áudio de WhatsApp do hero). */
  aparte?: ReactNode;
  className?: string;
  /** Posição da capa quando a raiz vira `contents` no grid do hero. */
  objetoClassName?: string;
  /** White label: o nome da casa no pé da capa, no lugar do monograma. */
  marca?: string;
  /** White label com a logo real da casa (residenciais cadastrados). */
  logo?: BookCoverProps["logo"];
  assinatura?: string;
  filete?: string;
  /** Tecido e título da capa; padrão floresta, "O que a vida me ensinou". */
  cor?: CorCapa;
  titulo?: string;
  /** Linha honesta sob a capa ("Simulação: …"). */
  legenda?: ReactNode;
};

/** A capa do hero: entreabre ao passar o mouse e mostra a borda das páginas. */
export function LiveCover({
  foto,
  aparte,
  className,
  objetoClassName,
  marca,
  logo,
  assinatura,
  filete,
  cor = CAPA_PADRAO.cor,
  titulo = CAPA_PADRAO.title,
  legenda,
}: LiveCoverProps) {
  return (
    <div className={[s.live, className].filter(Boolean).join(" ")}>
      <div className={[s.objeto, objetoClassName].filter(Boolean).join(" ")}>
        {/* O balão se posiciona pela capa, não pela legenda */}
        <div className="relative">
          <BookCover
            color={cor}
            title={titulo}
            photo={foto}
            marca={marca}
            logo={logo}
            assinatura={assinatura}
            filete={filete}
            size="xl"
            open
            live
          />
          {aparte ? <div className={s.aparte}>{aparte}</div> : null}
        </div>
        {legenda ? (
          <p className="text-pequeno text-tinta-2 mt-4">{legenda}</p>
        ) : null}
      </div>
    </div>
  );
}
