# Squad Decisions — Isaac Treinos Ar Livre

Single source of truth for architecture, process, and scope decisions.

---

## 2026-04-01: Team Initialization

**By:** Izak90  
**What:** Squad team initialized for Isaac Treinos Ar Livre development and maintenance  
**Members:** Riggs (Lead), Murtaugh (Frontend), Lorna (QA), Scribe (Logger)  
**Universe:** Lethal Weapon (action, precision, trust themes)  

**Key Principles:**
- All changes must be GitHub Pages compatible (static assets only)
- Design system adherence is non-negotiable
- Decisions are recorded here for team memory
- Personal knowledge in agent `history.md` files

---

## GitHub Pages Constraints (Standing Decision)

**Context:** Hosting on GitHub Pages requires strict compatibility  
**Decision:** All work must be pure static assets — no server-side code, build tools, or dynamic processing  
**Implication:**
- HTML5, CSS3, vanilla JavaScript only
- External APIs must be read-only (no auth tokens in frontend)
- No Node.js dependencies, bundling, or compilation
- Performance optimization via asset minification (done manually or via GitHub's built-in compression)

**Owner:** Riggs (Architecture Lead)  
**Status:** ACTIVE (all work must follow this)

---

## Design System Adherence (Standing Decision)

**Context:** Project has established design tokens, components, and visual patterns  
**Decision:** All new work must follow existing design system without exceptions  
**Implication:**
- CSS changes go through `assets/css/` structure (tokens, components, pages)
- New components must use existing tokens (colors, fonts, spacing)
- Visual variations must be documented in `DESIGN-SYSTEM.md`
- All changes reviewed by Riggs before implementation

**Owner:** Riggs (Architecture Lead)  
**Status:** ACTIVE (all work must follow this)

---

*New decisions and scope updates recorded here as work progresses.*
