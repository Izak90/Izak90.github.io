# 🎨 DESIGN SYSTEM - Isaac Treinos Ar Livre

**Versão:** 2.0  
**Data:** Março 2026  
**Status:** Oficial e Normalizado

---

## 📋 VISÃO GERAL

Este documento define o sistema de design oficial para todas as páginas do Isaac Treinos Ar Livre, garantindo consistência visual, eficiência de marketing e manutenção simplificada.

---

## 🎯 PRINCÍPIOS DE DESIGN

1. **Consistência Absoluta** - Mesmos componentes, mesmas cores, mesmo spacing
2. **Mobile-First** - Responsive em todos os breakpoints
3. **Performance** - CSS modular, cache eficiente, load time mínimo
4. **Conversão** - CTAs claros, urgência visível, prova social
5. **Acessibilidade** - ARIA labels, contraste adequado, navigation clara

---

## 🗂️ ARQUITETURA CSS

### Estrutura de Ficheiros

```
assets/css/
├── design-tokens.css    ❌ DEPRECATED - NÃO USAR
├── main.css            ✅ TOKENS OFICIAIS + Base styles
├── layout.css          ✅ Header, Footer, Grid systems
├── components.css      ✅ Buttons, Cards, Badges, Modals
├── utilities.css       ✅ Helper classes
└── pages/              ✅ Estilos específicos por página (mínimo)
    ├── homepage.css
    ├── pricing.css
    └── experimental.css
```

### Ordem de Carregamento (SEMPRE)

```html
<head>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- CSS Principal (ORDEM IMPORTA) -->
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/utilities.css">
    
    <!-- CSS Específico da Página (se necessário) -->
    <link rel="stylesheet" href="assets/css/pages/homepage.css">
</head>
```

---

## 🎨 DESIGN TOKENS

### Cores (de `main.css`)

```css
/* Primary Palette */
--color-primary: #2A9D8F;
--color-primary-light: #48B5A7;
--color-primary-dark: #1F7A6F;

/* Accent Colors */
--color-accent: #E76F51;
--color-accent-light: #F4A261;

/* Neutrals */
--color-white: #FFFFFF;
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-400: #9CA3AF;
--color-gray-500: #6B7280;
--color-gray-600: #4B5563;
--color-gray-700: #374151;
--color-gray-800: #1F2937;
--color-gray-900: #111827;

/* Semantic */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #2A9D8F 0%, #1F7A6F 100%);
--gradient-accent: linear-gradient(135deg, #E76F51 0%, #F4A261 100%);
```

### Spacing

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 6rem;     /* 96px */
```

### Typography

```css
--font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-md: 1rem;       /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */
--font-size-5xl: 3rem;      /* 48px */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Border Radius

```css
--radius-sm: 0.5rem;    /* 8px */
--radius-md: 0.75rem;   /* 12px */
--radius-lg: 1rem;      /* 16px */
--radius-xl: 1.5rem;    /* 24px */
--radius-2xl: 2rem;     /* 32px */
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Layout

```css
--header-height: 70px;
--max-width-text: 800px;
--max-width-content: 1200px;
--max-width-wide: 1400px;
```

---

## 🧩 COMPONENTES PADRONIZADOS

### Header (SEMPRE USAR)

```html
<header class="header">
    <div class="header__content">
        <a href="index.html" class="header__brand">
            <i data-lucide="activity" class="header__icon"></i>
            <span>Isaac Treinos Ar Livre</span>
        </a>
        
        <button class="header__toggle" aria-label="Menu" aria-expanded="false">
            <i data-lucide="menu"></i>
        </button>
        
        <nav class="header__nav">
            <a href="index.html" class="header__link">Início</a>
            <a href="comunidade/metodo-treino.html" class="header__link">Método</a>
            <a href="tabela-precos.html" class="header__link">Preços</a>
            <a href="horarios.html" class="header__link">Horários</a>
            <a href="comunidade.html" class="header__link">Comunidade</a>
            <a href="treino-experimental.html" class="header__cta">
                <i data-lucide="zap"></i>
                1ª Aula Grátis
            </a>
        </nav>
    </div>
</header>
```

**Variantes:**
- `.header__link--active` - Página atual
- `.header__cta--active` - CTA ativo

### Footer (4 SEÇÕES SEMPRE)

```html
<footer class="footer">
    <div class="footer__content">
        <div class="footer__grid">
            <!-- Seção 1: Branding -->
            <div class="footer__section">
                <div class="footer__brand">
                    <i data-lucide="activity"></i>
                    Isaac Treinos Ar Livre
                </div>
                <p class="footer__tagline">
                    Transforma o teu corpo ao ar livre com treinos estruturados e resultados reais.
                </p>
            </div>
            
            <!-- Seção 2: Comece Hoje -->
            <div class="footer__section">
                <h3 class="footer__title">Comece Hoje</h3>
                <ul class="footer__links">
                    <li><a href="treino-experimental.html">1ª Aula Grátis</a></li>
                    <li><a href="tabela-precos.html">Ver Preços</a></li>
                    <li><a href="horarios.html">Horários Disponíveis</a></li>
                    <li><a href="comunidade.html">Acesso Comunidade</a></li>
                </ul>
            </div>
            
            <!-- Seção 3: Porquê Nós -->
            <div class="footer__section">
                <h3 class="footer__title">Porquê Nós</h3>
                <ul class="footer__links">
                    <li><a href="comunidade/metodo-treino.html">Método Comprovado</a></li>
                    <li><a href="comunidade/desconto-referencia.html">Programa Referência</a></li>
                </ul>
            </div>
            
            <!-- Seção 4: Contacto -->
            <div class="footer__section">
                <h3 class="footer__title">Contacto</h3>
                <ul class="footer__links">
                    <li>
                        <i data-lucide="map-pin"></i>
                        Parque Naide Gomes, Lisboa
                    </li>
                    <li>
                        <a href="https://wa.me/351939481840">
                            <i data-lucide="message-circle"></i>
                            WhatsApp
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com/isaac_treinos_ar_livre">
                            <i data-lucide="instagram"></i>
                            @isaac_treinos_ar_livre
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="footer__bottom">
            <p>&copy; 2026 Isaac Treinos Ar Livre. Todos os direitos reservados.</p>
        </div>
    </div>
</footer>
```

### Botões

```html
<!-- Primary (conversão principal) -->
<a href="#" class="btn btn-primary">
    <i data-lucide="zap"></i>
    Marcar Treino Grátis
</a>

<!-- Secondary (ação secundária) -->
<a href="#" class="btn btn-secondary">
    Ver Preços
</a>

<!-- Large (hero CTAs) -->
<a href="#" class="btn btn-primary btn-large">
    Começar Agora
</a>

<!-- Small (menos destaque) -->
<a href="#" class="btn btn-secondary btn-small">
    Saber Mais
</a>
```

### Badges

```html
<!-- Urgência (escassez) -->
<div class="badge badge-urgency">
    <i data-lucide="flame"></i>
    <span>6 vagas disponíveis</span>
</div>

<!-- Destaque -->
<div class="badge badge-accent">
    <i data-lucide="star"></i>
    <span>Mais Popular</span>
</div>

<!-- Info -->
<div class="badge badge-info">
    100% Grátis
</div>
```

### Cards

```html
<div class="card">
    <div class="card__header">
        <h3 class="card__title">Título</h3>
        <div class="badge badge-accent">Popular</div>
    </div>
    <div class="card__body">
        <p>Conteúdo do card...</p>
    </div>
    <div class="card__footer">
        <a href="#" class="btn btn-primary">CTA</a>
    </div>
</div>
```

---

## 📱 BREAKPOINTS

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

---

## 🎯 MARKETING ELEMENTS

### Número WhatsApp Oficial

```
351939481840
```

**Uso consistente em:**
- Links: `https://wa.me/351939481840`
- Texto: `+351 939 481 840`

### Contador de Vagas

**Valor oficial:** 6 vagas disponíveis

**Implementação:**
```html
<div class="badge badge-urgency">
    <i data-lucide="users"></i>
    <span>6 vagas disponíveis</span>
</div>
```

### CTAs Principais (por página)

| Página | CTA Principal | CTA Secundário |
|--------|---------------|----------------|
| index.html | "Treino Experimental Grátis" | "Ver Preços" |
| treino-experimental.html | "Marcar no WhatsApp" | - |
| tabela-precos.html | "Garantir Vaga" | "Falar no WhatsApp" |
| horarios.html | "Garantir Vaga via WhatsApp" | - |
| comunidade.html | "Aceder Conteúdos" | - |

### Badges de Urgência

```html
<!-- Vagas limitadas -->
<div class="badge badge-urgency">
    <i data-lucide="flame"></i>
    <span>Turma Fundadora: 6 vagas disponíveis</span>
</div>

<!-- Oferta limitada -->
<div class="badge badge-accent">
    <i data-lucide="clock"></i>
    <span>OFERTA LIMITADA</span>
</div>

<!-- Desconto -->
<div class="badge badge-success">
    <i data-lucide="tag"></i>
    <span>-10% FUNDADOR</span>
</div>
```

---

## ✅ CHECKLIST NORMALIZAÇÃO

Cada página DEVE ter:

- [ ] Header com classe `.header` (estrutura padrão)
- [ ] Mobile toggle button `class="header__toggle"`
- [ ] Footer com 4 seções (incluindo "Comece Hoje")
- [ ] WhatsApp: 351939481840
- [ ] Vagas: "6 vagas disponíveis"
- [ ] CSS modular (main.css + layout.css + components.css)
- [ ] CSS inline < 50 linhas
- [ ] Lucide icons carregados
- [ ] app.js carregado antes de `</body>`
- [ ] Design tokens usados (sem valores hardcoded)

---

## 🚫 NÃO FAZER

❌ **NÃO usar `design-tokens.css`** (deprecated)  
❌ **NÃO hardcodear cores** (#hex direto)  
❌ **NÃO usar `padding-top: 90px`** (usar `var(--header-height)`)  
❌ **NÃO duplicar CSS inline**  
❌ **NÃO misturar classes** (`btn-primary` vs `btn--primary`)  
❌ **NÃO usar números WhatsApp diferentes**  
❌ **NÃO variar contador de vagas**

---

## 📦 COMPONENTES REUTILIZÁVEIS

### WhatsApp Float Button

```html
<a href="https://wa.me/351939481840" class="whatsapp-float" aria-label="WhatsApp">
    <i data-lucide="message-circle"></i>
</a>
```

### Modal de Proteção de Acesso

```html
<div class="access-modal" id="accessModal">
    <div class="access-modal__content">
        <button class="access-modal__close" aria-label="Fechar">×</button>
        <h2>🔒 Área Exclusiva Membros</h2>
        <p>Introduz o código de acesso partilhado no grupo:</p>
        <input type="text" id="accessCode" placeholder="Código">
        <button class="btn btn-primary">Aceder</button>
    </div>
</div>
```

---

**Última atualização:** 3 de Março de 2026  
**Mantido por:** @orquestrador  
**Versão:** 2.0.0
