import { Foto } from "@/components/ui/Foto";
import { QrCode } from "@/components/ui/QrCode";
import s from "./PaginaSolta.module.css";

type PaginaSoltaProps = {
  /** Foto antiga do capítulo. Sem ela, a folha fica só com o texto e o QR. */
  foto?: { src: string; alt: string };
  titulo: string;
  ano: string;
  texto: string;
  pagina: number;
  className?: string;
};

/** Uma página do livro, solta: o caso contado na mesa, já editado, com foto e o QR que toca a voz. */
export function PaginaSolta({
  foto,
  titulo,
  ano,
  texto,
  pagina,
  className,
}: PaginaSoltaProps) {
  return (
    <div className={[s.moldura, className].filter(Boolean).join(" ")}>
      <article
        className={s.folha}
        aria-label={`Primeira página do livro: ${titulo}`}
      >
        <header className={s.cabeca}>
          {foto ? (
            <Foto
              src={foto.src}
              alt={foto.alt}
              tipo="antiga"
              proporcao="4 / 5"
              sizes="(min-width: 1024px) 160px, 40vw"
              className={s.foto}
            />
          ) : (
            <span />
          )}
          <span className={s.qr}>
            <QrCode />
            <span>ouça a voz</span>
          </span>
        </header>
        <h4 className={s.titulo}>{titulo}</h4>
        <p className={s.ano}>{ano}</p>
        <p className={s.texto}>{texto}</p>
        <span className={s.folio} aria-hidden>
          {pagina}
        </span>
      </article>
    </div>
  );
}
