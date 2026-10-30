import type { CSSProperties } from "react";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const PERGUNTAS = [
  "Como era a casa onde você cresceu?",
  "Como você conheceu o grande amor da sua vida?",
  "Qual foi o primeiro trabalho que você teve?",
  "Que cheiro ainda te leva de volta à infância?",
  "Qual foi o dia mais feliz da sua vida?",
  "Que receita da família não pode se perder?",
  "Qual foi a maior coragem que você já teve?",
  "O que você gostaria que seus netos soubessem sobre você?",
];

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// Algumas das perguntas, numa lista curta em duas colunas, com uma foto antiga ao lado.
export function Perguntas() {
  const temFoto = existeEmPublic(IMAGES.antigaCasamento);
  return (
    <Section
      id="perguntas"
      title="As perguntas certas abrem histórias."
      tone="floresta"
      grid
      className="tecido"
      titleClassName={temFoto ? "lg:col-span-8!" : undefined}
    >
      <p
        className="col-span-12 mt-5 max-w-[40ch] lg:col-span-8"
        data-entra
        style={ordem(1)}
      >
        Use as nossas, adapte ou escreva as suas.
      </p>

      <ul
        className={`col-span-12 mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 ${temFoto ? "lg:col-span-8" : ""}`}
        data-entra="lista"
        style={ordem(2)}
      >
        {PERGUNTAS.map((p) => (
          <li key={p} className="max-w-[34ch]" data-entra-item>
            {p}
          </li>
        ))}
      </ul>

      {temFoto ? (
        <div
          className="col-span-8 col-start-3 mt-10 sm:col-span-6 sm:col-start-4 lg:col-span-3 lg:col-start-10 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center"
          data-entra
          style={ordem(3)}
        >
          <Foto
            src={IMAGES.antigaCasamento}
            tipo="antiga"
            proporcao="4 / 5"
            sizes="(min-width: 1024px) 300px, 50vw"
            alt="Retrato de casamento em preto e branco: um casal jovem diante de uma pequena igreja colonial, a noiva com véu simples"
            className="rotate-[-2deg]"
          />
        </div>
      ) : null}
    </Section>
  );
}
