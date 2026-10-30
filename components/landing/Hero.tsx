import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LiveCover } from "@/components/ui/LiveCover";
import { formatarData, formatarPreco, LIVROS_NA_EDICAO } from "@/lib/config";

export function Hero() {
  const fatos = [
    { valor: formatarPreco(), nota: "por livro, tudo incluído" },
    { valor: `${LIVROS_NA_EDICAO} livros`, nota: "Edição de Natal" },
    { valor: `Até ${formatarData()}`, nota: "inscrições" },
  ];

  return (
    <section id="topo" aria-labelledby="hero-titulo">
      <Container
        grid
        className="gap-y-6 pt-8 pb-[clamp(56px,6.6vw,96px)] md:pt-12 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-y-0 lg:pt-14"
      >
        <h1
          id="hero-titulo"
          className="text-display col-span-12 lg:col-span-8 lg:row-start-1"
        >
          A voz de quem você ama, em capa dura.
        </h1>

        <div className="col-span-12 lg:col-span-6 lg:row-start-2 lg:pt-10">
          <p className="max-w-[46ch]">
            Uma pergunta por dia no WhatsApp, respondida por áudio. Em quatro
            semanas, as histórias, as fotos e as mensagens da família viram um
            livro de capa dura, entregue antes do Natal.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 md:mt-8 md:flex md:flex-wrap md:gap-x-10">
            {fatos.map((f, i) => (
              <li
                key={f.nota}
                className={i === 2 ? "col-span-2 md:col-span-1" : undefined}
              >
                <span className="text-destaque block font-medium">
                  {f.valor}
                </span>
                <span className="text-pequeno block">{f.nota}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* No desktop, a capa vai à direita e o campo e as lombadas descem para a coluna do texto */}
        <div className="col-span-12 lg:contents">
          <LiveCover className="md:flex-row! md:items-end! md:gap-8! lg:contents! lg:[&>div]:col-span-6 lg:[&>div]:col-start-1 lg:[&>div]:row-start-4 lg:[&>div]:self-start lg:[&>div]:pt-10 lg:[&>figure]:col-span-6 lg:[&>figure]:col-start-7 lg:[&>figure]:row-[2/6] lg:[&>figure]:justify-self-end lg:[&>figure]:pt-4" />
        </div>

        <div className="col-span-12 lg:col-span-6 lg:row-start-3 lg:pt-8">
          <Button href="#interesse" data-cta="hero">
            Tenho interesse
          </Button>
        </div>
      </Container>
    </section>
  );
}
