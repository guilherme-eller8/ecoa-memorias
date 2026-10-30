import { Cabecalho } from "@/components/landing/Cabecalho";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Hero } from "@/components/landing/Hero";
import { OQueVoceRecebe } from "@/components/landing/OQueVoceRecebe";

// Seções 1 a 4. As demais entram nos próximos prompts.
export default function Home() {
  return (
    <div>
      <Cabecalho />
      <main>
        <Hero />
        <OQueVoceRecebe />
        <ComoFunciona />
      </main>
    </div>
  );
}
