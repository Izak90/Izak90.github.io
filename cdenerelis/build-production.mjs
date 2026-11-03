import {readFile, writeFile, mkdir, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {siteConfig} from './content.js';
import {resourceFiles} from './resources.js';
import {buildSite} from './exporter.js';

const root = fileURLToPath(new URL('./', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('Destino de publicação inválido.');
}
const resources = await Promise.all(resourceFiles.map(async file => ({
  path: file,
  data: new Uint8Array(await readFile(path.join(root, file)))
})));
const files = buildSite(siteConfig, resources);
files.push({path: '_headers', data: await readFile(path.join(root, '_headers'))});
// Resolve e valida todos os destinos antes de substituir apenas a pasta dist.
for (const file of files) {
  const target = path.resolve(output, file.path);
  if (!target.startsWith(output + path.sep)) throw new Error('Recurso fora de dist: ' + file.path);
}
await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
for (const file of files) {
  const target = path.resolve(output, file.path);
  await mkdir(path.dirname(target), {recursive: true});
  await writeFile(target, file.data);
}
console.log(`Produção preparada em dist: ${files.length} ficheiros. Nenhum deploy executado.`);
