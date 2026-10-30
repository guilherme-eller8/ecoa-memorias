-- UP: primeiro passo para tirar "para quem" do cadastro.
-- A coluna deixa de ser obrigatória: o código antigo (que ainda grava for_whom) e o novo
-- (que não manda o campo) gravam leads durante o deploy. A coluna sai na migration seguinte.

alter table public.leads alter column for_whom drop not null;

-- DOWN (rodar à mão no SQL Editor; o CLI do Supabase não executa down):
-- alter table public.leads alter column for_whom set not null;
