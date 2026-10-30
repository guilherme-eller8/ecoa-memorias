"use client";

import { track } from "@vercel/analytics";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useCapa } from "@/lib/capa";
import { mascararWhatsApp, submitLead } from "@/lib/leads";

// O zod só chega quando alguém começa a preencher: fora do bundle da primeira tela
const carregarSchema = () => import("@/lib/lead-schema");

type Campo = "nome" | "whatsapp";
type Erros = Partial<Record<Campo, string>>;
type Estado =
  | { fase: "form" }
  | { fase: "enviando" }
  | { fase: "fallback"; url: string }
  | { fase: "gravado"; url: string };

const CAMPOS: Campo[] = ["nome", "whatsapp"];

const CAMPO =
  "rounded-ed bg-papel text-tinta mt-2 block min-h-12 w-full px-4 py-2.5 text-corpo leading-snug " +
  "transition-[background-color] duration-150 hover:bg-white " +
  "focus-visible:outline-floresta focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-tinta aria-[invalid=true]:-outline-offset-2";

/** Abre o wa.me numa aba nova; se o navegador bloquear, vai na própria aba. */
function abrirWhatsApp(url: string) {
  const aba = window.open(url, "_blank");
  if (aba) aba.opener = null;
  else window.location.assign(url);
}

export function FormInteresse() {
  const capa = useCapa();
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const aviso = useRef<HTMLDivElement>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<Estado>({ fase: "form" });

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.currentTarget));
    const { leadSchema } = await carregarSchema();
    const r = leadSchema.safeParse(dados);
    if (!r.success) {
      const novos: Erros = {};
      for (const issue of r.error.issues) {
        const campo = issue.path[0] as Campo;
        if (CAMPOS.includes(campo) && !novos[campo])
          novos[campo] = issue.message;
      }
      setErros(novos);
      const primeiro = CAMPOS.find((c) => novos[c]);
      if (primeiro)
        form.current
          ?.querySelector<HTMLElement>(`[name="${primeiro}"]`)
          ?.focus();
      // Honeypot preenchido: ninguém de verdade chega aqui. Não faz nada.
      return;
    }
    setErros({});
    setEstado({ fase: "enviando" });
    const resultado = await submitLead(r.data);
    // Sem o nome nem o número: se a capa ao vivo foi usada e se o lead foi gravado ou caiu no wa.me
    track("lead_enviado", {
      usou_capa: capa.usada,
      status: resultado.status,
    });
    if (resultado.status === "fallback") abrirWhatsApp(resultado.url);
    setEstado({ fase: resultado.status, url: resultado.url });
    requestAnimationFrame(() => aviso.current?.focus());
  }

  if (estado.fase === "fallback" || estado.fase === "gravado") {
    const gravado = estado.fase === "gravado";
    return (
      <div
        ref={aviso}
        tabIndex={-1}
        role="status"
        className="rounded-ed bg-papel px-6 py-10 focus-visible:outline-none md:px-10 md:py-12"
      >
        <p className="text-destaque font-medium">
          {gravado
            ? "Recebemos. Em breve falamos com você pelo WhatsApp."
            : "Abrimos o WhatsApp com a sua mensagem pronta. É só enviar."}
        </p>
        <p className="mt-6">
          <Button
            variant="link"
            href={estado.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="formulario-whatsapp"
          >
            {gravado
              ? "Prefere falar agora? Abrir WhatsApp"
              : "Abrir o WhatsApp de novo"}
          </Button>
        </p>
      </div>
    );
  }

  const erro = (c: Campo) =>
    erros[c] ? (
      <p id={`${id}-${c}-erro`} className="text-pequeno mt-2 font-medium">
        {erros[c]}
      </p>
    ) : null;
  const aria = (c: Campo) => ({
    "aria-invalid": erros[c] ? true : undefined,
    "aria-describedby": erros[c] ? `${id}-${c}-erro` : undefined,
  });

  return (
    <form
      ref={form}
      onSubmit={enviar}
      onFocus={() => void carregarSchema()}
      noValidate
      aria-labelledby={`${id}-titulo`}
      className="relative"
    >
      <h3 id={`${id}-titulo`} className="text-destaque">
        Quero este livro
      </h3>

      <div className="mt-6">
        <label htmlFor={`${id}-nome`} className="text-pequeno font-medium">
          Seu nome
        </label>
        <input
          id={`${id}-nome`}
          name="nome"
          type="text"
          autoComplete="name"
          className={CAMPO}
          {...aria("nome")}
        />
        {erro("nome")}
      </div>

      <div className="mt-5">
        <label htmlFor={`${id}-whatsapp`} className="text-pequeno font-medium">
          Seu WhatsApp
        </label>
        <input
          id={`${id}-whatsapp`}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(31) 99999-9999"
          value={whatsapp}
          onChange={(e) => setWhatsapp(mascararWhatsApp(e.target.value))}
          className={`${CAMPO} placeholder:text-tinta-2`}
          {...aria("whatsapp")}
        />
        {erro("whatsapp")}
      </div>

      {/* A cor escolhida na capa do hero vai junto, sem pedir nada a mais */}
      {capa.usada ? (
        <input type="hidden" name="capa_cor" value={capa.cor} />
      ) : null}

      {/* Honeypot: invisível e fora da ordem de foco */}
      <div
        className="pointer-events-none absolute top-0 left-0 size-px overflow-hidden opacity-0"
        aria-hidden
      >
        <label htmlFor={`${id}-site`}>Não preencha este campo</label>
        <input
          id={`${id}-site`}
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        className="mt-8 w-full md:w-auto"
        data-cta="formulario"
        disabled={estado.fase === "enviando"}
      >
        Quero este livro
      </Button>
      <p className="text-pequeno mt-4 max-w-[44ch]">
        Nada é cobrado agora. Logo em seguida, falamos com você pelo WhatsApp
        para tirar dúvidas e garantir a sua vaga.
      </p>
    </form>
  );
}
