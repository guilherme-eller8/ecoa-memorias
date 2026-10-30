import type { CSSProperties, ReactNode } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { Foto } from "@/components/ui/Foto";
import { NoteCard } from "@/components/ui/NoteCard";
import { Section } from "@/components/ui/Section";
import { BalaoAudio } from "@/components/ui/WhatsAppChat";
import { IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

type Parte = { quem: string; texto: string; visual: ReactNode };

// Quem participa do livro: quem conta e a família, cada um pelo seu caminho, até o mesmo livro.
const PARTES: Parte[] = [
  {
    quem: "Quem conta",
    texto: "Responde às perguntas por áudio, no próprio ritmo.",
    visual: (
      <div className="grid gap-3">
        <BalaoAudio duracao="2:14" hora="10:12" />
        <BalaoAudio duracao="3:41" hora="09:30" className="ml-6" />
      </div>
    ),
  },
  {
    quem: "Filhos, netos e amigos",
    texto: "Mandam mensagens em segredo, em áudio ou por escrito.",
    visual: (
      <div className="relative h-full w-full max-w-[320px]">
        <NoteCard
          texto="Vô, até hoje eu lembro do..."
          rotate={-4}
          className="bg-papel! w-[86%]"
        />
        <NoteCard
          texto="Pai, obrigada por cada domingo..."
          rotate={3}
          className="bg-papel! absolute top-[48%] right-0 w-[80%]"
        />
      </div>
    ),
  },
  {
    quem: "O livro",
    texto:
      "Tudo junto, entregue no Natal. Quem contou as histórias só descobre ao abrir.",
    visual: (
      <BookCover
        color="vinho"
        title="Histórias da nossa casa"
        size="md"
        turn={20}
        className="[--w:200px]!"
      />
    ),
  },
];

/** Entre as partes: "+" entre quem conta e a família, seta até o livro. */
function Sinal({ tipo }: { tipo: "mais" | "seta" }) {
  return (
    <li
      aria-hidden
      className="text-h2 flex items-center justify-center py-6 leading-none lg:items-start lg:py-0 lg:pt-[76px]"
    >
      {tipo === "mais" ? (
        "+"
      ) : (
        <svg
          viewBox="0 0 48 24"
          className="h-6 w-12 rotate-90 lg:rotate-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12h42M36 5l8 7-8 7" />
        </svg>
      )}
    </li>
  );
}

function Peca({ parte }: { parte: Parte }) {
  return (
    <li data-entra-item>
      <div className="flex h-[200px] items-center">{parte.visual}</div>
      <h3 className="text-destaque mt-6">{parte.quem}</h3>
      <p className="mt-2 max-w-[30ch]">{parte.texto}</p>
    </li>
  );
}

export function ASurpresa() {
  const temFoto = existeEmPublic(IMAGES.surpresa);
  return (
    <Section
      title="No final, quem contou recebe uma surpresa."
      titleClassName="max-w-[30ch]!"
      grid
    >
      <p className="col-span-12 mt-6 max-w-[52ch]" data-entra style={ordem(1)}>
        Duas partes fazem o livro. Uma delas, quem conta só conhece no Natal:
        cada mensagem da família ganha uma página, com QR code para ouvir.
      </p>

      <ul
        className="col-span-12 mt-12 grid lg:mt-16 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-x-8"
        aria-label="Quem participa do livro"
        data-entra="lista"
        style={ordem(2)}
      >
        <Peca parte={PARTES[0]} />
        <Sinal tipo="mais" />
        <Peca parte={PARTES[1]} />
        <Sinal tipo="seta" />
        <Peca parte={PARTES[2]} />
      </ul>

      {temFoto ? (
        <div
          className="col-span-12 mt-14 lg:mt-20"
          data-entra="foto"
          style={ordem(3)}
        >
          <Foto
            src={IMAGES.surpresa}
            tipo="cena"
            proporcao="21 / 9"
            objectPosition="40% 50%"
            sizes="(min-width: 1280px) 1280px, 100vw"
            alt="Noite de Natal em casa: uma avó no sofá, emocionada, com a mão no peito, segura um livro de capa dura aberto; a filha a abraça e os netos se inclinam para ver"
            className="max-md:aspect-[4/5]!"
          />
        </div>
      ) : null}
    </Section>
  );
}
