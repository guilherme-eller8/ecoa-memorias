"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Cabeçalho fixo: ao rolar, o fundo sobe um degrau de tom (polen → papel).
 * A troca é a opacidade de uma camada papel, nunca borda, blur ou sombra.
 */
export function CabecalhoTom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      el.toggleAttribute("data-rolado", scrollY > 8);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="group/cab bg-polen before:bg-papel sticky top-0 z-50 before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 data-rolado:before:opacity-100"
    >
      {children}
    </header>
  );
}
