import type { CSSProperties, ReactNode } from "react";

type NoteCardProps = {
  texto: string;
  /** Giro do bilhete, em graus. */
  rotate?: number;
  /** O texto continua além do cartão: sugere, não revela. */
  corte?: "direita" | "baixo";
  /** Algo colado no bilhete, como um QR pequeno. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

// Bilhete da família em papel pólen, escrito à mão. Separa-se da foto pelo tom, sem sombra.
export function NoteCard({
  texto,
  rotate = 0,
  corte,
  children,
  className,
  style,
}: NoteCardProps) {
  return (
    <figure
      className={[
        "rounded-ed bg-polen text-tinta m-0 overflow-hidden",
        corte === "baixo" ? "px-5 pt-4" : "px-5 pt-4 pb-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <blockquote
        className={[
          "font-mao m-0 text-[clamp(24px,2vw,30px)] leading-[1.15]",
          corte === "direita" && "w-[135%] whitespace-nowrap",
          corte === "baixo" && "max-h-[1.9em] overflow-hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {texto}
      </blockquote>
      {children}
    </figure>
  );
}
