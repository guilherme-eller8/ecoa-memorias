"use client";

import { useSyncExternalStore } from "react";
import { track } from "@vercel/analytics";
import { CAPA_PADRAO, type CorCapa } from "@/components/ui/capas";

// Nome e cor escolhidos na capa ao vivo. A seção 8 lê daqui para pré-preencher o formulário.
// `usada` vira true na primeira mudança: só então a capa entra no formulário.
export type EscolhaCapa = { nome: string; cor: CorCapa; usada: boolean };

let estado: EscolhaCapa = { nome: "", cor: CAPA_PADRAO.cor, usada: false };
const ouvintes = new Set<() => void>();
let personalizou = false;

function mudar(parcial: Partial<Omit<EscolhaCapa, "usada">>) {
  estado = { ...estado, ...parcial, usada: true };
  ouvintes.forEach((o) => o());
  // Uma vez por visita, só com a cor. O nome digitado nunca sai do navegador.
  if (!personalizou) {
    personalizou = true;
    track("capa_personalizada", { cor: estado.cor });
  }
}

export const definirNome = (nome: string) => mudar({ nome });
export const definirCor = (cor: CorCapa) => mudar({ cor });

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

const ler = () => estado;
const lerNoServidor = () => estado;

export function useCapa(): EscolhaCapa {
  return useSyncExternalStore(assinar, ler, lerNoServidor);
}
