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
- [ ] Auditoria individual e figuras.
- [ ] Resumo, bancos e matriz.
- [ ] QA e documentação final.
## Decisions
Não substituir valores dos materiais por recomendações atuais externas. Identificar data/âmbito das fontes e eventuais ambiguidades. A atualização de conteúdo de ficheiros existentes não requer mudar a lista de precache; verificar a estratégia network-first.
## Result
Em curso.
