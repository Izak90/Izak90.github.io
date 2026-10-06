# Design/layout contract

Visual direction:
- mobile first
- max-w-2xl content
- Inter
- slate surfaces/borders
- blue primary accent
- amber emphasis for harder/warning states
- rounded-xl/2xl/3xl cards
- compact study typography
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
