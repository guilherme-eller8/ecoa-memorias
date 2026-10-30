import type { Metadata } from "next";
import { Caveat, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CliquesCta } from "@/components/ui/CliquesCta";
import { Entrada } from "@/components/ui/Entrada";
import { MARCA } from "@/lib/config";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const TITULO = `${MARCA} · Livro de memórias contado por áudio`;
// A frase de apoio do hero
const DESCRICAO =
  "Uma pergunta por dia no WhatsApp, respondida por áudio. Em quatro semanas, as histórias, as fotos e as mensagens da família viram um livro de capa dura, entregue antes do Natal.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: MARCA,
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Com JS, o movimento pode esconder o que ainda vai entrar; sem JS, nada some */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {children}
        <Entrada />
        <CliquesCta />
        <Analytics />
      </body>
    </html>
  );
}
