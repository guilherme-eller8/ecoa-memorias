import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LiveCover } from "@/components/ui/LiveCover";
import { BalaoAudio } from "@/components/ui/WhatsAppChat";
import { IMAGES, PILOTO_MORADORES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { daCasa } from "@/lib/residenciais";
import { BotaoConversa } from "./BotaoConversa";
import { ComCasa, type BuscaCasa } from "./ComCasa";

const FOTO_CAPA = IMAGES.antigaCasamento;

// A capa leva o nome da casa no pé, no lugar do monograma: o white label num objeto só.
export function Hero({ busca }: { busca: BuscaCasa }) {
  const fatos = [
    `Piloto com ${PILOTO_MORADORES.min} a ${PILOTO_MORADORES.max} moradores`,
    "A Ecoa só aparece na ficha técnica",
  ];

  return (
    <section id="topo" aria-labelledby="hero-titulo">
      <Container
        grid
        className="gap-y-6 pt-8 pb-[clamp(48px,5vw,72px)] md:pt-12 lg:gap-y-0 lg:pt-14"
      >
        <h1
          id="hero-titulo"
          className="text-display col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1"
        >
          A voz de cada morador, com a sua marca.
        </h1>

        <div className="col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:pt-10">
          <p className="max-w-[46ch]">
            O morador conta por áudio, no WhatsApp. A família recebe cada
            história no mesmo dia. No fim, um livro de capa dura que toca a voz
            de quem contou, entregue pela sua casa. A Ecoa faz o resto, sem
            aparecer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ComCasa busca={busca}>
              {(casa) => (
                <BotaoConversa casa={casa?.nome} posicao="residenciais-hero" />
              )}
            </ComCasa>
          </div>

          <ul className="text-pequeno mt-7 flex flex-wrap gap-x-2 gap-y-1">
            {fatos.map((f, i) => (
              <li key={f} className="whitespace-nowrap">
                {f}
                {i < fatos.length - 1 && (
                  <span aria-hidden className="pl-2">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Só para casas cadastradas: a logo real, pequena, abaixo do CTA (não compete com ele) */}
          <ComCasa busca={busca}>
            {(casa) =>
              casa?.cadastro ? (
                <p className="text-pequeno mt-6 flex items-center gap-3">
                  Preparado para {casa.cadastro.artigo}
                  <Image
                    src={casa.cadastro.logo.src}
                    width={casa.cadastro.logo.width}
                    height={casa.cadastro.logo.height}
                    alt={`Logo ${casa.cadastro.nomeCompleto}`}
                    className="h-9 w-auto"
                    sizes="48px"
                  />
                </p>
              ) : null
            }
          </ComCasa>
        </div>

        <div className="col-span-12 mt-6 lg:contents">
          <ComCasa busca={busca}>
            {(casa) => (
              <LiveCover
                className="lg:contents!"
                objetoClassName="lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:justify-self-end lg:self-start lg:pt-2"
                foto={existeEmPublic(FOTO_CAPA) ? FOTO_CAPA : undefined}
                marca={casa?.nome ?? "Sua casa"}
                {...(casa?.cadastro
                  ? {
                      cor: casa.cadastro.capa,
                      titulo: `Memórias de ${casa.cadastro.morador}`,
                      logo: casa.cadastro.logo,
                      assinatura: `Edição ${casa.cadastro.nome}`,
                      filete: casa.cadastro.corMarca,
                      legenda: `Simulação: como ficaria o livro de um morador ${daCasa(casa)}.`,
                    }
                  : {})}
                aparte={
                  <BalaoAudio
                    duracao="3:41"
                    hora="15:20"
                    // Abaixo do desktop o balão cobriria o nome da casa no pé da capa
                    className="max-lg:hidden!"
                  />
                }
              />
            )}
          </ComCasa>
        </div>
      </Container>
    </section>
  );
}
