import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { CabecalhoTom } from "./CabecalhoTom";

const LINKS = [
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#livro", rotulo: "O livro" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#interesse", rotulo: "Valor" },
] as const;

const LINK =
  "underline-offset-4 decoration-1 transition-[text-decoration-color] duration-150 " +
  "decoration-transparent hover:decoration-current focus-visible:decoration-current active:opacity-70";

export function Cabecalho() {
  return (
    <CabecalhoTom>
      <Container className="relative flex h-16 items-center gap-6 md:h-[72px]">
        <a
          href="#topo"
          className="mr-auto inline-flex min-h-12 items-center"
          aria-label="Ecoa Memórias, início"
        >
          <Logo decorativo className="h-10 w-auto md:h-11" />
        </a>

        <nav aria-label="Seções" className="hidden md:block">
          <ul className="text-pequeno flex gap-7 lg:gap-9">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`${LINK} underline`}>
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href="#interesse"
          data-cta="header"
          className="text-pequeno! min-h-11! px-4! md:min-h-12! md:px-5!"
        >
          Tenho interesse
        </Button>

        {/* No celular, os links vão para um menu simples: funciona sem JS */}
        <details className="group md:hidden">
          <summary className="rounded-ed flex min-h-12 min-w-12 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 transition-transform duration-(--t-ui) ease-(--ease-out) group-open:rotate-90"
              aria-hidden
            >
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <nav
            aria-label="Seções"
            className="bg-papel absolute inset-x-0 top-full hidden origin-top px-(--margem) pt-2 pb-6 group-open:block group-open:animate-[abre-menu_var(--t-ui)_var(--ease-out)]"
          >
            <ul className="grid">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`${LINK} flex min-h-12 items-center underline`}
                  >
                    {l.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </Container>
    </CabecalhoTom>
  );
}
