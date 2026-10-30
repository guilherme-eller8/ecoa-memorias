import type { Metadata } from "next";
import { Caveat, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Entrada } from "@/components/ui/Entrada";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Ecoa Memórias · Livro de memórias contado por áudio",
  description:
    "Uma pergunta por dia no WhatsApp, respondida por áudio. Em quatro semanas, as histórias, as fotos e as mensagens da família viram um livro de capa dura, entregue antes do Natal.",
  openGraph: { locale: "pt_BR", siteName: "Ecoa Memórias" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${caveat.variable}`}>
      <body>
        {children}
        <Entrada />
        <Analytics />
      </body>
    </html>
  );
}
