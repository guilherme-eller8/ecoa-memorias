import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Bloco, DocumentoLegal } from "@/components/ui/DocumentoLegal";
import {
  CIDADE,
  CNPJ,
  CNPJ_PRONTO,
  DATA_PRIMEIRA_PAGINA,
  DEVOLUCAO_SEM_IMPRESSAO,
  formatarData,
  formatarDataComAno,
  formatarParcela,
  formatarPreco,
  LIVROS_NA_EDICAO,
  MARCA,
  PARCELAS_MAX,
  PERGUNTAS_DE_NATAL,
  porExtenso,
  PRAZO_LIVRO,
  RESPONSAVEL,
  SEMANAS_DE_PERGUNTAS,
  TERMOS_VERSAO,
  WHATSAPP_PRONTO,
} from "@/lib/config";
import { linkWhatsApp } from "@/lib/leads";

export const metadata: Metadata = {
  title: `Termos de Uso · ${MARCA}`,
  description: `As regras do site e da compra de um livro da ${MARCA}: pagamento, desistência, prazos e direitos sobre as histórias.`,
  alternates: { canonical: "/termos" },
};

// Termos do site e da contratação. Texto próprio; preço, datas e valores saem de lib/config.ts.
export default function Termos() {
  const primeiraPagina = formatarData(DATA_PRIMEIRA_PAGINA);
  const perguntas = porExtenso(PERGUNTAS_DE_NATAL);
  return (
    <DocumentoLegal
      titulo="Termos de Uso"
      data={`Versão de ${formatarDataComAno(TERMOS_VERSAO)}.`}
    >
      <p className="mt-8">
        Aqui estão as regras para usar este site e para contratar um livro da{" "}
        {MARCA}. Escrevemos do jeito mais simples que conseguimos. Ao marcar o
        aceite no formulário, ou ao pagar pelo livro, você concorda com elas.
      </p>

      <Bloco titulo="Quem somos">
        <p>
          A {MARCA} é operada por {RESPONSAVEL}, pessoa física, em {CIDADE}
          {CNPJ_PRONTO ? `, CNPJ ${CNPJ}` : ""}. Falamos com você pelo WhatsApp,
          do primeiro contato à entrega.
        </p>
      </Bloco>

      <Bloco titulo="O que fazemos">
        <p>
          Fazemos livros de capa dura com histórias de vida contadas por áudio
          no WhatsApp. Uma pessoa da nossa equipe ouve e edita cada história. O
          livro reúne as histórias, fotos, mensagens da família e QR codes que
          tocam as vozes.
        </p>
        <p>
          O livro registra memórias do jeito que foram contadas. Não é uma
          biografia com checagem de fatos, nem um trabalho de genealogia, nem
          terapia.
        </p>
      </Bloco>

      <Bloco titulo="Demonstrar interesse não é compra">
        <p>
          O formulário do site só pede o seu nome e o seu WhatsApp para que a
          gente fale com você. Ele não cria pedido, não gera cobrança e não
          reserva vaga. A vaga é confirmada quando combinamos o começo pelo
          WhatsApp.
        </p>
        <p>
          Cada edição tem {LIVROS_NA_EDICAO} vagas. Quando acabam, a edição
          fecha.
        </p>
      </Bloco>

      <Bloco titulo="Como funciona">
        <p>
          O começo é na ceia de Natal. Antes dela, você recebe {perguntas}{" "}
          perguntas no WhatsApp. Na ceia, alguém da família faz as perguntas e
          grava as respostas no celular, ou quem conta responde por áudio no
          WhatsApp. No dia {primeiraPagina}, mandamos para você a primeira
          página do livro, em PDF, editada e com o QR code que toca a voz.
        </p>
        <p>
          Se vocês decidirem seguir, mandamos as boas-vindas a quem conta e só
          continuamos quando a pessoa disser que topa. A partir daí, enviamos
          uma pergunta por dia útil, durante {SEMANAS_DE_PERGUNTAS} semanas, e
          ela responde por áudio quando puder.
        </p>
      </Bloco>

      <Bloco titulo="Preço e pagamento">
        <p>
          O livro custa {formatarPreco()} no Pix ou {PARCELAS_MAX}x de{" "}
          {formatarParcela()} sem juros no cartão. O frete é à parte e calculado
          para o seu CEP.
        </p>
        <p>
          Quem quiser mais exemplares encomenda direto com a gráfica que imprime
          o livro: passamos o contato, e a {MARCA} não cobra nada por isso.
        </p>
        <p>
          O começo é por nossa conta. Você só paga depois de receber a primeira
          página, e só se quiser seguir. Se não quiser, nada é cobrado, o
          processo para ali e a primeira página fica com vocês.
        </p>
      </Bloco>

      <Bloco titulo="Arrependimento">
        <p>
          Depois de pagar, você tem 7 dias para desistir, por qualquer motivo,
          com devolução integral, como prevê o artigo 49 do Código de Defesa do
          Consumidor.
        </p>
      </Bloco>

      <Bloco titulo="Quando quem conta não participa ou para no meio">
        <p>Se a pessoa não quiser participar, você não paga nada.</p>
        <p>
          Se ela parar no meio, o livro sai com as histórias já gravadas. Se a
          família preferir não imprimir, entregamos o livro em PDF, com os
          áudios e os QR codes, e devolvemos{" "}
          {formatarPreco(DEVOLUCAO_SEM_IMPRESSAO)}.
        </p>
      </Bloco>

      <Bloco titulo="O consentimento de quem conta">
        <p>
          Quem contrata não inscreve ninguém sem que a pessoa saiba que vai
          gravar. Quem grava na ceia só nos envia a gravação com o conhecimento
          de quem conta. O livro só segue depois que quem conta aceita
          participar, e esse aceite fica registrado na conversa. Quem conta pode
          parar quando quiser.
        </p>
      </Bloco>

      <Bloco titulo="As histórias são da família">
        <p>
          As histórias, os áudios e as fotos pertencem à família e a quem conta.
          Usamos esse material apenas para produzir o livro e manter os áudios
          dos QR codes. Nada é divulgado sem autorização por escrito.
        </p>
        <p>
          Quem envia fotos e mensagens declara que pode usá-las e que as pessoas
          que aparecem nelas estão de acordo.
        </p>
      </Bloco>

      <Bloco titulo="Prova e impressão">
        <p>
          Antes de imprimir, mandamos a prova do livro em PDF. Você lê com calma
          e pede os ajustes. Só imprimimos com o seu ok.
        </p>
        <p>
          Depois do ok, erros no conteúdo aprovado não dão direito a reimpressão
          sem custo. Defeito de impressão ou dano no transporte, sim: nesses
          casos, refazemos e reenviamos sem custo.
        </p>
      </Bloco>

      <Bloco titulo="Prazo e entrega">
        <p>
          A primeira página chega no dia {primeiraPagina}. Se as respostas
          chegarem depois da ceia, ela chega logo depois delas. Se vocês
          decidirem seguir, o livro fica pronto {PRAZO_LIVRO} depois. Entregamos
          em todo o Brasil. Se a transportadora atrasar, acompanhamos até a
          entrega e mantemos você informado.
        </p>
      </Bloco>

      <Bloco titulo="Os áudios dos QR codes">
        <p>
          Guardamos os áudios que tocam nos QR codes enquanto a família quiser.
          Se pedir para apagar, apagamos, e os QR codes param de tocar. O resto
          da nossa cópia é apagado 90 dias depois da entrega, como explica a{" "}
          <Button variant="link" href="/privacidade">
            Política de privacidade
          </Button>
          .
        </p>
      </Bloco>

      <Bloco titulo="Uso do site">
        <p>
          Não use o site para enviar dados de outras pessoas sem autorização,
          para envios automáticos ou para tentar burlar a segurança. A marca, os
          textos e as imagens do site pertencem à {MARCA} ou a quem os
          licenciou.
        </p>
      </Bloco>

      <Bloco titulo="Mudanças, lei e foro">
        <p>
          Se estes Termos mudarem, publicamos uma nova versão com a nova data.
          Quem já contratou segue a versão em vigor no dia do pagamento.
        </p>
        <p>
          Valem as leis brasileiras. Você pode recorrer ao foro da sua cidade,
          como garante o Código de Defesa do Consumidor.
        </p>
      </Bloco>

      {WHATSAPP_PRONTO && (
        <Bloco titulo="Contato">
          <p>
            Para qualquer dúvida sobre estes Termos, fale com a gente pelo{" "}
            <Button
              variant="link"
              href={linkWhatsApp(
                `Olá! Tenho uma dúvida sobre os Termos de Uso da ${MARCA}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Button>
            .
          </p>
        </Bloco>
      )}
    </DocumentoLegal>
  );
}
