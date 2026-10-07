const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const os = require('node:os');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const mount = '/CET_TEF_LIS_60';
const registry = JSON.parse(fs.readFileSync(path.join(root, 'data/ucs.json'), 'utf8'));
const difficulties = uc => registry.ucs.find(item => item.slug === uc).difficulties.map(item => item.id);
// Simula o cache v21 sem editar ficheiros.
const previousSW = fs.readFileSync(path.join(root,'sw.js'),'utf8').replace("'cet-tef-v22'", "'cet-tef-v21'");
let servePreviousSW = false;
const report = { checks: [], errors: [], warnings: [] };
const check = (name, value) => { assert.ok(value, name); report.checks.push(name); if(report.checks.length % 25 === 0) console.log(`${report.checks.length} checks passed`); };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const pathname=url.pathname.startsWith(mount+'/')?url.pathname.slice(mount.length):url.pathname;
  let file = path.resolve(root, '.' + decodeURIComponent(pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' }[path.extname(file)] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store');
  res.end(pathname === '/sw.js' && servePreviousSW ? previousSW : fs.readFileSync(file));
});
const bankFile = (uc, diff) => `${uc}_banco_80_perguntas${diff === 'medium' ? '_medio' : diff === 'hard' ? '_dificil' : ''}.json`;
const readBank = (uc, diff) => JSON.parse(fs.readFileSync(path.join(root, 'centro_estudo', bankFile(uc, diff)), 'utf8'));
let browser, origin, page;
async function waitForAsync(p, predicate, arg, options = {}) {
  const deadline = Date.now() + (options.timeout || 60000);
  while (Date.now() < deadline) {
    if (await p.evaluate(predicate, arg)) return;
    await p.waitForTimeout(100);
  }
  throw new Error('Timeout while waiting for async browser condition');
}
async function open(url) { await page.goto(origin + url, { waitUntil: 'networkidle' }); }
async function layout(label) {
  const result = await page.evaluate(() => {
    const header = document.querySelector('body > header');
    const nav = document.getElementById('uc-local-nav');
    return { overflow: document.documentElement.scrollWidth - innerWidth, header: header?.offsetHeight, navTop: nav ? parseFloat(nav.style.top) : null, dark: document.documentElement.classList.contains('dark') };
  });
  check(label + ': no horizontal overflow', result.overflow <= 1);
  if (result.navTop !== null) check(label + ': local nav follows header', Math.abs(result.header - result.navTop) <= 1);
}
async function summaries() {
  for (const uc of ['pevs', 'pedex', 'cf']) {
    await open(`/centro_estudo/${uc}_resumo.html`);
    await layout(uc + ' summary');
    const old = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await page.evaluate(() => toggleTheme());
    check(uc + ': theme toggles', (await page.evaluate(() => document.documentElement.classList.contains('dark'))) !== old);
    await page.reload({waitUntil:'networkidle'});
    check(uc + ': theme persists', (await page.evaluate(() => document.documentElement.classList.contains('dark'))) !== old);
    const links = page.locator('.study-nav[data-section]');
    const target = await links.nth(1).getAttribute('data-section');
    await links.nth(1).click();
    await page.waitForTimeout(1300);
    check(uc + ': topic click selected', await links.nth(1).evaluate(el => el.classList.contains('is-active')));
    check(uc + ': topic scroll below sticky shell', await page.evaluate(id => document.getElementById(id).getBoundingClientRect().top >= document.getElementById('topic-nav').getBoundingClientRect().bottom - 2, target));
    if (await page.locator('#search-input').count()) {
      await page.evaluate(() => { toggleSearch(); document.getElementById('search-input').value='zzzz-no-topic'; handleSummarySearch(); });
      check(uc + ': search hides unmatched sections', await page.locator('.study-section:not(.study-search-hidden)').count() === 0);
      await layout(uc + ' search');
      await page.evaluate(() => clearSummarySearch());
      check(uc + ': clear restores sections', await page.locator('.study-section:not(.study-search-hidden)').count() > 0);
    }
    const manualTarget = await links.nth(2).getAttribute('data-section');
    await page.evaluate(id=>{window.dispatchEvent(new WheelEvent('wheel',{deltaY:50}));const offset=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--study-topic-offset'));window.scrollTo({top:document.getElementById(id).getBoundingClientRect().top+scrollY-offset+1,behavior:'instant'});},manualTarget);
    await page.waitForFunction(id=>document.querySelector(`.study-nav[data-section="${id}"]`)?.classList.contains('is-active'),manualTarget,{timeout:5000});
    check(uc + ': manual scroll selects topic', await links.nth(2).evaluate(el=>el.classList.contains('is-active')));
    await page.locator('#uc-local-nav a').filter({hasText:'Treino'}).click();
    await page.waitForSelector('#setup:not(.hidden)');
    check(uc + ': summary -> training', page.url().includes(`${uc}_treino.html`));
    await page.locator('#uc-local-nav a').filter({hasText:'Simula'}).click();
    await page.waitForSelector('#home:not(.hidden)');
    check(uc + ': training -> simulator', page.url().includes(`${uc}_simulador.html`));
    await page.locator('#uc-local-nav a').filter({hasText:'Resumo'}).click();
    check(uc + ': simulator -> summary', page.url().includes(`${uc}_resumo.html`));
  }
}
async function training() {
  for (const uc of ['pevs', 'pedex', 'cf']) {
    await open(`/centro_estudo/${uc}_treino.html`);
    await page.waitForSelector('#setup:not(.hidden)');
    for (const diff of difficulties(uc)) {
      const bank = readBank(uc,diff);
      await page.evaluate(d => setTrainingDifficulty(d, false), diff);
      await page.evaluate(() => startRandom(10));
      check(`${uc}/${diff}: 10 random`, /de 10$/i.test(await page.locator('#questionIndex').innerText()));
      check(`${uc}/${diff}: feedback hidden before confirm`, await page.locator('#feedback').evaluate(el => el.classList.contains('hidden')));
      const text = await page.locator('#questionText').innerText();
      const active = bank.questions.find(q=>q.question === text);
      assert.ok(active);
      await page.evaluate(i=>selectOption(i),(active.answer+1)%4);
      check(`${uc}/${diff}: selected answer still hidden`, await page.locator('#feedback').evaluate(el=>el.classList.contains('hidden')));
      await page.locator('#confirmBtn').click();
      check(`${uc}/${diff}: wrong enters queue`, await page.evaluate(({uc,diff,id})=>JSON.parse(localStorage.getItem(`${uc}_${diff}_active_recall_errors`)).includes(id),{uc,diff,id:active.id}));
      await page.evaluate(() => backToSetup());
      await page.locator('#reviewErrorsBtn').click();
      const reviewText = await page.locator('#questionText').innerText();
      const reviewQ = bank.questions.find(q=>q.question === reviewText);
      await page.evaluate(i=>selectOption(i),reviewQ.answer);
      await page.locator('#confirmBtn').click();
      check(`${uc}/${diff}: corrected error leaves queue`, await page.evaluate(({uc,diff,id})=>!JSON.parse(localStorage.getItem(`${uc}_${diff}_active_recall_errors`)).includes(id),{uc,diff,id:reviewQ.id}));
      await page.locator('#nextBtn').click();
      check(`${uc}/${diff}: review finishes with result`, await page.locator('#resultScore').innerText() === '100%');
      await page.evaluate(() => backToSetup());
      await page.evaluate(() => startRandom(20));
      check(`${uc}/${diff}: 20 random`, /de 20$/i.test(await page.locator('#questionIndex').innerText()));
      await page.evaluate(() => backToSetup());
      await page.locator('.topic-chip').first().click();
      check(`${uc}/${diff}: topic session`, await page.locator('#questionTopic').innerText() === bank.questions[0].topic);
      await layout(`${uc}/${diff} training`);
      await page.evaluate(() => backToSetup());
    }
  }
}
async function exams() {
  for(const uc of ['pevs','pedex','cf']) {
    await open(`/centro_estudo/${uc}_simulador.html`);
    await page.waitForSelector('#home:not(.hidden)');
    for(const diff of difficulties(uc)) for(const key of ['exam1','exam2']) {
      const bank=readBank(uc,diff), by=Object.fromEntries(bank.questions.map(q=>[q.id,q]));
      await page.evaluate(({diff,key})=>startExam(diff,key),{diff,key});
      check(`${uc}/${diff}/${key}: 40 questions`, await page.evaluate(()=>simulatorState.ids.length===40));
      check(`${uc}/${diff}/${key}: 60 minutes`, await page.locator('#timer').innerText()==='60:00');
      check(`${uc}/${diff}/${key}: correct source`, await page.locator('#qText').innerText()===by[bank.exams[key][0]].question);
      await layout(`${uc}/${diff}/${key}`);
      await page.locator('#nextBtn').click();
      check(`${uc}/${diff}/${key}: next`, await page.evaluate(()=>simulatorState.current===1));
      await page.locator('#prevBtn').click();
      check(`${uc}/${diff}/${key}: prev`, await page.evaluate(()=>simulatorState.current===0));
      await page.locator('#qnav button').nth(5).click();
      check(`${uc}/${diff}/${key}: q-nav`, await page.evaluate(()=>simulatorState.current===5));
      check(`${uc}/${diff}/${key}: correction hidden`, await page.locator('#result').evaluate(el=>el.classList.contains('hidden')));
      let warning=''; page.once('dialog',async d=>{warning=d.message();await d.dismiss();});
      await page.evaluate(()=>submitExam(false));
      check(`${uc}/${diff}/${key}: unanswered warning cancels`, warning.includes('40') && await page.evaluate(()=>!simulatorState.submitted));
      await page.evaluate(({ids,answers})=>{ids.forEach((id,i)=>{goToQuestion(i);setAnswer(answers[id]);});},{ids:bank.exams[key].slice(0,19),answers:Object.fromEntries(bank.questions.map(q=>[q.id,q.answer]))});
      page.once('dialog',d=>d.accept());
      await page.evaluate(()=>submitExam(false));
      check(`${uc}/${diff}/${key}: 19 correct passes at 9.5`, (await page.locator('#result').innerText()).includes('9.5 / 20') && (await page.locator('#result').innerText()).includes('Aprovado'));
      check(`${uc}/${diff}/${key}: correction from active bank`, (await page.locator('.review').first().innerText()).includes(by[bank.exams[key][0]].options[by[bank.exams[key][0]].answer]));
      await page.locator('#result button').filter({hasText:'Repetir'}).click();
      check(`${uc}/${diff}/${key}: repeat keeps difficulty/exam`, await page.evaluate(({diff,key})=>simulatorState.difficulty===diff&&simulatorState.examKey===key,{diff,key}));
      await page.evaluate(()=>goHome());
    }
    await page.evaluate(()=>{startExam('exam1');const originalConfirm=window.confirm;const originalNow=Date.now;const end=simulatorState.deadline;window.confirm=()=>{Date.now=()=>end+1;return false;};try{submitExam(false);}finally{Date.now=originalNow;window.confirm=originalConfirm;}});
    check(`${uc}: timeout overrides cancelled confirmation`,await page.evaluate(()=>simulatorState.submitted));
    await page.clock.install();
    await page.evaluate(()=>startExam('exam1'));
    await page.clock.setSystemTime(new Date(await page.evaluate(()=>simulatorState.deadline + 1)));
    await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
    check(`${uc}: timeout auto-submits`, await page.evaluate(()=>simulatorState.submitted));
    await page.clock.resume();
  }
}
async function workbook() {
  for (const file of fs.readdirSync(path.join(root,'simuladores')).filter(f=>/^uc.*\.html$/.test(f))) {
    await open(`/simuladores/${file}`);
    const data = await page.evaluate(()=>({total:DATA.questions.length,seconds:remainingSeconds}));
    check(file + ': proportional time', data.seconds === data.total*90);
    await page.locator('#next').click();
    check(file + ': next', await page.evaluate(()=>current===1));
    await page.locator('#prev').click();
    await page.evaluate(()=>document.getElementById('next').onclick());
    page.once('dialog',d=>d.dismiss());
    await page.evaluate(()=>finishExam(false));
    check(file + ': unanswered cancellation', await page.evaluate(()=>!examSubmitted));
    page.once('dialog',d=>d.accept());
    await page.evaluate(()=>finishExam(false));
    check(file + ': submitted controls locked', await page.locator('#answerArea input:not([disabled]),#answerArea select:not([disabled])').count()===0);
    const before = await page.evaluate(()=>JSON.stringify({current,answers}));
    await page.locator('#track .seg').last().click();
    check(file + ': submitted navigation locked', await page.evaluate(()=>JSON.stringify({current,answers}))===before);
    await page.locator('#restart').click();
    check(file + ': restart clears submission', await page.evaluate(()=>!examSubmitted && current===0 && answers.every(x=>x===null)));
    await page.evaluate(()=>{const originalConfirm=window.confirm;const originalNow=Date.now;const end=examDeadline;window.confirm=()=>{Date.now=()=>end+1;return false;};try{finishExam(false);}finally{Date.now=originalNow;window.confirm=originalConfirm;}});
    check(file + ': timeout overrides cancelled confirmation',await page.evaluate(()=>examSubmitted));
    await page.locator('#restart').click();
    await page.clock.install();
    await page.clock.setSystemTime(new Date(await page.evaluate(()=>examDeadline + 1)));
    await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
    check(file + ': suspended timeout', await page.evaluate(()=>examSubmitted && remainingSeconds===0));
    await page.clock.resume();
  }
}

async function responsive() {
  for (const width of [320,768,1280]) {
    await page.setViewportSize({width,height:844});
    for (const uc of ['pevs','pedex','cf']) for(const mode of ['resumo','treino','simulador']) {
      await open(`/centro_estudo/${uc}_${mode}.html`);
      await layout(`${uc}/${mode}/${width}`);
    }
  }
  await page.setViewportSize({width:390,height:844});
  await open('/centro_estudo/pevs_resumo.html');
  await page.screenshot({path:path.join(os.tmpdir(),'academy-p0-summary.png'),fullPage:false});
  await page.evaluate(()=>toggleTheme());
  await page.screenshot({path:path.join(os.tmpdir(),'academy-p0-theme.png'),fullPage:false});
  await page.evaluate(()=>{toggleSearch();});
  await page.waitForTimeout(100);
  await layout('search open after resize');
  await page.screenshot({path:path.join(os.tmpdir(),'academy-p0-search.png'),fullPage:false});
  await open('/centro_estudo/pevs_resumo.html#pevs-detail-033');
  await layout('PEVS detailed summary / 390');
  check('PEVS: initial deep link selects containing topic',await page.locator('.study-nav[data-section="dnt"]').evaluate(el=>el.classList.contains('is-active')));
  check('PEVS: initial deep link clears sticky shell',await page.evaluate(()=>document.getElementById('pevs-detail-033').getBoundingClientRect().top>=document.getElementById('topic-nav').getBoundingClientRect().bottom-1));
  await page.waitForTimeout(500);
  await page.screenshot({path:path.join(os.tmpdir(),'academy-pevs-detail.png'),fullPage:false});
  await page.evaluate(()=>toggleTheme());
  await layout('PEVS detailed summary alternate theme / 390');
  await page.waitForTimeout(500);
  await page.screenshot({path:path.join(os.tmpdir(),'academy-pevs-detail-theme.png'),fullPage:false});
  await open('/centro_estudo/pedex_resumo.html');
  await layout('PEDEx detailed summary / 390');
  await page.screenshot({path:path.join(os.tmpdir(),'academy-pedex-summary.png'),fullPage:false});
  await page.evaluate(()=>document.getElementById('pedex-detail-077').scrollIntoView({block:'start'}));
  await page.waitForTimeout(100);
  check('PEDEx: deep heading link clears sticky shell',await page.evaluate(()=>{const heading=document.getElementById('pedex-detail-077');const nav=document.getElementById('topic-nav');return heading.getBoundingClientRect().top>=nav.getBoundingClientRect().bottom-1;}));
  await page.screenshot({path:path.join(os.tmpdir(),'academy-pedex-feedback.png'),fullPage:false});
  await open('/centro_estudo/pedex_resumo.html#pedex-detail-077');
  check('PEDEx: initial deep link selects containing topic',await page.locator('.study-nav[data-section="s9"]').evaluate(el=>el.classList.contains('is-active')));
  check('PEDEx: initial deep link clears sticky shell',await page.evaluate(()=>document.getElementById('pedex-detail-077').getBoundingClientRect().top>=document.getElementById('topic-nav').getBoundingClientRect().bottom-1));
  await open('/centro_estudo/cf_resumo.html');
  await layout('CF detailed summary / 390');
  await page.screenshot({path:path.join(os.tmpdir(),'academy-cf-summary.png'),fullPage:false});
  await open('/centro_estudo/cf_resumo.html#cf-detail-013');
  check('CF: initial deep link selects containing topic',await page.locator('.study-nav[data-section="s10"]').evaluate(el=>el.classList.contains('is-active')));
  check('CF: initial deep link clears sticky shell',await page.evaluate(()=>document.getElementById('cf-detail-013').getBoundingClientRect().top>=document.getElementById('topic-nav').getBoundingClientRect().bottom-1));
  await page.waitForTimeout(500); // Permite concluir a animação da navegação antes da captura.
  await page.screenshot({path:path.join(os.tmpdir(),'academy-cf-feedback.png'),fullPage:false});
  await page.evaluate(()=>toggleTheme());
  await layout('CF detailed summary alternate theme / 390');
  await page.waitForTimeout(500); // Tailwind CDN recompõe as classes ao alternar o tema.
  await page.screenshot({path:path.join(os.tmpdir(),'academy-cf-theme.png'),fullPage:false});
}

async function completeExamDeadline() {
  for (const uc of ['pevs','pedex','cf']) {
    await open(`/centro_estudo/${uc}_simulador.html`);
    await page.waitForSelector('#home:not(.hidden)');
    const bank=readBank(uc,'easy');
    await page.evaluate(questions=>{
      startExam('exam1');
      const by=Object.fromEntries(questions.map(q=>[q.id,q]));
      simulatorState.ids.forEach((id,i)=>{goToQuestion(i);setAnswer(by[id].answer);});
      const originalConfirm=window.confirm, originalNow=Date.now, end=simulatorState.deadline;
      window.confirm=()=>{Date.now=()=>end+1;return false;};
      try{submitExam(false);}finally{window.confirm=originalConfirm;Date.now=originalNow;}
    },bank.questions);
    check(`${uc}: fully answered exam expires during cancelled confirmation`,await page.evaluate(()=>simulatorState.submitted));
  }
}

async function pwa() {
  const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const p = await context.newPage();
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  servePreviousSW=true;
  await p.goto(origin+'/index.html',{waitUntil:'networkidle'});
  await waitForAsync(p, async()=>{const reg=await navigator.serviceWorker.ready;return reg.active?.state==='activated'&&!!navigator.serviceWorker.controller&&(await caches.keys()).includes('cet-tef-v21');});
  await p.evaluate(()=>caches.open('unrelated-cache'));
  servePreviousSW=false;
  await p.evaluate(async()=>{const reg=await navigator.serviceWorker.ready;await reg.update();});
  await waitForAsync(p, async()=>{const reg=await navigator.serviceWorker.ready;const keys=await caches.keys();return reg.active?.state==='activated'&&!reg.installing&&!reg.waiting&&keys.includes('cet-tef-v22')&&!keys.includes('cet-tef-v21')&&!!navigator.serviceWorker.controller;});
  check('PWA: v21 -> v22 and old-cache cleanup',true);
  check('PWA: unrelated cache preserved',await p.evaluate(async()=>(await caches.keys()).includes('unrelated-cache')));
  const localURLs = [...new Set([...fs.readFileSync(path.join(root,'sw.js'),'utf8').matchAll(/'((?:\.\/)[^']*)'/g)].map(m=>m[1]))];
  await waitForAsync(p, async urls=>{const c=await caches.open('cet-tef-v22');return (await Promise.all(urls.map(u=>c.match(u)))).every(Boolean);},localURLs,{timeout:30000});
  const missingPrecache = await p.evaluate(async urls=>{const c=await caches.open('cet-tef-v22');const results=await Promise.all(urls.map(u=>c.match(u)));return urls.filter((u,i)=>!results[i]);},localURLs);
  check('PWA: every local precache response exists: '+JSON.stringify(missingPrecache),missingPrecache.length===0);
  await p.reload({waitUntil:'networkidle'});
  await waitForAsync(p, async()=>{const c=await caches.open('cet-tef-v22');return (await c.keys()).some(r=>r.url.startsWith('https://fonts.gstatic.com/'));});
  check('PWA: Tailwind, icons and fonts cached',await p.evaluate(async()=>{const c=await caches.open('cet-tef-v22');return !!await c.match('https://cdn.tailwindcss.com/')&&!!await c.match('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');}));
  const cdp=await context.newCDPSession(p);await cdp.send('Network.clearBrowserCache');await cdp.detach();
  await context.setOffline(true);
  for (const uc of ['pevs','pedex','cf']) for(const mode of ['resumo','treino','simulador']) {
    await p.goto(`${origin}/centro_estudo/${uc}_${mode}.html`,{waitUntil:'networkidle'});
    check(`${uc}/${mode}: offline styling`,await p.evaluate(()=>typeof tailwind!=='undefined'&&getComputedStyle(document.querySelector('header')).position==='sticky'));
    if(mode==='treino'){
      await p.waitForSelector('#setup:not(.hidden)');
      for(const diff of difficulties(uc)){
        await p.evaluate(d=>{setTrainingDifficulty(d,false);startRandom(10);},diff);
        check(`${uc}/${diff}: offline training`,await p.locator('#options button').count()===4);
        await p.evaluate(()=>backToSetup());
      }
    }
    if(mode==='simulador'){
      await p.waitForSelector('#home:not(.hidden)');
      for(const diff of difficulties(uc))for(const key of ['exam1','exam2']){
        await p.evaluate(({diff,key})=>startExam(diff,key),{diff,key});
        check(`${uc}/${diff}/${key}: offline exam`,await p.locator('#qnav button').count()===40);
        await p.evaluate(()=>goHome());
      }
    }
  }
  await p.goto(origin+'/index.html#estudo',{waitUntil:'networkidle'});
  check('PWA: offline app shell',await p.locator('#tab-content-estudo').evaluate(el=>!el.classList.contains('hidden')));
  check('PWA: no offline JavaScript errors',errors.length===0);
  await p.screenshot({path:path.join(os.tmpdir(),'academy-p0-offline.png'),fullPage:false});
  await context.close();
}

async function main() {
  await open('/index.html#estudo');
  check('Estudo hash opens tab', await page.locator('#tab-content-estudo').evaluate(el=>!el.classList.contains('hidden')));
  await layout('main index');
  await page.evaluate(()=>switchMainTab('curso'));
  check('Curso hash', new URL(page.url()).hash==='#curso');
  await page.evaluate(()=>switchMainTab('agenda'));
  check('Agenda hash', new URL(page.url()).hash==='#agenda');
}
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));origin=`http://127.0.0.1:${server.address().port}${mount}`;
  try {
    browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||undefined});
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
    page.on('console',m=>{if(m.type()==='warning')report.warnings.push(m.text());});
    const groups=process.argv.slice(2);const selected=name=>!groups.length||groups.includes(name);
    if(selected('core')){await main();await summaries();await training();await exams();}
    if(selected('workbook'))await workbook();
    if(selected('responsive'))await responsive();
    if(selected('pwa')){await completeExamDeadline();await pwa();}
    check('no JavaScript page errors', report.errors.length===0);
  } catch(e){report.failure=e.stack;process.exitCode=1;}
  finally{await browser?.close();server.close();fs.writeFileSync(path.join(os.tmpdir(),'academy-p0-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,errors:report.errors,warnings:[...new Set(report.warnings)],failure:report.failure,report:path.join(os.tmpdir(),'academy-p0-report.json')},null,2));}
})();
