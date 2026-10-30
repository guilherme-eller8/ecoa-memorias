"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ESCONDIDO: Keyframe = { opacity: 0, transform: "translateY(20px)" };
const VISIVEL: Keyframe = { opacity: 1, transform: "none" };

/**
 * Entrada por seção: título, depois texto, depois imagem, subindo com opacidade, uma vez.
 * Só esconde o que ainda está abaixo da dobra, e só depois que o JS roda: sem JS, nada some.
 * Usa a Web Animations API para não mexer nos atributos que o React hidrata.
 * A ordem vem de --ordem em cada [data-entra] (75ms entre um e outro).
 */
export function Entrada() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ocultas = new Map<Element, Animation>();
    for (const el of document.querySelectorAll<HTMLElement>("[data-entra]")) {
      if (el.getBoundingClientRect().top <= innerHeight) continue;
      ocultas.set(
        el,
        el.animate([ESCONDIDO], { duration: 0, fill: "forwards" }),
      );
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const { isIntersecting, target } of entradas) {
          if (!isIntersecting) continue;
          observador.unobserve(target);
          const ordem =
            parseFloat(getComputedStyle(target).getPropertyValue("--ordem")) ||
            0;
          ocultas.get(target)?.cancel();
          target.animate([ESCONDIDO, VISIVEL], {
            duration: 650,
            delay: ordem * 75,
            easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
            fill: "backwards",
          });
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    ocultas.forEach((_, el) => observador.observe(el));
    return () => {
      observador.disconnect();
      ocultas.forEach((a) => a.cancel());
    };
  }, [pathname]);

  return null;
}
