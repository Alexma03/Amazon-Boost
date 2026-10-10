import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { guides, guideBySlug } from '../src/data/guides.ts';
import { servicePages } from '../src/data/service-pages.ts';
import { getAuditContact } from '../src/data/audit-contact.ts';
import { canonicalPageUrl, sitemapLastModified } from '../src/data/site-index.ts';

const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
const batch = [
  'amazon-ads-clics-sin-ventas', 'informe-terminos-busqueda-amazon-ads',
  'campanas-automaticas-manuales-amazon', 'presupuesto-amazon-ads',
  'exencion-gtin-amazon', 'asin-duplicados-amazon',
  'ventas-beneficio-amazon', 'inventario-fba-baja-rotacion',
];

test('guide hub invites an informed decision and exposes the free audit', () => {
  const tree = parse(source('dist/guias/index.html'));
  const heading = all(tree, (node) => attr(node, 'id') === 'guide-answers-title')[0];
  assert.equal(content(heading), 'Antes de tomar decisiones,entiende dónde está tu cuenta.');
  assert.doesNotMatch(content(heading), /mover tu cuenta/);
  const prompt = all(tree, (node) => attr(node, 'class') === 'guide-answer-contact')[0];
  assert.match(content(prompt), /auditoría gratuita y sin compromiso/);
});

test('all guides offer a visible free audit and a service-to-home journey in static HTML', () => {
  for (const guide of guides) {
    const tree = parse(source('dist' + guide.path + 'index.html'));
    const early = all(tree, (node) => attr(node, 'data-guide-audit') !== undefined);
    assert.equal(early.length, 1, guide.slug);
    assert.equal(attr(early[0], 'href'), '/#auditoria');
    assert.equal(content(early[0]).trim(), 'Solicitar auditoría gratuita');
    const band = all(tree, (node) => attr(node, 'class') === 'guide-early-cta')[0];
    assert.ok(content(band).includes(getAuditContact(guide.service).title), guide.slug);
    const nav = all(tree, (node) => attr(node, 'class') === 'guide-business-links')[0];
    const links = all(nav, (node) => node.tagName === 'a');
    assert.deepEqual(links.map((node) => attr(node, 'href')), [guide.service, '/']);
    assert.ok(content(links[1]).includes('Conocer Amazon Boost'));
    const final = all(tree, (node) => attr(node, 'data-audit-contact') !== undefined)[0];
    assert.match(content(final), /Gratuita y sin compromiso/);
    assert.equal(attr(all(final, (node) => attr(node, 'data-audit-primary') !== undefined)[0], 'href'), '/#auditoria');
  }
});

test('the eight questions have useful content, incoming links and dated sitemap entries', () => {
  const sitemap = source('dist/sitemap-0.xml');
  for (const slug of batch) {
    const guide = guideBySlug.get(slug);
    assert.ok(guide, slug);
    assert.equal(guide.updatedAt, '2026-10-10');
    assert.equal(sitemapLastModified(guide.path), guide.updatedAt);
    assert.ok(sitemap.includes('<loc>' + canonicalPageUrl(guide.path) + '</loc>'));
    assert.ok(servicePages.some((service) => service.guides.includes(slug)), slug + ' missing service link');
    assert.ok(guides.some((other) => other.slug !== slug && other.related.includes(slug)), slug + ' missing guide link');
    assert.equal(guide.sections.length, 4);
    assert.ok(guide.table.rows.length >= 4);
    const words = [guide.answer, ...guide.sections.flatMap((section) => section.paragraphs), ...guide.faqs.map((faq) => faq.answer)].join(' ').split(/\s+/).length;
    assert.ok(words >= 300 && words <= 900, slug + ': ' + words);
  }
});

test('operational limits are explicit instead of fabricated metrics or blanket instructions', () => {
  const text = (slug) => JSON.stringify(guideBySlug.get(slug));
  assert.match(text('presupuesto-amazon-ads'), /techo rígido/);
  assert.match(text('informe-terminos-busqueda-amazon-ads'), /al menos un clic/);
  assert.match(text('exencion-gtin-amazon'), /no sustituye permisos/i);
  assert.match(text('asin-duplicados-amazon'), /reseñas, posiciones/);
  assert.match(text('inventario-fba-baja-rotacion'), /No existe una cobertura universal/);
  assert.match(text('ventas-beneficio-amazon'), /no sustituye contabilidad/);
  for (const slug of ['acos-tacos-amazon', 'imagenes-cosmetica-amazon', 'como-redactar-listings-amazon', 'tarifas-fba-calcular-rentabilidad']) {
    assert.equal(guideBySlug.get(slug).updatedAt, '2026-10-10');
  }
});
