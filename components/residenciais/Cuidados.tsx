import type { CSSProperties } from "react";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { IMAGES, VIDEOS } from "@/lib/config";
import { existeEmPublic } from "@/lib/imagens";

const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;

type Cuidado = { pergunta: string; resposta: string };

// As objeções que a casa traz antes de topar. Preço fica para a conversa, de propósito.
const CUIDADOS: Cuidado[] = [
  {
    pergunta: "E a privacidade dos moradores?",
    resposta:
      "As histórias e a voz são do morador e da família. Nada é publicado. A casa só usa um trecho, uma foto ou o livro na recepção com autorização por escrito.",
  },
  {
    pergunta: "E quem tem a memória frágil?",
    resposta:
      "As perguntas se adaptam a cada pessoa, e as histórias entram como foram contadas. A família lê tudo antes de imprimir. Quem tem curador participa com a autorização dele.",
  },
  {
    pergunta: "E se vier uma lembrança difícil?",
    resposta:
      "O morador pode pular qualquer pergunta, a qualquer momento. A equipe sai da conversa inicial sabendo quando parar.",
  },
  {
    pergunta: "Onde aparece a marca da casa?",
    resposta:
      "Na capa do livro, no nome dos grupos das famílias e nos convites. A Ecoa aparece só na ficha técnica, como a gráfica aparece em qualquer livro.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "Depende do número de moradores e de quem paga: a casa, a família ou as duas. Falamos disso na conversa, com a conta feita para a sua casa.",
  },
];

export function Cuidados() {
  const temFoto = existeEmPublic(IMAGES.surpresa);
  const temVideo = temFoto && existeEmPublic(VIDEOS.surpresa);
  return (
    <Section
      title="O que costuma preocupar."
      tone="papel"
      grid
      titleClassName="lg:col-span-7!"
    >
      <dl
        className="col-span-12 mt-10 grid gap-y-9 md:mt-12 lg:col-span-7"
        data-entra="lista"
        style={ordem(1)}
      >
        {CUIDADOS.map((c) => (
          <div key={c.pergunta} data-entra-item>
            <dt className="text-destaque font-medium">{c.pergunta}</dt>
            <dd className="mt-2 max-w-[52ch]">{c.resposta}</dd>
          </div>
        ))}
      </dl>

      {/* A entrega com a família: o momento que a casa vai querer repetir */}
      {temFoto ? (
        <figure
          className="col-span-12 m-0 mt-12 md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center"
          data-entra="foto"
          style={ordem(2)}
        >
          <div className="relative">
            <Foto
              src={IMAGES.surpresa}
              tipo="cena"
              proporcao="4 / 5"
              objectPosition="50% 38%"
              sizes="(min-width: 1024px) 400px, 80vw"
              alt="Almoço de família: o avô, sentado à mesa, sorri com o livro de capa verde aberto nas mãos, enquanto a filha e os netos riem ao redor"
            />
            {temVideo ? (
              <VideoLoop
                src={VIDEOS.surpresa}
                poster={IMAGES.surpresa}
                className="rounded-ed [filter:saturate(.86)_contrast(.96)_sepia(.06)]"
              />
            ) : null}
          </div>
          <figcaption className="text-pequeno text-tinta-2 mt-3">
            Imagem ilustrativa.
          </figcaption>
        </figure>
      ) : null}
    </Section>
  );
}
