import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  CIDADE,
  CNPJ,
  CNPJ_PRONTO,
  LINKEDIN_URL,
  MARCA,
  RESPONSAVEL,
  WHATSAPP_PRONTO,
} from "@/lib/config";
import { linkConversaResidencial } from "@/lib/residenciais";
import { ComCasa, type BuscaCasa } from "./ComCasa";

const ALVO = "inline-flex! min-h-12 items-center";

// A contracapa da página das casas: sem Termos (o contrato das famílias, com preço) e sem link para "/".
export function Rodape({ busca }: { busca: BuscaCasa }) {
  return (
    <footer className="bg-papel pt-[clamp(48px,5vw,72px)] pb-10 md:pb-12">
      <Container>
        <div className="[container-type:inline-size]">
          <p
            className="text-[10cqi] leading-[0.9] font-medium tracking-[-0.03em]"
            style={{ textWrap: "nowrap", fontVariationSettings: '"opsz" 72' }}
            aria-hidden
            data-entra
          >
            {MARCA}
          </p>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-6 md:mt-14 md:grid-cols-12">
          <ul className="grid md:col-span-7 md:flex md:flex-wrap md:gap-x-8 [&>li]:flex [&>li]:min-h-12 [&>li]:items-center">
            {WHATSAPP_PRONTO && (
              <li>
                <ComCasa busca={busca}>
                  {(casa) => (
                    <Button
                      variant="link"
                      href={linkConversaResidencial(casa?.nome)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ALVO}
                      data-cta="residenciais-rodape"
                    >
                      WhatsApp
                    </Button>
                  )}
                </ComCasa>
              </li>
            )}
            <li>
              <Button variant="link" href="/privacidade" className={ALVO}>
                Privacidade
              </Button>
            </li>
          </ul>
          <div className="text-pequeno md:col-span-5 md:self-center md:text-right">
            <p>
              {MARCA}
              {CNPJ_PRONTO && ` · CNPJ ${CNPJ}`}
            </p>
            <p>
              Feito por{" "}
              <Button
                variant="link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {RESPONSAVEL}
              </Button>
              , em {CIDADE}.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
