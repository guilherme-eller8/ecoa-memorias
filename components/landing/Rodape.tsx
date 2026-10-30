import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  CIDADE,
  CNPJ,
  EMAIL_CONTATO,
  MARCA,
  WHATSAPP_NUMERO,
} from "@/lib/config";

// A contracapa: o nome na largura toda, os contatos e os créditos.
export function Rodape() {
  return (
    <footer className="bg-papel pt-[clamp(56px,6.6vw,96px)] pb-10 md:pb-12">
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
            <li>
              <Button
                variant="link"
                href={`https://wa.me/${WHATSAPP_NUMERO}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Button>
            </li>
            <li>
              <Button variant="link" href={`mailto:${EMAIL_CONTATO}`}>
                {EMAIL_CONTATO}
              </Button>
            </li>
            <li>
              <Button variant="link" href="/privacidade">
                Privacidade
              </Button>
            </li>
          </ul>
          <div className="text-pequeno md:col-span-5 md:self-center md:text-right">
            <p>
              {MARCA} · CNPJ {CNPJ}
            </p>
            <p>Feito com cuidado em {CIDADE}.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
