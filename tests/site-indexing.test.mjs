import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { siteUrl, indexablePaths, pendingReleasePaths, normalizePagePath, canonicalPageUrl, isIndexablePath, isInternalPath, isPrivateToolPath, shouldNoindex, pageRedirect, sitemapLastModified } from '../src/data/site-index.ts';
import { serviceAliases } from '../src/data/service-pages.ts';
import { excludedCasePaths } from '../src/data/case-studies/catalogue.ts';
import { allBlogPosts } from '../src/data/blog/index.ts';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const file = (path) => new URL('../' + path, import.meta.url);
const source = (path) => readFileSync(file(path), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
const tag = (node, name) => all(node, (item) => item.tagName === name);
const metadata = (tree, name) => attr(tag(tree, 'meta').find((node) => attr(node, 'name') === name || attr(node, 'property') === name), 'content');
const builtPages = new Map(indexablePaths.filter((path) => existsSync(file('dist' + path + 'index.html'))).map((path) => [path, parse(source('dist' + path + 'index.html'))]));

test('indexing policy lists only public canonical content and excludes drafts and utility routes', () => {
  assert.equal(indexablePaths.length, new Set(indexablePaths).size);
  for (const path of indexablePaths) {
    assert.equal(normalizePagePath(path), path);
    assert.equal(shouldNoindex(path), false);
    assert.equal(isIndexablePath(path), true);
  }
  for (const path of [...pendingReleasePaths, ...excludedCasePaths, ...Object.keys(serviceAliases), '/admin/mensajes/', '/control/', '/dejar-resena/', '/404.html', '/en/']) assert.equal(isIndexablePath(path), false, path);
  for (const path of [...pendingReleasePaths, ...excludedCasePaths, '/admin', '/admin/mensajes/', '/control', '/dejar-resena', '/404.html']) assert.equal(shouldNoindex(path), true, path);
  assert.equal(isInternalPath('/administracion-amazon/'), false);
  assert.equal(isInternalPath('/blog/control-de-cuenta/'), false);
  assert.equal(isPrivateToolPath('/admin/mensajes/'), true);
  assert.equal(isPrivateToolPath('/control/'), true);
  assert.equal(isPrivateToolPath('/api/boost/'), false);
  assert.match(source('src/middleware.ts'), /import\.meta\.env\.PROD[\s\S]*isPrivateToolPath/);
});

test('canonical URLs remove query and fragment without changing image or file extensions', () => {
  assert.equal(canonicalPageUrl('/blog/estrategias-ppc?utm_source=prueba#contacto'), siteUrl + '/blog/estrategias-ppc/');
  assert.equal(canonicalPageUrl('/?preview=privado'), siteUrl + '/');
  assert.equal(normalizePagePath('/robots.txt'), '/robots.txt');
  assert.equal(normalizePagePath('/404.html'), '/404.html');
  assert.equal(canonicalPageUrl('/guias/'), siteUrl + '/guias/');
});

test('public redirects preserve queries, avoid chains and do not intercept mutations or unknown paths', () => {
  for (const [alias, destination] of Object.entries(serviceAliases)) {
    for (const path of [alias, alias.slice(0, -1)]) {
      assert.equal(pageRedirect(new URL(siteUrl + path + '?utm_source=seo&x=1'), 'GET'), destination + '?utm_source=seo&x=1');
      assert.equal(pageRedirect(new URL(siteUrl + path), 'HEAD'), destination);
      assert.equal(pageRedirect(new URL(siteUrl + path), 'POST'), undefined);
    }
    assert.equal(pageRedirect(new URL(siteUrl + destination), 'GET'), undefined);
  }
  assert.equal(pageRedirect(new URL(siteUrl + '/agencia-amazon?utm_source=seo'), 'GET'), '/agencia-amazon/?utm_source=seo');
  for (const path of ['/no-existe', '/api/submit', '/admin/mensajes', '/robots.txt']) assert.equal(pageRedirect(new URL(siteUrl + path), 'GET'), undefined);
  assert.match(source('src/middleware.ts'), /pageRedirect\(new URL\(request\.url\), request\.method\)/);
});

test('sitemap matches the intended public collection exactly and uses real blog modification dates', () => {
  const tree = parse(source('dist/sitemap-0.xml'));
  const entries = tag(tree, 'url');
  const locations = entries.map((node) => content(tag(node, 'loc')[0]));
  assert.deepEqual(locations.sort(), indexablePaths.map((path) => siteUrl + path).sort());
  for (const post of allBlogPosts) {
    const path = '/blog/' + post.slug + '/';
    assert.equal(sitemapLastModified(path), post.updatedAt);
    const entry = entries.find((node) => content(tag(node, 'loc')[0]) === siteUrl + path);
    assert.ok(content(tag(entry, 'lastmod')[0]).startsWith(post.updatedAt));
  }
  assert.equal(sitemapLastModified('/'), undefined);
  assert.equal(sitemapLastModified('/guias/'), undefined);
});

test('hosting serves generated sitemap files directly without the page fallback swallowing them', () => {
  const routes = JSON.parse(source('dist/_routes.json'));
  assert.ok(routes.exclude.includes('/sitemap-*'));
  assert.ok(routes.include.length + routes.exclude.length <= 100);
  const tree = parse(source('dist/sitemap-index.xml'));
  const locations = tag(tree, 'loc').map(content);
  assert.ok(locations.length > 0);
  for (const location of locations) {
    const url = new URL(location);
    assert.equal(url.origin, siteUrl);
    assert.ok(url.pathname.startsWith('/sitemap-'));
    assert.ok(existsSync(file('dist' + url.pathname)));
  }
});

test('all generated public pages expose one matching canonical, title, main heading and no hidden AI claims', () => {
  const titles = new Set();
  assert.ok(builtPages.has('/'));
  for (const [path, tree] of builtPages) {
    assert.equal(attr(tag(tree, 'html')[0], 'lang'), 'es');
    const title = content(tag(tree, 'title')[0]);
    assert.ok(!titles.has(title), 'Duplicate title: ' + path);
    titles.add(title);
    assert.equal(tag(tree, 'h1').length, 1, path);
    const canonical = tag(tree, 'link').filter((node) => attr(node, 'rel') === 'canonical');
    assert.equal(canonical.length, 1);
    assert.equal(attr(canonical[0], 'href'), siteUrl + path);
    assert.equal(metadata(tree, 'og:url'), siteUrl + path);
    assert.equal(metadata(tree, 'og:title'), title);
    assert.equal(metadata(tree, 'twitter:title'), title);
    assert.ok(metadata(tree, 'description').length > 60);
    assert.equal(metadata(tree, 'robots'), undefined);
    assert.equal(metadata(tree, 'ai-summary'), undefined);
    const scripts = tag(tree, 'script').filter((node) => attr(node, 'type') === 'application/ld+json');
    for (const script of scripts) {
      const schema = JSON.parse(content(script));
      assert.doesNotMatch(JSON.stringify(schema), /images\/logo.png|images\/og-image.jpg|latitude|longitude|hoursAvailable|SergioRomanAB|SearchAction|aggregateRating/);
      if (schema['@type'] === 'Article') assert.equal(schema.mainEntityOfPage, siteUrl + path);
      if (schema['@type'] === 'Service') assert.equal(schema.url, siteUrl + path);
    }
    for (const metaName of ['og:image', 'twitter:image']) {
      const image = metadata(tree, metaName);
      if (image && new URL(image).origin === siteUrl) assert.ok(existsSync(file('public' + decodeURIComponent(new URL(image).pathname))), image);
    }
  }
  const home = builtPages.get('/');
  const schemas = tag(home, 'script').filter((node) => attr(node, 'type') === 'application/ld+json').map((node) => JSON.parse(content(node)));
  assert.equal(schemas.filter((schema) => schema['@type'] === 'Organization').length, 1);
  assert.equal(schemas[0].contactPoint.telephone, '+34650606400');
});

test('public content can be discovered from home using HTML links without alias detours or broken fragments', () => {
  const known = new Set([...indexablePaths, ...excludedCasePaths, '/dejar-resena/']);
  const graph = new Map();
  for (const [path, tree] of builtPages) {
    const links = [];
    for (const node of tag(tree, 'a')) {
      const href = attr(node, 'href');
      if (!href) continue;
      const url = new URL(href, siteUrl + path);
      if (url.origin !== siteUrl) continue;
      const target = normalizePagePath(url.pathname);
      assert.ok(!serviceAliases[target], path + ': alias link ' + href);
      assert.ok(known.has(target) || existsSync(file('public' + decodeURIComponent(url.pathname))), path + ': missing ' + href);
      if (url.hash && builtPages.has(target)) {
        const ids = all(builtPages.get(target), (item) => attr(item, 'id')).map((item) => attr(item, 'id'));
        assert.ok(ids.includes(decodeURIComponent(url.hash.slice(1))), path + ': fragment ' + href);
      }
      if (indexablePaths.includes(target)) links.push(target);
    }
    graph.set(path, links);
  }
  const discovered = new Set(['/']);
  const queue = ['/'];
  for (let i = 0; i < queue.length; i++) for (const target of graph.get(queue[i]) ?? []) {
    if (!discovered.has(target)) { discovered.add(target); queue.push(target); }
  }
  for (const path of indexablePaths) assert.ok(discovered.has(path), 'Orphan page: ' + path);
});

test('error page is branded, non-indexable and does not inherit a misleading social image', () => {
  const tree = parse(source('dist/404.html'));
  assert.match(content(tag(tree, 'title')[0]), /no encontrada/);
  assert.equal(tag(tree, 'h1').length, 1);
  assert.equal(metadata(tree, 'robots'), 'noindex, nofollow');
  assert.equal(metadata(tree, 'og:image'), undefined);
  const links = tag(tree, 'a').map((node) => attr(node, 'href'));
  for (const path of ['/', '/servicios/', '/guias/']) assert.ok(links.includes(path));
  const robots = source('src/pages/robots.txt.ts');
  assert.doesNotMatch(robots, /Disallow: \/dejar-resena|Disallow: \/control|Disallow: \/casos-de-exito/);
  assert.match(source('src/layouts/Layout.astro'), /shouldNoindex\(Astro.url.pathname\)/);
});
