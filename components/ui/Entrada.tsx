"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)";
const PASSO = 75; // entre título, texto e imagem
const PASSO_ITEM = 70; // entre os itens de uma lista

type Modo = "sobe" | "foto" | "lista" | "pagina";

// Com movimento: cada modo tem a sua chegada. Com movimento reduzido: só a opacidade.
const ESCONDIDO: Record<Modo, Keyframe> = {
  sobe: { opacity: 0, transform: "translateY(20px)" },
  foto: { clipPath: "inset(0 0 100% 0)" },
  lista: {},
  pagina: { opacity: 0, transform: "translateY(20px)" },
};
const SO_OPACIDADE: Keyframe = { opacity: 0 };

function modoDe(el: HTMLElement): Modo {
  const v = el.dataset.entra;
  return v === "foto" || v === "lista" || v === "pagina" ? v : "sobe";
}

/**
 * Entrada por seção: título, depois texto, depois imagem, uma vez, quando a parte entra na tela.
 * data-entra escolhe o modo: "" sobe com opacidade; "foto" abre por máscara; "lista" traz os
 * [data-entra-item] um a um; "pagina" sobe e vira a folha [data-vira] do livro aberto.
 * Só esconde o que ainda está abaixo da dobra, e só depois que o JS roda: sem JS, nada some.
 * Usa a Web Animations API para não mexer nos atributos que o React hidrata.
 * A ordem vem de --ordem em cada [data-entra].
 */
export function Entrada() {
  const pathname = usePathname();

  useEffect(() => {
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ocultas = new Map<Element, Animation[]>();
    const esconder = (el: Element, quadro: Keyframe) =>
      el.animate([quadro], { duration: 0, fill: "forwards" });

    for (const el of document.querySelectorAll<HTMLElement>("[data-entra]")) {
      const caixa = el.getBoundingClientRect();
      // Já na tela, ou fora dela para o lado (a fileira que rola na horizontal): fica como está
      if (caixa.top <= innerHeight || caixa.left >= innerWidth) continue;
      const modo = modoDe(el);
      const anims: Animation[] = [];
      if (modo === "lista") {
        for (const item of el.querySelectorAll("[data-entra-item]"))
          anims.push(esconder(item, reduzido ? SO_OPACIDADE : ESCONDIDO.sobe));
      } else {
        anims.push(esconder(el, reduzido ? SO_OPACIDADE : ESCONDIDO[modo]));
      }
      const folha = el.querySelector("[data-vira]");
      if (modo === "pagina" && folha && !reduzido)
        anims.push(
          esconder(folha, { opacity: 0, transform: "rotateY(-118deg)" }),
        );
      ocultas.set(el, anims);
    }

    const chegar = (el: Element, de: Keyframe, atraso: number, ms = 560) =>
      el.animate([de, { opacity: 1, transform: "none", clipPath: "none" }], {
        duration: reduzido ? 320 : ms,
        delay: atraso,
        easing: EXPO,
        fill: "backwards",
      });

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const { isIntersecting, target } of entradas) {
          if (!isIntersecting) continue;
          observador.unobserve(target);
          const el = target as HTMLElement;
          const modo = modoDe(el);
          const ordem =
            parseFloat(getComputedStyle(el).getPropertyValue("--ordem")) || 0;
          const atraso = ordem * PASSO;
          ocultas.get(el)?.forEach((a) => a.cancel());

          if (modo === "lista") {
            el.querySelectorAll("[data-entra-item]").forEach((item, i) =>
              chegar(
                item,
                reduzido ? SO_OPACIDADE : ESCONDIDO.sobe,
                atraso + i * PASSO_ITEM,
              ),
            );
          } else if (modo === "foto" && !reduzido) {
            el.animate(
              [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)" }],
              {
                duration: 800,
                delay: atraso,
                easing: IN_OUT,
                fill: "backwards",
              },
            );
          } else {
            chegar(el, reduzido ? SO_OPACIDADE : ESCONDIDO[modo], atraso);
          }

          // A folha direita vira sobre a dobra e assenta no lugar
          const folha = el.querySelector<HTMLElement>("[data-vira]");
          if (modo === "pagina" && folha && !reduzido) {
            const repouso = getComputedStyle(folha).transform;
            folha.animate(
              [
                { opacity: 0, transform: "rotateY(-118deg)" },
                { opacity: 1, offset: 0.35 },
                { opacity: 1, transform: repouso },
              ],
              {
                duration: 1300,
                delay: atraso + 250,
                easing: EXPO,
                fill: "backwards",
              },
            );
          }
        }
      },
      // Começa um pouco antes de a parte aparecer: no scroll rápido, nada chega desbotado
      { rootMargin: "0px 0px 15% 0px" },
    );
    ocultas.forEach((_, el) => observador.observe(el));

    // O que se move sem parar só se move enquanto está na tela
    const naTela = new IntersectionObserver((entradas) => {
      for (const { isIntersecting, target } of entradas)
        target.toggleAttribute("data-na-tela", isIntersecting);
    });
    document.querySelectorAll(".respira").forEach((el) => naTela.observe(el));

    return () => {
      observador.disconnect();
      naTela.disconnect();
      ocultas.forEach((anims) => anims.forEach((a) => a.cancel()));
    };
  }, [pathname]);

  return null;
}
