import type { CSSProperties } from "react";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { ASSINATURA_FUNDADOR, IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

type Livro = { src: string; legenda: string; alt: string };

// Fotos reais, não ilustrativas: por isso, e só aqui, as fotos levam nome.
const LIVROS: Livro[] = [
  {
    src: IMAGES.livroAvoJair,
    legenda: "O livro do meu avô Jair.",
    alt: "Mão segurando o livro de memórias de Jair Rocha, com a foto dele jovem na neve, de sobretudo e esquis, na capa",
  },
  {
    src: IMAGES.livroAvoNelma,
    legenda: "O livro da minha avó Nelma.",
    alt: "Mão segurando o livro de memórias da avó Nelma",
  },
];

// Por que a Ecoa existe, contado por quem faz: os livros dos dois avós e o que foi preciso para eles existirem.
export function OsLivrosDosAvos() {
  const livros = LIVROS.filter((l) => existeEmPublic(l.src));
  const dois = livros.length > 1;

  return (
    <Section
      id="origem"
      title="Nem toda família tem uma tia jornalista."
      grid
      titleClassName="lg:col-span-6! lg:col-start-7! lg:row-start-1 lg:self-end"
    >
      <div className="col-span-12 mt-8 md:mt-10 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start">
        <p className="text-destaque max-w-[30ch]" data-entra style={ordem(1)}>
          Tenho em casa os livros dos meus dois avós. Já li os dois, inteiros,
          duas vezes.
        </p>
        <div
          className="mt-6 max-w-[48ch] space-y-5"
          data-entra
          style={ordem(2)}
        >
          <p>
            O da minha avó Nelma saiu porque temos na família uma tia
            jornalista, e das experientes. O do meu avô Jair saiu porque ele era
            disciplinado, detalhista e decidido: resolveu que ia fazer, e fez.
          </p>
          <p>
            A maioria das famílias não tem nem uma coisa nem outra. E as
            histórias vão ficando para depois.
          </p>
          <p>
            A Ecoa faz o papel da tia jornalista: pergunta, lembra, ouve e
            edita. Quem conta só precisa falar.
          </p>
        </div>
        <p className="mt-6" data-entra style={ordem(3)}>
          <em>{ASSINATURA_FUNDADOR}</em>, neto da Nelma e do Jair
        </p>
      </div>

      {livros.length > 0 && (
        <div
          className={`col-span-12 mt-12 grid gap-6 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:w-full lg:self-center lg:justify-self-end ${
            dois
              ? "grid-cols-2 lg:max-w-[calc((100svh-240px)*1.5)]"
              : "max-w-[300px] sm:max-w-[360px] lg:max-w-[calc((100svh-240px)*0.75)]"
          }`}
          data-entra
          style={ordem(4)}
        >
          {livros.map((l, i) => (
            <figure key={l.src} className={dois && i === 1 ? "mt-16" : ""}>
              <Foto
                src={l.src}
                tipo="cena"
                proporcao="3 / 4"
                sizes="(min-width: 1024px) 380px, 80vw"
                alt={l.alt}
              />
              <figcaption className="text-pequeno mt-3">{l.legenda}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
