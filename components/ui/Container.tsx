import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** Grid de 12 colunas. */
  grid?: boolean;
  as?: ElementType;
  className?: string;
};

// Largura máxima de 1280px e margens externas iguais (20px no mobile, 32px no desktop).
export function Container({
  children,
  grid = false,
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={[
        "mx-auto w-full max-w-[calc(1280px+var(--margem)*2)] px-(--margem)",
        grid && "grid grid-cols-12 gap-x-5 md:gap-x-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
