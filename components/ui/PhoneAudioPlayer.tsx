"use client";

import { useRef, useState, type CSSProperties } from "react";
import s from "./PhoneAudioPlayer.module.css";

type PhoneAudioPlayerProps = {
  titulo: string;
  /** Duração exibida enquanto o áudio não carrega, ex. "2:14". */
  duracao: string;
  /** Só quando /audio/amostra.mp3 existe; sem ele o player é visual e não toca. */
  src?: string;
  className?: string;
};

function relogio(segundos: number): string {
  const t = Math.max(0, Math.floor(segundos));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

/**
 * O celular de quem apontou para o QR, tocando a voz. Interface de outro app: raiz com data-ui.
 * Sem áudio de verdade, mostra o player parado no meio da história, sem botão ativo.
 */
export function PhoneAudioPlayer({
  titulo,
  duracao,
  src,
  className,
}: PhoneAudioPlayerProps) {
  const audio = useRef<HTMLAudioElement>(null);
  const [tocando, setTocando] = useState(false);
  const [atual, setAtual] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  // Parado no meio da história (0:47 de 2:14) enquanto nada toca
  const progresso =
    atual !== null && total ? atual / total : src ? 0 : 47 / 134;
  const tempo = atual !== null ? relogio(atual) : src ? "0:00" : "0:47";
  const fim = total ? relogio(total) : duracao;

  function alternar() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }

  const icone = (
    <svg viewBox="0 0 24 24" aria-hidden className={s.icone}>
      {tocando ? (
        <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
      ) : (
        <path
          d="M8 5.2v13.6a.6.6 0 0 0 .9.5l10.6-6.8a.6.6 0 0 0 0-1L8.9 4.7a.6.6 0 0 0-.9.5z"
          fill="currentColor"
        />
      )}
    </svg>
  );

  return (
    <div data-ui className={[s.celular, className].filter(Boolean).join(" ")}>
      <div className={s.tela}>
        <span className={s.ilha} aria-hidden />
        <span className={s.capa} aria-hidden>
          <span className={s.filete} />
        </span>
        <p className={s.titulo}>{titulo}</p>

        <div
          className={s.barra}
          role="progressbar"
          aria-label="Progresso da história"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progresso * 100)}
        >
          <span
            className={s.preenchido}
            style={{ "--p": progresso } as CSSProperties}
          />
        </div>
        <p className={s.tempos}>
          <span>{tempo}</span>
          <span>{fim}</span>
        </p>

        {src ? (
          <button
            type="button"
            className={s.play}
            onClick={alternar}
            aria-label={tocando ? "Pausar a história" : "Ouvir a história"}
          >
            {icone}
          </button>
        ) : (
          <span className={s.play} data-inativo aria-hidden>
            {icone}
          </span>
        )}

        {src ? (
          <audio
            ref={audio}
            src={src}
            preload="none"
            onPlay={() => setTocando(true)}
            onPause={() => setTocando(false)}
            onEnded={() => setTocando(false)}
            onLoadedMetadata={(e) => setTotal(e.currentTarget.duration)}
            onTimeUpdate={(e) => setAtual(e.currentTarget.currentTime)}
          />
        ) : null}
      </div>
    </div>
  );
}
