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
- Sem nome de pessoa: título "O que a vida me ensinou" e uma foto antiga ilustrativa na janela (`antiga-casamento`). Sem o arquivo, só o título.
- Rótulo "Escolha a cor do tecido" e cinco lombadas clicáveis (`<button>` com `aria-pressed` e nome acessível "Capa vinho" etc.).
- Guarda a cor em estado compartilhado; a seção 8 e a estante do fecho a usam.
- Encostado na capa, um áudio de WhatsApp (2:14, ilustrativo, não toca).
- Sem JS: capa estática "O que a vida me ensinou", floresta.

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
- Links: "Como funciona", "O livro", "Perguntas", "Preço".
- Botão principal pequeno (sólido, floresta): "Tenho interesse" (→ #interesse).
- Fixo ao rolar: fundo muda de polen para papel (degrau de tom). Sem borda, sem blur, sem sombra.
- No mobile: logo e botão; os links vão para um menu simples (`<details>` ou botão com `aria-expanded`).

## 2. Hero
Duas colunas no desktop: título na largura de 8/12; abaixo, texto à esquerda (6/12) e a capa ao vivo à direita (6/12). As lombadas de cor descem para a coluna do texto. No mobile: título, frase, botão, fatos, capa, lombadas.

- H1: "A voz de quem você ama, em capa dura."
- Frase de apoio (aprovada em 30/10):
  "Durante quatro semanas, quem você ama recebe uma pergunta por dia útil no WhatsApp e responde por áudio, do jeito que já faz. A família manda mensagens em segredo, e tudo vira um livro de capa dura com a voz original, entregue antes do Natal."
- Botão: "Quero este livro" → #interesse. Ao lado, link secundário com o ícone do WhatsApp: "Ou chame a gente no WhatsApp" (wa.me com "Olá! Quero saber mais sobre o livro da Ecoa Memórias.").
- Fatos, numa linha só em tamanho pequeno, abaixo do botão:
  "R$ 397, pagamento único · Pix ou 12x sem juros · Só 10 famílias nesta edição · Inscrições até 7 de novembro"
- Visual: LiveCover grande, entreaberta, com o áudio de WhatsApp encostado. Fundo polen liso, com o grão de papel. Sem gradiente.

## 3. O que você recebe (#livro)
- H2: "Um livro para segurar. E vozes para ouvir sempre." (corte aprovado: o original quebrava em 3 linhas em 390px)
- Layout: à esquerda (5/12), uma BookCover floresta grande ("O que a vida me ensinou"); à direita (7/12), a **ficha técnica**: uma folha papel com bordas superior e inferior recortadas (`clip-path`), itens em `<dl>` com o nome à esquerda, o valor à direita e um pontilhado de pontos redondos de 4px entre eles. Sem ícones, sem checkmarks, sem linhas finas.

| Item | Valor (à direita) |
|---|---|
| "Livro de capa dura em papel encorpado" | `FORMATO_LIVRO` (o número de páginas não aparece) |
| "Histórias contadas por áudio, editadas sem perder o jeito de falar" | no ritmo da família |
| "Fotos da família ao longo dos capítulos" | incluídas |
| "Um QR code em cada história para ouvir a voz original" | em todas |
| "Mensagens de filhos, netos e amigos, em áudio ou texto, reunidas em segredo" | de toda a família |
| "Capa com foto e cor à escolha" | 5 cores |
| "Os áudios originais, entregues à família" | para sempre |

## 4. Como funciona (#como-funciona)
- H2: "Tudo acontece no WhatsApp."
- Abaixo do título, uma barra de 6px em tom suave com três marcas de texto: "Dia 1", "Semana 4", "Natal".
- Os quatro momentos em `<ol>` (a ordem vem da lista e das palavras; sem "PASSO N", sem números grandes).
- Desktop: quatro colunas; em cada uma, título em Newsreader (tamanho h3 = destaque), parágrafo curto, depois um espaço que varia de coluna para coluna (80, 140, 100, 120px), depois a imagem 4:3. As imagens sobem e descem ao longo da fileira, para não virar fileira de cards.
- Mobile: rolagem horizontal com scroll-snap, colunas de 78vw, o próximo momento aparecendo pela borda; a barra de 6px vira indicador de progresso.

| Título | Texto | Visual |
|---|---|---|
| "Você dá a notícia." | "Do seu jeito. Depois, mandamos as boas-vindas e só começamos quando a pessoa topar. As perguntas vêm da nossa seleção ou de você." | QuestionCard "Como era a casa onde o senhor cresceu?" sobre a foto `antiga-casa` (sem a foto, só o cartão) |
| "A pergunta chega. A resposta é um áudio." | "Uma pergunta por dia útil, direto no WhatsApp. Sem aplicativo, sem senha, sem escrever nada." | WhatsAppChat `individual` "Ecoa Memórias": a pergunta do dia e a resposta em áudio de 2:14 |
| "A família ouve no mesmo dia." | "Cada história gravada chega no mesmo dia a um grupo só da família." | WhatsAppChat `grupo` "Histórias do Vô": áudio de 2:14, "Capítulo 6 · A casa da Rua Bahia", reações "não sabia disso" e "que saudade dessa casa" |
| "O livro chega antes do Natal." | "Com as histórias, as fotos e as mensagens da família, que chegam como surpresa." | BookCover vinho "Caminhos que percorri", fechada |

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
  - foto `surpresa-ceia` grande (4:5 no mobile, 3:2 no desktop), ocupando ao menos metade da largura. Sem a foto, os bilhetes ficam espalhados sobre uma folha papel (5:4 no mobile, 2:1 no desktop)
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
- "R$ 397" no tamanho display; abaixo, "por livro. Frete à parte, para todo o Brasil."
- Três linhas:
  - "Pix ou 12x sem juros de R$ 33,08" (calculado de `PRECO_LIVRO` / `PARCELAS_MAX`)
  - "Exemplares extras: R$ 149 cada"
  - "Entre três irmãos, sai por menos de R$ 133 para cada."
- Assentado como colofão de editora:
  "Tiragem: 10 livros. Inscrições até 7 de novembro."
  "Para que cada livro receba o cuidado que merece: quatro semanas de histórias e tempo de edição, impressão e entrega antes do Natal."
- A garantia, no fim da folha:
  "Você recebe a primeira história editada. Se ela não emocionar a família, devolvemos 100%. E se a pessoa não topar participar, também."

À direita, o formulário:
- Título: "Quero este livro"
- Campos:
  - "Seu nome"
  - "Seu WhatsApp" (máscara brasileira)
  - "Para quem seria o livro?" (select: pai, mãe, avô, avó, tio, tia, amigo, outra pessoa)
  - Se a cor da LiveCover foi trocada, mostrar acima do botão uma miniatura da capa com "Capa {cor}" e enviar `capa_cor` como campo oculto.
  - Honeypot invisível contra spam.
- Botão: "Quero este livro"
- Microcopy: "Nada é cobrado agora. Logo em seguida, falamos com você pelo WhatsApp para tirar dúvidas e garantir a sua vaga."
- Sucesso: o formulário é substituído por "Recebemos. Em breve falamos com você pelo WhatsApp." e um link secundário "Prefere falar agora? Abrir WhatsApp" (wa.me com a mensagem pré-preenchida abaixo).
- Mensagem wa.me: "Olá! Tenho interesse no livro da Ecoa Memórias para meu/minha [opção]. Meu nome é [nome]." (+ "Gostei da capa [cor]." quando houver)

## 9. Perguntas frequentes
- H2: "Perguntas frequentes"
- **Fichas de arquivo**: cartões preenchidos (cores das capas, em rodízio, texto com contraste ≥ 4.5:1), cada um com uma aba recortada em `clip-path`, empilhados e sobrepostos, mostrando 96px de cada (88px no mobile). A aba traz o tema em uma ou duas palavras; a faixa visível, a pergunta. Abrir uma ficha mostra a resposta e empurra as de baixo. Uma aberta por vez; a primeira aberta ao carregar. Implementação com `<details>`/`<summary>` ou botões com `aria-expanded`. Sem linhas, sem + / –.

Ordem: as objeções mais fortes primeiro (pagamento, desistência, tempo).

| Aba | Pergunta | Resposta |
|---|---|---|
| Pagamento | Quando e como eu pago? | Só depois de conversarmos pelo WhatsApp e você confirmar. O valor é pago de uma vez, no Pix ou no cartão em até 12x sem juros. |
| Desistência | E se a pessoa não quiser participar? | Devolvemos o valor integral. E se a primeira história editada não emocionar a família, também. |
| Tempo | Quanto tempo leva por dia? | Alguns minutos. Cada áudio costuma ter entre 2 e 5 minutos, e dá para responder quando quiser. |
| WhatsApp | Quem conta as histórias precisa saber mexer no celular? | Se manda áudio no WhatsApp, já sabe tudo o que precisa. Se preferir, também é possível gravar por uma ligação. |
| O presente | Como a pessoa fica sabendo do presente? | Quem dá a notícia é você, do seu jeito. Depois, enviamos uma mensagem de boas-vindas explicando como serão as próximas semanas, e começamos quando ela disser que topa. |
| Seu trabalho | Vai dar trabalho para mim? | Não. Você escolhe as perguntas (ou deixa com a gente) e envia algumas fotos. Do resto cuidamos nós, inclusive de reunir as mensagens da família. |
| Edição | Quem edita as histórias? | Uma pessoa da nossa equipe ouve e edita cada história, sem perder o jeito de falar de quem conta. A família lê tudo e pode pedir ajustes antes da impressão. |
| Tamanho | Quantas histórias cabem no livro? | Em geral, de 10 a 20. Mas o livro se ajusta ao que a família quiser contar. |
| O grupo | Quem conta as histórias participa do grupo da família? | Não. O grupo é só da família, para que o livro final continue sendo surpresa. |
| Mensagens | Como são reunidas as mensagens da família? | Você nos passa os contatos e nós cuidamos dos convites e dos lembretes. |
| Prazo | Chega mesmo antes do Natal? | Sim, para inscrições até 7 de novembro. |
| Frete | Entregam em todo o Brasil? O frete está incluso? | Entregamos em todo o Brasil. O frete é à parte e calculado para o seu CEP. |
| Os áudios | Com quem ficam os áudios? | Com a família, para sempre. Usamos apenas para produzir o livro. |
| QR codes | Os QR codes vão parar de funcionar? | Não. E os áudios originais ficam com a família desde o primeiro dia. |
| Novo volume | E depois do primeiro livro? | Quem quiser pode continuar contando histórias e criar um novo volume. É opcional, sem renovação automática. |

## 10. Fecho
- Seção curta em floresta. O único momento centralizado da página.
- H2: "Algumas histórias só uma pessoa pode contar. Que elas continuem ecoando." (único uso do trocadilho)
  - Se passar de 2 linhas em 390px, reduzir a medida antes da fonte; se ainda assim quebrar, perguntar.
- Botão polen com texto floresta: "Tenho interesse".
- Abaixo, as 5 capas como lombadas, em pé numa estante, com o título na lombada (nunca nome de pessoa). Se a cor da LiveCover foi trocada, esse livro sai um pouco da fileira, no meio dela.
- Legenda pequena abaixo da estante: "Cinco cores de tecido. A próxima pode ser a da sua família."

## 11. Rodapé
- "Ecoa Memórias" em tamanho grande, na largura toda (a contracapa).
- WhatsApp, e-mail, link "Privacidade", CNPJ (placeholder).
- "Feito em Belo Horizonte."

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
- Todos os botões de interesse com `data-cta` único (header, hero, hero-whatsapp, formulario, fecho).
- Evento `capa_personalizada` (uma vez por visita, quando o visitante troca a cor), com a propriedade `cor`.
- Evento `lead_enviado` no sucesso do formulário, com as propriedades `para_quem`, `usou_capa` e `status` (`gravado` ou `fallback`).
