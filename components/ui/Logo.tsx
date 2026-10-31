import {
  LOGO_ARVORE,
  LOGO_ECOA,
  LOGO_MEMORIAS,
  LOGO_TRACO,
  LOGO_VIEWBOX,
  MONOGRAMA_ARVORE,
  MONOGRAMA_TRACO,
  MONOGRAMA_VIEWBOX,
} from "./logo-paths";

type LogoProps = {
  /** Fundo onde o logo assenta: muda a cor do texto e da árvore. */
  variant?: "polen" | "floresta";
  /** Só a árvore (favicon, pé da capa), em dourado. */
  monograma?: boolean;
  className?: string;
  /** Decorativo quando o nome já está escrito ao lado. */
  decorativo?: boolean;
};

export function Logo({
  variant = "polen",
  monograma = false,
  className,
  decorativo = false,
}: LogoProps) {
  const acessivel = decorativo
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": "Ecoa Memórias" };

  if (monograma) {
    return (
      <svg viewBox={MONOGRAMA_VIEWBOX} className={className} {...acessivel}>
        <g
          fill="none"
          stroke="var(--dourado)"
          strokeWidth={MONOGRAMA_TRACO}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MONOGRAMA_ARVORE.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>
    );
  }

  const texto = variant === "floresta" ? "var(--polen)" : "var(--tinta)";
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} {...acessivel}>
      <path fill={texto} d={LOGO_ECOA} />
      <path fill={texto} d={LOGO_MEMORIAS} />
      <g
        fill="none"
        stroke={texto}
        strokeWidth={LOGO_TRACO}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {LOGO_ARVORE.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
