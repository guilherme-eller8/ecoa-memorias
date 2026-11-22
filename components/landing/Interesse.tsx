import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import {
  DATA_PRIMEIRA_PAGINA,
  formatarData,
  formatarParcela,
  formatarPreco,
  FORMATO_NOME,
  PAGINAS_LIVRO,
  PAPEL_LIVRO,
  PARCELAS_MAX,
  PRAZO_PARA_CONTAR,
  PRECO_DEPOIS,
  PRECO_DEPOIS_A_PARTIR,
  PRECO_LIVRO,
} from "@/lib/config";
import { FormInteresse } from "./FormInteresse";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// "até um ano" → "Até um ano": o item abre a frase
const ATE = `Até ${PRAZO_PARA_CONTAR}`;

// Tudo o que o preço cobre, na ordem em que acontece
const INCLUSO = [
  `O cartão para entregar na ceia e a primeira página no dia ${formatarData(DATA_PRIMEIRA_PAGINA).split(" ")[0]}, em PDF.`,
  `${ATE} para contar as histórias, no ritmo de quem conta.`,
  "Cada história editada por uma pessoa, sem perder o jeito de falar.",
  "Um grupo só da família, onde cada história chega no mesmo dia.",
  "As mensagens secretas da família, cada uma numa página, com QR code.",
  `O livro de capa dura ${FORMATO_NOME}, com ${PAGINAS_LIVRO} páginas coloridas em ${PAPEL_LIVRO}: de 10 a 20 histórias, com fotos e um QR code que toca a voz.`,
  "Os áudios originais, para a família guardar.",
];

/**
 * O colofão da edição e o formulário, numa tela só no desktop: a folha ocupa 8 colunas, com o preço
 * em cima e, embaixo, a garantia de um lado e o que vem incluído do outro; o formulário fica nas 4 restantes.
 */
export function Interesse() {
  return (
    <Section id="interesse" title="Edição de Natal 2026" grid>
      <div
        className="folha-recortada col-span-12 mt-8 px-6 pt-10 pb-12 md:px-12 md:pt-12 md:pb-14 lg:col-span-8 lg:mt-10 lg:px-10 lg:pt-10 lg:pb-12"
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

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          <div>
            {/* O preço de depois, que vale de verdade: ancora sem preço riscado */}
            <p>
              Este é o preço da primeira edição. A partir de{" "}
              {PRECO_DEPOIS_A_PARTIR}, o livro passa a custar{" "}
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
            <p className="mt-6">
              O começo é por nossa conta. Você só paga se gostar da primeira
              página. Se não gostar, ela fica com vocês.
            </p>
          </div>

          {/* O que vem no preço, do primeiro dia ao livro na mão */}
          <div>
            <p className="font-medium">Neste valor, vocês recebem:</p>
            <ul className="text-pequeno marker:text-tinta-2 mt-3 list-disc space-y-1.5 pl-5">
              {INCLUSO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-10 lg:pt-10"
        data-entra
        style={ordem(2)}
      >
        <FormInteresse />
      </div>
    </Section>
  );
}
