export const STORAGE_KEY = 'cdenerelis.site.v4';
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const fonts = {condensed:'"Barlow Condensed", "Arial Narrow", Impact, sans-serif', serif:'Georgia, "Times New Roman", serif', sans:'"DM Sans", Arial, sans-serif'};
export const money = value => value === null ? 'Consultar preço' : new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(value);
export const bookFile = book => `livro-${book.id}.html`;
export function today() {const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Lisbon',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());return ['year','month','day'].map(t=>p.find(i=>i.type===t).value).join('-');}
export function activePrice(item, date=today()) {return item.priceUntil && item.priceUntil<date ? null : item.price;}
export function validDate(value){if(value==='')return true;if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(value+'T12:00:00Z');return Number.isFinite(date.getTime())&&date.toISOString().startsWith(value);}
export function validISBN(value) {
  const text = String(value).replace(/[-\s]/g,'').toUpperCase();
  if (/^(978|979)\d{10}$/.test(text)) return [...text].reduce((sum,c,i)=>sum+Number(c)*(i%2?3:1),0)%10===0;
  if (/^\d{9}[\dX]$/.test(text)) return [...text].reduce((sum,c,i)=>sum+(c==='X'?10:Number(c))*(10-i),0)%11===0;
  return false;
}
export function imageOK(value) { return typeof value==='string' && (/^assets\/[a-zA-Z0-9_.-]+\.(?:png|jpe?g|webp|svg)$/.test(value) || /^data:image\/(?:png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(value) && value.length<2200000); }
export function instagramOK(value) { try {const url=new URL(value);return url.protocol==='https:'&&['instagram.com','www.instagram.com'].includes(url.hostname)&&!url.username&&!url.password;} catch{return false;} }
export function normalizeBase(config, fallback='https://izak90.github.io/cdenerelis/') { return config.seo.domain ? new URL(config.seo.domain.endsWith('/')?config.seo.domain:config.seo.domain+'/').href : fallback; }
const priceOK = n => n===null || Number.isFinite(n) && n>=0 && n<=100000;
const textOK = (s,max=1000) => typeof s==='string' && s.length<=max;
const idOK = s => typeof s==='string' && /^[a-z0-9][a-z0-9-]{0,79}$/.test(s);
export function validateConfig(config) {
  try {
    if (!config || config.version!==4) return 'Ficheiro de configuração incompatível.';
    for (const group of ['brand','home','author','booksPage','contacts','seo']) {
      if (!config[group] || Array.isArray(config[group])) return `Falta a secção ${group}.`;
      for (const [key,value] of Object.entries(config[group])) {
        if (!textOK(value,key.toLowerCase().includes('image')?2200000:15000)) return 'Há campos de texto inválidos.';
      }
    }
    if (!config.brand.title.trim() || !config.home.title.trim() || !config.author.name.trim()) return 'Preenche o nome do site, o título inicial e o nome da autora.';
    for (const image of [config.home.image,config.home.storyImage,config.author.image]) if (!imageOK(image)) return 'Imagem inválida. Usa uma imagem carregada no editor.';
    if (!instagramOK(config.contacts.instagram)) return 'A ligação do Instagram deve começar por https://www.instagram.com/.';
    if (config.contacts.whatsapp && !/^\+?\d{8,15}$/.test(config.contacts.whatsapp)) return 'WhatsApp: indica apenas o indicativo e o número (8–15 algarismos).';
    if (config.seo.domain) {const url=new URL(config.seo.domain);if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash) return 'O domínio deve ser um endereço HTTPS sem parâmetros.';}
    if (!['split','centered','minimal'].includes(config.theme.layout) || !Object.hasOwn(fonts,config.theme.headingFont) || !Object.hasOwn(fonts,config.theme.bodyFont)) return 'Escolhe uma apresentação e fontes disponíveis no editor.';
    for (const field of ['primary','accent','background','text','muted']) if(!/^#[0-9a-f]{6}$/i.test(config.theme[field])) return 'Há uma cor inválida.';
    if (!Array.isArray(config.books)||config.books.length>50||!Array.isArray(config.packs)||config.packs.length>30) return 'Limite: 50 livros e 30 packs.';
    if(config.faq!==undefined&&(!Array.isArray(config.faq)||config.faq.length>20||config.faq.some(item=>!textOK(item.question,250)||!item.question.trim()||!textOK(item.answer,2500)||!item.answer.trim())))return 'Revê as perguntas e respostas (máximo de 20).';
    const ids = new Set();
    for (const book of config.books) {
      if(book.intro!==undefined&&!textOK(book.intro,1500)||book.dimensions!==undefined&&!textOK(book.dimensions,150))return 'Revê a apresentação e as dimensões do livro.';
      if(book.samples!==undefined&&(!Array.isArray(book.samples)||book.samples.length>8||book.samples.some(s=>s.image==='assets/book-placeholder.svg'||!imageOK(s.image)||!textOK(s.caption,250))))return 'A amostra aceita até 8 imagens com legenda.';
      if (!idOK(book.id)||ids.has(book.id)) return 'Cada livro precisa de um identificador único.'; ids.add(book.id);
      if (!Number.isInteger(book.volume)||book.volume<1||book.volume>999||!textOK(book.title,150)||!book.title.trim()||!textOK(book.synopsis,12000)||!book.synopsis.trim()) return 'Preenche o título, volume e sinopse de cada livro.';
      if (!priceOK(book.price)||!textOK(book.priceNote,400)||!textOK(book.availability,150)||!imageOK(book.image)||!textOK(book.imageAlt,250)) return 'Verifica o preço, a disponibilidade ou a imagem do livro.';
      if(!validDate(book.priceUntil)||!Array.isArray(book.editions)||book.editions.length>10||book.editions.some(e=>!textOK(e.label,150)||!priceOK(e.price)||!textOK(e.status,100)||!textOK(e.description,1500))) return 'Verifica as datas de preço ou as edições alternativas.';
      if (![book.year,book.pages,book.tomes].every(n=>n===null||Number.isInteger(n)&&n>0&&n<10000)) return 'Ano, páginas e tomos devem ser números inteiros positivos ou ficar vazios.';
      if (!Array.isArray(book.isbn)||book.isbn.length>10||book.isbn.some(item=>!textOK(item.label,100)||!validISBN(item.value))) return 'Um ISBN não é válido. Confirma todos os algarismos e a edição.';
    }
    const packs=new Set();
    for(const pack of config.packs){
      if(!idOK(pack.id)||packs.has(pack.id)||!textOK(pack.title,150)||!pack.title.trim()||!textOK(pack.description,1500)||!priceOK(pack.price)||!validDate(pack.priceUntil)||typeof pack.enabled!=='boolean') return 'Verifica os dados dos packs.';
      packs.add(pack.id);
      if(!Array.isArray(pack.bookIds)||!pack.bookIds.length||new Set(pack.bookIds).size!==pack.bookIds.length||pack.bookIds.some(id=>!ids.has(id))) return 'Seleciona os livros de cada pack.';
    }
    if(!config.pricing||!validDate(config.pricing.promoUntil)||!validDate(config.pricing.preorderUntil)||!priceOK(config.pricing.preorderShipping))return 'Verifica os prazos e os portes.';
    for(const field of ['shippingSmall','shippingLarge'])if(!Array.isArray(config.pricing[field])||config.pricing[field].length!==3||config.pricing[field].some(n=>!priceOK(n)))return 'Verifica a tabela de portes.';
    for(const field of ['title','intro','shippingNote','paymentText','preorderText'])if(!textOK(config.pricing[field],2500))return 'Verifica os textos das condições de venda.';
    return '';
  } catch {return 'Configuração inválida. Revê os campos ou importa uma cópia válida.';}
}
export function contactHref(config, subject='') {
  if (config.contacts.whatsapp) return `https://wa.me/${config.contacts.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(subject || config.contacts.whatsappMessage)}`;
  return config.contacts.instagram;
}

export function packSaving(config,pack,date=today()) {
  const price=activePrice(pack,date),books=pack.bookIds.map(id=>config.books.find(b=>b.id===id));
  if(price===null||!books.length||books.some(b=>!b||activePrice(b,date)===null))return null;
  const total=books.reduce((sum,b)=>sum+activePrice(b,date),0);
  return total>price?Math.round((total-price)*100)/100:null;
}
