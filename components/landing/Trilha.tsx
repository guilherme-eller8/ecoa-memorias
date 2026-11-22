import type { ReactNode } from "react";

type TrilhaProps = {
  marcas: string[];
  children: ReactNode;
};

/**
 * A barra de 6px "Antes do Natal → 26 de dezembro → O livro" e os quatro momentos.
 * No celular os momentos descem em lista, só com o texto; do tablet para cima ficam em grade.
 * Nada rola de lado: quem lê pelo celular vê os quatro sem precisar deslizar.
 */
export function Trilha({ marcas, children }: TrilhaProps) {
  return (
    <>
      <div className="col-span-12 mt-8 md:mt-10" aria-hidden>
        <span className="rounded-ed block h-1.5 bg-[color-mix(in_oklab,var(--tinta)_12%,var(--polen))]" />
        {/* No celular as marcas descem ao tamanho pequeno: as três cabem em 390px sem cortar */}
        <span className="text-pequeno md:text-corpo mt-3 flex justify-between gap-4">
          {marcas.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </span>
      </div>
      <div className="col-span-12 mt-8 md:mt-14">{children}</div>
    </>
  );
}
