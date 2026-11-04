'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateBank}=require('./validate.cjs'),{extractEntries}=require('./etica-source.cjs');
const editorial=require('./fixtures/etica-content.cjs');
const root=path.resolve(__dirname,'..'),slug='etica-e-deontologia-no-fitness';
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f));
const file=`centro_estudo/${slug}_banco_80_perguntas.json`,bank=json(file),source=json('scripts/fixtures/etica-saberes.json'),summary=read(`centro_estudo/${slug}_resumo.html`);
const byId=new Map(bank.questions.map(q=>[q.id,q]));
const answer=id=>{const q=byId.get(id);return q.options[q.answer];};

test('Ética: 80 perguntas e exames 40/40 disjuntos com 16 temas em ambos',()=>{
 assert.equal(bank.difficulty,'easy');assert.equal(source.themes.length,16);
 assert.deepEqual(validateBank(bank,file,source.themes).errors,[]);
 assert.deepEqual(json('scripts/validation-topics.json')[slug],source.themes);
});

test('Ética: todos os 40 itens originais, 9 valores e 31 legislação, com referências explícitas',()=>{
 const entries=extractEntries(read('scripts/fixtures/etica-lista-extraida.txt'));
 assert.equal(entries.length,40);assert.equal(entries.filter(e=>e.id.startsWith('ETI-V')).length,9);assert.equal(entries.filter(e=>e.id.startsWith('ETI-L')).length,31);
 assert.deepEqual(source.items.map(({id,area,list_number,list_page,text})=>({id,area,list_number,list_page,text})),entries);
 assert.deepEqual(bank.coverage_audit.lista_items,source.items);
 for(const e of source.items){
  assert.equal(e.status,'explicit_in_summary');assert.equal(e.question_coverage,'thematic_reference_not_each_component');
  assert.ok(e.summary_anchors.length&&e.question_ids.length,e.id);
  for(const anchor of e.summary_anchors)assert.ok(summary.includes(`id="${anchor}"`),`${e.id}: ${anchor}`);
  for(const id of e.question_ids)assert.ok(byId.has(id),`${e.id}: ${id}`);
 }
 for(const cls of ['study-focus','study-recap','study-retrieval'])assert.equal((summary.match(new RegExp(`class="${cls}"`,'g'))||[]).length,16);
 assert.equal((summary.match(/<details>/g)||[]).length,16);assert.ok(!summary.includes('<details open'));
});

test('Ética: baralhamento preserva todas as chaves editoriais, explicações e fontes',()=>{
 const blocks=editorial.flatMap(t=>t.blocks.map(b=>({b,source:t.pages+'.'})));
 assert.equal(blocks.length,80);
 blocks.forEach(({b,source},i)=>{
  const q=byId.get(`ETI${String(i+1).padStart(3,'0')}`);
  assert.equal(q.question,b[2]);assert.equal(q.options[q.answer],b[3][0],q.id);
  assert.deepEqual([...q.options].sort(),[...b[3]].sort());assert.equal(q.explanation,b[4]);assert.equal(q.source,source);
  assert.ok(q.saberes.every(id=>bank.coverage_audit.items.some(c=>c.id===id&&c.question_ids.includes(q.id))));
 });
});

test('Ética: distinções de títulos, regiões, documentos, seguros e piscinas permanecem claras',()=>{
 assert.match(answer('ETI024'),/5 anos e 5 UC/);assert.match(answer('ETI025'),/25 horas/);
 assert.match(answer('ETI051'),/3 anos e 3 UC/);assert.match(answer('ETI026'),/385\/1999/);
 assert.match(answer('ETI030'),/Artigo 19.º.*inferior a 200/);
 assert.match(answer('ETI032'),/exclusivamente aos utentes/);
 assert.match(answer('ETI035'),/coordenação e supervisão do DT/);
 assert.match(answer('ETI039'),/proprietário ou a entidade exploradora/);
 assert.match(answer('ETI040'),/Manual: DT.*regulamento: proprietário/);
 assert.match(answer('ETI047'),/Metade.*no mínimo uma hora/);
 assert.equal(answer('ETI048'),'Possuir');assert.match(answer('ETI049'),/dois ginásios da mesma entidade/);
 assert.match(answer('ETI060'),/SPA.*Audiogest.*Gedipe/);
 assert.match(answer('ETI064'),/Vigilância permanente.*SBV.*material/);
 assert.match(answer('ETI065'),/^Não;/);assert.match(answer('ETI076'),/entidade patronal/);
 for(const text of ['não ensinar que o consentimento é a única base possível','seguro de acidentes de trabalho como obrigatório','técnico identificado com formação em suporte básico de vida','não importar a regra dos Açores','atividade suspensa'])assert.ok(summary.toLocaleLowerCase('pt-PT').includes(text.toLocaleLowerCase('pt-PT')),text);
});

test('Ética: registo, armazenamento próprio, Workbook e quatro novos recursos offline',()=>{
 const uc=json('data/ucs.json').ucs.find(u=>u.slug===slug),sw=read('sw.js');
 assert.equal(uc.sourceStatus.coverage,'source_reviewed');assert.equal(uc.trainer,'José Júlio Vale Castro');
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
 assert.ok(sim.includes('Simulação UC — Workbook'));assert.ok(sim.includes('../simuladores/uc15_etica_e_deontologia_no_fitness.html'));
});
