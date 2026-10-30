# Revisão UI/UX — Crónicas de Enerelis

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
