-- UP: tabela de interessados da landing.
-- Leitura e escrita só pelo servidor, com a service role (que ignora RLS).
-- Status e notas se atualizam à mão no Table Editor do Supabase.

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  whatsapp text not null,
  for_whom text not null,
  capa_nome text,
  capa_cor text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_hash text not null,
  status text not null default 'novo'
    check (status in ('novo', 'contatado', 'pago', 'perdido')),
  notes text
);

comment on column public.leads.whatsapp is 'Só dígitos, com DDD, sem o 55.';
comment on column public.leads.ip_hash is 'HMAC-SHA-256 do IP com segredo do servidor. O IP puro nunca é gravado.';

-- Limite de envios: conta por ip_hash na última hora.
create index leads_ip_hash_created_at_idx on public.leads (ip_hash, created_at desc);

-- RLS ligado e nenhuma policy: anon e authenticated não leem nem escrevem.
alter table public.leads enable row level security;
revoke all on table public.leads from anon, authenticated;

-- DOWN (rodar à mão no SQL Editor; o CLI do Supabase não executa down):
-- drop table if exists public.leads;
