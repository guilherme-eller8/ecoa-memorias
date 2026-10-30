import { useId, type CSSProperties, type ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  /** Toda seção abre com um título que diz o que ela é. */
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Degrau de tom: polen (fundo), papel (um tom acima) ou floresta (campo escuro). */
  tone?: "polen" | "papel" | "floresta";
  /** O conteúdo usa o grid de 12 colunas; o título ocupa a linha inteira. */
  grid?: boolean;
  titleClassName?: string;
  className?: string;
};

const TONS = {
  polen: "",
  papel: "bg-papel",
  floresta: "bg-floresta text-polen",
} as const;

export function Section({
  title,
  children,
  id,
  tone = "polen",
  grid = false,
  titleClassName,
  className,
}: SectionProps) {
  const tituloId = useId();
  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      className={["py-[clamp(56px,6.6vw,96px)]", TONS[tone], className]
        .filter(Boolean)
        .join(" ")}
    >
      <Container grid={grid}>
        <h2
          id={tituloId}
          data-entra
          style={{ "--ordem": 0 } as CSSProperties}
          className={[
            "text-h2 max-w-[24ch]",
            grid && "col-span-12",
            titleClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}
