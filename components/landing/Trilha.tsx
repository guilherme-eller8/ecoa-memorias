import type { ReactNode } from "react";

type TrilhaProps = {
  /** Cada marca com as colunas do seu momento no desktop, para ficar em cima dele. */
  marcas: { rotulo: string; colunas: string }[];
  children: ReactNode;
};

/**
 * A barra de 6px "Na ceia → 26 de dezembro → O livro" e os três momentos.
 * Do tablet para cima, cada marca fica em cima do seu momento; no celular, os momentos descem em lista.
 * Nada rola de lado: quem lê pelo celular vê os três sem precisar deslizar.
 */
export function Trilha({ marcas, children }: TrilhaProps) {
  return (
    <>
      <div className="col-span-12 mt-8 md:mt-10" aria-hidden>
        <span className="rounded-ed block h-1.5 bg-[color-mix(in_oklab,var(--tinta)_12%,var(--polen))]" />
        {/* No celular as marcas descem ao tamanho pequeno: as três cabem em 390px sem cortar */}
        <span className="text-pequeno md:text-corpo mt-3 flex justify-between gap-4 lg:grid lg:grid-cols-12 lg:gap-8">
          {marcas.map((m) => (
            <span key={m.rotulo} className={m.colunas}>
              {m.rotulo}
            </span>
          ))}
        </span>
      </div>
      <div className="col-span-12 mt-8 md:mt-14">{children}</div>
    </>
  );
}
