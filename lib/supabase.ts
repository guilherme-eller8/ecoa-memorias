import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Cliente com service role, só no servidor. Sem as variáveis, devolve null. */
export function supabaseServidor(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !chave) return null;
  return createClient(url, chave, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
