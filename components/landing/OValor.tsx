import type { CSSProperties } from "react";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// Por que o livro importa: o que ele guarda para quem ainda vai nascer.
export function OValor() {
  const temFoto = existeEmPublic(IMAGES.antigaPraia);
  return (
    <Section
      id="valor"
      title="Para os netos dos seus netos."
      tone="papel"
      grid
      titleClassName="text-display! lg:col-span-8! max-w-[16ch]!"
    >
      <p
        className={`text-destaque col-span-12 mt-8 max-w-[34ch] md:mt-10 ${
          temFoto
            ? "lg:col-span-6 lg:col-start-1"
            : "lg:col-span-7 lg:col-start-6"
        }`}
        data-entra
        style={ordem(1)}
      >
        Daqui a cinquenta anos, alguém vai abrir este livro e ouvir a voz de um
        bisavô que nunca conheceu.
      </p>
      <p
        className={`col-span-12 mt-6 max-w-[46ch] ${
          temFoto
            ? "lg:col-span-6 lg:col-start-1"
            : "lg:col-span-7 lg:col-start-6"
        }`}
        data-entra
        style={ordem(2)}
      >
        As histórias que a família pede para repetir no almoço de domingo ficam
        no papel. E a voz de quem contou continua ali, para quem vier depois.
      </p>
      {temFoto ? (
        <div
          className="col-span-12 mt-10 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center"
          data-entra
          style={ordem(3)}
        >
          <Foto
            src={IMAGES.antigaPraia}
            tipo="antiga"
            proporcao="4 / 5"
            sizes="(min-width: 1024px) 420px, 80vw"
            alt="Foto antiga desbotada de uma família na praia: o pai segura uma criança pequena e a mãe está sob um guarda-sol listrado"
            className="rotate-[2deg]"
          />
        </div>
      ) : null}
    </Section>
  );
}
