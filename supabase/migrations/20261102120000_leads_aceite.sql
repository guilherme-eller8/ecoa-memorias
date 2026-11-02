-- UP: registro do aceite dos Termos de Uso e da Política de Privacidade no formulário.
-- Colunas nulas: os leads anteriores não passaram pela caixa de aceite, e o código antigo
-- continua gravando durante o deploy.

alter table public.leads
  add column termos_versao text,
  add column aceite_em timestamptz;

comment on column public.leads.termos_versao is 'Versão dos Termos aceita (TERMOS_VERSAO em lib/config.ts).';
comment on column public.leads.aceite_em is 'Quando a caixa de aceite foi marcada e o formulário enviado.';

-- DOWN (rodar à mão no SQL Editor; o CLI do Supabase não executa down):
-- alter table public.leads drop column aceite_em, drop column termos_versao;
