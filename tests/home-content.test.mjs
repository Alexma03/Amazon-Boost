import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { diagnosticSignals } from '../src/data/home-signals.ts';
import { homeShowcase, websiteReviews } from '../src/data/home-showcase.ts';

const { parse } = createRequire(import.meta.resolve('astro'))('parse5');
const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => all(child, predicate))];
const attr = (node, key) => node.attrs?.find(a => a.name === key)?.value;
const hasClass = (node, name) => (attr(node, 'class') ?? '').split(/\s+/).includes(name);
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const home = parse(readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8'));
const reviews = all(home, node => attr(node, 'id') === 'resenas')[0];

test('social proof is integrated into the first metric without a floating hero card', () => {
  const credential = all(home, node => hasClass(node, 'ab-hero-credential'));
  assert.equal(credential.length, 0);

  const proof = all(home, node => hasClass(node, 'ab-proof-rail'))[0];
  const reviewMetric = all(proof, node => hasClass(node, 'ab-proof-reviews'))[0];
  assert.match(text(reviewMetric), /\+20/);
  assert.match(text(reviewMetric), /5\/5 en reseñas/);
  const rating = all(reviewMetric, node => hasClass(node, 'ab-proof-rating'))[0];
  assert.equal(attr(rating, 'href'), '#resenas');
  const stars = all(reviewMetric, node => hasClass(node, 'ab-proof-stars'));
  assert.equal(stars.length, 1);
  assert.equal(attr(stars[0], 'aria-label'), 'Cinco estrellas');
  assert.equal(all(stars[0], node => node.tagName === 'svg').length, 5);

  assert.equal(proof.childNodes.filter(node => node.tagName === 'div').length, homeShowcase.proof.length);
  for (const item of homeShowcase.proof) assert.ok(text(proof).includes(item.value));
});

test('homepage labels the Seller Central screen as a simulation and keeps case metrics defensible', () => {
  const demo = all(home, node => hasClass(node, 'ab-seller-demo'))[0];
  assert.equal(text(demo).trim(), 'Simulación visual');
  assert.doesNotMatch(JSON.stringify(homeShowcase.featuredCase.metrics), /\+1000%|posición orgánica/i);
  assert.equal(homeShowcase.featuredCase.metrics[0].value, 'Casi 10x');
});

test('every diagnostic area has three named checks and retains its own color', () => {
  assert.deepEqual(Object.keys(diagnosticSignals), ['ads', 'listing', 'catalog', 'stock']);
  assert.deepEqual(Object.values(diagnosticSignals).map(signal => signal.tone), ['orange', 'lime', 'blue', 'red']);
  for (const signal of Object.values(diagnosticSignals)) {
    assert.equal(signal.checks.length, 3);
    assert.equal(new Set(signal.checks.map(check => check.label)).size, 3);
    assert.ok(signal.checks.every(check => check.label && check.detail));
    assert.equal('bars' in signal, false);
  }
  assert.match(diagnosticSignals.catalog.text, /^Variantes/);
  assert.match(diagnosticSignals.listing.checks[0].label, /Imagen/);
});

test('external review cards preserve supplied authors, dates and source links', () => {
  const [trustpilot, linkedin] = homeShowcase.featuredCase.reviews;
  assert.equal(trustpilot.author, 'Alberto');
  assert.equal(trustpilot.context, 'Opinión espontánea');
  assert.equal(trustpilot.publishedAt, '2026-02-26');
  assert.equal(new URL(trustpilot.url).hostname, 'es.trustpilot.com');
  assert.ok(trustpilot.fullQuote.includes(trustpilot.quote));
  assert.equal(linkedin.author, 'Alberto Gonzalez Redondo');
  assert.equal(linkedin.context, 'Alberto fue cliente de Sergio');
  assert.equal(linkedin.publishedAt, '2026-02-26');
  assert.equal(new URL(linkedin.url).hostname, 'www.linkedin.com');
  assert.ok(linkedin.fullQuote.includes(linkedin.title));
});

test('internal testimonials are not assigned external ratings or publication dates', () => {
  assert.equal(websiteReviews.length, 7);
  for (const review of websiteReviews) {
    for (const field of ['rating', 'stars', 'publishedAt', 'verified']) assert.equal(field in review, false);
  }
});

test('every testimonial uses the same card structure with its actual source', () => {
  const groups = all(reviews, node => hasClass(node, 'ab-review-group'));
  assert.equal(groups.length, 2);
  const cards = all(groups[0], node => hasClass(node, 'ab-review-unified'));
  assert.equal(cards.length, homeShowcase.featuredCase.reviews.length + websiteReviews.length);
  for (const card of cards) {
    assert.deepEqual(card.childNodes.filter(n => n.tagName).map(n => n.tagName), ['div', 'div', 'div', 'blockquote', 'footer']);
    for (const cls of ['ab-review-source', 'ab-review-author', 'ab-review-context']) {
      assert.equal(all(card, node => hasClass(node, cls)).length, 1);
    }
  }
  for (const [i, review] of homeShowcase.featuredCase.reviews.entries()) {
    assert.equal(attr(cards[i], 'href'), review.url);
    assert.equal(attr(all(cards[i], node => node.tagName === 'time')[0], 'datetime'), review.publishedAt);
    assert.ok(text(cards[i]).includes(review.fullQuote));
  }
  const internalCards = cards.filter(card => hasClass(card, 'is-internal'));
  for (const [i, card] of internalCards.entries()) {
    assert.equal(card.tagName, 'article');
    assert.equal(all(card, node => node.tagName === 'time' || hasClass(node, 'ab-platform-stars')).length, 0);
    assert.equal(all(card, node => node.tagName === 'a').length, 0);
    assert.equal(all(card, node => attr(node, 'src') === '/favicon.svg').length, 1);
    assert.ok(text(card).includes('Experiencia compartida'));
    assert.doesNotMatch(text(card), /Testimonio aportado|Reseña verificada|Enviado desde la web/);
    const footer = all(card, node => node.tagName === 'footer')[0];
    assert.equal(text(footer).trim(), 'Leer completa');
    assert.ok(text(card).includes(websiteReviews[i].quote));
  }
  assert.equal(all(groups[0], node => hasClass(node, 'ab-platform-stars')).length, 1);
  const heading = all(reviews, node => hasClass(node, 'ab-client-reviews-heading'))[0];
  assert.match(text(heading), /El resultado importa/);
  assert.doesNotMatch(text(heading), /Opiniones públicas|Nuevas historias|publicación original/);
});

test('full testimonials remain readable and carousel duplicates are not focusable', () => {
  for (const review of websiteReviews) {
    const dialogs = all(reviews, node => node.tagName === 'dialog' && attr(node, 'id') === `review-${review.id}`);
    assert.equal(dialogs.length, 1);
    assert.ok(text(dialogs[0]).includes(review.quote));
    assert.ok(text(dialogs[0]).includes('Experiencia compartida'));
    assert.doesNotMatch(text(dialogs[0]), /Testimonio aportado|Reseña verificada|Enviado desde la web/);
    const triggers = all(reviews, node => attr(node, 'data-review-open') === review.id);
    assert.equal(triggers.length, 2);
    for (const trigger of triggers) assert.equal(attr(trigger, 'aria-controls'), attr(dialogs[0], 'id'));
  }
  const duplicate = all(reviews, node => hasClass(node, 'ab-review-group'))[1];
  assert.equal(attr(duplicate, 'aria-hidden'), 'true');
  for (const control of all(duplicate, node => node.tagName === 'a' || node.tagName === 'button')) {
    assert.equal(attr(control, 'tabindex'), '-1');
  }
  assert.equal(all(reviews, node => attr(node, 'data-review-pause') !== undefined).length, 1);
  assert.equal(all(reviews, node => node.tagName === 'a' && attr(node, 'href') === '/dejar-resena').length, 3);
});
