# Squad Routing Rules

Work assignment rules for the Isaac Treinos Ar Livre team.

---

## Primary Routing

| Task Type | Primary | Secondary | Notes |
|-----------|---------|-----------|-------|
| Architecture, GitHub Pages compatibility, design validation | Riggs | — | Lead approval on major changes |
| HTML pages, CSS, JavaScript implementation | Murtaugh | Riggs (review) | Follow design system strictly |
| Testing, quality checks, cross-browser validation | Lorna | Murtaugh (coordinate) | All code changes need QA review |
| Session logs, decision merging, memory updates | Scribe | — | Fire-and-forget after work batches |

---

## Routing Signals

- **"Riggs..."** → Architecture/design decision
- **"Murtaugh..."** → Build/implement feature
- **"Lorna..."** → Test/validate quality
- **"Team..."** → Parallel work (Riggs + Murtaugh + Lorna)
- **Uncertain** → Default to Riggs (Lead) for triage + routing

---

## Decision Gates

- GitHub Pages compatibility → **Riggs approval required**
- Design system adherence → **Riggs approval required**
- Feature release → **Lorna QA sign-off required**

---

## Skill-Based Routing

Check `.squad/skills/` for domain expertise before routing:
- GitHub Pages quirks/constraints → `pages-optimization` skill
- CSS component patterns → `design-system-components` skill
- Cross-browser compatibility → `browser-testing` skill
