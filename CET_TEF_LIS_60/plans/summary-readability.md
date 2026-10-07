# Leitura dos resumos — formatação partilhada
## Goal
Facilitar a leitura do texto de cada tema em todas as UCs através de assets/study.css.
## Current state
PEVS, PEDEx e CF carregam o mesmo CSS; texto de 12 px, parágrafos próximos e títulos pouco diferenciados.
## Constraints
Preservar conteúdo, fontes, âncoras, URLs, temas claro/escuro e offsets medidos. Sem dependências nem novos ficheiros offline.
## Plan
1. Melhorar tipografia, ritmo dos parágrafos, listas, tabelas e detalhes no CSS comum.
2. Validar páginas e navegação em larguras móveis e desktop.
3. Documentar o contrato e reconciliar os planos históricos.
## Validation
Validador estrutural, testes de conteúdo existentes e smoke responsivo em Chromium.
## Progress
- [x] Inspeção das páginas e do CSS partilhado.
- [x] Formatação comum e classe study-source nos 75 parágrafos de fontes.
- [x] Validação e documentação; planos PEVS/P3 reconciliados com as conclusões já registadas.
## Decisions
Aplicar regras aos elementos semânticos dentro de .study-card, sem transformar automaticamente o texto dos materiais.
## Result
Concluído em 2026-10-07. Texto dos temas a 15 px/1.8, parágrafos espaçados, títulos diferenciados, listas com marcadores, fontes a 13 px separadas por linha e grelhas responsivas. Regras comuns em assets/study.css para UCs atuais e futuras; apenas a classe de fontes foi adicionada ao HTML. Comparação com Git confirmou que o restante HTML/conteúdo permaneceu igual.

Validação: node scripts/validate.cjs — 0 erros/0 avisos; 15 testes de conteúdo aprovados; node scripts/p0-smoke.cjs responsive — 74 verificações aprovadas em Chromium, larguras 320/390/768/1280, sem erros JS. Capturas dos detalhes conferidas visualmente. Aviso existente do Tailwind CDN permanece. Não houve novos recursos offline nem alteração de precache; SW v22 conservado, com atualização dos assets existentes pela estratégia network-first. Android/iOS reais permanecem pendentes.
