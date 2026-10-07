# Question-bank contract

Typical structure:
{
 "uc": "...",
 "version": "...",
 "difficulty": "easy|medium|hard",
 "questions": [{
   "id":"PREFIX001",
   "topic":"1. Tema",
   "type":"multiple_choice",
   "question":"...",
   "options":["...","...","...","..."],
   "answer":2,
   "explanation":"...",
   "source":"..."
 }],
 "exams":{"exam1":[...40...],"exam2":[...40...]},
 "coverage_audit":{...}
}

Invariants:
- 80 unique questions
- 4 options each
- answer integer 0..3
- 40 unique IDs in each exam
- exam1 and exam2 disjoint
- union of exams = all 80
- every exam ID exists
- every required major theme appears in both exams
- explicit Lista de Saberes coverage audit

Answer order:
- shuffle options in stored JSON
- update answer index after shuffle
- DO NOT force equal A/B/C/D distribution
- uneven random distributions are valid

Hard-item review:
1. strongest distractor?
2. why tempting?
3. exact word/value making it incomplete/wrong?
4. why keyed option is more complete?
5. could a knowledgeable trainer defend another answer?
If yes to 5, rewrite.

Reject items with unsupported facts, ambiguous keys, absurd distractors or explanations that merely restate the answer.

## Automated checks (P1)
Run `node scripts/validate.cjs`. Required topics are declared independently in `scripts/validation-topics.json`; update them after source review when onboarding or reorganising a UC. PEVS/PEDEx/CF têm metadados easy/medium/hard coerentes com os nomes fixos e a seleção HTML. Metadados legados/ausentes em futuros bancos produzem avisos, não erros. No question content is automatically rewritten. Coverage-audit presence is diagnostic; coverage accuracy and answer correctness require source review. See [validation guide](../scripts/README.md).

## Estado da revisão P3
CF revisto: `coverage_audit.status = reviewed`, 20/20 itens finais da Lista (17 entradas principais; contagem legada 22 preservada como histórica), metadados easy/medium/hard explícitos, 80 perguntas por banco e 12 temas nos dois exames. [Cobertura CF](CF_COVERAGE.md). Cobertura temática não significa avaliação de cada frase nem previsão do exame.

O validador emite `coverage-review` para `needs_revision`, sem tratar uma auditoria pendente como erro estrutural. Este aviso não substitui revisão pedagógica.

PEDEx revisto: metadados easy/medium/hard explícitos, 80 perguntas por banco, 11 temas nos dois exames e matriz de 71 subtópicos em [PEDEX_COVERAGE.md](PEDEX_COVERAGE.md). `coverage_audit.status = reviewed` refere revisão contra os materiais fornecidos, sem certificação externa.

PEVS revisto (2026-10-07): 31 itens finais em oito grupos da Lista original, resumo com 45 detalhes, 240 perguntas e seis exames. `coverage_audit.status = source_reviewed`; nomes fixos, IDs PEVS/PEVSH/PEVSX e partições conservados. Referências temáticas dos itens compostos não significam avaliar isoladamente cada componente em cada exame. [Cobertura e limites PEVS](PEVS_COVERAGE.md).
