"use client";

import type { CSSProperties } from "react";
import { CAPA_PADRAO, CAPAS, type CorCapa } from "@/components/ui/capas";
import { useCapa } from "@/lib/capa";
import s from "./Estante.module.css";

type Lombada = { nome: string; cor: CorCapa; altura: number };

// As capas de exemplo da spec, em pé (nomes fictícios). Altura em % da maior.
const LOMBADAS: Lombada[] = [
  {
    nome: "Antônio Ferreira",
    cor: "vinho",
    altura: 92,
  },
  {
    nome: "Lourdes Almeida",
    cor: "nevoa",
    altura: 100,
  },
  {
    nome: "José Carlos Ribeiro",
    cor: "floresta",
    altura: 96,
  },
  {
    nome: "Maria Helena Costa",
    cor: "petroleo",
    altura: 90,
  },
  {
    nome: "Geraldo Souza",
    cor: "rosa-antigo",
    altura: 98,
  },
];

function LombadaEmPe({ l, sua }: { l: Lombada; sua?: boolean }) {
  return (
    <li
      className={s.lombada}
      data-escura={CAPAS[l.cor].escura || undefined}
      data-cor={l.cor}
      data-sua={sua || undefined}
      style={
        {
          "--tecido": CAPAS[l.cor].tecido,
          "--altura": `${l.altura}%`,
        } as CSSProperties
      }
    >
      <span className={s.filete} />
      {/* Na lombada estreita cabe o nome: é ele que se procura na estante */}
      <span className={s.letreiro}>{l.nome}</span>
    </li>
  );
}

/**
 * As cinco capas como lombadas numa estante. Se a capa ao vivo do hero foi usada,
 * o livro de quem visita entra na fileira, no meio delas.
 */
export function Estante() {
  const capa = useCapa();
  const sua: Lombada | null = capa.usada
    ? {
        nome: capa.nome.trim() || CAPA_PADRAO.author,
        cor: capa.cor,
        altura: 96,
      }
    : null;
  const fileira = sua ? LOMBADAS.filter((l) => l.cor !== sua.cor) : LOMBADAS;
  const meio = Math.ceil(fileira.length / 2);

  return (
    <div className={s.estante}>
      <p className="sr-only">
        {sua
          ? `Uma estante com livros de memórias, entre eles o de ${sua.nome}.`
          : "Uma estante com cinco livros de memórias, um de cada cor."}
      </p>
      <ul className={s.fileira} aria-hidden>
        {fileira.slice(0, meio).map((l) => (
          <LombadaEmPe key={l.cor} l={l} />
        ))}
        {sua ? <LombadaEmPe key={`sua-${sua.cor}`} l={sua} sua /> : null}
        {fileira.slice(meio).map((l) => (
          <LombadaEmPe key={l.cor} l={l} />
        ))}
      </ul>
      <div className={s.prateleira} aria-hidden />
    </div>
  );
}
