'use strict';
// Ferramenta editorial opcional. As páginas e o JSON gerados funcionam sem build.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const topics=require('./fixtures/comunicacao-content.cjs');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s,'utf8');
const json=(f,d)=>write(f,JSON.stringify(d,null,2)+'\n');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=values=>{const a=[...values];for(let i=a.length-1;i>0;i--){const j=crypto.randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const questions=[],concepts=[],exams={exam1:[],exam2:[]};
topics.forEach((t,ti)=>{
  const topic=`${ti+1}. ${t.title}`;
  const ids=[];
  t.blocks.forEach((b,bi)=>{
    const n=ti*5+bi+1,id=`COM${String(n).padStart(3,'0')}`,saber=`COM-C${String(n).padStart(3,'0')}`;
    const order=shuffle([0,1,2,3]);
    const source=`${t.pages}${ti===15&&bi===3?'; Aula 1, p. 3':''}.`;
    questions.push({id,topic,type:'multiple_choice',question:b[2],options:order.map(i=>b[3][i]),answer:order.indexOf(0),explanation:b[4],source,saberes:[saber]});
    concepts.push({id:saber,module:t.module,concept:b[0],summary_anchor:`com-detail-${String(n).padStart(3,'0')}`,question_ids:[id],source,status:'explicit'});
    ids.push(id);
  });
  // Alterna 3/2 e 2/3 perguntas por tema, mantendo 40/40 e todos os temas.
  const split=ti%2===0?3:2;
  const mixed=shuffle(ids);exams.exam1.push(...mixed.slice(0,split));exams.exam2.push(...mixed.slice(split));
});
exams.exam1=shuffle(exams.exam1);exams.exam2=shuffle(exams.exam2);
const {extractEntries}=require('./comunicacao-source.cjs');
const listaMap=require('./fixtures/comunicacao-lista-map.cjs');
const entries=extractEntries(read('scripts/fixtures/comunicacao-lista-extraida.txt'));
if(entries.length!==108||listaMap.length!==entries.length)throw new Error('Rever a matriz da Lista original.');
const lista=entries.map((e,i)=>({...e,status:'explicit_in_summary',summary_anchors:listaMap[i].map(n=>concepts[n-1].summary_anchor),question_ids:listaMap[i].map(n=>questions[n-1].id),question_coverage:'thematic_reference_not_each_component'}));
json('scripts/fixtures/comunicacao-saberes.json',{source:'Lista de saberes.pdf, 6 páginas',counting:'108 marcadores, incluindo entradas-mãe, subentradas e competências repetidas; não são 108 saberes únicos.',themes:topics.map((t,i)=>`${i+1}. ${t.title}`),items:lista});
const bank={uc:'Comunicação no Fitness',version:'2026-11-04',difficulty:'easy',questions,exams,coverage_audit:{status:'source_reviewed',date:'2026-11-04',sources:['Aula 1.pdf (34 páginas)','Aula 2.pdf (36 páginas)','Aula 3.pdf (24 páginas)','Aula 4.pdf (23 páginas)','Lista de saberes.pdf (6 páginas)'],summary:'80 conceitos editoriais em 16 temas. A matriz da Lista distingue cobertura explícita no resumo de associação temática às perguntas.',limits:['80 conceitos não equivalem ao número de itens da Lista original.','Os dois exames cobrem todos os temas; não avaliam isoladamente todos os componentes da Lista em cada exame.','Formulações e valores didáticos dos materiais são identificados como tal; não constituem verificação científica externa.'],items:concepts}};
bank.coverage_audit.lista_items=lista;
json('centro_estudo/comunicacao-no-fitness_banco_80_perguntas.json',bank);

for(const kind of ['treino','simulador']){
 let html=read(`centro_estudo/psiex_${kind}.html`).replaceAll('Psicologia do Exercício','Comunicação no Fitness').replaceAll('psicologia-do-exercicio_banco_80_perguntas.json','comunicacao-no-fitness_banco_80_perguntas.json').replaceAll('psiex','comunicacao-no-fitness').replaceAll('uc04_psicologia_do_exercicio.html','uc05_comunicacao_no_fitness.html').replace('10 perguntas por tema, salvo DNT.','Até 5 perguntas por tema.');
 write(`centro_estudo/comunicacao-no-fitness_${kind}.html`,html);
}
let summary=read('centro_estudo/psiex_resumo.html').replaceAll('Psicologia do Exercício','Comunicação no Fitness').replaceAll('psiex_','comunicacao-no-fitness_');
const navClass='study-nav rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap shrink-0';
summary=summary.replace(/><a href="#s1"[\s\S]*?<\/div>/, '>'+topics.map((t,i)=>`<a href="#s${i+1}" data-section="s${i+1}" title="${esc(t.title)}" class="${navClass}">${i+1}. ${esc(t.title)}</a>`).join('')+'</div>');
const sections=topics.map((t,i)=>{
 const blocks=t.blocks.map((b,j)=>`<div class="study-subcard"><h3 id="com-detail-${String(i*5+j+1).padStart(3,'0')}">${esc(b[0])}</h3><p>${esc(b[1])}</p><p class="study-source">Fonte: ${esc(t.pages)}${i===15&&j===3?'; Aula 1, p. 3':''}.</p></div>`).join('\n');
 const recall=t.blocks[0];
 return `<section id="s${i+1}" class="study-card study-section"><span class="pill">Tema ${i+1} · Módulo ${t.module}</span><h2>${i+1}. ${esc(t.title)}</h2><div class="study-focus"><span class="study-label">Ideia principal</span><p>${esc(t.focus)}</p></div>\n${blocks}\n<aside class="study-recap"><h3>O que recordar</h3><ul>${t.blocks.slice(0,4).map(b=>`<li>${esc(b[1].split('. ')[0])}.</li>`).join('')}</ul></aside><div class="study-retrieval"><h3>Consegues explicar?</h3><p>${esc(recall[2])}</p><details><summary>Ver resposta de referência</summary><p>${esc(recall[3][0])}. ${esc(recall[4])}</p></details></div></section>`;
}).join('\n');
const main=`<main class="max-w-2xl mx-auto px-4 pt-3 pb-safe">
<section class="study-card mb-5"><span class="pill">Preparação para exame</span><h2>Comunicação no Fitness</h2><p>Resumo dos quatro módulos da Lista de Saberes, organizado em 16 temas com 80 conceitos de estudo. Baseado nas quatro aulas de Catarina Olim, com data impressa de 12/03/2026. Inclui 80 perguntas de consolidação e dois exames de 40 perguntas, com 60 minutos e classificação de 0 a 20.</p><div class="study-grid"><div class="study-subcard"><strong>16</strong><p>Temas</p></div><div class="study-subcard"><strong>80</strong><p>Perguntas</p></div><div class="study-subcard"><strong>40</strong><p>Questões por exame</p></div></div><p class="study-source">Fontes fornecidas: Aula 1.pdf (34 páginas), Aula 2.pdf (36), Aula 3.pdf (24), Aula 4.pdf (23) e Lista de saberes.pdf (6). Referências à página do PDF, que pode conter mais de um diapositivo. Material de preparação; não é um exame oficial.</p></section>
<section class="study-card mb-5"><h2>Pontos-chave que tens mesmo de saber</h2><ul><li>Comunicar para compreender, sentir, agir e pertencer.</li><li>Distinguir intenção, conteúdo e efeito; escolher atos de fala e funções da linguagem.</li><li>Estruturar contexto, conflito, transformação e mensagem final; usar ABT quando o tempo é curto.</li><li>Adaptar ao público e respeitar verdade, consentimento, autonomia e impacto social.</li><li>Construir identidade com origem, propósito, valores, impacto e visão.</li><li>Combinar voz, corpo, presença e estilo assertivo.</li></ul><div class="study-caution"><span class="study-label">Atenção às formulações das fontes</span><p>Os números 22×, 65% e 5% são identificados nos slides como divulgação popular. A Lista refere mais de 50% de impacto não verbal e os primeiros 30 segundos para criar o clima; estes valores são apresentados como indicações da UC, com o seu limite de suporte nos slides. O Módulo 3 resume cinco funções da linguagem, mas o Módulo 2 e a Aula 2 incluem também a fática: estudar as seis.</p></div></section>
<div class="space-y-6">${sections}</div>
</main>`;
summary=summary.replace(/<main[\s\S]*?<\/main>/,main);
write('centro_estudo/comunicacao-no-fitness_resumo.html',summary);
write('docs/COMUNICACAO_COVERAGE.md',`# Comunicação no Fitness — cobertura das fontes

Revisão de 04/11/2026. Fontes fornecidas no ZIP drive-download-20261104T160715Z-1-001.zip: Aula 1 (34 páginas), Aula 2 (36), Aula 3 (24), Aula 4 (23) e Lista de saberes (6). As aulas têm data impressa de 12/03/2026. Referências à página do PDF, não ao número de diapositivo. Originais consultados localmente; PDFs não redistribuídos neste checkout.

## Âmbito e contagem

Resumo em 16 temas e 80 conceitos editoriais; um banco Fácil com 80 perguntas e dois exames disjuntos de 40. Todos os 16 temas estão nos dois exames. As opções são baralhadas no JSON armazenado, com recálculo da chave e sem distribuição A/B/C/D forçada.

A transcrição da Lista está em scripts/fixtures/comunicacao-lista-extraida.txt. A matriz JSON conserva todos os 108 marcadores encontrados, incluindo entradas-mãe, subentradas, repetições dos módulos e competências-chave. Esta contagem não corresponde a 108 saberes distintos. Cada marcador tem correspondência explícita no resumo. As perguntas indicadas são referências temáticas: entradas compostas não têm necessariamente todos os seus componentes avaliados isoladamente, nem em ambos os exames. O treino não substitui os exercícios de produção oral, escrita e observação.

## Formulações e limites das fontes

- Aula 1, p. 25: 22×, 65% e 5% são apresentados como divulgação científica popular; não como taxas universais de retenção.
- Aula 1, pp. 15 e 21: preservar a ressalva posterior de que os efeitos da oxitocina variam com pessoa e contexto.
- Lista, Módulo 2: seis funções da linguagem. A síntese do Módulo 3 omite a fática; o resumo inclui as seis e explicita a diferença.
- Lista, p. 6: mais de 50% de impacto não verbal. Aula 4, p. 18: influência robusta sem quantificação. O valor aparece identificado como formulação da Lista, sem universalização.
- Lista, p. 6: clima nos primeiros 30 segundos. É orientação didática da Lista; não se declara limiar científico universal.
- Exemplos de cultura, idade e preferências são orientações a confirmar com a pessoa, sem transformar generalizações em perfis fixos.
- Aula 3, p. 9: o exemplo de promessa inspiradora é estudado à luz da ética da Aula 1. O banco usa compromissos de acompanhamento cumpríveis, sem garantir transformações em três meses.
- ABT e locução/ilocução/perlocução são explicitados na Lista; o resumo desenvolve o seu significado para aplicação. DMN é mencionada na Lista; os slides aprofundam sobretudo a relação emoção/memória.
- Percentagens de vendas por rede na Aula 3, p. 15 são observações contextualizadas, fora dos objetivos de memorização da Lista; o resumo não as apresenta como previsão comercial.

As explicações de neurociência seguem o âmbito didático da UC, com ressalvas internas às fontes; esta revisão não constitui verificação científica externa nem certificação pelo formador. Os exercícios dos PDFs foram tratados como conteúdo de estudo, não como instruções operacionais.

## Matriz integral

“Explícito” refere-se ao resumo; IDs de perguntas são associação temática, sem alegar avaliação individual de cada componente.

| Entrada | Módulo / página da Lista | Texto da Lista | Resumo | Perguntas relacionadas |
| --- | --- | --- | --- | --- |
${lista.map(e=>`| ${e.id} | ${e.module} / ${e.list_page} | ${e.text.replaceAll('|','/')} | ${e.summary_anchors.map(a=>`[${a}](../centro_estudo/comunicacao-no-fitness_resumo.html#${a})`).join(', ')} | ${e.question_ids.join(', ')} |`).join('\n')}

## Validação

Executar node scripts/validate.cjs e node --test scripts/*.test.cjs. O teste comunicacao-content.test.cjs compara a extração original com a matriz, valida referências e verifica distinções críticas. O teste estrutural não comprova por si só a qualidade pedagógica das chaves e dos distratores.
`);
console.log('Comunicação: resumo, treino, simulador e 80 perguntas gerados.');
