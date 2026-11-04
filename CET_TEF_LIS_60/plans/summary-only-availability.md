# Disponibilidade nas UCs com apenas resumo
## Goal
Tornar explícita a indisponibilidade de Treino e Simulações nas páginas com apenas Resumo.
## Current state
Aulas de Grupo e Fisiologia apresentam spans esbatidos e tooltip, sem indicação textual permanente.
## Constraints
Preservar navegação, motores, cores dos temas e offsets medidos. Elementos indisponíveis sem links ou interação.
## Plan
1. Identificar páginas pelo registo.
2. Adicionar rótulos Indisponível, cadeado e explicação visível, usando CSS partilhado.
3. Validar links, apresentação móvel e ambos os temas.
## Validation
Validador estático e verificação no navegador das duas páginas, a 320 e 390 px, nos dois temas.
## Progress
- [x] Confirmadas as duas páginas pelo registo.
- [x] Implementação e validação: rótulos e nota explícitos nas duas páginas; validador sem erros/avisos e 60 verificações no navegador aprovadas.
## Decisions
Não alterar o precache: todos os ficheiros já pertencem ao cache; estratégia network-first preservada.
## Result
Concluído. Treino e Simulações mostram cadeado e «Indisponível», sem links, acompanhados de uma nota de disponibilidade. Estilos partilhados em study.css, cores próprias nos dois temas e sem depender de opacidade. Navegador verificado a 320/390/1280 px: sem overflow, sem interação nos elementos indisponíveis, nota visível e navegação dos temas abaixo do menu local. Sem erros JavaScript. Captura revista em `%TEMP%/academy-summary-availability.png`.
