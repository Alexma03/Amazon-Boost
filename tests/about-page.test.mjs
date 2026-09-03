import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const html = readFileSync(new URL('../dist/quienes-somos/index.html', import.meta.url), 'utf8');
const tree = parse(html);

const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const tag = (node, name) => all(node, (item) => item.tagName === name);
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node?.nodeName === '#text' ? node.value : (node?.childNodes ?? []).map(text).join('');
const withClass = (name) => all(tree, (node) => (attr(node, 'class') ?? '').split(/\s+/).includes(name));

test('about page remains a complete but non-indexable release draft', () => {
  assert.equal(tag(tree, 'h1').length, 1);
  assert.match(text(tag(tree, 'h1')[0]), /Amazon Boost[\s\S]*Agencia Amazon para marcas privadas/);
  assert.equal(attr(tag(tree, 'link').find((node) => attr(node, 'rel') === 'canonical'), 'href'), 'https://amznboost.es/quienes-somos/');
  assert.equal(attr(tag(tree, 'meta').find((node) => attr(node, 'name') === 'robots'), 'content'), 'noindex, nofollow');
  assert.match(text(tree), /Delegar la cuenta no debería significar dejar de entenderla/);
  assert.match(text(tree), /No vendemos atajos/);
  assert.doesNotMatch(text(tree), /garantizamos|resultados garantizados|agencia n[úu]mero 1/i);
});

test('about page links verifiable proof, founder and commercial next steps', () => {
  const links = tag(tree, 'a').map((node) => attr(node, 'href'));
  for (const href of [
    '/#auditoria',
    '/casos-de-exito/',
    '/servicios/gestion-de-cuenta/',
    '/servicios/gestion-de-ppc/',
    'https://www.linkedin.com/in/sergio-deroman-amazon/',
    'https://es.trustpilot.com/review/amznboost.es',
  ]) assert.ok(links.includes(href), href);
  const portrait = tag(tree, 'img').find((node) => /fundador de la agencia Amazon Boost/.test(attr(node, 'alt') ?? ''));
  assert.ok(portrait);
  assert.equal(attr(portrait, 'fetchpriority'), 'high');
});

test('release header keeps only approved destinations and grouped Recursos', () => {
  const desktop = withClass('ab-desktop-nav')[0];
  const children = (desktop.childNodes ?? []).filter((node) => node.tagName);
  assert.deepEqual(children.map((node) => node.tagName), ['a', 'a', 'details']);
  assert.deepEqual(children.slice(0, 2).map((node) => text(node).trim()), ['Caso real', 'Servicios']);
  assert.equal(text(tag(children[2], 'summary')[0]).replace(/\s+/g, ' ').trim(), 'Recursos');
  assert.deepEqual(tag(children[2], 'a').map((node) => text(node).replace(/\s+/g, ' ').trim()), ['Guías', 'Blog']);
  assert.equal(tag(desktop, 'a').some((node) => attr(node, 'href') === '/quienes-somos/'), false);

  const mobile = withClass('ab-mobile-menu')[0];
  const mobileDetails = tag(mobile, 'details')[0];
  assert.ok(mobileDetails);
  assert.equal(text(tag(mobileDetails, 'summary')[0]).replace(/\s+/g, ' ').trim(), 'Recursos');
});
