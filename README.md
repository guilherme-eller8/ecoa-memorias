# Ecoa Memórias

Landing da Edição de Natal 2026: livros de memórias de capa dura feitos a partir de histórias contadas por áudio no WhatsApp. Nesta fase o site só capta interesse; o fechamento é manual, por WhatsApp e Pix.

Stack: Next.js 16, TypeScript, Tailwind 4, Supabase, Resend, Vercel.

## Rodar localmente
Precisa de Node 22 ou mais novo.

```bash
npm install
cp .env.example .env.local   # preencha o que tiver; sem nada, o formulário abre o WhatsApp
npm run dev                  # http://localhost:3000
```

Sem as variáveis do Supabase, o formulário não grava nada e cai no fallback: abre o WhatsApp com a mensagem pronta.

## Trocar preço, data, número de livros e contatos
Tudo fica em `lib/config.ts`. Nenhum componente tem esses valores escritos.

| O quê | Constante |
|---|---|
| Preço do livro | `PRECO_LIVRO` |
| Exemplar extra | `PRECO_EXEMPLAR_EXTRA` |
| Número de livros da edição | `LIVROS_NA_EDICAO` |
| Data limite (formato `AAAA-MM-DD`) | `DATA_LIMITE` |
| WhatsApp de fechamento (`55` + DDD + número, só dígitos) | `WHATSAPP_NUMERO` |
| E-mail, CNPJ, formato e páginas do livro | `EMAIL_CONTATO`, `CNPJ`, `FORMATO_LIVRO`, `PAGINAS_LIVRO` |

Pelo próprio GitHub: abra `lib/config.ts`, clique no lápis (Edit), troque o valor entre aspas e clique em "Commit changes". A Vercel publica sozinha em cerca de 1 minuto.

Enquanto `WHATSAPP_NUMERO` e `CNPJ` forem placeholders, eles não aparecem na página.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)
| Variável | Para quê | Obrigatória? |
|---|---|---|
| `SUPABASE_URL` | gravar os leads | sim, para gravar |
| `SUPABASE_SERVICE_ROLE_KEY` | gravar os leads (segredo; só no servidor) | sim, para gravar |
| `RESEND_API_KEY` | e-mail de aviso a cada lead | não; sem ela o lead é gravado, só não chega e-mail |
| `RESEND_FROM` | remetente, de um domínio verificado no Resend | junto com a anterior |
| `ADMIN_EMAIL` | quem recebe o aviso | junto com a anterior |
| `NEXT_PUBLIC_SITE_URL` | endereço público (preview no WhatsApp e QR codes) | não; sem ela usa o domínio de produção da Vercel |

Depois de mudar uma variável, faça um Redeploy: a página é gerada no build.

## Banco de dados
A tabela está em `supabase/migrations/`. Para criar: Supabase → SQL Editor → New query → cole o conteúdo do arquivo `.sql` → Run.

## Ver e atualizar os leads
Supabase → Table Editor → tabela `leads`. Cada lead chega com `status = novo`. Troque para `contatado`, `pago` ou `perdido` clicando na célula, e use `notes` para anotações.

## Gate de design
O projeto usa a skill `.claude/skills/design-taste-frontend` (taste-skill v2) para checar o visual.

```bash
npm run build && npm run start   # em outro terminal
npm run taste:lint
npm run taste:inspect            # screenshots em .taste-skill/inspect/
```

O passo a passo de cada tarefa está em `docs/prompts.md`; as regras, em `CLAUDE.md`.

## Documentos
- `CLAUDE.md`: regras do projeto
- `docs/landing-spec.md`: conteúdo e estrutura da página
- `docs/direcao.md`: direção de arte
- `docs/imagens.md`: as 9 imagens a gerar e salvar em `public/images`
