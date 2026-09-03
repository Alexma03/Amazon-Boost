import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { allCaseStudies, featuredCaseStudies, draftCaseStudies, archivedCaseStudies, excludedCasePaths, casePath } from '../src/data/case-studies/catalogue.ts';
import { homeShowcase, pharmaCase, caseChartSeries, websiteReviews } from '../src/data/home-showcase.ts';
import { guideBySlug } from '../src/data/guides.ts';
import { serviceDirectory } from '../src/data/service-pages.ts';
import { createCaseChartConfig } from '../src/lib/case-sales-chart.ts';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const { parse: parseCSS } = require('postcss');
const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const tag = (node, name) => all(node, (item) => item.tagName === name);
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
const meta = (tree, name) => attr(tag(tree, 'meta').find((node) => attr(node, 'name') === name || attr(node, 'property') === name), 'content');
const built = (study) => parse(source('dist' + casePath(study) + 'index.html'));
const schemas = (tree) => tag(tree, 'script').filter((node) => attr(node, 'type') === 'application/ld+json').map((node) => JSON.parse(content(node)));

test('case collection preserves old addresses and separates documented projects from drafts and archive', () => {
  assert.equal(featuredCaseStudies.length, 2);
  assert.equal(draftCaseStudies.length, 2);
  assert.equal(archivedCaseStudies.length, 4);
  assert.equal(new Set(allCaseStudies.map(casePath)).size, allCaseStudies.length);
  for (const slug of ['bebes-estrategia-precios-logistica', 'dominacion-en-la-categoria-de-electronicos', 'historia-de-exito-en-hogar-y-cocina', 'expansion-en-productos-para-mascotas', 'exito-organico-en-productos-para-bebe']) {
    assert.ok(allCaseStudies.some((study) => study.slug === slug));
  }
  const publicEntry = source('src/data/case-studies/index.js');
  assert.match(publicEntry, /featuredCaseStudies as allCaseStudies/);
  for (const study of [...draftCaseStudies, ...archivedCaseStudies]) {
    assert.ok(excludedCasePaths.includes(casePath(study)));
    assert.equal(study.metrics.length, 0);
    assert.equal(study.chart, undefined);
  }
});

test('case content keeps real periods, approximate organic values and supplied testimonials distinct', () => {
  const [organic, pharma] = featuredCaseStudies;
  assert.equal(organic.image.src, homeShowcase.featuredCase.lifestyleImage);
  assert.equal(organic.proofImage.src, homeShowcase.featuredCase.chartImage);
  assert.equal(organic.testimonial.quote, homeShowcase.featuredCase.reviews[0].fullQuote);
  assert.equal(organic.testimonial.url, homeShowcase.featuredCase.reviews[0].url);
  assert.match(organic.evidence, /aproximados/);
  assert.match(organic.evidence, /5.904,74/);
  assert.doesNotMatch(JSON.stringify(organic), /\+1000%|Amazon's Choice/);
  assert.equal(((pharmaCase.currentSales / pharmaCase.previousSales - 1) * 100).toFixed(2), '994.63');
  assert.match(pharma.evidence, /intervalos distintos/);
  assert.match(pharma.sections[2].paragraphs.join(' '), /788,60/);
  assert.ok(!pharma.testimonial);
  for (const study of draftCaseStudies) {
    assert.ok(websiteReviews.some((review) => review.quote === study.testimonial.quote));
    assert.equal(study.testimonial.url, undefined);
    assert.ok(study.pending.length >= 3);
    assert.match(study.testimonial.source, /Testimonio facilitado/);
  }
});

test('each case has real service, guide and case destinations', () => {
  const services = new Set(serviceDirectory.map((entry) => entry.path));
  for (const study of allCaseStudies) {
    assert.ok(services.has(study.service), study.slug);
    for (const slug of study.guides) assert.ok(guideBySlug.has(slug), slug);
    for (const slug of study.related) assert.ok(featuredCaseStudies.some((item) => item.slug === slug), slug);
    assert.equal(new Set(study.sections.map((section) => section.id)).size, study.sections.length);
    for (const image of [study.image, study.proofImage].filter(Boolean)) {
      assert.ok(existsSync(new URL('../public' + image.src, import.meta.url)), image.src);
    }
  }
});

test('built details expose coherent metadata, navigation and indexability', () => {
  for (const study of allCaseStudies) {
    const tree = built(study);
    assert.equal(tag(tree, 'h1').length, 1);
    assert.equal(content(tag(tree, 'title')[0]), study.metaTitle);
    assert.equal(meta(tree, 'description'), study.metaDescription);
    assert.equal(meta(tree, 'og:title'), study.metaTitle);
    assert.equal(meta(tree, 'twitter:title'), study.metaTitle);
    assert.equal(meta(tree, 'og:description'), study.metaDescription);
    assert.equal(meta(tree, 'twitter:description'), study.metaDescription);
    assert.equal(meta(tree, 'og:url'), 'https://amznboost.es' + casePath(study));
    assert.equal(attr(tag(tree, 'link').find((node) => attr(node, 'rel') === 'canonical'), 'href'), 'https://amznboost.es' + casePath(study));
    assert.equal(meta(tree, 'robots'), study.kind === 'documented' ? undefined : 'noindex, nofollow');
    assert.equal(meta(tree, 'og:image'), study.image ? 'https://amznboost.es' + study.image.src : undefined);
    assert.equal(meta(tree, 'twitter:image'), meta(tree, 'og:image'));
    const schema = schemas(tree);
    assert.equal(schema.filter((item) => item['@type'] === 'BreadcrumbList').length, 1);
    assert.equal(schema.filter((item) => item['@type'] === 'Article').length, study.kind === 'documented' ? 1 : 0);
    assert.doesNotMatch(JSON.stringify(schema), /aggregateRating|reviewRating/);
    const ids = new Set(all(tree, (node) => attr(node, 'id')).map((node) => attr(node, 'id')));
    for (const link of tag(tree, 'a')) {
      const href = attr(link, 'href');
      if (href?.startsWith('#')) assert.ok(ids.has(href.slice(1)), study.slug + ':' + href);
    }
    const links = tag(tree, 'a').map((node) => attr(node, 'href'));
    assert.ok(links.includes(study.service));
    for (const slug of study.guides) assert.ok(links.includes(guideBySlug.get(slug).path));
    assert.ok(links.some((href) => href?.startsWith('https://wa.me/34650606400')));
    assert.ok(links.includes('tel:+34650606400'));
    assert.ok(links.includes('/#auditoria'));
    if (study.kind === 'archive') assert.doesNotMatch(content(tree), /245%|320%|250%|Miguel Torres|PetJoy|Ganhu|Carlos Velázquez/);
  }
});

test('directory preserves approved headline and publishes only documented cases', () => {
  const tree = parse(source('dist/casos-de-exito/index.html'));
  assert.equal(content(tag(tree, 'h1')[0]), 'La estrategia se demuestra en la cuenta.');
  assert.equal(all(tree, (node) => attr(node, 'data-case-summary')).length, 2);
  const links = tag(tree, 'a').map((node) => attr(node, 'href'));
  for (const study of featuredCaseStudies) assert.ok(links.includes(casePath(study)));
  for (const study of [...draftCaseStudies, ...archivedCaseStudies]) assert.ok(!links.includes(casePath(study)));
  assert.doesNotMatch(content(tree), /Borrador editorial|historia en preparación/i);
  assert.doesNotMatch(content(tree), /Esta colección utiliza|Base provisional/);
  for (const path of ['src/pages/casos-de-exito/index.astro', 'src/layouts/CaseStudyLayout.astro']) assert.doesNotMatch(source(path), /sub-hero-grid|subpage-redesign/);
});

test('detail charts reuse existing values and retain an accessible data table', () => {
  for (const key of ['organic', 'pharma']) {
    const config = createCaseChartConfig(key, false);
    assert.deepEqual(config.data.labels, caseChartSeries[key].labels);
    assert.deepEqual(config.data.datasets[0].data, caseChartSeries[key].values);
    assert.notEqual(config.data.datasets[0].data, caseChartSeries[key].values);
    assert.equal(config.options.maintainAspectRatio, false);
    assert.equal(config.options.animation.duration, 700);
    assert.equal(createCaseChartConfig(key, true).options.animation, false);
    const tooltip = config.options.plugins.tooltip.callbacks.label({ parsed: { y: 5904.74 } });
    assert.equal(tooltip.startsWith('Aprox.'), key === 'organic');
    const tree = built(featuredCaseStudies.find((study) => study.chart === key));
    const canvas = tag(tree, 'canvas')[0];
    assert.equal(attr(canvas, 'data-detail-chart'), key);
    assert.equal(attr(canvas, 'aria-describedby'), 'chart-note-' + key);
    const table = tag(tree, 'table')[0];
    assert.ok(table);
    assert.equal(tag(table, 'tbody').flatMap((node) => tag(node, 'tr')).length, caseChartSeries[key].labels.length);
  }
});

test('sitemap includes only the ready cases and the directory', () => {
  const xml = source('dist/sitemap-0.xml');
  assert.ok(xml.includes('https://amznboost.es/casos-de-exito/</loc>'));
  for (const study of featuredCaseStudies) assert.ok(xml.includes('https://amznboost.es' + casePath(study)));
  for (const path of excludedCasePaths) assert.ok(!xml.includes('https://amznboost.es' + path));
});

test('new case styles are scoped, responsive and keep the chart square', () => {
  const css = parseCSS(source('src/styles/case-studies.css'));
  css.walkRules((rule) => { for (const selector of rule.selectors) assert.match(selector, /^\.case-/); });
  css.walkDecls('font-size', (decl) => assert.doesNotMatch(decl.value, /vw|cqw/));
  const frame = css.nodes.find((node) => node.selector === '.case-chart-frame');
  assert.ok(frame.nodes.some((node) => node.prop === 'aspect-ratio' && node.value === '1'));
  assert.ok(css.nodes.some((node) => node.name === 'media' && node.params.includes('600px')));
});
