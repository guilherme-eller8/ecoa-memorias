import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { WhatsAppChat } from "@/components/ui/WhatsAppChat";
import { ComCasa, type BuscaCasa } from "./ComCasa";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

const DA_CASA = [
  "Uma pessoa da equipe acompanha os moradores do projeto.",
  "Um horário na rotina para quem precisa de ajuda para gravar. Quem já manda áudio responde sozinho.",
  "A casa apresenta o projeto às famílias e colhe a autorização. O termo vai pronto.",
];

const DA_ECOA = [
  "Uma pergunta por dia útil, no WhatsApp do morador ou de quem acompanha.",
  "Um grupo para cada família, com o nome da casa, onde as histórias chegam no mesmo dia.",
  "Edição, fotos, revisão com a família, gráfica e entrega.",
  "O QR code em cada capítulo, que toca a voz de quem contou.",
  "Meia hora de conversa com a equipe antes de começar.",
];

// O grupo da família leva o nome da casa: é ela quem entrega as histórias.
export function QuemFaz({ busca }: { busca: BuscaCasa }) {
  return (
    <Section
      title="A casa abre a conversa. A Ecoa faz o resto."
      grid
      titleClassName="lg:col-span-7! lg:col-start-6 lg:row-start-1 max-w-[22ch]!"
    >
      <div
        className="col-span-12 mt-10 md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center"
        data-entra
        style={ordem(3)}
      >
        <ComCasa busca={busca}>
          {(casa) => <GrupoDaFamilia nomeCasa={casa?.nome ?? "Sua casa"} />}
        </ComCasa>
      </div>

      <div className="col-span-12 mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:mt-10">
        <div
          className="bg-papel rounded-ed px-6 pt-7 pb-8 md:px-8"
          data-entra="lista"
          style={ordem(1)}
        >
          <h3 className="text-destaque font-medium">Da casa</h3>
          <ul className="mt-5 grid gap-4">
            {DA_CASA.map((item) => (
              <li key={item} data-entra-item>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-7 md:px-2" data-entra="lista" style={ordem(2)}>
          <h3 className="text-destaque font-medium">Da Ecoa</h3>
          <ul className="mt-5 grid gap-4">
            {DA_ECOA.map((item) => (
              <li key={item} data-entra-item>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function GrupoDaFamilia({ nomeCasa }: { nomeCasa: string }) {
  return (
    <WhatsAppChat
      variant="grupo"
      titulo="Histórias da Dona Lourdes"
      subtitulo={`${nomeCasa}, Paulo, Marina, Ana`}
      decorativo
      mensagens={[
        { tipo: "dia", dia: "Terça" },
        {
          tipo: "audio",
          autor: nomeCasa,
          duracao: "3:41",
          legenda: "Hoje a Dona Lourdes contou como conheceu o seu Geraldo.",
          hora: "15:20",
        },
        {
          tipo: "texto",
          autor: "Marina",
          texto: "mãe, eu nunca tinha ouvido essa história",
          hora: "15:34",
        },
        {
          tipo: "texto",
          minha: true,
          texto: "ouvi no carro voltando do trabalho. que voz boa de ouvir",
          hora: "18:02",
        },
      ]}
    />
  );
}
