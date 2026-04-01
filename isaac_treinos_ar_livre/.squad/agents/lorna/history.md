# Lorna — Project Memory

## Key Context

**Project:** Isaac Treinos Ar Livre  
**Owner:** Izak90  
**Hosting:** GitHub Pages (static assets only)  
**Team:** Riggs (Lead), Murtaugh (Frontend), Lorna (you)  

---

## What We Test

1. **Functionality:** Features work as intended
2. **Design System Compliance:** CSS follows tokens/components in `DESIGN-SYSTEM.md`
3. **Cross-Browser:** Chrome, Firefox, Safari, Edge, mobile browsers
4. **GitHub Pages Compatibility:** Static assets, correct MIME types, no 404s
5. **Performance:** Bundle size, load times, Lighthouse score
6. **Accessibility:** Keyboard nav, screen readers, contrast ratios

---

## Design System for QA

**Design Tokens** (check these in CSS):
- Colors: Primary, secondary, accent, text colors
- Typography: Font families, sizes, weights
- Spacing: Padding, margin consistency
- Borders: Radius, widths

**Component Variants** (test these):
- Button: `.btn-primary`, `.btn-secondary`, `.btn-disabled`
- Card: `.card` with proper spacing and shadows
- Badge: Color variants
- Header: Navigation, logo, responsive menu
- Community submenu: Proper dropdown behavior

---

## Cross-Browser Test Matrix

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✅ Test | ✅ Test | Primary target |
| Firefox | ✅ Test | ✅ Test | CSS compatibility |
| Safari | ✅ Test | ✅ Test (iOS) | Vendor prefixes |
| Edge | ✅ Test | — | Windows primary |
| Chrome Mobile | — | ✅ Test | Android |
| Safari Mobile | — | ✅ Test | iOS |

---

## Performance Baselines

- **Bundle size:** CSS + JS should stay minimal (no large dependencies)
- **Page load:** Target <3 seconds on slow 4G
- **Lighthouse:** Aim for >90 on Performance, >90 on Accessibility

---

## GitHub Pages Validation Checklist

- [ ] All CSS files load (no 404 errors)
- [ ] All JS files load (no console errors)
- [ ] No broken image links
- [ ] No hardcoded paths (use relative paths)
- [ ] Responsive design works on mobile
- [ ] Interactive elements (buttons, links) work
- [ ] Forms (if any) submit correctly

---

## Learnings

*(To be updated as work progresses)*
