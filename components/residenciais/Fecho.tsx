import type { CSSProperties } from "react";
import { BookCover } from "@/components/ui/BookCover";
import type { CorCapa } from "@/components/ui/capas";
import { Section } from "@/components/ui/Section";
import { IMAGES, PILOTO_MORADORES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { BotaoConversa } from "./BotaoConversa";
import { ComCasa, type BuscaCasa } from "./ComCasa";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// Capas de exemplo da spec (nomes fictícios): cada morador, um livro, todos com a marca da casa.
const CAPAS: {
  title: string;
  author: string;
  color: CorCapa;
  photo: string;
  turn: number;
}[] = [
  {
    title: "Caminhos que percorri",
    author: "Antônio Ferreira",
    color: "vinho",
    photo: IMAGES.antigaPraia,
    turn: -8,
  },
  {
    title: "Da roça à cidade",
    author: "Lourdes Almeida",
    color: "nevoa",
    photo: IMAGES.antigaFlores,
    turn: 0,
  },
  {
    title: "Histórias da nossa casa",
    author: "Maria Helena Costa",
    color: "petroleo",
    photo: IMAGES.antigaCasa,
    turn: 8,
  },
];

const TECIDOS_CLAROS: CorCapa[] = ["rosa-antigo", "nevoa"];

// O fecho: o único momento centralizado, no campo floresta.
export function Fecho({ busca }: { busca: BuscaCasa }) {
  return (
    <Section
      title="Vamos conversar na sua casa."
      tone="floresta"
      className="tecido text-center"
      titleClassName="mx-auto max-w-[20ch]!"
    >
      <p
        className="text-destaque mx-auto mt-5 max-w-[34ch] md:mt-6"
        data-entra
        style={ordem(1)}
      >
        Uma visita de uma hora. Se fizer sentido, começamos com um piloto de{" "}
        <span className="whitespace-nowrap">
          {PILOTO_MORADORES.min} a {PILOTO_MORADORES.max} moradores
        </span>
        .
      </p>
      <div className="mt-10 md:mt-12" data-entra style={ordem(2)}>
        <ComCasa busca={busca}>
          {(casa) => (
            <BotaoConversa
              casa={casa?.nome}
              posicao="residenciais-fecho"
              variant="invertido"
            />
          )}
        </ComCasa>
      </div>
      <ul
        className="mx-auto mt-16 flex max-w-[880px] items-end justify-center gap-[4%] md:mt-20"
        aria-hidden
        data-entra
        style={ordem(3)}
      >
        <ComCasa busca={busca}>
          {(casa) =>
            CAPAS.map((c, i) => (
              <li key={c.color} className="w-[30%]">
                <BookCover
                  // Com a logo real, tecidos claros: a logo de uma casa pode sumir no escuro
                  color={casa?.cadastro ? TECIDOS_CLAROS[i % 2] : c.color}
                  title={c.title}
                  author={c.author}
                  photo={existeEmPublic(c.photo) ? c.photo : undefined}
                  marca={casa?.nome ?? "Sua casa"}
                  logo={casa?.cadastro?.logo}
                  filete={casa?.cadastro?.corMarca}
                  turn={c.turn}
                  size="md"
                />
              </li>
            ))
          }
        </ComCasa>
      </ul>
    </Section>
  );
}
