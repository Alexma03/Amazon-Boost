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
