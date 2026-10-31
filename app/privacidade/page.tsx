import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Rodape } from "@/components/landing/Rodape";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MARCA } from "@/lib/config";
import { linkWhatsApp } from "@/lib/leads";

export const metadata: Metadata = {
  title: `Privacidade · ${MARCA}`,
  description: `Como a ${MARCA} coleta, usa, guarda e apaga os seus dados, segundo a LGPD.`,
  alternates: { canonical: "/privacidade" },
};

function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="text-destaque">{titulo}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

// Política de privacidade simples e clara (LGPD).
export default function Privacidade() {
  return (
    <div>
      <header className="bg-polen">
        <Container className="flex h-16 items-center md:h-[72px]">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center"
            aria-label={`${MARCA}, página inicial`}
          >
            <Logo decorativo className="h-12 w-auto md:h-[58px]" />
          </Link>
        </Container>
      </header>

      <main>
        <Container className="pt-12 pb-[clamp(72px,9vw,140px)] md:pt-20">
          <article className="max-w-[62ch]">
            <h1 className="text-h2">Política de privacidade</h1>
            <p className="text-pequeno mt-4">
              Atualizada em 30 de outubro de 2026.
            </p>
            <p className="mt-8">
              A {MARCA} faz livros de memórias a partir de histórias contadas
              por áudio. Para isso, cuidamos de dados pessoais e de lembranças
              de família. Aqui explicamos, sem letra miúda, o que coletamos, por
              que, com quem compartilhamos e como você pode pedir para ver ou
              apagar tudo, conforme a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018).
            </p>

            <Bloco titulo="Que dados coletamos">
              <p>
                Quando você demonstra interesse: o seu nome, o seu WhatsApp,
                para quem seria o livro e, se você usou a capa da página, o nome
                e a cor escolhidos. Guardamos também a origem da visita (por
                exemplo, de qual anúncio você veio) e uma assinatura do seu
                endereço de rede, que não permite saber qual é o endereço, usada
                só para barrar envios automáticos.
              </p>
              <p>
                Depois da compra: os dados de quem compra (nome, contato e os
                necessários para o pagamento e a nota fiscal); de quem conta as
                histórias (nome e WhatsApp); dos familiares e amigos que enviam
                mensagens (nome e contato); e o conteúdo do livro, isto é, os
                áudios, as fotos e as mensagens.
              </p>
              <p>
                Na página, medimos visitas de forma agregada, sem cookies de
                publicidade e sem identificar quem visita.
              </p>
            </Bloco>

            <Bloco titulo="Para que usamos">
              <p>
                Para falar com você sobre o livro (contato comercial) e para
                produzi-lo: enviar as perguntas, receber as respostas, editar os
                textos, montar o livro, imprimir e entregar. Não usamos os seus
                dados para nada além disso.
              </p>
            </Bloco>

            <Bloco titulo="Com quem compartilhamos">
              <p>
                Só com os serviços que precisamos para trabalhar, chamados de
                operadores: a hospedagem do site e dos arquivos, o serviço de
                e-mail e a gráfica que imprime o livro. Cada um recebe apenas o
                necessário para a sua parte.
              </p>
              <p>
                Não vendemos dados e não os compartilhamos para publicidade.
              </p>
            </Bloco>

            <Bloco titulo="Por quanto tempo guardamos">
              <p>
                Contatos de quem demonstrou interesse e não comprou: até 12
                meses.
              </p>
              <p>Dados de quem compra: por 5 anos, pelas obrigações fiscais.</p>
              <p>
                Áudios, fotos e mensagens: a família recebe os originais, que
                são dela para sempre. A nossa cópia é apagada 90 dias depois da
                entrega do livro.
              </p>
            </Bloco>

            <Bloco titulo="Os seus direitos">
              <p>
                Você pode, a qualquer momento, pedir para saber quais dados
                temos sobre você, corrigi-los, levá-los para outro serviço ou
                apagá-los, além de revogar o seu consentimento (art. 18 da
                LGPD). Respondemos em até 15 dias.
              </p>
            </Bloco>

            <Bloco titulo="Fotos da página">
              <p>
                As fotos antigas da página são ilustrativas e não mostram
                clientes. Vêm de acervos familiares e públicos em domínio
                público, publicados no Wikimedia Commons.
              </p>
            </Bloco>

            <Bloco titulo="Contato">
              <p>
                Para qualquer pedido ou dúvida sobre os seus dados, fale com a
                gente pelo{" "}
                <Button
                  variant="link"
                  href={linkWhatsApp(
                    `Olá! Tenho um pedido sobre os meus dados na ${MARCA}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Button>
                .
              </p>
            </Bloco>
          </article>
        </Container>
      </main>

      <Rodape />
    </div>
  );
}
