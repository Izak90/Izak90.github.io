# Codex handoff

Copy this pack into the repository root.

Codex CLI automatically benefits from root AGENTS.md. Repo-scoped skills live in:
.codex/skills/<skill>/SKILL.md

Skills included:
- academy-frontend
- academy-question-bank
- academy-uc-onboarding
- academy-pwa-release
- academy-content-audit
- academy-qa

docs/agents contains human-readable specialist role cards. Treat them as role instructions for multi-agent orchestration; do not assume every Codex runtime auto-discovers that directory.

Recommended first prompt:
"Read AGENTS.md and docs/PROJECT_CONTEXT.md, inspect the repository, and do not change files yet. Report mismatches between documentation and filesystem, technical debt, and the safest next roadmap step."

Recommended new-UC prompt:
"Use academy-uc-onboarding and academy-content-audit. First inventory the UC sources and produce the Lista de Saberes coverage matrix. Do not generate unsupported course content."

Recommended question-bank prompt:
"Use academy-question-bank. Audit source coverage first, then validate all JSON/exam invariants. For hard questions use single-best-answer design without genuine ambiguity."
