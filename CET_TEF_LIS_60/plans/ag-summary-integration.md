# Integrar o resumo de Aulas de Grupo

## Goal
Disponibilizar apenas o resumo detalhado na UC Aulas de Grupo, na app e offline.

## Current state
O conteúdo está em docs/AG_RESUMO_DETALHADO.md. A UC já existe no registo, sem resumo. A alteração prévia dos formadores em data/ucs.json pertence ao utilizador e será preservada.

## Constraints
HTML estático, CSS/JS partilhados, pt-PT, sem bancos de perguntas nem novos simuladores. Preservar conteúdo, ressalvas das fontes e navegação medida pelo JS.

## Plan
1. Adaptar o conteúdo integral à shell de resumo existente, com navegação temática e estrutura pedagógica.
2. Ligar o resumo no registo e acrescentar o HTML ao precache; incrementar a versão do cache.
3. Validar conteúdo, HTML, ligações, registo, navegação móvel e acesso offline.

## Validation
node scripts/validate.cjs; verificação de preservação do conteúdo; browser em ecrãs móveis e desktop, temas, navegação e reload offline.

## Progress
- [x] Inspecionar skills, documentação e páginas existentes.
- [x] Integrar HTML e registo.
- [x] Atualizar PWA e validar.

## Decisions
Usar centro_estudo/ag_resumo.html e os assets existentes. A UC terá Resumo ativo e Treino/Simulações indisponíveis. Não atribuir cobertura integral das fontes às explicações de apoio.

## Result
Resumo integral integrado com 16 temas, ideias principais, recapitulações e explicações de referência recolhidas. Registo aponta para o HTML; cache v24 inclui a página. Alteração anterior dos formadores preservada.

Validação estática: 10 bancos, 34 HTML, 433 referências locais e 56 ficheiros offline, sem erros nem avisos. Comparação do texto renderizado confirma a preservação integral das 16 secções do Markdown. Browser: 43 verificações em 320/390/768/1280 px, temas claro/escuro, navegação e offsets dinâmicos, abertura por teclado, ligação no índice e acesso à página ainda não visitada e reload offline com CSS/JS partilhados. Sem erros JavaScript. `git diff --check` passou. Ferramentas de conversão e browser usadas apenas em pasta temporária, sem dependências de execução ou build na app.
