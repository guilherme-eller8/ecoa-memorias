"use client";

import type { CSSProperties } from "react";
import { CAPA_PADRAO, CAPAS, type CorCapa } from "@/components/ui/capas";
import { useCapa } from "@/lib/capa";
import s from "./Estante.module.css";

type Lombada = { titulo: string; cor: CorCapa; altura: number };

// As capas de exemplo da spec, em pé, com o título na lombada. Altura em % da maior.
const LOMBADAS: Lombada[] = [
  { titulo: "Caminhos que percorri", cor: "vinho", altura: 92 },
  { titulo: "Da roça à cidade", cor: "nevoa", altura: 100 },
  { titulo: "O que a vida me ensinou", cor: "floresta", altura: 96 },
  { titulo: "Histórias da nossa casa", cor: "petroleo", altura: 90 },
  { titulo: "Memórias de estrada", cor: "rosa-antigo", altura: 98 },
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
      <span className={s.letreiro}>{l.titulo}</span>
    </li>
  );
}

/**
 * As cinco capas como lombadas numa estante. Se a cor foi escolhida na capa do hero,
 * esse livro sai um pouco da fileira, no meio dela.
 */
export function Estante() {
  const capa = useCapa();
  const sua: Lombada | null = capa.usada
    ? { titulo: CAPA_PADRAO.title, cor: capa.cor, altura: 96 }
    : null;
  const fileira = sua ? LOMBADAS.filter((l) => l.cor !== sua.cor) : LOMBADAS;
  const meio = Math.ceil(fileira.length / 2);

  return (
    <div className={s.estante}>
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
      <p className="text-pequeno mt-6">
        Cinco cores de tecido. A próxima pode ser a da sua família.
      </p>
    </div>
  );
}
