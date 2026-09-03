import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { mountDiagnosticExperience } from '../src/lib/diagnostic-experience.ts';
import { diagnosticSignals } from '../src/data/home-signals.ts';

const { parse: parseCss } = createRequire(import.meta.resolve('astro'))('postcss');

class NodeStub {
  dataset = {};
  attributes = {};
  textContent = '';
  disabled = true;
  listeners = new Map();
  animations = [];
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(type, callback, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
    options?.signal?.addEventListener('abort', () => this.removeEventListener(type, callback), { once: true });
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  emit(type) { this.listeners.get(type)?.forEach(callback => callback()); }
  animate() {
    const animation = { canceled: false, cancel() { this.canceled = true; } };
    this.animations.push(animation);
    return animation;
  }
}

function fixture(reduced = false) {
  const root = new NodeStub();
  root.dataset = { tone: 'orange', motion: 'paused' };
  const buttons = Object.keys(diagnosticSignals).map(signal => Object.assign(new NodeStub(), { dataset: { signal } }));
  const scenes = Object.keys(diagnosticSignals).map((signal, index) => Object.assign(new NodeStub(), { dataset: { diagnosticScene: signal }, hidden: index !== 0 }));
  const toggle = new NodeStub();
  const text = Object.fromEntries(['label', 'title', 'copy', 'metric', 'detail'].map(field => [field, new NodeStub()]));
  const keywords = Array.from({ length: 3 }, () => new NodeStub());
  const groups = [new NodeStub(), new NodeStub()];
  root.querySelector = selector => selector === '[data-motion-toggle]' ? toggle : text[selector.slice('[data-diagnostic-'.length, -1)];
  root.querySelectorAll = selector => ({ '[data-signal]': buttons, '[data-diagnostic-scene]': scenes, '[data-diagnostic-keyword]': keywords, '[data-diagnostic-copy-group], [data-diagnostic-illustration]': groups })[selector];
  const document = Object.assign(new NodeStub(), { hidden: false });
  const motion = Object.assign(new NodeStub(), { matches: reduced });
  const observers = [];
  globalThis.document = document;
  globalThis.window = { matchMedia: () => motion };
  globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  const cleanup = mountDiagnosticExperience(root);
  const visible = value => observers[0].callback([{ isIntersecting: value }]);
  return { root, buttons, scenes, toggle, text, keywords, groups, document, motion, observers, visible, cleanup };
}

test('every area preserves its copy and color without adding account figures', () => {
  const f = fixture();
  f.visible(true);
  for (const button of f.buttons) {
    assert.equal(button.disabled, false);
    button.emit('click');
    const expected = diagnosticSignals[button.dataset.signal];
    assert.equal(f.root.dataset.tone, expected.tone);
    assert.deepEqual(f.scenes.filter(scene => !scene.hidden).map(scene => scene.dataset.diagnosticScene), [button.dataset.signal]);
    assert.equal(f.text.title.textContent, expected.title);
    assert.equal(f.text.copy.textContent, expected.text);
    assert.equal(f.text.metric.textContent, expected.metric);
    assert.equal(f.text.detail.textContent, expected.detail);
    assert.deepEqual(f.keywords.map(node => node.textContent), expected.checks.map(check => check.label));
    assert.equal(f.buttons.filter(item => item.attributes['aria-pressed'] === 'true').length, 1);
  }
  f.cleanup();
});

test('continuous motion pauses offscreen, in hidden tabs and at the visitor request', () => {
  const f = fixture();
  assert.equal(f.root.dataset.motion, 'paused');
  f.visible(true);
  assert.equal(f.root.dataset.motion, 'running');
  f.toggle.emit('click');
  assert.equal(f.root.dataset.motion, 'paused');
  assert.equal(f.toggle.attributes['aria-label'], 'Reanudar animación');
  f.buttons[2].emit('click');
  assert.equal(f.root.dataset.motion, 'paused');
  assert.equal(f.groups[0].animations.length, 0);
  f.toggle.emit('click');
  assert.equal(f.root.dataset.motion, 'running');
  f.document.hidden = true;
  f.document.emit('visibilitychange');
  assert.equal(f.root.dataset.motion, 'paused');
  f.document.hidden = false;
  f.document.emit('visibilitychange');
  assert.equal(f.root.dataset.motion, 'running');
  f.visible(false);
  assert.equal(f.root.dataset.motion, 'paused');
  f.cleanup();
});

test('reduced motion changes content without animating and reacts to preference changes', () => {
  const f = fixture(true);
  f.visible(true);
  f.buttons[1].emit('click');
  assert.equal(f.root.dataset.tone, 'lime');
  assert.equal(f.root.dataset.motion, 'paused');
  assert.equal(f.groups[0].animations.length, 0);
  f.motion.matches = false;
  f.motion.emit('change');
  assert.equal(f.root.dataset.motion, 'running');
  f.buttons[3].emit('click');
  assert.equal(f.groups[0].animations.length, 1);
  f.motion.matches = true;
  f.motion.emit('change');
  assert.equal(f.root.dataset.motion, 'paused');
  assert.equal(f.groups[0].animations[0].canceled, true);
  f.cleanup();
});

test('rapid clicks and cleanup do not leave stacked transitions or listeners', () => {
  const f = fixture();
  f.visible(true);
  for (let index = 0; index < 8; index++) f.buttons[index % 4].emit('click');
  for (const group of f.groups) {
    assert.equal(group.animations.filter(animation => !animation.canceled).length, 1);
  }
  f.cleanup();
  assert.equal(f.root.dataset.motion, 'paused');
  assert.equal(f.observers[0].disconnected, true);
  assert.ok(f.groups.every(group => group.animations.every(animation => animation.canceled)));
  f.buttons[0].emit('click');
  assert.equal(f.root.dataset.tone, 'red');
  assert.equal(f.motion.listeners.get('change').size, 0);
});

test('each area has a distinct decorative scene without numerical datasets or dashboard controls', () => {
  const component = readFileSync(new URL('../src/components/DiagnosticExperience.astro', import.meta.url), 'utf8');
  const artwork = readFileSync(new URL('../src/components/DiagnosticArtwork.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(component + artwork, /<canvas|<table|data-kpi|data-period|Datos de ejemplo|chart\.js|diagnosticDemoDays/);
  assert.match(component, /data-diagnostic-illustration aria-hidden="true"/);
  assert.deepEqual([...artwork.matchAll(/data-diagnostic-scene="([^"]+)"/g)].map(match => match[1]), Object.keys(diagnosticSignals));
  for (const animation of ['ads-profitable-growth', 'conversion-growth', 'conversion-order', 'catalog-expand', 'catalog-rotate', 'stock-replenish', 'stock-arrival']) {
    assert.match(artwork, new RegExp(`@keyframes ${animation}`));
  }
  assert.match(artwork, /animation-play-state: var\(--diagnostic-motion-state, paused\)/);
  assert.match(component, /data-motion="running".*--diagnostic-motion-state: running/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(artwork, /\[data-loop\] \{ animation: none; \}/);
  assert.match(component, /data-motion-toggle/);
  const cases = readFileSync(new URL('../src/components/FeaturedCases.astro', import.meta.url), 'utf8');
  assert.match(cases, /chart\.js\/auto/);
  assert.match(cases, /caseChartSeries/);
});

test('stock animation stays in a healthy range while the advertising investment line is fixed', () => {
  const artwork = readFileSync(new URL('../src/components/DiagnosticArtwork.astro', import.meta.url), 'utf8');
  const stock = artwork.slice(artwork.indexOf('@keyframes stock-replenish'), artwork.indexOf('@keyframes stock-arrival'));
  const levels = [...stock.matchAll(/scaleY\(([\d.]+)\)/g)].map(match => Number(match[1]));
  assert.ok(levels.length >= 4);
  assert.ok(levels.every(level => level >= .55 && level <= .85));
  const investment = artwork.match(/\.ads-investment \{([^}]+)\}/)[1];
  assert.doesNotMatch(investment, /animation|transform/);
  assert.match(investment, /bottom: 21%/);
  assert.equal(diagnosticSignals.listing.metric, 'CVR');
});

test('visual frame stays square independently of copy height and viewport breakpoints', () => {
  const source = readFileSync(new URL('../src/components/DiagnosticExperience.astro', import.meta.url), 'utf8');
  const css = parseCss(source.slice(source.indexOf('<style>') + 7, source.indexOf('</style>')));
  const rules = [];
  css.walkRules('.diagnostic-art', rule => rules.push(rule));
  assert.equal(rules.length, 1, 'Breakpoints must not override the square frame');
  const properties = Object.fromEntries(rules[0].nodes.filter(node => node.type === 'decl').map(node => [node.prop, node.value]));
  assert.equal(properties['aspect-ratio'], '1 / 1');
  assert.equal(properties.width, '100%');
  assert.equal(properties['min-height'], '0');
  assert.equal(properties['align-self'], 'start');
  assert.equal(properties.container, 'diagnostic-visual / inline-size');
  assert.equal(properties.height, undefined);
  const illustration = css.nodes.find(node => node.type === 'rule' && node.selector === '.diagnostic-illustration');
  const interior = Object.fromEntries(illustration.nodes.map(node => [node.prop, node.value]));
  assert.equal(interior.position, 'absolute');
  assert.equal(interior.inset, '0');
  assert.match(interior['grid-template-rows'], /minmax\(0, 1fr\)/);
  css.walkRules('.diagnostic-illustration', rule => rule.walkDecls('min-height', declaration => assert.equal(declaration.value, '0')));
  const containers = [];
  css.walkAtRules('container', rule => containers.push(rule.params));
  assert.ok(containers.includes('diagnostic-visual (max-width: 400px)'));
  assert.ok(containers.includes('diagnostic-visual (max-width: 350px)'));
});

test('animated scenes can shrink within the square without intrinsic height floors', () => {
  const source = readFileSync(new URL('../src/components/DiagnosticArtwork.astro', import.meta.url), 'utf8');
  const css = parseCss(source.slice(source.indexOf('<style>') + 7, source.indexOf('</style>')));
  for (const selector of ['.diagnostic-artwork', '.stock-reserve']) {
    css.walkRules(selector, rule => rule.walkDecls('min-height', declaration => assert.equal(declaration.value, '0')));
  }
  css.walkDecls('font-size', declaration => assert.doesNotMatch(declaration.value, /vw|cqw/));
  const containers = [];
  css.walkAtRules('container', rule => containers.push(rule.params));
  assert.ok(containers.includes('diagnostic-visual (max-width: 320px)'));
});
