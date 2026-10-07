'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const normalize = value => value.normalize('NFKC').trim().replace(/\s+/gu, ' ').toLocaleLowerCase('pt-PT');
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function validateBank(data, file, requiredTopics = []) {
  const errors = [], warnings = [], distribution = [0, 0, 0, 0];
  const error = (code, message) => errors.push({file, code, message});
  if (!object(data)) { error('bank-schema', 'O banco deve ser um objeto.'); return {errors, warnings, distribution}; }
  for (const key of ['uc', 'version']) if (!nonempty(data[key])) error('bank-schema', `${key}: texto obrigatório.`);
  if (!Array.isArray(data.questions)) { error('questions-schema', 'questions deve ser uma lista.'); return {errors, warnings, distribution}; }
  const questions = data.questions, ids = new Map(), texts = new Map();
  if (questions.length !== 80) error('question-count', `Esperadas 80 perguntas; encontradas ${questions.length}.`);
  questions.forEach((q, index) => {
    const label = `questions[${index}]${nonempty(q?.id) ? ` (${q.id})` : ''}`;
    if (!object(q)) { error('question-schema', `${label}: deve ser um objeto.`); return; }
    for (const key of ['id','topic','question','explanation','source']) if (!nonempty(q[key])) error('question-schema', `${label}.${key}: texto obrigatório.`);
    if (q.type !== 'multiple_choice') error('question-schema', `${label}.type: esperado multiple_choice.`);
    if (nonempty(q.id)) {
      if (ids.has(q.id)) error('duplicate-id', `${label}: ID repetido ${q.id}.`);
      else ids.set(q.id,q);
    }
    if (nonempty(q.question)) {
      const text = normalize(q.question);
      if (texts.has(text)) error('duplicate-text', `${label}: enunciado repetido de ${texts.get(text)}.`);
      else texts.set(text, q.id || index);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4 || !q.options.every(nonempty)) error('options-schema', `${label}: quatro opções de texto não vazio obrigatórias.`);
    else if (new Set(q.options.map(normalize)).size !== 4) error('duplicate-options', `${label}: opções repetidas.`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) error('answer-index', `${label}.answer: inteiro entre 0 e 3 obrigatório.`);
    else distribution[q.answer]++;
  });
  if (!object(data.exams)) error('exams-schema', 'exams deve conter exam1 e exam2.');
  const exams = [];
  for (const key of ['exam1','exam2']) {
    const exam = data.exams?.[key];
    if (!Array.isArray(exam)) { error('exam-schema', `${key}: lista de IDs obrigatória.`); exams.push([]); continue; }
    exams.push(exam);
    if (exam.length !== 40) error('exam-count', `${key}: esperadas 40 perguntas; encontradas ${exam.length}.`);
    if (new Set(exam).size !== exam.length) error('exam-duplicate-id', `${key}: IDs repetidos.`);
    for (const id of exam) if (!nonempty(id) || !ids.has(id)) error('exam-unknown-id', `${key}: ID inexistente/inválido ${JSON.stringify(id)}.`);
    const covered = new Set(exam.map(id=>ids.get(id)?.topic));
    const topics = new Set([...requiredTopics, ...questions.filter(object).map(q=>q.topic).filter(nonempty)]);
    for (const topic of topics) if (!covered.has(topic)) error('exam-topic', `${key}: falta o tema ${topic}.`);
  }
  const [first, second] = exams, union = new Set([...first,...second]);
  const overlap = [...new Set(first)].filter(id=>new Set(second).has(id));
  if (overlap.length) error('exam-overlap', `Perguntas nos dois exames: ${overlap.join(', ')}.`);
  for (const id of ids.keys()) if (!union.has(id)) error('exam-union', `Pergunta fora dos dois exames: ${id}.`);
  if (!object(data.coverage_audit)) warnings.push({file,code:'coverage-audit',message:'Não existe coverage_audit; revisão das fontes pendente.'});
  else if (data.coverage_audit.status === 'needs_revision') warnings.push({file,code:'coverage-review',message:'Auditoria de cobertura exige revisão das fontes; a declaração legada não está verificada.'});
  const filenameDifficulty = file.includes('_medio.') ? 'medium' : file.includes('_dificil.') ? 'hard' : 'easy';
  if (data.difficulty !== filenameDifficulty) warnings.push({file,code:'legacy-difficulty',message:`Dificuldade indicada pelo nome: ${filenameDifficulty}; metadado: ${data.difficulty ?? 'ausente'}. Não impede o funcionamento atual.`});
  return {errors, warnings, distribution};
}

function walk(root) {
  const files = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      if (['.git','.codex','.agents','node_modules','test-results','playwright-report'].includes(entry.name)) continue;
      const file=path.join(dir,entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile()) files.push(file);
    }
  }
  visit(root); return files;
}

function validateRepository(root = ROOT) {
  root = path.resolve(root);
  const result = {errors:[],warnings:[],diagnostics:[],counts:{banks:0,html:0,links:0,precache:0}};
  const relative = file=>path.relative(root,file).replaceAll(path.sep,'/');
  const issue = (file,code,message)=>result.errors.push({file:relative(file),code,message});
  const read = file=>fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'');
  const parse = file=>{try{return JSON.parse(read(file));}catch(e){issue(file,'json-parse',e.message);return null;}};
  const files = walk(root), html = new Map();
  const policyFile = path.join(root,'scripts/validation-topics.json');
  const policy = fs.existsSync(policyFile) ? parse(policyFile) : null;
  if (!object(policy) || !Object.keys(policy).length || Object.values(policy).some(v=>!Array.isArray(v)||!v.length||!v.every(nonempty)||new Set(v).size!==v.length)) issue(policyFile,'topic-policy','Lista independente de temas obrigatórios ausente/inválida.');
  for (const file of files.filter(f=>relative(f).startsWith('centro_estudo/') && /_banco_.*\.json$/.test(f))) {
    result.counts.banks++;
    const data=parse(file),slug=path.basename(file).split('_banco_')[0];
    if (!Array.isArray(policy?.[slug])) issue(file,'topic-policy',`Não existe política de temas para ${slug}.`);
    {
      const report=validateBank(data,relative(file),policy?.[slug]||[]);
      result.errors.push(...report.errors);result.warnings.push(...report.warnings);
      result.diagnostics.push({file:relative(file),message:`Respostas A/B/C/D: ${report.distribution.join('/')} (informativo; sem equilíbrio obrigatório).`});
    }
  }
  if (!result.counts.banks) issue(path.join(root,'centro_estudo'),'bank-missing','Nenhum banco encontrado.');
  for (const slug of Object.keys(policy||{})) if (!files.some(f=>path.basename(f)===`${slug}_banco_80_perguntas.json`)) issue(policyFile,'bank-missing',`Banco base em falta para ${slug}.`);
  // Remove scripts/styles/comments before reading HTML tags (not strings inside JS).
  for (const file of files.filter(f=>f.endsWith('.html'))) {
    result.counts.html++;
    const source=read(file).replace(/<!--[\s\S]*?-->/g,''),markup=source.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,'');
    const ids=new Set(), refs=[];
    for (const tag of markup.matchAll(/<[a-z][^>]*>/gi)) {
      const attrs=new Map();
      for (const a of tag[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) attrs.set(a[1].toLowerCase(),a[2]??a[3]??a[4]);
      const id=attrs.get('id');
      if (id) {if(ids.has(id))issue(file,'duplicate-html-id',`ID HTML repetido: ${id}.`);ids.add(id);}
      for (const key of ['href','src','data-bank-file','data-bank-file-medium','data-bank-file-hard']) if(attrs.has(key)) refs.push(attrs.get(key));
    }
    // Includes script src removed above along with script bodies.
    for (const m of source.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)) refs.push(m[1]);
    html.set(file,{ids,refs,source});
  }
  const main = html.get(path.join(root,'index.html'))?.source || '';
  const routes=new Set([...((main.match(/const\s+mainTabsList\s*=\s*\[([^\]]*)\]/)||[])[1]||'').matchAll(/['"]([^'"]+)['"]/g)].map(m=>m[1]));
  function localRef(owner, raw, fragments=true) {
    raw=raw.replaceAll('&amp;','&').trim();
    if (!raw || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(raw)) return null;
    if (raw.includes('${')) {result.diagnostics.push({file:relative(owner),message:`URL dinâmica não resolvida estaticamente: ${raw}`});return null;}
    result.counts.links++;
    let url;try{url=new URL(raw,`https://academy.invalid/${relative(owner)}`);}catch{issue(owner,'local-url',`URL inválido: ${raw}.`);return null;}
    let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{issue(owner,'local-url',`URL mal codificado: ${raw}.`);return null;}
    let target=path.resolve(root,'.'+pathname);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target=path.join(target,'index.html');
    if (!fs.existsSync(target)||!fs.statSync(target).isFile()) {issue(owner,'local-path',`Ficheiro inexistente: ${raw}.`);return target;}
    if (fragments && url.hash && html.has(target)) {
      let fragment;try{fragment=decodeURIComponent(url.hash.slice(1));}catch{fragment=url.hash.slice(1);}
      if (!html.get(target).ids.has(fragment) && !(target===path.join(root,'index.html')&&routes.has(fragment))) issue(owner,'local-fragment',`Âncora inexistente: ${raw}.`);
    }
    return target;
  }
  for (const [file,data] of html) {
    for (const ref of data.refs) localRef(file,ref);
    // Literal JS URLs used by UC maps and fetch/registration configuration.
    const scriptSource=[...data.source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join('\n');
    for (const m of scriptSource.matchAll(/['"`]((?:\.\.?\/|\/)[^'"`\s<>]*\.(?:html|json|js|css)(?:[?#][^'"`\s<>]*)?)['"`]/g)) localRef(file,m[1]);
    for (const block of data.source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc\s*=/.test(block[1])||/type\s*=\s*["'](?:application\/ld\+json|application\/json)["']/.test(block[1])) continue;
      try{new vm.Script(block[2],{filename:relative(file)});}catch(e){issue(file,'js-syntax',e.message);}
    }
  }
  for (const file of files.filter(f=>f.endsWith('.js'))) {
    try{new vm.Script(read(file),{filename:relative(file)});}catch(e){issue(file,'js-syntax',e.message);}
    if (!relative(file).startsWith('scripts/')) for(const m of read(file).matchAll(/['"]((?:\.\.?\/|\/)[^'"\s]*\.(?:html|json|js|css))['"]/g)) localRef(file,m[1],false);
  }
  const registryFile=path.join(root,'data/ucs.json');
  if(fs.existsSync(registryFile)) {
    const registry=parse(registryFile);
    {
      const schema=require('../assets/uc-registry.js').validate(registry);
      for(const message of schema)issue(registryFile,'registry-schema',message);
      if(!schema.length) {
        for(const uc of registry.ucs) {
          for(const key of ['summary','training','simulator','workbook'])if(uc[key])localRef(path.join(root,'index.html'),uc[key]);
          for(const d of uc.difficulties) {
            const bankPath=localRef(path.join(root,'index.html'),d.bank,false);
            const suffix=d.id==='medium'?'_medio':d.id==='hard'?'_dificil':'';
            if(path.basename(d.bank)!==`${uc.slug}_banco_80_perguntas${suffix}.json`)issue(registryFile,'registry-bank',`${uc.slug}/${d.id}: nome de banco incoerente com UC/dificuldade.`);
          }
        }
        const registeredBanks=new Set(registry.ucs.flatMap(uc=>uc.difficulties.map(d=>path.resolve(root,d.bank))));
        for(const file of files.filter(f=>relative(f).startsWith('centro_estudo/')&&/_banco_.*\.json$/.test(f)))if(!registeredBanks.has(file))issue(registryFile,'registry-bank',`Banco não registado: ${relative(file)}.`);
      }
    }
  }
  const manifest=path.join(root,'manifest.json');
  if(fs.existsSync(manifest)) {
    const data=parse(manifest);
    if(object(data)){if(nonempty(data.start_url))localRef(manifest,data.start_url,false);if(data.icons!==undefined&&!Array.isArray(data.icons))issue(manifest,'manifest-schema','icons deve ser uma lista.');else for(const icon of data.icons||[])if(nonempty(icon?.src))localRef(manifest,icon.src,false);}else if(data!==null)issue(manifest,'manifest-schema','Manifest deve ser um objeto.');
  } else issue(manifest,'manifest-missing','Manifest inexistente.');
  const sw=path.join(root,'sw.js'), precache=new Set(), precacheURLs=new Set();
  if(!fs.existsSync(sw))issue(sw,'precache-missing','Service worker inexistente.');
  else {
    const source=read(sw);
    for(const name of ['CORE_URLS','OPTIONAL_URLS']) {
      const match=source.match(new RegExp(`const\\s+${name}\\s*=\\s*(\\[[\\s\\S]*?\\]);`));
      if(!match){issue(sw,'precache-schema',`${name}: lista literal não encontrada.`);continue;}
      let urls;try{urls=JSON.parse(match[1].replace(/\/\/[^\n]*/g,'').replace(/'([^']*)'/g,(_,s)=>JSON.stringify(s)).replace(/,\s*]/g,']'));}catch{issue(sw,'precache-schema',`${name}: lista literal inválida.`);continue;}
      for(const url of urls) {
        if(!nonempty(url)){issue(sw,'precache-schema',`${name}: URL não textual.`);continue;}
        const target=localRef(sw,url,false);
        if(target){const key=new URL(url,'https://academy.invalid/sw.js').href;if(precacheURLs.has(key))issue(sw,'precache-duplicate',`Entrada duplicada: ${url}.`);precacheURLs.add(key);precache.add(target);}
      }
    }
    result.counts.precache=precacheURLs.size;
    const required=files.filter(f=>/^(?:data\/ucs\.json|assets\/.*\.(?:css|js)|centro_estudo\/.*\.(?:html|json)|simuladores\/.*\.html|(?:index|plano|plano_mj)\.html|manifest\.json|sw\.js)$/.test(relative(f)));
    for(const file of required)if(!precache.has(file))issue(sw,'precache-coverage',`Ficheiro necessário offline não incluído: ${relative(file)}.`);
  }
  return result;
}

if (require.main === module) {
  const args=process.argv.slice(2);
  if(args.some(a=>a!=='--json')){console.error('Utilização: node scripts/validate.cjs [--json]');process.exitCode=2;}
  else {
    try {
      const result=validateRepository();
      if(args.includes('--json'))console.log(JSON.stringify(result,null,2));
      else {
        for(const [label,items] of [['ERRO',result.errors],['AVISO',result.warnings],['INFO',result.diagnostics]])for(const item of items)console.log(`${label} ${item.file} [${item.code||'diagnóstico'}]: ${item.message}`);
        console.log(`\n${result.errors.length ? 'FALHOU' : 'PASSOU'}: ${result.counts.banks} bancos, ${result.counts.html} HTML, ${result.counts.links} referências locais, ${result.counts.precache} ficheiros offline; ${result.errors.length} erros, ${result.warnings.length} avisos.`);
      }
      process.exitCode=result.errors.length?1:0;
    } catch(e){console.error(`Falha ao executar validação: ${e.message}`);process.exitCode=1;}
  }
}
module.exports={validateBank,validateRepository};
