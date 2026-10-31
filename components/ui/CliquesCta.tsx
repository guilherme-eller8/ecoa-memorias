"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Todo elemento com data-cta conta um clique: um ouvinte só, no documento.
 * Envia apenas o nome do botão (formulario, rodape-whatsapp...). Os de interesse
 * (data-posicao) viram cta_interesse com a posição.
 */
export function CliquesCta() {
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cta]",
      );
      // Botões "Tenho interesse" (hero, preco, final) têm evento próprio
      const posicao = alvo?.dataset.posicao;
      if (posicao) return track("cta_interesse", { posicao });
      const cta = alvo?.dataset.cta;
      if (cta) track("cta_clicado", { cta });
    };
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}
