"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { BookCover } from "@/components/ui/BookCover";
import { Button } from "@/components/ui/Button";
import { CAPA_PADRAO, CAPAS } from "@/components/ui/capas";
import { useCapa } from "@/lib/capa";
import {
  leadSchema,
  mascararWhatsApp,
  PARA_QUEM,
  submitLead,
} from "@/lib/leads";

type Campo = "nome" | "whatsapp" | "para_quem";
type Erros = Partial<Record<Campo, string>>;
type Estado =
  | { fase: "form" }
  | { fase: "enviando" }
  | { fase: "fallback"; url: string }
  | { fase: "gravado"; url: string };

const CAMPOS: Campo[] = ["nome", "whatsapp", "para_quem"];

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

  const autorCapa = capa.nome.trim() || CAPA_PADRAO.author;

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.currentTarget));
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
      noValidate
      aria-labelledby={`${id}-titulo`}
      className="relative"
    >
      <h3 id={`${id}-titulo`} className="text-destaque">
        Tenho interesse
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

      <div className="mt-5">
        <label htmlFor={`${id}-para`} className="text-pequeno font-medium">
          Para quem seria o livro?
        </label>
        <select
          id={`${id}-para`}
          name="para_quem"
          defaultValue=""
          className={`${CAMPO} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='14'%20height='9'%3E%3Cpath%20d='M1%201l6%206%206-6'%20fill='none'%20stroke='%2326211D'%20stroke-width='2'/%3E%3C/svg%3E")] bg-[position:right_16px_center] bg-no-repeat pr-11`}
          {...aria("para_quem")}
        >
          <option value="" disabled>
            Escolha
          </option>
          {PARA_QUEM.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {erro("para_quem")}
      </div>

      {capa.usada ? (
        <div className="mt-7 flex items-center gap-4">
          <BookCover
            color={capa.cor}
            title={CAPA_PADRAO.title}
            author={autorCapa}
            size="sm"
            turn={18}
            className="shrink-0 [--w:96px]!"
          />
          <p className="text-pequeno">
            <span className="block italic">{autorCapa}</span>
            <span className="block">capa {CAPAS[capa.cor].nome}</span>
          </p>
          <input type="hidden" name="capa_nome" value={capa.nome.trim()} />
          <input type="hidden" name="capa_cor" value={capa.cor} />
        </div>
      ) : null}

      {/* Honeypot: fora da tela e fora da ordem de foco */}
      <div
        className="absolute -left-[9999px] size-0 overflow-hidden"
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
        Quero garantir um livro
      </Button>
      <p className="text-pequeno mt-4 max-w-[44ch]">
        Sem compromisso. Respondemos pelo WhatsApp em até 24 horas com os
        próximos passos.
      </p>
    </form>
  );
}
