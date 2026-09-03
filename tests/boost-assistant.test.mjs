import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { answerBoostQuestion, validBoostEntries } from '../src/lib/boost-answers.ts';
import { mountBoostAssistant } from '../src/lib/boost-assistant.ts';
import { getBoostContact } from '../src/lib/boost-contact.ts';
import { boostEssentials, boostStarters } from '../src/data/boost-assistant.ts';
import { guides } from '../src/data/guides.ts';
import { indexablePaths, shouldNoindex } from '../src/data/site-index.ts';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const payload = JSON.parse(read('dist/asistente/conocimiento.json'));
const entries = validBoostEntries(payload);
const require = createRequire(import.meta.resolve('astro'));
const { parse } = require('parse5');
const all = (n, p) => [...(p(n) ? [n] : []), ...(n.childNodes ?? []).flatMap(c => all(c, p))];
const attr = (n, k) => n.attrs?.find(a => a.name === k)?.value;

test('knowledge uses the existing approved guide answers and working public sources', () => {
  assert.equal(new Set(entries.map(e => e.id)).size, entries.length);
  for (const guide of guides) {
    assert.equal(entries.find(e => e.id === guide.slug).answer, guide.answer);
    guide.faqs.forEach((faq, i) => assert.equal(entries.find(e => e.id === `${guide.slug}:faq:${i}`).answer, faq.answer));
  }
  for (const entry of entries) for (const link of [entry.source, entry.related].filter(Boolean)) {
    assert.ok(indexablePaths.includes(new URL(link.href, 'https://amznboost.es').pathname), link.href);
  }
  assert.equal(shouldNoindex('/asistente/conocimiento.json'), true);
  assert.doesNotMatch(read('dist/sitemap-0.xml'), /conocimiento/);
  assert.match(read('dist/_headers'), /\/asistente\/conocimiento\.json\s+X-Robots-Tag: noindex/);
});

test('starters and natural Spanish queries select the relevant topic without fictitious numbers', () => {
  const cases = [
    ...boostStarters.map((s, i) => [s.question, ['acos-tacos-amazon', 'listing-amazon-visitas-sin-ventas', 'cuenta-amazon-suspendida', 'lanzar-producto-amazon-checklist'][i]]),
    ['Tengo el TACOS muy alto', 'acos-tacos-amazon'],
    ['Necesito fotos para mis productos', 'imagenes-amazon-requisitos'],
    ['Tengo variantes separadas', 'variantes-amazon-parent-child'],
    ['Amazon me retiene el dinero', 'fondos-retenidos-amazon'],
    ['Quiero vender en Francia', 'preparar-catalogo-amazon-europa'],
    ['¿FBA o FBM?', 'amazon-fba-fbm'],
    ['Quiero más ventas', 'listing-amazon-visitas-sin-ventas'],
    ['Tengo problemas con mis anuncios', 'acos-tacos-amazon'],
    ['Mis anuncios no tienen impresiones', 'amazon-ads-sin-impresiones'],
    ['Necesito ayuda con inventario varado', 'inventario-varado-amazon'],
    ['Quiero vender cosmética', 'vender-cosmetica-amazon'],
    ['Tengo suplementos para perros', 'vender-productos-mascotas-amazon'],
    ['Cómo mejorar el posicionamiento SEO', 'como-redactar-listings-amazon'],
    ['Qué hace Amazon Boost', 'servicios'],
    ['Quiero una AUDITORIA gratis', 'auditoria'],
  ];
  for (const [question, id] of cases) assert.equal(answerBoostQuestion(question, entries).entry?.id, id, question);
});

test('specific FAQs retain their exact source text and essential limits are explicit', () => {
  for (const question of ['¿La inversión en Amazon Ads está incluida?', '¿Un TACOS bajo significa que gano dinero?', '¿PPC incluye cambiar mis imágenes y listings?']) {
    const expected = entries.find(e => e.question === question);
    assert.equal(answerBoostQuestion(question, entries).text, expected.answer);
    assert.equal(answerBoostQuestion(question.replace(/[¿?]/g, ''), entries).text, expected.answer);
  }
  assert.equal(answerBoostQuestion('¿Cuánto cobráis?', entries).entry.id, 'honorarios');
  assert.match(answerBoostQuestion('¿Eres una IA?', entries).text, /IA a través de OpenRouter/);
  assert.match(answerBoostQuestion('¿Garantizáis resultados?', entries).text, /No garantizamos/);
  assert.match(answerBoostQuestion('Muéstrame mis ventas', entries).text, /No tengo acceso/);
  assert.equal(answerBoostQuestion('Te paso mi contraseña', entries).kind, 'privacy');
  for (const query of ['', 'Qué tiempo hace mañana', '¿Cuándo se fundó Amazon?', 'Quiero una página web']) assert.equal(answerBoostQuestion(query, entries).kind, 'clarify', query);
});

test('knowledge validation rejects unexpected payloads and external or executable links', () => {
  for (const data of [null, {}, { version: 2, entries }, { version: 1, entries: [] }]) assert.throws(() => validBoostEntries(data));
  for (const href of ['javascript:alert(1)', '//example.com/', 'https://example.com/', '/\\example.com', '/%2fexample.com']) {
    assert.throws(() => validBoostEntries({ version: 1, entries: [{ ...entries[0], source: { label: 'x', href } }] }));
  }
});

class NodeStub {
  dataset = {}; attributes = {}; listeners = new Map(); children = []; value = ''; textContent = ''; hidden = false; disabled = false; open = false;
  style = { setProperty() {} }; scrollHeight = 1000; scrollTop = 0;
  setAttribute(k, v) { this.attributes[k] = v; }
  addEventListener(type, fn, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(fn);
    options?.signal?.addEventListener('abort', () => this.listeners.get(type).delete(fn), { once: true });
  }
  emit(type, properties = {}) { const event = { target: this, preventDefault() { this.defaultPrevented = true; }, ...properties }; for (const fn of this.listeners.get(type) ?? []) fn(event); return event; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  focus() { this.focused = true; }
  showModal() { this.open = true; }
  close() { this.open = false; this.emit('close'); }
  getBoundingClientRect() { return { left: 20, top: 20, right: 444, bottom: 648 }; }
}
const descendants = n => [n, ...n.children.flatMap(descendants)];
const flush = () => new Promise(resolve => setImmediate(resolve));

function fixture({ mobile = false, response, generative = false } = {}) {
  const root = new NodeStub();
  if (generative) root.dataset.boostMode = 'generative';
  const names = ['open', 'close', 'reset', 'form', 'input', 'send', 'status', 'welcome', 'messages', 'scroll', 'contact-invitation', 'audit-label', 'whatsapp', 'consent'];
  const nodes = Object.fromEntries(names.map(name => [name, new NodeStub()]));
  const dialog = new NodeStub();
  const starters = boostStarters.map(s => Object.assign(new NodeStub(), { dataset: { boostQuestion: s.question } }));
  const handoff = new NodeStub();
  root.querySelector = selector => selector === 'dialog' ? dialog : nodes[selector.slice('[data-boost-'.length, -1)];
  root.querySelectorAll = selector => selector === '[data-boost-question]' ? starters : selector === '[data-boost-handoff]' ? [handoff] : [...starters, ...descendants(nodes.messages).filter(n => n.dataset.boostChoice)];
  const classes = new Set();
  const viewport = Object.assign(new NodeStub(), { height: 700, offsetTop: 0 });
  globalThis.document = { createElement: () => new NodeStub(), documentElement: { classList: { add: c => classes.add(c), remove: c => classes.delete(c) } } };
  globalThis.window = { matchMedia: () => ({ matches: !mobile }), setTimeout, clearTimeout, innerHeight: 700, visualViewport: viewport, location: { pathname: '/' } };
  const requests = [];
  globalThis.fetch = async (...args) => { requests.push(args); return response ? response(...args) : new Response(JSON.stringify(payload)); };
  const cleanup = mountBoostAssistant(root);
  const submit = async text => { nodes.input.value = text; nodes.input.emit('input'); nodes.form.emit('submit'); await flush(); };
  return { root, nodes, dialog, starters, handoff, classes, requests, cleanup, submit };
}

test('launcher stays quiet, opens a labelled modal, closes and restores focus without loading knowledge', () => {
  const f = fixture();
  assert.equal(f.requests.length, 0);
  assert.equal(f.dialog.open, false);
  assert.equal(f.nodes.open.hidden, false);
  f.nodes.open.emit('click');
  assert.equal(f.dialog.open, true);
  assert.equal(f.nodes.open.attributes['aria-expanded'], 'true');
  assert.equal(f.nodes.input.focused, true);
  assert.ok(f.classes.has('boost-dialog-open'));
  f.nodes.close.emit('click');
  assert.equal(f.dialog.open, false);
  assert.equal(f.nodes.open.focused, true);
  assert.equal(f.classes.size, 0);
  f.cleanup();
  const mobile = fixture({ mobile: true });
  mobile.nodes.open.emit('click');
  assert.equal(mobile.nodes.input.focused, undefined);
  mobile.cleanup();
});

test('quick questions return source links, reuse the knowledge and do not send visitor text anywhere', async () => {
  const f = fixture();
  f.nodes.open.emit('click');
  f.starters[0].emit('click');
  assert.equal(f.nodes.form.attributes['aria-busy'], 'true');
  assert.equal(f.nodes.send.disabled, true);
  f.starters[1].emit('click');
  await flush();
  assert.equal(f.nodes.messages.children.length, 2);
  assert.equal(f.nodes.messages.children[1].children[1].textContent, guides[0].answer);
  assert.ok(descendants(f.nodes.messages).some(n => n.href === '/guias/acos-tacos-amazon/'));
  await f.submit('Necesito fotos para mis productos');
  assert.equal(f.nodes.messages.children.length, 4);
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0][0], '/asistente/conocimiento.json');
  assert.equal(f.requests[0][1].body, undefined);
  assert.equal(f.nodes.status.textContent, '');
  f.handoff.emit('click');
  assert.equal(f.dialog.open, false);
  f.cleanup();
});

test('contact suggestions adapt to the approved service, not to raw visitor text', () => {
  const cases = [
    ['acos-tacos-amazon', 'Revisar mi publicidad'],
    ['imagenes-amazon-requisitos', 'Revisar mis imágenes'],
    ['listing-amazon-visitas-sin-ventas', 'Revisar mis listings'],
    ['cuenta-amazon-suspendida', 'Consultar mi incidencia'],
    ['lanzar-producto-amazon-checklist', 'Valorar mi lanzamiento'],
  ];
  for (const [id, action] of cases) {
    const contact = getBoostContact(entries.find(e => e.id === id));
    assert.equal(contact.action, action);
    const url = new URL(contact.whatsappUrl);
    assert.equal(url.origin + url.pathname, 'https://wa.me/34650606400');
    assert.ok(url.searchParams.get('text').includes(contact.topic));
    assert.doesNotMatch(contact.invitation, /garantiz|urgente|hoy mismo|última oportunidad/i);
  }
  assert.equal(getBoostContact(entries.find(e => e.id === 'honorarios'), '/servicios/gestion-de-ppc/').action, 'Revisar mi publicidad');
});

test('conversation has one contextual invitation, preserves topic and respects refusal', async () => {
  const f = fixture();
  await f.submit('Tengo el TACOS muy alto');
  assert.equal(f.nodes['contact-invitation'].hidden, false);
  assert.equal(f.nodes['audit-label'].textContent, 'Revisar mi publicidad');
  const whatsapp = f.nodes.whatsapp.href;
  await f.submit('¿Cuánto cobráis?');
  assert.equal(f.nodes.whatsapp.href, whatsapp);
  assert.ok(!descendants(f.nodes.messages).some(n => n.className === 'boost-contact-invitation'));
  await f.submit('No quiero contactar, solo información');
  assert.equal(f.nodes['contact-invitation'].hidden, true);
  await f.submit('Necesito fotos para mis productos');
  assert.equal(f.nodes['contact-invitation'].hidden, true);
  await f.submit('¿Qué es una auditoría?');
  assert.equal(f.nodes['contact-invitation'].hidden, true);
  await f.submit('Quiero hablar con el equipo');
  assert.equal(f.nodes['contact-invitation'].hidden, false);
  f.nodes.reset.emit('click');
  assert.equal(f.nodes['contact-invitation'].hidden, true);
  assert.equal(f.nodes['audit-label'].textContent, 'Solicitar auditoría');
  assert.equal(f.nodes.whatsapp.href, getBoostContact().whatsappUrl);
  f.cleanup();
});

test('contact invitation never follows a privacy warning and an acceptance does not submit a lead', async () => {
  assert.notEqual(answerBoostQuestion('Sí', entries, 'asistente').entry?.id, 'auditoria');
  const f = fixture();
  await f.submit('Me han bloqueado la cuenta');
  await f.submit('Sí, gracias');
  assert.match(f.nodes.messages.children.at(-1).children[1].textContent, /formulario/);
  assert.equal(f.requests.length, 1);
  await f.submit('Te paso mi contraseña');
  assert.equal(f.nodes['contact-invitation'].hidden, true);
  assert.equal(f.requests.length, 1);
  f.cleanup();
});

test('guide answers are crawlable visible HTML, with working links and no published chats', () => {
  const html = read('dist/guias/index.html');
  const tree = parse(html);
  const section = all(tree, n => attr(n, 'id') === 'respuestas')[0];
  assert.ok(section);
  assert.equal(attr(section, 'hidden'), undefined);
  const text = n => n.nodeName === '#text' ? n.value : (n.childNodes ?? []).map(text).join('');
  const links = all(section, n => n.tagName === 'a').map(n => attr(n, 'href'));
  for (const starter of boostStarters) {
    const guide = guides.find(g => g.slug === starter.guide);
    assert.ok(text(section).includes(guide.answer));
    assert.ok(links.includes(guide.path));
  }
  assert.ok(links.includes('/#auditoria'));
  assert.doesNotMatch(read('dist/index.html'), /id="boost-dialog"/);
  assert.doesNotMatch(read('dist/sitemap-0.xml'), /conocimiento\.json|chat|conversacion/);
});

test('reset during a pending lookup cannot restore an old conversation', async () => {
  let resolve;
  const f = fixture({ response: () => new Promise(done => { resolve = done; }) });
  f.starters[0].emit('click');
  f.nodes.reset.emit('click');
  assert.equal(f.nodes.messages.children.length, 0);
  assert.equal(f.nodes.welcome.hidden, false);
  resolve(new Response(JSON.stringify(payload)));
  await flush();
  assert.equal(f.nodes.messages.children.length, 0);
  await f.submit('¿Cuánto cobráis?');
  assert.equal(f.nodes.messages.children.length, 2);
  f.cleanup();
});

test('failed knowledge requests show a recoverable state and do not disable contact or later questions', async () => {
  let calls = 0;
  const f = fixture({ response: () => ++calls === 1 ? new Response('Unavailable', { status: 503 }) : new Response(JSON.stringify(payload)) });
  await f.submit('¿Cuánto cobráis?');
  assert.match(f.nodes.status.textContent, /No se han podido cargar/);
  assert.equal(f.nodes.messages.children[1].children[1].textContent, boostEssentials.find(e => e.id === 'honorarios').answer);
  await f.submit('¿FBA o FBM?');
  assert.equal(f.requests.length, 2);
  assert.equal(f.nodes.status.textContent, '');
  f.cleanup();
});

test('typing handles empty, newline and IME input, and renders untrusted text as text only', async () => {
  const f = fixture();
  await f.submit('   ');
  assert.equal(f.requests.length, 0);
  f.nodes.input.value = 'FBA';
  f.nodes.input.emit('keydown', { key: 'Enter', shiftKey: true });
  f.nodes.input.emit('keydown', { key: 'Enter', isComposing: true });
  assert.equal(f.requests.length, 0);
  f.nodes.input.emit('keydown', { key: 'Enter' });
  await flush();
  const unsafe = '<img src=x onerror=alert(1)>';
  await f.submit(unsafe);
  assert.equal(f.nodes.messages.children[2].children[1].textContent, unsafe);
  assert.doesNotMatch(read('src/lib/boost-assistant.ts'), /innerHTML|insertAdjacentHTML|localStorage|sessionStorage/);
  f.cleanup();
});

test('remount prevention and cleanup remove listeners and background activity', async () => {
  const f = fixture();
  mountBoostAssistant(f.root)();
  assert.equal(f.nodes.open.listeners.get('click').size, 1);
  f.nodes.open.emit('click');
  f.cleanup();
  assert.equal(f.nodes.open.hidden, true);
  assert.equal(f.dialog.open, false);
  assert.equal(f.classes.size, 0);
  assert.equal(f.nodes.open.listeners.get('click').size, 0);
  assert.equal(f.nodes.input.listeners.get('keydown').size, 0);
});

test('launch markup keeps contact controls and leaves the assistant disabled', () => {
  for (const page of ['dist/index.html', 'dist/servicios/index.html', 'dist/blog/estrategias-ppc/index.html']) {
    const html = read(page); const tree = parse(html);
    assert.doesNotMatch(html, /IA basada en nuestras guías|data-boost-consent|OpenRouter y al proveedor del modelo/);
    assert.equal(all(tree, n => n.tagName === 'dialog' && attr(n, 'id') === 'boost-dialog').length, 0);
    assert.equal(all(tree, n => n.tagName === 'h1').length, 1);
    assert.ok(all(tree, n => attr(n, 'class') === 'ab-whatsapp-float').length);
  }
  for (const page of ['dist/404.html', 'dist/casos-de-exito/suplementacion-animal-ppc-listings/index.html']) assert.doesNotMatch(read(page), /id="boost-dialog"/);
  const css = read('src/styles/boost-assistant.css');
  require('postcss').parse(css);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /var\(--boost-vh, 100dvh\)/);
  assert.doesNotMatch(css, /font-size:[^;}]*vw|letter-spacing:\s*-/);
});

test('generative mode requires explicit consent and sends only one bounded question to the same-origin API', async () => {
  const f = fixture({ generative: true, response: async url => url.endsWith('conocimiento.json') ? new Response(JSON.stringify(payload)) : new Response(JSON.stringify({ mode: 'generated', answer: { kind: 'answer', text: 'Revisa publicidad y margen en conjunto antes de aumentar inversión.', entry: entries.find(e => e.id === 'acos-tacos-amazon'), alternatives: [] } })) });
  await f.submit('Tengo el TACOS muy alto');
  assert.equal(f.requests.length, 0);
  assert.match(f.nodes.status.textContent, /Acepta el envío/);
  f.nodes.consent.checked = true;
  f.nodes.consent.emit('change');
  await f.submit('Tengo el TACOS muy alto');
  const call = f.requests.find(([url]) => url.endsWith('/api/boost'));
  assert.ok(call);
  assert.equal(call[1].method, 'POST');
  assert.deepEqual(JSON.parse(call[1].body), { question: 'Tengo el TACOS muy alto', consent: true, contactOffered: true });
  assert.match(f.nodes.status.textContent, /generada con IA/);
  assert.equal(f.nodes.messages.children.length, 2);
  f.cleanup();
});

test('private questions never leave the browser in generative mode', async () => {
  const f = fixture({ generative: true });
  f.nodes.consent.checked = true;
  await f.submit('Mi contraseña es secreta');
  assert.equal(f.requests.length, 0);
  assert.match(f.nodes.status.textContent, /no se ha enviado/);
  assert.equal(f.nodes['contact-invitation'].hidden, true);
  f.cleanup();
});

test('reset and revoking consent abort pending inference and cannot restore an old answer', async () => {
  let resolve;
  const f = fixture({ generative: true, response: async url => url.endsWith('conocimiento.json') ? new Response(JSON.stringify(payload)) : new Promise(done => { resolve = done; }) });
  f.nodes.consent.checked = true;
  await f.submit('Tengo el TACOS muy alto');
  assert.equal(f.nodes.form.attributes['aria-busy'], 'true');
  await f.submit('Necesito fotos');
  assert.equal(f.requests.filter(([url]) => url.endsWith('/api/boost')).length, 1);
  const request = f.requests.find(([url]) => url.endsWith('/api/boost'));
  f.nodes.reset.emit('click');
  assert.equal(request[1].signal.aborted, true);
  resolve(new Response(JSON.stringify({ mode: 'generated', answer: { kind: 'answer', text: 'Respuesta antigua que no debe aparecer.', alternatives: [] } })));
  await flush();
  assert.equal(f.nodes.messages.children.length, 0);
  await f.submit('Tengo el TACOS muy alto');
  f.nodes.consent.checked = false;
  f.nodes.consent.emit('change');
  const latest = f.requests.at(-1);
  assert.equal(latest[1].signal.aborted, true);
  resolve(new Response(JSON.stringify({ mode: 'generated', answer: { kind: 'answer', text: 'Respuesta cancelada.', alternatives: [] } })));
  await flush();
  assert.equal(f.nodes.messages.children.length, 1);
  assert.equal(f.nodes.send.disabled, true);
  f.cleanup();
});

test('rate limiting falls back to approved text and reset does not bypass the local cooldown', async () => {
  const f = fixture({ generative: true, response: async url => url.endsWith('conocimiento.json') ? new Response(JSON.stringify(payload)) : new Response(JSON.stringify({ mode: 'prepared', reason: 'rate-limit', retryAfter: 60, answer: { kind: 'answer', text: guides[0].answer, entry: entries.find(e => e.id === 'acos-tacos-amazon'), alternatives: [] } }), { status: 429 }) });
  f.nodes.consent.checked = true;
  await f.submit('Tengo el TACOS muy alto');
  assert.match(f.nodes.status.textContent, /Límite temporal/);
  f.nodes.reset.emit('click');
  await f.submit('Otra pregunta sobre PPC');
  assert.equal(f.requests.filter(([url]) => url.endsWith('/api/boost')).length, 1);
  assert.match(f.nodes.status.textContent, /Espera un momento/);
  f.cleanup();
});
