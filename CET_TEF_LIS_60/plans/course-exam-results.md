# Pautas finais de CF e PEVS

## Goal
Adicionar na secção Curso links para abrir os dois PDFs fornecidos, junto das UCs correspondentes.

## Current state
O Curso é renderizado pelo registo central, em lista geral e filtrada. Não existe campo para resultados. PDFs disponíveis em Downloads. Trabalho prévio no checkout será preservado.

## Constraints
Preservar originais PDF, sem transcrever dados pessoais para a interface. HTML/JS estáticos e estilos partilhados. Apenas links, sem alteração de notas ou estados das UC. Publicação remota não solicitada.

## Plan
1. Copiar os PDF para data/pautas e acrescentar campo opcional resultsPdf ao registo/adaptador.
2. Mostrar «Pauta final (PDF)» nas listas da secção Curso, abrindo em novo separador.
3. Validar caminhos locais PDF, incluir offline e incrementar cache.
4. Validar schema, links, browser móvel/desktop e acesso offline.

## Validation
Validador estático, testes de registo/validador, integridade dos PDF por hash e browser com ligação por UC, pesquisa/filtros, resposta PDF e offline.

## Progress
- [x] Inspecionar caminhos, PDFs, registo e renderização.
- [x] Implementar e validar.

## Decisions
resultsPdf é opcional; omissão mantém compatibilidade com as restantes UCs. Não é usado para inferir resultados individuais nem a conclusão administrativa da UC.

## Result
Pautas copiadas sem alteração (hashes SHA-256 iguais aos originais; um PDF de uma página por UC). Registo, adaptador e listas do Curso ligados; links em novo separador. Cache v26 com ambos os PDFs, mantendo network-first.

Validação estática: 35 HTML, 470 referências locais, 59 ficheiros offline, zero erros e avisos. Testes de registo/validador: 51 passaram, incluindo caminhos PDF inválidos, ficheiro em falta e omissão de precache. Expectativas legadas dos testes atualizadas para os resumos/formadores já existentes, sem modificar esses dados.

Browser: 43 verificações passaram — links na UC correta, novo separador, listas geral/filtrada, pesquisa, ausência de overflow em 320/390/1280 px e claro/escuro; respostas application/pdf e conteúdo PDF válido; Curso e ambos os PDFs acessíveis offline após limpeza do cache HTTP. Sem erros JS. `git diff --check` passou. Nenhuma publicação remota efetuada.
