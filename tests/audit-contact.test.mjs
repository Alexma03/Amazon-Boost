import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { guides } from '../src/data/guides.ts';
import { allBlogPosts } from '../src/data/blog/index.ts';
import { servicePages } from '../src/data/service-pages.ts';
import { allCaseStudies, casePath } from '../src/data/case-studies/catalogue.ts';
import { getAuditContact } from '../src/data/audit-contact.ts';

const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const tag = (node, name) => all(node, (item) => item.tagName === name);
const content = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');

const checkContact = (path, service, topic) => {
  const tree = parse(source('dist' + path + 'index.html'));
  const main = tag(tree, 'main')[0];
  const contacts = all(main, (node) => attr(node, 'data-audit-contact') !== undefined);
  assert.equal(contacts.length, 1, path);
  const contact = contacts[0];
  const primary = all(contact, (node) => attr(node, 'data-audit-primary') !== undefined)[0];
  assert.equal(primary.tagName, 'a');
  assert.equal(attr(primary, 'href'), '/#auditoria');
  assert.equal(content(primary).trim(), 'Solicitar auditoría inicial');
  assert.match(attr(primary, 'class'), /growth-button/);
  assert.equal(content(tag(contact, 'h2')[0]), getAuditContact(service).title);
  assert.equal(attr(contact, 'aria-labelledby'), attr(tag(contact, 'h2')[0], 'id'));
  assert.equal(tag(contact, 'a')[0], primary, path + ' action order');
  const whatsapp = tag(contact, 'a').find((node) => attr(node, 'href')?.startsWith('https://wa.me/'));
  const url = new URL(attr(whatsapp, 'href'));
  assert.equal(url.pathname, '/34650606400');
  assert.match(url.searchParams.get('text'), /solicitar una auditoría inicial/);
  if (topic) assert.ok(url.searchParams.get('text').includes(topic), path);
  assert.ok(!attr(whatsapp, 'class')?.includes('growth-button'));
  assert.ok(tag(contact, 'a').some((node) => attr(node, 'href') === 'tel:+34650606400'));
  assert.equal(tag(contact, 'li').length, 3);
  assert.match(content(contact), /Sin compromiso/);
  assert.match(content(contact), /No compartas contraseñas/);
  const sections = tag(main, 'section');
  assert.equal(sections.at(-1), contact, path + ' final section');
};

test('each guide and blog article ends with a contextual audit-first call to action', () => {
  for (const guide of guides.filter((entry) => entry.path.startsWith('/guias/'))) checkContact(guide.path, guide.service, guide.title);
  for (const post of allBlogPosts) checkContact('/blog/' + post.slug + '/', post.service, post.title);
  for (const path of ['/blog/', '/guias/', '/servicios/', '/casos-de-exito/']) checkContact(path);
});

test('commercial and case pages keep contact paths and audit primary action', () => {
  for (const service of servicePages.filter((entry) => entry.path.startsWith('/servicios/'))) checkContact(service.path, service.path, service.title);
  checkContact('/servicios/imagenes-para-amazon/', '/servicios/imagenes-para-amazon/', 'imágenes para Amazon');
  for (const study of allCaseStudies) checkContact(casePath(study), study.service);
});

test('audit profiles distinguish reading intent without promises of results or urgency', () => {
  const paths = ['/servicios/gestion-de-ppc/', '/servicios/optimizacion-de-listados/', '/servicios/imagenes-para-amazon/', '/servicios/desbloqueos-amazon/', '/servicios/lanzamiento-marca-privada-amazon/', '/servicios/expansion-amazon-europa/', '/consultoria-amazon/'];
  const profiles = paths.map(getAuditContact);
  assert.equal(new Set(profiles.map((profile) => profile.title)).size, profiles.length);
  for (const profile of [...profiles, getAuditContact()]) {
    assert.equal(profile.preparation.length, 3);
    assert.ok(profile.description.length > 100);
    assert.doesNotMatch(JSON.stringify(profile), /24 horas|plazas|garantiz|duplicar|100%|gratis/);
  }
  assert.equal(getAuditContact('/desconocido/'), getAuditContact());
  assert.match(getAuditContact('/servicios/desbloqueos-amazon/').description, /depende de Amazon/);
  assert.match(getAuditContact('/servicios/lanzamiento-marca-privada-amazon/').description, /No necesitas tener la cuenta en marcha/);
});

test('audit destination remains the existing form and uses no lead capture or tracking script', () => {
  const main = source('src/components/HomeRedesign.astro');
  assert.match(main, /id="auditoria"/);
  assert.match(main, /<form class="audit-form ab-phone-form"/);
  const cta = source('src/components/ServiceContact.astro');
  assert.doesNotMatch(cta, /<script|<form|localStorage|sessionStorage|fetch\(/);
  assert.match(source('src/layouts/GuideLayout.astro'), /service=\{guide.service\}/);
  assert.match(source('src/layouts/BlogPostLayout.astro'), /service=\{post.service\}/);
});
