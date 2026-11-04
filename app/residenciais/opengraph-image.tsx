import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CAPA_PADRAO } from "@/components/ui/capas";
import { MARCA } from "@/lib/config";

export const alt = `${MARCA} para residenciais: o livro de memórias de cada morador, com a marca da casa.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Newsreader recortada no alfabeto latino com acentos (assets/fonts): cobre qualquer texto desta imagem.
const newsreader = await readFile(
  join(process.cwd(), "assets/fonts/newsreader-500-latim.ttf"),
);

const POLEN = "#F5EFE4";
const PAPEL = "#FFFDF8";
const TINTA = "#26211D";
const FLORESTA = "#1F3D33";
const LOMBADA = "#16302A";
const DOURADO = "#B08D57";

// O preview do link que vai para a casa: o título à esquerda, a capa com "Sua casa" no pé.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 88px",
        background: POLEN,
        color: TINTA,
        fontFamily: "Newsreader",
        fontWeight: 500,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
        <div style={{ fontSize: 34 }}>{MARCA}</div>
        <div
          style={{
            marginTop: 36,
            fontSize: 68,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
          }}
        >
          A voz de cada morador, com a sua marca.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "stretch", height: 420 }}>
        <div
          style={{
            width: 30,
            background: LOMBADA,
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "30px 32px 34px",
            background: FLORESTA,
            color: PAPEL,
            borderRadius: "0 2px 2px 0",
          }}
        >
          <div style={{ fontSize: 17 }}>Livro de memórias</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, lineHeight: 1.08, width: 300 }}>
              {CAPA_PADRAO.title}
            </div>
            <div
              style={{
                width: 52,
                height: 3,
                marginTop: 20,
                background: DOURADO,
              }}
            />
            <div
              style={{
                marginTop: 28,
                alignSelf: "flex-end",
                fontSize: 17,
                color: DOURADO,
              }}
            >
              Sua casa
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, style: "normal", weight: 500 },
      ],
    },
  );
}
