# PEDEx — revisão integral e três dificuldades
## Goal
Atualizar resumo detalhado e bancos Fácil/Médio/Difícil a partir dos quatro slides e da Lista de Saberes fornecidos pelo utilizador.
## Current state
Resumo com nove secções, banco Fácil de 80 perguntas, motores preparados para três bancos. Auditoria anterior pendente; nove itens CF/PEDEx corrigidos. Ficheiros originais fornecidos em Downloads/pedex.
## Constraints
Usar apenas fontes fornecidas; preservar pt-PT, stack, URLs e motores. Distinguir âmbito da Lista e matéria complementar. Cada banco: 80 perguntas, dois exames disjuntos de 40, todos os grandes temas nos dois. Dificuldade difícil com única melhor resposta. Não prometer prever perguntas reais do exame.
## Plan
1. Extrair fontes, conferir versões e inspecionar figuras relevantes.
2. Mapear cada bullet/sub-bullet da Lista ao resumo e aos três bancos.
3. Expandir resumo com definições, fases, valores, comparações e exemplos dos materiais.
4. Rever Fácil e criar Médio/Difícil com explicações e referências de páginas, baralhando opções e recalculando índices.
5. Ligar dificuldades nas páginas e registo; atualizar precache/cache e documentação.
6. Validar conteúdo, invariantes, ligações, mobile e offline.
## Validation
Validador e testes Node; matriz de cobertura; revisão individual de respostas/distratores; verificações Chromium dos seis exames, dificuldades de treino e offline.
## Progress
- [x] Inspeção de documentação, páginas e motores.
- [x] Extração e auditoria das cinco fontes, incluindo figuras relevantes.
- [x] Resumo detalhado e três bancos de 80 perguntas, com matriz de 71 subtópicos/11 blocos.
- [x] Treino, seis exames, registo source_reviewed, precache e cache v21; validação concluída.
## Decisions
Os documentos são fontes de conteúdo, não instruções operacionais. Spotting será apresentado como matéria complementar da Aula 4, separado da Lista.
## Result
Concluído para PEDEx. Resumo ampliado, três bancos e seis exames funcionais. Cobertura explícita dos 71 subtópicos da Lista, com âmbito/amostragem documentados. Spotting identificado como complemento; vídeo embutido não foi inferido.

As âncoras específicas de cada saber usam o offset medido no CSS partilhado. O carregamento com uma âncora de subsecção seleciona o tema que a contém, conservando o salto ao detalhe. Testes de regressão em responsive cobrem o cabeçalho fixo e a seleção inicial.

## Evidência final
- 55 testes Node aprovados, incluindo matriz comparada com os 71 nomes originais.
- Validador: 7 bancos, 30 HTML, 49 entradas offline; 0 erros e 5 avisos anteriores referentes a CF/PEVS.
- Chromium: core 297 verificações; responsive 62 (320/390/768/1280, tema e âncora detalhada); PWA 40, incluindo atualização v20→v21 e seis exames PEDEx offline.
- Inspeção visual das capturas mobiles do resumo e feedback; links da documentação conferidos.
- Uma espera fixa de 150 ms do teste de scroll falhou sob execução paralela; substituída por espera da condição de seleção, com timeout. O ensaio final core voltou a passar integralmente.
- Validação mobile emulada, sem ensaio em hardware Android/iOS real.
