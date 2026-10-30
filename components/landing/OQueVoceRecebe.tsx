import type { CSSProperties } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { CAPA_PADRAO, CORES_CAPA } from "@/components/ui/capas";
import { Section } from "@/components/ui/Section";
import { FORMATO_LIVRO, IMAGES } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";
import s from "./OQueVoceRecebe.module.css";

const ITENS = [
  { nome: "Livro de capa dura em papel encorpado", valor: FORMATO_LIVRO },
  {
    nome: "Histórias contadas por áudio, editadas sem perder o jeito de falar",
    valor: "no ritmo da família",
  },
  { nome: "Fotos da família ao longo dos capítulos", valor: "incluídas" },
  {
    nome: "Um QR code em cada história para ouvir a voz original",
    valor: "em todas",
  },
  {
    nome: "Mensagens de filhos, netos e amigos, em áudio ou texto, reunidas em segredo",
    valor: "de toda a família",
  },
  {
    nome: "Capa com foto e cor à escolha",
    valor: `${CORES_CAPA.length} cores`,
  },
  { nome: "Os áudios originais, entregues à família", valor: "para sempre" },
];

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// A ficha técnica do livro: o que vem nele, assentado como numa página de créditos.
export function OQueVoceRecebe() {
  return (
    <Section
      id="livro"
      title="Um livro para segurar. E vozes para ouvir sempre."
      titleClassName="max-w-[30ch]!"
      grid
    >
      <div
        className="col-span-12 mt-10 flex justify-center md:col-span-5 md:mt-16 md:items-center md:justify-start"
        data-entra
        style={ordem(2)}
      >
        <BookCover
          color={CAPA_PADRAO.cor}
          title={CAPA_PADRAO.title}
          photo={
            existeEmPublic(IMAGES.antigaFlores)
              ? IMAGES.antigaFlores
              : undefined
          }
          size="xl"
          turn={24}
        />
      </div>

      <div
        className="col-span-12 mt-8 md:col-span-7 md:mt-16"
        data-entra="lista"
        style={ordem(1)}
      >
        <dl className={`folha-recortada ${s.ficha}`}>
          {ITENS.map((item) => (
            <div key={item.nome} className={s.item} data-entra-item>
              <dt className={s.nome}>{item.nome}</dt>
              <span className={s.pontos} aria-hidden />
              <dd className={s.valor}>{item.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
