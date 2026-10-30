"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppChat, type MensagemChat } from "@/components/ui/WhatsAppChat";

const DIAS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Segunda",
  "Terça",
  "Quarta",
];
const DURACOES = [
  "2:14",
  "3:41",
  "1:52",
  "0:58",
  "4:07",
  "2:36",
  "3:12",
  "5:20",
];
const RESPOSTAS = [
  "10:12",
  "18:40",
  "09:47",
  "21:05",
  "11:30",
  "16:22",
  "08:55",
  "20:18",
];

// Cada dia útil: a data, a pergunta da Ecoa e o áudio de quem conta.
function conversa(perguntas: readonly string[]): MensagemChat[] {
  return perguntas.flatMap((p, i): MensagemChat[] => [
    { tipo: "dia", dia: DIAS[i % DIAS.length] },
    {
      tipo: "texto",
      texto: i === 0 ? `Bom dia! A pergunta de hoje: ${p}` : p,
      hora: "09:00",
    },
    {
      tipo: "audio",
      minha: true,
      duracao: DURACOES[i % DURACOES.length],
      hora: RESPOSTAS[i % RESPOSTAS.length],
    },
  ]);
}

// Sem JS e com movimento reduzido: os três primeiros dias, parados.
const INICIAL = 9;
const RITMO_MS = 1500;

/**
 * As perguntas chegando como chegam de verdade: uma por dia útil, no WhatsApp.
 * Quando a seção entra na tela, a conversa segue sozinha até o oitavo dia e para.
 * Passar o mouse pausa. O chat é ilustração: as perguntas estão ditas na lista ao lado,
 * para o leitor de tela.
 */
export function ConversaPerguntas({
  perguntas,
  className,
}: {
  perguntas: readonly string[];
  className?: string;
}) {
  const mensagens = useMemo(() => conversa(perguntas), [perguntas]);
  const raiz = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(INICIAL);
  const [aoVivo, setAoVivo] = useState(false);
  const [rodando, setRodando] = useState(false);
  const [pausa, setPausa] = useState(false);

  // Antes de aparecer: recolhe para os dois primeiros dias e espera a seção entrar na tela
  useEffect(() => {
    const el = raiz.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= innerHeight) return;
    setN(6);
    setAoVivo(true);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        setRodando(true);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!rodando || pausa || n >= mensagens.length) return;
    // A data e a pergunta chegam juntas; o áudio demora um pouco mais
    const proxima = mensagens[n];
    const t = setTimeout(
      () => setN((v) => v + (proxima.tipo === "dia" ? 2 : 1)),
      proxima.tipo === "audio" ? RITMO_MS * 1.2 : RITMO_MS,
    );
    return () => clearTimeout(t);
  }, [rodando, pausa, n, mensagens]);

  // Quem segura o celular é quem conta: o cabeçalho mostra a Ecoa escrevendo a próxima pergunta
  const proxima = mensagens[n];
  const subtitulo =
    rodando && proxima && proxima.tipo !== "audio" ? "digitando…" : "online";

  return (
    <div
      ref={raiz}
      className={className}
      onPointerEnter={() => setPausa(true)}
      onPointerLeave={() => setPausa(false)}
    >
      <WhatsAppChat
        variant="individual"
        titulo="Ecoa Memórias"
        subtitulo={subtitulo}
        mensagens={mensagens.slice(0, n)}
        aoVivo={aoVivo}
        decorativo
      />
    </div>
  );
}
