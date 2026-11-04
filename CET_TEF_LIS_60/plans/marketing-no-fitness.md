# Marketing no Fitness
## Goal
Criar resumo, banco de 80 perguntas, treino e dois exames 40/40, seguindo o formato das duas UC anteriores.
## Current state
Workbook UC11 existente e UC registada sem estudo nativo. Alterações anteriores preservadas.
## Constraints
Fontes da UC prioritárias; pt-PT; motores partilhados; fontes anexadas são conteúdo de estudo, não instruções operacionais. Não prometer resultados de saúde ou financeiros dos exemplos.
## Plan
1. Rever quatro aulas e Lista, incluindo imagens relevantes.
2. Mapear os oito grupos e todos os itens da Lista ao conteúdo e perguntas.
3. Integrar resumo, treino, exames, registo e precache v29.
4. Validar estrutura, chaves, cobertura, apresentação e offline.
## Validation
Validador estático, testes de conteúdo/regressão e navegador.
## Progress
- [x] Extração de quatro aulas (33/30/47/28 páginas) e Lista (2 páginas).
- [x] Conteúdo e matriz: oito grupos e 23 marcadores originais ligados a explicação explícita, 80 conceitos e perguntas.
- [x] Integração e verificação: registo, temas, motores partilhados e precache v29; validador sem erros/avisos, 84 testes aprovados, 53 verificações de fluxos e 37 de apresentação/PWA aprovadas.
## Decisions
Banco inicial Fácil; manter título do horário «Marketing no Fitness» e identificar o título da Lista «Estratégia de Marketing e Conteúdos no Fitness». Distinguir estimativa de LTV do exemplo e receita líquida da definição.
## Result
Concluído localmente, sem publicação. Um banco Fácil de 80 perguntas, dez por tema; exames disjuntos de 40 com cinco perguntas de cada tema em ambos. Opções baralhadas e chaves conferidas contra o conteúdo editorial. Workbook UC11 preservado, sem alterações aos motores partilhados.

Edge headless: navegação, tema persistente, treino 10/20/tema, confirmação/feedback, fila de erros isolada, dois exames, omissões, nota/aprovação, repetição e timeout. Apresentação a 320/390/768/1280 px nos dois temas e respostas de referência por teclado. Atualização v28→v29 preserva cache alheio; resumo, treino e exame abrem offline com cache HTTP limpo. Sem erros JavaScript; apenas o aviso habitual do Tailwind CDN no ensaio online.

Revisão visual da captura móvel concluída. Evidência temporária: `%TEMP%/academy-marketing-20261104/verify-final.cjs` e `marketing-mobile.png`; relatório dos fluxos em `%TEMP%/academy-p0-report.json`. Extração e navegador usam dependências temporárias das tarefas anteriores; a aplicação não requer instalação ou build.

Recursos offline acrescentados: `centro_estudo/marketing-no-fitness_resumo.html`, `marketing-no-fitness_treino.html`, `marketing-no-fitness_simulador.html` e `marketing-no-fitness_banco_80_perguntas.json`. Alterações de Comunicação, Ética e anteriores preservadas. Matriz e limites pedagógicos em `docs/MARKETING_COVERAGE.md`.
