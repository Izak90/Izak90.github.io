import {siteConfig} from './content.js?v=5';
import {STORAGE_KEY,validateConfig} from './model.js?v=5';
import {renderBody,renderDocument,themeCSS} from './render.js?v=5';
const params=new URLSearchParams(location.search);
const page=params.has('preview')&&params.has('book')?'book':document.body.dataset.page||'home',id=params.has('preview')?params.get('book')||document.body.dataset.book||'':document.body.dataset.book||'';
let current=siteConfig;
const preview=new URLSearchParams(location.search).has('preview');
try{if(preview){const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved&&!validateConfig(saved))current=saved}}catch{}
function bind(){
  const search=document.querySelector('#book-search');
  if(search){
    const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt').trim();
    const filter=()=>{let found=0;const q=normalize(search.value),volume=q.match(/^(?:vol(?:ume)?\.?\s*)?0*(\d+)$/);document.querySelectorAll('[data-book-search]').forEach(card=>{const matches=!q||(volume?Number(volume[1])===Number(card.dataset.bookVolume):normalize(card.dataset.bookSearch).includes(q));card.hidden=!matches;if(matches)found++});document.querySelector('#search-empty').hidden=found>0;document.querySelector('#clear-search').hidden=!search.value;document.querySelector('#search-count').textContent=q?`${found} ${found===1?'livro encontrado':'livros encontrados'}`:`${found} livros · ordem de leitura`;};
    search.addEventListener('input',filter);document.querySelectorAll('#clear-search,[data-clear-search]').forEach(button=>button.onclick=()=>{search.value='';filter();search.focus()});filter();
  }
  document.querySelectorAll('a[href]').forEach(link=>{if(!preview||link.getAttribute('href').startsWith('#'))return;const url=new URL(link.getAttribute('href'),location.href);if(url.origin===location.origin&&url.pathname.endsWith('.html')&&!url.pathname.endsWith('/admin.html')){url.searchParams.set('preview','1');link.href=url.href}});
  const connection=()=>{const el=document.querySelector('#connection');if(el)el.textContent=navigator.onLine?'':'Disponível offline'};connection();
  let prompt;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;const button=document.querySelector('#install');if(button){button.hidden=false;button.onclick=async()=>{await prompt.prompt();button.hidden=true;prompt=null}}},{once:true});
}
function apply(config){
  const scroll={x:window.scrollX,y:window.scrollY},active=document.activeElement,focusId=active?.id,selection=active?.selectionStart,searchValue=document.querySelector('#book-search')?.value;
  current=config;document.querySelector('#site-theme').textContent=themeCSS(config);document.body.innerHTML=renderBody(config,page,id);
  if(preview){const banner=document.createElement('div');banner.className='preview-banner';banner.textContent='Pré-visualização local · alterações ainda não publicadas';document.body.prepend(banner)}
  const parsed=new DOMParser().parseFromString(renderDocument(config,{page,id}),'text/html');document.title=parsed.title;
  document.querySelector('meta[name="description"]').content=parsed.querySelector('meta[name="description"]').content;
  document.querySelector('#structured-data').textContent=parsed.querySelector('#structured-data').textContent;
  const search=document.querySelector('#book-search');if(search&&searchValue!==undefined)search.value=searchValue;bind();
  if(preview){if(focusId){const next=document.getElementById(focusId);if(next){next.focus({preventScroll:true});if(typeof selection==='number'&&next.setSelectionRange)next.setSelectionRange(selection,selection)}}requestAnimationFrame(()=>window.scrollTo(scroll.x,scroll.y));}
}
// Atualiza também a validade dos preços quando o visitante chega depois de um prazo.
apply(current);
window.addEventListener('message',event=>{if(!preview||event.origin!==location.origin||event.source!==parent||event.data?.type!=='enerelis-preview'||validateConfig(event.data.config))return;apply(event.data.config)});
window.addEventListener('online',()=>{const el=document.querySelector('#connection');if(el)el.textContent=''});
window.addEventListener('offline',()=>{const el=document.querySelector('#connection');if(el)el.textContent='Disponível offline'});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
if(preview&&parent!==window)parent.postMessage({type:'enerelis-preview-ready'},location.origin);
