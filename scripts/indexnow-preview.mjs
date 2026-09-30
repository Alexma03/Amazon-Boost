import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexablePaths, siteUrl } from '../src/data/site-index.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const publicPaths = new Set(indexablePaths);

// This only prepares a candidate list. It never reads a key or contacts IndexNow.
export function indexNowPreview(paths) {
  if (!paths.length) throw new Error('Indica al menos una ruta pública modificada.');
  if (!existsSync(join(dist, 'sitemap-0.xml'))) throw new Error('Compila la web antes de preparar la lista.');
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  const urlList = [...new Set(paths)].map((path) => {
    if (!publicPaths.has(path)) throw new Error(`No es una ruta pública canónica: ${path}`);
    const url = siteUrl + path;
    if (!sitemap.includes(`<loc>${url}</loc>`)) throw new Error(`No aparece en el sitemap: ${path}`);
    const file = join(dist, path.slice(1), 'index.html');
    if (!existsSync(file)) throw new Error(`No hay página compilada: ${path}`);
    const html = readFileSync(file, 'utf8');
    if (!html.includes(`rel="canonical" href="${url}"`)) throw new Error(`La canónica no coincide: ${path}`);
    if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) throw new Error(`La página lleva noindex: ${path}`);
    return url;
  });
  return { host: new URL(siteUrl).host, urlList };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try {
    process.stdout.write(JSON.stringify(indexNowPreview(process.argv.slice(2)), null, 2) + '\n');
    process.stderr.write('Vista previa local: no se ha enviado ninguna URL ni se ha creado una clave.\n');
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
