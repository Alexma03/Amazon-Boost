import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const tag = (node, name) => all(node, (item) => item.tagName === name);
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node?.nodeName === '#text' ? node.value : (node?.childNodes ?? []).map(text).join('');
const page = (path) => parse(readFileSync(new URL(`../dist${path}index.html`, import.meta.url), 'utf8'));
const description = (tree) => attr(tag(tree, 'meta').find((item) => attr(item, 'name') === 'description'), 'content');

test('boutique positioning supports existing commercial search terms', () => {
  for (const path of ['/', '/agencia-amazon/', '/servicios/']) {
    const tree = page(path);
    assert.match(text(tag(tree, 'h1')[0]), /Amazon|marcas privadas/);
    assert.match(text(tag(tree, 'title')[0]), /Amazon/);
    assert.match(description(tree), /marcas privadas/);
    assert.equal(tag(tree, 'meta').some((item) => attr(item, 'name') === 'robots'), false);
  }

  const home = page('/');
  const agency = page('/agencia-amazon/');
  assert.match(text(home), /agencia Amazon boutique para marcas privadas/);
  assert.match(text(home), /Dirijo la estrategia de cada cuenta junto al equipo/);
  assert.match(text(agency), /número limitado de cuentas/);
  assert.match(text(agency), /desde el lanzamiento hasta el escalado/);
});

test('about page keeps boutique copy in draft without becoming indexable', () => {
  const about = page('/quienes-somos/');
  assert.match(text(about), /agencia boutique/);
  assert.equal(attr(tag(about, 'meta').find((item) => attr(item, 'name') === 'robots'), 'content'), 'noindex, nofollow');
});
