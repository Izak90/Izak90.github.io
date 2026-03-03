# 🌿 Design System - Natural & Outdoor

**Projeto:** Isaac Treinos Ar Livre  
**Direção:** Natural, Autêntico, Outdoor  
**Data:** 2 Março 2026

---

## 🎨 Paleta de Cores

### Cores Primárias
```css
--color-primary: #2A9D8F;        /* Verde água - Natureza, crescimento */
--color-primary-dark: #264653;   /* Teal escuro - Profundidade, confiança */
--color-primary-light: #5EC4B6;  /* Verde claro - Energia, frescor */
```

### Cores Secundárias
```css
--color-accent: #E76F51;         /* Terracota - Calor, ação */
--color-warm: #F4A261;           /* Dourado quente - Otimismo */
--color-highlight: #E9C46A;      /* Areia dourada - Conquista */
```

### Neutros
```css
--color-background: #F8F9FA;     /* Off-white suave */
--color-surface: #FFFFFF;        /* Branco puro */
--color-text-primary: #264653;   /* Teal escuro */
--color-text-secondary: #6B7C8A; /* Cinza azulado */
--color-border: #E1E8ED;         /* Cinza claro */
```

### Gradientes
```css
--gradient-hero: linear-gradient(135deg, #2A9D8F 0%, #264653 100%);
--gradient-cta: linear-gradient(135deg, #E76F51 0%, #F4A261 100%);
--gradient-overlay: linear-gradient(180deg, rgba(38,70,83,0) 0%, rgba(38,70,83,0.8) 100%);
```

---

## ✍️ Tipografia

### Font Stacks
```css
--font-heading: 'DM Sans', 'Inter', system-ui, sans-serif;
--font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
--font-accent: 'Playfair Display', Georgia, serif; /* Para destaques */
```

### Escalas Tipográficas
```css
--font-size-xs: clamp(0.75rem, 1.5vw, 0.875rem);
--font-size-sm: clamp(0.875rem, 2vw, 1rem);
--font-size-base: clamp(1rem, 2.5vw, 1.125rem);
--font-size-lg: clamp(1.125rem, 3vw, 1.5rem);
--font-size-xl: clamp(1.5rem, 4vw, 2rem);
--font-size-2xl: clamp(2rem, 5vw, 3rem);
--font-size-3xl: clamp(2.5rem, 7vw, 4rem);
--font-size-hero: clamp(2.75rem, 8vw, 5rem);

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.7;
```

---

## 📐 Espaçamento & Layout

### Sistema de Espaçamento (8px base)
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
--space-4xl: 8rem;    /* 128px */
```

### Container & Grid
```css
--container-max: 1280px;
--container-narrow: 900px;
--content-max: 65ch;

--grid-gap: var(--space-lg);
--grid-columns-mobile: 1;
--grid-columns-tablet: 2;
--grid-columns-desktop: 3;
```

---

## 🎭 Componentes Visuais

### Border Radius (Orgânico, suave)
```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-2xl: 48px;
--radius-full: 9999px;
```

### Sombras (Naturais, suaves)
```css
--shadow-xs: 0 1px 3px rgba(38, 70, 83, 0.08);
--shadow-sm: 0 2px 8px rgba(38, 70, 83, 0.1);
--shadow-md: 0 4px 16px rgba(38, 70, 83, 0.12);
--shadow-lg: 0 8px 32px rgba(38, 70, 83, 0.15);
--shadow-xl: 0 12px 48px rgba(38, 70, 83, 0.18);

/* Sombras coloridas para CTAs */
--shadow-accent: 0 8px 24px rgba(231, 111, 81, 0.3);
--shadow-primary: 0 8px 24px rgba(42, 157, 143, 0.2);
```

### Transições
```css
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 350ms ease;
--easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 🧩 Componentes Específicos

### Botões

#### Primário (CTA Principal)
```css
.btn-primary {
  background: var(--gradient-cta);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-accent);
  transition: all var(--transition-base);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl), var(--shadow-accent);
}
```

#### Secundário
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-full);
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
}
```

#### WhatsApp Floating
```css
.whatsapp-float {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  width: 60px;
  height: 60px;
  background: #25D366; /* WhatsApp green */
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  50% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
}
```

### Cards

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.card-image {
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.card:hover .card-image img {
  transform: scale(1.05);
}
```

### Hero Section

```css
.hero {
  min-height: 100vh;
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('hero-pattern.svg');
  opacity: 0.05;
}

.hero__content {
  position: relative;
  z-index: 1;
  color: white;
}

.hero__title {
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-md);
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.hero__subtitle {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  opacity: 0.95;
  max-width: 600px;
}
```

### Depoimentos

```css
.testimonial {
  background: var(--color-surface);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-accent);
  position: relative;
}

.testimonial::before {
  content: '"';
  font-size: 4rem;
  font-family: var(--font-accent);
  color: var(--color-primary-light);
  opacity: 0.2;
  position: absolute;
  top: var(--space-lg);
  left: var(--space-lg);
}

.testimonial__text {
  font-style: italic;
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.testimonial__author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.testimonial__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--color-primary-light);
}
```

### FAQ Accordion

```css
.faq-item {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.faq-question {
  padding: var(--space-lg);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-dark);
  transition: background var(--transition-fast);
}

.faq-question:hover {
  background: var(--color-background);
}

.faq-answer {
  padding: 0 var(--space-lg) var(--space-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}
```

---

## 📱 Breakpoints

```css
/* Mobile-first approach */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}
```

---

## 🌟 Iconografia

**Estilo:** Outlined, arredondado
**Biblioteca sugerida:** Lucide Icons, Feather Icons
**Tamanho padrão:** 24px
**Cor:** Herda do contexto ou `--color-primary`

---

## 🎯 Mood & Princípios

**Visual:**
- ✅ Natural, orgânico
- ✅ Espaços respiratórios
- ✅ Cores terrosas e naturais
- ✅ Fotos reais (não stock genérico)
- ✅ Texturas sutis

**UX:**
- ✅ Autêntico, sem pretensões
- ✅ Acessível e convidativo
- ✅ Focado em resultado
- ✅ Humano, não corporativo

---

**Design System aprovado! Ready para implementação! 🌿✨**
