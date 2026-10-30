import type { CSSProperties, ReactNode } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { Foto } from "@/components/ui/Foto";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { Section } from "@/components/ui/Section";
import { WhatsAppChat } from "@/components/ui/WhatsAppChat";
import { IMAGES, SEMANAS_DE_PERGUNTAS } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
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

// Sem o arquivo, o momento fica só com o objeto desenhado: nunca um quadro vazio
const temCasa = existeEmPublic(IMAGES.antigaCasa);
const temFotoLivro = existeEmPublic(IMAGES.antigaFazenda);

const MOMENTOS: Momento[] = [
  {
    titulo: "Você dá a notícia.",
    texto:
      "Você convida quem vai contar as histórias a responder às perguntas por áudio, ou texto se preferir, no WhatsApp. Depois, mandamos as boas-vindas e só começamos quando a pessoa topar. As perguntas vêm da nossa seleção ou de você.",
    respiro: "lg:h-20",
    visual: temCasa ? (
      <div className="relative" style={{ aspectRatio: PROPORCAO }}>
        <Foto
          src={IMAGES.antigaCasa}
          tipo="antiga"
          proporcao={PROPORCAO}
          objectPosition="50% 62%"
          sizes={SIZES}
          alt="Foto antiga em preto e branco de uma família numerosa reunida no quintal, ao lado de uma casa pequena e de uma árvore grande"
          className="h-full w-full"
        />
        <QuestionCard
          pergunta="Como era a casa onde o senhor cresceu?"
          rotate={-3}
          className="absolute right-[-3%] bottom-[-14%] w-[94%]"
        />
      </div>
    ) : (
      <QuestionCard
        pergunta="Como era a casa onde o senhor cresceu?"
        rotate={-3}
        className="w-[94%]"
      />
    ),
  },
  {
    titulo: "A resposta é um áudio. A família ouve.",
    texto:
      "Uma pergunta por dia útil, direto no WhatsApp, sem aplicativo nem senha. Cada história gravada chega no mesmo dia a um grupo só da família.",
    respiro: "lg:h-[140px]",
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
    titulo: "Você revisa antes de imprimir.",
    texto:
      "Editamos as histórias e mandamos a prova do livro em PDF. Você lê com calma, pede os ajustes, e só imprimimos com o seu ok.",
    respiro: "lg:h-[100px]",
    visual: (
      <div>
        <WhatsAppChat
          variant="individual"
          titulo="Ecoa Memórias"
          subtitulo="online"
          mensagens={[
            {
              tipo: "texto",
              texto:
                "A prova do livro está pronta, em PDF. Leia com calma e diga o que ajustar.",
              hora: "10:30",
            },
            {
              tipo: "texto",
              minha: true,
              texto:
                "Só corrige o nome da tia: é Lurdes, com U. O resto, pode imprimir!",
              hora: "21:47",
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
      <div className="pt-2 pl-[6%]">
        <BookCover
          color="vinho"
          title="Caminhos que percorri"
          photo={temFotoLivro ? IMAGES.antigaFazenda : undefined}
          size="md"
          turn={22}
        />
      </div>
    ),
  },
];

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

export function ComoFunciona() {
  return (
    <Section id="como-funciona" title="Tudo acontece no WhatsApp." grid>
      <Trilha marcas={["Dia 1", `Semana ${SEMANAS_DE_PERGUNTAS}`, "Natal"]}>
        <ol className="flex w-max gap-5 md:grid md:w-auto md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4 lg:gap-8">
          {MOMENTOS.map((m, i) => (
            <li
              key={m.titulo}
              className="w-[78vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none"
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
