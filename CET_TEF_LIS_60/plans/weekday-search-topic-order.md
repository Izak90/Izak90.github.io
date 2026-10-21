# Pesquisa por dia da semana e ordem dos temas
## Goal
Pesquisar dias da semana na agenda e ordenar numericamente os temas do treino.
## Current state
A pesquisa ignora dayWeek; os temas seguem a ordem aleatória das perguntas.
## Constraints
Preservar a PWA estática, os bancos e os filtros existentes.
## Plan
1. Partilhar a correspondência de pesquisa entre agenda e exportação ICS.
2. Ordenar os temas com comparação numérica pt-PT.
3. Validar JavaScript, ligações e comportamento das duas alterações.
## Validation
Validador do projeto e verificações funcionais em Node.
## Progress
- [x] Inspeção dos ficheiros e regras.
- [x] Implementação e revisão do diff; git diff --check passou.
- [ ] Validação executável: Node.js não está disponível no ambiente.
## Decisions
Aceitar pesquisa sem acentos; não atribuir dia a exames por confirmar.
## Result
Pesquisa partilhada pela agenda e exportação ICS, com nomes completos dos dias e normalização de acentos. Temas ordenados numericamente em todas as dificuldades pelo motor partilhado. Sem alteração dos caminhos ou precache. Não publicado: Sites não devolveu projetos na conta selecionada e este checkout pertence a um repositório GitHub sem identidade Sites.
