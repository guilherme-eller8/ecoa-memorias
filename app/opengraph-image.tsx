import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CAPA_PADRAO } from "@/components/ui/capas";
import { MARCA } from "@/lib/config";

export const alt = `${MARCA}: a voz de quem você ama, em capa dura.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Newsreader recortada só com os glifos desta imagem (assets/fonts). Se o H1 ou a capa
// mudarem, baixe de novo com o parâmetro text= do Google Fonts.
const [newsreader, newsreaderItalico] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/newsreader-500.ttf")),
  readFile(join(process.cwd(), "assets/fonts/newsreader-italico.ttf")),
]);

const POLEN = "#F5EFE4";
const PAPEL = "#FFFDF8";
const TINTA = "#26211D";
const FLORESTA = "#1F3D33";
const LOMBADA = "#16302A";
const DOURADO = "#B08D57";

// O preview do link: o nome e o H1 à esquerda, a capa floresta à direita, no papel pólen.
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
      <div style={{ display: "flex", flexDirection: "column", width: 540 }}>
        <div style={{ fontSize: 34 }}>{MARCA}</div>
        <div
          style={{
            marginTop: 36,
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          A voz de quem você ama, em capa dura.
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
            padding: "30px 32px 44px",
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
                marginTop: 14,
                fontSize: 22,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {CAPA_PADRAO.author}
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, style: "normal", weight: 500 },
        {
          name: "Newsreader",
          data: newsreaderItalico,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
