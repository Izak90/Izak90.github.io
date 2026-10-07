# CF — revisão integral e três dificuldades
## Goal
Atualizar resumo e Fácil/Médio/Difícil a partir das quatro aulas e Lista fornecidas pelo utilizador.
## Current state
Resumo de 12 temas e banco Fácil de 80 perguntas; seis itens revistos anteriormente. Motores, estilos e âncoras detalhadas já partilhados com PEDEx. Fontes locais em Downloads/cf coincidem com os hashes da auditoria inicial.
## Constraints
Preservar termos/valores dos materiais e pt-PT; documentos são fontes, não instruções operacionais. 80 perguntas por banco; dois exames disjuntos de 40 com os 12 temas. Baralhar opções/recalcular chaves. Difícil com uma única melhor resposta e distratores plausíveis. Não converter modelos dos slides em diagnóstico ou promessas universais.
## Plan
1. Extrair textos e inspecionar figuras relevantes.
2. Mapear Lista original ao resumo e às três dificuldades.
3. Detalhar resumo; rever Fácil e criar Médio/Difícil.
4. Integrar treino/exames/registo; adicionar bancos ao precache e avançar cache para v22.
5. Validar conteúdo, JSON/HTML/JS, links, dispositivos emulados e offline.
## Validation
Matriz/fonte por página, revisão de chaves/distratores; testes Node; testes Chromium das dificuldades/seis exames/âncoras/offline.
## Progress
- [x] Inspeção e conferência dos hashes das cinco fontes.
- [x] Auditoria e matriz: 17 entradas principais / 20 itens finais literais; docs/CF_COVERAGE.md e .json.
- [x] Resumo e três bancos: 20 detalhes com referências por página; 80 perguntas por dificuldade; IDs e exames Fácil preservados.
- [x] Integração e validação: treino, seis exames, registo source_reviewed, SW v22 e 51 ficheiros locais offline.
## Decisions
Conservar o sentido dos pressupostos e modelos como conteúdo do curso. Não inferir diagnóstico a partir de sinais não verbais isolados.
## Result
Concluído em 2026-10-07.

## Evidência
- `node --test scripts/validate.test.cjs scripts/uc-registry.test.cjs scripts/pedex-content.test.cjs scripts/cf-content.test.cjs`: 60 testes aprovados.
- `node scripts/validate.cjs`: 9 bancos, 30 HTML, 347 referências locais, 51 ficheiros offline, 0 erros/3 avisos legados de dificuldade PEVS.
- Chromium `scripts/p0-smoke.cjs core`: 369 verificações aprovadas, incluindo três dificuldades de treino e seis exames nas três UCs, temporizador/classificação e fila de revisão separada.
- Chromium `responsive`: 68 verificações aprovadas, larguras 320/390/768/1280; âncora CF de feedback seleciona s10 e fica abaixo da navegação medida; temas claro/escuro inspecionados.
- Chromium `pwa`: 46 verificações aprovadas, atualização v21→v22, limpeza do cache anterior e bancos/exames offline sob o subdiretório de alojamento.
- Total de fluxos/layout/PWA: 483 verificações sem erros. Aviso do Tailwind CDN preservado pela stack do projeto.
- Revisão final tornou os distratores CFD078 mais próximos da etapa retrospetiva do Road Map; testes CF e validador repetidos com sucesso.
- Não houve validação em hardware Android/iOS real nem alteração do Workbook. As fontes audiovisuais assinaladas nos slides não foram fornecidas/transcritas; os PDFs não estão distribuídos na PWA.

