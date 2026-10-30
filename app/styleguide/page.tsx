import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/ui/BookCover";
import { Button } from "@/components/ui/Button";
import type { CorCapa } from "@/components/ui/capas";
import { Container } from "@/components/ui/Container";
import { LiveCover } from "@/components/ui/LiveCover";
import { Logo } from "@/components/ui/Logo";
import { Section } from "@/components/ui/Section";
import { formatarPreco, IMAGES } from "@/lib/config";
import { fotoOuSepia } from "@/lib/imagens";

export const metadata: Metadata = {
  title: "Guia de estilo · Ecoa Memórias",
  robots: { index: false, follow: false },
};

// Capas de exemplo da spec (títulos e nomes fictícios).
const CAPAS_EXEMPLO: {
  title: string;
  author: string;
  color: CorCapa;
  photo?: string;
}[] = [
  {
    title: "Caminhos que percorri",
    author: "Antônio Ferreira",
    color: "vinho",
    photo: IMAGES.antigaTrabalho,
  },
  {
    title: "Da roça à cidade",
    author: "Lourdes Almeida",
    color: "nevoa",
    photo: IMAGES.antigaFazenda,
  },
  {
    title: "O que a vida me ensinou",
    author: "José Carlos Ribeiro",
    color: "floresta",
  },
  {
    title: "Histórias da nossa casa",
    author: "Maria Helena Costa",
    color: "petroleo",
    photo: IMAGES.antigaFlores,
  },
  {
    title: "Memórias de um caixeiro-viajante",
    author: "Geraldo Souza",
    color: "rosa-antigo",
    photo: IMAGES.antigaCasamento,
  },
];

const PALETA = [
  ["polen", "var(--polen)", "fundo"],
  ["papel", "var(--papel)", "superfícies"],
  ["tinta", "var(--tinta)", "texto"],
  ["floresta", "var(--floresta)", "o acento"],
  ["dourado", "var(--dourado)", "hot stamping e logo"],
] as const;

export default function Styleguide() {
  if (process.env.NODE_ENV === "production") notFound();

  const capas = CAPAS_EXEMPLO.map((c) => ({
    ...c,
    photo: c.photo ? fotoOuSepia(c.photo) : undefined,
  }));
  const [principal, ...demais] = [
    capas[2],
    capas[0],
    capas[1],
    capas[3],
    capas[4],
  ];

  const e = (ordem: number) => ({
    "data-entra": true,
    style: { "--ordem": ordem } as CSSProperties,
  });

  return (
    <main>
      <Container grid className="items-end pt-16 pb-8 md:pt-24">
        <div className="col-span-12 md:col-span-6">
          <Logo className="h-12 w-auto" />
          <h1 className="text-display mt-14 max-w-[13ch]">
            O guia de estilo da Ecoa
          </h1>
          <p className="mt-8 max-w-[44ch]">
            A página é o próprio livro. Aqui ficam o logo, a capa dura nas cinco
            cores, a capa ao vivo do hero e as peças básicas da página. Só
            existe em desenvolvimento.
          </p>
        </div>
        <div className="col-span-12 mt-10 md:col-span-6 md:mt-0 md:justify-self-end">
          <BookCover {...principal} size="xl" turn={30} />
        </div>
      </Container>

      <Section title="O logo, no pólen e na floresta" grid>
        <div
          className="col-span-12 mt-12 flex items-end md:col-span-6"
          {...e(1)}
        >
          <Logo className="h-auto w-full max-w-[420px]" />
        </div>
        <div
          className="rounded-ed bg-floresta col-span-12 mt-8 flex items-end p-8 md:col-span-6 md:mt-12 md:p-12"
          {...e(2)}
        >
          <Logo variant="floresta" className="h-auto w-full max-w-[360px]" />
        </div>
        <div className="col-span-12 mt-12 flex items-end gap-8" {...e(3)}>
          <Logo monograma className="h-24 w-24" />
          <Logo monograma className="h-12 w-12" />
          <Logo monograma className="h-6 w-6" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="Favicon" width={32} height={32} />
        </div>
      </Section>

      <Section title="Cinco capas sobre a mesa" grid>
        <div className="col-span-12 md:col-span-5">
          <p className="mt-6 max-w-[44ch]" {...e(1)}>
            Capa dura em tecido, lombada com título e nome, borda de páginas, um
            filete dourado em hot stamping e o monograma no pé.
          </p>
          <div {...e(2)}>
            <BookCover
              {...principal}
              size="xl"
              open
              className="mt-10 md:mt-16"
            />
          </div>
        </div>
        <ul className="col-span-12 mt-8 grid grid-cols-2 gap-x-4 md:col-span-7 md:mt-24 md:gap-x-10">
          {demais.map((c, i) => (
            <li
              key={c.title}
              className={i % 2 === 1 ? "mt-14 md:mt-16" : "md:-mt-4"}
              {...e(3 + i)}
            >
              <BookCover {...c} size="lg" turn={[22, 32, 26, 20][i]} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="A capa ao vivo do hero" grid>
        <p className="col-span-12 mt-6 max-w-[40ch] md:col-span-5" {...e(1)}>
          Escreva o nome de quem vai contar e escolha o tecido. O nome muda na
          capa e na lombada a cada tecla. Sem JavaScript, fica a capa floresta
          de José Carlos Ribeiro.
        </p>
        <div className="col-span-12 mt-10 md:col-span-7 md:mt-6" {...e(2)}>
          <LiveCover />
        </div>
      </Section>

      <Section title="Botões, tipos e cores" grid>
        <div
          className="col-span-12 mt-10 flex flex-wrap items-center gap-8 md:col-span-6"
          {...e(1)}
        >
          <Button href="#interesse" data-cta="styleguide">
            Tenho interesse
          </Button>
          <Button href="#perguntas" variant="link">
            Ver as perguntas
          </Button>
        </div>
        <div
          className="rounded-ed bg-floresta col-span-12 mt-8 flex items-center p-8 md:col-span-6 md:mt-10"
          {...e(2)}
        >
          <Button variant="invertido">Tenho interesse</Button>
        </div>

        <div className="col-span-12 mt-16 md:col-span-7" {...e(3)}>
          <p className="text-display">Capa dura</p>
          <p className="text-h2 mt-4">Um livro para segurar</p>
          <p className="text-destaque mt-4">{formatarPreco()} por livro</p>
          <p className="font-mao text-destaque mt-6">Vó, a gente te ama.</p>
          <p className="mt-4 max-w-[62ch]">
            Corpo em Newsreader, 19px, entrelinha 1,6. Frases curtas e
            calorosas, no máximo 62 caracteres por linha. Notas secundárias usam
            o tamanho pequeno, de 15px.
          </p>
        </div>
        <ul
          className="col-span-12 mt-16 grid grid-cols-2 gap-x-5 gap-y-8 md:col-span-5 md:grid-cols-1 md:gap-y-4"
          {...e(4)}
        >
          {PALETA.map(([nome, valor, uso]) => (
            <li key={nome} className="flex items-center gap-4">
              <span
                className="rounded-ed block h-14 w-14 shrink-0"
                style={{ background: valor }}
              />
              <span className="text-pequeno">
                {nome}
                <span className="text-tinta-2 block">{uso}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
