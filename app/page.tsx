import { ASurpresa } from "@/components/landing/ASurpresa";
import { AVoz } from "@/components/landing/AVoz";
import { Cabecalho } from "@/components/landing/Cabecalho";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Fecho } from "@/components/landing/Fecho";
import { Fichas } from "@/components/landing/Fichas";
import { Hero } from "@/components/landing/Hero";
import { Interesse } from "@/components/landing/Interesse";
import { OQueVoceRecebe } from "@/components/landing/OQueVoceRecebe";
import { Perguntas } from "@/components/landing/Perguntas";
import { Rodape } from "@/components/landing/Rodape";

export default function Home() {
  return (
    <div>
      <Cabecalho />
      <main>
        <Hero />
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
