import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  CIDADE,
  CNPJ,
  CNPJ_PRONTO,
  EMAIL_CONTATO,
  MARCA,
  WHATSAPP_NUMERO,
  WHATSAPP_PRONTO,
} from "@/lib/config";

// Links soltos, não no meio de texto: alvo de 48px
const ALVO = "inline-flex! min-h-12 items-center";

// A contracapa: o nome na largura toda, os contatos e os créditos.
export function Rodape() {
  return (
    <footer className="bg-papel pt-[clamp(48px,5vw,72px)] pb-10 md:pb-12">
      <Container>
        <div className="[container-type:inline-size]">
          <p
            className="text-[14.7cqi] leading-[0.9] font-medium tracking-[-0.03em]"
            // inline: a regra global de <p> (text-wrap) fica fora das camadas e venceria a classe
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
                <Button
                  variant="link"
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ALVO}
                >
                  WhatsApp
                </Button>
              </li>
            )}
            <li>
              <Button
                variant="link"
                href={`mailto:${EMAIL_CONTATO}`}
                className={ALVO}
              >
                {EMAIL_CONTATO}
              </Button>
            </li>
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
            <p>Feito em {CIDADE}.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
