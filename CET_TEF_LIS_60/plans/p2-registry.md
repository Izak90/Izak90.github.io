# P2 — Registo central de UCs
## Goal
Centralizar as 27 UCs em data/ucs.json e consumir em Estudo/Curso/metadata sem alterar URLs.
## Current state
Seis listas/mapas duplicados no índice. P0/P1 presentes; preservar alterações existentes.
## Constraints
Stack estática, pt-PT, URLs e conteúdos preservados. Não inventar evidência de fontes.
## Plan
1. Migrar listas/mapas para JSON e adaptador partilhado.
2. Carregar registo com estados de carregamento/erro/repetição; preservar Agenda.
3. Adicionar precache v20 e validar schema/caminhos do registo.
4. Testes de equivalência, browser/mobile, falha/repetição e offline; documentação.
## Validation
Validador P1 e regressões; smoke tests de browser e atualização/offline sob subdiretório.
## Progress
- [x] Inspecionar e extrair metadata existente.
- [x] Implementar e validar migração.
- [x] Documentar resultados.
## Decisions
Preservar mapas apenas como adaptadores derivados em memória. Índice Workbook estático e geração de precache ficam para migração posterior. Estado de fontes distingue auditoria declarada de fontes verificadas.
## Result
Concluído em 2026-10-07.
- 27 UCs, 3 fluxos nativos completos, 17 Workbook e 5 bancos no registo. Os seis adaptadores coincidem integralmente com o fixture anterior (títulos, ordem, links, formadores, Drive e Campus).
- 48 testes Node aprovados, incluindo schema, equivalência, carregamento HTTP, JSON null, caminhos inexistentes, bancos omitidos e falta do registo no precache.
- 17 verificações P2 em Chromium mobile emulado: HTTP 503, indicação de indisponibilidade, Agenda renderizada, repetição com sucesso, cartões/filtros/pesquisa, metadados e total Curso, sem overflow em 320/390/768/1280 e sem erros JS.
- 34 verificações P0/PWA aprovadas: atualização sintética v19→v20, limpeza de cache, recursos offline, HTTP cache limpo e páginas não visitadas sob /CET_TEF_LIS_60/. Screenshot offline inspecionada: 3/27 UCs disponíveis e links nativos renderizados pelo registo.
- P1: 0 erros, 5 avisos legados; 5 bancos, 30 HTML, 326 referências locais, 47 entradas locais de precache.
- Novos caminhos offline: ./data/ucs.json e ./assets/uc-registry.js. Versão SW: cet-tef-v20. Estratégia network-first preservada.
- Conteúdos de estudo, bancos, URLs, lista Workbook e Agenda não foram alterados. Sem build, dependências adicionais, publicação ou commit.

Limites: emulação Chromium não substitui teste físico Android/iOS; índice Workbook e atributos data-* das páginas nativas permanecem estáticos na migração progressiva; precache manual, validado por P1. Estado das fontes documenta as alegações existentes, sem nova auditoria pedagógica. Documentação em data/README.md e docs/ARCHITECTURE.md.
