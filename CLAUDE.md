# Ecoa Memórias — instruções do projeto

Este arquivo carrega sozinho. Antes de qualquer tarefa de UI, leia também `docs/landing-spec.md` (as seções da tarefa) e `docs/direcao.md` (a direção de arte).

## O que é
A Ecoa Memórias produz livros de memórias de capa dura a partir de histórias contadas por áudio no WhatsApp.

1. A família escolhe as perguntas (ou usa as nossas).
2. A Ecoa envia uma pergunta por dia útil, pelo WhatsApp, a quem vai contar as histórias (pai, mãe, avô, avó, tio, tia, um amigo).
3. Quem conta responde por áudio, no próprio ritmo.
4. Cada história gravada chega no mesmo dia a um grupo de WhatsApp só da família. Quem conta NÃO está nesse grupo.
5. Em segredo, filhos, netos e amigos enviam mensagens em áudio ou texto.
6. Tudo vira um livro com as histórias, fotos, as mensagens da família e QR codes que tocam as vozes.

Edição de Natal 2026:
- 10 livros.
- Inscrições até 07/11/2026.
- 4 semanas de perguntas.
- Entrega antes do Natal.
- R$ 397 por livro; exemplares extras a R$ 149.

## Fase atual: captação de interesse
- NÃO existe checkout.
- O CTA "Tenho interesse" grava um lead; o fechamento é manual, por WhatsApp e Pix.
- Não construa pagamento, cadastro pós-compra, login de cliente nem área do cliente sem pedido explícito.

## Stack
- Next.js (App Router, versão estável atual) + TypeScript strict
- Tailwind CSS (versão estável atual), com tokens em CSS variables
- next/font (Google): **Newsreader** (títulos e texto, eixo óptico `opsz`) e **Caveat** (só nos bilhetes da família). Duas famílias, não mais.
- zod para validação
- Supabase (Postgres), acessado só no servidor com service role
- Resend para e-mail
- Vercel + Vercel Analytics
- Skill de design: `.claude/skills/design-taste-frontend` (taste-skill v2). Ela traz o lint e o inspetor que substituem o script de screenshots. Precisa de Node 22+ e de Chrome/Chromium instalado.

## Estrutura
```
/app                 page.tsx, privacidade/, opengraph-image.tsx, styleguide/ (só dev)
/components/ui       primitivos do design system
/components/landing  seções da landing
/lib                 config.ts, supabase.ts, leads.ts
/public/images       imagens geradas (ver docs/imagens.md)
/supabase/migrations
/docs                landing-spec.md, imagens.md, direcao.md, prompts.md
/.claude/skills      design-taste-frontend (não editar; atualizar pelo upstream)
```

## Fonte única de configuração: `lib/config.ts`
```ts
MARCA = "Ecoa Memórias"
EDICAO = "natal-2026"
LIVROS_NA_EDICAO = 10
DATA_LIMITE = "2026-11-07"         // exibir como "7 de novembro"
PRECO_LIVRO = 397                  // exibir como "R$ 397"
PRECO_EXEMPLAR_EXTRA = 149
PARCELAS_MAX = 12
FORMATO_LIVRO = "21 × 21 cm"       // placeholder
PAGINAS_LIVRO = 60                 // placeholder
WHATSAPP_NUMERO = "55XXXXXXXXXXX"  // placeholder
EMAIL_CONTATO = "contato@ecoamemorias.com.br" // placeholder
IMAGES = { ... }                   // todos os caminhos de imagem
```
Preço, data, número de livros e contatos nunca aparecem hardcoded em componentes.

## Design system

A ideia da página está em `docs/direcao.md`: **a página é o próprio livro**. Toda decisão visual abaixo serve a isso.

### Cores (CSS variables)
| token | hex | uso |
|---|---|---|
| --polen | #F5EFE4 | fundo principal (é o papel pólen do miolo do livro) |
| --papel | #FFFDF8 | superfícies um tom acima do fundo: páginas, cartões, cabeçalho rolado |
| --tinta | #26211D | todo texto corrido |
| --tinta-2 | #6E6259 | só notas secundárias (nunca texto corrido) |
| --floresta | #1F3D33 | **o acento**: botão principal e os campos escuros (seções 7 e 10) |
| --vinho, --rosa-antigo, --nevoa, --petroleo | #6E2A2A, #C9A49A, #A9C3CF, #3F7A8C | **só nas capas** (são os tecidos do livro) |
| --dourado | #B08D57 | **só no hot stamping das capas e no logo** |

Um fundo, uma tinta, um acento. As cores de capa existem dentro do objeto, não na interface.

### Tipografia
- Uma família faz o trabalho: Newsreader (400–500). Itálico só para nomes de pessoas na capa e na assinatura das histórias.
- Cinco tamanhos no máximo, bem afastados:
  - display (h1) `clamp(2.4rem, 7vw, 6rem)`, line-height 1.0, tracking -0.02em
  - h2 `clamp(2rem, 4.2vw, 3.5rem)`, line-height 1.05
  - fatos e destaques `clamp(1.5rem, 2.4vw, 2rem)`
  - corpo 19px, line-height 1.6, máximo 62ch
  - pequeno 15px (nunca abaixo de 13px)
- Todo título com no máximo **2 linhas em 390px e em 1440px**. Se quebrar em 3, corte palavras antes de reduzir a fonte.
- Caveat só dentro de NoteCard e na anotação "aponte e ouça".
- Dentro das simulações de WhatsApp e do player (`data-ui`), use a pilha `system-ui`: são interfaces de outro app, não a voz da Ecoa.

### Espaço e layout
- Um grid de 12 colunas, margens externas iguais (20px no mobile, 32px no desktop), largura máxima de 1280px.
- Seções separadas por 120–200px no desktop; nenhum trecho vazio maior que meia tela.
- Toda seção abre com um título que diz o que ela é.
- Vizinhas nunca repetem composição. Texto à esquerda por padrão; centralizar no máximo um momento (o fecho).

### Forma
- Um raio só na página inteira: **2px** (o canto da capa dura). Botões, fotos, cartões, campos.
- Botão principal: fundo floresta, texto polen, altura ≥ 48px, sem sombra. Secundário: link sublinhado com offset de 4px.
- Superfícies se separam por um degrau de tom (polen → papel → floresta), nunca por linha ou sombra.

### Fotos
- Toda foto de cena recebe `.photo`: filtro `saturate(.86) contrast(.96) sepia(.06)` + grão SVG a 6% + raio 2px.
- Fotos antigas recebem `.photo-antiga`: margem de papel branco, leve vinheta interna, como cópia impressa colada na página.
- Mesma proporção dentro de cada seção. Nada sobreposto a um título.

### Texturas
- Grão de papel em SVG no fundo polen (3–4%). Textura de tecido sutil nos campos floresta.

### Movimento
- Assinatura: **a capa se abre**. No hero, a capa ao vivo entreabre ao passar o mouse/ao focar e mostra a borda das páginas; na rolagem até a seção 5, o livro aberto entra como se a página virasse.
- Entrada por seção: título, depois texto, depois imagem, 60–90ms de intervalo, subindo 16–24px com opacidade, uma vez.
- Feedback em todo controle (hover, foco, pressionado).
- Só transform e opacity. Todo movimento tem fallback em `prefers-reduced-motion` que mantém o conteúdo e tira o deslocamento. Nada fica escondido se o JS falhar.

## Regras anti-slop

### As da skill (o inspetor mede; valem sem exceção)
Leia a tabela "House rules" em `.claude/skills/design-taste-frontend/SKILL.md`. As que esta marca mais tenderia a violar:
- **Sem eyebrow**: nenhum rótulo pequeno acima de título ("O QUE VOCÊ RECEBE", "COMO FUNCIONA").
- **Sem versalete/caixa alta pequena espaçada** na interface.
- **Sem numeração de índice**: nada de "PASSO 1", 01/02/03. Ordem pela posição e pelas palavras; `<ol>` quando for lista.
- **Sem filetes**: nada de linha de 1px dourada entre itens, borda no cabeçalho, accordion com linhas. Use espaço e degrau de tom.
- **Sem gradiente**, inclusive o "radial muito suave" atrás do hero.
- **Sem sombra em coisa parada.** Exceção única e declarada: a sombra de contato da capa dura no chão, que faz parte do desenho do objeto.
- **Sem palavra estilizada no título** (itálico colorido, sublinhado).
- **Sem cards idênticos em fileira**, sem tudo centralizado, sem pílula de navegação com blur.

### As desta marca (texto; o lint não pega em português)
- Emojis só dentro das simulações de WhatsApp, com moderação.
- Contador regressivo, barra de urgência, "ÚLTIMAS VAGAS", pop-up, barra fixa de CTA no mobile, preço riscado, selos de "100% seguro", setas apontando para botões.
- Palavras: "transforme", "eternize", "inesquecível", "momentos únicos", "descubra", "revolucione", "incrível", "mágico", "jornada", "experiência".
- "Não é só X, é Y"; trios rítmicos em todo parágrafo; mais de 3 travessões na página.
- Depoimentos, números de clientes, avaliações, selos ou logos de imprensa inventados.
- Qualquer menção a IA, transcrição automática ou tecnologia.

### Obrigatório
- Tipografia grande como protagonista, conteúdo completo em cada seção.
- Escassez dita uma única vez, com serenidade, no colofão (seção 8): "Tiragem: 10 livros. Inscrições até 7 de novembro."
- Parecer o site de uma pequena editora cuidadosa, não uma página de vendas.

## Copy
- Português brasileiro, caloroso, frases curtas.
- Para se referir de forma genérica a quem conta as histórias, use "quem conta".
- O trocadilho com "ecoar" aparece no máximo uma vez na página.
- Fotos são ilustrativas: nunca recebem nomes nem citações atribuídas.
- Copy entre aspas na spec é final. Se quebrar a regra das 2 linhas, proponha o corte e pergunte; não reescreva sozinho.

## Como trabalhar
1. Planeje antes de codar e mantenha o escopo estrito ao pedido. Não altere seções fora do escopo.
2. **Gate de UI** (toda tarefa que mexe em tela). Rode sobre o build de produção, não sobre o dev server:
   ```
   npm run build && npm run start   # em outro terminal
   npm run taste:lint
   npm run taste:inspect            # 1440, 768 e 390; screenshots em .taste-skill/inspect/
   ```
   - Corrija todo `FAIL`. Cada `WARN` está errado até você defendê-lo em uma frase (o `palette-cream` já está defendido: é o papel pólen).
   - Abra **todas** as screenshots listadas e faça a crítica no formato de `.claude/skills/design-taste-frontend/references/critique.md` §4.
   - Corrija os 3 maiores problemas e rode de novo. **No máximo 3 rodadas.**
   - No relatório final: FAILs zerados, a nota da última crítica, o que ainda está aquém e a lista do que foi ajustado.
3. `npm run build` e `npm run lint` sem erros antes de concluir.
4. Um commit por tarefa (Conventional Commits, mensagem em português).
5. Segredos só em `.env.local` e nas variáveis da Vercel. Nunca commitar.
6. Se a spec não cobrir algo de conteúdo, pergunte em vez de inventar.

## Rotas
- `/`: landing
- `/privacidade`: política de privacidade (LGPD)
- `/styleguide`: vitrine de componentes (só em dev; `notFound()` em produção)

## Variáveis de ambiente
- NEXT_PUBLIC_SITE_URL
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- RESEND_FROM
- ADMIN_EMAIL
