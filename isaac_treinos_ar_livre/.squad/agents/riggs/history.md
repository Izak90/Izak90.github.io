# Riggs — Project Memory

## Key Context

**Project:** Isaac Treinos Ar Livre  
**Owner:** Izak90  
**Hosting:** GitHub Pages (static assets only)  
**Team:** Riggs (Lead), Murtaugh (Frontend), Lorna (QA)  

**GitHub Pages Constraint:** No server-side rendering, build tools, or dynamic processing. All work must be pure HTML, CSS, JavaScript.

**Design System:** Established tokens, components, and visual hierarchy in `DESIGN-SYSTEM.md` and `assets/css/`. All changes must follow existing patterns.

---

## Standing Decisions

1. **GitHub Pages Compatibility:** All work must be static assets — HTML, CSS, vanilla JS. No exceptions.
2. **Design System Adherence:** All CSS/HTML changes must follow existing design tokens and component patterns.
3. **Team Routing:** Murtaugh handles implementation, Lorna handles QA, Riggs (you) handles architecture and approval.

---

## Architecture Notes

- **CSS Structure:** `assets/css/base.css` (reset, utilities), `components/` (component-specific), `pages/` (page-specific), design tokens in `design-tokens.css`
- **JS Structure:** `assets/js/main.js` (app initialization), `app.js` (business logic), `security.js` (data protection), `config.js` (configuration)
- **Page Structure:** Root pages (`index.html`, `treino.html`, etc.) + `comunidade/` subfolder with sections
- **Performance:** Optimized CSS is critical for GitHub Pages. Minimize unused CSS, use CSS Grid/Flexbox efficiently.

---

## Learnings

*(To be updated as work progresses)*
