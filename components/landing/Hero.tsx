import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LiveCover } from "@/components/ui/LiveCover";
import { BalaoAudio } from "@/components/ui/WhatsAppChat";
import {
  formatarData,
  formatarPreco,
  IMAGES,
  LIVROS_NA_EDICAO,
  PARCELAS_MAX,
  WHATSAPP_PRONTO,
} from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { linkWhatsApp, MENSAGEM_CONVERSA } from "@/lib/leads";

// Foto ilustrativa da capa: sem nome, como toda foto da página. Sem o arquivo, a capa fica só com o título.
const FOTO_CAPA = IMAGES.antigaCasamento;

export function Hero() {
  const fatos = [
    `${formatarPreco()}, pagamento único`,
    `Pix ou ${PARCELAS_MAX}x sem juros`,
    `Só ${LIVROS_NA_EDICAO} famílias nesta edição`,
    `Inscrições até ${formatarData()}`,
  ];

  return (
    <section id="topo" aria-labelledby="hero-titulo">
      <Container
        grid
        className="gap-y-6 pt-8 pb-[clamp(48px,5vw,72px)] md:pt-12 lg:gap-y-0 lg:pt-14"
      >
        <h1
          id="hero-titulo"
          className="text-display col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-1"
        >
          A voz de quem você ama, em capa dura.
        </h1>

        <div className="col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:pt-10">
          <p className="max-w-[46ch]">
            Durante quatro semanas, quem você ama recebe uma pergunta por dia
            útil no WhatsApp e responde por áudio, do jeito que já faz. A
            família manda mensagens em segredo, e tudo vira um livro de capa
            dura com a voz original, entregue antes do Natal.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href="#interesse" data-cta="hero">
              Quero este livro
            </Button>
            {WHATSAPP_PRONTO && (
              <Button
                variant="link"
                href={linkWhatsApp(MENSAGEM_CONVERSA)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero-whatsapp"
                className="inline-flex! min-h-12 items-center gap-2"
              >
                <IconeWhatsApp />
                Ou chame a gente no WhatsApp
              </Button>
            )}
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

        {/* No desktop, a capa vai à direita e as lombadas de cor descem para a coluna do texto */}
        <div className="col-span-12 mt-6 lg:contents">
          <LiveCover
            className="lg:contents!"
            objetoClassName="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-2 lg:justify-self-end lg:pt-4"
            controlesClassName="lg:col-span-6 lg:col-start-1 lg:row-start-3 lg:self-start lg:pt-12"
            foto={existeEmPublic(FOTO_CAPA) ? FOTO_CAPA : undefined}
            aparte={<BalaoAudio duracao="2:14" hora="19:02" />}
          />
        </div>
      </Container>
    </section>
  );
}

function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"
      />
    </svg>
  );
}
