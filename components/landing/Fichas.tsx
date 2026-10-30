"use client";

import {
  useId,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { CAPAS, type CorCapa } from "@/components/ui/capas";
import { Section } from "@/components/ui/Section";
import { formatarData } from "@/lib/config";
import s from "./Fichas.module.css";

type Ficha = { aba: string; pergunta: string; resposta: string };

const FICHAS: Ficha[] = [
  {
    aba: "WhatsApp",
    pergunta: "Quem conta as histórias precisa saber mexer no celular?",
    resposta:
      "Se manda áudio no WhatsApp, já sabe tudo o que precisa. Se preferir, também é possível gravar por uma ligação.",
  },
  {
    aba: "O presente",
    pergunta: "Como a pessoa fica sabendo do presente?",
    resposta:
      "Quem dá a notícia é você, do seu jeito. Depois, enviamos uma mensagem de boas-vindas explicando como serão as próximas semanas, e começamos quando ela disser que topa.",
  },
  {
    aba: "Seu trabalho",
    pergunta: "Vai dar trabalho para mim?",
    resposta:
      "Não. Você escolhe as perguntas (ou deixa com a gente) e envia algumas fotos. Do resto cuidamos nós, inclusive de reunir as mensagens da família.",
  },
  {
    aba: "O grupo",
    pergunta: "Quem conta as histórias participa do grupo da família?",
    resposta:
      "Não. O grupo é só da família, para que o livro final continue sendo surpresa.",
  },
  {
    aba: "Mensagens",
    pergunta: "Como são reunidas as mensagens da família?",
    resposta:
      "Você nos passa os contatos e nós cuidamos dos convites e dos lembretes.",
  },
  {
    aba: "Tempo",
    pergunta: "Quanto tempo leva por dia?",
    resposta:
      "Alguns minutos. Cada áudio costuma ter entre 2 e 5 minutos, e dá para responder quando quiser.",
  },
  {
    aba: "Aprovação",
    pergunta: "Posso ver o livro antes da impressão?",
    resposta:
      "Sim. Você recebe o arquivo completo e aprova antes de imprimirmos.",
  },
  {
    aba: "Prazo",
    pergunta: "Chega mesmo antes do Natal?",
    resposta: `Sim, para inscrições até ${formatarData()}.`,
  },
  {
    aba: "Desistência",
    pergunta: "E se a pessoa não quiser participar?",
    resposta: "Devolvemos o valor integral.",
  },
  {
    aba: "Os áudios",
    pergunta: "Com quem ficam os áudios?",
    resposta:
      "Com a família, para sempre. Usamos apenas para produzir o livro.",
  },
];

// Os tecidos das capas em rodízio; vizinhas nunca repetem a cor.
const RODIZIO: CorCapa[] = [
  "vinho",
  "nevoa",
  "floresta",
  "rosa-antigo",
  "petroleo",
];

// A aba de cada ficha anda um passo para a direita, como num fichário de verdade.
const PASSOS_ABA = 5;

const nada = () => () => {};

/**
 * Perguntas frequentes como fichas de arquivo: cartões nas cores das capas, empilhados,
 * cada um com a aba recortada. Uma aberta por vez; a primeira já vem aberta do servidor.
 * Sem JS, todas as respostas ficam à vista: só depois de montar as outras fecham.
 */
export function Fichas() {
  const [aberta, setAberta] = useState<number | null>(0);
  const montado = useSyncExternalStore(
    nada,
    () => true,
    () => false,
  );
  const id = useId();

  return (
    <Section
      id="perguntas-frequentes"
      title="Perguntas frequentes"
      grid
      className="overflow-x-clip"
    >
      <ol
        className={`${s.fichas} col-span-12 mt-12 md:mt-16 lg:col-span-10`}
        data-entra="lista"
        style={{ "--ordem": 1 } as CSSProperties}
      >
        {FICHAS.map((f, i) => {
          const cor = RODIZIO[i % RODIZIO.length];
          const aberto = aberta === i;
          // Antes de montar (e sem JS) nenhuma resposta fica fora de alcance
          const alcancavel = !montado || aberto;
          const botaoId = `${id}-b${i}`;
          const painelId = `${id}-p${i}`;
          return (
            <li
              key={f.aba}
              className={s.ficha}
              data-escura={CAPAS[cor].escura || undefined}
              data-aberta={aberto || undefined}
              data-entra-item
              style={
                {
                  "--tecido": CAPAS[cor].tecido,
                  "--passo": i % PASSOS_ABA,
                } as CSSProperties
              }
            >
              <div className={s.corpo}>
                <h3 className={s.cabeca}>
                  <button
                    id={botaoId}
                    type="button"
                    className={s.botao}
                    aria-expanded={alcancavel}
                    aria-controls={painelId}
                    onClick={() => setAberta(aberto ? null : i)}
                  >
                    {/* O tema é sinalização visual: o nome do botão é a pergunta */}
                    <span className={s.aba} aria-hidden>
                      {f.aba}
                    </span>
                    <span className={s.pergunta}>{f.pergunta}</span>
                  </button>
                </h3>
                <div
                  id={painelId}
                  role="region"
                  aria-labelledby={botaoId}
                  className={s.painel}
                  inert={!alcancavel}
                >
                  <div className={s.painelMiolo}>
                    <p className={s.resposta}>{f.resposta}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
