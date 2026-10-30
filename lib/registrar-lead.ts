"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { CAPAS } from "@/components/ui/capas";
import { EDICAO, WHATSAPP_NUMERO } from "./config";
// Ciclo com ./leads: os dois lados só usam o que importam dentro de funções, nunca no topo.
import { entradaLeadSchema, type EntradaLead } from "./lead-schema";
import type { z } from "zod";
import {
  linkWhatsApp,
  mascararWhatsApp,
  mensagemPrimeiroContato,
  mensagemWhatsApp,
  type ResultadoLead,
} from "./leads";
import { supabaseServidor } from "./supabase";

const LIMITE_POR_HORA = 5;

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function hashDoIp(segredo: string): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "desconhecido";
  return createHmac("sha256", segredo).update(ip).digest("hex");
}

/**
 * Grava o interesse e avisa por e-mail. Qualquer falha, variável ausente ou excesso de envios
 * devolve o fallback (wa.me com a mensagem pronta); o visitante nunca vê erro técnico.
 */
export async function registrarLead(
  entrada: EntradaLead,
): Promise<ResultadoLead> {
  const r = entradaLeadSchema.safeParse(entrada);
  if (!r.success) {
    return { status: "fallback", url: `https://wa.me/${WHATSAPP_NUMERO}` };
  }
  const lead = r.data;
  const fallback: ResultadoLead = {
    status: "fallback",
    url: linkWhatsApp(mensagemWhatsApp(lead)),
  };

  // Honeypot preenchido: robô. Finge que gravou e não faz nada.
  if (lead.site) return { status: "gravado", url: fallback.url };

  const db = supabaseServidor();
  const { RESEND_API_KEY, RESEND_FROM, ADMIN_EMAIL } = process.env;
  // A service role key é o segredo do hash: já existe só no servidor e não exige outra variável.
  const segredo = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Sem banco não há onde gravar: só aí cai no wa.me. O e-mail é aviso, não condição.
  if (!db || !segredo) {
    console.error("[lead] Supabase não configurado; fallback wa.me");
    return fallback;
  }

  try {
    const ipHash = await hashDoIp(segredo);

    const umaHoraAtras = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const contagem = await db
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", umaHoraAtras);
    if (contagem.error) throw contagem.error;
    if ((contagem.count ?? 0) >= LIMITE_POR_HORA) {
      console.warn("[lead] limite por hora atingido; fallback wa.me");
      return fallback;
    }

    const gravacao = await db.from("leads").insert({
      name: lead.nome,
      whatsapp: lead.whatsapp,
      capa_cor: lead.capa_cor ?? null,
      utm_source: lead.utm_source || null,
      utm_medium: lead.utm_medium || null,
      utm_campaign: lead.utm_campaign || null,
      ip_hash: ipHash,
    });
    if (gravacao.error) throw gravacao.error;

    // Daqui em diante o lead já está salvo: falha no e-mail não muda o que o visitante vê.
    await avisarPorEmail(lead, { RESEND_API_KEY, RESEND_FROM, ADMIN_EMAIL });

    return { status: "gravado", url: fallback.url };
  } catch (erro) {
    console.error(
      "[lead] falhou; fallback wa.me:",
      erro instanceof Error ? erro.message : erro,
    );
    return fallback;
  }
}

type VariaveisEmail = {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  ADMIN_EMAIL?: string;
};

/** Avisa por e-mail. Nunca lança: sem variáveis ou com erro no Resend, só registra no log. */
async function avisarPorEmail(
  lead: z.output<typeof entradaLeadSchema>,
  { RESEND_API_KEY, RESEND_FROM, ADMIN_EMAIL }: VariaveisEmail,
): Promise<void> {
  if (!RESEND_API_KEY || !RESEND_FROM || !ADMIN_EMAIL) {
    console.warn(
      "[lead] gravado, mas o Resend não está configurado; sem e-mail",
    );
    return;
  }
  try {
    const responder = linkWhatsApp(
      mensagemPrimeiroContato(lead),
      `55${lead.whatsapp}`,
    );
    const linhas: [string, string][] = [
      ["Nome", lead.nome],
      ["WhatsApp", mascararWhatsApp(lead.whatsapp)],
    ];
    if (lead.capa_cor) linhas.push(["Capa", CAPAS[lead.capa_cor].nome]);
    const origem = [lead.utm_source, lead.utm_medium, lead.utm_campaign]
      .filter(Boolean)
      .join(" / ");
    if (origem) linhas.push(["Origem", origem]);

    const envio = await new Resend(RESEND_API_KEY).emails.send({
      from: RESEND_FROM,
      to: ADMIN_EMAIL,
      subject: `Novo interesse: ${lead.nome}`,
      text: [
        `Novo interesse na edição ${EDICAO}.`,
        "",
        ...linhas.map(([rotulo, valor]) => `${rotulo}: ${valor}`),
        "",
        `Responder pelo WhatsApp: ${responder}`,
        "",
        "Status e notas: Table Editor do Supabase, tabela leads.",
      ].join("\n"),
      html: [
        `<p>Novo interesse na edição ${EDICAO}.</p>`,
        `<p>${linhas.map(([rotulo, valor]) => `${rotulo}: <strong>${escaparHtml(valor)}</strong>`).join("<br>")}</p>`,
        `<p><a href="${escaparHtml(responder)}">Responder pelo WhatsApp</a></p>`,
        "<p>Status e notas: Table Editor do Supabase, tabela leads.</p>",
      ].join(""),
    });
    if (envio.error) throw new Error(envio.error.message);
  } catch (erro) {
    console.error(
      "[lead] gravado, mas o e-mail falhou:",
      erro instanceof Error ? erro.message : erro,
    );
  }
}
