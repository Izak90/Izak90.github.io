import {siteConfig} from './content.js';
import {STORAGE_KEY,validateConfig} from './model.js';
import {renderBody,renderDocument,themeCSS} from './render.js';
const params=new URLSearchParams(location.search);
const page=params.has('preview')&&params.has('book')?'book':document.body.dataset.page||'home',id=params.has('preview')?params.get('book')||document.body.dataset.book||'':document.body.dataset.book||'';
let current=siteConfig;
const preview=new URLSearchParams(location.search).has('preview');
try{if(preview){const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved&&!validateConfig(saved))current=saved}}catch{}
function bind(){
  const search=document.querySelector('#book-search');
  if(search)search.addEventListener('input',()=>{let found=0;const q=search.value.toLocaleLowerCase('pt');document.querySelectorAll('[data-book-search]').forEach(card=>{card.hidden=!card.dataset.bookSearch.includes(q);if(!card.hidden)found++});document.querySelector('#search-empty').hidden=found>0});
  document.querySelectorAll('a[href$=".html"]').forEach(link=>{if(preview&&link.getAttribute('href')!=='admin.html')link.href=link.getAttribute('href')+'?preview=1'});
  const connection=()=>{const el=document.querySelector('#connection');if(el)el.textContent=navigator.onLine?'':'Disponível offline'};connection();
  let prompt;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;const button=document.querySelector('#install');if(button){button.hidden=false;button.onclick=async()=>{await prompt.prompt();button.hidden=true;prompt=null}}},{once:true});
}
function apply(config){
  current=config;document.querySelector('#site-theme').textContent=themeCSS(config);document.body.innerHTML=renderBody(config,page,id);
  if(preview){const banner=document.createElement('div');banner.className='preview-banner';banner.textContent='Pré-visualização local · alterações ainda não publicadas';document.body.prepend(banner)}
  const parsed=new DOMParser().parseFromString(renderDocument(config,{page,id}),'text/html');document.title=parsed.title;
  document.querySelector('meta[name="description"]').content=parsed.querySelector('meta[name="description"]').content;
  document.querySelector('#structured-data').textContent=parsed.querySelector('#structured-data').textContent;bind();
}
// Atualiza também a validade dos preços quando o visitante chega depois de um prazo.
apply(current);
window.addEventListener('message',event=>{if(!preview||event.origin!==location.origin||event.source!==parent||event.data?.type!=='enerelis-preview'||validateConfig(event.data.config))return;apply(event.data.config)});
window.addEventListener('online',()=>{const el=document.querySelector('#connection');if(el)el.textContent=''});
window.addEventListener('offline',()=>{const el=document.querySelector('#connection');if(el)el.textContent='Disponível offline'});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
if(preview&&parent!==window)parent.postMessage({type:'enerelis-preview-ready'},location.origin);
