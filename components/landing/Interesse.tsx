import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import {
  formatarParcela,
  formatarPreco,
  LIVROS_NA_EDICAO,
  PARCELAS_MAX,
} from "@/lib/config";
import { FormInteresse } from "./FormInteresse";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

// O colofão da edição, com o preço e as vagas, e o formulário de interesse ao lado.
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

        {/* Uma frase por linha: as vagas, depois o que acontece quando acabam */}
        <p className="text-destaque mt-8 font-medium">
          <span className="block">
            Só {LIVROS_NA_EDICAO} vagas nesta edição.
          </span>
          <span className="block">Quando acabarem, a edição fecha.</span>
        </p>

        <p className="mt-8 max-w-[46ch]">
          O começo é por nossa conta. Você só paga se gostar da primeira página.
          Se não gostar, ela fica com vocês.
        </p>
        <p className="text-pequeno mt-3 max-w-[46ch]">
          Depois de pagar, ainda tem 7 dias para desistir, com devolução
          integral.
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
