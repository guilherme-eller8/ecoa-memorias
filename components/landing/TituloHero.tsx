"use client";

import { useEffect, useState } from "react";
import s from "./TituloHero.module.css";

// Quem conta, com o artigo e o pronome que concordam com a pessoa. A primeira é a que aparece sem JS.
const QUEM = [
  { de: "do seu pai", voz: "dele" },
  { de: "da sua mãe", voz: "dela" },
  { de: "do seu avô", voz: "dele" },
  { de: "da sua avó", voz: "dela" },
  { de: "do seu tio", voz: "dele" },
  { de: "da sua tia", voz: "dela" },
];
const INTERVALO_MS = 2200;
// Duas voltas e para em "do seu pai": o título não fica se mexendo para sempre
const VOLTAS = 2;

/** Uma pilha de opções na mesma célula; só a ativa aparece. */
function Pilha({
  itens,
  ativa,
  anterior,
}: {
  itens: string[];
  ativa: number;
  anterior: number;
}) {
  return (
    <span className={s.pilha}>
      {itens.map((t, j) => (
        <span
          key={j}
          className={s.palavra}
          data-ativa={j === ativa || undefined}
          data-saiu={j === anterior || undefined}
        >
          {t}
        </span>
      ))}
    </span>
  );
}

/** "O livro do seu pai, na voz dele.", com a pessoa e o pronome trocando juntos. */
export function TituloHero({
  id,
  className,
}: {
  id: string;
  className: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    let passo = 0;
    const timer = setInterval(() => {
      passo += 1;
      setI(passo % QUEM.length);
      if (passo >= QUEM.length * VOLTAS) clearInterval(timer);
    }, INTERVALO_MS);
    return () => clearInterval(timer);
  }, []);

  const anterior = (i - 1 + QUEM.length) % QUEM.length;

  return (
    <h1 id={id} className={className}>
      <span className="sr-only">
        O livro do seu pai, da sua mãe, do seu avô, da sua avó, do seu tio ou da
        sua tia, na voz de quem viveu.
      </span>
      {/* A quebra depois da vírgula garante duas linhas em 390 e em 1440 */}
      <span aria-hidden>
        O livro{" "}
        <Pilha
          itens={QUEM.map((q) => `${q.de},`)}
          ativa={i}
          anterior={anterior}
        />
        <br />
        na voz{" "}
        <Pilha
          itens={QUEM.map((q) => `${q.voz}.`)}
          ativa={i}
          anterior={anterior}
        />
      </span>
    </h1>
  );
}
