# Design/layout contract

Visual direction:
- mobile first
- max-w-2xl content
- Inter
- slate surfaces/borders
- blue primary accent
- amber emphasis for harder/warning states
- rounded-xl/2xl/3xl cards
- readable study typography with generous paragraph spacing
- dark/light themes
- safe-area aware

## Summary page order
1. app header
2. local UC menu: Resumo | Treino | Simulações
3. horizontal topic navigation
4. hero: Preparação para exame + UC + description + Temas/Perguntas/Questões-exame
5. "Pontos-chave que tens mesmo de saber"
6. topic cards

Topic header style:
- pill "Tema X"
- number + title
- no large decorative topic icon

Topic nav:
- horizontal scroll + arrows + touch + mouse wheel
- selected item remains highlighted during programmatic smooth scroll
- manual scroll restores observer-driven highlight
- active item auto-centres
- text cannot be clipped by arrows
- sticky positions use measured heights, not hardcoded offsets

## Shared summary text
`assets/study.css` defines the reading format for all UCs. Use `.study-card` for themes, `.study-subcard` for detailed concepts, `.study-grid` for short related blocks and `.study-key` for emphasis. Do not duplicate typography in individual pages.

Body text is 15 px with 1.8 line height; paragraphs have 0.85 rem spacing and a maximum width of 65ch. Theme titles are 1.2 rem and concept titles 1.0625 rem. Lists retain visible markers and spaced items; tables scroll inside the card on mobile. Grids collapse to one column when space is limited.

Use semantic paragraphs, headings, lists and tables. Source paragraphs use `class="study-source"`: 13 px text and a dividing line, with matching light/dark colours. Expandable `details` blocks retain a visible marker, keyboard focus and a separated heading when open. Preserve source text and IDs when applying formatting; do not split or rewrite content automatically.

## Learning structure inside each theme
Use `.study-focus` with a `.study-label` («Ideia principal») immediately after the theme heading. Keep the full source-referenced explanation visible in the existing concept cards. Use selective `strong` emphasis for definitions/distinctions; explicit enumerations become semantic `ul`/`ol` lists, retaining their explanations and numbering. A short comparison table can precede the detailed explanations.

`.study-example` identifies examples/applications; `.study-caution` highlights source ambiguities and common confusions with a visible «Atenção» label. Blue marks essential ideas; amber marks cautions, always accompanied by text. Do not label content as a prediction of the exam.

Finish each theme with `.study-recap` («O que recordar», 3–5 points) and `.study-retrieval` («Consegues explicar?»). Show the question and hide only the reference answer inside a native `details` element with «Ver resposta de referência». Answers and recap points must follow the existing source-referenced content; they do not replace it. These classes are shared in `assets/study.css`, without UC-specific JavaScript.

## Training
Hero → difficulty selector if needed → 10 random / 20 random / review errors / clear → topic training → sticky session → question → confirm → feedback → next → result.
Never reveal correct answer before confirm.

## Simulator
Home grouped by difficulty; Workbook card when available.
Exam: sticky status, timer, progress, q-nav, one question at a time, prev/next, submit.
Result: score /20, pass/fail, correct/total, %, blanks, detailed correction.

PEVS labels:
Fácil = blue/neutral
Médio = sky/blue
Difícil = amber
Always include text labels; color alone is insufficient.
