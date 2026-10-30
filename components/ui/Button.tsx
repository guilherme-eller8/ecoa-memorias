import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variante = "primario" | "invertido" | "link";

type Comum = {
  children: ReactNode;
  /** primario: floresta sobre polen. invertido: polen sobre floresta (fecho). link: sublinhado. */
  variant?: Variante;
  className?: string;
};

type ComoLink = Comum & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className"
  >;
type ComoBotao = Comum & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  >;

const BASE_SOLIDO =
  "inline-flex min-h-12 items-center justify-center rounded-ed px-6 py-2 text-corpo leading-tight font-medium " +
  "transition-[transform,background-color] duration-150 ease-out active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-3";

const VARIANTES: Record<Variante, string> = {
  primario: `${BASE_SOLIDO} bg-floresta text-polen hover:bg-[color-mix(in_oklab,var(--floresta)_88%,var(--polen))] focus-visible:outline-floresta`,
  invertido: `${BASE_SOLIDO} bg-polen text-floresta hover:bg-papel focus-visible:outline-polen`,
  link:
    "inline underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-150 " +
    "hover:decoration-2 active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4",
};

export function Button(props: ComoLink | ComoBotao) {
  const { variant = "primario", className, children, ...resto } = props;
  const classes = [VARIANTES[variant], className].filter(Boolean).join(" ");

  if (resto.href !== undefined) {
    const { href, ...a } = resto as ComoLink;
    return (
      <Link href={href} className={classes} {...a}>
        {children}
      </Link>
    );
  }
  const { type = "button", ...b } = resto as Omit<ComoBotao, keyof Comum>;
  return (
    <button type={type} className={classes} {...b}>
      {children}
    </button>
  );
}
