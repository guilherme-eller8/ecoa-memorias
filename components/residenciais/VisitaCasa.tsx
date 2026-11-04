"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/** Conta a visita uma vez, com o nome da casa do link: "abriu ontem, ligo hoje". */
export function VisitaCasa({ casa }: { casa: string }) {
  useEffect(() => {
    track("residenciais_visita", { casa });
  }, [casa]);
  return null;
}
