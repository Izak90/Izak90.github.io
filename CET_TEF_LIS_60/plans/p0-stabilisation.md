# P0 — Estabilizar a arquitetura atual
## Goal
Validar PEVS/PEDEx/CF em viewport mobile, navegação, temas, pesquisa/sticky, treino, exames e atualização/offline; corrigir defeitos funcionais encontrados.
## Current state
Stack estática, motores partilhados, cinco bancos e SW v18. Auditoria estática prévia passou; faltava validação em navegador. Temporizadores por callbacks e observação de temas com offset fixo.
## Constraints
Preservar URLs, conteúdos, bancos, stack, network-first e configurações por UC. Não realizar migrações P2/P5 nem publicação.
## Plan
1. Preparar smoke tests locais e reproduzir os problemas.
2. Corrigir defeitos de P0 nos motores e no offline.
3. Validar fluxos mobile, exames, bancos, links e atualização do SW.
4. Registar resultados e limitações.
## Validation
Navegador local; viewports mobile/desktop; treino por UC/dificuldade; seis exames PEVS e exames PEDEx/CF; timeout com suspensão; instalação/atualização/offline; sintaxe e invariantes estáticas.
## Progress
- [x] Ler instruções, skills e documentação; inspecionar motores.
- [x] Reproduzir e corrigir defeitos.
- [x] Completar validação automatizada local.
## Decisions
Correções incrementais dentro de P0. Bancos e conteúdos são preservados.
- Manter os motores Workbook embutidos; aplicar as mesmas correções aos 17 ficheiros. Extração para motor partilhado pertence a P5.
- Preservar Tailwind CDN; cache de recursos visuais por lista explícita no SW v19, sem migração de stack.
- Observação de temas e scroll margins com alturas medidas.
- Temporizadores com deadline real, ressincronização e bloqueio após submissão; timeout prevalece sobre confirmação tardia.
- O teste de atualização serve uma versão sintética v18 do SW atual, seguida de v19, sem editar os ficheiros durante o teste.
- Metadados de dificuldade, registo central, deduplicação e auditoria de fontes ficam fora de P0.
## Result
Validação em 2026-10-06, Chromium/Chrome headless com toque e viewport 390×844; larguras adicionais 320, 768 e 1280.
- Motores nativo/Workbook: 361 verificações aprovadas, sem erros JavaScript. Navegação, temas/persistência, pesquisa PEVS, seleção manual de temas, treinos 10/20/tema/revisão, cinco filas UC/dificuldade, seis exames PEVS e quatro PEDEx/CF, correção/classificação/repetição e timeout após suspensão/confirmação tardia.
- Layout: 56 verificações aprovadas nas três larguras e pesquisa após resize; screenshots claro/escuro/pesquisa inspecionadas.
- Offline/atualização: 31 verificações offline aprovadas na raiz e sob /CET_TEF_LIS_60/; a última ronda teve 34 verificações ao incluir três regressões adicionais de timeout com exame completamente respondido, com cache HTTP limpo e páginas precached ainda não visitadas. Cache v18 substituído por v19, recursos locais/visuais disponíveis e cache alheio preservado.
- Estática: 30 HTML sem IDs duplicados/caminhos locais em falta; 36 scripts compilados; cinco bancos com invariantes 80Q/40+40/temas/índices válidos; 45 caminhos locais de precache existentes; git diff --check limpo.
- Único aviso online: aviso padrão do Tailwind CDN. Nenhum erro JavaScript.
- Sem alterações a conteúdos, JSON, URLs ou publicação.

Reprodução: definir PLAYWRIGHT_MODULE para o módulo Playwright/Playwright-core instalado separadamente e, opcionalmente, BROWSER_PATH para Chrome. Executar `node scripts/p0-smoke.cjs`; grupos opcionais: `core`, `workbook`, `responsive`, `pwa`. Servidor local é criado/fechado pelo script. Relatório JSON e screenshots são escritos no diretório temporário do sistema. Não há build obrigatório da aplicação.

Limitações: mobile emulado em Chromium; verificação física em Android/iOS/Safari permanece pendente. Os resumos PEDEx/CF não têm controlos de pesquisa; os fluxos existentes foram validados, sem adicionar essa funcionalidade. Fontes externas precisam de ser solicitadas online por uma página controlada. Instalação PWA em dispositivos reais e exatidão pedagógica perante fontes não fazem parte desta evidência automatizada.
