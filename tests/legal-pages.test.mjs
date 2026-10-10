import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { legalPagePaths, legalReady } from '../src/data/legal-status.ts';
import { releaseApprovals } from '../src/data/release-status.ts';

const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const tag = (node, name) => all(node, (item) => item.tagName === name);
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const page = (path) => parse(readFileSync(new URL(`../dist${path}index.html`, import.meta.url), 'utf8'));

test('legal pages are reachable but not indexed before the verified details are complete', () => {
  const sitemap = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
  const home = page('/');
  const footerLinks = tag(home, 'footer').flatMap((footer) => tag(footer, 'a').map((link) => attr(link, 'href')));
  const privacyLink = tag(home, 'form').flatMap((form) => tag(form, 'a')).find((link) => attr(link, 'href') === '/politica-de-privacidad/');

  assert.equal(releaseApprovals.find((approval) => approval.id === 'legal')?.ready, legalReady);
  assert.ok(privacyLink, 'The form must link the full privacy information');
  for (const path of legalPagePaths) {
    assert.ok(footerLinks.includes(path), `Missing footer link: ${path}`);
    const tree = page(path);
    const robots = tag(tree, 'meta').find((meta) => attr(meta, 'name') === 'robots');
    assert.equal(attr(robots, 'content'), legalReady ? undefined : 'noindex, nofollow');
    assert.equal(sitemap.includes(`<loc>https://amznboost.es${path}</loc>`), legalReady);
  }
});

test('privacy policy explains the contact and data handling without exposing a draft identity table', () => {
  const privacy = page('/politica-de-privacidad/');
  const main = tag(privacy, 'main')[0];
  const headings = tag(main, 'h2').map((heading) => heading.childNodes?.map((child) => child.value ?? '').join(''));
  const links = tag(main, 'a').map((link) => attr(link, 'href'));
  const terms = all(main, (item) => item.nodeName === '#text').map((item) => item.value).join(' ');

  assert.ok(headings.includes('Quién atiende tus datos'));
  assert.ok(headings.includes('Datos que nos facilitas'));
  assert.ok(headings.includes('Para qué los usamos y con qué base'));
  assert.ok(links.includes('mailto:info@amznboost.es'));
  assert.ok(links.includes('/aviso-legal/'));
  assert.equal(tag(main, 'dl').length, 0);
  assert.doesNotMatch(terms, /NIF o CIF|Dirección profesional|Responsable del tratamiento/);
});

test('legal notice has no public identity placeholders or invented owner details', () => {
  const notice = page('/aviso-legal/');
  const main = tag(notice, 'main')[0];
  const terms = all(main, (item) => item.nodeName === '#text').map((item) => item.value).join(' ');
  assert.match(terms, /Amazon Boost/);
  assert.match(terms, /info@amznboost\.es/);
  assert.match(terms, /Sergio Porras de Román/);
  assert.doesNotMatch(terms, /NIF o CIF|Domicilio profesional|Borrador pendiente de publicación/);
  assert.doesNotMatch(terms, /Pendiente de confirmar/);
});

test('legal policies describe the Cloudflare analytics deployed on the public site', () => {
  for (const path of ['/politica-de-privacidad/', '/politica-de-cookies/']) {
    const terms = all(tag(page(path), 'main')[0], (item) => item.nodeName === '#text').map((item) => item.value).join(' ');
    assert.match(terms, /Cloudflare Web Analytics/);
  }
  const cookieTerms = all(tag(page('/politica-de-cookies/'), 'main')[0], (item) => item.nodeName === '#text').map((item) => item.value).join(' ');
  assert.doesNotMatch(cookieTerms, /no ha encontrado scripts de analítica/);
});
