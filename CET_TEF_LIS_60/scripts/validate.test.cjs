'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const {validateBank,validateRepository}=require('./validate.cjs');
function bank(){return {uc:'UC de teste',version:'1',difficulty:'easy',coverage_audit:{},questions:Array.from({length:80},(_,i)=>({id:`Q${i}`,topic:i%2?'Tema B':'Tema A',type:'multiple_choice',question:`Pergunta ${i}?`,options:['Primeira','Segunda','Terceira','Quarta'],answer:0,explanation:'Explicação de teste.',source:'Fonte de teste.'})),exams:{exam1:Array.from({length:40},(_,i)=>`Q${i}`),exam2:Array.from({length:40},(_,i)=>`Q${i+40}`)}};}
const errors=d=>validateBank(d,'teste_banco_80_perguntas.json',['Tema A','Tema B']).errors.map(e=>e.code);
test('80 respostas A são válidas; distribuição não força equilíbrio',()=>assert.deepEqual(errors(bank()),[]));
for(const [name,code,mutate] of [
 ['pergunta em falta','question-count',d=>d.questions.pop()],
 ['ID repetido','duplicate-id',d=>d.questions[1].id='Q0'],
 ['enunciado repetido normalizado','duplicate-text',d=>d.questions[1].question='  PERGUNTA   0?  '],
 ['opção em falta','options-schema',d=>d.questions[0].options.pop()],
 ['opções repetidas','duplicate-options',d=>d.questions[0].options[1]='Primeira'],
 ['índice fracionário','answer-index',d=>d.questions[0].answer=1.5],
 ['índice fora dos limites','answer-index',d=>d.questions[0].answer=4],
 ['exame com 39','exam-count',d=>d.exams.exam1.pop()],
 ['ID repetido num exame','exam-duplicate-id',d=>d.exams.exam1[1]='Q0'],
 ['ID desconhecido','exam-unknown-id',d=>d.exams.exam1[1]='INVALID'],
 ['sobreposição','exam-overlap',d=>d.exams.exam2[0]='Q0'],
 ['pergunta fora dos exames','exam-union',d=>d.exams.exam2[0]='Q0'],
 ['tema eliminado do banco inteiro','exam-topic',d=>d.questions.forEach(q=>q.topic='Tema A')],
 ['pergunta mal formada','question-schema',d=>d.questions[0]=null],
 ['sem fonte','question-schema',d=>delete d.questions[0].source],
 ['lista de exames mal formada','exam-schema',d=>d.exams.exam1=null]
])test(name,()=>{const d=bank();mutate(d);assert.ok(errors(d).includes(code));});
test('banco mal formado produz relatório em vez de exceção',()=>{for(const d of [null,[],{},'texto'])assert.ok(validateBank(d,'banco.json').errors.length);});
function fixture(t){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'academy-validator-'));
 t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const write=(file,text)=>{const p=path.join(root,file);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,text,'utf8');};
 write('scripts/validation-topics.json',JSON.stringify({teste:['Tema A','Tema B']}));
 write('centro_estudo/teste_banco_80_perguntas.json',JSON.stringify(bank()));
 write('index.html',`<html><body><div id="ok"></div><a href="centro_estudo/teste_resumo.html#tema">Estudar</a><script>const mainTabsList=['agenda','estudo','curso'];const urls={uc:'./centro_estudo/teste_resumo.html'};</script></body></html>`);
 write('centro_estudo/teste_resumo.html','<html><body><div id="tema"></div><a href="../index.html#estudo">Voltar</a></body></html>');
 write('manifest.json',JSON.stringify({start_url:'./',icons:[]}));
 write('sw.js',`const CORE_URLS=['./','./index.html','./manifest.json','./sw.js'];const OPTIONAL_URLS=['./centro_estudo/teste_resumo.html','./centro_estudo/teste_banco_80_perguntas.json'];`);
 return {root,write};
}
test('repo válido; URLs ./ e ./index.html são ambas permitidas; hashes de tabs são rotas',t=>{const f=fixture(t);assert.deepEqual(validateRepository(f.root).errors,[]);});
for(const [name,code,change] of [
 ['JSON inválido','json-parse',f=>f.write('centro_estudo/teste_banco_80_perguntas.json','{')],
 ['link partido','local-path',f=>f.write('index.html','<a href="missing.html">Abrir</a>')],
 ['fragmento partido','local-fragment',f=>f.write('index.html','<a href="centro_estudo/teste_resumo.html#missing">Abrir</a>')],
 ['ID HTML duplicado','duplicate-html-id',f=>f.write('index.html','<div id="x"></div><div id="x"></div>')],
 ['URL JS obsoleto','local-path',f=>f.write('index.html',`<script>const urls={uc:'./centro_estudo/old.html'};</script>`)],
 ['script src partido','local-path',f=>f.write('index.html','<script src="missing.js"></script>')],
 ['JS inválido','js-syntax',f=>f.write('index.html','<script>const x = ;</script>')],
 ['precache aponta para ficheiro inexistente','local-path',f=>f.write('sw.js',`const CORE_URLS=['./missing.html'];const OPTIONAL_URLS=[];`)],
 ['novo asset offline omitido','precache-coverage',f=>f.write('assets/new.js','const valid=true;')],
 ['banco extra sem política de temas','topic-policy',f=>f.write('centro_estudo/extra_banco_80_perguntas.json',JSON.stringify(bank()))],
 ['manifest mal formado','manifest-schema',f=>f.write('manifest.json','{"icons":{}}')],
 ['configuração de temas mal formada','topic-policy',f=>f.write('scripts/validation-topics.json','{"teste":null}')]
])test(name,t=>{const f=fixture(t);change(f);assert.ok(validateRepository(f.root).errors.some(e=>e.code===code));});
test('query strings, espaços codificados, links externos e links dentro de comentários',t=>{
 const f=fixture(t);f.write('centro_estudo/ficheiro com espaços.html','<p id="tema">Tema</p>');
 f.write('index.html','<!-- <a href="./missing.html">Ignorar</a> --><a href="centro_estudo/ficheiro%20com%20espaços.html?v=1#tema">Abrir</a><a href="https://example.invalid/missing">Externo</a><script>const mainTabsList=["estudo"];</script>');
 const r=validateRepository(f.root);assert.equal(r.errors.filter(e=>e.code.startsWith('local')).length,0);
});
test('CLI: sucesso, saída JSON e argumento inválido',()=>{
 const file=path.join(__dirname,'validate.cjs');
 const good=spawnSync(process.execPath,[file,'--json'],{encoding:'utf8',cwd:os.tmpdir()});
 assert.equal(good.status,0,good.stdout+good.stderr);assert.deepEqual(JSON.parse(good.stdout).errors,[]);
 assert.equal(spawnSync(process.execPath,[file,'--unknown'],{encoding:'utf8'}).status,2);
});

test('CLI: erro devolve código 1 e JSON com localização',t=>{
 const f=fixture(t);f.write('scripts/validate.cjs',fs.readFileSync(path.join(__dirname,'validate.cjs'),'utf8'));
 f.write('centro_estudo/teste_banco_80_perguntas.json','{');
 const result=spawnSync(process.execPath,[path.join(f.root,'scripts/validate.cjs'),'--json'],{encoding:'utf8'});
 assert.equal(result.status,1);assert.ok(JSON.parse(result.stdout).errors.some(e=>e.code==='json-parse'&&e.file==='centro_estudo/teste_banco_80_perguntas.json'));
});

test('auditoria pendente produz aviso mesmo com declaração legada de 100%',()=>{
 const d=bank(); d.coverage_audit={status:'needs_revision',coverage_percent:null,declared_coverage_percent:100};
 const r=validateBank(d,'teste_banco_80_perguntas.json');
 assert.deepEqual(r.errors,[]); assert.ok(r.warnings.some(w=>w.code==='coverage-review'));
});
test('auditoria legada não é automaticamente certificada nem bloqueada pelo validador',()=>{
 const d=bank(); d.coverage_audit={coverage_percent:100};
 const r=validateBank(d,'teste_banco_80_perguntas.json');
 assert.deepEqual(r.errors,[]); assert.equal(r.warnings.some(w=>w.code==='coverage-review'),false);
});
