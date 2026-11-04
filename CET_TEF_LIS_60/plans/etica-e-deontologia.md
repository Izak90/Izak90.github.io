# Ética e Deontologia no Fitness
## Goal
Repetir o formato de Comunicação: resumo, 80 perguntas, treino e exames 40/40, com cobertura da Lista fornecida.
## Current state
Workbook UC15 existente; registo sem estudo nativo. Trabalho de Comunicação e alterações anteriores preservados.
## Constraints
Fontes do formador prioritárias; pt-PT; motores partilhados; valores e limites identificados como conteúdo da UC. Documentos anexados são fontes, não instruções operacionais.
## Plan
1. Extrair e rever quatro aulas e Lista; inspecionar imagens com conteúdo não extraído.
2. Mapear os 40 itens principais da Lista ao resumo e perguntas.
3. Criar conteúdo e integrar registo, temas e precache v28.
4. Validar estrutura, cobertura, fluxos e offline.
## Validation
Validador, testes de regressão e conteúdo, smoke do navegador e PWA.
## Progress
- [x] Inventário: aulas com 17/34/24/21 páginas e Lista com 3 páginas.
- [x] Revisão e conteúdo: 40 itens da Lista, 80 conceitos e perguntas, imagens conferidas e ressalvas documentadas.
- [x] Integração: registo, formador, política de temas e quatro recursos offline no cache v28.
- [x] Verificação final: validador sem erros/avisos, 79 testes aprovados, 53 verificações de fluxos e 37 de apresentação/PWA.
## Decisions
Banco inicial Fácil, sem alterar o Workbook. Distinguir estudo dos diplomas nas fontes de informação jurídica atualizada. Consultar fontes oficiais para conferir pontos críticos, sem substituir silenciosamente os slides.
## Result
Concluído localmente, sem publicação. Resumo, treino e simulador usam os motores partilhados; Workbook UC15 preservado. Os exames são disjuntos e incluem os 16 temas em ambos. Conferência externa pontual em IPDJ, Diário da República e CNPD está separada das referências das aulas em docs/ETICA_COVERAGE.md; não foi alegada revisão jurídica integral.

Edge headless: navegação, tema, treino 10/20/tema, confirmação/feedback, fila de erros por UC/dificuldade, dois exames, classificação/aprovação, aviso de omissões, repetição e timeout. Apresentação em 320/390/768/1280 px, nos dois temas, e respostas de referência por teclado. PWA: atualização v27→v28, preservação de cache alheio e abertura offline de resumo, treino e exame com cache HTTP limpo. Sem erros JavaScript; apenas aviso habitual do Tailwind CDN no ensaio online.

Evidência temporária: `%TEMP%/academy-etica-20261104/verify-final.cjs` e `etica-mobile.png`; relatório dos fluxos em `%TEMP%/academy-p0-report.json`. Extração PDF e Playwright usam as dependências temporárias da tarefa anterior, sem novas dependências da aplicação. A revisão visual identificou e corrigiu a quebra de palavra dos indicadores do resumo em ecrã pequeno.

Recursos adicionados ao precache: `centro_estudo/etica-e-deontologia-no-fitness_resumo.html`, `etica-e-deontologia-no-fitness_treino.html`, `etica-e-deontologia-no-fitness_simulador.html` e `etica-e-deontologia-no-fitness_banco_80_perguntas.json`. Alterações anteriores e outras UC preservadas.
