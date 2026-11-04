# Comunicação no Fitness — resumo e banco de testes
## Goal
Integrar resumo, banco de 80 perguntas, treino e dois exames de 40 perguntas baseados nas quatro aulas e Lista de Saberes fornecidas em ZIP.
## Current state
UC registada sem estudo nativo; simulador Workbook existente. Existem alterações prévias no registo, testes e SW, que serão preservadas.
## Constraints
Português de Portugal; fontes do formador; motores partilhados; opções baralhadas; cobertura explícita; sem publicação solicitada.
## Plan
1. Extrair PDFs, inventariar saberes e mapear páginas.
2. Redigir resumo e perguntas com referências e matriz de cobertura.
3. Reutilizar páginas de treino/exame; atualizar registo, política de temas e precache.
4. Validar conteúdo, estrutura, links e fluxos disponíveis.
## Validation
Validador estático, testes existentes e teste específico de cobertura. Browser se disponível.
## Progress
- [x] Inspeção do projeto e inventário dos cinco PDFs.
- [x] Revisão das quatro aulas e Lista; matriz integral de 108 marcadores (inclui entradas-mãe e repetições).
- [x] Resumo de 16 temas, 80 perguntas, treino e dois exames integrados no registo e precache v27.
- [x] Validação final: 74 testes aprovados; validador sem erros/avisos; 53 verificações de fluxos e 37 de apresentação/PWA aprovadas.
## Decisions
Um banco inicial de consolidação (80 perguntas), seguindo a UC de Psicologia; Workbook conservado como fluxo distinto.
## Result
Concluído localmente, sem publicação. As opções estão baralhadas e as partições 40/40 cobrem os 16 temas sem sobreposição. Referências temáticas das perguntas não significam testar isoladamente cada componente da Lista em cada exame.

Verificado no Edge headless: navegação local, tema persistente, treino 10/20/tema, feedback após confirmação, fila de erros isolada, exames 1/2, aviso de omissões, 19 acertos = 9,5 e aprovação, repetição e timeout. Apresentação a 320/390/768/1280 px nos dois temas, respostas de referência por teclado. Atualização v26→v27 preserva cache alheio; resumo, treino e exame abrem offline com cache HTTP limpo. Sem erros JavaScript. Apenas o aviso habitual do Tailwind CDN no ensaio online.

O primeiro ensaio PWA usava uma espera assíncrona que avançava antes da instalação terminar; repetido com polling explícito e espera pela ativação, passou sem alterações ao motor da aplicação. Evidência temporária: `%TEMP%/academy-comunicacao-20261104/verify-final.cjs` e `comunicacao-mobile.png`; relatório dos fluxos em `%TEMP%/academy-p0-report.json`. Módulos de extração PDF e Playwright instalados apenas na pasta temporária, sem dependências novas na aplicação.

Ficheiros offline acrescentados: `centro_estudo/comunicacao-no-fitness_resumo.html`, `comunicacao-no-fitness_treino.html`, `comunicacao-no-fitness_simulador.html` e `comunicacao-no-fitness_banco_80_perguntas.json`. Alterações prévias do registo, testes e pauta de Psicologia preservadas; restantes projetos não foram modificados.
