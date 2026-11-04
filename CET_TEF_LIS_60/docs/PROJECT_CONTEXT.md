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

### Psicologia do Exercício
- centro_estudo/psiex_resumo.html, psiex_treino.html, psiex_simulador.html
- psicologia-do-exercicio_banco_80_perguntas.json = Fácil
80 perguntas / dois exames; 11 temas e 51 itens específicos da Lista. Fontes fornecidas: slides (89 páginas, versão 29/06/2026) e Lista (3 páginas). Matriz e limites: [cobertura Psicologia](PSIEX_COVERAGE.md). Workbook anterior preservado.

### Comunicação no Fitness
- `centro_estudo/comunicacao-no-fitness_resumo.html`, `comunicacao-no-fitness_treino.html`, `comunicacao-no-fitness_simulador.html`.
- `comunicacao-no-fitness_banco_80_perguntas.json`: um banco Fácil, 80 perguntas e dois exames de 40, com 16 temas nos dois exames.
- Quatro aulas e Lista fornecidas em ZIP; 108 marcadores transcritos (incluindo entradas-mãe, subentradas e competências repetidas), ligados a conteúdo explícito no resumo. Perguntas têm associação temática, sem alegar avaliação isolada de cada componente. [Cobertura e ressalvas](COMUNICACAO_COVERAGE.md).
- Registo e precache integrados; motores partilhados e Workbook preservados. Cache atual: v27, 64 entradas locais.

### Ética e Deontologia no Fitness
- `centro_estudo/etica-e-deontologia-no-fitness_{resumo,treino,simulador}.html` e banco único Fácil `etica-e-deontologia-no-fitness_banco_80_perguntas.json`.
- 40 itens principais da Lista (9 valores, 31 legislação), 16 temas, 80 perguntas e dois exames de 40 sem sobreposição. [Cobertura e limites das fontes](ETICA_COVERAGE.md).
- Aulas de José Júlio Vale Castro, março de 2026; Lista de fevereiro de 2026. Imagens do checklist e funções do DT revistas visualmente. Conferência jurídica pontual em fontes oficiais separada do conteúdo base.
- Workbook UC15 preservado; armazenamento isolado por UC/dificuldade; precache v28 acrescenta as quatro páginas/banco.

### Marketing no Fitness
- `centro_estudo/marketing-no-fitness_{resumo,treino,simulador}.html` e banco único Fácil `marketing-no-fitness_banco_80_perguntas.json`.
- Oito temas correspondentes aos oito grupos da Lista, 23 marcadores com cobertura explícita no resumo e 80 perguntas. Dois exames disjuntos, cada um com cinco perguntas de cada tema (40 no total).
- Fontes: quatro aulas de 08/04/2026 e Lista intitulada «Estratégia de Marketing e Conteúdos no Fitness». [Matriz e limites](MARKETING_COVERAGE.md). Cálculos de estudo têm pressupostos explícitos; LTV simplificado não é lucro e métricas não provam causa.
- Workbook UC11 preservado; motores partilhados e armazenamento isolado. SW v29 adiciona três páginas e banco.

## Workbook simulators
simuladores/ contains UC01–UC17 local Workbook-based simulators:
Coaching, Pedagogia, PEVS, Psicologia, Comunicação, Inglês, Biomecânica, Aplicações Digitais, Primeiros Socorros, Nutrição, Marketing, Gestão de Clientes, Satisfação de Clientes, Fitness Online, Ética, Gestão, Empreendedorismo.

Known UCs absent from source Workbook:
Fisiologia, Aulas de Grupo, Avaliação e Prescrição, Populações Especiais, Outdoor, Hidroginástica, Body & Mind, Treino Personalizado, Colaborar em Equipa, Anatomia.

## Summary readability
PEVS, PEDEx, CF and Psicologia use the common reading format in `assets/study.css`: larger body text, paragraph spacing, clear concept headings, visible list markers and separate source notes (`study-source`). Future UC summaries inherit these rules through the same classes. Contract: [design system](DESIGN_SYSTEM.md); implementation: [ExecPlan](../plans/summary-readability.md).

Learning structure applied to all 41 summary themes (8 PEVS, 12 CF, 10 PEDEx including the Aula 4 complement, 11 Psicologia): main idea, full explanation with selective emphasis/lists, recap and a retrieval question with collapsed reference answer. Examples, cautions and comparisons have shared visual components. The PEDEx complement remains outside the question-bank scope. Evidence: [learning-format ExecPlan](../plans/summary-study-format.md).

## Assessment conventions
40 questions; 60 min; 90 s/question equivalent; score 0–20; pass 9.5; no negative marking; timeout auto-submit.

## PWA
Current implemented SW cache version: v29 (Marketing no Fitness, 2026-11-04; 72 entradas locais).
Strategy: network-first, same-origin runtime cache plus an explicit allowlist of visual CDN dependencies (Tailwind, Font Awesome, Inter and logo), offline cache fallback, app-shell navigation fallback, cleanup of old cet-tef caches. Fonts are cached when requested by a controlled page.
Offline use requires an initial online installation. P0 evidence and remaining device checks: ../plans/p0-stabilisation.md.

## Central UC registry (P2)
`data/ucs.json` is the source for all 27 UC titles/order, native study URLs, Workbook URLs, difficulties/banks, trainer/Drive/Campus metadata and declared source status. `assets/uc-registry.js` validates and derives the compatibility maps used by the main index. Loading failure offers retry; Agenda remains usable, and UC counts stay unknown until loaded.
Source-status metadata distinguishes legacy claims from documented source review (PEVS/PEDEx/CF/Psicologia: source_reviewed, evidence in PEVS_COVERAGE.md, PEDEX_COVERAGE.md and CF_COVERAGE.md). It does not mean external trainer certification. Standalone UC pages and the Workbook index retain their current configuration and URLs. Precache remains a manual literal list, validated by P1.

Centro de Estudo: filtro de estado Todas/Disponíveis/Em Progresso/Por preparar e filtro independente de avaliação Todas/Teóricas/Práticas. Em Progresso exclui concluídas pelo calendário e inclui não iniciadas. A presença de Workbook determina avaliação teórica; restantes UC são práticas.
