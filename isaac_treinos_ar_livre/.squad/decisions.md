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

## 2026-04-30: HTML/CSS/JS Pattern Consistency (Directive)

**By:** Izak90  
**What:** All pages must follow identical design patterns, color palette, structure, and use Lucide icons consistently  
**Why:** Maintain visual and structural coherence across website. Users experience a unified brand and navigation.  
**Rule:** 
- Every page uses `assets/css/main.css` + shared component CSS
- Every page includes Lucide icons via `https://unpkg.com/lucide@0.294.0/dist/umd/lucide.min.js`
- Color palette defined in `assets/css/design-tokens.css` — no hardcoded colors
- Structure: header (app-header), main content, footer (app-footer) on every page
- No page-specific color variations without Lead approval

**Owner:** Riggs (Architecture Lead)  
**Status:** ACTIVE (enforce on every page)

---

## 2026-04-30: Shared CSS & JS Libraries (Directive)

**By:** Izak90  
**What:** All CSS and JavaScript definitions must live in shared, centralized files — never duplicated or page-specific  
**Why:** Reduce code duplication, enable bulk updates, simplify maintenance.  
**Rule:**
- Global CSS: `assets/css/main.css`, `assets/css/components.css`, `assets/css/design-tokens.css`, `assets/css/layout.css`, `assets/css/utilities.css`
- Page-specific CSS: `assets/css/pages/{page-name}.css` (one per page, imported only by that page)
- Global JS: `assets/js/app.js`, `assets/js/config.js`, `assets/js/components.js`, `assets/js/security.js`
- Page utilities: small shared functions in `assets/js/` (no inline scripts in HTML except config)
- **No CSS or JS code directly in HTML files** (except minimal config or event listeners if absolutely necessary)

**Owner:** Murtaugh (Frontend Dev) + Riggs (Architecture Lead)  
**Status:** ACTIVE (audit on every change)

---

## 2026-04-30: CSS/JS Deduplication Check (Directive)

**By:** Izak90  
**What:** Before creating any new `.css` or `.js`, verify that the style or function does not already exist in shared files  
**Why:** Prevent duplication, maintain DRY principle, reduce bundle size.  
**Rule:**
- **CSS check:** Search `assets/css/` (especially tokens, components, pages) using grep or visual scan
- **JS check:** Search `assets/js/` for matching function names, object keys, or module names
- **Existing match found?** Reuse, extend, or document the existing code instead of creating new
- **Add to existing?** If extending, update the related `.css` or `.js` file and notify Scribe (document in history)
- **Tool:** When in doubt, ask Riggs to verify before creating new files

**Owner:** Murtaugh (Frontend Dev) + Lorna (QA validation)  
**Status:** ACTIVE (verify before every new file)

---

*New decisions and scope updates recorded here as work progresses.*
