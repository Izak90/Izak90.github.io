# Roadmap

## P0 — Stabilise current architecture
Smoke-test PEVS/PEDEx/CF on mobile; summary/training/simulator nav; themes; sticky/search; PEVS 3 difficulties; six PEVS exams; offline update behaviour.

Estado P0 (2026-10-06): validação automatizada local concluída em Chromium com mobile emulado, larguras 320/390/768/1280 e atualização/offline sob o caminho de alojamento. Evidência: [ExecPlan P0](../plans/p0-stabilisation.md). Verificação em dispositivos Android/iOS reais permanece pendente. Validação estrutural automatizada adicionada em P1.

## P1 — Automated validation
Add scripts for JSON schema/invariants, duplicate IDs/text, answer indexes, 40/40 split, overlap, topic coverage, local link existence, SW precache path existence.
Uneven A/B/C/D distribution is diagnostic only, not an error.

Estado P1 (2026-10-06): concluído. Comando `node scripts/validate.cjs`; utilização e limites em [scripts/README.md](../scripts/README.md); evidência no [ExecPlan P1](../plans/p1-validation.md). Registo central introduzido em P2.

## P2 — Central UC registry
Introduce data/ucs.json with slug/title/summary/training/simulator/Workbook/difficulties/source status.
Use it progressively for Estudo cards, Curso metadata and eventually precache generation.
Preserve current URLs during migration.

Estado P2 (2026-10-07): registo central e consumo pelo índice implementados. URL e ordem preservados; precache v20 inclui o JSON e o adaptador. Índice Workbook e geração de precache permanecem etapas posteriores. Evidência: [ExecPlan P2](../plans/p2-registry.md).

## P3 — Generalise multi-difficulty support
PEVS already has Fácil/Médio/Difícil.
Extend PEDEx/CF only after source audit and only if useful.

Estado inicial P3 (2026-10-07; histórico, conclusão abaixo): auditoria de entrada realizada sobre as duas Listas de Saberes e as Aulas 1–4 recuperadas das pastas públicas. Identificadas duplicações conceptuais em CF e cobertura parcial de saberes compostos em PEDEx; as declarações legadas de 100% passaram a não verificadas. Motores já suportam três dificuldades. Primeira correção da base aplicada: nove perguntas revistas e opções dos dois bancos baralhadas com recálculo das chaves, mantendo IDs/temas/exames. Novos bancos permanecem pendentes da revisão individual integral da base. Evidência e matriz: [auditoria P3](P3_SOURCE_AUDIT.md); [ExecPlan P3](../plans/p3-difficulties.md).

## P4 — Onboard remaining UCs
For each UC:
materials → Lista de Saberes → coverage matrix → summary → 80Q bank → 1:1 audit → training/simulator wiring → main index → SW → QA.

Do not generate course-specific content without source material unless explicitly requested.

## P5 — Reduce HTML duplication
When more UCs exist, consider config-driven templates while preserving simple static hosting/offline behaviour. Framework adoption is not a goal by itself.

## P6 — Learning analytics
Optional later: topic mastery, error frequency, exam history, weak-topic dashboard, spaced re-testing. Keep local-first unless cloud sync is requested.

Atualização P3 — PEDEx (2026-10-07): revisão das fontes fornecidas concluída; resumo ampliado, três bancos de 80 perguntas, seis exames, registo e precache v21. [Cobertura PEDEx](PEDEX_COVERAGE.md) / [ExecPlan](../plans/pedex-source-refresh.md). Revisão de CF concluída na atualização seguinte.

Atualização P3 — CF (2026-10-07): concluído. Resumo detalhado pelas quatro aulas e pelos 20 itens finais da Lista; três bancos de 80, seis exames, registo e precache v22. [Cobertura CF](CF_COVERAGE.md) / [ExecPlan](../plans/cf-source-refresh.md). P3 concluído para PEDEx/CF. O próximo passo do roadmap é P4: integrar outra UC quando forem fornecidos os respetivos materiais.

Atualização PEVS (2026-10-07): revisão dos sete PDFs fornecidos, resumo com 45 detalhes, matriz dos 31 itens finais da Lista e três bancos de 80 revistos. Mantidos URLs, IDs e seis partições; corrigidos metadados e divergências de fonte. [Cobertura PEVS](PEVS_COVERAGE.md) / [ExecPlan](../plans/pevs-source-refresh.md). P4 continua a depender de materiais da próxima UC.
