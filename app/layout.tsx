import type { Metadata } from "next";
import { Caveat, Newsreader } from "next/font/google";
import { MARCA } from "@/lib/config";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: MARCA,
  description:
    "Livros de memórias de capa dura a partir de histórias contadas por áudio no WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
