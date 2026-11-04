import type { CSSProperties } from "react";
import { OpenBookSpread } from "@/components/ui/OpenBookSpread";
import { QrCode } from "@/components/ui/QrCode";
import { Section } from "@/components/ui/Section";
import { IMAGES, SITE_URL } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// Os argumentos mais fortes para a casa, em ordem: famílias, agenda, recepção.
const MUDANCAS = [
  {
    titulo: "As famílias recebem notícia boa da casa.",
    texto:
      "Cada história gravada chega no mesmo dia a um grupo de WhatsApp só da família, com o nome da casa. O filho que mora longe ouve o pai contar da primeira viagem numa terça-feira qualquer.",
  },
  {
    titulo: "Uma atividade com começo, meio e fim.",
    texto:
      "Lembrar e contar a própria vida para alguém que escuta entra na agenda como um projeto de algumas semanas. E termina num livro de capa dura.",
  },
  {
    titulo: "Um livro na mesa da recepção.",
    texto:
      "Para quem visita a casa escolhendo onde o pai vai morar, o livro de um morador, com a autorização da família, diz mais que qualquer folder.",
  },
];

const PARAGRAFOS = [
  "Eu tinha dezessete anos quando peguei o trem para Belo Horizonte. Levava uma mala de papelão e o endereço de um primo escrito num pedaço de jornal.",
  "Minha mãe ficou na plataforma acenando até o trem fazer a curva. Foi a primeira vez que eu vi meu pai chorar.",
];

export function OQueMuda() {
  return (
    <Section
      title="O que muda para a sua casa."
      tone="papel"
      grid
      className="overflow-x-clip"
      titleClassName="xl:col-span-5 xl:row-start-1"
    >
      <ol
        className="col-span-12 mt-8 grid gap-8 md:mt-10 xl:col-span-5 xl:row-start-2 xl:self-start"
        data-entra="lista"
        style={ordem(1)}
      >
        {MUDANCAS.map((m) => (
          <li key={m.titulo} data-entra-item>
            <h3 className="text-destaque font-medium">{m.titulo}</h3>
            <p className="mt-2 max-w-[44ch]">{m.texto}</p>
          </li>
        ))}
      </ol>

      <div
        className="relative col-span-12 mt-12 md:mt-14 xl:col-span-7 xl:col-start-6 xl:row-span-2 xl:row-start-1 xl:mt-0 xl:w-full xl:max-w-[max(600px,calc((100svh-220px)*1.38))] xl:self-center xl:justify-self-end"
        data-entra="pagina"
        style={ordem(2)}
      >
        <div className="relative w-[152%] -translate-x-[34%] md:w-full md:translate-x-0">
          <OpenBookSpread
            foto={
              existeEmPublic(IMAGES.antigaFazenda)
                ? {
                    src: IMAGES.antigaFazenda,
                    alt: "Foto antiga em sépia de um menino sentado numa cerca de madeira, numa fazenda, com vacas ao fundo",
                  }
                : undefined
            }
            pergunta="Como foi o dia em que o senhor saiu de casa?"
            numeral="III"
            titulo="O trem para Belo Horizonte"
            ano="1961"
            paragrafos={PARAGRAFOS}
            pagina={23}
            qr={<QrCode url={`${SITE_URL}/residenciais`} />}
          />
        </div>
      </div>
    </Section>
  );
}
