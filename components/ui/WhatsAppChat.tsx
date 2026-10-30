import s from "./WhatsAppChat.module.css";

type Base = {
  /** Quem escreveu (só aparece no grupo, nas mensagens dos outros). */
  autor?: string;
  hora: string;
  /** Mensagem de quem está com o celular na mão. */
  minha?: boolean;
  /** Reação em emoji sob o balão. */
  reacao?: string;
};

export type MensagemChat =
  | (Base & { tipo: "texto"; texto: string })
  | (Base & { tipo: "audio"; duracao: string; legenda?: string });

type WhatsAppChatProps = {
  /** individual: Ecoa ↔ quem conta. grupo: o grupo só da família. */
  variant: "individual" | "grupo";
  /** Nome do contato ou do grupo. */
  titulo: string;
  /** Linha abaixo do título: participantes no grupo, "online" no individual. */
  subtitulo?: string;
  mensagens: MensagemChat[];
  className?: string;
};

// Forma de onda determinística: o mesmo desenho no servidor e no cliente.
const BARRAS = Array.from({ length: 34 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.43) * 0.4);
  return 0.22 + v * 0.78;
});

function Onda() {
  return (
    <svg
      className={s.onda}
      viewBox={`0 0 ${BARRAS.length * 3} 20`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {BARRAS.map((a, i) => (
        <rect
          key={i}
          x={i * 3}
          y={10 - a * 9}
          width={1.8}
          height={a * 18}
          rx={0.9}
          className={i < 5 ? s.ondaOuvida : undefined}
        />
      ))}
    </svg>
  );
}

/**
 * Simulação do WhatsApp, dessaturada para a paleta. É a interface de outro app:
 * a raiz leva data-ui e usa a pilha system-ui.
 */
export function WhatsAppChat({
  variant,
  titulo,
  subtitulo,
  mensagens,
  className,
}: WhatsAppChatProps) {
  const inicial = titulo.trim().charAt(0).toUpperCase();
  return (
    <figure
      data-ui
      data-variant={variant}
      className={[s.chat, className].filter(Boolean).join(" ")}
      aria-label={`Conversa no WhatsApp: ${titulo}`}
    >
      <div className={s.topo}>
        <span className={s.avatar} aria-hidden>
          {inicial}
        </span>
        <span className={s.contato}>
          <span className={s.titulo}>{titulo}</span>
          {subtitulo ? <span className={s.subtitulo}>{subtitulo}</span> : null}
        </span>
      </div>

      <ol className={s.conversa}>
        {mensagens.map((m, i) => (
          <li
            key={i}
            className={s.linha}
            data-minha={m.minha || undefined}
            data-reacao={m.reacao ? true : undefined}
          >
            <div className={s.balao}>
              {variant === "grupo" && !m.minha && m.autor ? (
                <span className={s.autor}>{m.autor}</span>
              ) : null}

              {m.tipo === "audio" ? (
                <>
                  <span className={s.audio}>
                    <span className={s.play} aria-hidden />
                    <span className={s.trilha}>
                      <Onda />
                      <span className={s.meta}>
                        <span>
                          <span className="sr-only">Áudio de </span>
                          {m.duracao}
                        </span>
                        <span>{m.hora}</span>
                      </span>
                    </span>
                  </span>
                  {m.legenda ? (
                    <span className={s.legenda}>{m.legenda}</span>
                  ) : null}
                </>
              ) : (
                <span className={s.texto}>
                  {m.texto}
                  <span className={s.hora}>{m.hora}</span>
                </span>
              )}

              {m.reacao ? (
                <span className={s.reacao} aria-label={`Reação ${m.reacao}`}>
                  {m.reacao}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
