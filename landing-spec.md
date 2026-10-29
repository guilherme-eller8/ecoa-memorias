# Ecoa Memórias — especificação da landing

Fonte de verdade de conteúdo e estrutura. As regras de design e de copy estão no CLAUDE.md. Textos entre aspas são copy final; ajuste apenas se quebrar o layout.

## A sensação
Uma caixa de lembranças guardada com cuidado. Uma editora pequena e séria fazendo algo precioso à mão. Confiança, calma, valor.

O visitante sai com três certezas:
1. É simples para quem conta: só áudio, no WhatsApp.
2. É leve para quem presenteia: a Ecoa cuida das perguntas, dos lembretes e da edição.
3. O resultado é um objeto bonito, que a família inteira vai guardar.

---

## Componentes visuais (feitos em código, não em imagem)

### BookCover — sistema de capa próprio
- Aparência física:
  - lombada visível
  - leve perspectiva 3D
  - sombra suave projetada no chão
  - cantos com 2px de raio
  - borda de páginas visível quando entreaberto
- Elementos:
  - cor sólida (vinho, rosa-antigo, névoa, petróleo ou floresta)
  - janela de foto retangular com margem de papel
  - rótulo "LIVRO DE MEMÓRIAS" em versalete Inter
  - título em Newsreader
  - nome em itálico
  - um único filete dourado curto abaixo do título
  - monograma da Ecoa pequeno no pé da capa
  - lombada com título e nome na vertical
- Props: `color`, `title`, `author`, `photo?`, `open?`, `size`.
- NÃO usar moldura dupla de filetes (é assinatura de outra marca).

Títulos de exemplo (fictícios):
| Título | Nome | Cor | Foto |
|---|---|---|---|
| Caminhos que percorri | Antônio Ferreira | vinho | antiga-trabalho |
| Da roça à cidade | Lourdes Almeida | névoa | antiga-fazenda |
| O que a vida me ensinou | José Carlos Ribeiro | floresta | sem foto |
| Histórias da nossa casa | Maria Helena Costa | petróleo | antiga-flores |
| Memórias de um caixeiro-viajante | Geraldo Souza | rosa-antigo | antiga-casamento |

### OpenBookSpread
Livro aberto em página dupla, com curvatura sutil no centro e sombra da dobra.
- Página esquerda: foto antiga.
- Página direita:
  - numeral romano
  - título do capítulo
  - ano
  - 3 parágrafos de texto
  - QR code pequeno no alto (gerado com a biblioteca `qrcode`, apontando para NEXT_PUBLIC_SITE_URL)
  - número de página

### PhoneAudioPlayer
Celular desenhado em CSS (moldura fina, levemente inclinado, sombra suave). Na tela:
- título da história
- botão de play
- barra de progresso
- tempo

### WhatsAppChat
Simulação fiel ao visual do WhatsApp, mas dessaturada para a paleta. Variantes:
- `individual`: Ecoa ↔ quem conta
- `grupo`: grupo da família

Mensagens de áudio com forma de onda e duração.

### NoteCard
Bilhete em papel creme, levemente rotacionado, com texto em Caveat. Suporta corte na borda (texto saindo do cartão).

### QuestionCard
Cartão de papel branco com uma pergunta centralizada em Newsreader de 26–30px.

### Primitivos
- `Eyebrow` (rótulo em versalete)
- `GoldRule` (filete de 1px)
- `Button`
- `Section`
- `Container`

---

## 1. Cabeçalho
- Logo Ecoa à esquerda.
- Links discretos: "Como funciona", "O livro", "Perguntas", "Valor".
- Botão pequeno com contorno: "Tenho interesse" (→ #interesse).
- Fixo ao rolar: fundo creme e borda inferior de 1px na cor tinta a 10%.
- No mobile: só o logo e o botão; os links vão para um menu simples.

## 2. Hero
Duas colunas no desktop (texto à esquerda, livros à direita); empilhado no mobile, com o texto primeiro.

- Eyebrow: "LIVRO DE MEMÓRIAS · EDIÇÃO DE NATAL"
- H1: "As histórias de [expressão rotativa], guardadas para sempre."
  - A expressão alterna a cada ~2,8s, com fade vertical suave, entre:
    "seu pai", "sua mãe", "seu avô", "sua avó", "seu tio", "sua tia", "aquele amigo".
  - Itálico, cor vinho.
  - Reservar a largura da expressão mais longa para não haver salto de layout.
  - A animação fica com aria-hidden; o texto acessível é "As histórias de alguém especial, guardadas para sempre."
  - Com reduced-motion, mostrar fixo "quem você ama".
- Subtítulo:
  "Enviamos uma pergunta por dia pelo WhatsApp. A resposta vem por áudio, no ritmo de quem conta. Em quatro semanas, as histórias, as fotos e as mensagens da família viram um livro de capa dura, entregue antes do Natal."
- Botão: "Tenho interesse" → #interesse
- Linha sob o botão (Inter pequeno, tinta-2):
  "R$ 397 por livro · Edição de Natal com 10 livros · Inscrições até 7 de novembro"
- Visual: composição com as 5 BookCovers em pé, levemente sobrepostas em profundidade, uma entreaberta. Fundo creme com luz lateral muito suave (radial na cor papel).

## 3. O que você recebe (#livro)
- Eyebrow: "O QUE VOCÊ RECEBE"
- H2: "Um livro para segurar nas mãos. E vozes para ouvir sempre."
- Layout: à esquerda, uma BookCover floresta grande ("O que a vida me ensinou"); à direita, uma ficha técnica em lista com filetes dourados entre os itens (sem ícones, sem checkmarks):
  - "Livro de capa dura, [FORMATO], com cerca de [Nº] páginas em papel encorpado"
  - "Até 20 histórias contadas por áudio, editadas com cuidado para manter o jeito de falar"
  - "Fotos da família ao longo dos capítulos"
  - "Um QR code em cada história para ouvir a voz original"
  - "Até 10 mensagens de filhos, netos e amigos, em áudio ou texto, reunidas em segredo"
  - "Capa personalizada com foto, título e cor à escolha"
  - "Os áudios originais, entregues à família"
- [FORMATO] e [Nº] vêm do config (placeholders "21 × 21 cm" e "60").

## 4. Como funciona (#como-funciona)
- Eyebrow: "COMO FUNCIONA"
- H2: "Tudo acontece no WhatsApp."
- 4 colunas no desktop; no mobile, carrossel horizontal com scroll-snap e o próximo cartão aparecendo pela borda.
- Cada passo tem uma imagem 4:3 (raio de 4px), o rótulo "PASSO N", um título em Newsreader e um parágrafo curto.

| Passo | Título | Texto | Visual |
|---|---|---|---|
| 1 | "Escolha as perguntas." | "Da nossa seleção ou escritas por você. Infância, casamento, trabalho, fé, a casa onde cresceu." | QuestionCard "Como era a casa onde o senhor cresceu?" sobre a foto `antiga-casa`, levemente rotacionado |
| 2 | "A pergunta chega. A resposta é um áudio." | "Uma pergunta por dia, direto no WhatsApp. Sem aplicativo, sem senha, sem escrever nada." | foto `passo-2-gravando` |
| 3 | "A família ouve no mesmo dia." | "Cada história gravada chega a um grupo só da família. Ouvir vira o melhor momento da semana." | WhatsAppChat `grupo` "Histórias do Vô": áudio de 2:14, "Capítulo 6 · A casa da Rua Bahia", reações "não sabia disso" e "que saudade dessa casa" |
| 4 | "O livro chega antes do Natal." | "Com as histórias, as fotos e as mensagens da família, que chegam como surpresa." | foto `passo-4-livro` |

- Linha abaixo dos passos (Source Serif, itálico, tinta-2):
  "Você escolhe as perguntas e conta a novidade. Os envios, os lembretes e a edição ficam com a gente."

## 5. A voz em cada página
- Fundo papel ligeiramente mais quente que o creme.
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
  - Anotação em Caveat, com seta fina desenhada em SVG, perto do QR: "aponte e ouça".
- Mostrar só esta dupla. Nada de flipbook, sumário ou páginas adicionais.

## 6. A surpresa
- H2: "No final, quem contou as histórias recebe uma surpresa."
- Texto: "Enquanto as histórias são gravadas, filhos, netos e amigos enviam, em segredo, uma mensagem em áudio ou por escrito. Cada uma ganha uma página no livro, com QR code para quem quiser ouvir. Quem conta as histórias só descobre no Natal."
- Visual:
  - foto `surpresa-ceia` (proporção 4:5 no mobile, 3:2 no desktop)
  - sobre ela, em uma das bordas, 3 NoteCards sobrepostos e cortados (sugerir, não revelar):
    - "Pai, obrigada por cada domingo..."
    - "Vô, até hoje eu lembro do..."
    - "Tio, foi o senhor que me ensinou..."
  - Um QR pequeno estilizado em um dos bilhetes.

## 7. Perguntas que abrem histórias (#perguntas)
- Fundo floresta com textura de tecido; textos em creme.
- H2: "As perguntas certas abrem histórias que ninguém tinha ouvido."
- Subtítulo: "Use as nossas, adapte ou escreva as suas."
- Carrossel horizontal de QuestionCards:
  - scroll-snap, swipe no mobile
  - setas circulares com contorno creme no desktop
  - cartões de ~300px, com o próximo aparecendo pela borda
- Perguntas:
  1. "Como era a casa onde você cresceu?"
  2. "Como você conheceu o grande amor da sua vida?"
  3. "Qual foi o primeiro trabalho que você teve?"
  4. "Que cheiro ainda te leva de volta à infância?"
  5. "Qual foi o dia mais feliz da sua vida?"
  6. "O que sua mãe sempre dizia?"
  7. "Que receita da família não pode se perder?"
  8. "Qual foi a maior coragem que você já teve?"
  9. "O que você gostaria que seus netos soubessem sobre você?"
  10. "Que conselho você daria para quem está começando a vida?"

## 8. Valor e interesse (#interesse)
- Duas colunas no desktop: valor à esquerda, formulário à direita.
- Painel em papel com filete dourado; sem caixa colorida gritante.

À esquerda:
- Eyebrow: "EDIÇÃO DE NATAL 2026"
- "R$ 397" em Newsreader grande; abaixo, "por livro, com tudo incluído".
- Três linhas discretas:
  - "Pix ou cartão em até 12x"
  - "Exemplares extras para a família: R$ 149 cada"
  - "Pode ser um presente dos irmãos juntos"
- Parágrafo:
  "Para que cada livro receba o cuidado que merece, esta edição terá 10 livros. As inscrições vão até 7 de novembro, para garantir quatro semanas de histórias e tempo de edição, impressão e entrega antes do Natal."
- Filete; depois, menor:
  "Depois do primeiro livro, quem quiser pode continuar contando histórias e criar um novo volume. É opcional, sem renovação automática."

À direita, o formulário:
- Título pequeno: "Tenho interesse"
- Campos:
  - "Seu nome"
  - "Seu WhatsApp" (máscara brasileira)
  - "Para quem seria o livro?" (select: pai, mãe, avô, avó, tio, tia, amigo, outra pessoa)
  - Honeypot invisível contra spam.
- Botão: "Quero garantir um livro"
- Microcopy: "Sem compromisso. Respondemos pelo WhatsApp em até 24 horas com os próximos passos."
- Sucesso: o formulário é substituído por "Recebemos. Em breve falamos com você pelo WhatsApp." e um link secundário "Prefere falar agora? Abrir WhatsApp" (wa.me com a mensagem pré-preenchida abaixo).
- Mensagem wa.me: "Olá! Tenho interesse no livro da Ecoa Memórias para meu/minha [opção]. Meu nome é [nome]."

Abaixo do painel, em uma linha discreta:
"Se a primeira história não emocionar a família, devolvemos o valor integral."

## 9. Perguntas frequentes
Accordion sóbrio, com filetes, apenas + / –.

| Pergunta | Resposta |
|---|---|
| Quem conta as histórias precisa saber usar tecnologia? | Se manda áudio no WhatsApp, já sabe tudo o que precisa. Se preferir, também é possível gravar por uma ligação. |
| Como a pessoa fica sabendo do presente? | Você conta a novidade do seu jeito. Depois, enviamos uma mensagem de boas-vindas explicando como serão as próximas semanas, e começamos quando ela disser que topa. |
| Vai dar trabalho para mim? | Não. Você escolhe as perguntas (ou deixa com a gente) e envia algumas fotos. Os envios, os lembretes, a edição e as mensagens da família ficam com a gente. |
| Quem conta as histórias participa do grupo da família? | Não. O grupo é só da família, para que o livro final continue sendo surpresa. |
| Como são reunidas as mensagens da família? | Você nos passa os contatos e nós cuidamos dos convites e dos lembretes. |
| Quanto tempo leva por dia? | Alguns minutos. Cada áudio costuma ter entre 2 e 5 minutos, e dá para responder quando quiser. |
| Posso ver o livro antes da impressão? | Sim. Você recebe o arquivo completo e aprova antes de imprimirmos. |
| Chega mesmo antes do Natal? | Sim, para inscrições até 7 de novembro. |
| E se a pessoa não quiser participar? | Devolvemos o valor integral. |
| Com quem ficam os áudios? | Com a família, para sempre. Usamos apenas para produzir o livro. |

## 10. Fecho
- Seção curta em floresta.
- H2: "Algumas histórias só uma pessoa pode contar. Que elas continuem ecoando." (único uso do trocadilho)
- Botão creme com texto floresta: "Tenho interesse".
- Abaixo, as 5 capas em miniatura, alinhadas como numa estante.

## 11. Rodapé
- Logo, WhatsApp, e-mail, link "Privacidade", CNPJ (placeholder).
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
- Description: o subtítulo do hero.
- `opengraph-image.tsx` (next/og) em 1200×630:
  - fundo creme
  - uma capa floresta à direita
  - à esquerda, "Ecoa Memórias" e "As histórias de quem você ama, guardadas para sempre."
- locale pt_BR.
- O preview no WhatsApp é a primeira impressão do cliente: testar.

## Analytics
- Vercel Analytics.
- Todos os botões "Tenho interesse" com `data-cta` único (header, hero, fecho).
- Evento `lead_enviado` no sucesso do formulário, com a propriedade `para_quem`.
