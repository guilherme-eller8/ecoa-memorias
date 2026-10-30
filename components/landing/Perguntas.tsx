import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { IMAGES, type ImagemChave } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import { Fichario } from "./Fichario";

const PERGUNTAS: { pergunta: string; foto?: ImagemChave; alt?: string }[] = [
  {
    pergunta: "Como era a casa onde você cresceu?",
    foto: "antigaCasa",
    alt: "Foto antiga em preto e branco de uma família de cinco pessoas diante de uma casa pequena com portão e uma mangueira, no interior de Minas",
  },
  {
    pergunta: "Como você conheceu o grande amor da sua vida?",
    foto: "antigaCasamento",
    alt: "Retrato de casamento em preto e branco: um casal jovem diante de uma pequena igreja colonial, a noiva com véu simples",
  },
  {
    pergunta: "Qual foi o primeiro trabalho que você teve?",
    foto: "antigaTrabalho",
    alt: "Foto antiga desbotada de um rapaz em roupa de trabalho encostado, orgulhoso, numa caminhonete velha numa estrada de terra",
  },
  {
    pergunta: "Que cheiro ainda te leva de volta à infância?",
    foto: "antigaFazenda",
    alt: "Foto antiga em sépia de um menino de uns nove anos sentado numa cerca de madeira na fazenda, com vacas ao fundo",
  },
  {
    pergunta: "Qual foi o dia mais feliz da sua vida?",
    foto: "antigaPraia",
    alt: "Foto antiga desbotada de uma família na praia: o pai segura uma criança pequena e a mãe está sob um guarda-sol listrado",
  },
  { pergunta: "O que sua mãe sempre dizia?" },
  {
    pergunta: "Que receita da família não pode se perder?",
    foto: "antigaFlores",
    alt: "Foto antiga desbotada de uma moça de vestido florido sorrindo num quintal, com flores recém-colhidas nas mãos",
  },
  { pergunta: "Qual foi a maior coragem que você já teve?" },
  { pergunta: "O que você gostaria que seus netos soubessem sobre você?" },
  { pergunta: "Que conselho você daria para quem está começando a vida?" },
];

// O fichário: as dez perguntas em tipo grande e a página que cada uma virou.
export function Perguntas() {
  const itens = PERGUNTAS.map(({ pergunta, foto, alt }) => ({
    pergunta,
    foto:
      foto && existeEmPublic(IMAGES[foto]) ? (
        <Foto
          src={IMAGES[foto]}
          alt={alt ?? ""}
          tipo="antiga"
          proporcao="4 / 5"
          sizes="(min-width: 1024px) 340px, 70vw"
          className="w-full"
        />
      ) : undefined,
  }));

  return (
    <Section
      id="perguntas"
      title="As perguntas certas abrem histórias."
      tone="floresta"
      grid
      className="tecido"
    >
      <p className="col-span-12 mt-5 max-w-[40ch]" data-entra>
        Use as nossas, adapte ou escreva as suas.
      </p>
      <Fichario itens={itens} />
    </Section>
  );
}
