import type { CSSProperties, ReactNode } from "react";
import { Foto } from "@/components/ui/Foto";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { Section } from "@/components/ui/Section";
import { WhatsAppChat } from "@/components/ui/WhatsAppChat";
import { IMAGES, SEMANAS_DE_PERGUNTAS } from "@/lib/config";
import { Trilha } from "./Trilha";

const SIZES = "(min-width: 1024px) 300px, 78vw";
const PROPORCAO = "4 / 3";

type Momento = {
  titulo: string;
  texto: string;
  /** Espaço entre o texto e a imagem no desktop: as imagens sobem e descem na fileira. */
  respiro: string;
  visual: ReactNode;
};

const MOMENTOS: Momento[] = [
  {
    titulo: "Escolha as perguntas.",
    texto:
      "Da nossa seleção ou escritas por você. Infância, casamento, trabalho, fé, a casa onde cresceu.",
    respiro: "lg:h-20",
    visual: (
      <div className="relative" style={{ aspectRatio: PROPORCAO }}>
        <Foto
          src={IMAGES.antigaCasa}
          tipo="antiga"
          proporcao={PROPORCAO}
          objectPosition="50% 62%"
          sizes={SIZES}
          alt="Foto antiga em preto e branco de uma família diante de uma casa pequena com portão e uma mangueira, numa cidade do interior de Minas"
          className="h-full w-full"
        />
        <QuestionCard
          pergunta="Como era a casa onde o senhor cresceu?"
          rotate={-3}
          className="absolute right-[-3%] bottom-[-14%] w-[94%]"
        />
      </div>
    ),
  },
  {
    titulo: "A pergunta chega. A resposta é um áudio.",
    texto:
      "Uma pergunta por dia, direto no WhatsApp. Sem aplicativo, sem senha, sem escrever nada.",
    respiro: "lg:h-[140px]",
    visual: (
      <Foto
        src={IMAGES.passo2}
        tipo="cena"
        proporcao={PROPORCAO}
        objectPosition="45% 38%"
        sizes={SIZES}
        alt="Senhor de cabelos grisalhos, sentado à mesa da cozinha, grava um áudio no celular e sorri ao lembrar de algo"
      />
    ),
  },
  {
    titulo: "A família ouve no mesmo dia.",
    texto:
      "Cada história gravada chega a um grupo só da família. Ouvir vira o melhor momento da semana.",
    respiro: "lg:h-[100px]",
    visual: (
      <div>
        <WhatsAppChat
          variant="grupo"
          titulo="Histórias do Vô"
          subtitulo="Ana, Pedro, Júlia, você"
          mensagens={[
            {
              tipo: "audio",
              autor: "Ecoa Memórias",
              duracao: "2:14",
              legenda: "Capítulo 6 · A casa da Rua Bahia",
              hora: "19:02",
            },
            {
              tipo: "texto",
              autor: "Ana",
              texto: "não sabia disso",
              hora: "19:10",
            },
            {
              tipo: "texto",
              minha: true,
              texto: "que saudade dessa casa",
              hora: "19:14",
            },
          ]}
        />
      </div>
    ),
  },
  {
    titulo: "O livro chega antes do Natal.",
    texto:
      "Com as histórias, as fotos e as mensagens da família, que chegam como surpresa.",
    respiro: "lg:h-[120px]",
    visual: (
      <Foto
        src={IMAGES.passo4}
        tipo="cena"
        proporcao={PROPORCAO}
        objectPosition="50% 58%"
        sizes={SIZES}
        alt="Mãos de uma senhora seguram, no colo, um livro de capa dura verde-escura com um filete dourado"
      />
    ),
  },
];

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

export function ComoFunciona() {
  return (
    <Section id="como-funciona" title="Tudo acontece no WhatsApp." grid>
      <Trilha marcas={["Dia 1", `Semana ${SEMANAS_DE_PERGUNTAS}`, "Natal"]}>
        <ol className="flex w-max gap-5 lg:grid lg:w-auto lg:grid-cols-4 lg:gap-8">
          {MOMENTOS.map((m, i) => (
            <li
              key={m.titulo}
              className="w-[78vw] max-w-[360px] shrink-0 snap-start lg:w-auto lg:max-w-none"
              data-entra
              style={ordem(1 + i)}
            >
              <h3 className="text-destaque max-w-[16ch]">{m.titulo}</h3>
              <p className="mt-3 max-w-[30ch]">{m.texto}</p>
              <div className={`h-6 ${m.respiro}`} aria-hidden />
              {m.visual}
            </li>
          ))}
        </ol>
      </Trilha>

      <p className="col-span-12 mt-6 max-w-[62ch] md:mt-16 lg:mt-24" data-entra>
        Você escolhe as perguntas e conta a novidade. Os envios, os lembretes e
        a edição ficam com a gente.
      </p>
    </Section>
  );
}
