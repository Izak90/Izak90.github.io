# Current project state

## Product
ACADEMY is a mobile-first study PWA for CET TEEF. Goal:
reconhecer → compreender → recordar → explicar → aplicar → justificar.

## Main navigation
Bottom tabs:
- Agenda: today/upcoming/calendar/exams/session detail
- Estudo: Centro de Estudo; UC actions Estudar/Treinar/Simular
- Curso: tools first, course progress, all 27 UCs

Main hashes: #agenda, #estudo, #curso.
Main search is shared across these tabs.

Curso tools at the top:
Campus Academy, Google Meet, Workbook, Simulador Oficial (Quilgo), Simulações UC.
Do not add a redundant Centro de Estudo tool card.

## Native study UCs
### PEVS
- centro_estudo/pevs_resumo.html
- pevs_treino.html
- pevs_simulador.html
- pevs_banco_80_perguntas.json = Fácil
- pevs_banco_80_perguntas_medio.json = Médio
- pevs_banco_80_perguntas_dificil.json = Difícil
Each bank: 80 Q, 2 exams x 40.

### PEDEx
- pedex_resumo.html
- pedex_treino.html
- pedex_simulador.html
- pedex_banco_80_perguntas.json
Bank audited 1:1 against Lista de Saberes.

### CF
- cf_resumo.html
- cf_treino.html
- cf_simulador.html
- cf_banco_80_perguntas.json
Summary and bank audited against Lista de Saberes.

## Workbook simulators
simuladores/ contains UC01–UC17 local Workbook-based simulators:
Coaching, Pedagogia, PEVS, Psicologia, Comunicação, Inglês, Biomecânica, Aplicações Digitais, Primeiros Socorros, Nutrição, Marketing, Gestão de Clientes, Satisfação de Clientes, Fitness Online, Ética, Gestão, Empreendedorismo.

Known UCs absent from source Workbook:
Fisiologia, Aulas de Grupo, Avaliação e Prescrição, Populações Especiais, Outdoor, Hidroginástica, Body & Mind, Treino Personalizado, Colaborar em Equipa, Anatomia.

## Assessment conventions
40 questions; 60 min; 90 s/question equivalent; score 0–20; pass 9.5; no negative marking; timeout auto-submit.

## PWA
Current implemented SW cache version: v19 (P0 stabilisation, 2026-10-06).
Strategy: network-first, same-origin runtime cache plus an explicit allowlist of visual CDN dependencies (Tailwind, Font Awesome, Inter and logo), offline cache fallback, app-shell navigation fallback, cleanup of old cet-tef caches. Fonts are cached when requested by a controlled page.
Offline use requires an initial online installation. P0 evidence and remaining device checks: ../plans/p0-stabilisation.md.
