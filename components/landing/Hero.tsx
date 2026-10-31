import { BotaoInteresse } from "@/components/ui/BotaoInteresse";
import { Container } from "@/components/ui/Container";
import { LiveCover } from "@/components/ui/LiveCover";
import { BalaoAudio } from "@/components/ui/WhatsAppChat";
import { formatarData, IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { QuemConta } from "./QuemConta";

// Foto ilustrativa da capa: sem nome, como toda foto da página. Sem o arquivo, a capa fica só com o título.
const FOTO_CAPA = IMAGES.antigaCasamento;

export function Hero() {
  // O preço fica para o colofão, perto do fim: aqui só a edição e o prazo
  const fatos = ["Edição de Natal", `Inscrições até ${formatarData()}`];

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
          As histórias da sua família num livro, com fotos e a voz de quem
          viveu.
        </h1>

        <div className="col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:pt-10">
          {/* "conta." fecha a linha: a troca da pessoa não reflui o resto da frase */}
          <p className="max-w-[46ch]">
            <QuemConta /> conta.
            <br />A Ecoa cuida do resto. Um presente pronto para entregar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <BotaoInteresse posicao="hero" />
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
