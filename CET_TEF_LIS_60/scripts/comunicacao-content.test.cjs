'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {extractEntries}=require('./comunicacao-source.cjs');
const {validateBank}=require('./validate.cjs');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const json=f=>JSON.parse(read(f));
const file='centro_estudo/comunicacao-no-fitness_banco_80_perguntas.json';
const bank=json(file),source=json('scripts/fixtures/comunicacao-saberes.json');
const summary=read('centro_estudo/comunicacao-no-fitness_resumo.html');
const byId=new Map(bank.questions.map(q=>[q.id,q]));
const answer=id=>{const q=byId.get(id);return q.options[q.answer];};

test('Comunicação: 80 perguntas, quatro opções e exames 40/40 com os 16 temas',()=>{
 assert.equal(bank.difficulty,'easy');
 assert.equal(source.themes.length,16);
 assert.deepEqual(validateBank(bank,file,source.themes).errors,[]);
 assert.deepEqual(json('scripts/validation-topics.json')['comunicacao-no-fitness'],source.themes);
});

test('Comunicação: todos os 108 marcadores da Lista conservados e ligados a conteúdo explícito',()=>{
 const original=extractEntries(read('scripts/fixtures/comunicacao-lista-extraida.txt'));
 assert.equal(original.length,108);
 assert.deepEqual(source.items.map(({id,module,list_page,level,text})=>({id,module,list_page,level,text})),original);
 assert.deepEqual(bank.coverage_audit.lista_items,source.items);
 assert.equal(bank.coverage_audit.items.length,80);
 for(const item of source.items){
  assert.equal(item.status,'explicit_in_summary');
  assert.equal(item.question_coverage,'thematic_reference_not_each_component');
  assert.ok(item.summary_anchors.length,item.text);
  for(const anchor of item.summary_anchors)assert.ok(summary.includes(`id="${anchor}"`),`${item.id}: ${anchor}`);
  for(const id of item.question_ids)assert.ok(byId.has(id),`${item.id}: ${id}`);
 }
 for(const q of bank.questions){
  assert.match(q.source,/Aula [1-4], pp\./);
  assert.ok(q.saberes.every(id=>bank.coverage_audit.items.some(c=>c.id===id&&c.question_ids.includes(q.id))));
 }
 for(const cls of ['study-focus','study-recap','study-retrieval'])assert.equal((summary.match(new RegExp(`class="${cls}"`,'g'))||[]).length,16);
 assert.equal((summary.match(/<details>/g)||[]).length,16);
 assert.ok(!summary.includes('<details open'));
});

test('Comunicação: distinções e ressalvas críticas não são substituídas por garantias',()=>{
 assert.match(answer('COM019'),/divulgação popular/);
 assert.match(answer('COM015'),/variam com a pessoa e o contexto/);
 assert.match(answer('COM028'),/Locução: conteúdo dito; ilocução: inspirar; perlocução: confiança/);
 assert.match(answer('COM040'),/mas os turnos.*por isso/);
 assert.match(answer('COM041'),/emotiva.*fática/);
 assert.match(answer('COM045'),/referencial e metalinguística.*emotiva e fática.*conativa.*poética/);
 assert.match(answer('COM060'),/Origem, propósito, valores, impacto e visão/);
 assert.match(answer('COM075'),/primeiros 30 segundos/);
 assert.match(answer('COM078'),/2–3 segundos/);
 assert.match(answer('COM080'),/formulação da Lista.*sem estabelecer uma percentagem universal/);
 for(const text of ['consentimento explícito','22×','65%','5%','mais de 50%','primeiros 30 segundos','omite a fática'])assert.ok(summary.includes(text),text);
 // Categorias distintas: ato assertivo (COM031) e estilo assertivo (COM070).
 assert.equal(answer('COM031'),'Assertivo');
 assert.match(answer('COM070'),/Ouvir a preocupação/);
 assert.match(answer('COM033'),/Comprometo-me a rever/);
});

test('Comunicação: registo, motores partilhados, fila própria, Workbook e precache',()=>{
 const uc=json('data/ucs.json').ucs.find(u=>u.slug==='comunicacao-no-fitness');
 assert.equal(uc.sourceStatus.coverage,'source_reviewed');
 assert.equal(uc.difficulties.length,1);
 assert.equal(uc.difficulties[0].label,'Fácil');
 assert.equal(uc.difficulties[0].bank,'./'+file);
 assert.equal(uc.workbook,'./simuladores/uc05_comunicacao_no_fitness.html');
 const sw=read('sw.js');
 assert.ok(sw.includes("'./"+file+"'"));
 for(const [field,suffix] of [['summary','resumo'],['training','treino'],['simulator','simulador']]){
  const f=`centro_estudo/comunicacao-no-fitness_${suffix}.html`;
  assert.equal(uc[field],'./'+f);
  assert.ok(sw.includes("'./"+f+"'"));
  const html=read(f);
  assert.ok(!html.includes('Psicologia do Exercício'));
  if(suffix!=='resumo')assert.ok(html.includes('data-bank-file="./comunicacao-no-fitness_banco_80_perguntas.json"'));
 }
 assert.ok(read('centro_estudo/comunicacao-no-fitness_treino.html').includes('data-storage-prefix="comunicacao-no-fitness"'));
 const sim=read('centro_estudo/comunicacao-no-fitness_simulador.html');
 assert.ok(sim.includes('../simuladores/uc05_comunicacao_no_fitness.html'));
 assert.ok(sim.includes('Simulação UC — Workbook'));
});
