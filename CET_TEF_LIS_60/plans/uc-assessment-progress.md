# Tipo de avaliação e filtro Em Progresso
## Goal
Identificar avaliação teórica/prática e ocultar UC concluídas através de um novo filtro do Centro de Estudo.
## Current state
O registo fornece os caminhos Workbook; o Curso calcula conclusão a partir do calendário.
## Constraints
Preservar o registo já editado pelo utilizador, a stack e os filtros atuais.
## Plan
1. Derivar o tipo de avaliação da presença de Workbook nas vistas da página inicial.
2. Adicionar Em Progresso usando a classificação existente para excluir concluídas.
3. Validar ficheiros e comportamento no navegador.
## Validation
Validador estático e smoke P2: tipos, filtro, pesquisa, calendário e tamanhos de ecrã.
## Progress
- [x] Implementação e validação.
## Decisions
Em Progresso inclui todas as UC ainda não concluídas, incluindo não iniciadas, conforme o objetivo de ocultar concluídas.
Não adicionar metadados redundantes ao JSON: Workbook determina o tipo.
## Result
Avaliação identificada no Centro de Estudo e nas duas vistas do Curso. Filtro Em Progresso exclui concluídas pelo calendário e combina com pesquisa.
Validador estático: 0 erros/avisos; 36 testes do validador e 25 verificações P2 no Chromium aprovados, incluindo 320/390 px e estado vazio.
Sem alterações a caminhos offline ou ao registo editado pelo utilizador.
