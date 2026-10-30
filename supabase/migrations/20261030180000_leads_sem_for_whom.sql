-- UP: o formulário deixou de perguntar para quem seria o livro.
-- A tabela estava vazia quando a coluna saiu; a conversa no WhatsApp descobre isso.

alter table public.leads drop column for_whom;

-- DOWN (rodar à mão no SQL Editor; o CLI do Supabase não executa down):
-- alter table public.leads add column for_whom text;
