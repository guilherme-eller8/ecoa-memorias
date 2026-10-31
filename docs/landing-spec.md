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
A BookCover do hero, fixa em floresta (a escolha de cor saiu em 31/10):
- Sem nome de pessoa: título "O que a vida me ensinou" e uma foto antiga ilustrativa na janela (`antiga-casamento`). Sem o arquivo, só o título.
- Entreabre ao passar o mouse e mostra a borda das páginas.
- Encostado na capa, um áudio de WhatsApp (2:14, ilustrativo, não toca).

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
- Sem botão no cabeçalho (30/10): os CTAs ficam no hero, no colofão e no fecho.
- Fixo ao rolar: fundo muda de polen para papel (degrau de tom). Sem borda, sem blur, sem sombra.
- No mobile: logo e botão; os links vão para um menu simples (`<details>` ou botão com `aria-expanded`).

## 2. Hero
Duas colunas no desktop: título e texto à esquerda, a capa à direita já na altura do título, limitada pela altura da tela. No mobile: título, frase, botão, fatos, capa.

- H1: "A voz de quem você ama, em capa dura."
- Frase de apoio (aprovada em 30/10):
  "Durante quatro semanas, quem você ama recebe uma pergunta por dia útil no WhatsApp e responde por áudio, do jeito que já faz. A família manda mensagens em segredo, e tudo vira um livro de capa dura com a voz original, entregue antes do Natal."
- Botão: "Quero este livro" → #interesse. Ao lado, link secundário com o ícone do WhatsApp: "Ou chame a gente no WhatsApp" (wa.me com "Olá! Quero saber mais sobre o livro da Ecoa Memórias.").
- Fatos, numa linha só em tamanho pequeno, abaixo do botão: "Edição de Natal · Inscrições até 7 de novembro". O preço fica só no colofão (seção 8).
- Visual: LiveCover grande, entreaberta, com o áudio de WhatsApp encostado. Fundo polen liso, com o grão de papel. Sem gradiente.

## 2b. O valor (#valor)
- Fundo papel. Título no tamanho display: "Para os netos dos seus netos."
- Destaque: "Daqui a cinquenta anos, alguém vai abrir este livro e ouvir a voz de um bisavô que nunca conheceu."
- Corpo: "As histórias que a família pede para repetir no almoço de domingo ficam no papel. E a voz de quem contou continua ali, para quem vier depois."
- Com a foto `antiga-praia`, ela entra à direita como cópia impressa; sem ela, o texto desce em diagonal para a direita.

## 3. O que você recebe (#livro)
- H2: "Um livro para segurar. E vozes para ouvir sempre."
- A capa ao centro, com quatro anotações em volta (duas de cada lado, com setas desenhadas à mão apontando para ela); no celular, a capa e a lista abaixo.
  - "Capa dura com a foto de quem conta" · "Numa das cinco cores, com o título que a família escolher."
  - "As histórias, sem perder o jeito de falar" · "Editadas com as fotos da família ao longo dos capítulos."
  - "Um QR code em cada história" · "Aponte o celular e ouça a voz original."
  - "No fim, as mensagens da família" · "Filhos, netos e amigos, em áudio ou por escrito, guardadas em segredo."
- Linha pequena no pé: "Formato 21 × 21 cm. Os áudios originais ficam com a família, para sempre."

## 4. Como funciona (#como-funciona)
- H2: "Tudo acontece no WhatsApp."
- Abaixo do título, uma barra de 6px em tom suave com três marcas de texto: "Dia 1", "Semana 4", "Natal".
- Os quatro momentos em `<ol>` (a ordem vem da lista e das palavras; sem "PASSO N", sem números grandes).
- Desktop: quatro colunas; em cada uma, título em Newsreader (tamanho h3 = destaque), parágrafo curto, depois um espaço que varia de coluna para coluna (80, 140, 100, 120px), depois a imagem 4:3. As imagens sobem e descem ao longo da fileira, para não virar fileira de cards.
- Mobile: rolagem horizontal com scroll-snap, colunas de 78vw, o próximo momento aparecendo pela borda; a barra de 6px vira indicador de progresso.

| Título | Texto | Visual |
|---|---|---|
| "Você dá a notícia." | "Você convida quem vai contar as histórias a responder às perguntas por áudio, ou texto se preferir, no WhatsApp. Depois, mandamos as boas-vindas e só começamos quando a pessoa topar. As perguntas vêm da nossa seleção ou de você." | QuestionCard "Como era a casa onde o senhor cresceu?" sobre a foto `antiga-casa` (sem a foto, só o cartão) |
| "A resposta é um áudio. A família ouve." | "Uma pergunta por dia útil, direto no WhatsApp, sem aplicativo nem senha. Cada história gravada chega no mesmo dia a um grupo só da família." | WhatsAppChat `grupo` "Histórias do Vô": áudio de 2:14, "Capítulo 6 · A casa da Rua Bahia", reações "não sabia disso" e "que saudade dessa casa" |
| "Você revisa antes de imprimir." | "Editamos as histórias e mandamos a prova do livro em PDF. Você lê com calma, pede os ajustes, e só imprimimos com o seu ok." | WhatsAppChat `individual` "Ecoa Memórias": "A prova do livro está pronta, em PDF. Leia com calma e diga o que ajustar." e a resposta "Só corrige o nome da tia: é Lurdes, com U. O resto, pode imprimir!" |
| "O livro chega antes do Natal." | "Com as histórias, as fotos e as mensagens da família, que chegam como surpresa." | BookCover vinho "Caminhos que percorri", fechada |

- Linha abaixo (Newsreader 19px, tinta):
  "Você escolhe as perguntas e conta a novidade. Os envios, os lembretes e a edição ficam com a gente."

## 5. A voz em cada página
- Fundo papel (um degrau mais claro que o polen).
- Layout: título e texto juntos à esquerda (5/12); composição à direita (7/12), começando na altura do título e limitada pela altura da tela, para o livro aberto aparecer inteiro junto com o título.
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
- H2: "No final, quem contou recebe uma surpresa."
- Texto: "Duas partes fazem o livro. Uma delas, quem conta só conhece no Natal: cada mensagem da família ganha uma página, com QR code para ouvir."
- Layout espelhado em relação à seção 5 (vizinhas não repetem composição): o livro aberto à esquerda (7/12), título e texto à direita (5/12).
- O livro aberto mostra as páginas "Mensagens da família". Em cada página: a foto de quem escreveu com quem é homenageado (`mensagem-neta`: avô e neta na oficina; `mensagem-filho`: pai e filho no macarrão), o bilhete escrito à mão (Caveat), assinado só com o papel ("sua neta", "seu filho"), e um QR pequeno com "ouça a mensagem".
- Faixa larga (21:9; 4:5 no celular) com a família recebendo o livro: foto `surpresa-ceia` e, por cima, o loop mudo `video/surpresa.mp4` (3,9 s, só a cena da mesa). Legenda pequena: "Imagem ilustrativa." Com movimento reduzido ou sem JS, fica a foto.

## 7. Perguntas que abrem histórias (#perguntas)
- Campo floresta com textura de tecido; textos em polen.
- H2: "As perguntas certas abrem histórias." · Subtítulo: "Use as nossas, adapte ou escreva as suas." Os dois à esquerda (6/12).
- À direita, uma conversa de WhatsApp (Ecoa Memórias ↔ quem conta, no celular de quem conta): a cada dia útil ("Segunda", "Terça"…), a Ecoa manda uma das oito perguntas e quem conta responde em áudio.
- A conversa anda sozinha: quando a seção entra na tela, as mensagens chegam uma a uma ("digitando…" no cabeçalho), o histórico sobe e ela para no oitavo dia. Passar o mouse pausa.
- Sem JS e com movimento reduzido: os três primeiros dias, parados. As oito perguntas ficam numa lista só para leitor de tela; o chat é ilustração.
- Sem foto nesta seção.

## 8. Valor e interesse (#interesse)
- Duas colunas no desktop: o colofão à esquerda, o formulário à direita.
- H2: "Edição de Natal 2026"

À esquerda, o **colofão** (folha papel, recortada como as outras peças, sem linhas e sem caixa colorida), enxuto:
- "12x de R$ 33,08" no tamanho display (parcela de `PRECO_LIVRO` / `PARCELAS_MAX`); abaixo, "sem juros no cartão, ou R$ 397 no Pix. Frete à parte."
- Em tamanho pequeno: "Exemplares extras: R$ 149 cada"
- Em destaque, a escassez (dita só aqui): "Só 10 vagas nesta edição. Inscrições até 7 de novembro."
- A garantia, no fim da folha: "Se a primeira história não emocionar a família, devolvemos 100%."

À direita, o formulário:
- Título: "Quero este livro"
- Campos:
  - "Seu nome"
  - "Seu WhatsApp" (máscara brasileira)
  - Honeypot invisível contra spam.
- Botão: "Quero este livro"
- Microcopy: "Nada é cobrado agora. Logo em seguida, falamos com você pelo WhatsApp para tirar dúvidas e garantir a sua vaga."
- Sucesso: o formulário é substituído por "Recebemos. Em breve falamos com você pelo WhatsApp." e um link secundário "Prefere falar agora? Abrir WhatsApp" (wa.me com a mensagem pré-preenchida abaixo).
- Mensagem wa.me: "Olá! Tenho interesse no livro da Ecoa Memórias. Meu nome é [nome]."

## 9. Perguntas frequentes
- H2: "Perguntas frequentes"
- Lista simples, duas colunas no desktop: a pergunta é um botão com uma seta pequena; a aberta sobe um degrau de tom (papel). Uma aberta por vez; a primeira aberta ao carregar. Sem linhas, sem cores de capa. (A coluna "Aba" abaixo é só a chave interna.)

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
- Abaixo, as 5 capas como lombadas, em pé numa estante, com o título na lombada (nunca nome de pessoa).
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
- Todos os botões de interesse com `data-cta` único (hero, hero-whatsapp, formulario, rodape-whatsapp, fecho).
- Evento `lead_enviado` no sucesso do formulário, com a propriedade `status` (`gravado` ou `fallback`).
