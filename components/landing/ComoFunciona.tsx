import type { CSSProperties, ReactNode } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { PaginaSolta } from "@/components/ui/PaginaSolta";
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

type Momento = {
  titulo: string;
  texto: string;
  /** Espaço entre o texto e a imagem no desktop: as imagens sobem e descem na fileira. */
  respiro: string;
  visual: ReactNode;
};

// Sem o arquivo, o objeto fica sem a foto: nunca um quadro vazio
const temFotoPagina = existeEmPublic(IMAGES.antigaCasamento);
const temFotoLivro = existeEmPublic(IMAGES.antigaFazenda);

const PRIMEIRA_PAGINA = formatarData(DATA_PRIMEIRA_PAGINA);
const PERGUNTAS = porExtenso(PERGUNTAS_DE_NATAL);
// "26 de dezembro" → "26": o título fala do dia, a trilha diz o mês
const DIA_PRIMEIRA_PAGINA = PRIMEIRA_PAGINA.split(" ")[0];

// Três passos, um embaixo de cada marca da trilha: o caso gravado na mesa vira a primeira página,
// e a primeira página vira o livro. As perguntas são ajuda opcional, não um passo.
const MOMENTOS: Momento[] = [
  {
    titulo: "Na ceia, grave um caso.",
    texto: `Peça para quem conta lembrar uma história e grave no celular. Se precisar, mandamos ${PERGUNTAS} perguntas para puxar a conversa. Depois, mande o áudio no nosso WhatsApp.`,
    respiro: "lg:h-10",
    visual: (
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
    ),
  },
  {
    titulo: `No dia ${DIA_PRIMEIRA_PAGINA}, vira a primeira página.`,
    texto:
      "O áudio volta editado por uma pessoa, com foto e o QR code que toca a voz. Chega em PDF no seu WhatsApp, por nossa conta.",
    respiro: "lg:h-[72px]",
    visual: (
      <PaginaSolta
        foto={
          temFotoPagina
            ? {
                src: IMAGES.antigaCasamento,
                alt: "Foto antiga de casamento, em preto e branco, de um casal jovem na porta de uma igreja",
              }
            : undefined
        }
        titulo="Como conheci a sua avó"
        ano="1961"
        texto="Foi num baile em Divinópolis. Ela estava de vestido azul e eu não sabia dançar. Pedi para ela me ensinar."
        pagina={1}
        className="mx-auto w-[86%] max-w-[340px] rotate-[1.5deg] md:mx-0"
      />
    ),
  },
  {
    titulo: "Gostou? O livro continua.",
    texto: `Uma pergunta por dia útil, por ${SEMANAS_DE_PERGUNTAS} semanas. Cada história chega a um grupo só da família, e o livro de capa dura fica pronto ${PRAZO_LIVRO} depois.`,
    respiro: "lg:h-[120px]",
    visual: (
      // No celular a capa sai: o topo da página já mostra uma
      <div className="hidden pt-2 pl-[6%] md:block">
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
      <Trilha marcas={["Na ceia", PRIMEIRA_PAGINA, "O livro"]}>
        <ol className="grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
          {MOMENTOS.map((m, i) => (
            <li key={m.titulo} data-entra style={ordem(1 + i)}>
              <h3 className="text-destaque max-w-[18ch]">{m.titulo}</h3>
              <p className="mt-3 max-w-[34ch]">{m.texto}</p>
              <div className={`h-8 ${m.respiro}`} aria-hidden />
              <div className="max-w-[360px]">{m.visual}</div>
            </li>
          ))}
        </ol>
      </Trilha>
    </Section>
  );
}
