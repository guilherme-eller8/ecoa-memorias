import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Bloco, DocumentoLegal } from "@/components/ui/DocumentoLegal";
import { MARCA } from "@/lib/config";
import { linkWhatsApp } from "@/lib/leads";

export const metadata: Metadata = {
  title: `Privacidade · ${MARCA}`,
  description: `Como a ${MARCA} coleta, usa, guarda e apaga os seus dados, segundo a LGPD.`,
  alternates: { canonical: "/privacidade" },
};

// Política de privacidade simples e clara (LGPD).
export default function Privacidade() {
  return (
    <DocumentoLegal
      titulo="Política de privacidade"
      data="Atualizada em 2 de novembro de 2026."
    >
      <p className="mt-8">
        A {MARCA} faz livros de memórias a partir de histórias contadas por
        áudio. Para isso, cuidamos de dados pessoais e de lembranças de família.
        Aqui explicamos, sem letra miúda, o que coletamos, por que, com quem
        compartilhamos e como você pode pedir para ver ou apagar tudo, conforme
        a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <Bloco titulo="Que dados coletamos">
        <p>
          Quando você demonstra interesse: o seu nome, o seu WhatsApp e o
          registro de que você aceitou os Termos de Uso e esta política (a data
          e a versão). Guardamos também a origem da visita (por exemplo, de qual
          anúncio você veio) e uma assinatura do seu endereço de rede, que não
          permite saber qual é o endereço, usada só para barrar envios
          automáticos.
        </p>
        <p>
          Depois da compra: os dados de quem compra (nome, contato e os
          necessários para o pagamento e a nota fiscal); de quem conta as
          histórias (nome e WhatsApp); dos familiares e amigos que enviam
          mensagens (nome e contato); e o conteúdo do livro, isto é, os áudios,
          as fotos e as mensagens.
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
          textos, montar o livro, imprimir, entregar e manter os áudios dos QR
          codes. Não usamos os seus dados para nada além disso. As regras da
          compra estão nos{" "}
          <Button variant="link" href="/termos">
            Termos de Uso
          </Button>
          .
        </p>
      </Bloco>

      <Bloco titulo="Com quem compartilhamos">
        <p>
          Só com os serviços que precisamos para trabalhar, chamados de
          operadores: a hospedagem do site e dos arquivos, o serviço de e-mail e
          a gráfica que imprime o livro. Cada um recebe apenas o necessário para
          a sua parte.
        </p>
        <p>Não vendemos dados e não os compartilhamos para publicidade.</p>
      </Bloco>

      <Bloco titulo="Por quanto tempo guardamos">
        <p>
          Contatos de quem demonstrou interesse e não comprou: até 12 meses.
        </p>
        <p>Dados de quem compra: por 5 anos, pelas obrigações fiscais.</p>
        <p>
          Áudios, fotos e mensagens: a família recebe os originais, que são dela
          para sempre. Da nossa cópia, guardamos só os áudios que tocam nos QR
          codes do livro, enquanto a família quiser. Se pedir para apagar,
          apagamos, e os QR codes param de tocar. Todo o resto é apagado 90 dias
          depois da entrega.
        </p>
      </Bloco>

      <Bloco titulo="Os seus direitos">
        <p>
          Você pode, a qualquer momento, pedir para saber quais dados temos
          sobre você, corrigi-los, levá-los para outro serviço ou apagá-los,
          além de revogar o seu consentimento (art. 18 da LGPD). Respondemos em
          até 15 dias.
        </p>
      </Bloco>

      <Bloco titulo="Fotos da página">
        <p>
          As fotos antigas da página são ilustrativas e não mostram clientes.
          Vêm de acervos familiares e públicos em domínio público, publicados no
          Wikimedia Commons.
        </p>
      </Bloco>

      <Bloco titulo="Contato">
        <p>
          Para qualquer pedido ou dúvida sobre os seus dados, fale com a gente
          pelo{" "}
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
    </DocumentoLegal>
  );
}
