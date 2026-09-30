import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { guides } from '../src/data/guides.ts';
import { featuredCaseStudies, casePath } from '../src/data/case-studies/catalogue.ts';
import { indexNowPreview } from '../scripts/indexnow-preview.mjs';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const read = (path) => readFileSync(new URL(`../dist${path}index.html`, import.meta.url), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');

test('guide answers, supporting sources and case-study limits are readable without JavaScript', () => {
  for (const guide of guides) {
    const tree = parse(read(guide.path));
    const answer = all(tree, (node) => attr(node, 'id') === 'respuesta')[0];
    assert.ok(answer, guide.path);
    assert.ok(content(answer).includes(guide.answer), guide.path);
    const links = new Set(all(tree, (node) => node.tagName === 'a').map((node) => attr(node, 'href')));
    for (const source of guide.sources) assert.ok(links.has(source.url), `${guide.path}: ${source.url}`);
  }
  for (const study of featuredCaseStudies) {
    const tree = parse(read(casePath(study)));
    const evidence = all(tree, (node) => attr(node, 'id') === 'fuentes')[0];
    assert.ok(evidence, study.slug);
    assert.ok(content(evidence).includes(study.evidence), study.slug);
    for (const detail of study.evidenceDetails ?? []) assert.ok(content(evidence).includes(detail.value), study.slug);
  }
});

test('IndexNow preview accepts only built, canonical, indexable changed URLs and never sends them', () => {
  const preview = indexNowPreview(['/guias/cuando-no-lanzar-en-amazon/', '/guias/cuando-no-lanzar-en-amazon/', '/agencia-amazon/']);
  assert.deepEqual(preview, {
    host: 'amznboost.es',
    urlList: ['https://amznboost.es/guias/cuando-no-lanzar-en-amazon/', 'https://amznboost.es/agencia-amazon/'],
  });
  assert.deepEqual(indexNowPreview(['/']).urlList, ['https://amznboost.es/']);
  for (const path of [
    '/quienes-somos/',
    '/admin/mensajes/',
    '/servicios/agencia-amazon-cosmetica/',
    '/guias/cuando-no-lanzar-en-amazon/?x=1',
    'https://otro-dominio.es/',
  ]) {
    assert.throws(() => indexNowPreview([path]), /ruta pública canónica/);
  }
  assert.throws(() => indexNowPreview([]), /al menos una ruta/);
});
