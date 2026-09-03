import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { servicePages } from '../src/data/service-pages.ts';

const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => all(child, predicate))];
const attr = (node, key) => node.attrs?.find(a => a.name === key)?.value;
const hasClass = (node, name) => (attr(node, 'class') ?? '').split(/\s+/).includes(name);
const portrait = width => `/images/sergio-porras-amazon-boost-v2-${width}.webp`;

test('new portrait assets retain square proportions with responsive home markup', async () => {
  for (const width of [800, 1440]) {
    const metadata = await sharp(fileURLToPath(new URL('../public' + portrait(width), import.meta.url))).metadata();
    assert.equal(metadata.width, width);
    assert.equal(metadata.height, width);
    assert.equal(metadata.format, 'webp');
  }
  const home = parse(read('dist/index.html'));
  const founder = all(home, node => attr(node, 'id') === 'fundador')[0];
  const image = all(founder, node => node.tagName === 'img')[0];
  assert.equal(attr(image, 'src'), portrait(1440));
  assert.equal(attr(image, 'srcset'), `${portrait(800)} 800w, ${portrait(1440)} 1440w`);
  assert.equal(attr(image, 'width'), attr(image, 'height'));
  assert.equal(attr(image, 'loading'), 'lazy');
  assert.match(attr(image, 'alt'), /Sergio Porras/);
  assert.deepEqual(founder.childNodes.filter(node => node.tagName).map(node => attr(node, 'class')), [
    'ab-founder-copy ab-founder-heading', 'ab-founder-portrait', 'ab-founder-copy ab-founder-details',
  ]);
  assert.equal(attr(all(founder, node => hasClass(node, 'ab-founder-linkedin'))[0], 'href'), 'https://www.linkedin.com/in/sergio-deroman-amazon/');
});

test('prerendered service portraits and social metadata use the same new photograph', () => {
  for (const page of servicePages.filter(page => page.proof === 'team' && page.path.startsWith('/servicios/'))) {
    const html = read(`dist${page.path}index.html`);
    const document = parse(html);
    const image = all(document, node => node.tagName === 'img' && hasClass(node, 'growth-team-image'))[0];
    assert.equal(attr(image, 'src'), portrait(800), page.path);
    assert.equal(attr(image, 'width'), attr(image, 'height'), page.path);
    assert.ok(attr(image, 'srcset').includes(portrait(1440)), page.path);
    assert.equal(attr(all(document, node => attr(node, 'property') === 'og:image')[0], 'content'), 'https://amznboost.es' + portrait(800));
    assert.doesNotMatch(html, /sergio-porras-amazon-boost-(?:800|1440)\.webp/);
  }
});

test('portrait label follows the visible wrist for desktop, tablet and mobile crops', () => {
  const css = read('src/styles/home-redesign.css');
  assert.ok(css.includes('--photo-height:max(100cqh,100cqw)'));
  assert.ok(css.includes('--label-height:max(80px,calc(var(--photo-height) * .105))'));
  assert.ok(css.includes('var(--photo-height) * .825'));
  assert.ok(css.includes('object-position:45% 36%'));
  assert.ok(css.includes('object-position:45% center'));
  // Wrist bounds in the supplied square image, mapped through object-fit: cover.
  for (const [width, height, focusY] of [[320, 400, .5], [390, 487.5, .5], [760, 950, .5], [768, 576, .36], [1100, 825, .36], [451, 1024, .36], [590, 900, .36], [787, 760, .36]]) {
    const photoHeight = Math.max(width, height);
    const offsetY = (height - photoHeight) * focusY;
    const wristTop = .841 * photoHeight + offsetY;
    const wristBottom = Math.min(height, .913 * photoHeight + offsetY);
    if (wristTop >= height) continue;
    const labelHeight = Math.max(80, photoHeight * .105);
    const labelTop = Math.max(0, Math.min(photoHeight * .825 + offsetY, height - labelHeight));
    assert.ok(labelTop <= wristTop && labelTop + labelHeight >= wristBottom, `${width}x${height}`);
    const offsetX = (width - photoHeight) * .45;
    assert.ok(.545 * photoHeight + offsetX >= 20 && .610 * photoHeight + offsetX <= width - 20, `${width}x${height}`);
  }
});
