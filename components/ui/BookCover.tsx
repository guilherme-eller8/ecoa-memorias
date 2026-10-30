import Image from "next/image";
import { useId, type CSSProperties } from "react";
import { FORMATO_LIVRO } from "@/lib/config";
import { CAPAS, type CorCapa } from "./capas";
import {
  MONOGRAMA_ARCOS,
  MONOGRAMA_TRACO,
  MONOGRAMA_VIEWBOX,
} from "./logo-paths";
import s from "./BookCover.module.css";

/** Caminho da foto antiga, ou "sepia" enquanto a imagem não existe. */
export type FotoCapa = string;

export type BookCoverProps = {
  color: CorCapa;
  title: string;
  author: string;
  /** Foto antiga na janela da capa (decorativa: a capa inteira já tem nome acessível). */
  photo?: FotoCapa;
  /** Entreaberta: a capa gira na dobradiça e mostra a borda das páginas. */
  open?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  /** Capa do hero: abre mais ao passar o mouse ou ao focar. */
  live?: boolean;
  /** Giro do livro sobre a mesa, em graus (lombada à vista). */
  turn?: number;
  className?: string;
};

// "21 × 21 cm" → largura e altura da capa no desenho (a largura vale 100)
const [larguraCm, alturaCm] = (
  FORMATO_LIVRO.match(/\d+(?:[.,]\d+)?/g) ?? ["1", "1"]
).map((n) => Number(n.replace(",", ".")));
const ALTURA = (100 * alturaCm) / larguraCm;
const ESPESSURA = 7.5; // igual a --e no CSS, em % da largura

const LARGURA_FOTO: Record<NonNullable<BookCoverProps["size"]>, string> = {
  sm: "72px",
  md: "104px",
  lg: "140px",
  xl: "(max-width: 768px) 36vw, 210px",
};

// Letreiro da capa, em unidades do desenho (a largura da capa vale 100)
const M = 8; // margem
const TITULO = 8.2;
const ENTRELINHA = 8.8;
const AUTOR = 4.4;
const SELO = 3.6;
const LOMBADA = 2.9;

/** Quebra o título em até duas linhas equilibradas. */
function linhasDoTitulo(titulo: string, max = 18): string[] {
  if (titulo.length <= max) return [titulo];
  const palavras = titulo.split(" ");
  let melhor = [titulo];
  let maior = Infinity;
  for (let i = 1; i < palavras.length; i++) {
    const linhas = [
      palavras.slice(0, i).join(" "),
      palavras.slice(i).join(" "),
    ];
    const comprimento = Math.max(...linhas.map((l) => l.length));
    if (comprimento < maior) {
      maior = comprimento;
      melhor = linhas;
    }
  }
  return melhor;
}

export function BookCover({
  color,
  title,
  author,
  photo,
  open = false,
  size = "md",
  live = false,
  turn,
  className,
}: BookCoverProps) {
  const capa = CAPAS[color];
  const id = useId();
  const estilo = {
    "--tecido": capa.tecido,
    "--proporcao": `${larguraCm} / ${alturaCm}`,
    ...(turn !== undefined ? { "--giro": `${turn}deg` } : {}),
  } as CSSProperties;

  // Composição de baixo para cima: nome, filete, título
  const linhas = linhasDoTitulo(title);
  const yAutor = ALTURA - 16;
  const yFilete = yAutor - AUTOR * 0.72 - 2.9;
  const yUltimaLinha = yFilete - 4.2;

  return (
    <figure
      className={[s.livro, className].filter(Boolean).join(" ")}
      data-size={size}
      data-open={open || undefined}
      data-live={live || undefined}
      data-escura={capa.escura || undefined}
      style={estilo}
      role="img"
      aria-label={`Livro de capa dura ${capa.nome}: “${title}”, de ${author}`}
    >
      <div className={s.palco}>
        <div className={s.corpo}>
          {/* Sombra de contato: um plano deitado no chão, parte do próprio objeto */}
          <svg
            className={s.chao}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <filter
                id={`${id}-larga`}
                x="-30%"
                y="-40%"
                width="160%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter
                id={`${id}-contato`}
                x="-30%"
                y="-60%"
                width="160%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>
            <rect
              x="14"
              y="16"
              width="86"
              height="64"
              rx="10"
              fill="var(--tinta)"
              opacity="0.2"
              filter={`url(#${id}-larga)`}
            />
            <rect
              x="8"
              y="22"
              width="80"
              height="40"
              rx="3"
              fill="var(--tinta)"
              opacity="0.42"
              filter={`url(#${id}-contato)`}
            />
          </svg>

          <div className={s.contracapa} />
          <div className={s.paginasTopo} />
          <div className={s.paginasLado} />
          <div className={s.miolo} />

          <div className={s.lombada}>
            <svg
              className={s.letreiro}
              viewBox={`0 0 ${ESPESSURA} ${ALTURA}`}
              aria-hidden
            >
              <text
                transform={`translate(${ESPESSURA / 2 - LOMBADA * 0.33} ${ALTURA / 2}) rotate(90)`}
                textAnchor="middle"
                fontSize={LOMBADA}
                className={s.tipo}
                style={{ fontVariationSettings: '"opsz" 12' }}
              >
                {title}
                <tspan dx={LOMBADA * 0.9} fontStyle="italic">
                  {author}
                </tspan>
              </text>
            </svg>
          </div>

          <div className={s.capa}>
            <svg
              className={s.chaoCapa}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <rect
                x="1"
                y="6"
                width="98"
                height="18"
                rx="4"
                fill="var(--tinta)"
                opacity="0.3"
                filter={`url(#${id}-contato)`}
              />
            </svg>
            <div className={s.capaBordaTopo} />
            <div className={s.capaBordaLado} />
            <div className={s.verso} />

            <div className={s.frente}>
              {photo ? (
                <span className={s.foto}>
                  {photo === "sepia" ? (
                    <span className={s.fotoSepia} />
                  ) : (
                    <span className={s.fotoImg}>
                      <Image
                        src={photo}
                        alt=""
                        fill
                        sizes={LARGURA_FOTO[size]}
                      />
                    </span>
                  )}
                </span>
              ) : null}

              {/* O letreiro é parte do desenho do objeto: escala com a capa, de inteiro */}
              <svg
                className={s.letreiro}
                viewBox={`0 0 100 ${ALTURA}`}
                aria-hidden
              >
                <g className={s.tipo}>
                  <text
                    x={M}
                    y={M + SELO * 0.8}
                    fontSize={SELO}
                    style={{ fontVariationSettings: '"opsz" 12' }}
                  >
                    Livro de memórias
                  </text>
                  <text
                    y={yUltimaLinha - (linhas.length - 1) * ENTRELINHA}
                    fontSize={TITULO}
                    fontWeight={500}
                    letterSpacing="-0.08"
                    style={{ fontVariationSettings: '"opsz" 36' }}
                  >
                    {linhas.map((linha, i) => (
                      <tspan key={i} x={M} dy={i === 0 ? 0 : ENTRELINHA}>
                        {linha}
                      </tspan>
                    ))}
                  </text>
                  <text
                    x={M}
                    y={yAutor}
                    fontSize={AUTOR}
                    fontStyle="italic"
                    style={{ fontVariationSettings: '"opsz" 16' }}
                  >
                    {author}
                  </text>
                </g>
                {/* Hot stamping: um único filete curto, forma preenchida */}
                <rect
                  x={M}
                  y={yFilete}
                  width={13}
                  height={0.55}
                  rx={0.15}
                  fill="var(--dourado)"
                />
                <svg
                  x={100 - 7 - 6}
                  y={ALTURA - 6.4 - 6}
                  width={6}
                  height={6}
                  viewBox={MONOGRAMA_VIEWBOX}
                >
                  <g
                    fill="none"
                    stroke="var(--dourado)"
                    strokeWidth={MONOGRAMA_TRACO}
                    strokeLinecap="round"
                  >
                    {MONOGRAMA_ARCOS.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                </svg>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
