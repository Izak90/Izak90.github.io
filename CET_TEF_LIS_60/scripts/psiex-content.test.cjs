'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validateBank}=require('./validate.cjs');
const root=path.resolve(__dirname,'..');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const file='centro_estudo/psicologia-do-exercicio_banco_80_perguntas.json';
const bank=read(file),source=read('scripts/fixtures/psiex-saberes.json');
const summary=fs.readFileSync(path.join(root,'centro_estudo/psiex_resumo.html'),'utf8');

test('Psicologia: 80 perguntas, exames disjuntos e 11 temas em ambos',()=>{
  assert.equal(bank.difficulty,'easy');
  assert.equal(source.themes.length,11);
  assert.deepEqual(validateBank(bank,file,source.themes).errors,[]);
  assert.deepEqual(read('scripts/validation-topics.json')['psicologia-do-exercicio'],source.themes);
});
test('Psicologia: 51 itens explícitos ligados a resumo, perguntas e páginas da fonte',()=>{
  assert.equal(source.items.length,51);
  assert.deepEqual(bank.coverage_audit.items,source.items);
  assert.equal(new Set(source.items.map(i=>i.id)).size,51);
  const byId=new Map(bank.questions.map(q=>[q.id,q]));
  for(const item of source.items){
    assert.equal(item.status,'explicit');
    assert.ok(summary.includes(`id="${item.summary_anchor}"`),item.saber);
    assert.ok(item.question_ids.length,item.saber);
    for(const id of item.question_ids)assert.ok(byId.get(id)?.saberes.includes(item.id),`${item.saber}: ${id}`);
    assert.match(item.source_pages,/^\d/);
  }
  for(const q of bank.questions){
    assert.match(q.source,/Slides Psicologia do Exercício.*pp\./);
    assert.ok(q.saberes.every(id=>source.items.some(i=>i.id===id)));
  }
  assert.equal((summary.match(/class="study-focus"/g)||[]).length,11);
  assert.equal((summary.match(/class="study-recap"/g)||[]).length,11);
  assert.equal((summary.match(/<details>/g)||[]).length,11);
  assert.ok(!summary.includes('<details open'));
});
test('Psicologia: respostas preservam distinções das tabelas e valores dos slides',()=>{
  const answer=id=>{const q=bank.questions.find(q=>q.id===id);return q.options[q.answer];};
  assert.match(answer('PSI022'),/Integrada, extrínseca/);
  assert.match(answer('PSI039'),/direção alta e apoio baixo/);
  assert.match(answer('PSI042'),/delegação/);
  assert.match(answer('PSI054'),/90–150.*moderado/);
  assert.match(answer('PSI072'),/Interno estreito/);
  assert.ok(summary.includes('Identificada e integrada continuam a ser <strong>extrínsecas</strong>'));
  assert.ok(summary.includes('Não diagnostica nem realiza psicoterapia'));
  assert.ok(summary.includes('sem diagnóstico oficial independente'));
});
test('Psicologia: registo, configuração dos motores e Workbook coerentes',()=>{
  const uc=read('data/ucs.json').ucs.find(u=>u.slug==='psicologia-do-exercicio');
  assert.equal(uc.difficulties.length,1);
  assert.equal(uc.difficulties[0].bank,'./'+file);
  assert.equal(uc.sourceStatus.coverage,'source_reviewed');
  for(const kind of ['treino','simulador']){
    const page=fs.readFileSync(path.join(root,`centro_estudo/psiex_${kind}.html`),'utf8');
    assert.ok(page.includes('data-bank-file="./psicologia-do-exercicio_banco_80_perguntas.json"'));
    assert.ok(!page.includes('data-bank-file-medium'));
    assert.ok(!page.includes('data-bank-file-hard'));
  }
  const training=fs.readFileSync(path.join(root,'centro_estudo/psiex_treino.html'),'utf8');
  assert.ok(training.includes('data-storage-prefix="psiex"'));
  const simulator=fs.readFileSync(path.join(root,'centro_estudo/psiex_simulador.html'),'utf8');
  assert.ok(simulator.includes('Simulação UC — Workbook'));
  assert.ok(simulator.includes('../simuladores/uc04_psicologia_do_exercicio.html'));
});
