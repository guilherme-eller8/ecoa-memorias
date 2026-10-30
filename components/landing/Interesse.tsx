import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import {
  formatarData,
  formatarParcela,
  formatarPreco,
  LIVROS_NA_EDICAO,
  PARCELAS_MAX,
  PRECO_EXEMPLAR_EXTRA,
} from "@/lib/config";
import { FormInteresse } from "./FormInteresse";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// O colofão da edição, com o preço e as vagas, e o formulário de interesse ao lado.
export function Interesse() {
  const data = formatarData();
  return (
    <Section id="interesse" title="Edição de Natal 2026" grid>
      <div
        className="folha-recortada col-span-12 mt-8 px-6 pt-10 pb-12 md:px-12 md:pt-12 md:pb-14 lg:col-span-6 lg:mt-10"
        data-entra
        style={ordem(1)}
      >
        <p className="text-display font-medium">{formatarPreco()}</p>
        <p className="mt-3">por livro. Frete à parte.</p>

        <p className="mt-6">
          <span className="whitespace-nowrap">
            Pix ou {PARCELAS_MAX}x de {formatarParcela()}
          </span>{" "}
          <span aria-hidden>·</span>{" "}
          <span className="whitespace-nowrap">
            Exemplares extras: {formatarPreco(PRECO_EXEMPLAR_EXTRA)}
          </span>
        </p>

        <p className="text-destaque mt-8 max-w-[24ch] font-medium text-balance">
          Só {LIVROS_NA_EDICAO} vagas nesta edição. Inscrições até{" "}
          <span className="whitespace-nowrap">{data}</span>.
        </p>

        <p className="mt-8 max-w-[46ch]">
          Se a primeira história não emocionar a família, devolvemos 100%.
        </p>
      </div>

      <div
        className="col-span-12 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-10 lg:pt-10"
        data-entra
        style={ordem(2)}
      >
        <FormInteresse />
      </div>
    </Section>
  );
}
