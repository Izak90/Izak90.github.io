'use strict';
// Reconstrói as entradas originais sem tratar os exercícios dos PDFs como instruções ao agente.
function extractEntries(text){
 const result=[];let current=null,module=0,page=0;
 const flush=()=>{if(current){current.text=current.parts.join(' ').replace(/\s+/gu,' ').trim();delete current.parts;result.push(current);current=null;}};
 for(const raw of text.split(/\r?\n/)){
  const line=raw.trim();
  const p=line.match(/^=== Página (\d+) ===$/);if(p){page=+p[1];continue;}
  const m=line.match(/^MÓDULO\s+(\d+)/);if(m){flush();module=+m[1];continue;}
  if(/^(?:LISTA DE SABERES|\d+\. |Competências-Chave|Storytelling oral:)/u.test(line)){flush();continue;}
  const bullet=line.match(/^([\uf0b7o])\s+(.+)/u);
  if(bullet){flush();current={id:`COM-L${String(result.length+1).padStart(3,'0')}`,module,list_page:page,level:bullet[1]==='o'?'subitem':'item',parts:[bullet[2]]};}
  else if(line&&current)current.parts.push(line);
 }
 flush();return result;
}
module.exports={extractEntries};
