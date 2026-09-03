import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { servicePages, serviceDirectory, serviceAliases } from '../src/data/service-pages.ts';
import { guides, guideBySlug } from '../src/data/guides.ts';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const { parse: parseCSS } = require('postcss');
const site = 'https://amznboost.es';
const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const all = (node, predicate) => [ ...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)) ];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
const tag = (tree, name) => all(tree, (node) => node.tagName === name);
const metadata = (tree, name) => tag(tree, 'meta').find((node) => attr(node, 'name') === name || attr(node, 'property') === name);

test('service and guide URLs and metadata have distinct identities', () => {
  const records = [...servicePages, ...guides];
  for (const key of ['path', 'metaTitle', 'description']) {
    assert.equal(new Set(records.map((item) => item[key])).size, records.length, key);
  }
  for (const record of records) {
    assert.match(record.path, /^\/[a-z0-9/-]+\/$/);
    assert.ok(record.metaTitle.length <= 75, record.metaTitle);
    assert.ok(record.description.length >= 70, record.path);
  }
});

test('every guide has a relevant service and reciprocal discovery links', () => {
  const servicePaths = new Set(serviceDirectory.map((item) => item.path));
  for (const guide of guides) {
    assert.ok(servicePaths.has(guide.service), guide.service);
    assert.ok(servicePages.some((page) => page.guides.includes(guide.slug)), guide.slug);
    assert.ok(guide.sections.length >= 4);
    assert.ok(guide.checklist.length >= 4);
    assert.ok(guide.faqs.length >= 2);
    assert.ok(guide.sources.length > 0);
    assert.equal(new Set(guide.sections.map((section) => section.id)).size, guide.sections.length);
    for (const section of guide.sections) {
      if (section.source !== undefined) assert.ok(guide.sources[section.source]);
    }
    for (const related of guide.related) {
      assert.ok(guideBySlug.has(related), related);
      assert.notEqual(related, guide.slug);
    }
  }
  for (const page of servicePages) {
    for (const path of page.related) assert.ok(servicePaths.has(path), path);
    for (const slug of page.guides) assert.ok(guideBySlug.has(slug), slug);
    assert.ok(page.preparation.length > 0);
  }
});

test('aliases go directly to a single canonical service or guide', () => {
  const canonicalPaths = new Set([...serviceDirectory.map((page) => page.path), ...guides.map((guide) => guide.path)]);
  for (const [from, to] of Object.entries(serviceAliases)) {
    assert.ok(!serviceAliases[to], `${from} must not form a redirect chain`);
    assert.ok(canonicalPaths.has(to), to);
    assert.ok(!serviceDirectory.some((page) => page.path === from), from);
  }
});

test('only the four approved sector services retire into canonical guides', () => {
  const retiredServices = Object.fromEntries(Object.entries(serviceAliases).filter(([path]) => path.startsWith('/servicios/')));
  assert.deepEqual(retiredServices, {
    '/servicios/belleza/': '/guias/imagenes-cosmetica-amazon/',
    '/servicios/agencia-amazon-cosmetica/': '/guias/vender-cosmetica-amazon/',
    '/servicios/agencia-amazon-suplementos/': '/guias/vender-complementos-alimenticios-amazon/',
    '/servicios/agencia-amazon-mascotas/': '/guias/vender-productos-mascotas-amazon/',
  });
  for (const path of Object.keys(retiredServices)) assert.ok(!serviceDirectory.some((page) => page.path === path), path);
});

test('launch and expansion pages connect the second batch to relevant services', () => {
  const destinations = {
    'lanzar-producto-amazon-checklist': '/servicios/lanzamiento-marca-privada-amazon/',
    'brand-registry-amazon-requisitos': '/servicios/lanzamiento-marca-privada-amazon/',
    'contenido-a-plus-amazon': '/servicios/imagenes-para-amazon/',
    'preparar-catalogo-amazon-europa': '/servicios/expansion-amazon-europa/',
    'amazon-paneuropeo-o-efn': '/servicios/expansion-amazon-europa/',
    'buy-box-amazon-oferta-destacada': '/servicios/gestion-de-cuenta/',
  };
  for (const [slug, path] of Object.entries(destinations)) {
    assert.equal(guideBySlug.get(slug)?.service, path, slug);
    assert.ok(guides.some((guide) => guide.related.includes(slug)), `${slug}: no incoming guide link`);
  }
  for (const path of ['/servicios/lanzamiento-marca-privada-amazon/', '/servicios/expansion-amazon-europa/']) {
    const page = servicePages.find((page) => page.path === path);
    assert.ok(page, path);
    assert.equal(page.proof, 'team', 'Do not attribute an unrelated case result to a new service');
    assert.ok(servicePages.some((other) => other.path !== path && other.related.includes(path)), path);
  }
});

test('guide comparison tables and source references are well formed', () => {
  for (const guide of guides) {
    assert.equal(new Set(guide.related).size, guide.related.length, guide.slug);
    if (guide.table) {
      assert.ok(guide.table.caption.length > 0);
      assert.ok(guide.table.headings.length >= 2);
      for (const row of guide.table.rows) {
        assert.equal(row.length, guide.table.headings.length, guide.slug);
        assert.ok(row.every((cell) => cell.trim().length > 0));
      }
    }
    for (const section of guide.sections) if (section.source !== undefined) {
      assert.ok(Number.isInteger(section.source));
      assert.ok(section.source >= 0 && section.source < guide.sources.length);
    }
  }
});

test('third-batch guides have direct service discovery and contextual links', () => {
  const destinations = {
    'cuanto-cuesta-agencia-amazon': '/agencia-amazon/',
    'cambiar-agencia-amazon': '/servicios/gestion-de-cuenta/',
    'amazon-ads-sin-impresiones': '/servicios/gestion-de-ppc/',
    'palabras-clave-negativas-amazon': '/servicios/gestion-de-ppc/',
    'listing-suprimido-amazon': '/servicios/desbloqueos-amazon/',
    'inventario-varado-amazon': '/servicios/gestion-de-cuenta/',
  };
  for (const [slug, path] of Object.entries(destinations)) {
    const guide = guideBySlug.get(slug);
    assert.equal(guide?.service, path, slug);
    assert.ok(servicePages.find((page) => page.path === path)?.guides.includes(slug), slug);
    assert.ok(guides.some((other) => other.slug !== slug && other.related.includes(slug)), slug);
    assert.ok(guide.table, `${slug}: missing decision table`);
  }
});

test('guide hub and rendered articles expose their navigation and checklists', () => {
  const hub = parse(source('dist/guias/index.html'));
  const hubLinks = new Set(tag(hub, 'a').map((node) => attr(node, 'href')));
  for (const guide of guides) {
    assert.ok(hubLinks.has(guide.path), `${guide.path}: absent from guide hub`);
    if (!guide.path.startsWith('/guias/')) continue;
    const tree = parse(source(`dist${guide.path}index.html`));
    const links = new Set(tag(tree, 'a').map((node) => attr(node, 'href')));
    assert.ok(links.has(guide.service), guide.path);
    for (const slug of guide.related) assert.ok(links.has(guideBySlug.get(slug).path), `${guide.slug}: ${slug}`);
    for (const item of guide.sources) assert.ok(links.has(item.url), item.url);
    assert.equal(tag(tree, 'input').filter((node) => attr(node, 'type') === 'checkbox' && attr(node, 'data-boost-consent') === undefined).length, guide.checklist.length, guide.slug);
    const faqGroup = all(tree, (node) => (attr(node, 'class') ?? '').split(/\s+/).includes('growth-faqs'))[0];
    assert.equal(tag(faqGroup, 'details').length, guide.faqs.length, guide.slug);
    assert.ok(links.has('/#auditoria'), `${guide.slug}: missing early audit link`);
    assert.equal(all(tree, (node) => (attr(node, 'class') ?? '').split(/\s+/).includes('guide-mobile-index')).length, 1, `${guide.slug}: missing compact mobile index`);
  }
});

test('sector guides remain discoverable from core services after retiring duplicate sales pages', () => {
  const destinations = {
    'imagenes-cosmetica-amazon': '/servicios/imagenes-para-amazon/',
    'vender-cosmetica-amazon': '/servicios/gestion-de-cuenta/',
    'vender-complementos-alimenticios-amazon': '/servicios/gestion-de-cuenta/',
    'suscribete-y-ahorra-amazon-vendedores': '/servicios/gestion-de-cuenta/',
    'reducir-devoluciones-amazon': '/servicios/gestion-de-cuenta/',
  };
  for (const [slug, path] of Object.entries(destinations)) {
    assert.equal(guideBySlug.get(slug)?.service, path, slug);
    assert.ok(servicePages.some((page) => page.guides.includes(slug)), slug);
    assert.ok(guides.some((other) => other.slug !== slug && other.related.includes(slug)), slug);
  }
  for (const [slug, domain] of [
    ['imagenes-cosmetica-amazon', 'www.aemps.gob.es'],
    ['vender-cosmetica-amazon', 'www.aemps.gob.es'],
    ['vender-complementos-alimenticios-amazon', 'www.aesan.gob.es'],
  ]) {
    const guide = guideBySlug.get(slug);
    assert.ok(guide.sections.some((section) => section.source !== undefined && new URL(guide.sources[section.source].url).hostname === domain), slug);
  }
});

test('fifth-batch topics have service entry points and incoming guide links', () => {
  const destinations = {
    'vender-productos-mascotas-amazon': '/servicios/gestion-de-cuenta/',
    'amazon-store-marca': '/servicios/gestion-de-cuenta/',
    'brand-analytics-amazon': '/consultoria-amazon/',
    'amazon-business-vender-empresas': '/consultoria-amazon/',
    'como-redactar-listings-amazon': '/servicios/optimizacion-de-listados/',
    'tests-ab-listings-amazon': '/servicios/optimizacion-de-listados/',
  };
  for (const [slug, path] of Object.entries(destinations)) {
    const guide = guideBySlug.get(slug);
    assert.equal(guide?.service, path, slug);
    assert.ok(servicePages.find((page) => page.path === path)?.guides.includes(slug), slug);
    assert.ok(guides.some((other) => other.slug !== slug && other.related.includes(slug)), slug);
    assert.ok(guide.table, `${slug}: missing decision table`);
  }
  const petGuide = guideBySlug.get('vender-productos-mascotas-amazon');
  assert.ok(petGuide.sections.some((section) => section.source !== undefined && new URL(petGuide.sources[section.source].url).hostname === 'www.mapa.gob.es'));
  assert.ok(guideBySlug.get('como-redactar-listings-amazon').related.includes('tests-ab-listings-amazon'));
  assert.ok(guideBySlug.get('tests-ab-listings-amazon').related.includes('como-redactar-listings-amazon'));
});

test('sixth-batch guides cover distinct operational searches and connect to services', () => {
  const destinations = {
    'amazon-vine-requisitos': '/servicios/lanzamiento-marca-privada-amazon/',
    'amazon-attribution-trafico-externo': '/servicios/gestion-de-ppc/',
    'tarifas-fba-calcular-rentabilidad': '/servicios/gestion-de-cuenta/',
    'indice-rendimiento-inventario-ipi-amazon': '/servicios/gestion-de-cuenta/',
    'cupones-promociones-amazon': '/servicios/gestion-de-ppc/',
    'amazon-transparency-marca': '/servicios/lanzamiento-marca-privada-amazon/',
  };
  for (const [slug, path] of Object.entries(destinations)) {
    const guide = guideBySlug.get(slug);
    assert.equal(guide?.service, path, slug);
    assert.ok(servicePages.find((page) => page.path === path)?.guides.includes(slug), slug);
    assert.ok(guides.some((other) => other.slug !== slug && other.related.includes(slug)), `${slug}: no incoming guide link`);
    assert.ok(guide.table, `${slug}: missing decision table`);
    assert.ok(guide.answer.length >= 180, `${slug}: thin direct answer`);
    assert.ok(guide.checklist.length >= 6, `${slug}: incomplete checklist`);
  }
  assert.equal(new Set(Object.keys(destinations).map((slug) => guideBySlug.get(slug).category)).size >= 4, true);
});

test('seventh-batch guides cover compliance, account, FBA and content searches', () => {
  const destinations = {
    'gpsr-amazon-requisitos-europa': '/servicios/expansion-amazon-europa/',
    'salud-cuenta-amazon-metricas': '/servicios/desbloqueos-amazon/',
    'reembolsos-inventario-fba-perdido': '/servicios/gestion-de-cuenta/',
    'terminos-busqueda-backend-amazon': '/servicios/optimizacion-de-listados/',
    'tarifas-fba-bajo-precio-amazon': '/servicios/gestion-de-cuenta/',
    'contenido-a-plus-premium-amazon': '/servicios/optimizacion-de-listados/',
  };
  for (const [slug, path] of Object.entries(destinations)) {
    const guide = guideBySlug.get(slug);
    assert.equal(guide?.service, path, slug);
    assert.ok(servicePages.find((page) => page.path === path)?.guides.includes(slug), slug);
    assert.ok(guides.some((other) => other.slug !== slug && other.related.includes(slug)), `${slug}: no incoming guide link`);
    assert.ok(guide.table, `${slug}: missing decision table`);
    assert.ok(guide.answer.length >= 180, `${slug}: thin direct answer`);
    assert.ok(guide.checklist.length >= 6, `${slug}: incomplete checklist`);
  }
});

test('guide sources use official primary destinations', () => {
  for (const guide of guides) for (const source of guide.sources) {
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:');
    assert.ok(['advertising.amazon.com', 'sell.amazon.com', 'sell.amazon.es', 'sellercentral.amazon.es', 'www.aemps.gob.es', 'www.aesan.gob.es', 'www.mapa.gob.es', 'commission.europa.eu', 'eur-lex.europa.eu'].includes(url.hostname), url.href);
  }
});

test('new styles are scoped and use fixed typography with mobile breakpoints', () => {
  const css = parseCSS(source('src/styles/growth-pages.css'));
  css.walkDecls('font-size', (decl) => assert.doesNotMatch(decl.value, /v[wh]|cqw|cqi/));
  css.walkRules((rule) => assert.match(rule.selector, /\.(growth|guide)-/));
  const media = [];
  css.walkAtRules('media', (rule) => media.push(rule.params));
  assert.ok(media.some((value) => value.includes('740px')));
  assert.ok(media.some((value) => value.includes('prefers-reduced-motion')));
});

test('built static pages have matching metadata, one H1 and structured breadcrumbs', () => {
  const records = [...servicePages.filter((page) => page.path.startsWith('/servicios/')), ...guides.filter((guide) => guide.path.startsWith('/guias/'))];
  for (const record of records) {
    const html = source(`dist${record.path}index.html`);
    const tree = parse(html);
    assert.equal(content(tag(tree, 'title')[0]), record.metaTitle);
    assert.equal(tag(tree, 'h1').length, 1, record.path);
    assert.equal(content(tag(tree, 'h1')[0]), record.title);
    assert.equal(attr(metadata(tree, 'description'), 'content'), record.description);
    assert.equal(attr(metadata(tree, 'og:title'), 'content'), record.metaTitle);
    assert.equal(attr(metadata(tree, 'twitter:description'), 'content'), record.description);
    assert.equal(attr(tag(tree, 'link').find((node) => attr(node, 'rel') === 'canonical'), 'href'), site + record.path);
    assert.ok(!metadata(tree, 'robots'), record.path);
    const schemas = tag(tree, 'script').filter((node) => attr(node, 'type') === 'application/ld+json').map((node) => JSON.parse(content(node)));
    const breadcrumbs = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.itemListElement.at(-1).item, site + record.path);
    assert.equal(schemas.length, 2, record.path);
    if ('slug' in record) {
      assert.equal(schemas.find((schema) => schema['@type'] === 'Article').headline, record.title);
      assert.ok(!metadata(tree, 'og:image'), record.path);
      assert.ok(!metadata(tree, 'twitter:image'), record.path);
    } else {
      assert.equal(schemas.find((schema) => schema['@type'] === 'Service').name, record.title);
      const image = new URL(attr(metadata(tree, 'og:image'), 'content'));
      assert.ok(existsSync(new URL(`../public${image.pathname}`, import.meta.url)), image.href);
    }
    const ids = all(tree, (node) => Boolean(attr(node, 'id'))).map((node) => attr(node, 'id'));
    assert.equal(new Set(ids).size, ids.length, `${record.path}: duplicate IDs`);
    for (const a of tag(tree, 'a')) {
      const href = attr(a, 'href') ?? '';
      if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `${record.path}: ${href}`);
    }
  }
});

test('sitemap contains the canonical pages, without aliases or private routes', () => {
  const sitemap = source('dist/sitemap-0.xml');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  for (const record of [...serviceDirectory, ...guides, { path: '/servicios/' }, { path: '/guias/' }]) assert.ok(locations.includes(site + record.path), record.path);
  assert.equal(new Set(locations).size, locations.length);
  for (const alias of Object.keys(serviceAliases)) assert.ok(!locations.includes(site + alias));
  for (const location of locations) assert.doesNotMatch(new URL(location).pathname, /^\/(admin|api|control|dejar-resena|mensajes)(\/|$)/);
});

test('crawler exclusions use a single group and preserve the production sitemap', () => {
  const robots = source('src/pages/robots.txt.ts');
  assert.equal((robots.match(/User-agent:/g) ?? []).length, 1);
  for (const path of ['/admin', '/api/']) assert.ok(robots.includes(`Disallow: ${path}`));
  for (const path of ['/control', '/dejar-resena']) assert.ok(!robots.includes(`Disallow: ${path}`));
  assert.ok(robots.includes('sitemap-index.xml'));
});
