import {siteConfig} from './content.js?v=7';
import {STORAGE_KEY,validateConfig,esc,activePrice,money,contactHref} from './model.js?v=7';
import {renderBody,renderDocument,themeCSS} from './render.js?v=7';
const params=new URLSearchParams(location.search);
const page=params.has('book')?'book':document.body.dataset.page||'home',id=params.get('book')||document.body.dataset.book||'';
let current=siteConfig;
const preview=new URLSearchParams(location.search).has('preview');
function savedConfig(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved&&!validateConfig(saved))return saved}catch{}return siteConfig}
current=savedConfig();
function bind(){
  bindDiscovery();
  const search=document.querySelector('#book-search');
  if(search){
    const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt').trim();
    const filter=()=>{let found=0;const q=normalize(search.value),volume=q.match(/^(?:vol(?:ume)?\.?\s*)?0*(\d+)$/);document.querySelectorAll('[data-book-search]').forEach(card=>{const matches=!q||(volume?Number(volume[1])===Number(card.dataset.bookVolume):normalize(card.dataset.bookSearch).includes(q));card.hidden=!matches;if(matches)found++});document.querySelector('#search-empty').hidden=found>0;document.querySelector('#clear-search').hidden=!search.value;document.querySelector('#search-count').textContent=q?`${found} ${found===1?'livro encontrado':'livros encontrados'}`:`${found} livros · ordem de leitura`;};
    search.addEventListener('input',filter);document.querySelectorAll('#clear-search,[data-clear-search]').forEach(button=>button.onclick=()=>{search.value='';filter();search.focus()});filter();
  }
  document.querySelectorAll('a[href]').forEach(link=>{const target=link.getAttribute('href');const book=current.books.find(b=>target==='livro-'+b.id+'.html');if(book&&!siteConfig.books.some(b=>b.id===book.id))link.href='livros.html?book='+encodeURIComponent(book.id);if(!preview||link.getAttribute('href').startsWith('#'))return;const url=new URL(link.getAttribute('href'),location.href);if(url.origin===location.origin&&url.pathname.endsWith('.html')&&!url.pathname.endsWith('/admin.html')){url.searchParams.set('preview','1');link.href=url.href}});
  const connection=()=>{const el=document.querySelector('#connection');if(el)el.textContent=navigator.onLine?'':'Disponível offline'};connection();
  let prompt;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;const button=document.querySelector('#install');if(button){button.hidden=false;button.onclick=async()=>{await prompt.prompt();button.hidden=true;prompt=null}}},{once:true});
}
function apply(config){
  const scroll={x:window.scrollX,y:window.scrollY},active=document.activeElement,focusId=active?.id,selection=active?.selectionStart,searchValue=document.querySelector('#book-search')?.value;
  current=config;document.querySelector('#site-theme').textContent=themeCSS(config);document.body.innerHTML=renderBody(config,page,id);
  if(preview){const banner=document.createElement('div');banner.className='preview-banner';banner.textContent='Pré-visualização · guarda para aplicar à aplicação';document.body.prepend(banner)}
  const parsed=new DOMParser().parseFromString(renderDocument(config,{page,id}),'text/html');document.title=parsed.title;
  document.querySelector('meta[name="description"]').content=parsed.querySelector('meta[name="description"]').content;
  document.querySelector('#structured-data').textContent=parsed.querySelector('#structured-data').textContent;
  const search=document.querySelector('#book-search');if(search&&searchValue!==undefined)search.value=searchValue;bind();
  if(preview){if(focusId){const next=document.getElementById(focusId);if(next){next.focus({preventScroll:true});if(typeof selection==='number'&&next.setSelectionRange)next.setSelectionRange(selection,selection)}}requestAnimationFrame(()=>window.scrollTo(scroll.x,scroll.y));}
}
window.addEventListener('storage',event=>{if(!preview&&(event.key===STORAGE_KEY||event.key===null))apply(savedConfig())});
window.addEventListener('pageshow',event=>{if(event.persisted&&!preview)apply(savedConfig())});
// Atualiza também a validade dos preços quando o visitante chega depois de um prazo.
apply(current);
window.addEventListener('message',event=>{if(!preview||event.origin!==location.origin||event.source!==parent||event.data?.type!=='enerelis-preview'||validateConfig(event.data.config))return;apply(event.data.config)});
window.addEventListener('online',()=>{const el=document.querySelector('#connection');if(el)el.textContent=''});
window.addEventListener('offline',()=>{const el=document.querySelector('#connection');if(el)el.textContent='Disponível offline'});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
if(preview&&parent!==window)parent.postMessage({type:'enerelis-preview-ready'},location.origin);

function bindDiscovery(){
  const key=preview?'enerelis.enquiry.preview':'enerelis.enquiry';let selected=[];
  try{const value=JSON.parse(localStorage.getItem(key));if(Array.isArray(value))selected=[...new Set(value.filter(id=>current.books.some(b=>b.id===id)))];}catch{}
  const buttons=[...document.querySelectorAll('[data-select-book]')];
  if(buttons.length&&current.contacts.whatsapp){
    const panel=document.createElement('section');panel.className='section enquiry';panel.setAttribute('aria-labelledby','enquiry-title');panel.id='lista';document.querySelector('main').append(panel);
    function update(){
      try{localStorage.setItem(key,JSON.stringify(selected))}catch{}
      buttons.forEach(button=>{const on=selected.includes(button.dataset.selectBook);button.hidden=false;button.setAttribute('aria-pressed',String(on));button.textContent=on?'✓ Na lista · remover':'Adicionar à lista de informações'});
      const books=selected.map(id=>current.books.find(b=>b.id===id));const prices=books.map(b=>activePrice(b));const total=prices.every(p=>p!==null)?prices.reduce((sum,p)=>sum+p,0):null;
      const message='Olá Patrícia! Gostava de saber mais sobre estes livros de Crónicas de Enerelis:\n'+books.map(b=>'• Volume '+String(b.volume).padStart(2,'0')+' — '+b.title).join('\n')+(total!==null?'\nSoma dos preços individuais apresentados: '+money(total)+' (sem portes).':'')+'\nPodes confirmar a disponibilidade, os packs aplicáveis e o valor final com portes?';
      panel.innerHTML='<h2 id="enquiry-title">A tua lista de informações</h2><p id="enquiry-count" role="status" aria-live="polite">'+books.length+' '+(books.length===1?'livro selecionado':'livros selecionados')+'</p>'+(books.length?'<ul>'+books.map(b=>'<li><span>Vol. '+b.volume+' · '+esc(b.title)+'</span><button type="button" data-remove-book="'+esc(b.id)+'" aria-label="Remover '+esc(b.title)+'">Remover</button></li>').join('')+'</ul><p>'+(total===null?'Há preços por confirmar.':'Soma dos preços individuais: <strong>'+money(total)+'</strong> + portes.')+'</p><p class="small-note">A autora confirma disponibilidade, packs e total final por mensagem.</p><a class="button" target="_blank" rel="noopener noreferrer" href="'+esc(contactHref(current,message))+'">Pedir informações por WhatsApp ↗</a>':'<p>Adiciona os volumes que te interessam. Depois, envia a lista à autora por WhatsApp.</p>');
      panel.querySelectorAll('[data-remove-book]').forEach(button=>button.onclick=()=>{const removed=button.dataset.removeBook;selected=selected.filter(id=>id!==removed);update();const next=panel.querySelector('[data-remove-book]')||document.querySelector('[data-select-book="'+removed+'"]');next?.focus()});
    }
    buttons.forEach(button=>button.onclick=()=>{const id=button.dataset.selectBook;selected=selected.includes(id)?selected.filter(value=>value!==id):[...selected,id];update()});update();
    const tools=document.querySelector('.books-tools');if(tools){const link=document.createElement('a');link.className='inline-link';link.href='#lista';link.textContent='A minha lista ↓';tools.prepend(link)}
  }
  const dialog=document.querySelector('#sample-dialog'),book=current.books.find(b=>b.id===id);let sampleIndex=0,opener;
  if(dialog&&book?.samples?.length){
    const show=index=>{sampleIndex=index;const sample=book.samples[index];dialog.querySelector('img').src=sample.image;dialog.querySelector('img').alt=sample.caption||'Página '+(index+1);dialog.querySelector('#sample-caption').textContent=(index+1)+' / '+book.samples.length+(sample.caption?' · '+sample.caption:'');dialog.querySelector('[data-sample-step="-1"]').disabled=index===0;dialog.querySelector('[data-sample-step="1"]').disabled=index===book.samples.length-1;};
    document.querySelectorAll('[data-sample]').forEach(link=>link.onclick=event=>{event.preventDefault();opener=link;show(Number(link.dataset.sample));dialog.showModal()});
    dialog.querySelector('[data-close-sample]').onclick=()=>dialog.close();dialog.addEventListener('close',()=>opener?.focus());
    dialog.querySelectorAll('[data-sample-step]').forEach(button=>button.onclick=()=>{show(sampleIndex+Number(button.dataset.sampleStep));dialog.querySelector('[data-close-sample]').focus()});
    dialog.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();show(Math.max(0,Math.min(book.samples.length-1,sampleIndex+(event.key==='ArrowLeft'?-1:1))))}});
  }
}
