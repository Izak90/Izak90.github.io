'use strict';
// Ferramenta editorial opcional. Os artefactos gerados são estáticos, sem build na aplicação.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const topics=require('./fixtures/etica-content.cjs');
const {extractEntries}=require('./etica-source.cjs');
const mapping=require('./fixtures/etica-lista-map.cjs');
const root=path.resolve(__dirname,'..'),slug='etica-e-deontologia-no-fitness',title='Ética e Deontologia no Fitness';
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s,'utf8');
const json=(f,d)=>write(f,JSON.stringify(d,null,2)+'\n');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=values=>{const a=[...values];for(let i=a.length-1;i>0;i--){const j=crypto.randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const questions=[],concepts=[],exams={exam1:[],exam2:[]};
for(const [ti,t] of topics.entries()){
 const ids=[];
 for(const [bi,b] of t.blocks.entries()){
  const n=ti*5+bi+1,id=`ETI${String(n).padStart(3,'0')}`,concept=`ETI-C${String(n).padStart(3,'0')}`,order=shuffle([0,1,2,3]);
  questions.push({id,topic:`${ti+1}. ${t.title}`,type:'multiple_choice',question:b[2],options:order.map(i=>b[3][i]),answer:order.indexOf(0),explanation:b[4],source:t.pages+'.',saberes:[concept]});
  concepts.push({id:concept,concept:b[0],summary_anchor:`eti-detail-${String(n).padStart(3,'0')}`,source:t.pages,question_ids:[id],status:'explicit'});ids.push(id);
 }
 const mixed=shuffle(ids),split=ti%2===0?3:2;exams.exam1.push(...mixed.slice(0,split));exams.exam2.push(...mixed.slice(split));
}
exams.exam1=shuffle(exams.exam1);exams.exam2=shuffle(exams.exam2);
const original=extractEntries(read('scripts/fixtures/etica-lista-extraida.txt'));
if(original.length!==40||mapping.length!==40)throw new Error('Rever extração e matriz da Lista.');
const items=original.map((e,i)=>({...e,status:'explicit_in_summary',summary_anchors:mapping[i].map(n=>concepts[n-1].summary_anchor),question_ids:mapping[i].map(n=>questions[n-1].id),question_coverage:'thematic_reference_not_each_component'}));
const sources=['Aula 1.pdf (17 páginas, 12/03/2026)','Aula 2.pdf (34 páginas, 15/03/2026)','Aula 3.pdf (24 páginas, 12/03/2026)','Aula 4.pdf (21 páginas, 12/03/2026)','Lista de saberes.pdf (3 páginas, Fev 2026)'];
json('scripts/fixtures/etica-saberes.json',{source:sources[4],themes:topics.map((t,i)=>`${i+1}. ${t.title}`),items});
json(`centro_estudo/${slug}_banco_80_perguntas.json`,{uc:title,version:'2026-11-04',difficulty:'easy',questions,exams,coverage_audit:{status:'source_reviewed',date:'2026-11-04',sources,summary:'40 itens principais da Lista (9 valores e 31 legislação) com cobertura explícita no resumo; 80 conceitos editoriais em 16 temas.',limits:['As referências de perguntas são temáticas; entradas compostas não são avaliadas componente a componente em cada exame.','Conteúdo de preparação baseado nos diplomas e formulações transcritos nas aulas; não constitui análise jurídica exaustiva de vigência.','Verificação externa pontual documentada separadamente em docs/ETICA_COVERAGE.md.'],items:concepts,lista_items:items}});
for(const kind of ['treino','simulador']){
 const html=read(`centro_estudo/psiex_${kind}.html`).replaceAll('Psicologia do Exercício',title).replaceAll('psicologia-do-exercicio_banco_80_perguntas.json',`${slug}_banco_80_perguntas.json`).replaceAll('psiex',slug).replaceAll('uc04_psicologia_do_exercicio.html','uc15_etica_e_deontologia_no_fitness.html').replace('10 perguntas por tema, salvo DNT.','Até 5 perguntas por tema.');
 write(`centro_estudo/${slug}_${kind}.html`,html);
}
let html=read('centro_estudo/psiex_resumo.html').replaceAll('Psicologia do Exercício',title).replaceAll('psiex_',slug+'_');
const navClass='study-nav rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap shrink-0';
html=html.replace(/><a href="#s1"[\s\S]*?<\/div>/,'>'+topics.map((t,i)=>`<a href="#s${i+1}" data-section="s${i+1}" title="${esc(t.title)}" class="${navClass}">${i+1}. ${esc(t.title)}</a>`).join('')+'</div>');
const sections=topics.map((t,i)=>`<section id="s${i+1}" class="study-card study-section"><span class="pill">Tema ${i+1} · ${esc(t.area)}</span><h2>${i+1}. ${esc(t.title)}</h2><div class="study-focus"><span class="study-label">Ideia principal</span><p>${esc(t.focus)}</p></div>
${t.blocks.map((b,j)=>`<div class="study-subcard"><h3 id="eti-detail-${String(i*5+j+1).padStart(3,'0')}">${esc(b[0])}</h3><p>${esc(b[1])}</p><p class="study-source">Fonte: ${esc(t.pages)}.</p></div>`).join('\n')}
<aside class="study-recap"><h3>O que recordar</h3><ul>${t.blocks.slice(0,4).map(b=>`<li>${esc(b[1].split('. ')[0])}.</li>`).join('')}</ul></aside><div class="study-retrieval"><h3>Consegues explicar?</h3><p>${esc(t.blocks[0][2])}</p><details><summary>Ver resposta de referência</summary><p>${esc(t.blocks[0][3][0])}. ${esc(t.blocks[0][4])}</p></details></div></section>`).join('\n');
html=html.replace(/<main[\s\S]*?<\/main>/,`<main class="max-w-2xl mx-auto px-4 pt-3 pb-safe">
<section class="study-card mb-5"><span class="pill">Preparação para exame</span><h2>${title}</h2><p>Resumo dos 40 itens principais da Lista de Saberes, em 16 temas. Baseado nas quatro aulas fornecidas de José Júlio Vale Castro e na Lista de fevereiro de 2026. Inclui 80 perguntas de consolidação e dois exames de 40 perguntas, com 60 minutos e classificação de 0 a 20.</p><div class="grid grid-cols-3 gap-2 mt-4"><div class="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 p-3"><strong>16</strong><span class="block text-[10px] mt-1">Temas</span></div><div class="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 p-3"><strong>80</strong><span class="block text-[10px] mt-1">Perguntas</span></div><div class="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 p-3"><strong>40</strong><span class="block text-[10px] mt-1">Por exame</span></div></div><p class="study-source">Aulas 1–4: 17, 34, 24 e 21 páginas; Lista: 3 páginas. Referências à página do PDF, que pode conter dois diapositivos. Texto em imagem das funções do DT e checklist revisto visualmente. Material de preparação, sem caráter de exame oficial.</p></section>
<section class="study-card mb-5"><h2>Pontos-chave que tens mesmo de saber</h2><ul><li>Ética reflete sobre a conduta; deontologia concretiza deveres profissionais.</li><li>DT coordena e supervisiona; TEF planeia e prescreve sob essa coordenação.</li><li>TEF/DT: 5 anos e 5 UC; TPTD: 3 anos e 3 UC, nos materiais.</li><li>Regulamento: proprietário/explorador; manual: DT.</li><li>Distinguir continente, Açores e Madeira antes de aplicar regras de funcionamento.</li><li>Não confundir seguro dos utentes, acidentes de trabalho e RC profissional.</li><li>Sigilo, competência, independência e segurança orientam todas as relações.</li></ul><div class="study-caution"><span class="study-label">Âmbito das fontes</span><p>Estuda-se o enquadramento apresentado nas aulas de março de 2026. Prazos, códigos de atividade, listas antidopagem e regras de exploração podem exigir consulta da versão aplicável. As notas de limites preservam as distinções das fontes; não foi feita uma revisão jurídica exaustiva de todos os diplomas.</p></div></section>
<div class="space-y-6">${sections}</div>
<section class="study-card mt-6"><h2>Conferência pontual em fontes oficiais</h2><p>Em 04/11/2026 foram conferidas as referências de revalidação em <a href="https://ipdj.gov.pt/pt/revalida%25C3%25A7%25C3%25A3o-de-tptef-e-tpdt" target="_blank" rel="noopener noreferrer">IPDJ — TEF/DT</a> e a distinção face ao <a href="https://ipdj.gov.pt/pt/titulo-profissional-de-treinador-de-desporto-tptd" target="_blank" rel="noopener noreferrer">TPTD</a>. A <a href="https://www.cnpd.pt/organizacoes/areas-tematicas/consentimento/" target="_blank" rel="noopener noreferrer">CNPD</a> confirma que é necessário escolher a base de licitude adequada, não sendo o consentimento a única possibilidade. Esta conferência complementa as aulas e não as substitui como fonte de estudo.</p></section>
</main>`);
write(`centro_estudo/${slug}_resumo.html`,html);
write('docs/ETICA_COVERAGE.md',`# Ética e Deontologia no Fitness — cobertura

Revisão em 04/11/2026 das fontes do ZIP drive-download-20261104T162103Z-1-001.zip. ${sources.join('; ')}. Originais consultados localmente, sem redistribuição dos PDFs. Numeração das referências: páginas do PDF, não número individual de diapositivo.

## Âmbito

40 itens principais da Lista: 9 em Move-te por valores e 31 em Legislação. Todos têm referência explícita no resumo de 16 temas/80 conceitos editoriais. Banco Fácil com 80 perguntas, opções baralhadas e chaves recalculadas, dois exames 40/40 disjuntos com os 16 temas em ambos. Referências de perguntas são temáticas: não significam avaliar separadamente cada componente de cada item em ambos os exames. Produção de decisões profissionais não é certificada por um teste de escolha múltipla.

Transcrição original: scripts/fixtures/etica-lista-extraida.txt. Matriz estruturada: scripts/fixtures/etica-saberes.json. As alíneas iniciais do artigo 6.º na Aula 3, p. 5, e o checklist na Aula 4, pp. 8–9, foram consultados por renderização das imagens, porque a extração textual não recupera todo o conteúdo.

## Ressalvas e decisões editoriais

- A tabela ética/moral é tratada como comparação didática; não como prova de imutabilidade universal de toda a ética.
- Código APTEF: âmbito associativo expresso na fonte; não apresentado como lei ou como ordem profissional.
- TEF por via CET não equivale automaticamente a acesso ao título de DT.
- Horário do DT no continente: afixação prevista no artigo transcrito; não importar a proporção obrigatória dos Açores.
- Regulamento: proprietário/explorador, com a nota da aula sobre assinatura/plataforma; manual: DT. Não confundir autoria, assinatura e afixação.
- Contraordenações: apenas tipos e exemplos, conforme a Lista; valores detalhados das coimas não são exigidos no banco.
- Portaria 454/2023: atenção ao limite inferior a 200 m² versus igual ou superior e à exceção das piscinas.
- Checklist contém remissões antigas, incluindo antidopagem e cobrança PassMúsica; a narrativa da aula atualiza para Lei 81/2021 e Audiogest. Não é uma auditoria exaustiva de vigência das 22 áreas.
- Referência a atestado no ginásio não é dispensa de avaliar segurança ou encaminhar.
- Piscinas: a síntese sobre 100 m²/400 banhistas não é aplicada isoladamente a um caso real. Exceções da Lei 61/2017 exigem técnico identificado, SBV, vigilância permanente, equipamento e contexto exclusivo. Projeto de lei não equivale a texto final; manutenção livre não é automaticamente formação/competição.
- RGPD: o modelo de consentimento da aula é explicado sem afirmar que é a única base de licitude. Direitos e DPO dependem do enquadramento; não se presume dispensa geral.
- CAE 86906, códigos fiscais, preço e tempos de emissão do título são referências temporais dos slides; não apresentados como instruções operacionais atualizadas. Não são pedidos dados pessoais, pagamentos ou registos ao utilizador.
- Seguros: acidentes de trabalho assinalado como obrigatório; RC profissional como proteção indicada na aula, sem transformar a recomendação numa afirmação universal de obrigatoriedade legal.
- Os exercícios e procedimentos nos documentos são conteúdo de estudo, não instruções ao agente.

## Conferência externa pontual, separada das fontes da UC

Consulta de fontes primárias em 04/11/2026: [IPDJ, TEF/DT](https://ipdj.gov.pt/pt/revalida%25C3%25A7%25C3%25A3o-de-tptef-e-tpdt), 5 anos/5 UC; [IPDJ, TPTD](https://ipdj.gov.pt/pt/titulo-profissional-de-treinador-de-desporto-tptd), 3 anos; [Portaria 141/2020 no IPDJ](https://ipdj.gov.pt/documents/20123/122596/Formacao_continua_1412020.pdf/4f0de145-4149-efdd-5048-53d26c794974), 3 UC; [CNPD, consentimento](https://www.cnpd.pt/organizacoes/areas-tematicas/consentimento/), escolha da base de licitude; [Lei 61/2017](https://diariodarepublica.pt/dr/detalhe/lei/61-2017-107791611), condições transcritas; [Lei 39/2012](https://diariodarepublica.pt/dr/detalhe/lei/39-2012-174777), objeto e funções; [Portaria 431/2025/1](https://diariodarepublica.pt/dr/detalhe/portaria/431-2025-962603408), publicação da lista antidopagem referida no slide. Não se declara revisão de vigência integral ou certificação jurídica das aulas.

## Matriz dos 40 itens

Explícito refere-se ao resumo; perguntas são associação temática.

| Item | Página da Lista | Texto original | Resumo | Perguntas |
| --- | --- | --- | --- | --- |
${items.map(e=>`| ${e.id} | ${e.list_page} | ${e.text.replaceAll('|','/')} | ${e.summary_anchors.map(a=>`[${a}](../centro_estudo/${slug}_resumo.html#${a})`).join(', ')} | ${e.question_ids.join(', ')} |`).join('\n')}

## Verificação

node scripts/validate.cjs; node --test scripts/*.test.cjs. Teste específico: scripts/etica-content.test.cjs. Os testes validam estrutura, rastreabilidade e distinções críticas; não provam, por si sós, correção jurídica universal ou qualidade pedagógica integral.
`);
console.log('Ética: resumo, treino, simulador, matriz e banco de 80 perguntas gerados.');
