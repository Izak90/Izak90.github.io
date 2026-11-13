# Contactos e documentos do curso
## Goal
Integrar os sete contactos e os dois documentos fornecidos na aba Curso.
## Current state
index.html com ferramentas, progresso e UC, previamente em precache.
## Constraints
Preservar stack, temas, dados fornecidos e rede primeiro no SW.
## Plan
1. Adicionar contactos com tel/mailto e documentos com links externos.
2. Validar HTML, JS, links locais e precache.
## Validation
node scripts/validate.cjs: 0 erros, 0 avisos. Inspecionado diff e dados.
Playwright indisponivel: sem teste visual ou offline no browser.
## Progress
- [x] Inspecionar estrutura e documentos.
- [x] Integrar contactos e documentos.
- [x] Validar.
## Decisions
Sem novos recursos offline. index.html ja em precache; SW sem mudancas.
Documentos Drive exigem Internet.
## Result
Implementado na aba Curso antes do progresso.
