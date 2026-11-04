import { Suspense, type ReactNode } from "react";
import { nomeDaCasa } from "@/lib/residenciais";

/** Os parâmetros do link (/residenciais?casa=...), ainda por resolver. */
export type BuscaCasa = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  busca: BuscaCasa;
  children: (casa?: string) => ReactNode;
};

async function Resolvida({ busca, children }: Props) {
  return children(nomeDaCasa((await busca).casa));
}

/**
 * Só o que leva o nome da casa espera o link: a capa, o grupo e os botões. O resto da página
 * sai pronto do build, e a entrada das seções não perde os elementos trocados no stream.
 */
export function ComCasa({ busca, children }: Props) {
  return (
    <Suspense fallback={children(undefined)}>
      <Resolvida busca={busca}>{children}</Resolvida>
    </Suspense>
  );
}
