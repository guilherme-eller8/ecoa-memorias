import { Button } from "@/components/ui/Button";
import { CTA_TEXTO } from "@/lib/config";
import {
  linkWhatsApp,
  MENSAGENS_INTERESSE,
  type PosicaoInteresse,
} from "@/lib/leads";

type Props = {
  posicao: PosicaoInteresse;
  variant?: "primario" | "invertido";
  className?: string;
};

/**
 * O botão de interesse (CTA_TEXTO): abre o WhatsApp numa aba nova com a mensagem da posição.
 * O data-posicao dispara o evento cta_interesse (ver CliquesCta).
 */
export function BotaoInteresse({ posicao, variant, className }: Props) {
  return (
    <Button
      href={linkWhatsApp(MENSAGENS_INTERESSE[posicao])}
      target="_blank"
      rel="noopener"
      variant={variant}
      className={className}
      data-cta={posicao}
      data-posicao={posicao}
    >
      {CTA_TEXTO}
    </Button>
  );
}
