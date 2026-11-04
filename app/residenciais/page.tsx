import type { Metadata } from "next";
import { Cabecalho } from "@/components/residenciais/Cabecalho";
import { ComCasa } from "@/components/residenciais/ComCasa";
import { Cuidados } from "@/components/residenciais/Cuidados";
import { Fecho } from "@/components/residenciais/Fecho";
import { Hero } from "@/components/residenciais/Hero";
import { OQueMuda } from "@/components/residenciais/OQueMuda";
import { QuemFaz } from "@/components/residenciais/QuemFaz";
import { Rodape } from "@/components/residenciais/Rodape";
import { VisitaCasa } from "@/components/residenciais/VisitaCasa";
import { MARCA } from "@/lib/config";
import { resolverCasa } from "@/lib/residenciais";

const TITULO = `${MARCA} para residenciais`;
const DESCRICAO =
  "O livro de memórias de cada morador, contado por áudio no WhatsApp e entregue com a marca da sua casa. A Ecoa cuida do resto.";

// Página das casas: fora do Google e sem link a partir do site das famílias. Vai por link direto.
// O título do preview no WhatsApp leva o nome da casa do link; a imagem de OG é a mesma para todas.
export async function generateMetadata({
  searchParams,
}: PageProps<"/residenciais">): Promise<Metadata> {
  const casa = resolverCasa((await searchParams).casa);
  const titulo = casa
    ? `${MARCA} · proposta para ${casa.cadastro ? `${casa.cadastro.artigo} ` : ""}${casa.nome}`
    : TITULO;
  return {
    title: titulo,
    description: DESCRICAO,
    robots: { index: false, follow: false },
    alternates: { canonical: "/residenciais" },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "/residenciais",
      siteName: MARCA,
      title: titulo,
      description: DESCRICAO,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: DESCRICAO,
    },
  };
}

// /residenciais?casa=Residencial%20X: o nome vai para a capa, o grupo da família e o WhatsApp.
// Sem ele, "Sua casa". Só as peças com o nome esperam o link; o resto sai pronto do build.
export default function Residenciais({
  searchParams,
}: PageProps<"/residenciais">) {
  return (
    <div>
      <a
        href="#conteudo"
        className="bg-papel rounded-ed sr-only z-50 px-4 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:inline-flex focus:min-h-12 focus:items-center"
      >
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero busca={searchParams} />
        <OQueMuda />
        <QuemFaz busca={searchParams} />
        <Cuidados />
        <Fecho busca={searchParams} />
      </main>
      <Rodape busca={searchParams} />
      <ComCasa busca={searchParams}>
        {(casa) => (casa ? <VisitaCasa casa={casa.nome} /> : null)}
      </ComCasa>
    </div>
  );
}
