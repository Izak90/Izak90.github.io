# Validação da ACADEMY

Executar a partir da raiz (Node.js 18+; sem instalar pacotes):

```powershell
node scripts/validate.cjs
```

O comando não altera ficheiros, não acede à rede e não requer browser nem build. Pode ser executado de outra pasta usando o caminho absoluto do script.

- Código 0: sem erros; avisos são permitidos.
- Código 1: erro de validação ou execução.
- Código 2: argumento desconhecido.
- `node scripts/validate.cjs --json`: relatório estruturado com erros, avisos, diagnósticos e contagens.
- `node --test scripts/validate.test.cjs`: testes do próprio validador; alterações simuladas ficam em pastas temporárias, removidas no fim.

## Verificações

Bancos descobertos em `centro_estudo/*_banco_*.json`: JSON válido; UC/versão; campos das perguntas; 80 perguntas; IDs e enunciados únicos (normalização Unicode, espaços e maiúsculas/minúsculas); quatro opções distintas; answer inteiro 0–3; exames 40/40, IDs conhecidos e únicos, sem sobreposição, união igual ao banco; temas obrigatórios nos dois exames.

`scripts/validation-topics.json` contém os temas obrigatórios por UC. É independente das perguntas e dos exames, para detetar um tema removido do banco inteiro. A lista inicial corresponde aos temas atuais inspecionados. Ao acrescentar uma UC ou alterar a organização dos temas, atualizar esta lista com base na auditoria dos materiais. Não constitui prova de cobertura pedagógica da Lista de Saberes.

HTML: caminhos href/src e data-bank-file; IDs duplicados; fragmentos locais. As rotas do índice são reconhecidas pela declaração literal mainTabsList. URLs literais HTML/JSON/JS/CSS em JavaScript também são verificadas, incluindo os mapas de UC do índice. Compilação estática dos scripts inline e ficheiros .js sem os executar. Manifest: JSON e caminhos locais.

SW: extração estática das listas literais CORE_URLS/OPTIONAL_URLS; existência dos caminhos; entradas repetidas; inclusão das páginas/JSON do Centro de Estudo, páginas Workbook, assets CSS/JS e ficheiros da shell. `./` e `./index.html` são entradas de cache distintas e válidas. Documentação, scripts de QA e a política de temas não são recursos da aplicação e não precisam de precache.

## Avisos e limites

Distribuição A/B/C/D é apenas informativa, mesmo que todas as respostas usem a mesma letra. O validador não consegue provar que as opções foram baralhadas ou que o índice corresponde pedagogicamente à resposta correta.

Metadados de dificuldade legados/ausentes geram avisos; a aplicação atual configura os bancos pelos atributos HTML e nomes fixos dos ficheiros. Não são alterados automaticamente. Ausência de coverage_audit também gera aviso.

A verificação de links é estática: URLs externos não são consultados; URLs interpolados não são resolvidos e aparecem como diagnóstico quando encontrados. O leitor HTML cobre os atributos usados neste projeto; não substitui um validador completo de HTML. A extração do precache exige listas literais: se a arquitetura mudar, adaptar o validador. Não verifica instalação PWA, mudança da versão do cache em Git, cores, interações ou comportamento offline real.

Para fluxos de browser/mobile/offline, usar `scripts/p0-smoke.cjs` (Playwright instalado separadamente; consultar `plans/p0-stabilisation.md`).

## Registo central (P2)
O comando também valida `data/ucs.json` quando presente: schema partilhado, caminhos dos quatro fluxos, banco por UC/dificuldade, bancos não registados e inclusão do JSON no precache. O leitor é partilhado com o browser (`assets/uc-registry.js`).

Regressões: `node --test scripts/validate.test.cjs scripts/uc-registry.test.cjs`. Browser: `node scripts/p2-smoke.cjs` com as mesmas variáveis Playwright/Chrome do P0. Cobre falha de carregamento/repetição, Agenda, cartões/filtros/pesquisa/metadata e overflow em quatro larguras. `node scripts/p0-smoke.cjs pwa` verifica atualização v21→v22 e offline sob o subdiretório de alojamento.

## Conteúdo PEDEx
`node --test scripts/pedex-content.test.cjs` compara os 71 subtópicos extraídos da Lista fornecida com a matriz de cobertura, verifica âncoras, IDs e fontes dos três bancos e os 11 temas nos seis exames. Integração completa: `node --test scripts/validate.test.cjs scripts/uc-registry.test.cjs scripts/pedex-content.test.cjs`. A revisão semântica de chaves/distratores permanece humana, apoiada nas fontes; os testes não a certificam.

## Conteúdo CF
`node --test scripts/cf-content.test.cjs` compara os 20 itens finais extraídos da Lista (17 entradas principais) com a matriz, âncoras e IDs/fontes dos três bancos. Verifica os 12 temas em cada um dos seis exames e distinções do BEAR/SMART. A revisão semântica continua a exigir consulta das fontes.

## Conteúdo PEVS
`node --test scripts/pevs-content.test.cjs` compara os 31 itens finais/hierarquia da Lista extraída com a matriz, verifica 45 âncoras, três bancos e oito temas em cada exame, além de regressões de polarização, dados agregados e risco cardiovascular versus limiar de diabetes. Integração: `node --test scripts/*.test.cjs`. Referências são temáticas para entradas compostas; testes estruturais não certificam semântica de todos os componentes.
