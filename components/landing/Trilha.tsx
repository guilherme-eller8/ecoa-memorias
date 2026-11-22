import type { ReactNode } from "react";

type TrilhaProps = {
  marcas: string[];
  children: ReactNode;
};

/**
 * A barra de 6px "Na ceia → 26 de dezembro → O livro" e os três momentos.
 * Do tablet para cima, cada marca fica em cima do seu momento; no celular, os momentos descem em lista.
 * Nada rola de lado: quem lê pelo celular vê os quatro sem precisar deslizar.
 */
export function Trilha({ marcas, children }: TrilhaProps) {
  return (
    <>
      <div className="col-span-12 mt-8 md:mt-10" aria-hidden>
        <span className="rounded-ed block h-1.5 bg-[color-mix(in_oklab,var(--tinta)_12%,var(--polen))]" />
        {/* No celular as marcas descem ao tamanho pequeno: as três cabem em 390px sem cortar */}
        <span className="text-pequeno md:text-corpo mt-3 flex justify-between gap-4 md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
          {marcas.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </span>
      </div>
      <div className="col-span-12 mt-8 md:mt-14">{children}</div>
    </>
  );
}
