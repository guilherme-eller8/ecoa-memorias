import type { CSSProperties } from "react";
import { CAPAS, type CorCapa } from "@/components/ui/capas";
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

function LombadaEmPe({ l }: { l: Lombada }) {
  return (
    <li
      className={s.lombada}
      data-escura={CAPAS[l.cor].escura || undefined}
      data-cor={l.cor}
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

/** As cinco capas como lombadas numa estante. */
export function Estante() {
  return (
    <div className={s.estante}>
      <ul className={s.fileira} aria-hidden>
        {LOMBADAS.map((l) => (
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
