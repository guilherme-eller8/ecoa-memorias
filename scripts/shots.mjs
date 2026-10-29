// Screenshots de revisão visual da home em 390px e 1440px.
// Uso: `npm run shots` (sobe `next dev` na porta 3100) ou
//      `SHOTS_URL=http://localhost:3000 npm run shots` (usa um servidor já rodando).

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const PORTA = 3100;
const OUT_DIR = ".screenshots";
const VIEWPORTS = [
  { nome: "home-390", width: 390, height: 844 },
  { nome: "home-1440", width: 1440, height: 900 },
];

async function esperarServidor(url, timeoutMs = 60_000) {
  const inicio = Date.now();
  while (Date.now() - inicio < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // servidor ainda subindo
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Servidor não respondeu em ${timeoutMs / 1000}s: ${url}`);
}

async function main() {
  let servidor;
  const url = process.env.SHOTS_URL ?? `http://localhost:${PORTA}`;

  if (!process.env.SHOTS_URL) {
    servidor = spawn("npx", ["next", "dev", "-p", String(PORTA)], {
      stdio: ["ignore", "ignore", "inherit"],
      detached: true,
    });
  }

  let browser;
  try {
    await esperarServidor(url);
    await mkdir(OUT_DIR, { recursive: true });
    browser = await chromium.launch();

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const arquivo = `${OUT_DIR}/${vp.nome}.png`;
      await page.screenshot({ path: arquivo, fullPage: true });
      console.log(`✓ ${arquivo}`);
      await page.close();
    }
  } finally {
    await browser?.close();
    // mata o grupo de processos (npx → next dev)
    if (servidor?.pid) process.kill(-servidor.pid, "SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
