import { useId, type CSSProperties, type ReactNode } from "react";
import { FORMATO_LIVRO } from "@/lib/config";
import { Foto } from "./Foto";
import s from "./OpenBookSpread.module.css";

type Capitulo = {
  miolo?: undefined;
  /** Foto antiga da página esquerda. Sem ela, a página abre o capítulo com a pergunta. */
  foto?: { src: string; alt: string; objectPosition?: string };
  /** A pergunta que deu origem ao capítulo. */
  pergunta: string;
  /** Numeral romano do capítulo (é do livro, não da página). */
  numeral: string;
  titulo: string;
  ano: string;
  paragrafos: string[];
  pagina: number;
  /** O QR do capítulo, no alto da página direita. */
  qr: ReactNode;
  className?: string;
};

/** Outras páginas do livro (as mensagens da família): o miolo das duas folhas vem pronto. */
type Miolo = {
  miolo: { esquerda: ReactNode; direita: ReactNode; rotulo: string };
  pagina: number;
  className?: string;
};

type OpenBookSpreadProps = Capitulo | Miolo;

// Proporção de cada página, a mesma da capa
const [larguraCm, alturaCm] = (
  FORMATO_LIVRO.match(/\d+(?:[.,]\d+)?/g) ?? ["1", "1"]
).map((n) => Number(n.replace(",", ".")));

/**
 * O livro aberto numa página dupla: duas folhas sobre a capa, curvando para a dobra.
 * A sombra da dobra e a de contato com a mesa são desenhadas em SVG, dentro do objeto.
 */
export function OpenBookSpread(props: OpenBookSpreadProps) {
  const { pagina, className } = props;
  const id = useId();
  const estilo = {
    "--proporcao": `${larguraCm} / ${alturaCm}`,
  } as CSSProperties;

  return (
    <div
      className={[s.livro, className].filter(Boolean).join(" ")}
      style={estilo}
    >
      <svg
        className={s.chao}
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter
            id={`${id}-chao`}
            x="-20%"
            y="-80%"
            width="140%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>
        <rect
          x="3"
          y="6"
          width="94"
          height="8"
          rx="3"
          fill="var(--tinta)"
          opacity="0.32"
          filter={`url(#${id}-chao)`}
        />
      </svg>

      <div className={s.capa} aria-hidden />
      <div className={s.borda} aria-hidden />

      <div className={s.folhas}>
        {props.miolo ? (
          <>
            <div className={`${s.pagina} ${s.esquerda} ${s.mioloEsquerda}`}>
              {props.miolo.esquerda}
              <span className={s.folio} aria-hidden>
                {pagina - 1}
              </span>
            </div>
            <article
              className={`${s.pagina} ${s.direita}`}
              data-vira
              aria-label={props.miolo.rotulo}
            >
              {props.miolo.direita}
              <span className={s.folio} aria-hidden>
                {pagina}
              </span>
            </article>
          </>
        ) : (
          <Capitulo {...props} />
        )}

        <svg
          className={s.dobra}
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter
              id={`${id}-dobra`}
              x="-100%"
              y="-10%"
              width="300%"
              height="120%"
            >
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>
          <rect
            x="7"
            y="-4"
            width="6"
            height="108"
            fill="var(--tinta)"
            opacity="0.3"
            filter={`url(#${id}-dobra)`}
          />
          <rect
            x="9.6"
            y="-4"
            width="0.8"
            height="108"
            fill="var(--tinta)"
            opacity="0.25"
            filter={`url(#${id}-dobra)`}
          />
        </svg>
      </div>
    </div>
  );
}

/** As duas folhas de um capítulo: a foto (ou a pergunta) e a história com o QR. */
function Capitulo({
  foto,
  pergunta,
  numeral,
  titulo,
  ano,
  paragrafos,
  pagina,
  qr,
}: Capitulo) {
  return (
    <>
      <div className={`${s.pagina} ${s.esquerda}`}>
        {foto ? (
          <Foto
            src={foto.src}
            alt={foto.alt}
            tipo="antiga"
            proporcao="4 / 5"
            objectPosition={foto.objectPosition}
            sizes="(min-width: 1280px) 300px, 70vw"
            className={s.foto}
          />
        ) : (
          <p className={s.pergunta}>{pergunta}</p>
        )}
        <span className={s.folio} aria-hidden>
          {pagina - 1}
        </span>
      </div>

      <article
        className={`${s.pagina} ${s.direita}`}
        data-vira
        aria-label={`Capítulo ${numeral}: ${titulo}`}
      >
        <header className={s.cabeca}>
          <span className={s.numeral}>{numeral}</span>
          <span className={s.qr}>{qr}</span>
        </header>
        <h3 className={s.titulo}>{titulo}</h3>
        <p className={s.ano}>{ano}</p>
        <div className={s.texto}>
          {paragrafos.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <span className={s.folio} aria-hidden>
          {pagina}
        </span>
      </article>
    </>
  );
}
