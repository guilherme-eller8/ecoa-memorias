import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Estante } from "./Estante";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// O fecho: o único momento centralizado da página, com a estante das capas.
export function Fecho() {
  return (
    <Section
      title="Algumas histórias só uma pessoa pode contar."
      tone="floresta"
      className="tecido text-center"
      titleClassName="mx-auto max-w-[20ch]!"
    >
      <p className="text-destaque mt-5 md:mt-6" data-entra style={ordem(1)}>
        Que elas continuem ecoando.
      </p>
      <div className="mt-10 md:mt-12" data-entra style={ordem(2)}>
        <Button href="#interesse" variant="invertido" data-cta="fecho">
          Tenho interesse
        </Button>
      </div>
      <div className="mt-16 md:mt-24" data-entra style={ordem(3)}>
        <Estante />
      </div>
    </Section>
  );
}
