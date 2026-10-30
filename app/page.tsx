import { ASurpresa } from "@/components/landing/ASurpresa";
import { AVoz } from "@/components/landing/AVoz";
import { Cabecalho } from "@/components/landing/Cabecalho";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Hero } from "@/components/landing/Hero";
import { Interesse } from "@/components/landing/Interesse";
import { OQueVoceRecebe } from "@/components/landing/OQueVoceRecebe";
import { Perguntas } from "@/components/landing/Perguntas";

// Seções 1 a 8. As demais entram nos próximos prompts.
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
      </main>
    </div>
  );
}
