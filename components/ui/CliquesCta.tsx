"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Todo elemento com data-cta conta um clique: um ouvinte só, no documento.
 * Envia apenas o nome do botão (header, hero, fecho, formulario...).
 */
export function CliquesCta() {
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cta]",
      );
      const cta = alvo?.dataset.cta;
      if (cta) track("cta_clicado", { cta });
    };
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}
