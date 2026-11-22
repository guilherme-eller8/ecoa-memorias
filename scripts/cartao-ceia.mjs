// Cartão da ceia: o PDF que a família entrega (ou mostra na mesa) no dia 24, quando conta a novidade.
// Metade é a capa do livro (floresta, filete dourado); metade é o bilhete para quem vai contar.
//
// Uso:
//   node scripts/cartao-ceia.mjs --para "Vô Jair" --titulo "O livro do vô Jair" \
//     --de "Ana, Pedro e Luísa" --saida assets/cartoes/cartao-vo-jair.pdf
//
// Precisa do Playwright com Chromium (já vem no ambiente do Claude Code; localmente: npx playwright install chromium).
// A data da primeira página sai de lib/config.ts (DATA_PRIMEIRA_PAGINA).

import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const raiz = resolve(dirname(new URL(import.meta.url).pathname), "..");

function arg(nome, padrao) {
  const i = process.argv.indexOf(`--${nome}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
}

const para = arg("para", "Pai");
const titulo = arg("titulo", "O livro do meu pai");
const de = arg("de", "Seus filhos");
const saida = resolve(raiz, arg("saida", "assets/cartoes/cartao-ceia.pdf"));

// A data da primeira página vem da fonte única de configuração
const config = readFileSync(join(raiz, "lib/config.ts"), "utf8");
const iso = /DATA_PRIMEIRA_PAGINA = "(\d{4})-(\d{2})-(\d{2})"/.exec(config);
const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const nPerguntas = Number(/PERGUNTAS_DE_NATAL = (\d+)/.exec(config)?.[1] ?? 3);
const POR_EXTENSO = ["zero", "uma", "duas", "três", "quatro", "cinco"];
const perguntas = `${POR_EXTENSO[nPerguntas] ?? nPerguntas} perguntas`;
const dataPrimeiraPagina = iso
  ? `${Number(iso[3])} de ${MESES[Number(iso[2]) - 1]}`
  : "26 de dezembro";

const esc = (t) =>
  t.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
// Fontes embutidas: a página do cartão não tem origem, então não lê arquivos do disco
const fonte = (arquivo) =>
  `data:font/ttf;base64,${readFileSync(join(raiz, "assets/fonts", arquivo)).toString("base64")}`;
const monograma = readFileSync(
  join(raiz, "public/logo/ecoa-monograma.svg"),
  "utf8",
);

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<style>
  @font-face { font-family: "Newsreader"; src: url("${fonte("newsreader-500.ttf")}"); font-weight: 400 500; }
  @font-face { font-family: "Newsreader"; src: url("${fonte("newsreader-italico.ttf")}"); font-style: italic; }
  @page { size: 210mm 148mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 210mm; height: 148mm; }
  body { font-family: "Newsreader", Georgia, serif; color: #26211d; background: #f5efe4; display: grid; grid-template-columns: 92mm 1fr; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .capa { background: #1f3d33; color: #f5efe4; padding: 14mm 12mm; display: flex; flex-direction: column; }
  .rotulo { font-size: 10pt; opacity: .85; }
  .titulo { margin-top: auto; font-size: 25pt; line-height: 1.08; font-weight: 500; letter-spacing: -0.01em; text-wrap: balance; }
  .filete { width: 14mm; height: 2px; background: #b08d57; margin-top: 5mm; }
  .mono { margin-top: 12mm; width: 7mm; height: 7mm; color: #b08d57; }
  .mono svg { width: 100%; height: 100%; }
  .mono svg [fill]:not([fill="none"]) { fill: #b08d57; }
  .bilhete { padding: 14mm 13mm 12mm; display: flex; flex-direction: column; }
  .ola { font-size: 18pt; line-height: 1.15; font-weight: 500; text-wrap: balance; }
  .texto { margin-top: 6mm; font-size: 11pt; line-height: 1.55; }
  .texto p + p { margin-top: 3mm; }
  .assinatura { margin-top: auto; font-size: 11pt; }
  .assinatura em { font-style: italic; }
  .pe { margin-top: 5mm; font-size: 8pt; color: #6e6259; }
</style></head>
<body>
  <section class="capa">
    <p class="rotulo">Livro de memórias</p>
    <p class="titulo">${esc(titulo)}</p>
    <div class="filete"></div>
    <div class="mono">${monograma}</div>
  </section>
  <section class="bilhete">
    <p class="ola">${esc(para)}, neste Natal a gente quer ouvir&nbsp;você.</p>
    <div class="texto">
      <p>Hoje, na ceia, vêm ${perguntas}. Responda do seu jeito, em voz alta, e alguém da mesa grava.</p>
      <p>No dia ${dataPrimeiraPagina}, chega a primeira página do seu livro, com um QR code que toca a sua voz.</p>
    </div>
    <p class="assinatura">Com carinho, <em>${esc(de)}</em></p>
    <p class="pe">Ecoa Memórias</p>
  </section>
</body></html>`;

const { chromium } = require("playwright");
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ deviceScaleFactor: 2 });
await pagina.setContent(html, { waitUntil: "load" });
await pagina.evaluate(() => document.fonts.ready);
mkdirSync(dirname(saida), { recursive: true });
await pagina.pdf({
  path: saida,
  width: "210mm",
  height: "148mm",
  printBackground: true,
});
// Uma imagem do mesmo cartão, para mandar direto no WhatsApp
await pagina.setViewportSize({ width: 794, height: 559 });
await pagina.screenshot({
  path: saida.replace(/\.pdf$/, ".png"),
  fullPage: false,
});
await navegador.close();
console.log(`Cartão salvo em ${saida} (e .png ao lado).`);
