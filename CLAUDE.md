# Ecoa Memórias — instruções do projeto

Leia este arquivo e `docs/landing-spec.md` inteiros antes de qualquer tarefa.

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
- next/font (Google): Newsreader, Source Serif 4, Inter, Caveat
- zod para validação
- Supabase (Postgres), acessado só no servidor com service role
- Resend para e-mail
- Vercel + Vercel Analytics
- Playwright (dev) para screenshots de revisão visual

## Estrutura
```
/app                 page.tsx, privacidade/, admin/leads/, opengraph-image.tsx, styleguide/ (só dev)
/components/ui       primitivos do design system
/components/landing  seções da landing
/lib                 config.ts, supabase.ts, leads.ts
/public/images       imagens geradas (ver docs/imagens.md)
/supabase/migrations
/docs                landing-spec.md, imagens.md
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
WHATSAPP_NUMERO = "55XXXXXXXXXXX"  // placeholder
EMAIL_CONTATO = "contato@ecoamemorias.com.br" // placeholder
IMAGES = { ... }                   // todos os caminhos de imagem
```
Preço, data, número de livros e contatos nunca aparecem hardcoded em componentes.

## Design system

### Cores (CSS variables)
| token | hex | uso |
|---|---|---|
| --creme | #F5EFE4 | fundo principal |
| --papel | #FFFDF8 | cartões, páginas |
| --tinta | #26211D | texto |
| --tinta-2 | #6E6259 | texto secundário |
| --floresta | #1F3D33 | seções escuras, botão principal |
| --vinho | #6E2A2A | destaque de palavra, capa |
| --rosa-antigo | #C9A49A | capa |
| --nevoa | #A9C3CF | capa |
| --petroleo | #3F7A8C | capa |
| --dourado | #B08D57 | filetes de 1px, ornamentos |

### Tipografia
- Títulos: Newsreader, pesos 400–500; itálico para nomes e palavras afetivas.
  - h1 `clamp(2.5rem, 5.5vw, 4.5rem)`, line-height 1.08
  - h2 `clamp(2rem, 4vw, 3.25rem)`, line-height 1.12
  - h3 1.5rem
- Corpo: Source Serif 4, 19px, line-height 1.65; máximo de 62ch por linha.
- Rótulos e UI: Inter 12–13px, caixa alta, letter-spacing 0.14em.
- Manuscrito: Caveat, só em bilhetes da família.

### Espaço e layout
- Seções com `py-24 md:py-36`; conteúdo com largura máxima de 1200px e gutter de 20px no mobile.
- Grid editorial assimétrico; texto majoritariamente alinhado à esquerda.

### Botões
- Principal: fundo floresta, texto creme, raio de 6px, sem sombra, altura ≥ 48px.
- Secundário: link sublinhado com offset de 4px.

### Fotos
- Toda foto recebe a classe `.photo`:
  - filtro unificado `saturate(.86) contrast(.96) sepia(.06)`
  - overlay de grão (SVG noise, opacidade de 6%)
  - raio de 4px
- Isso uniformiza as imagens geradas e esconde artefatos.

### Texturas
- Grão de papel em SVG no fundo creme (opacidade de 3–4%).
- Textura de tecido sutil nas seções floresta.

### Movimento
- Apenas fade/translate de 400–600ms ao entrar na viewport.
- Respeitar `prefers-reduced-motion`.

## Regras anti-"AI slop" (duras)

PROIBIDO:
- Emojis em títulos, botões e textos do site. Só são permitidos dentro das simulações de WhatsApp, com moderação.
- Gradientes coloridos, blobs, glassmorphism, brilhos, roxo, ilustrações 3D, ícones genéricos enfileirados em grade.
- Contador regressivo, barra de urgência, "ÚLTIMAS VAGAS", pop-up, barra fixa de CTA no mobile, preço riscado, selos de "100% seguro", setas apontando para botões.
- Cards idênticos com sombra em toda seção; tudo centralizado.
- Palavras: "transforme", "eternize", "inesquecível", "momentos únicos", "descubra", "revolucione", "incrível", "mágico", "jornada".
- Trios rítmicos em todo parágrafo; excesso de travessões.
- Depoimentos, números de clientes, avaliações, selos ou logos de imprensa inventados.
- Qualquer menção a IA, transcrição automática ou tecnologia.

OBRIGATÓRIO:
- Tipografia como protagonista; contraste de escala; muito respiro.
- Escassez dita uma única vez, com serenidade: "Edição de Natal: 10 livros. Inscrições até 7 de novembro."
- Detalhes finos: filete dourado de 1px, numerais romanos, versaletes.
- Parecer o site de uma pequena editora cuidadosa, não uma página de vendas.

## Copy
- Português brasileiro, caloroso, frases curtas.
- Para se referir de forma genérica a quem conta as histórias, use "quem conta".
- O trocadilho com "ecoar" aparece no máximo uma vez na página.
- Fotos são ilustrativas: nunca recebem nomes nem citações atribuídas.

## Como trabalhar
1. Planeje antes de codar e mantenha o escopo estrito ao pedido. Não altere seções fora do escopo.
2. Em toda tarefa de UI:
   - Suba o servidor e tire screenshots com Playwright em 390px e 1440px (salvar em `.screenshots/`, que fica no .gitignore).
   - Compare com a spec e com as regras anti-slop.
   - Corrija e só depois conclua.
   - No final, liste o que foi ajustado.
3. `npm run build` e `npm run lint` sem erros antes de concluir.
4. Um commit por tarefa (Conventional Commits, mensagem em português).
5. Segredos só em `.env.local` e nas variáveis da Vercel. Nunca commitar.
6. Se a spec não cobrir algo de conteúdo, pergunte em vez de inventar.

## Rotas
- `/`: landing
- `/privacidade`: política de privacidade (LGPD)
- `/admin/leads`: lista de leads, protegida por Basic Auth
- `/styleguide`: vitrine de componentes (só em dev; `notFound()` em produção)

## Variáveis de ambiente
- NEXT_PUBLIC_SITE_URL
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- RESEND_FROM
- ADMIN_EMAIL
- ADMIN_USER
- ADMIN_PASSWORD
