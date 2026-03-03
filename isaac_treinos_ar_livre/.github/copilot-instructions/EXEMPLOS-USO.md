# 🎯 Guia Rápido - Como Usar os Agentes Copilot

Este guia mostra **exemplos práticos** de como conversar com cada agente.

---

## 🚀 Começar o Projeto

### Opção 1: Redesign Completo Guiado
```
@orquestrador Inicia o redesign completo do site Isaac Treinos. 
Quero um design moderno, energético e que converta visitantes em clientes.
```

### Opção 2: Começar por uma Página Específica
```
@orquestrador Quero redesignar apenas a landing page (index.html) 
primeiro, com foco em conversão
```

---

## 🎨 Trabalhar com Design Visual

### Pedir Paleta de Cores
```
@arquiteto-design Preciso de 3 propostas de paleta de cores para 
um site de personal training outdoor. Deve transmitir energia, 
força e profissionalismo.
```

### Escolher Tipografia
```
@arquiteto-design Sugere combinações de fontes (heading + body) 
que funcionem bem para um site fitness moderno
```

### Criar Design System
```
@arquiteto-design Com base na paleta escolhida (#FF6B35, #6A4C93), 
cria um design system completo com tokens CSS
```

### Ver Exemplos de Componentes
```
@arquiteto-design Mostra-me 3 estilos diferentes de botões 
(gradiente, glassmorphism, neumorphism) para CTAs
```

---

## 🎯 Trabalhar com UX/UI

### Mapear Jornada do Usuário
```
@ux-designer Mapeia a jornada de um visitante novo que está 
considerando contratar personal training
```

### Criar Wireframe de Página
```
@ux-designer Cria wireframe de alta fidelidade para a página 
de preços (tabela-precos.html) focado em comparação de planos
```

### Melhorar Navegação
```
@ux-designer A navegação atual está confusa em mobile. 
Como posso melhorar?
```

### Definir Interações
```
@ux-designer Quero adicionar micro-interações interessantes 
nos cards de treino. Que interações recomendam?
```

---

## 💻 Implementar Código

### Implementar Hero Section
```
@developer-frontend Implementa um hero section moderno para 
a landing page com:
- Título impactante
- Gradiente de fundo
- 2 CTAs (primário e secundário)
- Responsivo mobile-first
```

### Criar Componente
```
@developer-frontend Cria um componente de card para os 
planos de treino com hover effect e badge de "popular"
```

### Implementar Grid Responsivo
```
@developer-frontend Como faço um grid de 3 colunas no desktop 
que vira 1 coluna no mobile usando CSS Grid?
```

### Adicionar Animações
```
@developer-frontend Adiciona scroll reveal animations nos 
cards usando Intersection Observer
```

### Menu Mobile
```
@developer-frontend Implementa um menu hamburger mobile com 
animação smooth e acessível via teclado
```

---

## ✅ Validar e Testar

### Auditoria de Acessibilidade
```
@revisor-qualidade Faz auditoria completa de acessibilidade 
da index.html seguindo WCAG 2.1 AA
```

### Testar Responsividade
```
@revisor-qualidade Testa a tabela-precos.html em mobile, 
tablet e desktop. Está responsivo?
```

### Validar Performance
```
@revisor-qualidade Analisa performance da landing page e 
sugere otimizações para atingir Lighthouse 90+
```

### Code Review
```
@revisor-qualidade Revisa o código HTML/CSS da filosofia.html 
e aponta problemas de qualidade ou best practices
```

### Validar Contraste de Cores
```
@revisor-qualidade As cores #FF6B35 (laranja) e #FFFFFF (branco) 
têm contraste suficiente para texto?
```

---

## 🔄 Workflows Completos

### Workflow 1: Nova Landing Page

```
Passo 1:
@orquestrador Quero redesignar a landing page (index.html) 
com foco em conversão de visitantes

Passo 2 (Orquestrador delega):
@arquiteto-design Cria 3 conceitos visuais diferentes

Passo 3 (Usuário escolhe):
Gostei do conceito 2 - Energético Vibrante

Passo 4:
@arquiteto-design Finaliza design system baseado no conceito 2

Passo 5:
@ux-designer Cria wireframe da landing page focado em conversão

Passo 6:
@developer-frontend Implementa a landing page conforme 
design e wireframe aprovados

Passo 7:
@revisor-qualidade Valida acessibilidade, responsividade 
e performance

Passo 8:
@developer-frontend Corrige issues apontados pelo revisor

Passo 9:
@revisor-qualidade Validação final

Passo 10:
Deploy! 🚀
```

### Workflow 2: Melhorar Página Existente

```
@ux-designer A página tabela-precos.html está confusa. 
Analisa e sugere melhorias

[UX Designer analisa e sugere]

Gostei da sugestão. @developer-frontend implementa 
as melhorias sugeridas

[Developer implementa]

@revisor-qualidade Valida a nova versão

[Revisor valida e encontra 2 problemas de contraste]

@developer-frontend Corrige os problemas de contraste

@revisor-qualidade Validação final

Aprovado! ✅
```

### Workflow 3: Componente Específico

```
@arquiteto-design Preciso de um card design para mostrar 
cada semana de treino (Semana 1-2, 3-5, etc)

[Arquiteto propõe design]

Perfeito! @developer-frontend Implementa este card como 
componente reutilizável

[Developer implementa]

@revisor-qualidade O card é acessível? Touch targets 
são grandes o suficiente?

[Revisor valida e aprova]

Ótimo! Agora uso em todas as páginas de semanas
```

---

## 💡 Dicas de Uso

### ✅ Boas Práticas

**Seja Específico:**
```
❌ @arquiteto-design Cria um design
✅ @arquiteto-design Cria paleta de cores vibrante para 
   site fitness com 3 opções: energético, profissional, natural
```

**Dê Contexto:**
```
❌ @ux-designer Melhora a navegação
✅ @ux-designer A navegação mobile tem 7 itens no menu. 
   Está confuso para usuários encontrarem o treino da semana. 
   Como organizar melhor?
```

**Use o Orquestrador para Coordenar:**
```
✅ @orquestrador Coordena redesign da landing page:
   1. Design visual moderno
   2. UX focado em conversão
   3. Implementação performática
   4. Validação completa
```

**Valide em Etapas:**
```
✅ Aprova design → Aprova wireframe → Implementa → Valida
   (Não implemente tudo de uma vez sem aprovação)
```

### ❌ Evitar

**Tarefas Muito Genéricas:**
```
❌ @developer-frontend Faz o site
```

**Múltiplas Solicitações Juntas:**
```
❌ @arquiteto-design Cria paleta, tipografia, logo, 
   ilustrações e animações
   
✅ Peça uma coisa de cada vez para resultado melhor
```

**Pular Etapas:**
```
❌ Implementar direto sem aprovar design primeiro
✅ Design → Aprovação → Implementação
```

---

## 🎯 Casos de Uso Específicos

### Caso 1: "Só quero mudar as cores"
```
@arquiteto-design Mantendo a estrutura atual, sugere 
3 paletas de cores alternativas mais modernas
```

### Caso 2: "A página de preços não converte"
```
@ux-designer Analisa tabela-precos.html e sugere melhorias 
de UX focadas em conversão. Mostra exemplos de pricing pages 
que convertem bem.
```

### Caso 3: "Preciso de performance"
```
@revisor-qualidade A landing page está lenta. 
Faz análise de performance e lista otimizações prioritárias.
```

### Caso 4: "Não sei por onde começar"
```
@orquestrador Analisa todo o site e cria plano de ação 
priorizado para redesign, começando pelas páginas mais importantes
```

### Caso 5: "Quero um componente específico"
```
@developer-frontend Cria um countdown timer animado para 
a página de treino experimental com design moderno
```

---

## 📚 Próximos Passos

1. **Leia a documentação completa:**  
   [.github/copilot-instructions/README.md](.github/copilot-instructions/README.md)

2. **Comece com o Orquestrador:**
   ```
   @orquestrador Inicia o redesign!
   ```

3. **Experimente cada agente** individualmente

4. **Itere e melhore** até atingir resultado desejado

---

**Pronto para começar? Escolha um comando acima e experimente! 🚀**
