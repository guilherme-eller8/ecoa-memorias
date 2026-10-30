"""Gera o logo da Ecoa com o texto convertido em path.

Uso (precisa de rede para baixar a Newsreader do Google Fonts):
    python -m venv .venv && .venv/bin/pip install fonttools uharfbuzz
    .venv/bin/python scripts/gerar-logo.py

Saídas:
    components/ui/logo-paths.ts      path data usado pelo componente <Logo>
    public/logo/ecoa-logo-polen.svg  para fundo polen (texto tinta)
    public/logo/ecoa-logo-floresta.svg  para fundo floresta (texto polen)
    public/logo/ecoa-monograma.svg   só os arcos (pé da capa)
    app/icon.svg                     favicon vetorial (arcos dourados em floresta)
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

# Unidades do desenho: "Ecoa" tem corpo 100.
CORPO_ECOA = 100
CORPO_MEMORIAS = 40
ENTRELINHA = 19  # do pé de "Ecoa" ao topo do "M"
TRACO = 6  # arcos: ≈ 2,3px quando o logo tem 48px de altura


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


def compor(caminho: Path, texto: str, corpo: float, x0: float, linha_base: float) -> tuple[str, tuple[float, float, float, float]]:
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
        x += pos.x_advance
    return pen.getCommands(), limites.bounds


def arco(cx: float, cy: float, r: float, abertura: float) -> str:
    """Arco de circunferência aberto para a direita, de -abertura a +abertura graus."""
    a = math.radians(abertura)
    x = cx + r * math.cos(a)
    y1 = cy - r * math.sin(a)
    y2 = cy + r * math.sin(a)
    return f"M{x:.2f} {y1:.2f}A{r:g} {r:g} 0 0 1 {x:.2f} {y2:.2f}"


def main() -> None:
    ecoa_ttf = baixar(72, 500, "Ecoa")
    memorias_ttf = baixar(16, 500, "Memórias")

    ecoa_d, (ex0, ey0, ex1, ey1) = compor(ecoa_ttf, "Ecoa", CORPO_ECOA, 0, 0)
    # Alinha a haste do E na margem esquerda e o topo da caixa-alta em y=0.
    ecoa_d, (ex0, ey0, ex1, ey1) = compor(ecoa_ttf, "Ecoa", CORPO_ECOA, -ex0, -ey0)
    altura_ecoa = ey1 - ey0  # caixa-alta, sem descendentes

    memorias_d, (mx0, my0, mx1, my1) = compor(memorias_ttf, "Memórias", CORPO_MEMORIAS, 0, 0)
    topo_m = altura_ecoa + ENTRELINHA
    memorias_d, (mx0, my0, mx1, my1) = compor(
        memorias_ttf, "Memórias", CORPO_MEMORIAS, -mx0 + 1.2, topo_m - my0
    )

    # Três arcos concêntricos depois de "Ecoa": a palavra ecoa.
    # Centro entre o meio da caixa-alta e o meio da caixa-baixa do "a".
    cy = altura_ecoa * 0.6
    cx = ex1 + 4
    raios = (16, 28, 40)
    abertura = 52
    arcos = [arco(cx, cy, r, abertura) for r in raios]
    topo = min(0.0, cy - raios[-1] * math.sin(math.radians(abertura)) - TRACO / 2)
    largura = max(cx + raios[-1] + TRACO / 2, mx1) + 1
    caixa = f"0 {topo:.2f} {largura:.2f} {my1 + 1 - topo:.2f}"

    # Monograma: os mesmos arcos, centrados num quadrado.
    m_raios = (12, 24, 36)
    m_abertura = 52
    m_lado = 72
    m_cx = (m_lado - (m_raios[-1] - m_raios[0] * math.cos(math.radians(m_abertura)))) / 2 - m_raios[0] * math.cos(math.radians(m_abertura))
    m_arcos = [arco(m_cx, m_lado / 2, r, m_abertura) for r in m_raios]
    m_traco = 7

    # Favicon: traço mais grosso para ler em 16px.
    i_raios = (6, 11.5, 17)
    i_abertura = 50
    i_cx = (32 - (i_raios[-1] - i_raios[0] * math.cos(math.radians(i_abertura)))) / 2 - i_raios[0] * math.cos(math.radians(i_abertura)) - 0.5
    i_arcos = [arco(i_cx, 16, r, i_abertura) for r in i_raios]

    ts = f"""// Gerado por scripts/gerar-logo.py. Não editar à mão.
export const LOGO_VIEWBOX = "{caixa}";
export const LOGO_ECOA = "{ecoa_d}";
export const LOGO_MEMORIAS = "{memorias_d}";
export const LOGO_ARCOS = {arcos!r};
export const LOGO_TRACO = {TRACO};

export const MONOGRAMA_VIEWBOX = "0 0 {m_lado} {m_lado}";
export const MONOGRAMA_ARCOS = {m_arcos!r};
export const MONOGRAMA_TRACO = {m_traco};
"""
    (RAIZ / "components" / "ui" / "logo-paths.ts").write_text(ts.replace("'", '"'))

    def logo_svg(texto: str) -> str:
        arcos_svg = "".join(f'<path d="{d}"/>' for d in arcos)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{caixa}" role="img" aria-label="Ecoa Memórias">'
            f'<path fill="{texto}" d="{ecoa_d}"/><path fill="{texto}" d="{memorias_d}"/>'
            f'<g fill="none" stroke="{DOURADO}" stroke-width="{TRACO}" stroke-linecap="round">{arcos_svg}</g></svg>\n'
        )

    pasta = RAIZ / "public" / "logo"
    pasta.mkdir(parents=True, exist_ok=True)
    (pasta / "ecoa-logo-polen.svg").write_text(logo_svg(TINTA))
    (pasta / "ecoa-logo-floresta.svg").write_text(logo_svg(POLEN))
    (pasta / "ecoa-monograma.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {m_lado} {m_lado}" role="img" aria-label="Ecoa Memórias">'
        f'<g fill="none" stroke="{DOURADO}" stroke-width="{m_traco}" stroke-linecap="round">'
        + "".join(f'<path d="{d}"/>' for d in m_arcos)
        + "</g></svg>\n"
    )
    (RAIZ / "app" / "icon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        f'<rect width="32" height="32" rx="1.5" fill="{FLORESTA}"/>'
        f'<g fill="none" stroke="{DOURADO}" stroke-width="3.2" stroke-linecap="round">'
        + "".join(f'<path d="{d}"/>' for d in i_arcos)
        + "</g></svg>\n"
    )
    print("logo gerado:", caixa)


if __name__ == "__main__":
    main()
