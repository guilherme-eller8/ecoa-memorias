import { MARCA } from "@/lib/config";

// Placeholder da base do projeto: mostra fontes, escala e cores.
// Nenhuma seção da landing é implementada aqui.

const CORES = [
  { token: "--creme", hex: "#F5EFE4", classe: "bg-creme" },
  { token: "--papel", hex: "#FFFDF8", classe: "bg-papel" },
  { token: "--tinta", hex: "#26211D", classe: "bg-tinta" },
  { token: "--tinta-2", hex: "#6E6259", classe: "bg-tinta-2" },
  { token: "--floresta", hex: "#1F3D33", classe: "bg-floresta" },
  { token: "--vinho", hex: "#6E2A2A", classe: "bg-vinho" },
  { token: "--rosa-antigo", hex: "#C9A49A", classe: "bg-rosa-antigo" },
  { token: "--nevoa", hex: "#A9C3CF", classe: "bg-nevoa" },
  { token: "--petroleo", hex: "#3F7A8C", classe: "bg-petroleo" },
  { token: "--dourado", hex: "#B08D57", classe: "bg-dourado" },
] as const;

const AMOSTRA = "Á é î õ ç ã ü · Aa Bb Cc Gg Qq Rr · 0123456789";

const FONTES = [
  { nome: "Newsreader · títulos", classe: "font-display text-4xl", italico: true },
  { nome: "Source Serif 4 · corpo", classe: "font-serif", italico: true },
  { nome: "Inter · rótulos e UI", classe: "font-sans", italico: false },
  { nome: "Caveat · bilhetes", classe: "font-hand text-3xl", italico: false },
] as const;

function GoldRule() {
  return <hr className="border-dourado my-16 border-0 border-t" />;
}

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-24 md:px-10 md:py-36">
      <p className="eyebrow text-tinta-2">Placeholder · base do projeto</p>
      <h1 className="mt-4">{MARCA}</h1>

      <GoldRule />

      <section aria-labelledby="fontes">
        <p id="fontes" className="eyebrow text-tinta-2">
          Fontes
        </p>
        <ul className="mt-8 space-y-10">
          {FONTES.map((fonte) => (
            <li key={fonte.nome}>
              <p className="eyebrow text-tinta-2">{fonte.nome}</p>
              <p className={`mt-2 ${fonte.classe}`}>{AMOSTRA}</p>
              {fonte.italico && <p className={`mt-1 italic ${fonte.classe}`}>{AMOSTRA}</p>}
            </li>
          ))}
        </ul>
      </section>

      <GoldRule />

      <section aria-labelledby="escala">
        <p id="escala" className="eyebrow text-tinta-2">
          Escala tipográfica
        </p>
        <div className="mt-8 space-y-8">
          <div>
            <p className="eyebrow text-tinta-2">h1 · clamp(2.5rem, 5.5vw, 4.5rem) · 1.08</p>
            <p className="text-h1">
              Título <em className="text-vinho">em itálico</em>
            </p>
          </div>
          <div>
            <p className="eyebrow text-tinta-2">h2 · clamp(2rem, 4vw, 3.25rem) · 1.12</p>
            <p className="text-h2">Título de seção</p>
          </div>
          <div>
            <p className="eyebrow text-tinta-2">h3 · 1.5rem</p>
            <p className="text-h3">Título de bloco</p>
          </div>
          <div>
            <p className="eyebrow text-tinta-2">corpo · 19px · 1.65 · máx. 62ch</p>
            <p className="measure">
              Texto de corpo em Source Serif 4. Esta linha existe só para mostrar a medida máxima de
              leitura, o entrelinhamento e a cor da tinta sobre o fundo creme com grão de papel.
            </p>
          </div>
          <div>
            <p className="eyebrow text-tinta-2">rótulo · Inter 12,5px · caixa alta · 0.14em</p>
            <p className="eyebrow">Rótulo de exemplo</p>
          </div>
        </div>
      </section>

      <GoldRule />

      <section aria-labelledby="cores">
        <p id="cores" className="eyebrow text-tinta-2">
          Cores
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {CORES.map((cor) => (
            <li key={cor.token}>
              <div className={`border-tinta/10 aspect-square rounded-[4px] border ${cor.classe}`} />
              <p className="eyebrow mt-3">{cor.token}</p>
              <p className="text-tinta-2 font-sans text-sm">{cor.hex}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
