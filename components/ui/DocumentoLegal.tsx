import Link from "next/link";
import type { ReactNode } from "react";
import { Rodape } from "@/components/landing/Rodape";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MARCA } from "@/lib/config";

/** Uma seção de um documento legal: título no tamanho de destaque e parágrafos espaçados. */
export function Bloco({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="text-destaque">{titulo}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

/**
 * Casca das páginas de texto legal (privacidade, termos): logo que volta ao início, coluna de leitura
 * de 62ch e o mesmo rodapé da landing.
 */
export function DocumentoLegal({
  titulo,
  data,
  children,
}: {
  titulo: string;
  /** Linha pequena abaixo do título, como "Atualizada em 2 de novembro de 2026." */
  data: string;
  children: ReactNode;
}) {
  return (
    <div>
      <header className="bg-polen">
        <Container className="flex h-16 items-center md:h-[72px]">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center"
            aria-label={`${MARCA}, página inicial`}
          >
            <Logo decorativo className="h-12 w-auto md:h-[58px]" />
          </Link>
        </Container>
      </header>

      <main>
        <Container className="pt-12 pb-[clamp(72px,9vw,140px)] md:pt-20">
          <article className="max-w-[62ch]">
            <h1 className="text-h2">{titulo}</h1>
            <p className="text-pequeno mt-4">{data}</p>
            {children}
          </article>
        </Container>
      </main>

      <Rodape />
    </div>
  );
}
