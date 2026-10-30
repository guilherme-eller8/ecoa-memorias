# Ecoa Memórias — especificação da landing

Fonte de verdade de conteúdo e estrutura. Regras de design e de copy no CLAUDE.md; a ideia e o mapa seção → peça do livro em `docs/direcao.md`. Textos entre aspas são copy final. Itens marcados **[aprovar]** são copy nova, que precisa do OK do fundador antes do lançamento.

## A sensação
Uma caixa de lembranças guardada com cuidado. Uma editora pequena e séria fazendo algo precioso à mão. Confiança, calma, valor.

O visitante sai com três certezas:
1. É simples para quem conta: só áudio, no WhatsApp.
2. É leve para quem presenteia: a Ecoa cuida das perguntas, dos lembretes e da edição.
3. O resultado é um objeto bonito, que a família inteira vai guardar.

**Teste dos 5 segundos (celular, primeira tela):** é um livro de capa dura; tudo acontece pelo WhatsApp; custa R$ 397; são 10 livros até 7 de novembro; o botão está à vista.

---

## Componentes visuais (feitos em código, não em imagem)

### BookCover — sistema de capa próprio
O componente mais importante do site. Precisa parecer um objeto, não um cartão.
- Aparência física:
  - lombada visível, com espessura
  - leve perspectiva 3D
  - sombra de contato no chão, desenhada como parte do objeto (ver exceções em direcao.md)
  - cantos com 2px de raio
  - borda de páginas visível quando entreaberto
  - textura de tecido sutil na cor
- Elementos:
  - cor sólida (vinho, rosa-antigo, névoa, petróleo ou floresta)
  - janela de foto retangular com margem de papel
  - "Livro de memórias" em Newsreader pequeno, caixa normal
  - título em Newsreader
  - nome em itálico
  - um único filete dourado curto abaixo do título (forma preenchida de 2px, como hot stamping)
  - monograma da Ecoa pequeno no pé da capa
  - lombada com título e nome na vertical
- Props: `color`, `title`, `author`, `photo?`, `open?`, `size`, `live?`.
- NÃO usar moldura dupla de filetes (é assinatura de outra marca).

Títulos de exemplo (fictícios):
| Título | Nome | Cor | Foto |
|---|---|---|---|
| Caminhos que percorri | Antônio Ferreira | vinho | antiga-trabalho |
| Da roça à cidade | Lourdes Almeida | névoa | antiga-fazenda |
| O que a vida me ensinou | José Carlos Ribeiro | floresta | sem foto |
| Histórias da nossa casa | Maria Helena Costa | petróleo | antiga-flores |
| Memórias de um caixeiro-viajante | Geraldo Souza | rosa-antigo | antiga-casamento |

### LiveCover
A BookCover do hero com controles (ver direcao.md, "O elemento interativo"):
- Campo "De quem são as histórias?" (placeholder "Vó Lourdes", máx. 28 caracteres). Atualiza o nome na capa e na lombada a cada tecla.
- Cinco lombadas clicáveis para a cor (`<button>` com `aria-pressed` e nome acessível "Capa vinho" etc.).
- Guarda nome e cor em estado compartilhado; a seção 8 os usa para pré-preencher o formulário.
- Sem JS: capa estática "O que a vida me ensinou · José Carlos Ribeiro", floresta.

### OpenBookSpread
Livro aberto em página dupla, com curvatura sutil no centro e sombra da dobra (desenhada dentro do objeto).
- Página esquerda: foto antiga.
- Página direita:
  - numeral romano (é do livro, não da página)
  - título do capítulo
  - ano
  - 3 parágrafos de texto
  - QR code pequeno no alto (biblioteca `qrcode`, apontando para NEXT_PUBLIC_SITE_URL)
  - número de página

### PhoneAudioPlayer
Celular desenhado em CSS (moldura fina, levemente inclinado). Raiz com `data-ui`. Na tela:
- título da história
- botão de play (toca `/audio/amostra.mp3` se existir; se não, é só visual e o botão não aparece como ativo)
- barra de progresso
- tempo

### WhatsAppChat
Simulação fiel ao visual do WhatsApp, mas dessaturada para a paleta. Raiz com `data-ui`, fonte `system-ui`. Variantes:
- `individual`: Ecoa ↔ quem conta
- `grupo`: grupo da família

Mensagens de áudio com forma de onda e duração.

### NoteCard
Bilhete em papel polen, levemente rotacionado, com texto em Caveat. Suporta corte na borda (texto saindo do cartão).

### QuestionCard
Cartão de papel branco com uma pergunta em Newsreader de 26–30px, alinhada à esquerda.

### Primitivos
- `Button`
- `Section` (sempre com um título)
- `Container`

(Eyebrow e GoldRule foram removidos: são proibidos pelas regras da skill.)

---

## 1. Cabeçalho
- Logo Ecoa à esquerda.
- Links: "Como funciona", "O livro", "Perguntas", "Valor".
- Botão principal pequeno (sólido, floresta): "Tenho interesse" (→ #interesse).
- Fixo ao rolar: fundo muda de polen para papel (degrau de tom). Sem borda, sem blur, sem sombra.
- No mobile: logo e botão; os links vão para um menu simples (`<details>` ou botão com `aria-expanded`).

## 2. Hero
Duas colunas no desktop (texto à esquerda em 5/12, capa ao vivo à direita em 7/12, ocupando ≥ 45% da primeira tela); empilhado no mobile, com título, frase e fatos primeiro, depois a capa, depois o botão.

- H1 **[aprovar]**: "A voz de quem você ama, em capa dura."
  - Alternativa, se preferir manter o original: "As histórias de quem você ama." (o "guardadas para sempre" passa para a frase abaixo).
  - Motivo: o original tem 53 caracteres e quebra em 3–4 linhas em 390px; a regra é 2 linhas.
- Frase de apoio **[aprovar]**, logo abaixo do título:
  "Uma pergunta por dia no WhatsApp, respondida por áudio. Em quatro semanas, as histórias, as fotos e as mensagens da família viram um livro de capa dura, entregue antes do Natal."
- Fatos, no tamanho de destaque (não em letra miúda), lado a lado no desktop e em grade 2×2 no mobile:
  - "R$ 397" · abaixo, pequeno: "por livro, tudo incluído"
  - "10 livros" · "Edição de Natal"
  - "Até 7 de novembro" · "inscrições"
- Botão: "Tenho interesse" → #interesse
- Visual: LiveCover grande, entreaberta, com as cinco lombadas de cor logo abaixo dela. Fundo polen liso, com o grão de papel. Sem gradiente.

## 3. O que você recebe (#livro)
- H2: "Um livro para segurar. E vozes para ouvir sempre." (corte aprovado: o original quebrava em 3 linhas em 390px)
- Layout: à esquerda (5/12), uma BookCover floresta grande ("O que a vida me ensinou"); à direita (7/12), a **ficha técnica**: uma folha papel com bordas superior e inferior recortadas (`clip-path`), itens em `<dl>` com o nome à esquerda, o valor à direita e um pontilhado de pontos redondos de 4px entre eles. Sem ícones, sem checkmarks, sem linhas finas.

| Item | Valor (à direita) |
|---|---|
| "Livro de capa dura em papel encorpado" | `FORMATO_LIVRO` · `PAGINAS_LIVRO` páginas |
| "Histórias contadas por áudio, editadas com cuidado para manter o jeito de falar" | até 20 |
| "Fotos da família ao longo dos capítulos" | incluídas |
| "Um QR code em cada história para ouvir a voz original" | em todas |
| "Mensagens de filhos, netos e amigos, em áudio ou texto, reunidas em segredo" | até 10 |
| "Capa com foto, título e cor à escolha" | 5 cores |
| "Os áudios originais, entregues à família" | para sempre |

## 4. Como funciona (#como-funciona)
- H2: "Tudo acontece no WhatsApp."
- Abaixo do título, uma barra de 6px em tom suave com três marcas de texto: "Dia 1", "Semana 4", "Natal".
- Os quatro momentos em `<ol>` (a ordem vem da lista e das palavras; sem "PASSO N", sem números grandes).
- Desktop: quatro colunas; em cada uma, título em Newsreader (tamanho h3 = destaque), parágrafo curto, depois um espaço que varia de coluna para coluna (80, 140, 100, 120px), depois a imagem 4:3. As imagens sobem e descem ao longo da fileira, para não virar fileira de cards.
- Mobile: rolagem horizontal com scroll-snap, colunas de 78vw, o próximo momento aparecendo pela borda; a barra de 6px vira indicador de progresso.

| Título | Texto | Visual |
|---|---|---|
| "Escolha as perguntas." | "Da nossa seleção ou escritas por você. Infância, casamento, trabalho, fé, a casa onde cresceu." | QuestionCard "Como era a casa onde o senhor cresceu?" sobre a foto `antiga-casa`, levemente rotacionado |
| "A pergunta chega. A resposta é um áudio." | "Uma pergunta por dia, direto no WhatsApp. Sem aplicativo, sem senha, sem escrever nada." | foto `passo-2-gravando` |
| "A família ouve no mesmo dia." | "Cada história gravada chega a um grupo só da família. Ouvir vira o melhor momento da semana." | WhatsAppChat `grupo` "Histórias do Vô": áudio de 2:14, "Capítulo 6 · A casa da Rua Bahia", reações "não sabia disso" e "que saudade dessa casa" |
| "O livro chega antes do Natal." | "Com as histórias, as fotos e as mensagens da família, que chegam como surpresa." | foto `passo-4-livro` |

- Linha abaixo (Newsreader 19px, tinta):
  "Você escolhe as perguntas e conta a novidade. Os envios, os lembretes e a edição ficam com a gente."

## 5. A voz em cada página
- Fundo papel (um degrau mais claro que o polen).
- Layout: texto à esquerda (5/12), composição à direita (7/12).
- H2: "As histórias no papel. A voz, a um toque."
- Texto: "Cada capítulo traz um QR code. Basta apontar o celular para ouvir a história contada por quem viveu, com o riso, as pausas e o sotaque de sempre."
- Composição:
  - OpenBookSpread com foto `antiga-casa` à esquerda.
  - À direita, "VI", "A casa da Rua Bahia", "1958" e 3 parágrafos curtos, em primeira pessoa e no tom de quem conta:
    > A casa ficava no fim da Rua Bahia, depois da venda do seu Antônio. Tinha um quintal comprido, com uma mangueira que dava sombra para a rua inteira.
    >
    > Minha mãe acordava antes de todo mundo. O cheiro do café chegava no quarto antes dela, e era assim que a gente sabia que o dia tinha começado.
    >
    > Quando chovia, a gente juntava as bacias embaixo das goteiras e ficava ouvindo a música que elas faziam. Eu tinha nove anos e achava que aquela casa era o mundo inteiro.
  - PhoneAudioPlayer em primeiro plano, sobrepondo o canto inferior direito do livro: "A casa da Rua Bahia · 2:14".
  - Anotação em Caveat, com seta desenhada em SVG (traço de 2px), perto do QR: "aponte e ouça".
- Mostrar só esta dupla. Nada de flipbook, sumário ou páginas adicionais.

## 6. A surpresa
- H2: "No final, quem contou as histórias recebe uma surpresa."
- Texto: "Enquanto as histórias são gravadas, filhos, netos e amigos enviam, em segredo, uma mensagem em áudio ou por escrito. Cada uma ganha uma página no livro, com QR code para quem quiser ouvir. Quem conta as histórias só descobre no Natal."
- Visual:
  - foto `surpresa-ceia` grande (4:5 no mobile, 3:2 no desktop), ocupando ao menos metade da largura
  - sobre ela, em uma das bordas (nunca sobre o título), 3 NoteCards sobrepostos e cortados (sugerir, não revelar):
    - "Pai, obrigada por cada domingo..."
    - "Vô, até hoje eu lembro do..."
    - "Tio, foi o senhor que me ensinou..."
  - Um QR pequeno estilizado em um dos bilhetes.

## 7. Perguntas que abrem histórias (#perguntas)
- Campo floresta com textura de tecido; textos em polen.
- H2: "As perguntas certas abrem histórias que ninguém tinha ouvido."
- Subtítulo: "Use as nossas, adapte ou escreva as suas."
- **Fichário** (substitui o carrossel): as 10 perguntas em lista, em tipo grande (tamanho de destaque), uma por linha, à esquerda (7/12). À direita (5/12), um quadro fixo mostra o QuestionCard da pergunta apontada; para as perguntas que têm foto, a foto antiga aparece atrás do cartão.
  - Apontar ou focar uma pergunta troca o quadro (crossfade de ~240ms). As outras perguntas continuam em tinta cheia (sem esmaecer).
  - Cada pergunta é um `<button>` com `aria-controls` para o quadro; o quadro tem `aria-live="polite"`.
  - Mobile: sem quadro fixo; tocar uma pergunta abre o cartão logo abaixo dela (`<details>`), uma aberta por vez.
- Perguntas (e a foto do quadro, quando houver):
  1. "Como era a casa onde você cresceu?" · `antiga-casa`
  2. "Como você conheceu o grande amor da sua vida?" · `antiga-casamento`
  3. "Qual foi o primeiro trabalho que você teve?" · `antiga-trabalho`
  4. "Que cheiro ainda te leva de volta à infância?" · `antiga-fazenda`
  5. "Qual foi o dia mais feliz da sua vida?" · `antiga-praia`
  6. "O que sua mãe sempre dizia?"
  7. "Que receita da família não pode se perder?" · `antiga-flores`
  8. "Qual foi a maior coragem que você já teve?"
  9. "O que você gostaria que seus netos soubessem sobre você?"
  10. "Que conselho você daria para quem está começando a vida?"

## 8. Valor e interesse (#interesse)
- Duas colunas no desktop: o colofão à esquerda, o formulário à direita.
- H2: "Edição de Natal 2026"

À esquerda, o **colofão** (folha papel, recortada como as outras peças, sem linhas e sem caixa colorida):
- "R$ 397" no tamanho display; abaixo, "por livro, com tudo incluído".
- Três linhas:
  - "Pix ou cartão em até 12x"
  - "Exemplares extras para a família: R$ 149 cada"
  - "Pode ser um presente dos irmãos juntos"
- Assentado como colofão de editora **[aprovar]**:
  "Tiragem: 10 livros. Inscrições até 7 de novembro."
  "Para que cada livro receba o cuidado que merece, esta edição terá 10 livros. As inscrições vão até 7 de novembro, para garantir quatro semanas de histórias e tempo de edição, impressão e entrega antes do Natal."
- Depois de um espaço, menor:
  "Depois do primeiro livro, quem quiser pode continuar contando histórias e criar um novo volume. É opcional, sem renovação automática."

À direita, o formulário:
- Título: "Tenho interesse"
- Campos:
  - "Seu nome"
  - "Seu WhatsApp" (máscara brasileira)
  - "Para quem seria o livro?" (select: pai, mãe, avô, avó, tio, tia, amigo, outra pessoa)
  - Se a LiveCover foi usada, mostrar acima do botão uma miniatura da capa escolhida, com o nome e a cor, e enviar os dois como campos ocultos `capa_nome` e `capa_cor`.
  - Honeypot invisível contra spam.
- Botão: "Quero garantir um livro"
- Microcopy: "Sem compromisso. Respondemos pelo WhatsApp em até 24 horas com os próximos passos."
- Sucesso: o formulário é substituído por "Recebemos. Em breve falamos com você pelo WhatsApp." e um link secundário "Prefere falar agora? Abrir WhatsApp" (wa.me com a mensagem pré-preenchida abaixo).
- Mensagem wa.me: "Olá! Tenho interesse no livro da Ecoa Memórias para meu/minha [opção]. Meu nome é [nome]."

Abaixo do painel, em uma linha:
"Se a primeira história não emocionar a família, devolvemos o valor integral."

## 9. Perguntas frequentes
- H2: "Perguntas frequentes"
- **Fichas de arquivo**: cartões preenchidos (cores das capas, em rodízio, texto com contraste ≥ 4.5:1), cada um com uma aba recortada em `clip-path`, empilhados e sobrepostos, mostrando 96px de cada (88px no mobile). A aba traz o tema em uma ou duas palavras; a faixa visível, a pergunta. Abrir uma ficha mostra a resposta e empurra as de baixo. Uma aberta por vez; a primeira aberta ao carregar. Implementação com `<details>`/`<summary>` ou botões com `aria-expanded`. Sem linhas, sem + / –.

| Aba | Pergunta | Resposta |
|---|---|---|
| Tecnologia | Quem conta as histórias precisa saber usar tecnologia? | Se manda áudio no WhatsApp, já sabe tudo o que precisa. Se preferir, também é possível gravar por uma ligação. |
| O presente | Como a pessoa fica sabendo do presente? | Você conta a novidade do seu jeito. Depois, enviamos uma mensagem de boas-vindas explicando como serão as próximas semanas, e começamos quando ela disser que topa. |
| Seu trabalho | Vai dar trabalho para mim? | Não. Você escolhe as perguntas (ou deixa com a gente) e envia algumas fotos. Os envios, os lembretes, a edição e as mensagens da família ficam com a gente. |
| O grupo | Quem conta as histórias participa do grupo da família? | Não. O grupo é só da família, para que o livro final continue sendo surpresa. |
| Mensagens | Como são reunidas as mensagens da família? | Você nos passa os contatos e nós cuidamos dos convites e dos lembretes. |
| Tempo | Quanto tempo leva por dia? | Alguns minutos. Cada áudio costuma ter entre 2 e 5 minutos, e dá para responder quando quiser. |
| Aprovação | Posso ver o livro antes da impressão? | Sim. Você recebe o arquivo completo e aprova antes de imprimirmos. |
| Prazo | Chega mesmo antes do Natal? | Sim, para inscrições até 7 de novembro. |
| Desistência | E se a pessoa não quiser participar? | Devolvemos o valor integral. |
| Os áudios | Com quem ficam os áudios? | Com a família, para sempre. Usamos apenas para produzir o livro. |

## 10. Fecho
- Seção curta em floresta. O único momento centralizado da página.
- H2: "Algumas histórias só uma pessoa pode contar. Que elas continuem ecoando." (único uso do trocadilho)
  - Se passar de 2 linhas em 390px, reduzir a medida antes da fonte; se ainda assim quebrar, perguntar.
- Botão polen com texto floresta: "Tenho interesse".
- Abaixo, as 5 capas como lombadas, em pé numa estante (se a LiveCover foi usada, a capa do visitante entra na estante).

## 11. Rodapé
- "Ecoa Memórias" em tamanho grande, na largura toda (a contracapa).
- WhatsApp, e-mail, link "Privacidade", CNPJ (placeholder).
- "Feito com cuidado em Belo Horizonte."

## /privacidade
Política LGPD simples e clara:
- Dados coletados: leads; depois, dados de quem compra, de quem conta, dos familiares, além de áudios e fotos.
- Finalidade: contato comercial e produção do livro.
- Operadores: hospedagem, e-mail, gráfica.
- Não há venda nem compartilhamento para publicidade.
- Retenção.
- Direitos de acesso e exclusão.
- Contato.

## SEO e preview
- Title: "Ecoa Memórias · Livro de memórias contado por áudio"
- Description: a frase de apoio do hero.
- `opengraph-image.tsx` (next/og) em 1200×630:
  - fundo polen
  - uma capa floresta à direita
  - à esquerda, "Ecoa Memórias" e o H1 aprovado
- locale pt_BR.
- O preview no WhatsApp é a primeira impressão do cliente: testar.

## Analytics
- Vercel Analytics.
- Todos os botões "Tenho interesse" com `data-cta` único (header, hero, fecho).
- Evento `capa_personalizada` (uma vez por visita, quando o visitante digita um nome ou troca a cor), com a propriedade `cor`. Nunca enviar o nome digitado.
- Evento `lead_enviado` no sucesso do formulário, com as propriedades `para_quem` e `usou_capa`.
