import type { CSSProperties } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { CAPA_PADRAO } from "@/components/ui/capas";
import { Section } from "@/components/ui/Section";
import { FORMATO_LIVRO, IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

type Nota = { titulo: string; texto: string };

// O que vem no livro, anotado em volta do objeto: duas notas de cada lado da capa.
const NOTAS: Nota[] = [
  {
    titulo: "Capa dura com a foto de quem conta",
    texto: "Numa das cinco cores, com o título que a família escolher.",
  },
  {
    titulo: "As histórias, sem perder o jeito de falar",
    texto: "Editadas com as fotos da família ao longo dos capítulos.",
  },
  {
    titulo: "Um QR code em cada história",
    texto: "Aponte o celular e ouça a voz original.",
  },
  {
    titulo: "No fim, as mensagens da família",
    texto:
      "Filhos, netos e amigos, em áudio ou por escrito, guardadas em segredo.",
  },
];

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

/** Seta desenhada à mão, do texto para a capa. */
function Seta({ lado }: { lado: "esquerda" | "direita" }) {
  return (
    <svg
      viewBox="0 0 64 24"
      className={`mt-3 hidden h-6 w-16 lg:block ${lado === "direita" ? "ml-auto" : "-scale-x-100"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 6c18 10 38 12 58 8" />
      <path d="M52 8l8 6-8 5" />
    </svg>
  );
}

function Anotacao({
  nota,
  lado,
}: {
  nota: Nota;
  lado: "esquerda" | "direita";
}) {
  return (
    <li className={lado === "direita" ? "lg:text-right" : undefined}>
      <p className="font-medium">{nota.titulo}</p>
      <p className="text-pequeno mt-1">{nota.texto}</p>
      <Seta lado={lado} />
    </li>
  );
}

export function OQueVoceRecebe() {
  const foto = existeEmPublic(IMAGES.antigaFlores)
    ? IMAGES.antigaFlores
    : undefined;
  return (
    <Section
      id="livro"
      title="Um livro para segurar. E vozes para ouvir sempre."
      grid
    >
      <ul
        className="col-span-12 mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:col-span-3 lg:mt-20 lg:grid-cols-1 lg:content-center lg:gap-y-16"
        data-entra
        style={ordem(1)}
      >
        {NOTAS.slice(0, 2).map((n) => (
          <Anotacao key={n.titulo} nota={n} lado="direita" />
        ))}
      </ul>

      <div
        className="col-span-12 row-start-2 mt-10 flex justify-center lg:col-span-6 lg:col-start-4 lg:row-start-2 lg:mt-16"
        data-entra
        style={ordem(2)}
      >
        <BookCover
          color={CAPA_PADRAO.cor}
          title={CAPA_PADRAO.title}
          photo={foto}
          size="xl"
          turn={24}
        />
      </div>

      <ul
        className="col-span-12 mt-8 grid gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:mt-20 lg:grid-cols-1 lg:content-center lg:gap-y-16"
        data-entra
        style={ordem(3)}
      >
        {NOTAS.slice(2).map((n) => (
          <Anotacao key={n.titulo} nota={n} lado="esquerda" />
        ))}
      </ul>

      <p className="text-pequeno col-span-12 mt-12 lg:mt-16" data-entra>
        Formato {FORMATO_LIVRO}. Os áudios originais ficam com a família, para
        sempre.
      </p>
    </Section>
  );
}
