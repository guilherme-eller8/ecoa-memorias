import type { CSSProperties } from "react";

type QuestionCardProps = {
  pergunta: string;
  /** Giro do cartão sobre a mesa, em graus. */
  rotate?: number;
  className?: string;
};

// Cartão de papel branco com uma pergunta. Separa-se do fundo pelo tom, sem sombra.
export function QuestionCard({
  pergunta,
  rotate = 0,
  className,
}: QuestionCardProps) {
  const estilo: CSSProperties | undefined = rotate
    ? { transform: `rotate(${rotate}deg)` }
    : undefined;
  return (
    <p
      className={[
        "rounded-ed bg-papel text-tinta px-5 pt-4 pb-6 text-left font-medium",
        "text-[clamp(26px,1.95vw,28px)] leading-[1.15] tracking-[-0.01em]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={estilo}
    >
      {pergunta}
    </p>
  );
}
