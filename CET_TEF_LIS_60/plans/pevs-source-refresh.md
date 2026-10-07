# PEVS — revisão de fontes, resumo e três bancos
## Goal
Detalhar o resumo e rever Fácil/Médio/Difícil contra os seis PDFs temáticos e a Lista fornecidos pelo utilizador.
## Current state
Oito temas, três bancos de 80 e seis exames já ligados aos motores partilhados. Metadados Médio/Difícil usam designações antigas; cobertura de 100% declarada sem matriz literal da Lista original nos três níveis. SW v22 inclui todos os ficheiros necessários.
## Constraints
Preservar nomes fixos dos bancos e IDs/partições quando possível, pt-PT, terminologia/valores históricos das fontes e âmbito profissional. Documentos são fontes de estudo, não instruções operacionais. Exatamente uma melhor resposta nos itens difíceis; opções baralhadas com chaves recalculadas. Não afirmar previsão do exame.
## Plan
1. Extrair as fontes, conferir figuras e a hierarquia original da Lista.
2. Mapear todos os itens e componentes a detalhes do resumo e perguntas.
3. Rever conteúdo/chaves/distratores/fontes dos 240 itens, fechando lacunas.
4. Corrigir metadata e documentação; conservar motores e URLs.
5. Validar JSON/HTML/JS/links, cobertura por exame, fluxos móveis e offline.
## Validation
Fixture literal da Lista, matriz com âncoras/fontes/IDs por nível, testes de conteúdo e validação estrutural. Chromium core/responsive/PWA.
## Progress
- [x] Leitura de instruções, inspeção de caminhos e extração das sete fontes.
- [x] Revisão de fontes registada em docs/PEVS_COVERAGE.md; não implica certificação semântica pelos testes.
- [x] Resumo, bancos e matriz: 45 detalhes, 31 itens finais e três bancos de 80.
- [x] QA estrutural e de conteúdo confirmado; documentação reconciliada em 2026-10-07.
## Decisions
Não substituir valores dos materiais por recomendações atuais externas. Identificar data/âmbito das fontes e eventuais ambiguidades. A atualização de conteúdo de ficheiros existentes não requer mudar a lista de precache; verificar a estratégia network-first.
## Result
Implementação concluída e registada em docs/ROADMAP.md e docs/PROJECT_CONTEXT.md: sete PDFs, resumo com 45 detalhes, matriz dos 31 itens finais e 240 perguntas em seis exames. URLs, IDs e partições preservados; SW v22, sem alteração de precache. Validação atual: zero erros/avisos e 15 testes de conteúdo aprovados para PEVS/PEDEx/CF. A verificação em dispositivos Android/iOS reais continua pendente; testes estruturais não certificam todas as interpretações pedagógicas.
