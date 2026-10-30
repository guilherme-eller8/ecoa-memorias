import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { ConversaPerguntas } from "./ConversaPerguntas";

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

// Algumas das perguntas, chegando como chegam de verdade: uma por dia útil, no WhatsApp.
export function Perguntas() {
  return (
    <Section
      id="perguntas"
      title="As perguntas certas abrem histórias."
      tone="floresta"
      grid
      className="tecido"
      titleClassName="lg:col-span-6 lg:row-start-1 lg:self-end"
    >
      <p
        className="col-span-12 mt-5 max-w-[30ch] lg:col-span-6 lg:row-start-2 lg:self-start"
        data-entra
        style={ordem(1)}
      >
        Use as nossas, adapte ou escreva as suas.
      </p>

      {/* O chat é ilustração; a lista é o que o leitor de tela lê */}
      <ul className="sr-only">
        {PERGUNTAS.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <div
        className="col-span-12 mt-10 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0"
        data-entra
        style={ordem(2)}
      >
        <ConversaPerguntas
          perguntas={PERGUNTAS}
          className="mx-auto h-[420px] max-w-[480px] md:h-[min(460px,62svh)] lg:ml-0"
        />
      </div>
    </Section>
  );
}
