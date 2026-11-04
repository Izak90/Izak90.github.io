'use strict';
function extractLista(text){
 const items=[],groups=[];let current=null,group=null,page=0;
 const flush=()=>{if(current){current.saber=current.parts.join(' ').replace(/\s+/gu,' ').trim();delete current.parts;items.push(current);current=null;}};
 for(const raw of text.split(/\r?\n/)){
  const line=raw.trim(),p=line.match(/^=== Página (\d+) ===$/);if(p){page=+p[1];continue;}
  const heading=line.match(/^(\d+)\.\s+(.+)/);if(heading){flush();group=+heading[1];groups.push({number:group,title:heading[2],list_page:page});continue;}
  const bullet=line.match(/^[•\uf0b7]\s+(.+)/u);
  if(bullet&&group){flush();current={id:`MKT-L${String(items.length+1).padStart(3,'0')}`,group,list_page:page,parts:[bullet[1]]};}
  else if(current&&line)current.parts.push(line);
 }
 flush();return {groups,items};
}
module.exports={extractLista};
