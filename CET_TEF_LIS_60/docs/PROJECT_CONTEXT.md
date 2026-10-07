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
240 perguntas / seis exames. Resumo com 45 detalhes nos oito temas e matriz dos 31 itens finais da Lista original. Dados/valores históricos e divergências dos slides identificados: [cobertura PEVS](PEVS_COVERAGE.md).

### PEDEx
- pedex_resumo.html
- pedex_treino.html
- pedex_simulador.html
- pedex_banco_80_perguntas.json = Fácil
- pedex_banco_80_perguntas_medio.json = Médio
- pedex_banco_80_perguntas_dificil.json = Difícil
240 perguntas / seis exames, com matriz de 71 subtópicos da Lista e referências aos slides fornecidos. Evidência: [cobertura PEDEx](PEDEX_COVERAGE.md). Spotting da Aula 4 tem complemento no resumo, separado do âmbito dos bancos.

### CF
- cf_resumo.html
- cf_treino.html
- cf_simulador.html
- cf_banco_80_perguntas.json = Fácil
- cf_banco_80_perguntas_medio.json = Médio
- cf_banco_80_perguntas_dificil.json = Difícil
240 perguntas / seis exames, 12 temas e 20 itens finais da Lista original (17 entradas principais). Resumo detalhado e fontes revistas: [cobertura CF](CF_COVERAGE.md).

## Workbook simulators
simuladores/ contains UC01–UC17 local Workbook-based simulators:
Coaching, Pedagogia, PEVS, Psicologia, Comunicação, Inglês, Biomecânica, Aplicações Digitais, Primeiros Socorros, Nutrição, Marketing, Gestão de Clientes, Satisfação de Clientes, Fitness Online, Ética, Gestão, Empreendedorismo.

Known UCs absent from source Workbook:
Fisiologia, Aulas de Grupo, Avaliação e Prescrição, Populações Especiais, Outdoor, Hidroginástica, Body & Mind, Treino Personalizado, Colaborar em Equipa, Anatomia.

## Assessment conventions
40 questions; 60 min; 90 s/question equivalent; score 0–20; pass 9.5; no negative marking; timeout auto-submit.

## PWA
Current implemented SW cache version: v22 (três dificuldades PEDEx e CF, 2026-10-07).
Strategy: network-first, same-origin runtime cache plus an explicit allowlist of visual CDN dependencies (Tailwind, Font Awesome, Inter and logo), offline cache fallback, app-shell navigation fallback, cleanup of old cet-tef caches. Fonts are cached when requested by a controlled page.
Offline use requires an initial online installation. P0 evidence and remaining device checks: ../plans/p0-stabilisation.md.

## Central UC registry (P2)
`data/ucs.json` is the source for all 27 UC titles/order, native study URLs, Workbook URLs, difficulties/banks, trainer/Drive/Campus metadata and declared source status. `assets/uc-registry.js` validates and derives the compatibility maps used by the main index. Loading failure offers retry; Agenda remains usable, and UC counts stay unknown until loaded.
Source-status metadata distinguishes legacy claims from documented source review (PEVS/PEDEx/CF: source_reviewed, evidence in PEVS_COVERAGE.md, PEDEX_COVERAGE.md and CF_COVERAGE.md). It does not mean external trainer certification. Standalone UC pages and the Workbook index retain their current configuration and URLs. Precache remains a manual literal list, validated by P1.
