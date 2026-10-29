# Sequência de prompts — landing Ecoa Memórias

Cole um prompt por sessão do Claude Code, na ordem. O CLAUDE.md carrega sozinho; cada prompt só aponta as seções da spec que importam, para não encher o contexto. O "Gate de UI" está definido uma vez no CLAUDE.md e os prompts só o chamam.

**Prazo:** inscrições até 7/11. O alvo é ter a página no ar até 1/11, com seis dias de venda. Os prompts 1 a 5 entregam uma página que vende, com o fallback wa.me. O prompt 6 (backend) é o primeiro a cortar se atrasar.

---

## Prompt 0 — tarefas do fundador (hoje, em paralelo; sem Claude Code)
1. Gerar as 9 imagens de `docs/imagens.md` e salvar em `/public/images`. Elas precisam existir **antes** do Prompt 3, para o loop de screenshots julgar a página real e não placeholders.
2. Aprovar ou trocar as copies marcadas **[aprovar]** em `docs/landing-spec.md` (H1, frase do hero, colofão).
3. Confirmar o formato e o número de páginas do livro (hoje são placeholders: 21 × 21 cm, 60 páginas).
4. Se der: gravar um áudio real de 20–40s, com autorização de quem gravou, e salvar em `/public/audio/amostra.mp3`.
5. Escrever o nome dos 10 primeiros compradores prováveis. Se a lista tiver menos de 20 nomes, o gargalo é a distribuição, não a página.

---

## Prompt 1 — base do projeto
```
Leia docs/landing-spec.md (só "A sensação") e docs/imagens.md (só o mapa IMAGES).

Monte a base conforme "Stack", "Estrutura" e "Design system" do CLAUDE.md.

Atenção ao scaffold: o create-next-app recusa esta pasta porque ela já tem CLAUDE.md e .claude/. Gere o projeto numa pasta temporária fora do repositório e copie para cá só os arquivos do Next. Não apague, mova nem reescreva CLAUDE.md, docs/ e .claude/. Junte o .gitignore gerado ao que já existe, mantendo a linha .taste-skill/.

Inclua:
- Next.js + TypeScript strict + Tailwind + ESLint/Prettier
- next/font com Newsreader (eixo opsz) e Caveat
- tokens de cor como CSS variables, com os nomes da tabela do CLAUDE.md
- a escala de 5 tamanhos e o raio único de 2px como tokens
- grão de papel no body
- lib/config.ts completo, com o mapa IMAGES
- .env.example com as variáveis do CLAUDE.md
- scripts no package.json:
  "taste:lint": "node .claude/skills/design-taste-frontend/scripts/lint.mjs app components"
  "taste:inspect": "node .claude/skills/design-taste-frontend/scripts/inspect.mjs --allow palette-cream http://localhost:3000"

Página inicial: só um placeholder com h1, as duas fontes, os tamanhos e as cores. Nenhuma seção.

Neste prompt o gate serve só para provar que as ferramentas rodam. Num placeholder, o inspetor vai reprovar por falta de fotos, de movimento e de conteúdo (few-pictures, no-real-pictures, still-page, empty-screens e afins). NÃO corrija esses itens e não acrescente nada à página por causa deles. Corrija apenas o que for da base: fontes que não carregam, tokens, contraste, rolagem horizontal.

Critério de aceite:
- npm run build e npm run lint limpos
- npm run taste:lint e npm run taste:inspect rodam até o fim sobre o build de produção (npm run start); liste os FAILs e WARNs que apareceram, separando os esperados no placeholder dos que são problema real
- as duas fontes aparecem como carregadas no relatório do inspetor
- commit "chore: base do projeto"
```

## Prompt 2 — identidade e a capa
```
Leia docs/direcao.md e, em docs/landing-spec.md, "Componentes visuais" (BookCover, LiveCover e Primitivos).

1. Logo da Ecoa em SVG (componente React + arquivo em /public), com o texto convertido em path:
   - "Ecoa" em Newsreader; "Memórias" menor embaixo, na mesma família.
   - Três arcos concêntricos em dourado, sugerindo eco de voz. Traço de 2px ou mais.
   - Versões para fundo polen e para fundo floresta.
   - Monograma só com o símbolo, para favicon e pé da capa.
2. Favicon e ícones a partir do monograma.
3. Implemente BookCover, LiveCover e os primitivos Button, Section, Container. Os outros componentes nascem junto com as seções que os usam.
4. Crie /styleguide (notFound em produção) com as 5 capas de exemplo, a LiveCover e os primitivos.

A BookCover é o componente mais importante do site. Ela tem que parecer objeto, não cartão: espessura de lombada, borda de páginas, tecido, hot stamping, sombra de contato desenhada no próprio objeto.

Gate de UI do CLAUDE.md, rodando o inspetor em npm run dev contra http://localhost:3000/styleguide:
node .claude/skills/design-taste-frontend/scripts/inspect.mjs --allow palette-cream http://localhost:3000/styleguide
(o aviso de dev server é esperado aqui). Na crítica, a pergunta é uma só: em 390px, as capas parecem livros sobre uma mesa?

Commit "feat: identidade e capa".
```

## Prompt 3 — seções 1 a 4
```
Leia docs/direcao.md e, em docs/landing-spec.md, as seções 1 a 4 e os componentes QuestionCard e WhatsAppChat.

1. Confira se as imagens do mapa IMAGES existem em /public/images. Liste as que faltam e use um placeholder sépia só para elas.
2. Implemente QuestionCard e WhatsAppChat (raiz com data-ui).
3. Implemente em app/page.tsx, com componentes em /components/landing, APENAS: Cabeçalho, Hero (com a LiveCover), O que você recebe, Como funciona.
   - Copy exata da spec. Preço, data e quantidades vêm de lib/config.ts.
   - Fotos com next/image, sizes corretos, priority só no hero, .photo nas cenas e .photo-antiga nas antigas, alt descritivo em português, object-position conferido em 390 e 1440.
   - LiveCover funcionando no teclado e no polegar, com o fallback estático sem JS.

Gate de UI do CLAUDE.md. Além da crítica, responda: no celular, em 5 segundos, a primeira tela diz livro de capa dura, WhatsApp, R$ 397, 10 livros até 7/11 e onde clicar?

Commit "feat: landing secoes 1-4".
```

## Prompt 4 — seções 5 a 8
```
Leia docs/direcao.md e, em docs/landing-spec.md, as seções 5 a 8 e os componentes OpenBookSpread, PhoneAudioPlayer e NoteCard.

Implemente os três componentes e APENAS as seções 5 a 8.

No formulário da seção 8:
- só a UI e a validação com zod no cliente
- os campos ocultos capa_nome e capa_cor vindos da LiveCover
- o fallback que abre o wa.me com a mensagem pré-preenchida
- a chamada isolada em uma função submitLead() que hoje só usa o fallback; o backend vem no Prompt 6

Gate de UI do CLAUDE.md.

Commit "feat: landing secoes 5-8".
```

## Prompt 5 — fecho, página inteira e movimento
```
Leia, em docs/landing-spec.md, as seções 9 a 11, /privacidade, "SEO e preview" e "Analytics". Releia "Movimento" no CLAUDE.md e .claude/skills/design-taste-frontend/references/motion.md.

1. Implemente as seções 9 (fichas de arquivo), 10 e 11, a página /privacidade, a metadata, o opengraph-image.tsx e o analytics (Vercel Analytics, data-cta, capa_personalizada e lead_enviado).
2. A camada de movimento da página inteira: a assinatura (a capa se abre), a entrada por seção, o feedback nos controles, um elemento em movimento contínuo. Fallback em reduced-motion. O inspetor reprova abaixo de 8 elementos em movimento.
3. Revise a página de ponta a ponta: ritmo entre seções, margens iguais, âncoras com offset do cabeçalho fixo, foco visível, nenhuma rolagem horizontal em 360px.

Gate de UI do CLAUDE.md, também com reduced-motion ligado.

Commit "feat: landing completa".
```

## Prompt 6 — captação de leads (enxuto)
```
Leia, no CLAUDE.md, "Fase atual", "Stack" e "Variáveis de ambiente".

1. Migration no Supabase para a tabela leads:
   id uuid pk, created_at, name, whatsapp, for_whom, capa_nome, capa_cor,
   utm_source, utm_medium, utm_campaign (capturados da URL),
   ip_hash (sha-256 do IP com salt; nunca o IP puro),
   status text default 'novo' check in ('novo','contatado','pago','perdido'), notes.
   RLS ligado, sem policies públicas. Mostre o SQL UP/DOWN e espere meu OK antes de aplicar.
2. Troque o miolo de submitLead() por uma Server Action que:
   - valida com zod e descarta em silêncio se o honeypot vier preenchido
   - limita a 5 envios por ip_hash na última hora, contando na própria tabela (não use memória: na Vercel cada requisição pode cair em uma instância diferente)
   - grava o lead
   - envia e-mail via Resend para ADMIN_EMAIL com o assunto "Novo interesse: {nome} · {para quem}" e um link wa.me para o lead, com a mensagem de primeiro contato pré-preenchida
   - se as variáveis de ambiente faltarem ou qualquer passo falhar, cai no fallback wa.me existente, e o visitante nunca vê erro técnico
3. Os leads são vistos e atualizados (status, notas) direto no Table Editor do Supabase. Não crie /admin.

Critério de aceite: um lead de teste aparece no Supabase e chega por e-mail; com as variáveis removidas, o fallback abre o wa.me.

Commit "feat: captacao de leads".
```

## Prompt 7 — revisão independente
```
Use um subagente que não participou da construção. Entregue a ele só a URL local do build de produção, o CLAUDE.md, docs/direcao.md e .claude/skills/design-taste-frontend/references/critique.md.

Ele atua como diretor de arte de uma editora premium e:
1. roda npm run taste:lint e npm run taste:inspect, e abre todas as screenshots
2. faz a crítica completa no formato de critique.md §4, com a nota
3. aplica o teste dos 5 segundos da spec, em 390px
4. procura copy que soa como marketing ou se repete
5. confere acessibilidade: contraste, foco, alvos ≥ 48px, LiveCover, fichário e fichas de arquivo no leitor de tela
6. roda o Lighthouse mobile (meta: ≥ 90 em performance e acessibilidade)

Com o relatório dele, liste os 10 problemas em ordem de impacto, corrija todos, rode o gate e o Lighthouse de novo e mostre antes e depois (nota da crítica, FAILs, Lighthouse).

Commit "refactor: revisao pre-lancamento".
```

## Prompt 8 — produção
```
Leia o CLAUDE.md.

1. Liste as variáveis de ambiente a cadastrar na Vercel.
2. Passo a passo, para eu executar, de: conectar o domínio; verificar o domínio no Resend (SPF/DKIM); aplicar a migration no Supabase de produção.
3. Garanta e teste que /styleguide retorna 404 em produção.
4. README com: como rodar localmente; como trocar preço, data e número de livros em lib/config.ts; como ver e atualizar os leads no Supabase; como rodar o gate de design.
5. Roteiro de teste ponta a ponta em produção, dividido em "você roda" e "eu rodo": envio de lead, e-mail recebido, lead no Supabase, fallback wa.me, preview do link no WhatsApp (og:image).

Commit "chore: deploy".
```
