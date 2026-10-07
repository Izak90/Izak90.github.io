'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validateBank}=require('./validate.cjs');
const root=path.resolve(__dirname,'..');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const matrix=read('docs/PEDEX_COVERAGE.json');
const original=read('scripts/fixtures/pedex-saberes.json');
const summary=fs.readFileSync(path.join(root,'centro_estudo/pedex_resumo.html'),'utf8');
test('matriz preserva os 71 subtópicos originais e os 11 blocos',()=>{
  assert.equal(matrix.items.length,71);
  assert.deepEqual(matrix.items.map(i=>i.saber),original.saberes);
  assert.equal(new Set(matrix.items.map(i=>i.group)).size,11);
  for(const item of matrix.items){
    assert.equal(item.status,'explicit');
    assert.match(item.source,/Aula [123],/);
    assert.ok(item.summary.length);
    for(const anchor of item.summary)assert.ok(summary.includes(`id="${anchor}"`),`${item.saber}: ${anchor}`);
  }
});
for(const [difficulty,suffix] of [['easy',''],['medium','_medio'],['hard','_dificil']])test(`PEDEx ${difficulty}: exames, cobertura e fontes coerentes`,()=>{
  const file=`centro_estudo/pedex_banco_80_perguntas${suffix}.json`;
  const bank=read(file),topics=read('scripts/validation-topics.json').pedex;
  assert.equal(bank.difficulty,difficulty);
  assert.equal(topics.length,11);
  assert.deepEqual(validateBank(bank,file,topics).errors,[]);
  const ids=new Map(bank.questions.map(q=>[q.id,q]));
  const mapped=Object.values(bank.coverage_audit.map).flatMap(group=>Object.keys(group));
  assert.deepEqual(mapped,original.saberes);
  for(const item of matrix.items){
    assert.ok(item.questions[difficulty].length);
    assert.deepEqual(bank.coverage_audit.map[item.group][item.saber],item.questions[difficulty]);
    for(const id of item.questions[difficulty])assert.ok(ids.has(id),`${item.saber}: ${id}`);
  }
  for(const q of bank.questions)assert.match(q.source,/Aula [123], pp?\./);
});
test('valores e ressalvas dos slides são explícitos no resumo',()=>{
  for(const text of ['6–12 meses','2–6 semanas','5–10 dias','80% do que o praticante gosta','elevada','preságio','cronémica','Complemento da Aula 4'])assert.ok(summary.includes(text),text);
  assert.match(summary,/vídeo.*não.*transcrit/i);
});
