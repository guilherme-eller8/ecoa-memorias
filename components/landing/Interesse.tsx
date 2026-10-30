import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import {
  formatarData,
  formatarPreco,
  LIVROS_NA_EDICAO,
  PARCELAS_MAX,
  PRECO_EXEMPLAR_EXTRA,
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
        <p className="mt-3">por livro, com tudo incluído</p>

        <ul className="mt-8">
          <li>Pix ou cartão em até {PARCELAS_MAX}x</li>
          <li>
            Exemplares extras para a família:{" "}
            <span className="whitespace-nowrap">
              {formatarPreco(PRECO_EXEMPLAR_EXTRA)} cada
            </span>
          </li>
          <li>Pode ser um presente dos irmãos juntos</li>
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

        <p className="text-pequeno mt-12 max-w-[52ch]">
          Depois do primeiro livro, quem quiser pode continuar contando
          histórias e criar um novo volume. É opcional, sem renovação
          automática.
        </p>
      </div>

      <div
        className="col-span-12 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-16 lg:pt-12"
        data-entra
        style={ordem(2)}
      >
        <FormInteresse />
      </div>

      <p className="col-span-12 mt-12 max-w-[62ch] md:mt-16" data-entra>
        Se a primeira história não emocionar a família, devolvemos o valor
        integral.
      </p>
    </Section>
  );
}
