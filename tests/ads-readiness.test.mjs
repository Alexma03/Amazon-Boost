import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const home = readFileSync(new URL('../src/components/HomeRedesign.astro', import.meta.url), 'utf8');
test('audit form defaults to POST with disabled controls until handler is attached', () => {
  assert.match(home, /<form[^>]*class="audit-form[^>]*method="post"/);
  assert.match(home, /<button type="submit" disabled>/);
  assert.match(home, /<noscript>/);
  assert.ok(home.indexOf('control.disabled = false') > home.indexOf('form.addEventListener("submit"'));
});
test('audit clicks reach the phone and do not discard campaign query', () => {
  assert.match(home, /auditForm.getBoundingClientRect/);
  assert.match(home, /pushState\(null, '', '#auditoria'\)/);
  assert.doesNotMatch(home, /pushState\(null, '', '\/#auditoria'\)/);
});
test('charts load only when the case section approaches the viewport', () => {
  const cases = readFileSync(new URL('../src/components/FeaturedCases.astro', import.meta.url), 'utf8');
  assert.match(cases, /await import\('chart.js\/auto'\)/);
  assert.match(cases, /rootMargin: '400px'/);
});

test('home prioritizes WhatsApp without removing the audit form or its anchor', () => {
  const hero = home.slice(home.indexOf('<div class="ab-hero-actions">'), home.indexOf('<div class="ab-account-stage"'));
  assert.match(hero, /ab-button-primary ab-button-whatsapp[^>]*href=\{whatsappUrl\}/);
  assert.ok(hero.indexOf('Hablemos por WhatsApp') < hero.indexOf('Solicitar auditoría'));
  assert.match(hero, /href="#auditoria"/);
  assert.match(home, /ab-audit-whatsapp[^>]*href=\{whatsappUrl\}/);
  const float = readFileSync(new URL('../src/components/WhatsAppFloat.astro', import.meta.url), 'utf8');
  assert.match(float, /Hablemos de tu marca/);
  assert.match(float, /Habla con Amazon Boost/);
  assert.doesNotMatch(float, /is-in-header|data-whatsapp-header-slot/);
});
