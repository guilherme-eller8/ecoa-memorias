"use client";

import { useSyncExternalStore } from "react";
import { track } from "@vercel/analytics";
import { CAPA_PADRAO, type CorCapa } from "@/components/ui/capas";

// A cor escolhida na capa ao vivo. A seção 8 lê daqui para mostrar a capa no formulário.
// `usada` vira true na primeira troca: só então a capa entra no formulário.
export type EscolhaCapa = { cor: CorCapa; usada: boolean };

let estado: EscolhaCapa = { cor: CAPA_PADRAO.cor, usada: false };
const ouvintes = new Set<() => void>();
let personalizou = false;

export function definirCor(cor: CorCapa) {
  estado = { cor, usada: true };
  ouvintes.forEach((o) => o());
  // Uma vez por visita, com a cor
  if (!personalizou) {
    personalizou = true;
    track("capa_personalizada", { cor });
  }
}

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

const ler = () => estado;
const lerNoServidor = () => estado;

export function useCapa(): EscolhaCapa {
  return useSyncExternalStore(assinar, ler, lerNoServidor);
}
