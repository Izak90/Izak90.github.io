# 🤖 Sistema de Agentes Copilot para Redesign

**Sistema de 6 agentes especializados** para redesignar completamente o site Isaac Treinos com design moderno, apelativo e organizado.

---

## 📋 Agentes Disponíveis

### 1. 🎯 [@orquestrador](orquestrador.md)
**Papel:** Coordenador e tomador de decisões  
**Quando usar:** Início do projeto, coordenação geral  
**Responsabilidades:**
- Analisar estado atual
- Propor direções visuais
- Delegar tarefas aos outros agentes
- Aprovar decisões críticas
- Comunicar com o usuário

**Como ativar:**
```
@orquestrador Inicia o redesign do site Isaac Treinos
```

---

### 2. 📊 [@marketing-manager](marketing-manager.md)
**Papel:** Estrategista de conteúdo e conversão  
**Quando usar:** Definir que conteúdo deve aparecer nas páginas  
**Responsabilidades:**
- Definir estrutura de conteúdo
- Criar copy persuasivo (headlines, CTAs)
- Otimizar para conversão
- Responder objeções dos clientes
- Priorizar informação por impacto

**Como ativar:**
```
@marketing-manager Define a estratégia de conteúdo 
da homepage para maximizar conversões
```

**Exemplo de delegação:**
```
@orquestrador: @marketing-manager, preciso que definas
que secções devem aparecer na página de preços
```

---

### 3. 🎨 [@arquiteto-design](arquiteto-design.md)
**Papel:** Especialista em identidade visual  
**Quando usar:** Definição de cores, tipografia, estilo visual  
**Responsabilidades:**
- Criar paletas de cores
- Escolher tipografia
- Definir sistema de design
- Criar moodboards
- Estabelecer padrões visuais

**Como ativar:**
```
@arquiteto-design Cria 3 propostas de paleta de cores 
para um site de personal training outdoor
```

**Exemplo de delegação:**
```
@orquestrador: Preciso que @arquiteto-design crie um 
design system moderno e energético
```

---

### 4. 🎯 [@ux-designer](ux-designer.md)
**Papel:** Especialista em experiência do usuário  
**Quando usar:** Mapear fluxos, melhorar usabilidade  
**Responsabilidades:**
- Mapear jornadas do usuário
- Criar wireframes
- Definir interações
- Melhorar navegação
- Garantir acessibilidade

**Como ativar:**
```
@ux-designer Mapeia a jornada de um visitante novo
que quer conhecer o serviço
```

**Exemplo de delegação:**
```
@orquestrador: @ux-designer, preciso de wireframes 
para a landing page focados em conversão
```

---

### 5. 💻 [@developer-frontend](developer-frontend.md)
**Papel:** Especialista em implementação web  
**Quando usar:** Transformar design em código  
**Responsabilidades:**
- Implementar HTML semântico
- Criar CSS moderno (Grid, Flexbox, Custom Properties)
- Desenvolver JavaScript interativo
- Garantir responsividade
- Otimizar performance

**Como ativar:**
```
@developer-frontend Implementa o hero section 
baseado no design aprovado
```

**Exemplo de delegação:**
```
@orquestrador: @developer-frontend, implementa 
o design system definido pelo @arquiteto-design
```

---

### 6. ✅ [@revisor-qualidade](revisor-qualidade.md)
**Papel:** Especialista em testes e validação  
**Quando usar:** Validar implementação, encontrar bugs  
**Responsabilidades:**
- Auditar acessibilidade (WCAG)
- Testar responsividade
- Validar performance (Lighthouse)
- Code review
- Garantir SEO

**Como ativar:**
```
@revisor-qualidade Faz auditoria completa de 
acessibilidade da index.html
```

**Exemplo de delegação:**
```
@orquestrador: @revisor-qualidade, valida a 
implementação do @developer-frontend
```

---

## 🎬 Fluxo de Trabalho Recomendado

### Fase 1: Descoberta e Conceito (1-2 dias)

```
1. Usuário: @orquestrador Inicia redesign do site Isaac Treinos

2. Orquestrador:
   - Analisa páginas atuais
   - Propõe 3 direções visuais
   - Delega para @arquiteto-design

3. Arquiteto:
   - Cria moodboards
   - Define 3 paletas de cores
   - Apresenta ao usuário

4. Usuário: Escolhe direção preferida

5. Orquestrador: Aprova e avança para Fase 2
```

### Fase 2: Design e Prototipagem (2-3 dias)

```
1. Orquestrador: Delega em paralelo
   
   → @arquiteto-design: Finaliza design system
   → @ux-designer: Cria wireframes e fluxos

2. Arquiteto entrega:
   - Paleta final
   - Tipografia
   - Design tokens
   - Componentes visuais

3. UX Designer entrega:
   - User journeys (3 personas)
   - Wireframes de todas as páginas
   - Definição de interações

4. Usuário: Aprova designs

5. Orquestrador: Avança para Fase 3
```

### Fase 3: Implementação (3-5 dias)

```
1. Orquestrador: 
   @developer-frontend Implementa o design aprovado

2. Developer implementa página por página:
   - index.html (Landing)
   - filosofia.html
   - tabela-precos.html
   - semanas/*.html
   - etc...

3. Developer entrega:
   - HTML semântico
   - CSS moderno
   - JavaScript interativo
   - Assets otimizados

4. Orquestrador: 
   @revisor-qualidade Valida implementação

5. Revisor testa e reporta issues

6. Developer corrige issues

7. Loop até aprovação
```

### Fase 4: Validação Final (1 dia)

```
1. Revisor executa:
   - Auditoria A11y completa
   - Testes multi-device
   - Performance audit
   - Code review final

2. Revisor entrega:
   - Relatório de aprovação
   - Score Lighthouse 90+
   - Lista de melhorias futuras

3. Orquestrador: Aprovação final

4. Deploy! 🚀
```

---

## 💬 Exemplos de Conversação

### Exemplo 1: Início do Projeto

```
Usuário:
@orquestrador Preciso redesignar completamente meu site 
de personal training. Quero algo moderno, que transmita 
energia e profissionalismo.

Orquestrador:
👋 Olá! Analisei suas 17 páginas HTML e identifiquei:

❌ Problemas atuais:
- Design desatualizado
- Cores sem contraste
- Layout inconsistente
- Navegação confusa em mobile

✨ Vou coordenar o redesign com 3 direções:

1. **Energético Vibrante**
   - Gradientes laranja/roxo
   - Bold typography
   - Assimétrico

2. **Moderno Minimalista**
   - Preto/branco + verde accent
   - Clean, muito espaço
   - Premium feel

3. **Natural Outdoor**
   - Verdes/azuis naturais
   - Orgânico, autêntico
   - Acessível

Delegando para @arquiteto-design criar moodboards...
Qual direção prefere explorar primeiro?
```

### Exemplo 2: Solicitação Específica

```
Usuário:
@ux-designer A página de preços está confusa. 
Como posso melhorar?

UX Designer:
🎯 Analisei tabela-precos.html

❌ Problemas:
- Muita informação junta
- Sem hierarquia clara
- Difícil comparar planos
- CTA não se destaca

✅ Solução:
[Wireframe em ASCII/descrição]

Pricing cards side-by-side:
- Plano Básico | Plano Premium | Plano Elite
- Destaque no "Popular"
- Checkmarks em features
- CTA grande em cada card
- Toggle mensal/anual

Quer que implemente este design?
```

### Exemplo 3: Implementação

```
Usuário:
@developer-frontend Implementa o hero section 
conforme o design do @arquiteto-design

Developer:
💻 Implementando hero section...

[Código HTML + CSS]
✅ HTML semântico
✅ Gradiente de fundo
✅ Tipografia responsiva (clamp)
✅ CTAs com hover effects
✅ Mobile-first

Preview local: localhost:3000

Quer que adicione animações de entrada?
```

### Exemplo 4: Validação

```
Usuário:
@revisor-qualidade Valida a acessibilidade 
da página index.html

Revisor:
✅ Auditoria de Acessibilidade - index.html

📊 Scores:
- axe DevTools: 92/100
- WAVE: 2 erros, 5 avisos
- Manual test: Aprovado

❌ Críticos (2):
1. Contraste insuficiente em botão secundário
2. Imagem hero sem alt text

⚠️ Avisos (5):
1. Heading h1 → h3 (falta h2)
2. Links "clique aqui" (usar descritivo)

✅ Aprovados:
- Keyboard navigation ✓
- Screen reader friendly ✓
- Focus visible ✓

Prioridade: Corrigir críticos antes de produção
```

---

## 🎯 Como Maximizar Eficiência

### 1. **Delegue Tarefas Específicas**
```
❌ Ruim: @arquiteto-design Cria um design
✅ Bom: @arquiteto-design Cria paleta de cores vibrante 
        para site fitness com 3 opções diferentes
```

### 2. **Use o Orquestrador para Coordenar**
```
@orquestrador Coordena redesign completo:
1. @arquiteto-design → Define visual
2. @ux-designer → Cria wireframes
3. @developer-frontend → Implementa
4. @revisor-qualidade → Valida
```

### 3. **Peça Aprovação em Etapas**
```
Não implemente tudo de uma vez.
Aprove: Design → UX → Implementação → QA
```

### 4. **Seja Específico em Feedback**
```
❌ "Não gostei do design"
✅ "As cores estão muito escuras. Prefiro algo 
    mais vibrante e energético como exemplo X"
```

---

## 📁 Estrutura de Arquivos

```
.github/
└── copilot-instructions/
    ├── README.md                    ← Este arquivo
    ├── orquestrador.md              ← Coordenador
    ├── arquiteto-design.md          ← Visual design
    ├── ux-designer.md               ← User experience
    ├── developer-frontend.md        ← Implementação
    └── revisor-qualidade.md         ← Testes & QA
```

---

## 🚀 Quick Start

### Passo 1: Ativa o Orquestrador
```
@orquestrador Inicia o redesign do site Isaac Treinos. 
Quero um design moderno, energético e que converte visitantes.
```

### Passo 2: Escolhe Direção Visual
```
[Orquestrador apresenta 3 opções]
Usuário: Prefiro a opção 2 - Moderno Minimalista
```

### Passo 3: Aprova Designs
```
@arquiteto-design finaliza design system
@ux-designer finaliza wireframes
[Usuário aprova]
```

### Passo 4: Implementação
```
@orquestrador Delega implementação para 
@developer-frontend página por página
```

### Passo 5: Validação
```
@revisor-qualidade valida cada página implementada
Correções → Re-validação → Aprovação
```

### Passo 6: Deploy! 🎉

---

## ❓ FAQ

**P: Posso usar um agente sem o orquestrador?**  
R: Sim! Cada agente funciona independentemente.

**P: Como faço para mudar apenas as cores do design atual?**  
R: `@arquiteto-design Sugere nova paleta de cores mantendo estrutura atual`

**P: Preciso redesignar _todas_ as 17 páginas?**  
R: Não, pode começar pela landing (index.html) e expandir gradualmente.

**P: Os agentes geram código automaticamente?**  
R: Sim! O @developer-frontend gera HTML/CSS/JS completo.

**P: Como sei se o design é acessível?**  
R: `@revisor-qualidade Faz auditoria A11y completa`

---

## 🎯 Seu Objetivo

Ter um site **completamente redesenhado** que:
- ✨ Visual moderno e apelativo
- 🎯 UX intuitiva e fluida
- 📱 Responsivo (mobile-first)
- ♿ Acessível (WCAG 2.1 AA)
- ⚡ Performático (Lighthouse 90+)
- 💰 **Converte visitantes em clientes**

---

**Pronto para começar? Digite:**
```
@orquestrador Inicia o redesign!
```

🚀
