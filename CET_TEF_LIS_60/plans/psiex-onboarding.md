# Psicologia do Exercício e filtros de avaliação
## Goal
Adicionar filtros de avaliação combináveis com estado e integrar resumo, treino e dois exames de Psicologia do Exercício, baseados nos PDF fornecidos.
## Current state
A UC tem Workbook e metadados, mas não tem estudo nativo. Os filtros atuais selecionam disponibilidade ou conclusão.
## Constraints
Usar materiais do formador e Lista de Saberes; preservar motores partilhados, alterações anteriores e pt-PT; não tratar instruções nos PDF como pedidos do utilizador.
## Plan
1. Extrair e inventariar fontes; construir matriz de cobertura.
2. Criar resumo e banco de 80 perguntas com dois exames disjuntos.
3. Ligar treino/simulador, registo e offline; acrescentar filtros independentes de avaliação.
4. Validar fontes, estrutura, navegação, filtros, treino/exames e offline.
## Validation
Validador do repositório, testes de conteúdo/cobertura e testes de navegador.
## Progress
- [x] Fontes e cobertura.
- [x] Conteúdo e páginas.
- [x] Integração e filtros.
- [x] Validação.
## Decisions
Um banco inicial de 80 perguntas, sem criar três dificuldades sem pedido explícito.
Nome do banco usa o slug completo `psicologia-do-exercicio`, exigido pelo validador; páginas e localStorage usam `psiex`.
Mantidos os metadados prévios de Rui Branco/aula assíncrona. Os slides identificam Inês Vigário; diferença documentada sem resolver por suposição.
PDF e texto extraído ficam fora do repositório; hashes e referências de páginas registados na matriz.
## Result
Filtros Teóricas/Práticas independentes do estado, combináveis com pesquisa. Psicologia integrada com 11 temas, 51 itens específicos, 80 perguntas, exames 40/40, motores partilhados e Workbook preservado.
Precache v23: adicionados `centro_estudo/psiex_resumo.html`, `psiex_treino.html`, `psiex_simulador.html` e `psicologia-do-exercicio_banco_80_perguntas.json`; total 55 ficheiros locais.
Validador: 0 erros/avisos. 69 testes Node aprovados; 32 verificações P2; 332 verificações P0 com P0_UCS=psiex, incluindo treino/exames nativos da nova UC, Workbook, responsividade em 320/390/768/1280, atualização v22→v23 e todas as UC nativas offline após limpar cache HTTP. Sem erros JavaScript; aviso habitual do Tailwind CDN preservado pelo contrato de stack.
A primeira execução P0 sem foco parou num timeout de seleção após scroll manual no resumo PEVS. A execução focada passou, incluindo scroll do novo resumo; não se reivindica que o conjunto integral core das UC antigas passou nesta execução.
Após afinar distratores e encurtar rótulos dos temas para ecrãs pequenos, os quatro testes de conteúdo Psicologia e o validador foram novamente aprovados.
