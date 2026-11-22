# Ecoa Memórias — especificação da landing

Fonte de verdade de conteúdo e estrutura. Regras de design e de copy no CLAUDE.md; a ideia e o mapa seção → peça do livro em `docs/direcao.md`. Textos entre aspas são copy final. Itens marcados **[aprovar]** são copy nova, que precisa do OK do fundador antes do lançamento.

## A sensação
Uma caixa de lembranças guardada com cuidado. Uma editora pequena e séria fazendo algo precioso à mão. Confiança, calma, valor.

O visitante sai com três certezas:
1. É simples para quem conta: só áudio, no WhatsApp.
2. É leve para quem presenteia: a Ecoa cuida das perguntas, dos lembretes e da edição.
3. O resultado é um objeto bonito, que a família inteira vai guardar.

**Teste dos 5 segundos (celular, primeira tela):** é um livro de capa dura com a voz de quem conta; tudo acontece pelo WhatsApp; começa na ceia de Natal; a primeira página é por nossa conta; o botão está à vista. (O preço fica no colofão desde 3/11.)

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

- H1 (22/11, aprovado): "O livro do seu pai, na voz dele." Quebra depois da vírgula (2 linhas em 390 e 1440). A pessoa e o pronome trocam juntos: do seu pai / dele, da sua mãe / dela, do seu avô / dele, da sua avó / dela, do seu tio / dele, da sua tia / dela (a cada 2,2 s, duas voltas, para em "do seu pai"; as opções ficam empilhadas na mesma célula, então nada reflui; leitor de tela ouve a lista inteira; sem JS fica "do seu pai, na voz dele."; com movimento reduzido, só o esmaecer). Antes: "As histórias da sua família num livro, com fotos e a voz de quem viveu."
- Frase de apoio (24/11, aprovado): "Quem conta só responde por áudio no WhatsApp, sem instalar nada. As histórias, as fotos e a voz viram um livro de capa dura." (A troca da pessoa fica no título.)
- Botão (24/11): "Quero começar" (`CTA_TEXTO`) → wa.me em nova aba com "Oi! Vi o site da Ecoa e quero começar o livro."
- Fatos (24/11), numa linha só em tamanho pequeno abaixo do botão (no celular, um por linha, sem o ponto): "Começa na ceia de Natal · A primeira página é por nossa conta". Sem prazo de inscrição. O preço fica só no colofão (seção 8).
- Visual: LiveCover grande, entreaberta, com o áudio de WhatsApp encostado. Fundo polen liso, com o grão de papel. Sem gradiente.

> **Enxugamento de 24/11 (aprovado):** saíram a seção 2b "O valor" (o título foi para a seção 5) e a seção 3 "O que você recebe" (a capa anotada repetia o hero e as seções 5 e 6; a ficha do livro foi para o colofão). Ordem atual: hero → 2c origem → 4 como funciona → 5 a voz → 6 surpresa → 7 perguntas → 8 colofão → 9 FAQ → 10 fecho. No celular, de 13,2 para 10 telas; o preço aparece na 6ª.

## 2c. Os livros dos avós (#origem) (22/11, aprovado; fundo papel desde 24/11)
Prova de origem: não é depoimento de cliente (ainda não há), é por que a Ecoa existe, com fotos reais. Sem mencionar quem fez os livros: o ponto é que poucas famílias chegam a ter o seu.
- Fundo polen. Composição espelhada em relação à 2b: fotos à esquerda (6/12), título e texto à direita (5/12). No celular, as fotos vêm logo depois do título.
- H2: "Os livros dos meus avós."
- Destaque: "Tenho os dois em casa e já li cada um, inteiro, duas vezes."
- Corpo:
  - "Na maioria das famílias, esse livro nunca sai. Não por falta de história: falta quem pergunte, quem grave e quem passe a conversa para o papel. E as histórias vão ficando para depois."
  - "Criei a Ecoa para que muito mais famílias tenham o seu. Quem conta só precisa falar."
- Assinatura: "*Guilherme Eller*, neto da Nelma e do Jair" (`ASSINATURA_FUNDADOR`).
- Fotos reais, 3:4, `.photo`, lado a lado, a segunda 64px mais baixa: "O livro do meu avô Jair." (`livro-avo-jair`, o livro na mão) e "O livro da minha avó Nelma." (`livro-avo-nelma`, a capa). Sem o arquivo, o quadro some.
- Única exceção à regra "fotos não recebem nomes": estas não são ilustrativas.

## 4. Como funciona (#como-funciona) (refeita em 24/11; página dupla em 24/11)
- H2: "Começa na ceia de Natal."
- A barra de 6px com três marcas, cada uma em cima do seu passo (desktop): "Na ceia", "26 de dezembro", "O livro".
- Três passos em `<ol>`. No desktop, 3 + 6 + 3 colunas: o do meio é mais largo para a página dupla ser legível. No celular, lista vertical; a capa do terceiro passo some.

| Título | Texto | Visual |
|---|---|---|
| "Na ceia, grave um caso." | "Peça para quem conta lembrar uma história e grave no celular. Se precisar, mandamos três perguntas para puxar a conversa. Depois, mande o áudio no nosso WhatsApp." | WhatsAppChat: "24 de dezembro", áudio de 4:07 e "gravei o vô contando como conheceu a vó" |
| "No dia 26, vira a primeira página." | "O áudio volta editado por uma pessoa: a história inteira, com foto e o QR code que toca a voz. Chega em PDF no seu WhatsApp, por nossa conta." | `PaginaSolta`, duas folhas A5: à esquerda a foto `antiga-casamento`; à direita "I", o QR "ouça a voz", "Como conheci a sua avó", "1961" e três parágrafos (o baile em Divinópolis, os pés pisados, os sábados até o casamento). No celular, uma folha só com a foto dentro. |
| "Gostou? O livro continua." | "Vocês têm até um ano para contar mais histórias, no ritmo de quem conta. Cada uma chega a um grupo só da família, e vocês decidem quando fechar o livro." | BookCover vinho "Caminhos que percorri" (só do tablet para cima) |

## 5. A voz em cada página (#livro, alvo do link "O livro" do cabeçalho)
- Fundo papel (um degrau mais claro que o polen).
- Layout: título e texto juntos à esquerda (5/12); composição à direita (7/12), começando na altura do título e limitada pela altura da tela, para o livro aberto aparecer inteiro junto com o título.
- H2 (24/11): "Seus filhos vão ouvir o avô contar." (veio da antiga seção 2b; antes: "As histórias no papel. A voz, a um toque.")
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
- Texto: "Duas partes fazem o livro. Uma delas, quem conta só conhece quando o livro chega: cada mensagem da família ganha uma página, com QR code para ouvir."
- Layout espelhado em relação à seção 5 (vizinhas não repetem composição): o livro aberto à esquerda (7/12), título e texto à direita (5/12).
- O livro aberto mostra as páginas "Mensagens da família". Em cada página: a foto de quem escreveu com quem é homenageado (`mensagem-neta`: avô e neta na oficina; `mensagem-filho`: pai e filho no macarrão), o bilhete escrito à mão (Caveat), assinado só com o papel ("sua neta", "seu filho"), e um QR pequeno com "ouça a mensagem".
- (24/11) A faixa larga com a foto `surpresa-ceia` e o vídeo saiu: era ilustrativa ("Imagem ilustrativa." no momento mais emocional) e era o arquivo mais pesado da página. Volta quando houver foto real de uma família com o livro. A foto e o vídeo continuam em uso em /residenciais.

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
- "12x de R$ 38,92" no tamanho display (parcela de `PRECO_LIVRO` / `PARCELAS_MAX`); abaixo, "sem juros no cartão, ou R$ 467 no Pix. Frete à parte."
- Logo abaixo, em tamanho pequeno (22/11): "Entre três irmãos, fica em cerca de R$ 156 para cada um." (`PRECO_LIVRO` / 3, arredondado)
- (2/11) Sem linha de exemplares extras: quem pedir recebe o contato da gráfica e encomenda direto, sem cobrança da Ecoa.
- (24/11) Sem escassez e sem prazo: "Só 10 vagas nesta edição…" e "São poucas porque…" saíram a pedido do fundador.
- A garantia, no fim da folha (3/11): "O começo é por nossa conta. Você só paga se gostar da primeira página. Se não gostar, ela fica com vocês."


**Colofão (24/11, versão atual).** No desktop, a folha ocupa 8 colunas e o formulário 4, sem sticky: tudo cabe numa tela de 1440×900. Na folha, o preço em cima ("12x de R$ 38,92" e "sem juros no cartão, ou R$ 467 no Pix. Frete à parte."); embaixo, duas colunas:
- Esquerda: "Este é o preço da primeira edição. A partir de janeiro, o livro passa a custar R$ 697." · "Entre três irmãos, fica em cerca de R$ 156 para cada um." (pequeno) · a garantia "O começo é por nossa conta…".
- Direita, em tamanho pequeno: "Neste valor, vocês recebem:"
  - "O cartão para entregar na ceia e a primeira página no dia 26, em PDF."
  - "Até um ano para contar as histórias, no ritmo de quem conta."
  - "Cada história editada por uma pessoa, sem perder o jeito de falar."
  - "Um grupo só da família, onde cada história chega no mesmo dia."
  - "As mensagens secretas da família, cada uma numa página, com QR code."
  - "O livro de capa dura A5 vertical, com 80 páginas coloridas em papel couché fosco: de 10 a 20 histórias, com fotos e um QR code que toca a voz."
  - "Os áudios originais, para a família guardar."

À direita, o formulário:
- Título (2/11): "Vamos conversar"
- Campos:
  - "Seu nome"
  - "Seu WhatsApp" (máscara brasileira)
  - Caixa de aceite obrigatória (2/11): "Li e aceito os Termos de Uso e a Política de Privacidade." (links para /termos e /privacidade em nova aba). Erro: "Para continuar, aceite os Termos e a Política de Privacidade." O lead grava a versão dos Termos (`TERMOS_VERSAO`) e a hora do aceite.
  - Honeypot invisível contra spam.
- Botão (24/11): "Quero começar" (`CTA_TEXTO`)
- Microcopy (2/11): "Nada é cobrado agora. Falamos com você só pelo WhatsApp, e você só paga se gostar da primeira página."
- Sucesso: o formulário é substituído por "Recebemos. Em breve falamos com você pelo WhatsApp." e um link secundário "Prefere falar agora? Abrir WhatsApp" (wa.me com a mensagem pré-preenchida abaixo).
- Mensagem wa.me: "Olá! Quero começar o livro da Ecoa Memórias. Meu nome é [nome]."

## 9. Perguntas frequentes (9 desde 24/11: saíram tamanho, grupo, prazo e novo volume, que já estão em outras seções; mensagens foi para "trabalho", e áudios e QR viraram uma)
- H2: "Perguntas frequentes"
- Lista simples, duas colunas no desktop: a pergunta é um botão com uma seta pequena; a aberta sobe um degrau de tom (papel). Uma aberta por vez; a primeira aberta ao carregar. Sem linhas, sem cores de capa. (A coluna "Aba" abaixo é só a chave interna.)

Ordem: as objeções mais fortes primeiro (pagamento, desistência, tempo).

| Aba | Pergunta | Resposta |
|---|---|---|
| Pagamento | Quando e como eu pago? | O começo é por nossa conta. No dia 26 de dezembro, você recebe a primeira página do livro. Se gostar, paga de uma vez, no Pix ou no cartão em até 12x sem juros, e o livro continua. Se não gostar, não paga nada, e a página fica com vocês. Depois de pagar, ainda tem 7 dias para desistir, com devolução integral. |
| Desistência | E se a pessoa não quiser participar, ou parar no meio? | Se não quiser participar, você não paga nada. Se parar no meio, o livro sai com as histórias já gravadas. Se preferir não imprimir, você recebe o livro em PDF, com os áudios, e devolvemos R$ 149 (`DEVOLUCAO_SEM_IMPRESSAO`). |
| Tempo | Quanto tempo leva por dia? | Alguns minutos. Cada áudio costuma ter entre 2 e 5 minutos, e dá para responder quando quiser. |
| WhatsApp | Quem conta as histórias precisa saber mexer no celular? | Se manda áudio no WhatsApp, já sabe tudo o que precisa. Se preferir, também é possível gravar por uma ligação. |
| O presente | Como a pessoa fica sabendo do presente? | Quem dá a notícia é você, do seu jeito. Para a ceia, mandamos um cartão em PDF com o nome de quem vai contar, para você imprimir ou mostrar na mesa (`scripts/cartao-ceia.mjs`). Depois, enviamos uma mensagem de boas-vindas explicando como serão os próximos meses, e começamos quando a pessoa disser que topa. |
| Seu trabalho | Vai dar trabalho para mim? | Não. Você escolhe as perguntas (ou deixa com a gente) e envia algumas fotos. Do resto cuidamos nós, inclusive das mensagens da família: você nos passa os contatos, e os convites e os lembretes ficam com a gente. |
| Edição | Quem edita as histórias? Fica fiel ao que foi contado? | Uma pessoa ouve e edita cada história, sem perder o jeito de falar de quem conta. Nada é inventado: o livro só traz o que quem conta disse. A família lê tudo e pode pedir ajustes antes da impressão. |
| Frete | Entregam em todo o Brasil? O frete está incluso? | Entregamos em todo o Brasil. O frete é à parte e calculado para o seu CEP. |
| Os áudios | Com quem ficam os áudios? E os QR codes? | Os áudios originais são da família desde o primeiro dia. Usamos só para produzir o livro e guardamos enquanto a família quiser, para os QR codes continuarem tocando. |

## 10. Fecho
- Seção curta em floresta. O único momento centralizado da página.
- H2: "Algumas histórias só uma pessoa pode contar. Que elas continuem ecoando." (único uso do trocadilho)
  - Se passar de 2 linhas em 390px, reduzir a medida antes da fonte; se ainda assim quebrar, perguntar.
- Botão polen com texto floresta: "Quero começar" → wa.me em nova aba com "Oi! Quero começar o livro da Ecoa. Pode me contar mais?".
- Abaixo, as 5 capas como lombadas, em pé numa estante, com o título na lombada (nunca nome de pessoa).
- Legenda pequena abaixo da estante: "Cinco cores de capa. A próxima pode ser a da sua família."

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
- Todos os botões de interesse com `data-cta` único (hero, final, formulario, rodape-whatsapp).
- Os botões de interesse (`CTA_TEXTO`) que abrem o WhatsApp (`data-posicao`: hero | final) disparam `cta_interesse` com a propriedade `posicao`, no lugar de `cta_clicado`.
- Mensagens por posição e número: `MENSAGENS_INTERESSE` em `lib/leads.ts` e `WHATSAPP_NUMERO` em `lib/config.ts`.
- Evento `lead_enviado` no sucesso do formulário, com a propriedade `status` (`gravado` ou `fallback`).
