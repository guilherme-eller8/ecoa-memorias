"use client";

import {
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { QuestionCard } from "@/components/ui/QuestionCard";

type Item = { pergunta: string; foto?: ReactNode };

/** A página que a pergunta virou: a foto antiga atrás, o cartão na frente. */
function Pagina({ item }: { item: Item }) {
  if (!item.foto) {
    return (
      <QuestionCard
        pergunta={item.pergunta}
        rotate={-2}
        className="w-full max-w-[420px] lg:w-[88%]"
      />
    );
  }
  return (
    <div className="relative w-full max-w-[440px] pb-16">
      <div className="w-[70%] rotate-[2deg] lg:w-[78%]">{item.foto}</div>
      <QuestionCard
        pergunta={item.pergunta}
        rotate={-3}
        className="absolute right-0 bottom-0 w-[96%] lg:w-[80%]"
      />
    </div>
  );
}

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;
const nada = () => () => {};

export function Fichario({ itens }: { itens: Item[] }) {
  const [ativa, setAtiva] = useState(0);
  // Celular: só o cartão aberto fica na página. Sem JS, todos ficam no HTML.
  const [aberta, setAberta] = useState<number | null>(0);
  const hidratado = useSyncExternalStore(
    nada,
    () => true,
    () => false,
  );

  return (
    <>
      {/* Desktop: lista à esquerda, quadro fixo à direita */}
      <ol
        className="col-span-7 mt-14 hidden lg:block"
        data-entra
        style={ordem(1)}
      >
        {itens.map((item, i) => (
          <li key={item.pergunta}>
            <button
              type="button"
              aria-pressed={i === ativa}
              onMouseEnter={() => setAtiva(i)}
              onFocus={() => setAtiva(i)}
              onClick={() => setAtiva(i)}
              className={[
                "text-destaque rounded-ed w-full cursor-pointer py-2.5 text-left font-medium",
                "transition-transform duration-150 ease-out active:translate-y-px",
                "focus-visible:outline-polen focus-visible:outline-2 focus-visible:outline-offset-2",
                // a pergunta apontada ganha um quadrado pólen na margem; o texto não sai do lugar
                "before:rounded-ed before:bg-polen relative before:absolute before:top-[0.62em] before:-left-4 before:size-2 before:transition-opacity before:duration-200 md:before:-left-6",
                i === ativa
                  ? "before:opacity-100"
                  : "before:opacity-0 hover:before:opacity-50",
              ].join(" ")}
            >
              {item.pergunta}
            </button>
          </li>
        ))}
      </ol>

      <div
        className="col-span-5 col-start-8 mt-14 hidden self-start lg:sticky lg:top-28 lg:block"
        data-entra
        style={ordem(2)}
      >
        {/* O quadro ilustra a pergunta escolhida, que o botão já anuncia com aria-pressed:
            repeti-la numa região viva só faria o leitor de tela dizer tudo duas vezes */}
        <div aria-hidden className="relative min-h-[560px]">
          {itens.map((item, i) => (
            <div
              key={item.pergunta}
              className={[
                "absolute inset-0 flex items-center transition-[opacity,visibility] duration-[240ms] ease-out",
                i === ativa ? "visible opacity-100" : "invisible opacity-0",
              ].join(" ")}
            >
              <Pagina item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Celular: tocar uma pergunta abre o cartão logo abaixo dela, uma por vez */}
      <ol className="col-span-12 mt-10 lg:hidden" data-entra style={ordem(1)}>
        {itens.map((item, i) => (
          <li key={item.pergunta}>
            <details
              name="perguntas"
              open={i === 0}
              className="group"
              onToggle={(e) => {
                if (e.currentTarget.open) setAberta(i);
                else setAberta((a) => (a === i ? null : a));
              }}
            >
              <summary
                className={[
                  "text-destaque rounded-ed block cursor-pointer list-none py-3 font-medium",
                  "[&::-webkit-details-marker]:hidden",
                  "transition-transform duration-150 ease-out active:translate-y-px",
                  // no celular a margem é estreita demais para o marcador: o cartão aberto já diz qual é
                  "relative",
                  "focus-visible:outline-polen focus-visible:outline-2 focus-visible:outline-offset-2",
                ].join(" ")}
              >
                {item.pergunta}
              </summary>
              {!hidratado || aberta === i ? (
                <div className="pt-3 pb-8">
                  <Pagina item={item} />
                </div>
              ) : null}
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
