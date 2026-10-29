import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { publishedGuides20261020 } from '../src/data/guides-reviewed-2026-10-20.ts';
import { publishedBlogPosts20261020 } from '../src/data/blog/published-2026-10-20.ts';
import { guides } from '../src/data/guides.ts';
import { allBlogPosts } from '../src/data/blog/index.ts';
import { servicePages } from '../src/data/service-pages.ts';
import { canonicalPageUrl, indexablePaths } from '../src/data/site-index.ts';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const entries = [...publishedGuides20261020, ...publishedBlogPosts20261020.map((post) => ({ ...post, path: '/blog/' + post.slug + '/' }))];

test('the twenty previously approved pages remain public alongside the approved training cluster', () => {
  assert.equal(publishedGuides20261020.length, 10);
  assert.equal(publishedBlogPosts20261020.length, 10);
  assert.equal(guides.length, 78);
  assert.equal(allBlogPosts.length, 20);
  assert.equal(indexablePaths.length, 116);
  for (const path of ['src/data/guides.ts', 'src/data/blog/index.ts', 'src/data/guides-reviewed-2026-10-20.ts', 'src/data/blog/published-2026-10-20.ts']) {
    assert.doesNotMatch(read(path), /from\s+['"][^'"]*(?:guide-drafts|blog-drafts)/);
  }
  for (const entry of entries) {
    assert.equal(entry.updatedAt, '2026-10-20');
    assert.ok(indexablePaths.includes(entry.path));
    assert.ok(!('publicationState' in entry));
    assert.ok(!('preparedAt' in entry));
  }
  assert.ok(publishedBlogPosts20261020.every((post) => post.date === '2026-10-20'));
});

test('twenty pages have canonical HTML, sources, contact and sitemap discovery', () => {
  const sitemap = read('dist/sitemap-0.xml');
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 116);
  assert.doesNotMatch(sitemap, /borradores|admin|politica|quienes-somos/);
  for (const entry of entries) {
    const html = read('dist' + entry.path + 'index.html');
    const tree = parse(html);
    const tags = (name) => all(tree, (node) => node.tagName === name);
    assert.equal(tags('h1').length, 1, entry.path);
    assert.equal(tags('main').length, 1, entry.path);
    assert.equal(attr(tags('link').find((node) => attr(node, 'rel') === 'canonical'), 'href'), canonicalPageUrl(entry.path));
    assert.ok(!tags('meta').some((node) => attr(node, 'name') === 'robots' && /noindex/.test(attr(node, 'content') ?? '')));
    assert.ok(tags('script').some((node) => attr(node, 'type') === 'application/ld+json'));
    assert.ok(sitemap.includes('<loc>' + canonicalPageUrl(entry.path) + '</loc>'));
    assert.ok(html.includes('href="/#auditoria"'));
    assert.ok(html.includes('Solicitar auditoría gratuita'));
    assert.ok(html.includes('https://wa.me/34650606400'));
    assert.doesNotMatch(html, /\/borradores\/|No publicad[ao]|Pendiente de aprobación/);
    for (const source of entry.sources) assert.ok(html.includes(source.url.replaceAll('&', '&amp;')));
    assert.ok(entry.sections.every((section) => section.source === undefined || entry.sources[section.source]));
  }
  for (const guide of publishedGuides20261020) {
    assert.ok(servicePages.some((page) => page.guides.includes(guide.slug)));
    assert.ok(read('dist/guias/index.html').includes('href="' + guide.path + '"'));
  }
  for (const post of publishedBlogPosts20261020) {
    assert.ok(read('dist/blog/index.html').includes('href="/blog/' + post.slug + '/"'));
    assert.ok(allBlogPosts.some((other) => other.slug !== post.slug && other.relatedPosts.includes(post.slug)));
    assert.ok(post.guides.every((slug) => guides.some((guide) => guide.slug === slug)));
  }
});

test('new text has no repeated paragraphs or metadata and keeps honest example calculations', () => {
  const collection = [...guides, ...allBlogPosts];
  const normalized = (value) => value.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
  const seen = new Map();
  for (const entry of collection) for (const paragraph of entry.sections.flatMap((section) => section.paragraphs)) {
    const key = normalized(paragraph);
    if (entries.some((item) => item.slug === entry.slug)) assert.ok(!seen.has(key), entry.slug + ': copied paragraph from ' + seen.get(key));
    seen.set(key, entry.slug);
  }
  assert.equal(new Set(collection.map((entry) => entry.slug)).size, collection.length);
  assert.equal(new Set(collection.map((entry) => normalized(entry.title))).size, collection.length);
  assert.equal(new Set(collection.map((entry) => entry.metaTitle ?? entry.seo.metaTitle)).size, collection.length);
  assert.equal(12000 - 8000 - 1500 - 800 - 400, 1300);
  assert.equal(4000 - 2000 - 3000, -1000);
  assert.equal(300 * 4, 150 * 8);
  assert.equal(100 * 8 - 300 - (180 * 5 - 450 - 60), 110);
  assert.equal((200 + 100) / (1000 + 200) * 100, 25);
  assert.doesNotMatch(JSON.stringify(entries), /plazas limitadas|duplicamos tus ventas|equipo de \d+|100% garantizado/i);
});

test('ten public covers remain lightweight, accessible and uncropped', async () => {
  const hashes = new Set();
  for (const post of publishedBlogPosts20261020) {
    assert.ok(existsSync(new URL('../public' + post.image, import.meta.url)));
    const buffer = readFileSync(new URL('../public' + post.image, import.meta.url));
    hashes.add(buffer.toString('base64'));
    assert.ok(buffer.length < 100000);
    const metadata = await sharp(buffer).metadata();
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
    assert.ok(post.imageAlt.length > 55);
    assert.match(post.imageCaption, /no representa datos ni resultados de un cliente/);
    const html = read('dist/blog/' + post.slug + '/index.html');
    assert.ok(html.includes(post.imageAlt));
    assert.ok(html.includes(post.imageCaption));
    assert.ok(html.includes('blog-editorial-media'));
  }
  assert.equal(hashes.size, 10);
});
