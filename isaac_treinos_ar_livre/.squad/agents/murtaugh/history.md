# Murtaugh — Project Memory

## Key Context

**Project:** Isaac Treinos Ar Livre  
**Owner:** Izak90  
**Hosting:** GitHub Pages (static assets only)  
**Team:** Riggs (Lead), Murtaugh (you), Lorna (QA)  

---

## Design System Essentials

**Design Tokens** (in `assets/css/design-tokens.css`):
- Colors: Primary, secondary, accent, text, backgrounds
- Typography: Font families, sizes, weights
- Spacing: Padding, margin units
- Borders: Radius, widths
- Shadows: Drop shadows, text shadows

**Component Patterns** (in `assets/css/components/`):
- Card: `.card` class with nested elements
- Button: `.btn`, `.btn-primary`, `.btn-secondary` variants
- Badge: `.badge`, color variants
- Header: Navigation, logo, menu structure
- Community submenu: `community-submenu.css`

**Page Styles** (in `assets/css/pages/`):
- Homepage: `homepage.css`
- Pricing: `pricing.css`
- Schedule: `schedule.css`
- Dashboard: `dashboard.css`
- Etc.

---

## CSS Organization Rules

1. **Base styles** go in `assets/css/base.css` or utilities
2. **Component-specific styles** go in `assets/css/components/{component-name}.css`
3. **Page-specific styles** go in `assets/css/pages/{page-name}.css`
4. **Never override components** — create variants instead
5. **Use design tokens** — no hardcoded colors or spacing

---

## GitHub Pages Constraints

- No build tools (no webpack, gulp, etc.)
- No frameworks (React, Vue, etc.)
- Pure vanilla JavaScript only
- CSS and HTML directly in `assets/`
- All Python/Node scripts are local dev tools only (they don't ship with the site)

---

## JavaScript Patterns

- `assets/js/main.js` — app initialization
- `assets/js/app.js` — business logic
- `assets/js/security.js` — data protection (localStorage cleanup, sensitive data handling)
- `assets/js/config.js` — configuration constants

---

## Learnings

*(To be updated as work progresses)*
