'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validateBank}=require('./validate.cjs');
const root=path.resolve(__dirname,'..');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const original=read('scripts/fixtures/pevs-saberes.json');
const matrix=read('docs/PEVS_COVERAGE.json');
const summary=fs.readFileSync(path.join(root,'centro_estudo/pevs_resumo.html'),'utf8');
const key=i=>(i.parent?`${i.parent} / `:'')+i.saber;

test('PEVS: matriz conserva os 31 itens literais, oito grupos e pais da Lista',()=>{
  assert.equal(original.groups.length,8);
  assert.equal(matrix.items.length,31);
  assert.deepEqual(matrix.groups,original.groups);
  assert.deepEqual(matrix.items.map(({group,parent,saber})=>({group,parent,saber})),original.items);
  assert.equal(new Set(matrix.items.map(i=>i.section)).size,8);
  assert.equal((summary.match(/id="pevs-detail-\d{3}"/g)||[]).length,45);
  assert.equal(matrix.source_documents.length,7);
  for(const source of matrix.source_documents)assert.match(source.sha256,/^[a-f0-9]{64}$/);
  for(const item of matrix.items){
    assert.equal(item.status,'explicit');
    for(const anchor of item.summary)assert.ok(summary.includes(`id="${anchor}"`),`${key(item)}: ${anchor}`);
  }
});
for(const [level,suffix,prefix] of [['easy','','PEVS'],['medium','_medio','PEVSH'],['hard','_dificil','PEVSX']])test(`PEVS ${level}: bancos, fontes e rastreabilidade`,()=>{
  const file=`centro_estudo/pevs_banco_80_perguntas${suffix}.json`,bank=read(file);
  assert.equal(bank.difficulty,level);
  const topics=read('scripts/validation-topics.json').pevs;
  assert.equal(topics.length,8);
  assert.deepEqual(validateBank(bank,file,topics).errors,[]);
  assert.equal(bank.coverage_audit.total_saberes,31);
  assert.deepEqual(Object.keys(bank.coverage_audit.map),original.items.map(key));
  const ids=new Set(bank.questions.map(q=>q.id));
  for(const item of matrix.items){
    assert.ok(item.questions[level].length);
    assert.deepEqual(bank.coverage_audit.map[key(item)],item.questions[level]);
    for(const id of item.questions[level])assert.ok(ids.has(id),`${key(item)}: ${id}`);
  }
  for(const q of bank.questions){
    assert.match(q.id,new RegExp(`^${prefix}\\d{3}$`));
    assert.equal(q.difficulty,level);
    assert.match(q.source,/Tema (?:1, 2, 3|4\.5_Aula Assíncrona|[678]), pp?\./);
    if(level==='hard')assert.equal(q.question_style,'single_best');
  }
});
test('PEVS: regressões de terminologia, comparação de indicadores e risco versus diagnóstico',()=>{
  const easy=read('centro_estudo/pevs_banco_80_perguntas.json');
  const hard=read('centro_estudo/pevs_banco_80_perguntas_dificil.json');
  const answer=(bank,id)=>{const q=bank.questions.find(q=>q.id===id);return q.options[q.answer];};
  assert.match(answer(easy,'PEVS006'),/polarização/);
  assert.doesNotMatch(answer(easy,'PEVS006'),/fabricação/);
  assert.match(answer(hard,'PEVSX009'),/^Polarização/);
  assert.match(answer(hard,'PEVSX028'),/39%.*não mostram/);
  assert.match(answer(hard,'PEVSX063'),/pré-diabetes.*não atinge.*diabetes/);
  assert.match(answer(hard,'PEVSX043'),/30 min.*14–17.*180.*11–14.*60.*10–13/);
  for(const text of ['não é uma previsão','31%','47%','≥126','≥100','150–300','75–150','14–17','11–14','10–13','7–9','7–8','92–125','150–200','potencialmente','Locais','Sistémicos'])assert.ok(summary.includes(text),text);
});
