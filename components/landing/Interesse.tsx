import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import {
  DATA_PRIMEIRA_PAGINA,
  formatarData,
  porExtenso,
  PRECO_DEPOIS,
  PRECO_DEPOIS_A_PARTIR,
  SEMANAS_DE_PERGUNTAS,
  formatarParcela,
  formatarPreco,
  FORMATO_LIVRO,
  PARCELAS_MAX,
  PRECO_LIVRO,
} from "@/lib/config";
import { FormInteresse } from "./FormInteresse";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

const SEMANAS = porExtenso(SEMANAS_DE_PERGUNTAS);

// Tudo o que o preço cobre, na ordem em que acontece
const INCLUSO = [
  `O cartão para entregar na ceia e a primeira página no dia ${formatarData(DATA_PRIMEIRA_PAGINA).split(" ")[0]}, em PDF.`,
  `${SEMANAS[0].toUpperCase()}${SEMANAS.slice(1)} semanas de perguntas pelo WhatsApp, uma por dia útil, com lembretes.`,
  "Cada história editada por uma pessoa, sem perder o jeito de falar.",
  "Um grupo só da família, onde cada história chega no mesmo dia.",
  "As mensagens secretas da família, cada uma numa página, com QR code.",
  `O livro de capa dura, ${FORMATO_LIVRO}, numa das cinco cores: de 10 a 20 histórias, com fotos e um QR code que toca a voz.`,
  "Os áudios originais, para a família guardar.",
];

// O colofão da edição: o preço, o preço de depois, o que vem incluído e a garantia, com o formulário ao lado.
export function Interesse() {
  return (
    <Section id="interesse" title="Edição de Natal 2026" grid>
      <div
        className="folha-recortada col-span-12 mt-8 px-6 pt-10 pb-12 md:px-12 md:pt-12 md:pb-14 lg:col-span-6 lg:mt-10"
        data-entra
        style={ordem(1)}
      >
        {/* A parcela é o número que pesa na decisão; o total vem logo abaixo, menor */}
        <p className="text-display font-medium">
          {PARCELAS_MAX}x de{" "}
          <span className="whitespace-nowrap">{formatarParcela()}</span>
        </p>
        <p className="mt-3">
          sem juros no cartão, ou{" "}
          <span className="whitespace-nowrap">{formatarPreco()} no Pix</span>.
          Frete à parte.
        </p>
        {/* O preço de depois, que vale de verdade: ancora sem preço riscado */}
        <p className="mt-3 max-w-[46ch]">
          Este é o preço da primeira edição. A partir de {PRECO_DEPOIS_A_PARTIR}
          , o livro passa a custar{" "}
          <span className="whitespace-nowrap">
            {formatarPreco(PRECO_DEPOIS)}
          </span>
          .
        </p>
        {/* Presente de irmãos: o valor dividido, sem desconto e sem preço riscado */}
        <p className="text-pequeno mt-2">
          Entre três irmãos, fica em cerca de{" "}
          <span className="whitespace-nowrap">
            {formatarPreco(Math.round(PRECO_LIVRO / 3))}
          </span>{" "}
          para cada um.
        </p>

        {/* O que vem no preço, do primeiro dia ao livro na mão */}
        <p className="mt-8 font-medium">Neste valor, vocês recebem:</p>
        <ul className="marker:text-tinta-2 mt-3 max-w-[46ch] list-disc space-y-2 pl-5">
          {INCLUSO.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-8 max-w-[46ch]">
          O começo é por nossa conta. Você só paga se gostar da primeira página.
          Se não gostar, ela fica com vocês.
        </p>
      </div>

      {/* No desktop, o formulário acompanha a folha enquanto se lê o que vem incluído */}
      <div
        className="col-span-12 mt-12 lg:sticky lg:top-24 lg:col-span-5 lg:col-start-8 lg:mt-10 lg:self-start lg:pt-10"
        data-entra
        style={ordem(2)}
      >
        <FormInteresse />
      </div>
    </Section>
  );
}
