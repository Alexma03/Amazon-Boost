import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { indexablePaths, siteUrl } from '../src/data/site-index.ts';
import { guides } from '../src/data/guides.ts';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const file = (path) => new URL('../' + path, import.meta.url);
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node?.attrs?.find((entry) => entry.name === name)?.value;
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
const schemas = (path) => {
  const html = readFileSync(file('dist' + path + 'index.html'), 'utf8');
  return all(parse(html), (node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json')
    .flatMap((node) => {
      const value = JSON.parse(content(node));
      return value['@graph'] ?? [value];
    });
};

test('home identifies the agency, its own logo, founder and website consistently', () => {
  const entities = schemas('/');
  const one = (type) => entities.find((entry) => entry['@type'] === type);
  const organization = one('Organization');
  const founder = one('Person');
  const website = one('WebSite');
  const webpage = one('WebPage');
  assert.equal(organization['@id'], `${siteUrl}/#organization`);
  assert.equal(organization.name, website.name);
  assert.equal(organization.founder['@id'], founder['@id']);
  assert.equal(founder.worksFor['@id'], organization['@id']);
  assert.equal(founder.url, `${siteUrl}/#fundador`);
  assert.equal(founder.name, 'Sergio Porras de Román');
  assert.deepEqual(organization.sameAs, ['https://www.linkedin.com/company/amznboost/', 'https://es.trustpilot.com/review/amznboost.es']);
  assert.deepEqual(founder.sameAs, ['https://www.linkedin.com/in/sergio-deroman-amazon/']);
  assert.equal(website.url, `${siteUrl}/`);
  assert.equal(webpage.mainEntity['@id'], organization['@id']);
  assert.equal(organization.logo.url, `${siteUrl}/images/amazon-boost-logo.png`);
  assert.ok(existsSync(file('public/images/amazon-boost-logo.png')));
});

test('indexable content connects to the same provider and only real blog dates are emitted', () => {
  for (const path of indexablePaths.filter((path) => existsSync(file('dist' + path + 'index.html')))) {
    const entities = schemas(path);
    const page = entities.find((entry) => entry['@type'] === 'WebPage');
    assert.ok(page, path);
    assert.equal(page.publisher['@id'], `${siteUrl}/#organization`);
    assert.equal(entities.filter((entry) => entry['@type'] === 'Organization').length, path === '/' ? 1 : 0);
    const service = entities.find((entry) => entry['@type'] === 'Service');
    if (service) {
      assert.equal(service.provider['@id'], `${siteUrl}/#organization`);
      assert.equal(page.mainEntity['@id'], service['@id']);
    }
    const article = entities.find((entry) => ['Article', 'BlogPosting'].includes(entry['@type']));
    if (article) {
      assert.equal(article.publisher['@id'], `${siteUrl}/#organization`);
      assert.equal(article.author['@id'], `${siteUrl}/#organization`);
      assert.equal(page.mainEntity['@id'], article['@id']);
      if (path.startsWith('/guias/') || path.startsWith('/casos-de-exito/')) {
        const guide = guides.find((entry) => entry.path === path);
        assert.equal(article.dateModified, guide?.updatedAt, path);
        assert.equal(article.datePublished, undefined, path);
      }
    }
    const breadcrumb = entities.find((entry) => entry['@type'] === 'BreadcrumbList');
    if (breadcrumb) {
      assert.equal(breadcrumb['@id'], `${siteUrl}${path}#breadcrumb`);
      assert.equal(breadcrumb.itemListElement.at(-1).item, siteUrl + path);
    }
    assert.ok(entities.every((entry) => entry['@type'] !== 'FAQPage'), path);
  }
});

test('unpublished about page has no structured data', () => {
  assert.deepEqual(schemas('/quienes-somos/'), []);
});
