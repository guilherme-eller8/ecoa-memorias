import type { CSSProperties, ReactNode } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { Foto } from "@/components/ui/Foto";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { Section } from "@/components/ui/Section";
import { WhatsAppChat } from "@/components/ui/WhatsAppChat";
import {
  DATA_PRIMEIRA_PAGINA,
  formatarData,
  IMAGES,
  PERGUNTAS_DE_NATAL,
  porExtenso,
  PRAZO_LIVRO,
  SEMANAS_DE_PERGUNTAS,
} from "@/lib/config";
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

const PRIMEIRA_PAGINA = formatarData(DATA_PRIMEIRA_PAGINA);
const PERGUNTAS = porExtenso(PERGUNTAS_DE_NATAL);
// "26 de dezembro" → "26": o título fala do dia, a trilha diz o mês
const DIA_PRIMEIRA_PAGINA = PRIMEIRA_PAGINA.split(" ")[0];

// O começo é na ceia: as perguntas antes do Natal, a gravação na mesa, a primeira página no dia 26
const MOMENTOS: Momento[] = [
  {
    titulo: `Antes do Natal, ${PERGUNTAS} perguntas.`,
    texto: `Você nos conta quem vai contar as histórias. Antes da ceia, você recebe ${PERGUNTAS} perguntas simples no WhatsApp, da nossa seleção ou suas.`,
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
    titulo: "Na ceia, a primeira história.",
    texto:
      "Alguém da mesa faz uma das perguntas. Quem conta responde e puxa os causos que quiser. Quem estiver ao lado grava no celular e manda para a gente, ou a própria pessoa responde por áudio no WhatsApp.",
    respiro: "lg:h-[140px]",
    visual: (
      <div>
        <WhatsAppChat
          variant="individual"
          titulo="Ecoa Memórias"
          subtitulo="online"
          mensagens={[
            { tipo: "dia", dia: "24 de dezembro" },
            { tipo: "audio", minha: true, duracao: "4:07", hora: "23:41" },
            {
              tipo: "texto",
              minha: true,
              texto: "gravei o vô contando como conheceu a vó",
              hora: "23:42",
            },
          ]}
        />
      </div>
    ),
  },
  {
    titulo: `No dia ${DIA_PRIMEIRA_PAGINA}, a primeira página.`,
    texto:
      "Editada por uma pessoa, com foto e o QR code que toca a voz de quem contou. Chega no seu WhatsApp, em PDF, com a família ainda junta. É por nossa conta.",
    respiro: "lg:h-[100px]",
    visual: (
      <div>
        <WhatsAppChat
          variant="individual"
          titulo="Ecoa Memórias"
          subtitulo="online"
          mensagens={[
            { tipo: "dia", dia: PRIMEIRA_PAGINA },
            {
              tipo: "texto",
              texto:
                "Bom dia! A primeira página do livro está pronta. Aponte a câmera para o QR e ouçam juntos.",
              hora: "09:30",
            },
            {
              tipo: "texto",
              minha: true,
              texto: "ouvimos todos na mesa do café. pode seguir!",
              hora: "10:12",
            },
          ]}
        />
      </div>
    ),
  },
  {
    titulo: "Gostou? O livro continua.",
    texto: `Aí vem uma pergunta por dia útil, por ${SEMANAS_DE_PERGUNTAS} semanas, no ritmo de quem conta. Cada história chega a um grupo só da família, e você revisa a prova antes de imprimir. O livro fica pronto ${PRAZO_LIVRO} depois.`,
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
    <Section id="como-funciona" title="Começa na ceia de Natal." grid>
      <Trilha marcas={["Antes do Natal", PRIMEIRA_PAGINA, "O livro"]}>
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
