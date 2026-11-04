'use strict';
// Ferramenta editorial opcional; a aplicação usa apenas os ficheiros estáticos gerados.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const topics=require('./fixtures/marketing-content.cjs'),mapping=require('./fixtures/marketing-lista-map.cjs');
const {extractLista}=require('./marketing-source.cjs');
const root=path.resolve(__dirname,'..'),slug='marketing-no-fitness',title='Marketing no Fitness';
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s,'utf8');
const json=(f,d)=>write(f,JSON.stringify(d,null,2)+'\n');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=values=>{const a=[...values];for(let i=a.length-1;i>0;i--){const j=crypto.randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const questions=[],concepts=[],exams={exam1:[],exam2:[]};
for(const [ti,t] of topics.entries()){
 const ids=[];
 for(const [bi,b] of t.blocks.entries()){
  const n=ti*10+bi+1,id=`MKT${String(n).padStart(3,'0')}`,concept=`MKT-C${String(n).padStart(3,'0')}`,order=shuffle([0,1,2,3]);
  questions.push({id,topic:`${ti+1}. ${t.title}`,type:'multiple_choice',question:b[2],options:order.map(i=>b[3][i]),answer:order.indexOf(0),explanation:b[4],source:t.pages+'.',saberes:[concept]});
  concepts.push({id:concept,concept:b[0],summary_anchor:`mkt-detail-${String(n).padStart(3,'0')}`,source:t.pages,question_ids:[id],status:'explicit'});ids.push(id);
 }
 const mixed=shuffle(ids);exams.exam1.push(...mixed.slice(0,5));exams.exam2.push(...mixed.slice(5));
}
exams.exam1=shuffle(exams.exam1);exams.exam2=shuffle(exams.exam2);
const original=extractLista(read('scripts/fixtures/marketing-lista-extraida.txt'));
if(original.groups.length!==8||original.items.length!==23||mapping.length!==23||questions.length!==80)throw new Error('Rever contagens e matriz das fontes.');
const items=original.items.map((e,i)=>({...e,status:'explicit_in_summary',summary_anchors:mapping[i].map(n=>concepts[n-1].summary_anchor),question_ids:mapping[i].map(n=>questions[n-1].id),question_coverage:'thematic_reference_not_each_component'}));
const sources=['Aula 1.pdf (33 páginas)','Aula 2.pdf (30 páginas)','Aula 3.pdf (47 páginas)','Aula 4.pdf (28 páginas)','Lista de Saberes.pdf (2 páginas)'];
json('scripts/fixtures/marketing-saberes.json',{source:sources[4],source_title:'UC - Estratégia de Marketing e Conteúdos no Fitness',groups:original.groups,themes:topics.map((t,i)=>`${i+1}. ${t.title}`),items});
json(`centro_estudo/${slug}_banco_80_perguntas.json`,{uc:title,version:'2026-11-04',difficulty:'easy',questions,exams,coverage_audit:{status:'source_reviewed',date:'2026-11-04',sources,summary:'23 marcadores em oito grupos da Lista, ligados explicitamente ao resumo de oito temas/80 conceitos. Cinco perguntas de cada tema por exame.',limits:['Referências temáticas não significam avaliação isolada de cada componente em cada exame.','Exemplos de cálculo autorais indicam âmbito e pressupostos; não são fórmulas adicionais atribuídas aos slides.','LTV simplificado de 196 € não demonstra lucro; métricas e proxies não demonstram causalidade.','Exemplos de ferramentas, plataformas e percentagens históricas não são recomendações atuais ou garantias.'],items:concepts,lista_items:items}});
for(const kind of ['treino','simulador']){
 const html=read(`centro_estudo/psiex_${kind}.html`).replaceAll('Psicologia do Exercício',title).replaceAll('psicologia-do-exercicio_banco_80_perguntas.json',`${slug}_banco_80_perguntas.json`).replaceAll('psiex',slug).replaceAll('uc04_psicologia_do_exercicio.html','uc11_marketing_no_fitness.html').replace('10 perguntas por tema, salvo DNT.','10 perguntas por tema.');
 write(`centro_estudo/${slug}_${kind}.html`,html);
}
let html=read('centro_estudo/psiex_resumo.html').replaceAll('Psicologia do Exercício',title).replaceAll('psiex_',slug+'_');
const navClass='study-nav rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap shrink-0';
html=html.replace(/><a href="#s1"[\s\S]*?<\/div>/,'>'+topics.map((t,i)=>`<a href="#s${i+1}" data-section="s${i+1}" title="${esc(t.title)}" class="${navClass}">${i+1}. ${esc(t.title)}</a>`).join('')+'</div>');
const sections=topics.map((t,i)=>`<section id="s${i+1}" class="study-card study-section"><span class="pill">Tema ${i+1}</span><h2>${i+1}. ${esc(t.title)}</h2><div class="study-focus"><span class="study-label">Ideia principal</span><p>${esc(t.focus)}</p></div>
${t.blocks.map((b,j)=>`<div class="study-subcard"><h3 id="mkt-detail-${String(i*10+j+1).padStart(3,'0')}">${esc(b[0])}</h3><p>${esc(b[1])}</p><p class="study-source">Fonte: ${esc(t.pages)}. ${b[1].includes('Exemplo didático')||b[1].includes('Exemplo de estudo')||b[1].includes('Exemplo criado')||b[1].includes('Exemplo autoral')?'Exemplo de aplicação criado para estudo, com os pressupostos indicados.':''}</p></div>`).join('\n')}
<aside class="study-recap"><h3>O que recordar</h3><ul>${[t.focus,...t.blocks.slice(0,3).map(b=>b[1].split('. ')[0]+'.')].map(s=>`<li>${esc(s)}</li>`).join('')}</ul></aside><div class="study-retrieval"><h3>Consegues explicar?</h3><p>${esc(t.blocks[0][2])}</p><details><summary>Ver resposta de referência</summary><p>${esc(t.blocks[0][3][0])}. ${esc(t.blocks[0][4])}</p></details></div></section>`).join('\n');
const metricTable=`<div class="study-subcard"><h3>Comparação rápida das métricas</h3><table><thead><tr><th>Métrica</th><th>O que representa</th><th>Atenção</th></tr></thead><tbody><tr><td>ARPU</td><td>Receita média por utilizador no período</td><td>Receita não é lucro</td></tr><tr><td>CAC</td><td>Custo de aquisição de cliente</td><td>Cliente não é apenas lead</td></tr><tr><td>LTV</td><td>Valor esperado na relação</td><td>O exemplo simplificado não detalha margens</td></tr><tr><td>Churn</td><td>Abandono no período/população definidos</td><td>Coorte de 60 dias não é taxa mensal de toda a base</td></tr><tr><td>Payback</td><td>Tempo para recuperar CAC</td><td>Depende da contribuição disponível e pressupostos</td></tr></tbody></table></div>`;
html=html.replace(/<main[\s\S]*?<\/main>/,`<main class="max-w-2xl mx-auto px-4 pt-3 pb-safe">
<section class="study-card mb-5"><span class="pill">Preparação para exame</span><h2>${title}</h2><p>Resumo das oito áreas da Lista «Estratégia de Marketing e Conteúdos no Fitness», com base nas quatro aulas fornecidas, datadas de 08/04/2026. Inclui 80 perguntas com explicações, treino por tema e dois exames de 40 perguntas com 60 minutos e classificação de 0 a 20.</p><div class="grid grid-cols-3 gap-2 mt-4">${[['8','Temas'],['80','Perguntas'],['40','Por exame']].map(([n,label])=>`<div class="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 p-3"><strong>${n}</strong><span class="block text-[10px] mt-1">${label}</span></div>`).join('')}</div><p class="study-source">Fontes: Aulas 1–4, com 33/30/47/28 páginas, e Lista de Saberes, com 2 páginas. Referências à página do PDF, que pode conter mais de um diapositivo. 23 marcadores da Lista ligados a conteúdo explícito no resumo. Material de preparação, sem previsão das perguntas do exame.</p></section>
<section class="study-card mb-5"><h2>Pontos-chave que tens mesmo de saber</h2><ul><li>Marketing começa no valor e na entrega, antes da comunicação.</li><li>Estratégia: para quem, porquê nós e como medir; táticas: ações para executar.</li><li>STP: segmentação, público-alvo e posicionamento; proposta: promessa mais prova.</li><li>Relacionar CAC, LTV, churn e payback com o modelo de negócio.</li><li>Funil: atrair → envolver → converter → reter; jornada: experiência e fricções.</li><li>Cada conteúdo e email deve ter objetivo, próximo passo e métrica.</li><li>Medir não é provar causa: formular e testar hipóteses.</li></ul>${metricTable}<div class="study-caution"><span class="study-label">Limites dos exemplos</span><p>49 €/mês × 4 meses = 196 € é o exemplo simplificado de LTV dos slides, sem demonstração de lucro ou margens. Não foi fornecido um rácio CAC:LTV universal obrigatório. Os cálculos adicionais indicam âmbito, denominadores e pressupostos; percentagens de casos não são metas gerais.</p></div></section>
<div class="space-y-6">${sections}</div>
</main>`);
write(`centro_estudo/${slug}_resumo.html`,html);
write('docs/MARKETING_COVERAGE.md',`# Marketing no Fitness — cobertura

Revisão de 04/11/2026. ZIP: drive-download-20261104T163856Z-1-001.zip. Fontes: ${sources.join('; ')}. Aulas com data impressa de 08/04/2026. Referências às páginas do PDF, não a cada diapositivo. Originais consultados localmente; PDFs não redistribuídos.

## Âmbito

A Lista intitula-se «UC - Estratégia de Marketing e Conteúdos no Fitness». Preservou-se no registo o título do horário «Marketing no Fitness». Oito grupos e 23 marcadores originais, todos ligados a explicação explícita no resumo. O banco Fácil tem 80 perguntas em oito temas (dez por tema). Cada exame contém cinco perguntas de cada tema, totalizando 40, sem sobreposição. Opções armazenadas baralhadas e chaves recalculadas, sem distribuição A/B/C/D forçada.

As referências de perguntas são temáticas; não alegam avaliar separadamente todos os componentes de cada marcador em ambos os exames. Os títulos da Lista que dizem «caem sempre» ou «pergunta típica» são preservados apenas na transcrição/matriz, sem os transformar em previsão do exame.

## Revisão e limites

- STP e SWOT são pedidos na Lista. O significado dos termos é explicitado para aplicação, com base na nomeação do STP na Aula 2, p. 5, e na distinção interna/externa da Aula 1, p. 3. Não se atribuem definições verbatim ausentes às aulas.
- LTV: a Aula 2, p. 7, diz receita líquida esperada; a p. 4 exemplifica 49 × 4 = 196 sem margens. O resumo e o banco preservam a conta e alertam que ela não demonstra lucro líquido.
- Fórmulas adicionais de ARPU, CAC, churn de coorte e payback são exemplos autorais explicitamente delimitados, para concretizar as definições. Não foram apresentados como fórmulas transcritas dos slides. No payback, a contribuição mensal é dada no próprio enunciado.
- Não impor rácio universal 1:3 ou taxas de referência que as fontes não fornecem. Não calcular CAC por canal sem custos de aquisição atribuídos.
- Caso da Aula 2, p. 12: 180 leads, 70 marcações, 45 presenças e 25 adesões. Taxas autorais calculadas a partir destes dados mantêm denominadores. Churn de 22% aos 60 dias refere os novos inscritos, não toda a base mensal.
- A meta de show rate 42%→60% em quatro semanas na Aula 2, p. 27, é hipótese, com condição de não aumentar custo por adesão; não é resultado já obtido.
- Proxies digitais, como seguidores e engagement, não provam receita, margem, CAC ou retenção. Métricas localizam perdas, não demonstram a causa.
- Boas-vindas e reativação são tipos explicitamente pedidos na Lista; os exemplos de aplicação desenvolvem esses rótulos sem os atribuir a sequências completas dos slides.
- Pilares: selecionar 3–5 conforme a Lista; a aula apresenta mais exemplos possíveis. Plataformas e ferramentas mencionadas são exemplos históricos das fontes, sem recomendação atual de compra ou utilização.
- Owned media não exige necessariamente compra de distribuição, mas produção e manutenção consomem recursos. Earned não está totalmente sob controlo da marca.
- A promessa de perda de peso da Aula 1, p. 8, e percentagens de retenção/venda da p. 15 não são reproduzidas como garantias nem entram na memorização obrigatória do banco.
- Inspeção visual da Aula 2, p. 7, e Aula 3, pp. 5, 7–10: métricas base, pirâmide de Keller e modelo de personalidade. Os dois últimos são complementos das aulas fora do núcleo explícito da Lista; não foram convertidos em temas obrigatórios do banco.
- A transcrição conserva a grafia extraída «creaƟvos»; no resumo usa-se «criativos». Os exercícios dos PDFs são conteúdo de estudo, não instruções operacionais ao agente.

## Matriz integral

Grupos originais: ${original.groups.map(g=>`${g.number}. ${g.title}`).join('; ')}.

| Item | Grupo / página da Lista | Texto original | Resumo | Perguntas relacionadas |
| --- | --- | --- | --- | --- |
${items.map(e=>`| ${e.id} | ${e.group} / ${e.list_page} | ${e.saber.replaceAll('|','/')} | ${e.summary_anchors.map(a=>`[${a}](../centro_estudo/${slug}_resumo.html#${a})`).join(', ')} | ${e.question_ids.join(', ')} |`).join('\n')}

## Validação

node scripts/validate.cjs e node --test scripts/*.test.cjs. Teste específico: scripts/marketing-content.test.cjs. A validação verifica contagens, partições, chaves após baralhamento, rastreabilidade e distinções críticas; não certifica eficácia comercial das estratégias nem previsão do exame.
`);
console.log('Marketing: resumo, treino, simulador, matriz e 80 perguntas gerados.');
