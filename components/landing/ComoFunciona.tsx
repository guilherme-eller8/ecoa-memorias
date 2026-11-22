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
  PRAZO_PARA_CONTAR,
} from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { Trilha } from "./Trilha";

type Momento = {
  /** Colunas no desktop: o passo do meio é mais largo, para a página aberta caber legível. */
  colunas: string;
  /** Largura máxima do objeto. */
  largura: string;
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

// Três passos, um embaixo de cada marca da trilha (no desktop, 3, 6 e 3 colunas): o caso gravado na mesa vira a primeira página,
// e a primeira página vira o livro. As perguntas são ajuda opcional, não um passo.
const MOMENTOS: Momento[] = [
  {
    colunas: "lg:col-span-3",
    largura: "max-w-[360px]",
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
    colunas: "lg:col-span-6",
    largura: "max-w-[340px] md:max-w-[600px]",
    titulo: `No dia ${DIA_PRIMEIRA_PAGINA}, vira a primeira página.`,
    texto:
      "O áudio volta editado por uma pessoa: a história inteira, com foto e o QR code que toca a voz. Chega em PDF no seu WhatsApp, por nossa conta.",
    respiro: "lg:h-8",
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
        numeral="I"
        titulo="Como conheci a sua avó"
        ano="1961"
        paragrafos={[
          "Foi num baile em Divinópolis, no clube da praça. Ela estava de vestido azul, perto da janela, e eu não sabia dançar.",
          "Criei coragem e pedi para ela me ensinar. Pisei no pé dela a noite inteira, e ela ria de tudo.",
          "Na saída, perguntei se podia voltar no sábado. Ela disse que só se eu tivesse aprendido. Voltei todos os sábados, até o casamento.",
        ]}
        pagina={1}
      />
    ),
  },
  {
    colunas: "lg:col-span-3",
    largura: "max-w-[360px]",
    titulo: "Gostou? O livro continua.",
    texto: `Vocês têm até ${PRAZO_PARA_CONTAR} para contar mais histórias, no ritmo de quem conta. Cada uma chega a um grupo só da família, e vocês decidem quando fechar o livro.`,
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
      <Trilha
        marcas={MOMENTOS.map((m, i) => ({
          rotulo: ["Na ceia", PRIMEIRA_PAGINA, "O livro"][i],
          colunas: m.colunas,
        }))}
      >
        <ol className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {MOMENTOS.map((m, i) => (
            <li
              key={m.titulo}
              className={m.colunas}
              data-entra
              style={ordem(1 + i)}
            >
              <h3 className="text-destaque max-w-[18ch]">{m.titulo}</h3>
              <p className="mt-3 max-w-[34ch]">{m.texto}</p>
              <div className={`h-8 ${m.respiro}`} aria-hidden />
              <div className={m.largura}>{m.visual}</div>
            </li>
          ))}
        </ol>
      </Trilha>
    </Section>
  );
}
