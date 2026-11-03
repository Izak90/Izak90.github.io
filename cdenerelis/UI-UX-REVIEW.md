# Revisão UI/UX — Crónicas de Enerelis

## Atualização de 3 de novembro de 2026

Complementos após indicação concreta do utilizador: título e imagem de abertura alinhados pelo topo, assinatura do cabeçalho retirada, menu aumentado e validade de Máscaras corrigida para 31/12/2026. A lista passou para uma barra fixa com contador e confirmação de cada ação; abre num diálogo para rever/remover sem deslocar a página e permite enviar diretamente por WhatsApp. A seleção permanece entre páginas. Verificado no Edge a 320, 390, 768 e 1440 px: contador, adicionar/remover, reabertura, persistência, navegação entre coleção e ficha, fecho por Escape e botão, retorno do foco e ausência de overflow horizontal. Em desktop/tablet, verificado também o alinhamento dos elementos da abertura.

Correção após nova revisão: a configuração antiga em `localStorage` podia substituir os conteúdos publicados. As páginas públicas passaram a usar a versão publicada; os rascunhos permanecem no editor e em `?preview=1`. A gravação foi identificada como **Guardar rascunho**. Testado no Edge com conteúdos antigos simulados: logótipos, preço de Máscaras e email atuais no site público; rascunho anterior preservado, editável e isolado depois de guardar. A validação inicial abaixo não tinha coberto este cenário.

As dez correções do TODO foram implementadas: identidade no cabeçalho, rodapé simplificado, telefone omitido como texto, remoção da frase de abertura indicada, packs e preços atualizados, remoção de edições especiais, portes 05–08, remoção do aviso de pré-venda expirado, contactos alinhados com email e textos de contacto revistos. O número permanece necessário na ligação WhatsApp; não aparece como texto de contacto.

O editor permite configurar o logótipo textual e o email. A exportação inclui os novos PNG e converte ambos os logótipos carregados em recursos próprios. O build de produção publica apenas os recursos da aplicação em `dist`, com cabeçalhos para Cloudflare Pages.

Verificações desta atualização:

- `npm.cmd test`: três testes passaram, cobrindo condições comerciais, HTML público, dados estruturados, recursos locais e exportação de logótipos.
- `npm.cmd run build`: 53 ficheiros gerados para produção.
- Edge sem interface, através de Playwright: início, coleção, Máscaras e editor em 320, 390, 768 e 1440 px; 16 combinações sem overflow horizontal, imagens em falta, respostas HTTP de erro ou erros JavaScript.
- Pesquisa sem acentos, limpeza da pesquisa e adição à lista verificadas nas quatro larguras; capturas desktop e móvel inspecionadas.

Não foram testados nesta atualização Safari/iOS, dispositivo móvel real, autenticação ou publicação remota. O editor continua local; a gestão autónoma autenticada e o lançamento estão descritos no roadmap. A validação local não confirma DNS ou funcionamento na Cloudflare.

As secções seguintes são o registo histórico da revisão anterior.

Data: 30 de outubro de 2026.

## Âmbito

Revisão do site público e do editor visual: início, coleção, ficha de livro, contactos, edição, gravação, cópias e exportação. Mantêm-se a identidade visual, a stack estática e o foco em livros, autora e contactos. Os conteúdos e preços não foram alterados.

## Problemas confirmados e correções

| Prioridade | Evidência antes da revisão | Correção |
| --- | --- | --- |
| Alta | Sair do editor após uma alteração sem guardar perdia a edição sem aviso. | Aviso nativo ao sair com alterações pendentes; a gravação e reposição limpam esse estado. |
| Média | Pesquisar `preludio` devolvia zero resultados. | Pesquisa sem distinção de acentos/maiúsculas, reconhecimento de `03`, `vol. 03` e `volume 3`, contador de resultados e limpeza da pesquisa. |
| Média | A capa ocupava o início da ficha no telemóvel, deixando título, preço e contacto abaixo da primeira área visível. | Resumo do livro e contactos apresentados antes da capa no telemóvel. |
| Média | Na coleção a 390 px, 50 ligações/controlos tinham menos de 32 px de altura; vários textos de apoio tinham apenas 8–10 px. | Áreas de toque aumentadas, tipografia secundária maior, espaços e focos mais claros. Os atalhos dos packs têm pelo menos 32 px de altura, e os controlos principais pelo menos 44 px. |
| Média | Axe identificou três ocorrências de contraste insuficiente nos textos de ajuda do editor, em ambas as resoluções analisadas. | Cores e tamanhos dos textos de ajuda corrigidos. Nenhuma ocorrência nas verificações automáticas finais destas páginas. |
| Média | O botão de guardar ficava longe dos campos numa edição longa no telemóvel. | Barra de gravação acessível na base do ecrã, com estado das alterações. |
| Média | A validação não encaminhava consistentemente para o campo a corrigir. | Validação de ISBN e campos obrigatórios, números inteiros onde aplicável, indicação de erro e foco no controlo inválido. |
| Média | A atualização integral da pré-visualização podia perder posição e contexto de navegação. | Posição de scroll e pesquisa preservadas; navegação interna com fragmentos mantém o modo de pré-visualização. |
| Baixa | O percurso entre a montra e a encomenda por mensagem não estava explicado em conjunto. | Guia expansível com três passos: escolher, enviar mensagem e confirmar total/portes/pagamento com a autora. |

## Verificação executada

- Edge, através de Playwright, a 320, 390, 768 e 1440 px.
- Ausência de overflow horizontal nas quatro páginas revistas em cada largura.
- Pesquisa por título sem acentos, maiúsculas e número de volume; estado vazio, contador e reposição de resultados.
- Título/preço/contactos visíveis antes da capa na ficha móvel.
- Aviso ao sair sem guardar, gravação, recarregamento, erros de ISBN e números fracionários e foco no campo inválido.
- Preservação do scroll e navegação interna da pré-visualização; isolamento entre edições locais e site público.
- Transferência de configuração e ZIP completo; funcionamento offline dos módulos atualizados e da pesquisa.
- Axe com regras WCAG 2 A/AA e WCAG 2.1 AA: início, coleção, ficha de Prelúdio e editor, a 390 e 1440 px. Resultado final: zero violações detetadas nessas oito análises.
- Verificação de sintaxe dos módulos alterados e regeneração das páginas estáticas.

## Ficheiros

- `render.js`: pesquisa, mensagens, percurso de encomenda e organização da ficha.
- `runtime-v4.js`: pesquisa, reposição de resultados e contexto da pré-visualização.
- `style.css`: leitura, áreas de toque, foco e apresentação móvel.
- `admin.html`, `editor.js`, `editor.css`: gravação, estados e validação do editor.
- `exporter.js`: recursos com versão para atualização e utilização offline.
- `build.mjs`: comando local `node build.mjs` para regenerar as páginas e o pacote PWA.
- HTML de início, coleção e livros, e `sw.js`: regenerados a partir da configuração existente.

## Limites da avaliação

As verificações automáticas não constituem certificação de acessibilidade nem substituem testes com utilizadores ou leitores de ecrã. A análise de contraste incidiu no tema publicado; outras combinações escolhidas no editor precisam de revisão própria. O editor continua a guardar localmente e a exportar o site, sem publicação remota autenticada.

## Descoberta e contacto — 30/10/2026

Implementados: entrada pelo primeiro volume, apresentação breve sem spoilers, sinopse expansível, FAQ configurável, lista persistente para WhatsApp e poupança de packs calculada com preços válidos. Suporte a amostras de até oito páginas com ampliação acessível e campos opcionais de dimensões. Sem páginas ou ISBNs confirmados, não se inventam dados. O PoC mantém exportação local, sem simular autenticação ou publicação direta.

Verificação executada: regressão a 320/390/768/1440 px, pesquisa, validação, backup/ZIP, pré-visualização e offline. Testes adicionais a 390/1440 px: lista entre páginas, WhatsApp, FAQ, upload e diálogo de amostras, teclado/foco, configurações anteriores e exportação/cache das imagens. Zero violações nas análises axe WCAG A/AA executadas, incluindo diálogo. Não substitui verificação com leitores de ecrã e equipamentos iOS reais.

## Personalização aplicada no PoC — 30/10/2026

Guardar e aplicar atualiza a aplicação no navegador, as próximas visitas e outros separadores abertos. As alterações em edição ficam na pré-visualização até serem guardadas. A reposição das definições iniciais está disponível junto ao início do editor, pede confirmação e atualiza também a aplicação. Incluídas três combinações de cores, mantendo ajuste individual de fontes e cores. Livros criados localmente abrem através da página da coleção até à exportação das páginas definitivas.

Testes executados a 320/390/1440 px: aplicação após guardar, persistência após recarregar, atualização entre separadores, combinações de cores, novos livros, reposição/cancelamento, validação e axe sem violações. Regressão geral a 320/390/768/1440 px e testes de descoberta, amostras, WhatsApp e offline também passaram. O botão Ver guardado abre a configuração aplicada, sem guardar alterações pendentes implicitamente. Não existe publicação remota a partir do editor neste PoC.
