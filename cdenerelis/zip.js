// ZIP sem compressão: ficheiros abertos por ferramentas ZIP padrão, sem serviços externos.
const crcTable = Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
const crc32 = bytes => {let crc=0xffffffff;for(const byte of bytes)crc=crcTable[(crc^byte)&255]^(crc>>>8);return (crc^0xffffffff)>>>0;};
export function zipFiles(files) {
  const encoder=new TextEncoder(),parts=[],directory=[];let offset=0,size=0;
  for(const file of files){
    const name=encoder.encode(file.path),data=typeof file.data==='string'?encoder.encode(file.data):file.data;
    if(!/^[a-zA-Z0-9_./-]+$/.test(file.path)||file.path.includes('..')||file.path.startsWith('/'))throw Error('Nome de ficheiro inválido.');
    const crc=crc32(data),local=new Uint8Array(30+name.length),view=new DataView(local.buffer);
    view.setUint32(0,0x04034b50,true);view.setUint16(4,20,true);view.setUint16(6,0x800,true);view.setUint32(14,crc,true);view.setUint32(18,data.length,true);view.setUint32(22,data.length,true);view.setUint16(26,name.length,true);local.set(name,30);
    const central=new Uint8Array(46+name.length),dv=new DataView(central.buffer);
    dv.setUint32(0,0x02014b50,true);dv.setUint16(4,20,true);dv.setUint16(6,20,true);dv.setUint16(8,0x800,true);dv.setUint32(16,crc,true);dv.setUint32(20,data.length,true);dv.setUint32(24,data.length,true);dv.setUint16(28,name.length,true);dv.setUint32(42,offset,true);central.set(name,46);
    parts.push(local,data);directory.push(central);offset+=local.length+data.length;size+=central.length;
  }
  const end=new Uint8Array(22),dv=new DataView(end.buffer);dv.setUint32(0,0x06054b50,true);dv.setUint16(8,files.length,true);dv.setUint16(10,files.length,true);dv.setUint32(12,size,true);dv.setUint32(16,offset,true);
  const result=new Uint8Array(offset+size+end.length);let i=0;for(const part of [...parts,...directory,end]){result.set(part,i);i+=part.length;}return result;
}
