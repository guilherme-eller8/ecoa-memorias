import type { CSSProperties } from "react";
import { Foto } from "@/components/ui/Foto";
import { NoteCard } from "@/components/ui/NoteCard";
import { QrCode } from "@/components/ui/QrCode";
import { Section } from "@/components/ui/Section";
import { IMAGES } from "@/lib/config";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// Os bilhetes escondidos: a foto da ceia e as mensagens da família saindo pela borda.
export function ASurpresa() {
  return (
    <Section
      title="No final, quem contou recebe uma surpresa."
      titleClassName="max-w-[30ch]!"
      grid
    >
      <div
        className="rounded-ed relative col-span-12 mt-10 overflow-hidden md:mt-14 lg:col-span-7 lg:mt-16"
        data-entra="foto"
        style={ordem(2)}
      >
        <Foto
          src={IMAGES.surpresa}
          tipo="cena"
          proporcao="3 / 2"
          objectPosition="40% 50%"
          sizes="(min-width: 1024px) 58vw, 100vw"
          alt="Noite de Natal em casa: uma avó no sofá, emocionada, com a mão no peito, segura um livro de capa dura aberto; a filha a abraça e os netos se inclinam para ver"
          className="respira max-md:aspect-[4/5]!"
        />

        {/* Os bilhetes ficam presos na foto e cortados pelas bordas dela: sugerem, não revelam */}
        <div
          className="absolute inset-0"
          role="group"
          aria-label="Bilhetes da família"
        >
          {/* O cartão passa da borda da foto; o texto para antes dela */}
          <NoteCard
            texto="Tio, foi o senhor que me ensinou..."
            rotate={-3}
            className="absolute top-[40%] right-[-14%] w-[60%] pr-[16%]! lg:top-[40%] lg:w-[44%] lg:pr-[12%]!"
          />
          <NoteCard
            texto="Pai, obrigada por cada domingo..."
            rotate={-5}
            className="absolute bottom-[5%] left-[4%] w-[60%] md:w-[46%] lg:w-[44%]"
          >
            <QrCode className="mt-2 w-11" />
          </NoteCard>
          <NoteCard
            texto="Vô, até hoje eu lembro do..."
            rotate={4}
            className="absolute bottom-[-5%] left-[42%] w-[54%] md:bottom-[-3%] md:left-[47%] md:w-[40%] lg:w-[38%]"
          />
        </div>
      </div>

      <p
        className="col-span-12 mt-8 max-w-[40ch] md:mt-10 lg:col-span-4 lg:col-start-9 lg:mt-16 lg:self-end"
        data-entra
        style={ordem(1)}
      >
        Enquanto as histórias são gravadas, filhos, netos e amigos enviam, em
        segredo, uma mensagem em áudio ou por escrito. Cada uma ganha uma página
        no livro, com QR code para quem quiser ouvir. Quem conta as histórias só
        descobre no Natal.
      </p>
    </Section>
  );
}
