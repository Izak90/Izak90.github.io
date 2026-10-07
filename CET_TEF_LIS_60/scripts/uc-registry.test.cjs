const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const api=require('../assets/uc-registry.js');const registry=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/ucs.json'),'utf8'));
test('registo contém 27 UCs, 3 nativas, 17 Workbook e 9 bancos',()=>{assert.deepEqual(api.validate(registry),[]);assert.equal(registry.ucs.length,27);assert.equal(registry.ucs.filter(u=>u.summary).length,3);assert.equal(registry.ucs.filter(u=>u.workbook).length,17);assert.equal(registry.ucs.flatMap(u=>u.difficulties).length,9);});
test('metadados e ordem iguais aos seis mapas anteriores',()=>{const old=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/p2-legacy-metadata.json'),'utf8'));assert.deepEqual(api.toMaps(registry),old);});
for(const [label,change] of [
 ['slug repetido',d=>d.ucs[1].slug=d.ucs[0].slug],['título repetido',d=>d.ucs[1].title=d.ucs[0].title],['ordem repetida',d=>d.ucs[1].order=d.ucs[0].order],['URL externo no resumo',d=>d.ucs[0].summary='https://example.com/file.html'],['JSON no resumo',d=>d.ucs[0].summary='./data/file.json'],['dificuldade repetida',d=>d.ucs[0].difficulties.push(d.ucs[0].difficulties[0])],['dificuldade desconhecida',d=>d.ucs[0].difficulties[0].id='very_hard'],['fontes desconhecidas',d=>d.ucs[0].sourceStatus.coverage='official'],['item inválido',d=>d.ucs[0]=null]
])test(label,()=>{const d=structuredClone(registry);change(d);assert.ok(api.validate(d).length);assert.throws(()=>api.toMaps(d));});
test('ordem determinada pelo campo order e não pela posição JSON',()=>{const d=structuredClone(registry);d.ucs.reverse();assert.deepEqual(api.toMaps(d),api.toMaps(registry));});
test('loader rejeita HTTP e JSON inválido; devolve registo válido',async t=>{const original=global.fetch;t.after(()=>global.fetch=original);global.fetch=async()=>({ok:false,status:503});await assert.rejects(api.load('test'),/503/);global.fetch=async()=>({ok:true,json:async()=>({})});await assert.rejects(api.load('test'),/Registo/);global.fetch=async()=>({ok:true,json:async()=>registry});assert.deepEqual(await api.load('test'),registry);});

test('validador deteta caminhos, schema, bancos omitidos e registo fora do precache',t=>{
 const os=require('node:os');const {validateRepository}=require('./validate.cjs');const source=path.resolve(__dirname,'..');const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'academy-p2-'));
 t.after(()=>{assert.ok(path.resolve(tmp).startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(tmp,{recursive:true,force:true});});
 for(const name of ['assets','data','centro_estudo','simuladores','index.html','manifest.json','sw.js','plano.html','plano_mj.html'])fs.cpSync(path.join(source,name),path.join(tmp,name),{recursive:true});
 fs.mkdirSync(path.join(tmp,'scripts'));fs.copyFileSync(path.join(__dirname,'validation-topics.json'),path.join(tmp,'scripts/validation-topics.json'));
 assert.deepEqual(validateRepository(tmp).errors,[]);
 fs.writeFileSync(path.join(tmp,'data/ucs.json'),'null');assert.ok(validateRepository(tmp).errors.some(e=>e.code==='registry-schema'));
 const write=d=>fs.writeFileSync(path.join(tmp,'data/ucs.json'),JSON.stringify(d));
 let d=structuredClone(registry);d.ucs[0].summary='./centro_estudo/missing.html';write(d);assert.ok(validateRepository(tmp).errors.some(e=>e.code==='local-path'));
 d=structuredClone(registry);d.ucs[1].slug=d.ucs[0].slug;write(d);assert.ok(validateRepository(tmp).errors.some(e=>e.code==='registry-schema'));
 d=structuredClone(registry);d.ucs[0].difficulties.pop();write(d);assert.ok(validateRepository(tmp).errors.some(e=>e.code==='registry-bank'));
 write(registry);fs.writeFileSync(path.join(tmp,'sw.js'),fs.readFileSync(path.join(tmp,'sw.js'),'utf8').replace("  './data/ucs.json',",''));assert.ok(validateRepository(tmp).errors.some(e=>e.code==='precache-coverage'&&e.message.includes('data/ucs.json')));
});
