import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { guides, guideBySlug } from '../src/data/guides.ts';
import { reviewedGuides } from '../src/data/guides-reviewed-2026-10-11.ts';
import { servicePages } from '../src/data/service-pages.ts';
import { canonicalPageUrl, indexablePaths } from '../src/data/site-index.ts';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;

test('only the ten reviewed guides are added to the public collection', () => {
  assert.equal(reviewedGuides.length, 10);
  assert.equal(guides.length, 64);
  assert.equal(new Set(guides.map((guide) => guide.slug)).size, guides.length);
  assert.doesNotMatch(read('src/data/guides-reviewed-2026-10-11.ts'), /from\s+['"][^'"]*guide-drafts/);
  assert.doesNotMatch(read('src/data/guides.ts'), /from\s+['"][^'"]*guide-drafts/);
  for (const guide of reviewedGuides) {
    assert.equal(guideBySlug.get(guide.slug), guide);
    assert.equal(guide.updatedAt, '2026-10-11');
    assert.ok(guide.related.length >= 3);
    assert.ok(guide.related.every((slug) => guideBySlug.has(slug) && slug !== guide.slug), guide.slug);
    assert.ok(servicePages.some((page) => page.guides.includes(guide.slug)), guide.slug);
    assert.ok(guide.sources.length && guide.sources.every((source) => source.url.startsWith('https://')));
    assert.ok(guide.sections.every((section) => section.source === undefined || guide.sources[section.source]), guide.slug);
  }
});

test('reviewed guides are canonical, indexable, discoverable and absent from draft routes', () => {
  const sitemap = read('dist/sitemap-0.xml');
  const directory = read('dist/guias/index.html');
  assert.equal(indexablePaths.length, 90);
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 90);
  for (const guide of reviewedGuides) {
    const html = read('dist' + guide.path + 'index.html');
    const tree = parse(html);
    const links = all(tree, (node) => node.tagName === 'link');
    const metas = all(tree, (node) => node.tagName === 'meta');
    assert.equal(attr(links.find((node) => attr(node, 'rel') === 'canonical'), 'href'), canonicalPageUrl(guide.path));
    assert.ok(!metas.some((node) => attr(node, 'name') === 'robots' && /noindex/.test(attr(node, 'content') ?? '')));
    assert.equal(all(tree, (node) => node.tagName === 'h1').length, 1);
    assert.ok(all(tree, (node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json').length > 0);
    assert.ok(sitemap.includes(`<loc>${canonicalPageUrl(guide.path)}</loc>`));
    assert.ok(directory.includes(`href="${guide.path}"`));
    assert.doesNotMatch(html, /\/borradores\/|Pendiente de aprobación editorial/);
    assert.ok(!existsSync(new URL('../dist/borradores/guias/' + guide.slug + '/index.html', import.meta.url)));
    assert.ok(html.includes('href="/#auditoria"'));
    for (const slug of guide.related) assert.ok(html.includes(`href="${guideBySlug.get(slug).path}"`), `${guide.slug} -> ${slug}`);
  }
});
