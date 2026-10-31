# Ecoa Memórias — direção de arte

Saída dos passos 1 a 4 da skill `design-taste-frontend`, já decidida. Quem constrói não sorteia outra direção: a marca fixa paleta e tipografia (`--keep palette,type`) e esta página fixa a composição.

Direção sorteada: **`page-is-the-object` — a página é o próprio objeto** (seed 2069654964, setor physical-product, tom warm). As outras duas cartas (`one-motif`, `split-stage`) foram descartadas: o produto é um objeto impresso, e esta é a única direção que deixa o próprio livro organizar a página.

## Inventário (o que só a Ecoa tem)
1. A voz de quem conta: o riso, as pausas, o sotaque.
2. O QR code impresso em cada capítulo, que toca a voz original.
3. O áudio de WhatsApp: forma de onda, duração (2:14), o grupo "Histórias do Vô".
4. A capa dura em tecido nas cinco cores, com o filete dourado em hot stamping e a lombada com título e nome.
5. O papel pólen do miolo (o creme do fundo).
6. Os bilhetes secretos da família, escritos à mão, que quem conta só vê no Natal.
7. Os cartões de pergunta: uma por dia útil, durante quatro semanas.
8. Os números: 10 livros, R$ 397, 7 de novembro, 4 semanas, até 20 histórias, até 10 mensagens.
9. As peças impressas do mundo do livro: folha de rosto, sumário, ficha técnica, colofão (onde editoras anunciam a tiragem), fichário.
10. Belo Horizonte, a Rua Bahia da história de exemplo, a casa com mangueira de Minas.

## A ideia
> Nesta página, **o livro de capa dura da família, com a ficha técnica, o colofão e os bilhetes escondidos nele**, vira **a própria página**: a capa é o hero, a ficha técnica diz o que vem no livro, o colofão anuncia a tiragem e o preço, e as perguntas ficam num fichário.

Teste do concorrente: um site de fotolivro genérico não tem a voz, o QR por capítulo, os bilhetes secretos nem a tiragem de 10. A frase só funciona para a Ecoa.

## O elemento interativo (obrigatório pela skill)
**A capa que se abre.** No hero, a capa grande entreabre ao passar o mouse; mais adiante, a conversa de WhatsApp das perguntas anda sozinha:
- A capa não leva nome de pessoa: só o título "O que a vida me ensinou" e uma foto antiga ilustrativa na janela (no livro de verdade, a foto de quem conta, como na referência do Remento). Sem o arquivo da foto, fica só o título.
- Encostado na capa, um áudio de WhatsApp (2:14), que não toca: mostra que tudo começa num áudio, do jeito que quem conta já faz.
- A escolha da cor saiu em 31/10: a capa fica em floresta. As cinco cores aparecem só na estante do fecho.

Até 30/10 a capa tinha um campo com o nome de quem conta. Saiu: o fundador prefere que a capa mostre a foto da pessoa, não o nome.

## Mapa seção → peça do livro
| Seção | Peça | Composição |
|---|---|---|
| 2 Hero | A capa | Capa grande ao vivo como objeto principal (≥ 45% da primeira tela no desktop), título e fatos à esquerda |
| 3 O que você recebe | A ficha técnica | Folha de papel com borda superior e inferior recortadas; itens com valor à direita e pontilhado de pontos redondos de 4px entre nome e valor |
| 4 Como funciona | As quatro semanas | Uma fileira de quatro momentos em `<ol>`; espaço variável entre texto e imagem, de modo que as imagens sobem e descem; uma barra de 6px "Dia 1 → Semana 4 → Natal" embaixo do título |
| 5 A voz em cada página | Uma página dupla | O livro aberto em escala grande, com o celular em primeiro plano |
| 6 A surpresa | Os bilhetes escondidos | Foto grande, bilhetes cortados pela borda |
| 7 Perguntas | O fichário | Índice: lista das 10 perguntas em tipo grande; ao apontar (ou tocar) uma pergunta, o quadro fixo mostra a página que ela virou |
| 8 Valor e interesse | O colofão | Folha de papel com o preço, as condições e as vagas assentados como colofão; formulário ao lado |
| 9 FAQ | Fichas de arquivo | Cartões preenchidos com aba recortada, empilhados e sobrepostos, alternando as cores das capas |
| 10 Fecho | A estante | Campo floresta, título centralizado (o único momento centralizado), as cinco capas como lombadas numa estante |
| 11 Rodapé | A contracapa | "Ecoa Memórias" grande na largura toda, contatos, privacidade, CNPJ, créditos |

Atualização de 30/10 (rodada 3, feedback do fundador): a ficha técnica virou a capa anotada (seção 3); a surpresa virou um esquema "quem conta + família → livro" (seção 6); o fichário virou uma lista curta em duas colunas (seção 7); as fichas de arquivo viraram uma lista simples sem cores (seção 9); entrou a seção de valor "Para os netos dos seus netos." logo depois do hero. Tipos e capa grande ficaram menores (ver CLAUDE.md).

## Imagens
- Ordem de preferência (skill §6.4): as 9 geradas (docs/imagens.md) → objetos desenhados em código (capas, livro aberto, celular, WhatsApp, bilhetes) → tipo e cor.
- Piso do inspetor: ≥ 4 fotos reais na página (as geradas contam; SVG não conta). O plano usa 8.
- **Risco declarado:** `passo-4-livro` e `surpresa-ceia` mostram o produto nas mãos de pessoas que não existem. São ilustrativas, sem nome e sem citação; troque por fotos de uma prova física real assim que ela existir.
- Um áudio real (20–40s, com autorização de quem gravou) no PhoneAudioPlayer vale mais que qualquer imagem da página. Se não houver, o player é visual e não toca.

## Exceções declaradas ao inspetor
- `palette-cream`: o fundo é o papel pólen do miolo do livro. Passado com `--allow palette-cream`.
- Sombra de contato da capa: faz parte do desenho do objeto. Se o inspetor marcar `shadow`, desenhe a sombra dentro do SVG/pseudo-elemento da capa antes de pedir exceção.
