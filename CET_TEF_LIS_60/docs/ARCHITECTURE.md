# Architecture

## Stack
- HTML5
- vanilla JavaScript
- shared CSS
- Tailwind CSS via CDN
- Font Awesome via CDN
- Inter / Google Fonts
- JSON content
- localStorage
- service worker + manifest
- static hosting compatible
- no required framework/build step

## Expected tree
CET_TEF_LIS_60/
  assets/
    app.css
    study.css
    study.js
    training.css
    training.js
    simulator.css
    simulator.js
  centro_estudo/
    <uc>_resumo.html
    <uc>_treino.html
    <uc>_simulador.html
    <uc>_banco_80_perguntas*.json
  simuladores/
    index.html
    uc01_...html ... uc17_...html
  index.html
  manifest.json
  plano.html
  plano_mj.html
  sw.js

## Shared responsibilities
app.css: base variables, safe areas, focus/touch, shell.
study.css/js: summary cards, topic nav, theme, search, dynamic sticky offsets, active-topic logic.
training.css/js: active recall UI/engine, bank loading, difficulty, localStorage errors.
simulator.css/js: exam UI/engine, bank loading, timer, nav, score, correction.

Prefer UC-specific config through data-* attributes, not UC-name branching in shared JS.

Example:
<body
 data-bank-file="./pevs_banco_80_perguntas.json"
 data-bank-file-medium="./pevs_banco_80_perguntas_medio.json"
 data-bank-file-hard="./pevs_banco_80_perguntas_dificil.json"
 data-storage-prefix="pevs">

localStorage keys must be namespaced by UC and difficulty.

PWA: preserve network-first unless explicitly changed. Verify precache paths exist before shipping. SW v22 also precaches the explicitly listed CDN dependencies and caches requested Inter/Font Awesome fonts. Other external services are not intercepted. Cache cleanup is restricted to cet-tef caches.

Exam timers use an absolute deadline and resynchronise on visibility/pageshow/focus and before interactions. Workbook simulators retain proportional duration and embedded data; their controls lock after submission.

Study shell heights are measured and observed with ResizeObserver. Topic observer margins and CSS scroll margins follow those measurements.

## Registry contract
- `data/ucs.json`: `{version: 1, ucs: [...]}`; see [registry guide](../data/README.md).
- `assets/uc-registry.js`: shared browser/Node validation, HTTP loading with a 10-second timeout, ordering and compatibility adapters.
- `index.html`: fetch registry, then refresh Estudo/Curso/session metadata; no duplicate authored UC maps. Retry preserves tab/search/filter state. Counts are unknown while data is unavailable.
- Existing native study pages keep data-* bank configuration; Workbook index stays static during this incremental migration.
- SW v20 adds `./data/ucs.json` and `./assets/uc-registry.js`. Cache membership is still manual; generation from registry is deferred. P1 checks registry schema, referenced local paths, bank filenames/registration and precache inclusion.

PEDEx usa as três dificuldades nos atributos data-* e no registo. SW v21 adiciona os bancos PEDEx Médio/Difícil ao precache; configuração da estratégia permanece network-first.

CF também usa três dificuldades nos mesmos motores/atributos. SW v22 inclui os dois novos bancos CF; existem nove bancos nativos e 51 ficheiros locais no precache.
