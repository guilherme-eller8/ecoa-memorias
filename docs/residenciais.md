# Ecoa para residenciais — página e roteiro da conversa

Página: `/residenciais` (fora do Google, sem link a partir do site das famílias). Vai por link direto, 1:1.
Link personalizado: `/residenciais?casa=Residencial%20Ipê` põe o nome da casa no pé da capa, no grupo da família de exemplo e na mensagem do WhatsApp. Cada abertura com nome conta o evento `residenciais_visita` (Vercel Analytics), com a casa.

## Decisões (04/11/2026)
- White label: marca da casa na capa, no grupo e nos convites; Ecoa só na ficha técnica do livro.
- Quem paga: em aberto. A página diz "a casa, a família ou as duas"; o modelo sai da conversa.
- Oferta: conversa presencial + piloto de 3 a 5 moradores (`PILOTO_MORADORES` em `lib/config.ts`).
- Sem preço, sem data de Natal, sem "10 vagas", sem link para `/` ou `/termos`.

## Hipótese e critério
- Hipótese: diretores de residenciais premium de BH veem o livro como diferencial comercial e de relação com as famílias, e topam um piloto.
- Teste: 5 abordagens 1:1 em 3 semanas. A página é material de apoio, não o teste.
- Sucesso: ≥ 2 de 5 aceitam piloto com data e nome do responsável na equipe.
- Morte: 0 pilotos, ou só "manda uma proposta" sem data → B2B espera o fim da edição de Natal.
- Agenda: dez–fev é a produção dos livros de Natal. Proponha início em fevereiro.

## Copy da página [aprovar]
Toda a copy abaixo é nova e precisa do OK do fundador.

**Hero**
- h1: "A voz de cada morador, com a sua marca."
- apoio: "O morador conta por áudio, no WhatsApp. A família recebe cada história no mesmo dia. No fim, um livro de capa dura que toca a voz de quem contou, entregue pela sua casa. A Ecoa faz o resto, sem aparecer."
- fatos: "Piloto com 3 a 5 moradores" · "A Ecoa só aparece na ficha técnica"
- CTA: "Marcar uma conversa"

**O que muda para a sua casa.**
1. "As famílias recebem notícia boa da casa." Cada história gravada chega no mesmo dia a um grupo de WhatsApp só da família, com o nome da casa. O filho que mora longe ouve o pai contar da primeira viagem numa terça-feira qualquer.
2. "Uma atividade com começo, meio e fim." Lembrar e contar a própria vida para alguém que escuta entra na agenda como um projeto de algumas semanas. E termina num livro de capa dura.
3. "Um livro na mesa da recepção." Para quem visita a casa escolhendo onde o pai vai morar, o livro de um morador, com a autorização da família, diz mais que qualquer folder.

**A casa abre a conversa. A Ecoa faz o resto.**
- Da casa: uma pessoa da equipe acompanha os moradores do projeto · um horário na rotina para quem precisa de ajuda para gravar (quem já manda áudio responde sozinho) · a casa apresenta o projeto às famílias e colhe a autorização (o termo vai pronto).
- Da Ecoa: uma pergunta por dia útil · um grupo para cada família, com o nome da casa · edição, fotos, revisão com a família, gráfica e entrega · o QR code em cada capítulo · meia hora de conversa com a equipe antes de começar.

**O que costuma preocupar.** Privacidade · memória frágil (curador autoriza) · lembrança difícil (pular a qualquer momento) · onde aparece a marca · quanto custa ("depende do número de moradores e de quem paga; falamos disso na conversa").

**Fecho:** "Vamos conversar na sua casa." / "Uma visita de uma hora. Se fizer sentido, começamos com um piloto de 3 a 5 moradores."
Quando existir a prova física, acrescentar "com um livro na mão" à visita.

## Roteiro da conversa presencial
Leve: o livro físico (bloqueador: sem ele, adie a visita) e o link personalizado já aberto no celular.

**Descobrir antes de vender (15 min)**
1. Quem decide aqui sobre atividades e sobre o que se oferece às famílias? Quem assina?
2. O que mais pesa hoje: vaga parada, se diferenciar das outras casas ou a relação com as famílias?
3. Como as famílias acompanham o dia a dia do morador? O que elas reclamam?
4. Que atividades de memória já fazem? O que deu certo, o que morreu?
5. Quantos moradores mandam áudio sozinhos no WhatsApp? Quantos precisariam de ajuda?
6. Quem da equipe teria uma hora por semana para isso?
7. Já ofereceram algo pago às famílias? Como foi recebido?

**Objeções e respostas**
| Objeção | Resposta |
|---|---|
| Equipe sem tempo | Uma pessoa de referência; quem tem WhatsApp responde sozinho. O piloto mede o tempo real por morador. |
| LGPD | Voz e histórias são do morador e da família. Nada publicado. Uso pela casa só com autorização escrita; o termo é nosso. |
| Memória frágil / curatela | Piloto só com cognição preservada. Depois, com autorização do curador e revisão da família. |
| Lembrança difícil | Pular qualquer pergunta; a equipe sabe quando parar. |
| Risco para a marca da casa | Prova revisada pela família antes de imprimir; prazo e qualidade em contrato. |
| Família em conflito | A família indica quem entra no grupo; a casa não administra. |
| Morador falece no meio | O livro sai com o que foi gravado. (Não está na página; diga só se perguntarem.) |
| "Vi a Ecoa a R$ 467" | O programa da casa inclui equipe treinada, marca da casa e evento de entrega. Não esconda: explique. |
| Exclusividade | Só depois do piloto, por região e com volume mínimo. |

**Fechar o próximo passo** (sem isso, a conversa não conta): data de início do piloto, nome do responsável na equipe, lista dos 3 a 5 moradores, e quem paga o piloto.

## O que ainda falta decidir
1. Livro físico de amostra.
2. Modelo comercial: quem paga, preço por morador ou pacote, piloto pago ou não.
3. Capacidade de produção em paralelo ao Natal.
4. Fluxo de consentimento (morador capaz × curatelado; uso de voz e imagem pela casa).
5. De que número sai o grupo de WhatsApp com o nome da casa.
6. Quem digitaliza as fotos antigas.
7. Contrato: SLA, responsabilidade por erro, exclusividade.
