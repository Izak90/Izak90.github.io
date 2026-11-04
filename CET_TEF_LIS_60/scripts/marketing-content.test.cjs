'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateBank}=require('./validate.cjs'),{extractLista}=require('./marketing-source.cjs');
const editorial=require('./fixtures/marketing-content.cjs');
const root=path.resolve(__dirname,'..'),slug='marketing-no-fitness';
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f));
const file=`centro_estudo/${slug}_banco_80_perguntas.json`,bank=json(file),source=json('scripts/fixtures/marketing-saberes.json'),summary=read(`centro_estudo/${slug}_resumo.html`);
const byId=new Map(bank.questions.map(q=>[q.id,q]));
const answer=id=>{const q=byId.get(id);return q.options[q.answer];};

test('Marketing: 80 perguntas, exames 40/40 e cinco perguntas de cada um dos oito temas em ambos',()=>{
 assert.equal(bank.difficulty,'easy');assert.equal(source.themes.length,8);
 assert.deepEqual(validateBank(bank,file,source.themes).errors,[]);
 assert.deepEqual(json('scripts/validation-topics.json')[slug],source.themes);
 for(const ids of Object.values(bank.exams))for(const topic of source.themes)assert.equal(ids.filter(id=>byId.get(id).topic===topic).length,5,topic);
});

test('Marketing: oito grupos e 23 marcadores originais têm cobertura explícita no resumo',()=>{
 const original=extractLista(read('scripts/fixtures/marketing-lista-extraida.txt'));
 assert.equal(original.groups.length,8);assert.equal(original.items.length,23);
 assert.deepEqual(source.groups,original.groups);
 assert.deepEqual(source.items.map(({id,group,list_page,saber})=>({id,group,list_page,saber})),original.items);
 assert.deepEqual(bank.coverage_audit.lista_items,source.items);
 const referenced=new Set();
 for(const e of source.items){
  assert.equal(e.status,'explicit_in_summary');assert.equal(e.question_coverage,'thematic_reference_not_each_component');
  assert.ok(e.summary_anchors.length&&e.question_ids.length,e.id);
  for(const anchor of e.summary_anchors)assert.ok(summary.includes(`id="${anchor}"`),`${e.id}: ${anchor}`);
  for(const id of e.question_ids){assert.ok(byId.has(id),`${e.id}: ${id}`);referenced.add(id);}
 }
 assert.equal(referenced.size,80);
 for(const cls of ['study-focus','study-recap','study-retrieval'])assert.equal((summary.match(new RegExp(`class="${cls}"`,'g'))||[]).length,8);
 assert.equal((summary.match(/<details>/g)||[]).length,8);assert.ok(!summary.includes('<details open'));
});

test('Marketing: baralhamento preserva todas as chaves e opções editoriais',()=>{
 const blocks=editorial.flatMap(t=>t.blocks.map(b=>({b,source:t.pages+'.'})));assert.equal(blocks.length,80);
 blocks.forEach(({b,source},i)=>{
  const q=byId.get(`MKT${String(i+1).padStart(3,'0')}`);
  assert.equal(q.question,b[2]);assert.equal(q.options[q.answer],b[3][0],q.id);
  assert.deepEqual([...q.options].sort(),[...b[3]].sort());assert.equal(q.explanation,b[4]);assert.equal(q.source,source);
  assert.ok(q.saberes.every(id=>bank.coverage_audit.items.some(c=>c.id===id&&c.question_ids.includes(q.id))));
 });
});

test('Marketing: cálculos, denominadores, causalidade e promessas não são confundidos',()=>{
 assert.equal(answer('MKT017'),'49 €');assert.equal(answer('MKT022'),'30 €');assert.equal(answer('MKT024'),'196 €');
 assert.equal(answer('MKT026'),'22%');assert.equal(answer('MKT028'),'4 meses');
 assert.equal(answer('MKT047'),'38,9%');assert.equal(answer('MKT048'),'64,3%');
 assert.match(answer('MKT049'),/20% de conversão/);assert.match(answer('MKT050'),/^Não;/);
 assert.match(answer('MKT029'),/sem impor um rácio universal/);
 assert.match(answer('MKT060'),/Presenças/);
 assert.match(answer('MKT072'),/lead→marcação.*show rate.*churn/);
 assert.match(answer('MKT076'),/não é totalmente controlado/);
 for(const term of ['não demonstra','não prova','100','3–5','promessa mais prova','sem previsão das perguntas do exame'])assert.ok(summary.includes(term),term);
 assert.ok(!summary.includes('pode perder até 10kg'));
 // Fonte do caso e contas de estudo: denominadores explícitos.
 assert.equal(Math.round(70/180*1000)/10,38.9);assert.equal(Math.round(45/70*1000)/10,64.3);
});

test('Marketing: registo, fila própria, Workbook e recursos offline coerentes',()=>{
 const uc=json('data/ucs.json').ucs.find(u=>u.slug===slug),sw=read('sw.js');
 assert.equal(uc.sourceStatus.coverage,'source_reviewed');assert.equal(uc.title,'Marketing no Fitness');
 assert.deepEqual(uc.difficulties,[{id:'easy',label:'Fácil',bank:'./'+file}]);
 for(const [key,suffix] of [['summary','resumo'],['training','treino'],['simulator','simulador']]){
  const f=`centro_estudo/${slug}_${suffix}.html`,html=read(f);
  assert.equal(uc[key],'./'+f);assert.ok(sw.includes("'./"+f+"'"));
  assert.ok(!html.includes('Psicologia do Exercício'));
  if(suffix!=='resumo')assert.ok(html.includes(`data-bank-file="./${slug}_banco_80_perguntas.json"`));
 }
 assert.ok(sw.includes("'./"+file+"'"));
 assert.ok(read(`centro_estudo/${slug}_treino.html`).includes(`data-storage-prefix="${slug}"`));
 const sim=read(`centro_estudo/${slug}_simulador.html`);
 assert.ok(sim.includes('Simulação UC — Workbook'));assert.ok(sim.includes('../simuladores/uc11_marketing_no_fitness.html'));
});
