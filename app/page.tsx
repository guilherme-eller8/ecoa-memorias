import { ASurpresa } from "@/components/landing/ASurpresa";
import { AVoz } from "@/components/landing/AVoz";
import { Cabecalho } from "@/components/landing/Cabecalho";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Fecho } from "@/components/landing/Fecho";
import { Fichas } from "@/components/landing/Fichas";
import { Hero } from "@/components/landing/Hero";
import { Interesse } from "@/components/landing/Interesse";
import { OQueVoceRecebe } from "@/components/landing/OQueVoceRecebe";
import { OValor } from "@/components/landing/OValor";
import { Perguntas } from "@/components/landing/Perguntas";
import { Rodape } from "@/components/landing/Rodape";

export default function Home() {
  return (
    <div>
      {/* Primeira parada de Tab: pula o cabeçalho e o menu */}
      <a
        href="#conteudo"
        className="bg-papel rounded-ed sr-only z-50 px-4 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:inline-flex focus:min-h-12 focus:items-center"
      >
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <OValor />
        <OQueVoceRecebe />
        <ComoFunciona />
        <AVoz />
        <ASurpresa />
        <Perguntas />
        <Interesse />
        <Fichas />
        <Fecho />
      </main>
      <Rodape />
    </div>
  );
}
