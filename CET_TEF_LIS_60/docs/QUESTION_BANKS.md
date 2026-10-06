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
