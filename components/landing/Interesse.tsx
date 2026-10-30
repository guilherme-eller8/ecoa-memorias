import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import {
  formatarData,
  formatarParcela,
  formatarPreco,
  LIVROS_NA_EDICAO,
  PARCELAS_MAX,
  PRECO_EXEMPLAR_EXTRA,
  PRECO_LIVRO,
} from "@/lib/config";
import { FormInteresse } from "./FormInteresse";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// O colofão da edição, com a tiragem e o preço, e o formulário de interesse ao lado.
export function Interesse() {
  const data = formatarData();
  return (
    <Section id="interesse" title="Edição de Natal 2026" grid>
      <div
        className="folha-recortada col-span-12 mt-10 px-6 pt-12 pb-14 md:px-12 md:pt-16 md:pb-[72px] lg:col-span-6 lg:mt-16"
        data-entra
        style={ordem(1)}
      >
        <p className="text-display font-medium">{formatarPreco()}</p>
        <p className="mt-3">por livro. Frete à parte, para todo o Brasil.</p>

        <ul className="mt-8">
          <li>
            Pix ou {PARCELAS_MAX}x sem juros de{" "}
            <span className="whitespace-nowrap">{formatarParcela()}</span>
          </li>
          <li>
            Exemplares extras:{" "}
            <span className="whitespace-nowrap">
              {formatarPreco(PRECO_EXEMPLAR_EXTRA)} cada
            </span>
          </li>
          <li>
            Entre três irmãos, sai por menos de{" "}
            <span className="whitespace-nowrap">
              {formatarPreco(Math.ceil(PRECO_LIVRO / 3))}
            </span>{" "}
            para cada.
          </li>
        </ul>

        <div className="mt-12 max-w-[46ch]">
          <p className="text-destaque font-medium text-balance">
            Tiragem: {LIVROS_NA_EDICAO} livros. Inscrições até{" "}
            <span className="whitespace-nowrap">{data}</span>.
          </p>
          <p className="mt-4">
            Para que cada livro receba o cuidado que merece: quatro semanas de
            histórias e tempo de edição, impressão e entrega antes do Natal.
          </p>
        </div>

        <p className="mt-12 max-w-[46ch]">
          Você recebe a primeira história editada. Se ela não emocionar a
          família, devolvemos 100%. E se a pessoa não topar participar, também.
        </p>
      </div>

      <div
        className="col-span-12 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-16 lg:pt-12"
        data-entra
        style={ordem(2)}
      >
        <FormInteresse />
      </div>
    </Section>
  );
}
