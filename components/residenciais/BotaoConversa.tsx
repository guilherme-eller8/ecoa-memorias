import { Button } from "@/components/ui/Button";
import {
  linkConversaResidencial,
  type PosicaoConversa,
} from "@/lib/residenciais";

type Props = {
  casa?: string;
  posicao: PosicaoConversa;
  variant?: "primario" | "invertido";
};

/** "Marcar uma conversa": abre o WhatsApp com o nome da casa. O data-cta vira cta_clicado. */
export function BotaoConversa({ casa, posicao, variant }: Props) {
  return (
    <Button
      href={linkConversaResidencial(casa)}
      target="_blank"
      rel="noopener"
      variant={variant}
      data-cta={posicao}
    >
      Marcar uma conversa
    </Button>
  );
}
