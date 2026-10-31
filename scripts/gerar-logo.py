"""Gera o logo da Ecoa (opção 03: "ecoa" em caixa-baixa com uma árvore nascendo do "o") com o texto em path.

Uso (precisa de rede para baixar a Newsreader do Google Fonts):
    python -m venv .venv && .venv/bin/pip install fonttools uharfbuzz
    .venv/bin/python scripts/gerar-logo.py

Saídas:
    components/ui/logo-paths.ts      path data usado pelo componente <Logo>
    public/logo/ecoa-logo-polen.svg  para fundo polen (texto tinta)
    public/logo/ecoa-logo-floresta.svg  para fundo floresta (texto polen)
    public/logo/ecoa-monograma.svg   só a árvore (pé da capa)
    app/icon.svg                     favicon vetorial (árvore dourada em floresta)
"""

from __future__ import annotations

import math
import re
import urllib.parse
import urllib.request
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

RAIZ = Path(__file__).resolve().parent.parent
CACHE = RAIZ / ".next" / "cache" / "logo-fontes"

TINTA = "#26211D"
POLEN = "#F5EFE4"
FLORESTA = "#1F3D33"
DOURADO = "#B08D57"

# Unidades do desenho: "ecoa" tem corpo 100.
CORPO_ECOA = 100
CORPO_MEMORIAS = 26
ESPACO_MEMORIAS = 0.2  # entreletra de "MEMÓRIAS", em em
ENTRELINHA = 14  # do pé de "ecoa" ao topo do "M"
TRACO = 3.4  # a árvore: um traço da espessura das serifas


def baixar(opsz: int, wght: int, texto: str) -> Path:
    """Baixa uma instância estática (opsz, wght) da Newsreader, só com os glifos do texto."""
    CACHE.mkdir(parents=True, exist_ok=True)
    destino = CACHE / f"newsreader-{opsz}-{wght}.ttf"
    if destino.exists():
        return destino
    url = (
        "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@"
        f"{opsz},{wght}&text={urllib.parse.quote(texto)}"
    )
    css = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl"})).read().decode()
    fonte = re.search(r"url\((https://[^)]+)\)", css)
    if not fonte:
        raise RuntimeError("Google Fonts não devolveu a fonte")
    destino.write_bytes(urllib.request.urlopen(fonte.group(1)).read())
    return destino


def compor(
    caminho: Path, texto: str, corpo: float, x0: float, linha_base: float, entreletra: float = 0.0
) -> tuple[str, tuple[float, float, float, float]]:
    """Compõe o texto com HarfBuzz (kerning incluído) e devolve o path SVG e a caixa."""
    dados = caminho.read_bytes()
    fonte_hb = hb.Font(hb.Face(dados))
    buf = hb.Buffer()
    buf.add_str(texto)
    buf.guess_segment_properties()
    hb.shape(fonte_hb, buf, {"kern": True, "liga": True})

    tt = TTFont(caminho)
    glifos = tt.getGlyphSet()
    ordem = tt.getGlyphOrder()
    escala = corpo / tt["head"].unitsPerEm

    pen = SVGPathPen(glifos, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    limites = BoundsPen(glifos)
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        nome = ordem[info.codepoint]
        # Y para baixo no SVG: espelha o eixo vertical.
        m = (escala, 0, 0, -escala, x0 + (x + pos.x_offset) * escala, linha_base - pos.y_offset * escala)
        glifos[nome].draw(TransformPen(pen, m))
        glifos[nome].draw(TransformPen(limites, m))
        x += pos.x_advance + entreletra * tt["head"].unitsPerEm
    return pen.getCommands(), limites.bounds


def arvore(cx: float, base: float, raio: float) -> list[str]:
    """A árvore que nasce do "o": tronco, três galhos e a copa aberta embaixo, por onde o tronco entra.

    `base` é o y onde o tronco toca o topo do "o"; a copa fica acima (y menor)."""
    tronco_alto = raio * 0.75
    cy = base - tronco_alto - raio * 0.92
    abertura = 26  # graus, metade da fresta da copa embaixo
    a1 = math.radians(90 + abertura)
    a2 = math.radians(90 - abertura)
    # Copa: arco grande no sentido horário, do lado esquerdo da fresta até o direito.
    x1, y1 = cx + raio * math.cos(a1), cy + raio * math.sin(a1)
    x2, y2 = cx + raio * math.cos(a2), cy + raio * math.sin(a2)
    copa = f"M{x1:.2f} {y1:.2f}A{raio:g} {raio:g} 0 1 1 {x2:.2f} {y2:.2f}"
    garfo = cy + raio * 0.28  # onde o tronco se abre em galhos
    tronco = f"M{cx:.2f} {base:.2f}V{cy - raio * 0.55:.2f}"
    esquerdo = f"M{cx:.2f} {garfo:.2f}L{cx - raio * 0.5:.2f} {cy - raio * 0.32:.2f}"
    direito = f"M{cx:.2f} {garfo:.2f}L{cx + raio * 0.5:.2f} {cy - raio * 0.32:.2f}"
    return [copa, tronco, esquerdo, direito]


def caixa_arvore(cx: float, base: float, raio: float, traco: float) -> tuple[float, float, float, float]:
    cy = base - raio * 0.75 - raio * 0.92
    return (cx - raio - traco / 2, cy - raio - traco / 2, cx + raio + traco / 2, base)


def main() -> None:
    ecoa_ttf = baixar(72, 560, "ecoa")
    memorias_ttf = baixar(16, 500, "MEMÓRIAS")

    # Caixa-baixa: o topo do "o" (altura-x) fica em y=0 e o desenho cresce para cima com a árvore.
    _, (ex0, ey0, ex1, ey1) = compor(ecoa_ttf, "ecoa", CORPO_ECOA, 0, 0)
    _, (_, oy0, _, oy1) = compor(ecoa_ttf, "o", CORPO_ECOA, 0, 0)
    xh = oy1 - oy0  # altura do "o", ≈ altura-x
    ecoa_d, (ex0, ey0, ex1, ey1) = compor(ecoa_ttf, "ecoa", CORPO_ECOA, -ex0, xh)
    # Onde está o "o": entre o fim de "ec" e o fim de "eco".
    _, (_, _, ec1, _) = compor(ecoa_ttf, "ec", CORPO_ECOA, -ex0, xh)
    _, (_, _, eco1, _) = compor(ecoa_ttf, "eco", CORPO_ECOA, -ex0, xh)
    _, (o0, _, o1, _) = compor(ecoa_ttf, "o", CORPO_ECOA, 0, xh)
    largura_o = o1 - o0
    ocx = eco1 - largura_o / 2

    raio = largura_o * 0.5
    galhos = arvore(ocx, 1.2, raio)
    ax0, ay0, ax1, _ = caixa_arvore(ocx, 1.2, raio, TRACO)

    memorias_d, (mx0, my0, mx1, my1) = compor(
        memorias_ttf, "MEMÓRIAS", CORPO_MEMORIAS, 0, 0, ESPACO_MEMORIAS
    )
    largura_m = mx1 - mx0
    largura_e = ex1 - ex0
    topo_m = ey1 + ENTRELINHA  # ey1 é o pé de "ecoa"
    memorias_d, (mx0, my0, mx1, my1) = compor(
        memorias_ttf,
        "MEMÓRIAS",
        CORPO_MEMORIAS,
        -mx0 + (largura_e - largura_m) / 2,
        topo_m - my0,
        ESPACO_MEMORIAS,
    )

    topo = min(ay0, ey0) - 1
    esquerda = min(0.0, mx0) - 1
    direita = max(ex1, mx1) + 1
    caixa = f"{esquerda:.2f} {topo:.2f} {direita - esquerda:.2f} {my1 + 1 - topo:.2f}"

    # Monograma: só a árvore, centrada num quadrado (pé da capa e favicon).
    m_lado = 72
    m_raio = 22
    m_base = m_lado / 2 + (m_raio * 0.75 + m_raio * 0.92 + m_raio) / 2
    m_galhos = arvore(m_lado / 2, m_base, m_raio)
    m_traco = 5.5

    i_raio = 9.2
    i_base = 16 + (i_raio * 0.75 + i_raio * 0.92 + i_raio) / 2
    i_galhos = arvore(16, i_base, i_raio)

    ts = f"""// Gerado por scripts/gerar-logo.py. Não editar à mão.
export const LOGO_VIEWBOX = "{caixa}";
export const LOGO_ECOA = "{ecoa_d}";
export const LOGO_MEMORIAS = "{memorias_d}";
export const LOGO_ARVORE = {galhos!r};
export const LOGO_TRACO = {TRACO};

export const MONOGRAMA_VIEWBOX = "0 0 {m_lado} {m_lado}";
export const MONOGRAMA_ARVORE = {m_galhos!r};
export const MONOGRAMA_TRACO = {m_traco};
"""
    (RAIZ / "components" / "ui" / "logo-paths.ts").write_text(ts.replace("'", '"'))

    def traco_svg(ds: list[str], cor: str, largura: float) -> str:
        return (
            f'<g fill="none" stroke="{cor}" stroke-width="{largura}" stroke-linecap="round" stroke-linejoin="round">'
            + "".join(f'<path d="{d}"/>' for d in ds)
            + "</g>"
        )

    def logo_svg(texto: str) -> str:
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{caixa}" role="img" aria-label="Ecoa Memórias">'
            f'<path fill="{texto}" d="{ecoa_d}"/><path fill="{texto}" d="{memorias_d}"/>'
            + traco_svg(galhos, texto, TRACO)
            + "</svg>\n"
        )

    pasta = RAIZ / "public" / "logo"
    pasta.mkdir(parents=True, exist_ok=True)
    (pasta / "ecoa-logo-polen.svg").write_text(logo_svg(TINTA))
    (pasta / "ecoa-logo-floresta.svg").write_text(logo_svg(POLEN))
    (pasta / "ecoa-monograma.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {m_lado} {m_lado}" role="img" aria-label="Ecoa Memórias">'
        + traco_svg(m_galhos, DOURADO, m_traco)
        + "</svg>\n"
    )
    (RAIZ / "app" / "icon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        f'<rect width="32" height="32" rx="1.5" fill="{FLORESTA}"/>'
        + traco_svg(i_galhos, DOURADO, 2.6)
        + "</svg>\n"
    )
    print("logo gerado:", caixa)


if __name__ == "__main__":
    main()
