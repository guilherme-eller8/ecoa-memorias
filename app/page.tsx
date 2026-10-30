import { MARCA } from "@/lib/config";

// Placeholder da base: só mostra fontes, escala e cores. As seções da landing
// entram nas próximas tarefas.

const tamanhos = [
  {
    classe: "text-h2",
    nome: "Título de seção",
    valor: "clamp(2rem, 4.2vw, 3.5rem)",
  },
  {
    classe: "text-destaque",
    nome: "Fatos e destaques",
    valor: "clamp(1.5rem, 2.4vw, 2rem)",
  },
  {
    classe: "text-corpo",
    nome: "Corpo de texto, 19px, entrelinha 1,6",
    valor: "1.1875rem",
  },
  {
    classe: "text-pequeno",
    nome: "Pequeno, para notas, 15px",
    valor: "0.9375rem",
  },
] as const;

const cores = [
  { classe: "bg-polen", nome: "polen", hex: "#F5EFE4", uso: "fundo principal" },
  { classe: "bg-papel", nome: "papel", hex: "#FFFDF8", uso: "superfícies" },
  {
    classe: "bg-tinta",
    nome: "tinta",
    hex: "#26211D",
    uso: "todo texto corrido",
  },
  {
    classe: "bg-tinta-2",
    nome: "tinta-2",
    hex: "#6E6259",
    uso: "notas secundárias",
  },
  { classe: "bg-floresta", nome: "floresta", hex: "#1F3D33", uso: "o acento" },
  { classe: "bg-vinho", nome: "vinho", hex: "#6E2A2A", uso: "capa" },
  {
    classe: "bg-rosa-antigo",
    nome: "rosa-antigo",
    hex: "#C9A49A",
    uso: "capa",
  },
  { classe: "bg-nevoa", nome: "nevoa", hex: "#A9C3CF", uso: "capa" },
  { classe: "bg-petroleo", nome: "petroleo", hex: "#3F7A8C", uso: "capa" },
  {
    classe: "bg-dourado",
    nome: "dourado",
    hex: "#B08D57",
    uso: "hot stamping e logo",
  },
] as const;

export default function Home() {
  return (
    <main className="moldura py-20 md:py-32">
      <h1>{MARCA}</h1>

      <p className="mt-6 max-w-[62ch]">
        Base do projeto. Newsreader faz todo o trabalho, com eixo óptico ativo;
        o tamanho do título acima é o display da escala.
      </p>

      <ul className="mt-20 space-y-10">
        {tamanhos.map((t) => (
          <li key={t.classe}>
            <p className={t.classe}>{t.nome}</p>
            <p className="text-pequeno text-tinta-2">{t.valor}</p>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-destaque italic">
        Newsreader itálico, só para nomes na capa e na assinatura das histórias.
      </p>

      <p className="mt-10 font-bilhete text-destaque">
        Caveat, a letra dos bilhetes da família e da anotação aponte e ouça.
      </p>

      <div className="mt-20 rounded-capa bg-papel p-6 md:p-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
          {cores.map((c) => (
            <li key={c.nome}>
              <div className={`${c.classe} aspect-[4/3] rounded-capa`} />
              <p className="mt-3 text-pequeno">
                {c.nome} {c.hex}
              </p>
              <p className="text-pequeno text-tinta-2">{c.uso}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
