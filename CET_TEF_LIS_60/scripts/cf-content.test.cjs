'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validateBank}=require('./validate.cjs');
const root=path.resolve(__dirname,'..');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const matrix=read('docs/CF_COVERAGE.json');
const original=read('scripts/fixtures/cf-saberes.json');
const summary=fs.readFileSync(path.join(root,'centro_estudo/cf_resumo.html'),'utf8');

test('CF: matriz preserva 20 itens finais, a grafia original e a hierarquia de rapport',()=>{
  assert.equal(original.top_level_count,17);
  assert.equal(matrix.items.length,20);
  assert.deepEqual(matrix.items.map(i=>i.saber),original.saberes);
  assert.equal(matrix.rapport_parent,original.rapport_parent);
  assert.equal(new Set(matrix.items.map(i=>i.section)).size,12);
  for(const item of matrix.items){
    assert.equal(item.status,'explicit');
    assert.match(item.source,/Aula [1-4],/);
    for(const anchor of item.summary)assert.ok(summary.includes(`id="${anchor}"`),`${item.saber}: ${anchor}`);
  }
});
for(const [difficulty,suffix] of [['easy',''],['medium','_medio'],['hard','_dificil']])test(`CF ${difficulty}: exames, itens e fontes coerentes`,()=>{
  const file=`centro_estudo/cf_banco_80_perguntas${suffix}.json`;
  const bank=read(file),topics=read('scripts/validation-topics.json').cf;
  assert.equal(bank.difficulty,difficulty);
  assert.equal(topics.length,12);
  assert.deepEqual(validateBank(bank,file,topics).errors,[]);
  assert.equal(bank.coverage_audit.total_saberes,20);
  assert.deepEqual(Object.keys(bank.coverage_audit.map),original.saberes);
  const ids=new Map(bank.questions.map(q=>[q.id,q]));
  for(const item of matrix.items){
    assert.ok(item.questions[difficulty].length);
    assert.deepEqual(bank.coverage_audit.map[item.saber],item.questions[difficulty]);
    for(const id of item.questions[difficulty])assert.ok(ids.has(id),`${item.saber}: ${id}`);
  }
  for(const q of bank.questions)assert.match(q.source,/Aula [1-4], pp?\./);
});
test('CF: detalhes da fonte e limites interpretativos permanecem explícitos',()=>{
  for(const text of ['Escuta ativa → Pergunta poderosa → Ponte → Nova lente','4-7-8','Amor = Alegria + Confiança','energia e horizontal de agradabilidade','baseline','Effect trata do impacto do comportamento','Attainable','3 das 4 necessidades','não é uma previsão','não são diagnósticos'])assert.ok(summary.includes(text),text);
  const hard=read('centro_estudo/cf_banco_80_perguntas_dificil.json');
  const bear=hard.questions.find(q=>q.id==='CFD066');
  assert.match(bear.options[bear.answer],/primeira é Effect.*segunda é Result/);
  const smart=hard.questions.find(q=>q.id==='CFD072');
  assert.match(smart.options[smart.answer],/atingível.*relevante/);
});
