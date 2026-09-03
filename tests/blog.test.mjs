import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { allBlogPosts, blogPostsBySlug, readingMinutes } from '../src/data/blog/index.ts';
import { posts } from '../src/data/blog-data.ts';
import { guideBySlug } from '../src/data/guides.ts';
import { serviceDirectory } from '../src/data/service-pages.ts';
import { matchesBlogArticle, mountBlogFilters } from '../src/lib/blog-filters.ts';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const { parse: parseCSS } = require('postcss');
const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
const tag = (tree, name) => all(tree, (node) => node.tagName === name);
const meta = (tree, name) => attr(tag(tree, 'meta').find((node) => attr(node, 'name') === name || attr(node, 'property') === name), 'content');
const originalDates = {
  'optimizacion-listings-amazon': '2025-03-30',
  'estrategias-ppc': '2025-04-01',
  'tendencias-ecommerce': '2025-03-25',
  'herramientas-seo-amazon': '2025-03-05',
  'tacticas-resenas': '2025-03-18',
  'aumentar-conversion-amazon': '2025-03-20',
  'algoritmo-amazon': '2025-04-01',
  'internacionalizacion': '2025-03-15',
  'marketing-influencers': '2025-03-10',
};

test('blog retains all existing addresses and original publication dates', () => {
  assert.deepEqual(allBlogPosts.map((post) => post.slug).sort(), Object.keys(originalDates).sort());
  for (const post of allBlogPosts) {
    assert.equal(post.date, originalDates[post.slug]);
    assert.equal(post.updatedAt, '2026-08-28');
    assert.ok(post.date < post.updatedAt);
    assert.ok(post.seo.metaTitle.length <= 75, post.seo.metaTitle);
    assert.ok(post.seo.metaDescription.length >= 80, post.slug);
    assert.equal(blogPostsBySlug[post.slug], post);
    assert.ok(readingMinutes(post) >= 2);
    assert.doesNotMatch(JSON.stringify(post.sections), /solicita-tutoria|85%|120%|25% y 40%|100% seguro|250 bytes/);
  }
  assert.equal(new Set(allBlogPosts.map((post) => post.seo.metaTitle)).size, allBlogPosts.length);
  assert.equal(new Set(allBlogPosts.map((post) => post.seo.metaDescription)).size, allBlogPosts.length);
  assert.deepEqual(posts.map((post) => post.slug), allBlogPosts.map((post) => post.slug));
});

test('each analysis connects to existing articles, guides and services', () => {
  const services = new Set(serviceDirectory.map((service) => service.path));
  for (const post of allBlogPosts) {
    assert.ok(services.has(post.service), post.service);
    assert.ok(post.guides.length >= 2);
    assert.ok(post.relatedPosts.length >= 2);
    assert.ok(post.sections.length >= 4);
    assert.equal(new Set(post.sections.map((section) => section.id)).size, post.sections.length);
    for (const slug of post.guides) assert.ok(guideBySlug.has(slug), slug);
    for (const slug of post.relatedPosts) {
      assert.ok(blogPostsBySlug[slug], slug);
      assert.notEqual(slug, post.slug);
    }
    assert.ok(allBlogPosts.some((other) => other.relatedPosts.includes(post.slug)), post.slug);
    for (const section of post.sections) {
      assert.ok(section.paragraphs.length > 0);
      if (section.source !== undefined) assert.ok(post.sources[section.source], post.slug);
    }
    for (const reference of post.sources) {
      const url = new URL(reference.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(['sell.amazon.com', 'sell.amazon.es', 'advertising.amazon.com', 'www.helium10.com', 'www.junglescout.com'].includes(url.hostname), url.href);
    }
  }
});

test('article metadata, dates, content and contextual links match the record', () => {
  for (const post of allBlogPosts) {
    const path = '/blog/' + post.slug + '/';
    const tree = parse(source('dist' + path + 'index.html'));
    const links = tag(tree, 'a').map((node) => attr(node, 'href'));
    const text = content(tree);
    assert.equal(tag(tree, 'h1').length, 1);
    assert.equal(content(tag(tree, 'h1')[0]), post.title);
    assert.equal(content(tag(tree, 'title')[0]), post.seo.metaTitle);
    assert.equal(meta(tree, 'description'), post.seo.metaDescription);
    assert.equal(meta(tree, 'og:title'), post.seo.metaTitle);
    assert.equal(meta(tree, 'twitter:description'), post.seo.metaDescription);
    assert.equal(meta(tree, 'og:image'), post.image);
    assert.equal(meta(tree, 'twitter:image'), post.image);
    assert.equal(attr(tag(tree, 'link').find((node) => attr(node, 'rel') === 'canonical'), 'href'), 'https://amznboost.es' + path);
    const schemas = tag(tree, 'script').filter((node) => attr(node, 'type') === 'application/ld+json').map((node) => JSON.parse(content(node)));
    assert.equal(schemas.length, 2);
    const article = schemas.find((schema) => schema['@type'] === 'Article');
    assert.equal(article.headline, post.title);
    assert.equal(article.datePublished, post.date);
    assert.equal(article.dateModified, post.updatedAt);
    assert.equal(article.mainEntityOfPage, 'https://amznboost.es' + path);
    assert.equal(schemas.find((schema) => schema['@type'] === 'BreadcrumbList').itemListElement.at(-1).item, 'https://amznboost.es' + path);
    assert.ok(tag(tree, 'time').some((node) => attr(node, 'datetime') === post.date));
    assert.ok(tag(tree, 'time').some((node) => attr(node, 'datetime') === post.updatedAt));
    assert.ok(links.includes(post.service));
    for (const slug of post.guides) assert.ok(links.includes(guideBySlug.get(slug).path));
    for (const slug of post.relatedPosts) assert.ok(links.includes('/blog/' + slug + '/'));
    for (const reference of post.sources) assert.ok(links.includes(reference.url));
    const ids = all(tree, (node) => Boolean(attr(node, 'id'))).map((node) => attr(node, 'id'));
    assert.equal(new Set(ids).size, ids.length);
    for (const href of links.filter((href) => href?.startsWith('#'))) assert.ok(ids.includes(href.slice(1)), href);
    for (const section of post.sections) {
      for (const paragraph of section.paragraphs) assert.ok(text.includes(paragraph), section.id);
      for (const item of section.items ?? []) assert.ok(text.includes(item), section.id);
    }
  }
});

test('blog library includes every article once with consistent count and working resource navigation', () => {
  const tree = parse(source('dist/blog/index.html'));
  const cards = all(tree, (node) => attr(node, 'data-blog-card') !== undefined);
  assert.equal(cards.length, allBlogPosts.length);
  assert.equal(content(all(tree, (node) => attr(node, 'data-blog-count') !== undefined)[0]), allBlogPosts.length + ' artículos');
  assert.ok(tag(tree, 'input').some((node) => attr(node, 'type') === 'search'));
  assert.equal(tag(tree, 'select').length, 1);
  for (const post of allBlogPosts) assert.equal(cards.filter((card) => tag(card, 'a').some((node) => attr(node, 'href') === '/blog/' + post.slug + '/')).length, 1);
  for (const card of cards) {
    const cover = tag(card, 'img')[0];
    assert.equal(attr(cover, 'loading'), 'lazy');
    assert.ok(attr(cover, 'width') && attr(cover, 'height'));
  }
  for (const [path, active] of [['blog', '/blog/'], ['guias', '/guias/']]) {
    const page = parse(source('dist/' + path + '/index.html'));
    const nav = tag(page, 'nav').find((node) => attr(node, 'aria-label') === 'Recursos de Amazon Boost');
    assert.ok(nav);
    assert.deepEqual(tag(nav, 'a').map((node) => attr(node, 'href')), ['/blog/', '/guias/']);
    assert.equal(attr(tag(nav, 'a').find((node) => attr(node, 'aria-current') === 'page'), 'href'), active);
    for (const label of ['Navegación principal', 'Navegación móvil']) {
      const primary = tag(page, 'nav').find((node) => attr(node, 'aria-label') === label);
      assert.ok(tag(primary, 'a').some((node) => attr(node, 'href') === '/guias/'));
    }
    assert.ok(tag(tag(page, 'footer')[0], 'a').some((node) => attr(node, 'href') === '/guias/'));
  }
  assert.match(source('src/components/Header.astro'), /text: "Guías", href: "\/guias\/"/);
  assert.doesNotMatch(source('src/components/Header.astro'), /isHomepage \? "Diagnóstico"/);
});

test('search ignores accents and case, combines terms and respects category', () => {
  assert.ok(matchesBlogArticle('Conversión y catálogo', 'SEO', 'CATALOGO conversion', ''));
  assert.ok(matchesBlogArticle('Gestión de PPC', 'Publicidad', '  ppc  ', 'Publicidad'));
  assert.ok(!matchesBlogArticle('Gestión de PPC', 'Publicidad', 'ppc', 'Crecimiento'));
  assert.ok(!matchesBlogArticle('Gestión de PPC', 'Publicidad', 'ppc inventario', ''));
  assert.ok(matchesBlogArticle('Prueba', 'SEO', '  ', ''));
});

class Element {
  value = ''; hidden = false; disabled = false; textContent = ''; dataset = {}; listeners = new Map(); focused = false;
  addEventListener(name, callback) { this.listeners.set(name, callback); }
  removeEventListener(name, callback) { if (this.listeners.get(name) === callback) this.listeners.delete(name); }
  dispatch(name, event = {}) { this.listeners.get(name)?.(event); }
  focus() { this.focused = true; }
}

test('filters update counts, empty state and reset without reloading the page', () => {
  const controls = Object.fromEntries(['search', 'category', 'reset', 'form', 'count', 'empty'].map((name) => ['[data-blog-' + name + ']', new Element()]));
  const cards = ['SEO', 'Publicidad', 'SEO'].map((category, index) => Object.assign(new Element(), { dataset: { category, searchText: index === 1 ? 'Campañas PPC' : 'Catálogo y conversión' } }));
  const root = { querySelector: (selector) => controls[selector], querySelectorAll: () => cards };
  const cleanup = mountBlogFilters(root);
  const control = (name) => controls['[data-blog-' + name + ']'];
  assert.equal(control('count').textContent, '3 artículos');
  assert.ok(control('empty').hidden);
  assert.ok(control('reset').disabled);
  control('search').value = 'PPC';
  control('search').dispatch('input');
  assert.equal(control('count').textContent, '1 artículo');
  assert.deepEqual(cards.map((card) => card.hidden), [true, false, true]);
  control('category').value = 'SEO';
  control('category').dispatch('change');
  assert.equal(control('count').textContent, '0 artículos');
  assert.equal(control('empty').hidden, false);
  control('reset').dispatch('click');
  assert.equal(control('count').textContent, '3 artículos');
  assert.ok(cards.every((card) => !card.hidden));
  assert.ok(control('search').focused);
  let prevented = false;
  control('form').dispatch('submit', { preventDefault() { prevented = true; } });
  assert.ok(prevented);
  cleanup();
  assert.ok(Object.values(controls).every((element) => element.listeners.size === 0));
});

test('blog typography is scoped, responsive and free from viewport-scaled text', () => {
  const css = parseCSS(source('src/styles/blog.css'));
  css.walkDecls('font-size', (decl) => assert.doesNotMatch(decl.value, /v[wh]|cqw|cqi/));
  css.walkRules((rule) => assert.match(rule.selector, /\.blog-/));
  const media = [];
  css.walkAtRules('media', (rule) => media.push(rule.params));
  assert.ok(media.some((value) => value.includes('740px')));
  assert.match(source('src/styles/blog.css'), /\[hidden\]\{display:none!important\}/);
  const sitemap = source('dist/sitemap-0.xml');
  for (const post of allBlogPosts) assert.ok(sitemap.includes('https://amznboost.es/blog/' + post.slug + '/'));
});
