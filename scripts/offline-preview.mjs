import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const siteDirectory = resolve(scriptDirectory, '..', 'dist');
const host = '127.0.0.1';
const requestedPort = Number.parseInt(process.argv.find((value) => value.startsWith('--port='))?.split('=')[1] ?? '4173', 10);
const shouldOpen = !process.argv.includes('--no-open');

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

if (!existsSync(join(siteDirectory, 'index.html'))) {
  console.error('No se encuentra la copia offline. Ejecuta primero la compilacion de la web.');
  process.exit(1);
}

function candidateFor(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decoded.includes('\0')) return null;
  const relative = normalize(decoded.replace(/^[/\\]+/, ''));
  const base = resolve(siteDirectory);
  const direct = resolve(base, relative);
  if (direct !== base && !direct.startsWith(base + sep)) return null;

  const candidates = [];
  if (decoded.endsWith('/')) candidates.push(join(direct, 'index.html'));
  else {
    candidates.push(direct);
    if (!extname(direct)) candidates.push(join(direct, 'index.html'), direct + '.html');
  }

  return candidates.find((candidate) => {
    try {
      return statSync(candidate).isFile();
    } catch {
      return false;
    }
  }) ?? null;
}

function sendFile(request, response, filePath, statusCode = 200) {
  const extension = extname(filePath).toLowerCase();
  const cacheControl = extension === '.html' ? 'no-cache' : 'public, max-age=604800, immutable';
  const size = statSync(filePath).size;
  response.writeHead(statusCode, {
    'Cache-Control': cacheControl,
    'Content-Length': size,
    'Content-Type': mimeTypes.get(extension) ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') return response.end();
  createReadStream(filePath).pipe(response);
}

const server = createServer((request, response) => {
  if (!request.url || !['GET', 'HEAD'].includes(request.method ?? '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end('Metodo no permitido');
  }

  const url = new URL(request.url, `http://${host}`);
  if (url.pathname === '/__offline-health') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    return response.end(JSON.stringify({ ok: true, offline: true }));
  }

  const filePath = candidateFor(url.pathname);
  if (filePath) return sendFile(request, response, filePath);

  const notFound = join(siteDirectory, '404.html');
  if (existsSync(notFound)) return sendFile(request, response, notFound, 404);
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Pagina no encontrada');
});

let port = Number.isInteger(requestedPort) && requestedPort > 0 ? requestedPort : 4173;
let attempts = 0;

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && attempts < 10) {
    attempts += 1;
    port += 1;
    return server.listen(port, host);
  }
  console.error('No se ha podido iniciar la preview offline:', error.message);
  process.exitCode = 1;
});

server.on('listening', () => {
  const address = `http://${host}:${port}/`;
  console.log('');
  console.log('Amazon Boost esta disponible sin Internet en:');
  console.log(address);
  console.log('');
  console.log('Manten esta ventana abierta. Pulsa Ctrl+C para cerrar la web.');

  if (shouldOpen) {
    const opener = spawn('explorer.exe', [address], { detached: true, stdio: 'ignore', windowsHide: true });
    opener.unref();
  }
});

server.listen(port, host);

function close() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1000).unref();
}

process.on('SIGINT', close);
process.on('SIGTERM', close);
