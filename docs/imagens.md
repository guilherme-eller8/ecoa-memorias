# Ecoa Memórias — imagens a gerar

> **Atualização 30/10:** `passo-2-gravando` e `passo-4-livro` saíram da página. Os passos 2 e 4 do "Como funciona" agora são objetos desenhados em código (a conversa no WhatsApp e a capa do livro), que mostram o mecanismo melhor que uma foto. Faltam 7 imagens. Enquanto um arquivo não existe, a página esconde o quadro dele (nunca mostra um bloco vazio).
>
> Onde cada uma aparece: `antiga-casamento` na capa do hero · `antiga-flores` na capa da ficha técnica · `antiga-fazenda` na capa do passo 4 · `antiga-casa` no passo 1 e no livro aberto · `surpresa-ceia` na seção da surpresa · todas as antigas no fichário de perguntas.

A maior parte do visual é feita em código (capas, livro aberto, celular, WhatsApp, bilhetes, cartões de pergunta, imagem de OG). São só **9 imagens** geradas.

## Como gerar
- Use ChatGPT (imagens), Gemini ou Midjourney. Os prompts estão em inglês porque os geradores rendem melhor assim.
- Gere de 3 a 4 variações de cada imagem e escolha a mais natural.
- Exporte com ~2000px no lado maior.
- Salve em `/public/images` com o nome exato da tabela.

## Checklist de qualidade (descarte se falhar em qualquer item)
- Mãos com 5 dedos e articulações normais.
- Nenhum texto legível no livro, na capa ou no fundo.
- Olhar e sorriso naturais, sem "pele de plástico" e sem brilho de estúdio.
- Casa e roupas plausíveis no Brasil (nada de lareira americana ou suéter de rena).
- Luz quente e consistente entre as imagens.

O site aplica um filtro e grão unificados (`.photo`), o que ajuda a harmonizar as imagens.

---

## Fotos de cena (coloridas)

### passo-2-gravando.webp · 4:3 · Passo 2
```
Documentary photograph, natural window light, warm tones. A Brazilian man around 80 years old, grey hair, short-sleeved button shirt, sitting at a simple kitchen table in a modest Brazilian home, holding a smartphone close to his mouth and recording a voice message, smiling slightly as he remembers something. A coffee cup and an old photo on the table. Shallow depth of field, 35mm lens, Kodak Portra film look, candid, unposed, no text anywhere.
```

### passo-4-livro.webp · 4:3 · Passo 4
```
Close-up documentary photograph of an elderly woman's hands holding a closed hardcover book on her lap. The book cover is plain deep forest green linen with one thin short gold line, no text. Knitted blanket, soft warm afternoon light from a window, shallow depth of field, Kodak Portra film look, intimate and quiet, no text anywhere.
```

### surpresa-ceia.webp · 3:2 (deixar respiro para recorte 4:5) · Seção 6
```
Candid documentary photograph of a Brazilian family on Christmas evening at home. A Brazilian grandmother around 78 years old sits on a sofa holding an open hardcover book, visibly moved, one hand on her chest. Her adult daughter hugs her from the side, a teenage grandson and a young grandchild lean in to look at the book. Warm lamp light, simple Christmas decorations softly out of focus, modest Brazilian living room. Natural expressions, not posed, 35mm, shallow depth of field, Kodak Portra film look, no readable text.
```

---

## Fotos antigas (capas, Passo 1 e livro aberto) · 4:5
Todas com o mesmo sufixo de estilo:
`, authentic vintage family photograph, slightly faded, film grain, soft focus, small scratches, scanned old print, no text`

### antiga-casa.webp
```
Black and white photograph from the late 1950s: a Brazilian family of five standing in front of a modest small house with a front gate and a mango tree, in a small town in Minas Gerais
```

### antiga-casamento.webp
```
Black and white wedding portrait from the 1960s: a young Brazilian couple standing outside a small colonial church, bride in a simple veil, groom in a dark suit
```

### antiga-fazenda.webp
```
Sepia photograph from the 1950s: a Brazilian boy around 9 years old sitting on a wooden fence at a farm in the countryside, cows in the background
```

### antiga-trabalho.webp
```
Faded color photograph from the 1970s: a young Brazilian man in work clothes leaning proudly against an old pickup truck on a dirt road
```

### antiga-flores.webp
```
Faded color photograph from the 1960s: a young Brazilian woman in a floral dress smiling in a backyard garden, holding freshly picked flowers
```

### antiga-praia.webp (reserva)
```
Faded color photograph from the 1970s: a Brazilian family at the beach, father holding a small child, mother under a striped umbrella
```

---

## Mapa para `IMAGES` em lib/config.ts
```ts
IMAGES = {
  surpresa: "/images/surpresa-ceia.webp",
  antigaCasa: "/images/antiga-casa.webp",
  antigaCasamento: "/images/antiga-casamento.webp",
  antigaFazenda: "/images/antiga-fazenda.webp",
  antigaTrabalho: "/images/antiga-trabalho.webp",
  antigaFlores: "/images/antiga-flores.webp",
  antigaPraia: "/images/antiga-praia.webp",
}
```
