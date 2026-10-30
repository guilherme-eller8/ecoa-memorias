# Brief visual — Ecoa Memórias

Fonte: `docs/direcao.md` e o design system do `CLAUDE.md`. Vale para toda imagem que entra na landing.

## Promessa e público
- O que o produto prova: as histórias de quem a família ama, contadas por áudio, viram um livro de capa dura com a voz original a um toque.
- Quem compra: filhos e netos adultos (30–55 anos), que presenteiam pai, mãe, avô ou avó no Natal.
- Quem aparece nas imagens: famílias brasileiras comuns, de outras décadas, em fotos de arquivo. Nunca clientes, depoimentos ou pessoas públicas.

## Paleta (hex)
- Fundo: #F5EFE4 (pólen) e #FFFDF8 (papel)
- Primária: #26211D (tinta)
- Acento: #1F3D33 (floresta)
- Capas: #6E2A2A, #C9A49A, #A9C3CF, #3F7A8C, com #B08D57 só no hot stamping
- Proporção: ~70 pólen/papel, ~20 tinta, ~10 floresta

## Tipografia (para mockups e textos sobre imagem)
- Títulos e texto: Newsreader. Nada de texto sobre foto.

## Direção de foto
- Antigas (a maioria): fotografias impressas de família, dos anos 1940 a 1970, em P&B ou sépia, com o papel e o grão da cópia. Enquadramento amador e honesto: gente parada diante da casa, casamento na porta da igreja, criança na cerca. Brasil (interior, Minas de preferência); nada americano.
- Cena atual (só a ceia): luz de abajur, casa brasileira simples. Sem rosto em destaque: mãos, mesa, o livro.
- Tratamento único: o site aplica `.photo-antiga` (margem de papel, vinheta) e `.photo` (saturate .86, contrast .96, sepia .06, grão). Na exportação, as P&B saem normalizadas para o mesmo nível de preto e branco.
- Proporção: 4:5 em todas as antigas; 21:9 na ceia.

## Ilustração e ícones
- Feitos em código (capas, livro aberto, celular, WhatsApp, bilhetes). Nenhuma ilustração gerada.

## Proibido (além da ban list da skill)
- Pessoas geradas por IA, de qualquer tipo.
- Pessoa pública ou identificável num contexto que sugira ser cliente da Ecoa.
- Foto antiga "nova", feita com filtro de envelhecimento.
- Texto legível dentro da foto (placas, jornais, legendas escritas na cópia).
- Nomes de pessoas no `alt` ou ao redor da foto.

## Referências aprovadas
- `docs/direcao.md` (a página é o próprio livro)
