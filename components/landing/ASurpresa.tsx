import type { CSSProperties, ReactNode } from "react";
import { Foto } from "@/components/ui/Foto";
import { OpenBookSpread } from "@/components/ui/OpenBookSpread";
import { QrCode } from "@/components/ui/QrCode";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { IMAGES, VIDEOS } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

type FotoMensagem = { src: string; alt: string; objectPosition?: string };

/**
 * Uma mensagem da família numa página do livro: a foto de quem escreveu com quem é
 * homenageado, o bilhete à mão e o QR que toca o áudio dela.
 */
function Mensagem({
  foto,
  texto,
  assinatura,
}: {
  foto?: FotoMensagem;
  texto: string;
  assinatura: string;
}) {
  return (
    <figure className="m-0">
      {foto && existeEmPublic(foto.src) ? (
        <Foto
          src={foto.src}
          alt={foto.alt}
          tipo="antiga"
          proporcao="3 / 2"
          objectPosition={foto.objectPosition}
          sizes="(min-width: 1280px) 260px, 45vw"
          className="w-[74%] rotate-[-1.5deg]"
        />
      ) : null}
      <blockquote className="font-mao m-0 mt-[3cqi] text-[max(15px,3.2cqi)] leading-[1.1]">
        {texto}
      </blockquote>
      <figcaption className="mt-[2cqi] flex items-center justify-between gap-[2cqi]">
        <span className="font-mao text-[max(14px,2.9cqi)]">{assinatura}</span>
        <span className="flex items-center gap-[1.2cqi] text-[max(13px,1.5cqi)] whitespace-nowrap">
          ouça a mensagem
          <QrCode className="block w-[max(30px,5.6cqi)]" />
        </span>
      </figcaption>
    </figure>
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
      <div className="mt-[2.5cqi]">
        <Mensagem
          foto={{
            src: IMAGES.mensagemNeta,
            alt: "Foto de 1998: um avô e a neta pequena, sentados na oficina de marcenaria, assobiando juntos",
            objectPosition: "50% 40%",
          }}
          texto="Vô, até hoje eu lembro do cheiro da oficina e de você me ensinando a assobiar."
          assinatura="sua neta"
        />
      </div>
    </>
  ),
  direita: (
    <div className="pt-[5.5cqi]">
      <Mensagem
        foto={{
          src: IMAGES.mensagemFilho,
          alt: "Foto de 1998: um pai ri ao lado do filho pequeno, que come macarrão com o rosto todo sujo de molho",
          objectPosition: "50% 40%",
        }}
        texto="Pai, obrigado por cada domingo de macarronada. Você fez da nossa casa o lugar mais feliz do mundo."
        assinatura="seu filho"
      />
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
