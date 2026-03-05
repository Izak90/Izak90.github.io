# CSS Guidelines - Isaac Treinos Ar Livre

**Data de Criação:** 4 de Março de 2026  
**Versão:** 1.0  
**Status:** ✅ Implementado

---

## 📁 Arquitetura CSS

### Estrutura de Pastas

```
assets/css/
├── reset.css                 # Reset CSS global
├── design-tokens.css         # CSS custom properties (variáveis)
├── main.css                  # Estilos base e layout principal
├── layout.css                # Header, footer, estrutura de página
├── components.css            # Componentes reutilizáveis (buttons, badges, cards)
├── utilities.css             # Classes utilitárias (spacing, text, display)
├── visual-enhancements.css   # Animações, sombras, efeitos visuais
├── components/
│   ├── header.css            # Estilos específicos do header
│   ├── button.css            # Estilos de botões
│   ├── badge.css             # Estilos de badges
│   └── card.css              # Estilos de cards
└── pages/
    ├── homepage.css          # Página inicial
    ├── pricing.css           # Página de preços
    ├── schedule.css          # Página de horários
    ├── community.css         # Páginas da comunidade
    ├── experimental.css      # Página treino experimental
    ├── resources.css         # Páginas de recursos (alongamentos, aquecimento)
    └── week-plans.css        # Planos semanais de treino
```

### Ordem de Importação (Head das Páginas)

```html
<!-- ORDEM CORRETA -->
<link rel="stylesheet" href="assets/css/reset.css">
<link rel="stylesheet" href="assets/css/design-tokens.css">
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/utilities.css">
<link rel="stylesheet" href="assets/css/visual-enhancements.css">
<!-- Page-specific CSS por último -->
<link rel="stylesheet" href="assets/css/pages/homepage.css">
```

**❌ NUNCA:**
- Importar CSS fora de ordem
- Usar `<style>` inline (exceto em casos muito específicos)
- Duplicar imports

---

## 🎨 Sistema de Design Tokens

### CSS Custom Properties (Variables)

Todas as propriedades visuais devem usar variáveis CSS definidas em `design-tokens.css`:

#### Cores

```css
/* Primárias */
--color-primary: #2A9D8F;
--color-primary-dark: #264653;

/* Secundárias */
--color-accent: #E76F51;
--color-accent-light: #F4A261;

/* Neutras */
--color-white: #FFFFFF;
--color-gray-50: #F8F9FA;
--color-gray-100: #E9ECEF;
--color-gray-700: #495057;
--color-gray-900: #212529;
```

**✅ BOM:**
```css
.card {
    background: var(--color-white);
    color: var(--color-gray-900);
}
```

**❌ MAU:**
```css
.card {
    background: #FFFFFF;
    color: #212529;
}
```

#### Espaçamento

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

**✅ BOM:**
```css
.section {
    padding: var(--space-3xl) 0;
    margin-bottom: var(--space-lg);
}
```

**❌ MAU:**
```css
.section {
    padding: 96px 0;
    margin-bottom: 32px;
}
```

#### Tipografia

```css
/* Tamanhos */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */

/* Pesos */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

#### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;  /* Circular */
```

#### Sombras

```css
--shadow-sm: 0 2px 8px rgba(42, 157, 143, 0.08);
--shadow-md: 0 4px 16px rgba(42, 157, 143, 0.12);
--shadow-lg: 0 8px 32px rgba(42, 157, 143, 0.16);
```

#### Gradientes

```css
--gradient-primary: linear-gradient(135deg, #2A9D8F 0%, #264653 100%);
```

---

## 🧩 Componentes Web Reutilizáveis

### Sistema de Web Components

Localização: `assets/js/components.js`

#### Componentes Disponíveis

1. **`<app-header>`** - Header global
2. **`<app-footer>`** - Footer global  
3. **`<app-whatsapp>`** - Botão flutuante WhatsApp
4. **`<app-access-protection>`** - Modal de proteção de acesso

#### Como Usar

```html
<!-- No HTML da página -->
<body class="has-fixed-header">
    <!-- Header reutilizável -->
    <app-header current="inicio" depth="0"></app-header>
    
    <!-- Conteúdo da página -->
    <main>...</main>
    
    <!-- Footer reutilizável -->
    <app-footer depth="0"></app-footer>
    
    <!-- WhatsApp float -->
    <app-whatsapp phone="351913502673" message="Olá! Estou interessado nos treinos."></app-whatsapp>
    
    <!-- Antes do </body> -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="assets/js/components.js"></script>
</body>
```

#### Atributos

**`depth`** - Profundidade de pastas (para paths corretos)
- `depth="0"` → Raiz (index.html, tabela-precos.html)
- `depth="1"` → 1 nível (comunidade/metodo-treino.html)
- `depth="2"` → 2 níveis (comunidade/semanas/semana1-2.html)

**`current`** - Página ativa (para header)
- Valores: `inicio`, `metodo`, `precos`, `horarios`, `comunidade`

**`phone`** - Número WhatsApp (com código de país)

**`message`** - Mensagem pré-definida do WhatsApp

**`storage-key`** - Chave sessionStorage para access-protection

**`password`** - Password para acesso protegido

---

## 📐 Convenções de Naming

### BEM (Block Element Modifier)

Usar metodologia BEM para classes CSS:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__title { }
.card__body { }

/* Modifier */
.card--featured { }
.card--large { }
```

**✅ BOM:**
```html
<div class="pricing-card pricing-card--featured">
    <div class="pricing-card__header">
        <h3 class="pricing-card__title">Plano Premium</h3>
    </div>
    <div class="pricing-card__body">...</div>
</div>
```

**❌ MAU:**
```html
<div class="pricingCardFeatured">
    <div class="header">
        <h3 class="title">Plano Premium</h3>
    </div>
</div>
```

### Exceções às Regras BEM

**Utility Classes** - Não seguem BEM:
```css
.text-center { }
.mt-lg { }
.bg-gradient-primary { }
```

**State Classes** - Prefixo `is-` ou `has-`:
```css
.is-active { }
.is-loading { }
.has-fixed-header { }
```

---

## 🏗️ Padrões de Estrutura HTML

### Body Class

Todas as páginas com header fixo devem ter:

```html
<body class="has-fixed-header">
```

Isso aplica automaticamente `padding-top: 73px` para compensar o header.

### Hero Sections

**Padrão atual** (em transição):
```html
<section class="pricing-hero">      <!-- Página de preços -->
<section class="schedule-hero">     <!-- Página de horários -->
<section class="community-hero">    <!-- Páginas da comunidade -->
<section class="experimental-hero"> <!-- Treino experimental -->
```

**Padrão futuro recomendado:**
```html
<section class="hero hero--pricing">
<section class="hero hero--schedule">
<section class="hero hero--community">
```

### Back Links

Usar classe `.section--back-link` para espaçamento correto:

```html
<section class="section section--back-link">
    <div class="container">
        <a href="../index.html" class="back-link">
            <i data-lucide="arrow-left"></i>
            Voltar
        </a>
    </div>
</section>
```

### Container System

```html
<section class="section">
    <div class="container">
        <!-- Conteúdo limitado a max-width: var(--container-max-width) -->
    </div>
</section>
```

---

## 🎯 Utility Classes

### Spacing

```css
/* Margin Top */
.mt-xs → margin-top: var(--space-xs);
.mt-sm → margin-top: var(--space-sm);
.mt-md → margin-top: var(--space-md);
.mt-lg → margin-top: var(--space-lg);
.mt-xl → margin-top: var(--space-xl);

/* Margin Bottom */
.mb-xs, .mb-sm, .mb-md, .mb-lg, .mb-xl

/* Padding */
.p-xs, .p-sm, .p-md, .p-lg, .p-xl
```

### Flexbox

```css
.flex              → display: flex;
.flex-column       → flex-direction: column;
.items-center      → align-items: center;
.justify-center    → justify-content: center;
.justify-between   → justify-content: space-between;
.gap-sm            → gap: var(--space-sm);
.gap-md            → gap: var(--space-md);
```

### Grid

```css
.grid    → display: grid;
.grid-2  → grid-template-columns: repeat(2, 1fr);
.grid-3  → grid-template-columns: repeat(3, 1fr);
```

### Text

```css
.text-center    → text-align: center;
.font-bold      → font-weight: var(--font-weight-bold);
.font-semibold  → font-weight: var(--font-weight-semibold);
```

### Backgrounds

```css
.bg-gradient-primary      → Gradiente principal (verde)
.bg-gradient-accent       → Gradiente laranja/coral
.bg-gradient-light        → Gradiente cinza claro
.bg-gradient-card         → Gradiente verde suave (cards)
.bg-gradient-card-accent  → Gradiente laranja suave (cards)
```

---

## 🚫 Anti-Padrões (O Que Evitar)

### ❌ Inline Styles

**MAU:**
```html
<div style="padding: 20px; background: #fff;">
```

**BOM:**
```html
<div class="p-md bg-white">
```

### ❌ Valores Hardcoded

**MAU:**
```css
.card {
    padding: 24px;
    color: #212529;
    font-size: 16px;
}
```

**BOM:**
```css
.card {
    padding: var(--space-md);
    color: var(--color-gray-900);
    font-size: var(--font-size-base);
}
```

### ❌ CSS Inline em `<style>`

**MAU:**
```html
<head>
    <style>
        .custom-class {
            background: red;
        }
    </style>
</head>
```

**BOM:**
Criar ficheiro CSS específico em `pages/` ou usar classes existentes.

### ❌ IDs para Estilos

**MAU:**
```css
#header {
    background: blue;
}
```

**BOM:**
```css
.header {
    background: var(--color-primary);
}
```

---

## 📱 Responsive Design

### Mobile-First Approach

Escrever estilos para mobile primeiro, depois adicionar media queries para desktop:

```css
/* Mobile (default) */
.card {
    padding: var(--space-md);
    font-size: var(--font-size-base);
}

/* Tablet */
@media (min-width: 768px) {
    .card {
        padding: var(--space-lg);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .card {
        padding: var(--space-xl);
        font-size: var(--font-size-lg);
    }
}
```

### Breakpoints Padrão

```css
/* Mobile: < 768px (default) */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

---

## 🔧 Manutenção e Debugging

### Verificar Consistência

1. **Classes duplicadas?** → Consolidar em componente reutilizável
2. **Valores hardcoded?** → Substituir por CSS variables
3. **Inline styles?** → Mover para classes CSS
4. **CSS não usado?** → Remover

### Ferramentas Recomendadas

- **VS Code Extensions:**
  - CSS Peek
  - IntelliSense for CSS class names
  - Prettier (formatação)

### Checklist Antes de Commit

- [ ] Sem CSS inline (`<style>`)
- [ ] Sem inline styles (`style=""`)
- [ ] Usar CSS variables
- [ ] Seguir convenções BEM
- [ ] Mobile-first
- [ ] Testar responsive

---

## 🎓 Exemplos Práticos

### Criar Novo Componente

1. Decidir localização:
   - Global reutilizável? → `components.css` ou `components/nome.css`
   - Específico de página? → `pages/nome-pagina.css`

2. Seguir BEM:
```css
/* components/modal.css */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal__overlay {
    background: rgba(0, 0, 0, 0.5);
}

.modal__content {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
}

.modal--large {
    max-width: 800px;
}
```

3. Importar no HTML:
```html
<link rel="stylesheet" href="assets/css/components/modal.css">
```

### Criar Nova Página

1. Copiar estrutura base:
```html
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título | Isaac Treinos Ar Livre</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/design-tokens.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/pages/minha-pagina.css">
</head>
<body class="has-fixed-header">
    <app-header current="inicio" depth="0"></app-header>
    
    <main>
        <!-- Conteúdo -->
    </main>
    
    <app-footer depth="0"></app-footer>
    <app-whatsapp></app-whatsapp>
    
    <!-- Scripts -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="assets/js/components.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

2. Criar `pages/minha-pagina.css` se necessário

---

## 📚 Recursos Adicionais

- [BEM Methodology](http://getbem.com/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Lucide Icons](https://lucide.dev/)
- [Web Components (MDN)](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

---

**Última Atualização:** 4 de Março de 2026  
**Responsável:** Equipa de Desenvolvimento Isaac Treinos
