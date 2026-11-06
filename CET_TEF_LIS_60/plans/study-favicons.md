# Favicons nas p?ginas de estudo
## Goal
Mostrar o ?cone Academy nos separadores de resumo, treino e simula??es.
## Current state
S? o ?ndice declarava o favicon.
## Constraints
Preservar HTML est?tico e reutilizar o ?cone existente.
## Plan
1. Acrescentar o favicon ao head das p?ginas de centro_estudo e simuladores.
2. Validar HTML e refer?ncias.
## Validation
Validador existente e verifica??o de exatamente uma declara??o por p?gina.
## Progress
- [x] Inspe??o dos caminhos e geradores, que reutilizam as p?ginas existentes.
- [x] Favicon acrescentado e verificado em 41 p?ginas.
## Decisions
Usar a URL PNG j? utilizada no ?ndice; sem novos recursos offline ou altera??es ao service worker.
## Result
41 p?ginas com favicon. Valida??o global: 0 erros e 0 avisos.
