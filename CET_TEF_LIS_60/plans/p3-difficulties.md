# P3 — Dificuldades de PEDEx e CF
## Goal
Auditar as fontes originais e decidir se bancos Médio/Difícil acrescentam valor, antes de os produzir.
## Current state
PEVS tem três dificuldades; PEDEx e CF têm um banco de 80 perguntas cada. Os motores partilhados já aceitam três bancos. O registo descreve fontes ligadas, ainda não importadas, e auditoria declarada.
## Constraints
Preservar fontes, terminologia, URLs e bancos existentes; não criar conteúdo sem suporte. Cada novo banco exige 80 perguntas, dois exames disjuntos de 40, cobertura explícita e uma única melhor resposta.
## Plan
1. Recuperar Lista de Saberes e aulas das pastas públicas registadas; guardar originais apenas numa pasta temporária.
2. Comparar cada saber com resumo e perguntas existentes; registar discrepâncias e a utilidade de novas dificuldades.
3. Resolver primeiro eventuais lacunas da base; só depois produzir e ligar novos bancos, se a auditoria o permitir.
4. Validar bancos, ligações, motores e offline; atualizar documentação e estado real.
## Validation
Validador estrutural, revisão de fontes e matriz por saber; testes de motores/offline se houver alterações de execução.
## Progress
- [x] Inspeção dos motores e do registo.
- [x] Pastas públicas e dez PDFs identificados (quatro aulas e uma Lista por UC).
- [x] Dez fontes descarregadas; âmbito e matriz legada comparados; hashes e achados em docs/P3_SOURCE_AUDIT.md.
- [ ] Auditoria individual integral, incluindo figuras e todos os subtópicos.
- [x] Novos bancos diferidos até corrigir e verificar a base.
- [ ] Implementação e validação conforme decisão.
## Decisions
Sem duplicar motores; nenhuma declaração de cobertura passa a verificada apenas por existir no JSON.
## Result
Em curso. Auditoria de entrada concluída; quatro novos bancos não publicados. Auditoria inicial preservou o conteúdo; a revisão posterior corrigiu nove perguntas. IDs, temas e exames preservados.

## Evidência de validação
- `node scripts/validate.cjs`: 0 erros, 7 avisos (5 dificuldades legadas e 2 auditorias pendentes).
- `node --test scripts/validate.test.cjs scripts/uc-registry.test.cjs`: 50 testes aprovados.
- Perguntas e exames CF/PEDEx comparados com Git HEAD: preservados integralmente.
- Ligações/fragmentos locais e IDs da matriz verificados.
- Sem alterações a UI, motores ou lista de precache; cache mantém v20.

## Correção da base — 2026-10-07
Plano: substituir CF040/CF062 para eliminar repetição conceptual; tornar CF047/050/052/054 exemplos de aplicação de rapport; ampliar PEDEX056/073/074 aos componentes documentados. Preservar IDs, temas e exames. Baralhar opções nos dois bancos com recálculo das chaves; comparar as respostas corretas dos itens restantes com a versão anterior. Atualizar matriz e validar estruturalmente e nos motores. Cobertura integral permanece pendente.

Correção implementada: nove perguntas revistas, referências por página, baralhamento dos 160 itens com chaves recalculadas. Comparação automática com snapshot anterior confirma exames, IDs, temas e respostas dos outros 151 itens preservados.

Validação da correção: 50 testes aprovados; validador com 0 erros/7 avisos; 225 verificações Chromium (`scripts/p0-smoke.cjs core`) aprovadas. Ligações/fragmentos da matriz válidos. Os sete avisos correspondem às cinco dificuldades legadas e às duas revisões integrais pendentes. Nenhum ficheiro offline adicionado/renomeado; service worker network-first e cache v20 preservados. Esta etapa de reparação está concluída; P3 global permanece em curso.

## Revisão PEDEx com ficheiros fornecidos
Pedido posterior do utilizador concluído em plans/pedex-source-refresh.md: resumo aprofundado e Fácil/Médio/Difícil, 71 subtópicos/11 temas, 240 perguntas, seis exames e SW v21. A auditoria de PEDEx foi substituída por docs/PEDEX_COVERAGE.md. CF conserva a revisão integral pendente e não recebeu novos bancos nesta etapa.

## Conclusão de CF
Revisão integral e extensão concluídas em plans/cf-source-refresh.md: 20 itens finais da Lista original, três bancos de 80, seis exames e SW v22. docs/CF_COVERAGE.md substitui o estado de CF pendente na auditoria de entrada. P3 global concluído para as duas UCs; a evidência inicial acima permanece histórica.
