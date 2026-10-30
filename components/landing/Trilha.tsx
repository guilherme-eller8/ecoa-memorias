"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TrilhaProps = {
  marcas: string[];
  children: ReactNode;
};

/**
 * A barra de 6px "Dia 1 → Semana 4 → Natal" e a fileira dos quatro momentos.
 * No celular a fileira rola na horizontal e a barra mostra quanto já se viu.
 * Sem JS, a barra fica parada num quarto, e a fileira rola do mesmo jeito.
 */
export function Trilha({ marcas, children }: TrilhaProps) {
  const fileira = useRef<HTMLDivElement>(null);
  const preenchida = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = fileira.current;
    const barra = preenchida.current;
    if (!el || !barra) return;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const visto = el.scrollWidth
        ? (el.scrollLeft + el.clientWidth) / el.scrollWidth
        : 1;
      barra.style.transform = `scaleX(${Math.min(1, visto)})`;
    };
    const pedir = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    el.addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    return () => {
      el.removeEventListener("scroll", pedir);
      removeEventListener("resize", pedir);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <>
      <div className="col-span-12 mt-8 md:mt-10" aria-hidden>
        <span className="rounded-ed relative block h-1.5 overflow-hidden bg-[color-mix(in_oklab,var(--tinta)_12%,var(--polen))]">
          <span
            ref={preenchida}
            className="bg-floresta absolute inset-0 origin-left lg:hidden"
            style={{ transform: "scaleX(0.25)" }}
          />
        </span>
        <span className="mt-3 flex justify-between">
          {marcas.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </span>
      </div>
      <div
        ref={fileira}
        role="region"
        aria-label="Os quatro momentos"
        tabIndex={0}
        className="col-span-12 mt-10 snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto pb-12 md:mt-14 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </>
  );
}
