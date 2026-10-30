"use client";

import { useEffect, useRef, useState } from "react";

type VideoLoopProps = {
  src: string;
  /** Foto que aparece antes do vídeo, sem JS e para quem prefere menos movimento. */
  poster: string;
  className?: string;
};

/**
 * Um loop mudo, decorativo: a foto (com o alt) fica embaixo e o vídeo só entra por cima
 * quando pode tocar. Com movimento reduzido, nunca toca. Fora da tela, pausa.
 */
export function VideoLoop({ src, poster, className }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocar, setTocar] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTocar(true);
          void video.play().catch(() => setTocar(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={[
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
        tocar ? "opacity-100" : "opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    />
  );
}
