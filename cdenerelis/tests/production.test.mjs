import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {siteConfig as c} from '../content.js';
import {validateConfig, activePrice} from '../model.js';
import {renderDocument} from '../render.js';
import {buildSite} from '../exporter.js';
import {resourceFiles} from '../resources.js';

test('catálogo aprovado e condições comerciais',()=>{
 assert.equal(validateConfig(c),'');
 assert.equal(activePrice(c.books.find(b=>b.volume===8)),26);
 assert.equal(c.books.find(b=>b.volume===8).priceUntil,'2026-12-31');
 assert.equal(activePrice(c.books.find(b=>b.volume===8),'2027-01-01'),null);
 assert.ok(c.books.every(b=>b.editions.length===0));
 assert.ok(!c.packs.some(p=>p.bookIds.length===2&&p.bookIds.includes(c.books[1].id)&&p.bookIds.includes(c.books[2].id)));
 const pack=c.packs.find(p=>p.bookIds.length===8);assert.equal(pack.price,169);assert.equal(pack.enabled,true);
});
test('HTML público não reintroduz conteúdo retirado e mantém contactos',()=>{
 for(const page of [{page:'home'},{page:'books'},...c.books.map(b=>({page:'book',id:b.id}))]){
  const html=renderDocument(c,page);
  assert.doesNotMatch(html,/id="install"|href="admin.html"|class="phone"|Poupa |\d+ VOLUMES|edição especial|edições especiais|prazo de pagamento da pré-venda anunciado/i);
  assert.ok(html.includes('mailto:cdenerelis@gmail.com'));
  assert.ok(html.includes('assets/logo-azulverde.png'));
  assert.doesNotMatch(html,/O universo de Patrícia Costa/);
  JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 }
 assert.match(renderDocument(c,{page:'books'}),/Volumes 05–08/);
 assert.match(renderDocument(c,{page:'book',id:'mascaras'}),/Condições até 31 de dezembro de 2026/);
});
test('exportação inclui recursos e converte ambos os logótipos carregados',async()=>{
 const resources=await Promise.all(resourceFiles.map(async path=>({path,data:new Uint8Array(await readFile(new URL('../'+path,import.meta.url)))})));
 const config=structuredClone(c);config.brand.logo='data:image/png;base64,AAAA';config.brand.wordmark='data:image/png;base64,BBBB';
 const files=buildSite(config,resources,{stamp:'test'}), paths=new Set(files.map(f=>f.path));
 const exported=JSON.parse(files.find(f=>f.path==='content.js').data.replace(/^export const siteConfig = /,'').replace(/;\s*$/,''));
 assert.ok(paths.has(exported.brand.logo));assert.ok(paths.has(exported.brand.wordmark));
 for(const file of files.filter(f=>f.path.endsWith('.html'))){
  for(const [,url] of String(file.data).matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)){
   if(/^(?:https?:|mailto:|#)/.test(url))continue;
   assert.ok(paths.has(url),'Recurso em falta: '+url+' em '+file.path);
  }
 }
});
