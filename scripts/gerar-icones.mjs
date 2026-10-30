// Gera favicon.ico, apple-icon.png e os ícones do manifest a partir de app/icon.svg.
// Uso: node scripts/gerar-icones.mjs   (precisa do Playwright com Chromium e do ImageMagick `convert`)
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const svg = readFileSync("app/icon.svg", "utf8");
const tmp = join(tmpdir(), "ecoa-icones");
mkdirSync(tmp, { recursive: true });
mkdirSync("public/icons", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
async function render(lado, destino) {
  await page.setViewportSize({ width: lado, height: lado });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${lado}px;height:${lado}px}</style>${svg}`,
  );
  await page.screenshot({ path: destino, omitBackground: true });
}

for (const lado of [16, 32, 48]) await render(lado, join(tmp, `${lado}.png`));
await render(180, "app/apple-icon.png");
await render(192, "public/icons/icon-192.png");
await render(512, "public/icons/icon-512.png");
await browser.close();

execFileSync(
  "convert",
  [16, 32, 48].map((l) => join(tmp, `${l}.png`)).concat("app/favicon.ico"),
);
rmSync(tmp, { recursive: true, force: true });
console.log("ícones gerados");
