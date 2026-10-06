# Roadmap

## P0 — Stabilise current architecture
Smoke-test PEVS/PEDEx/CF on mobile; summary/training/simulator nav; themes; sticky/search; PEVS 3 difficulties; six PEVS exams; offline update behaviour.

Estado P0 (2026-10-06): validação automatizada local concluída em Chromium com mobile emulado, larguras 320/390/768/1280 e atualização/offline sob o caminho de alojamento. Evidência: [ExecPlan P0](../plans/p0-stabilisation.md). Verificação em dispositivos Android/iOS reais permanece pendente. Próximo passo de desenvolvimento: P1.

## P1 — Automated validation
Add scripts for JSON schema/invariants, duplicate IDs/text, answer indexes, 40/40 split, overlap, topic coverage, local link existence, SW precache path existence.
Uneven A/B/C/D distribution is diagnostic only, not an error.

## P2 — Central UC registry
Introduce data/ucs.json with slug/title/summary/training/simulator/Workbook/difficulties/source status.
Use it progressively for Estudo cards, Curso metadata and eventually precache generation.
Preserve current URLs during migration.

## P3 — Generalise multi-difficulty support
PEVS already has Fácil/Médio/Difícil.
Extend PEDEx/CF only after source audit and only if useful.

## P4 — Onboard remaining UCs
For each UC:
materials → Lista de Saberes → coverage matrix → summary → 80Q bank → 1:1 audit → training/simulator wiring → main index → SW → QA.

Do not generate course-specific content without source material unless explicitly requested.

## P5 — Reduce HTML duplication
When more UCs exist, consider config-driven templates while preserving simple static hosting/offline behaviour. Framework adoption is not a goal by itself.

## P6 — Learning analytics
Optional later: topic mastery, error frequency, exam history, weak-topic dashboard, spaced re-testing. Keep local-first unless cloud sync is requested.
