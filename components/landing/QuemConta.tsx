"use client";

import { useEffect, useState } from "react";
import s from "./QuemConta.module.css";

// Quem conta as histórias, uma pessoa de cada vez. A primeira é a que aparece sem JS.
const QUEM = ["Seu pai", "Sua mãe", "Seu tio", "Sua tia", "Sua avó", "Seu avô"];
const INTERVALO_MS = 2200;
// Duas voltas e para em "Seu pai": não fica se mexendo para sempre ao lado do texto
const VOLTAS = 2;

export function QuemConta() {
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
    <>
      <span className="sr-only">
        Seu pai, sua mãe, seu tio, sua tia, sua avó ou seu avô
      </span>
      <span className={s.pilha} aria-hidden>
        {QUEM.map((q, j) => (
          <span
            key={q}
            className={s.palavra}
            data-ativa={j === i || undefined}
            data-saiu={j === anterior || undefined}
          >
            {q}
          </span>
        ))}
      </span>
    </>
  );
}
