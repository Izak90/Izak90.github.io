# ACADEMY — Codex instructions

Project: PWA de estudo para o CET Técnico/a Especialista em Exercício Físico (TEEF), turma CET_TEF_LIS_60.

Read detailed docs only when relevant:
- docs/PROJECT_CONTEXT.md
- docs/ARCHITECTURE.md
- docs/DESIGN_SYSTEM.md
- docs/CONTENT_RULES.md
- docs/QUESTION_BANKS.md
- docs/ROADMAP.md
- docs/RELEASE_CHECKLIST.md
- PLANS.md

## Non-negotiable rules
- Preserve the current stack unless explicitly asked: static HTML, vanilla JS, shared CSS, Tailwind CDN, JSON banks, localStorage, service worker/PWA. No mandatory build step.
- UI/study copy uses pt-PT.
- Fitness Academy/trainer materials are primary for study content. Do not silently replace source terminology/values with outside knowledge.
- Reuse shared assets; do not copy common CSS/JS into each UC.
- Shared assets: assets/app.css, study.css, study.js, training.css, training.js, simulator.css, simulator.js.
- Do not hard-code sticky offsets already measured by shared JS.
- PEVS bank filenames are fixed:
  - pevs_banco_80_perguntas.json = Fácil
  - pevs_banco_80_perguntas_medio.json = Médio
  - pevs_banco_80_perguntas_dificil.json = Difícil
- Standard bank: 80 questions, 2 exams x 40, disjoint, all required themes in both exams.
- Answer positions are randomized in stored JSON. Do not force equal A/B/C/D distribution. Recalculate answer indexes after shuffling.
- Hard questions use "single best answer": distractors may be partially true, but exactly one option must be the most complete/precise answer.
- Exam: 40 Q, 60 min, 0–20, pass >=9.5, no negative marking, unanswered warning, timeout auto-submit, no answer reveal before submission.
- Training: answer first, confirm, immediate feedback/explanation, error review queue namespaced by UC and difficulty.
- Local Workbook simulator label: "Simulação UC — Workbook". Never call it official.
- Service worker is network-first with offline fallback. Add/rename offline files => update precache and bump cache version.
- Inspect actual paths before editing. Validate JSON/HTML/JS and links before finishing.

## Workflow
Small changes: edit directly.
Cross-file/shared-engine/service-worker/new-UC work: read PLANS.md and use an ExecPlan.
Use repo skills in .codex/skills/ when relevant.
