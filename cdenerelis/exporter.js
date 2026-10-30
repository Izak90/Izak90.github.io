import {validateConfig,bookFile,normalizeBase} from './model.js?v=7';
import {renderDocument} from './render.js?v=7';
import {resourceFiles} from './resources.js?v=7';
export function buildSite(config, resources=[], {base='https://izak90.github.io/cdenerelis/',stamp=Date.now()}={}) {
  const error=validateConfig(config);if(error)throw Error(error);
  const copy=structuredClone(config),files=resources.map(file=>({...file}));let imageIndex=0;
  function flatten(owner,key){if(!owner[key].startsWith('data:'))return;const match=owner[key].match(/^data:image\/(png|jpeg|webp);base64,(.*)$/);let file;do{file=`assets/custom-image-${++imageIndex}.${match[1]==='jpeg'?'jpg':match[1]}`}while(files.some(existing=>existing.path===file));const data=Uint8Array.from(atob(match[2]),c=>c.charCodeAt(0));files.push({path:file,data});owner[key]=file;}
  flatten(copy.home,'image');flatten(copy.home,'storyImage');flatten(copy.author,'image');copy.books.forEach(b=>{flatten(b,'image');b.samples?.forEach(s=>flatten(s,'image'))});
  const add=(path,data)=>{const index=files.findIndex(f=>f.path===path);if(index>=0)files[index]={path,data};else files.push({path,data});};
  add('resources.js','export const resourceFiles = '+JSON.stringify([...new Set([...files.map(f=>f.path),'resources.js'])],null,2)+';\n');
  add('content.js','export const siteConfig = '+JSON.stringify(copy,null,2)+';\n');
  const pages=[{file:'index.html',page:'home'},{file:'livros.html',page:'books'},...copy.books.map(b=>({file:bookFile(b),page:'book',id:b.id}))];
  for(const page of pages)add(page.file,renderDocument(copy,{...page,base}));
  const root=normalizeBase(copy,base);
  const xml=s=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
  add('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(page=>'<url><loc>'+xml(new URL(page.file,root).href)+'</loc></url>').join('')+'</urlset>');
  add('robots.txt','User-agent: *\nAllow: /\nDisallow: '+new URL('admin.html',root).pathname+'\nSitemap: '+new URL('sitemap.xml',root).href+'\n');
  add('manifest.webmanifest',JSON.stringify({id:'./',name:copy.brand.title,short_name:'Enerelis',description:copy.seo.description,lang:'pt-PT',start_url:'./',scope:'./',display:'standalone',theme_color:copy.theme.primary,background_color:copy.theme.background,icons:[{src:'icons/icon-192.png',sizes:'192x192',type:'image/png'},{src:'icons/icon-512.png',sizes:'512x512',type:'image/png'}]},null,2));
  const cache=files.map(f=>'./'+f.path).filter(p=>!p.endsWith('.txt')&&!p.endsWith('.xml'));
  // Inclui os pedidos com versão feitos pelo HTML; os módulos e conteúdos são sempre atualizados quando há rede.
  cache.push('./',...cache.filter(path=>/\.(js|css)$/.test(path)).map(path=>path+'?v=7'));
  add('sw.js',`const CACHE='enerelis-books-v4-${stamp}';const SHELL=${JSON.stringify(cache)};
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('enerelis-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==self.location.origin||!u.href.startsWith(self.registration.scope))return;const known=SHELL.some(p=>new URL(p,self.registration.scope).href===u.href);if(!known&&r.mode!=='navigate')return;e.respondWith(fetch(r).then(response=>{if(response.ok){const copy=response.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(r,copy)))}return response}).catch(async()=>{const cached=await caches.match(r);if(cached)return cached;if(r.mode==='navigate')return caches.match(new URL('./index.html',self.registration.scope));return Response.error()}))});\n`);
  return files;
}
export async function collectResources(){
  return Promise.all(resourceFiles.map(async path=>{const response=await fetch(path,{cache:'no-store'});if(!response.ok)throw Error('Não foi possível recolher '+path);return {path,data:new Uint8Array(await response.arrayBuffer())};}));
}
