import { BotaoInteresse } from "@/components/ui/BotaoInteresse";
import { Container } from "@/components/ui/Container";
import { LiveCover } from "@/components/ui/LiveCover";
import { BalaoAudio } from "@/components/ui/WhatsAppChat";
import { formatarData, IMAGES, INSCRICOES_ATE } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { TituloHero } from "./TituloHero";

// Foto ilustrativa da capa: sem nome, como toda foto da página. Sem o arquivo, a capa fica só com o título.
const FOTO_CAPA = IMAGES.antigaCasamento;

export function Hero() {
  // O preço e as vagas ficam para o colofão, perto do fim: aqui o prazo e o que é grátis.
  // "Começa na ceia" já está no botão.
  const fatos = [
    `Inscrições até ${formatarData(INSCRICOES_ATE)}`,
    "A primeira página é por nossa conta",
  ];

  return (
    <section id="topo" aria-labelledby="hero-titulo">
      <Container
        grid
        className="gap-y-6 pt-8 pb-[clamp(48px,5vw,72px)] md:pt-12 lg:gap-y-0 lg:pt-14"
      >
        <TituloHero
          id="hero-titulo"
          className="text-display col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1"
        />

        <div className="col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:pt-10">
          {/* A pessoa troca no título; aqui, "quem conta" serve para todas */}
          <p className="max-w-[46ch]">
            As histórias, as fotos e a voz de quem conta, num livro de capa
            dura. Quem conta só responde por áudio no WhatsApp, do jeito que
            fala. Sem escrever, sem instalar nada. A Ecoa cuida do resto.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <BotaoInteresse posicao="hero" />
          </div>

          {/* No celular, um fato por linha: o ponto não fica sozinho no fim da linha */}
          <ul className="text-pequeno mt-7 flex flex-col gap-y-1 sm:flex-row sm:flex-wrap sm:gap-x-2">
            {fatos.map((f, i) => (
              <li key={f} className="whitespace-nowrap">
                {f}
                {i < fatos.length - 1 && (
                  <span aria-hidden className="hidden pl-2 sm:inline">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* No desktop, a capa vai à direita, já na altura do título */}
        <div className="col-span-12 mt-6 lg:contents">
          <LiveCover
            className="lg:contents!"
            objetoClassName="lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:justify-self-end lg:self-start lg:pt-2"
            foto={existeEmPublic(FOTO_CAPA) ? FOTO_CAPA : undefined}
            aparte={<BalaoAudio duracao="2:14" hora="19:02" />}
          />
        </div>
      </Container>
    </section>
  );
}
