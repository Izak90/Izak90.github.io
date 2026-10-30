import {readFile,writeFile} from 'node:fs/promises';
import {siteConfig} from './content.js';
import {resourceFiles} from './resources.js';
import {buildSite} from './exporter.js';
const directory=new URL('./',import.meta.url);
const resources=await Promise.all(resourceFiles.map(async path=>({path,data:new Uint8Array(await readFile(new URL(path,directory)))})));
const files=buildSite(siteConfig,resources);
for(const file of files)await writeFile(new URL(file.path,directory),file.data);
console.log(`Geradas ${siteConfig.books.length} páginas de livros, início, coleção e recursos PWA (${files.length} ficheiros).`);
