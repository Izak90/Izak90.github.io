# P1 — Validação automatizada
## Goal
Um comando Node sem dependências verifica bancos, exames, temas, links locais e precache; saída não-zero perante erros.
## Current state
P0 validado; scripts/p0-smoke.cjs requer browser. Cinco bancos existentes e metadados de dificuldade legados.
## Constraints
Não alterar conteúdos, bancos, UI, URLs nem SW. Distribuição A/B/C/D apenas informativa. Sem build obrigatório.
## Plan
1. Criar validação estrutural e política explícita de temas.
2. Verificar caminhos HTML/JS, fragmentos e completude do precache local.
3. Testar erros simulados e executar sobre o repositório.
4. Documentar utilização e limites.
## Validation
node --test scripts/validate.test.cjs; node scripts/validate.cjs; sintaxe e git diff --check.
## Progress
- [x] Inspecionar documentação, bancos e caminhos.
- [x] Implementar e testar.
- [x] Documentar resultados.
## Decisions
Temas obrigatórios são uma lista independente dos exames/bancos, para detetar um tema eliminado de todo o banco. Lista inicial corresponde aos temas atuais inspecionados; não constitui auditoria pedagógica.
## Result
Concluído em 2026-10-06.
- `node scripts/validate.cjs`: PASSOU; 5 bancos, 30 HTML, 315 referências locais, 45 entradas locais de precache, 0 erros e 5 avisos de dificuldade legada.
- `node --test scripts/validate.test.cjs`: 34 testes aprovados. Incluem mutações de JSON, IDs/enunciados/opções, índices, exames, tema eliminado de todo o banco, links/fragmentos/URLs JS, assets offline omitidos, configuração inválida e códigos de saída CLI 0/1/2.
- `--json` validado; execução fora da pasta do projeto validada.
- Sem dependências adicionais, execução de SW, rede ou alterações aos conteúdos/UI/SW. Recursos de QA não fazem parte do precache.
- Documentação: scripts/README.md, docs/QUESTION_BANKS.md, docs/RELEASE_CHECKLIST.md e docs/ROADMAP.md.
- Limites: não confirma correção pedagógica, aleatorização armazenada, URLs externos, URLs dinâmicos nem funcionamento real em browser. P0 continua a complementar esta validação.
