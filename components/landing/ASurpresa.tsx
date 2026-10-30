import type { CSSProperties, ReactNode } from "react";
import { Foto } from "@/components/ui/Foto";
import { OpenBookSpread } from "@/components/ui/OpenBookSpread";
import { QrCode } from "@/components/ui/QrCode";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { IMAGES, VIDEOS } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

/** Uma mensagem da família, escrita à mão na página, com o QR que toca o áudio dela. */
function Mensagem({
  texto,
  assinatura,
  children,
}: {
  texto: string;
  assinatura: string;
  children?: ReactNode;
}) {
  return (
    <figure className="m-0">
      <blockquote className="font-mao m-0 text-[max(18px,3.8cqi)] leading-[1.12]">
        {texto}
      </blockquote>
      <figcaption className="font-mao mt-[1.6cqi] text-[max(16px,3cqi)]">
        {assinatura}
      </figcaption>
      {children}
    </figure>
  );
}

function OucaAMensagem() {
  return (
    <p className="mt-[3.5cqi] flex items-center gap-[1.6cqi] text-[max(13px,1.75cqi)]">
      <QrCode className="block w-[max(44px,7.5cqi)]" />
      ouça a mensagem
    </p>
  );
}

// As páginas que quem conta só vê no Natal: as mensagens da família, cada uma com a voz.
const MIOLO = {
  rotulo: "Mensagens da família",
  esquerda: (
    <>
      <p className="text-[max(13px,2.1cqi)] font-medium tracking-[0.02em]">
        Mensagens da família
      </p>
      <div className="mt-[4cqi]">
        <Mensagem
          texto="Vô, até hoje eu lembro do cheiro da oficina e de você me ensinando a assobiar."
          assinatura="sua neta"
        >
          <OucaAMensagem />
        </Mensagem>
      </div>
    </>
  ),
  direita: (
    <div className="pt-[7cqi]">
      <Mensagem
        texto="Pai, obrigada por cada domingo de macarronada. Você fez da nossa casa o lugar mais feliz do mundo."
        assinatura="sua filha"
      >
        <OucaAMensagem />
      </Mensagem>
    </div>
  ),
};

export function ASurpresa() {
  const temFoto = existeEmPublic(IMAGES.surpresa);
  const temVideo = temFoto && existeEmPublic(VIDEOS.surpresa);
  return (
    <Section
      title="No final, quem contou recebe uma surpresa."
      grid
      className="overflow-x-clip"
      titleClassName="xl:col-span-5 xl:col-start-8 xl:row-start-1 xl:self-end"
    >
      <p
        className="col-span-12 mt-6 max-w-[40ch] xl:col-span-5 xl:col-start-8 xl:row-start-2 xl:self-start"
        data-entra
        style={ordem(1)}
      >
        Duas partes fazem o livro. Uma delas, quem conta só conhece no Natal:
        cada mensagem da família ganha uma página, com QR code para ouvir.
      </p>

      {/* Do outro lado da página, em relação ao livro aberto da seção anterior */}
      <div
        className="col-span-12 mt-10 xl:col-span-7 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:mt-0 xl:w-full xl:max-w-[max(600px,calc((100svh-200px)*1.38))]"
        data-entra="pagina"
        style={ordem(2)}
      >
        <div className="relative w-[152%] translate-x-[-34%] md:w-full md:translate-x-0">
          <OpenBookSpread miolo={MIOLO} pagina={113} />
        </div>
      </div>

      {temFoto ? (
        <figure
          className="col-span-12 m-0 mt-14 lg:mt-20"
          data-entra="foto"
          style={ordem(3)}
        >
          <div className="relative">
            <Foto
              src={IMAGES.surpresa}
              tipo="cena"
              proporcao="21 / 9"
              objectPosition="50% 38%"
              sizes="(min-width: 1280px) 1280px, 100vw"
              alt="Almoço de família: o avô, sentado à mesa, sorri com o livro de capa verde aberto nas mãos, enquanto a filha e os netos riem ao redor"
              className="max-md:aspect-[4/5]!"
            />
            {temVideo ? (
              <VideoLoop
                src={VIDEOS.surpresa}
                poster={IMAGES.surpresa}
                className="rounded-ed [filter:saturate(.86)_contrast(.96)_sepia(.06)]"
              />
            ) : null}
          </div>
          <figcaption className="text-pequeno text-tinta-2 mt-3">
            Imagem ilustrativa.
          </figcaption>
        </figure>
      ) : null}
    </Section>
  );
}
