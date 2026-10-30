import {
  formatarData,
  formatarPreco,
  LIVROS_NA_EDICAO,
  MARCA,
} from "@/lib/config";

const cores = [
  ["polen", "var(--polen)"],
  ["papel", "var(--papel)"],
  ["tinta", "var(--tinta)"],
  ["tinta-2", "var(--tinta-2)"],
  ["floresta", "var(--floresta)"],
  ["vinho", "var(--vinho)"],
  ["rosa-antigo", "var(--rosa-antigo)"],
  ["névoa", "var(--nevoa)"],
  ["petróleo", "var(--petroleo)"],
  ["dourado", "var(--dourado)"],
] as const;

// Placeholder da base: só tipos, tamanhos e cores. As seções vêm nos próximos prompts.
export default function Home() {
  return (
    <main className="mx-auto max-w-[1280px] px-(--margem) py-24">
      <h1 className="text-display max-w-[14ch]">{MARCA}, em construção.</h1>
      <p className="text-corpo mt-8 max-w-[62ch]">
        Edição de Natal: {LIVROS_NA_EDICAO} livros, {formatarPreco()} cada,
        inscrições até {formatarData()}. Este texto está em Newsreader, no
        tamanho de corpo.
      </p>
      <h2 className="text-h2 mt-24">Escala de tamanhos</h2>
      <p className="text-destaque mt-6">Fatos e destaques em Newsreader.</p>
      <p className="text-pequeno text-tinta-2 mt-4">
        Pequeno, para notas secundárias.
      </p>
      <p className="font-mao text-destaque mt-8">
        Bilhete da família, em Caveat.
      </p>
      <h2 className="text-h2 mt-24">Cores</h2>
      <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-5">
        {cores.map(([nome, valor]) => (
          <li key={nome}>
            <span
              className="rounded-ed block h-24"
              style={{ background: valor }}
            />
            <span className="text-pequeno mt-2 block">{nome}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
