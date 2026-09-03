import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexablePaths, pendingReleasePaths, siteUrl } from '../src/data/site-index.ts';
import { releaseApprovals } from '../src/data/release-status.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const technicalOnly = process.argv.includes('--technical');
const failures = [];

const read = (path) => readFileSync(join(root, path), 'utf8');
const outputFile = (path) => path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
const isKnownServerPage = (path) => path.split('/').filter(Boolean).length === 1 && existsSync(join(root, 'src', 'pages', '[slug].astro'));

if (!existsSync(dist)) failures.push('No existe dist/. Ejecuta primero la compilación.');

for (const path of indexablePaths) {
  if (!existsSync(outputFile(path)) && !isKnownServerPage(path)) failures.push(`Falta la página pública compilada: ${path}`);
}

const sitemap = existsSync(join(dist, 'sitemap-0.xml')) ? read('dist/sitemap-0.xml') : '';
for (const path of indexablePaths) {
  if (!sitemap.includes(`<loc>${siteUrl}${path}</loc>`)) failures.push(`Falta en el sitemap: ${path}`);
}

for (const path of pendingReleasePaths) {
  const file = outputFile(path);
  if (!existsSync(file)) {
    failures.push(`El borrador no está conservado: ${path}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (!/<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/.test(html)) failures.push(`El borrador no lleva noindex: ${path}`);
  if (sitemap.includes(`<loc>${siteUrl}${path}</loc>`)) failures.push(`El borrador aparece en el sitemap: ${path}`);
}

if (existsSync(join(dist, 'index.html'))) {
  const home = read('dist/index.html');
  for (const path of pendingReleasePaths) {
    if (home.includes(`href="${path}"`)) failures.push(`La portada enlaza el borrador pendiente: ${path}`);
  }
}

const publicFiles = [];
const collect = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) collect(path);
    else publicFiles.push(path);
  }
};
if (existsSync(dist)) collect(dist);
for (const file of publicFiles.filter((path) => /\.(?:html|js|json|xml|txt)$/i.test(path))) {
  const content = readFileSync(file, 'utf8');
  if (/\.html$/i.test(file) && /id="boost-dialog"/.test(content)) failures.push(`El asistente de IA aparece en la salida de lanzamiento: ${file.slice(dist.length + 1)}`);
  if (/sk-or-v1-[a-z0-9]{20,}/i.test(content)) failures.push(`Posible clave de OpenRouter incluida en la salida: ${file.slice(dist.length + 1)}`);
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(content)) failures.push(`Clave privada incluida en la salida: ${file.slice(dist.length + 1)}`);
}

if (failures.length) {
  console.error('\nLa candidatura tiene bloqueos técnicos:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Candidatura técnica válida: ${indexablePaths.length} URLs públicas y ${pendingReleasePaths.length} borrador fuera de indexación.`);

if (!technicalOnly) {
  const blockers = releaseApprovals.filter((approval) => !approval.ready);
  if (blockers.length) {
    console.error('\nFaltan aprobaciones antes de publicar:');
    for (const blocker of blockers) console.error(`- ${blocker.label}: ${blocker.detail}`);
    process.exit(2);
  }
  console.log('Todas las aprobaciones de producción están confirmadas.');
}
