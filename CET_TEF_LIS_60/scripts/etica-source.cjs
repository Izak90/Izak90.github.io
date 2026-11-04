'use strict';
function extractEntries(text){
 const entries=[];let current=null,area=null,page=0;
 const flush=()=>{if(current){current.text=current.parts.join(' ').replace(/\s+/gu,' ').trim();delete current.parts;entries.push(current);current=null;}};
 for(const raw of text.split(/\r?\n/)){
  const line=raw.trim(),p=line.match(/^=== Página (\d+) ===$/);
  if(p){page=+p[1];continue;}
  if(line==='MOVE-TE POR VALORES'||line==='LEGISLAÇÃO'){flush();area=line;continue;}
  if(/^Outras determinações|^Outras Leis|^Fev 2026/.test(line)){flush();continue;}
  const m=line.match(/^(\d+)\.\s+(.+)/);
  if(m&&area){flush();current={id:`ETI-${area==='LEGISLAÇÃO'?'L':'V'}${m[1].padStart(2,'0')}`,area,list_number:+m[1],list_page:page,parts:[m[2]]};}
  else if(current&&line)current.parts.push(line);
 }
 flush();return entries;
}
module.exports={extractEntries};
