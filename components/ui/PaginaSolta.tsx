import { Foto } from "@/components/ui/Foto";
import { QrCode } from "@/components/ui/QrCode";
import s from "./PaginaSolta.module.css";

type PaginaSoltaProps = {
  /** Foto antiga do capítulo. Sem ela, fica só a folha da história. */
  foto?: { src: string; alt: string };
  numeral: string;
  titulo: string;
  ano: string;
  paragrafos: string[];
  pagina: number;
  className?: string;
};

/**
 * A primeira página do livro como chega no PDF: duas folhas A5 lado a lado, a foto numa e a história
 * inteira na outra, com o QR que toca a voz. No celular, uma folha só, com a foto no alto: duas folhas
 * de 170px deixariam o texto ilegível.
 */
export function PaginaSolta({
  foto,
  numeral,
  titulo,
  ano,
  paragrafos,
  pagina,
  className,
}: PaginaSoltaProps) {
  const imagem = (tamanho: string) =>
    foto ? (
      <Foto
        src={foto.src}
        alt={foto.alt}
        tipo="antiga"
        proporcao="4 / 5"
        sizes={tamanho}
        className={s.foto}
      />
    ) : null;

  return (
    <div className={[s.par, className].filter(Boolean).join(" ")}>
      {foto ? (
        <div className={`${s.moldura} ${s.ladoFoto}`} aria-hidden>
          <div className={`${s.folha} ${s.folhaFoto}`}>
            {imagem("(min-width: 768px) 220px, 1px")}
            <span className={`${s.folio} ${s.folioEsquerda}`}>{pagina}</span>
          </div>
        </div>
      ) : null}

      <div className={`${s.moldura} ${s.ladoTexto}`}>
        <article
          className={s.folha}
          aria-label={`Primeira página do livro: ${titulo}`}
        >
          <header className={s.cabeca}>
            <span className={s.numeral}>{numeral}</span>
            <span className={s.qr}>
              <QrCode />
              <span>ouça a voz</span>
            </span>
          </header>
          {/* No celular, a foto entra na própria folha */}
          {foto ? (
            <div className={s.fotoCelular}>
              {imagem("(min-width: 768px) 1px, 40vw")}
            </div>
          ) : null}
          <h4 className={s.titulo}>{titulo}</h4>
          <p className={s.ano}>{ano}</p>
          <div className={s.texto}>
            {paragrafos.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <span className={s.folio}>{foto ? pagina + 1 : pagina}</span>
        </article>
      </div>
    </div>
  );
}
