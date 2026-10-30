import type { CSSProperties } from "react";
import { OpenBookSpread } from "@/components/ui/OpenBookSpread";
import { PhoneAudioPlayer } from "@/components/ui/PhoneAudioPlayer";
import { QrCode } from "@/components/ui/QrCode";
import { Section } from "@/components/ui/Section";
import { IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const AMOSTRA = "/audio/amostra.mp3";

const PARAGRAFOS = [
  "A casa ficava no fim da Rua Bahia, depois da venda do seu Antônio. Tinha um quintal comprido, com uma mangueira que dava sombra para a rua inteira.",
  "Minha mãe acordava antes de todo mundo. O cheiro do café chegava no quarto antes dela, e era assim que a gente sabia que o dia tinha começado.",
  "Quando chovia, a gente juntava as bacias embaixo das goteiras e ficava ouvindo a música que elas faziam. Eu tinha nove anos e achava que aquela casa era o mundo inteiro.",
];

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// Uma página dupla do livro, com o celular tocando a voz do capítulo.
export function AVoz() {
  const src = existeEmPublic(AMOSTRA) ? AMOSTRA : undefined;

  return (
    <Section
      title="As histórias no papel. A voz, a um toque."
      tone="papel"
      grid
      className="overflow-x-clip"
      titleClassName="xl:col-span-5 xl:row-start-1"
    >
      <p
        className="col-span-12 mt-6 max-w-[40ch] md:mt-8 xl:col-span-5 xl:row-start-2 xl:self-start"
        data-entra
        style={ordem(1)}
      >
        Cada capítulo traz um QR code. Basta apontar o celular para ouvir a
        história contada por quem viveu, com o riso, as pausas e o sotaque de
        sempre.
      </p>

      <div
        className="relative col-span-12 mt-6 pt-[64px] pb-[150px] md:mt-10 md:pb-[170px] xl:col-span-7 xl:col-start-6 xl:row-span-3 xl:row-start-1 xl:mt-0 xl:w-full xl:max-w-[max(600px,calc((100svh-290px)*1.38))] xl:justify-self-end xl:pt-[52px] xl:pb-[70px]"
        data-entra="pagina"
        style={ordem(2)}
      >
        <p
          className="font-mao text-destaque absolute top-0 right-[12%] z-10 m-0 leading-none md:right-[9%]"
          aria-hidden
        >
          aponte e ouça
          <svg
            className="absolute top-[0.7em] right-[-46px] h-[66px] w-[44px]"
            viewBox="0 0 44 66"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6c18 0 30 10 32 44" />
            <path d="M28 43l8 9 6-10" />
          </svg>
        </p>

        <div className="relative w-[152%] -translate-x-[34%] md:w-full md:translate-x-0">
          <OpenBookSpread
            foto={
              existeEmPublic(IMAGES.antigaCasa)
                ? {
                    src: IMAGES.antigaCasa,
                    alt: "Foto antiga em preto e branco de uma família de cinco pessoas diante de uma casa pequena com portão e uma mangueira, no interior de Minas",
                    objectPosition: "50% 62%",
                  }
                : undefined
            }
            pergunta="Como era a casa onde o senhor cresceu?"
            numeral="VI"
            titulo="A casa da Rua Bahia"
            ano="1958"
            paragrafos={PARAGRAFOS}
            pagina={47}
            qr={<QrCode />}
          />
          {/* Em primeiro plano, sobre o canto inferior direito do livro */}
          <PhoneAudioPlayer
            titulo="A casa da Rua Bahia"
            duracao="2:14"
            src={src}
            className="absolute top-[calc(100%-110px)] right-[2%] w-[clamp(118px,18%,140px)] xl:top-[calc(100%-150px)]"
          />
        </div>
      </div>
    </Section>
  );
}
