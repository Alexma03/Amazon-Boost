import assert from 'node:assert/strict';
import test from 'node:test';
import { mountCaseCarousel } from '../src/lib/case-carousel.ts';
import { homeShowcase, pharmaCase, caseChartSeries } from '../src/data/home-showcase.ts';

class ElementStub {
  dataset = {};
  attrs = {};
  listeners = new Map();
  disabled = false;
  inert = false;
  textContent = '';
  scrollLeft = 0;
  clientWidth = 1280;
  offsetHeight = 1100;
  style = { height: '' };
  captured = false;
  classes = new Set();
  classList = { add: name => this.classes.add(name), remove: name => this.classes.delete(name) };
  setAttribute(name, value) { this.attrs[name] = value; }
  removeAttribute(name) { delete this.attrs[name]; }
  addEventListener(name, callback) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(callback);
  }
  removeEventListener(name, callback) { this.listeners.get(name)?.delete(callback); }
  emit(type, properties = {}) {
    const event = { type, target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...properties };
    for (const callback of this.listeners.get(type) || []) callback(event);
    return event;
  }
  closest(selector) {
    if (selector.includes('[data-case-') && ('caseSelect' in this.dataset || 'caseStep' in this.dataset)) return this;
    if (selector === 'a,button,canvas' && this.interactive) return this;
    return null;
  }
  scrollTo(options) { this.lastScroll = options; this.scrollLeft = options.left; }
  setPointerCapture() { this.captured = true; }
  hasPointerCapture() { return this.captured; }
  releasePointerCapture() { this.captured = false; }
}

function fixture(reduced = false) {
  const root = new ElementStub();
  const viewport = new ElementStub();
  const slides = [new ElementStub(), new ElementStub()];
  slides[1].offsetHeight = 830;
  const selectors = slides.map((_, i) => Object.assign(new ElementStub(), { dataset: { caseSelect: String(i) } }));
  const controls = [-1, 1, -1, 1].map(step => Object.assign(new ElementStub(), { dataset: { caseStep: String(step) } }));
  const status = new ElementStub();
  const observers = [];
  root.querySelector = selector => ({ '[data-case-viewport]': viewport, '[data-case-status]': status })[selector];
  root.querySelectorAll = selector => ({ '[data-case-slide]': slides, '[data-case-select]': selectors, '[data-case-step]': controls })[selector];
  root.contains = node => [...selectors, ...controls, viewport, ...slides].includes(node);
  globalThis.window = { matchMedia: () => ({ matches: reduced }) };
  globalThis.ResizeObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observed = [];
    observe(element) { this.observed.push(element); }
    disconnect() { this.disconnected = true; }
  };
  const cleanup = mountCaseCarousel(root);
  return { root, viewport, slides, selectors, controls, status, observers, cleanup };
}

test('initial state exposes only the first case; repeated mounting is ignored', () => {
  const f = fixture();
  assert.equal(f.status.textContent, '1 / 2');
  assert.deepEqual(f.slides.map(s => s.inert), [false, true]);
  assert.deepEqual(f.controls.map(b => b.disabled), [true, false, true, false]);
  assert.equal(f.selectors[0].attrs['aria-pressed'], 'true');
  assert.equal(mountCaseCarousel(f.root), undefined);
});

test('selectors and both sets of arrow controls navigate without exceeding bounds', () => {
  const f = fixture();
  f.root.emit('click', { target: f.selectors[1] });
  assert.equal(f.viewport.lastScroll.left, 1280);
  assert.equal(f.status.textContent, '2 / 2');
  assert.deepEqual(f.slides.map(s => s.inert), [true, false]);
  assert.deepEqual(f.controls.map(b => b.disabled), [false, true, false, true]);
  f.root.emit('click', { target: f.controls[3] });
  assert.equal(f.status.textContent, '2 / 2');
  f.root.emit('click', { target: f.controls[2] });
  assert.equal(f.viewport.lastScroll.left, 0);
});

test('smooth navigation keeps its selected state; touch scrolling updates it', () => {
  const f = fixture();
  f.root.emit('click', { target: f.selectors[1] });
  f.viewport.scrollLeft = 200;
  f.viewport.emit('scroll');
  assert.equal(f.status.textContent, '2 / 2');
  f.viewport.scrollLeft = 1280;
  f.viewport.emit('scroll');
  f.viewport.emit('pointerdown', { pointerType: 'touch' });
  f.viewport.scrollLeft = 50;
  f.viewport.emit('scroll');
  assert.equal(f.status.textContent, '1 / 2');
});

test('keyboard navigation supports arrows and endpoints without hijacking child controls', () => {
  const f = fixture();
  assert.equal(f.viewport.emit('keydown', { key: 'End' }).defaultPrevented, true);
  assert.equal(f.status.textContent, '2 / 2');
  f.viewport.emit('keydown', { key: 'Home', target: f.selectors[0] });
  assert.equal(f.status.textContent, '2 / 2');
  f.viewport.emit('keydown', { key: 'ArrowLeft' });
  assert.equal(f.status.textContent, '1 / 2');
  assert.equal(f.viewport.emit('keydown', { key: 'Tab' }).defaultPrevented, false);
});

test('reduced motion and resizing preserve the current case without animation', () => {
  const f = fixture(true);
  f.root.emit('click', { target: f.selectors[1] });
  assert.equal(f.viewport.lastScroll.behavior, 'instant');
  f.viewport.clientWidth = 390;
  f.observers[0].callback();
  assert.equal(f.viewport.lastScroll.left, 390);
  assert.equal(f.status.textContent, '2 / 2');
});

test('mouse drag advances, while charts and canceled drags keep their behavior', () => {
  const f = fixture();
  const pointer = { pointerType: 'mouse', pointerId: 1, button: 0, buttons: 1 };
  f.viewport.emit('pointerdown', { ...pointer, clientX: 500 });
  f.viewport.emit('pointermove', { ...pointer, clientX: 350 });
  assert.equal(f.viewport.classes.has('is-dragging'), true);
  f.viewport.emit('pointerup', { ...pointer, buttons: 0, clientX: 350 });
  assert.equal(f.status.textContent, '2 / 2');
  assert.equal(f.viewport.captured, false);
  assert.equal(f.viewport.classes.has('is-dragging'), false);
  const chart = Object.assign(new ElementStub(), { interactive: true });
  f.viewport.emit('pointerdown', { ...pointer, target: chart, clientX: 300 });
  f.viewport.emit('pointermove', { ...pointer, target: chart, clientX: 600 });
  assert.equal(f.viewport.classes.has('is-dragging'), false);
  f.viewport.emit('pointerdown', { ...pointer, clientX: 300 });
  f.viewport.emit('pointermove', { ...pointer, clientX: 600 });
  f.viewport.emit('pointercancel', { ...pointer, clientX: 600 });
  assert.equal(f.status.textContent, '2 / 2');
});

test('viewport follows the active case height without retaining space from the taller case', () => {
  const f = fixture();
  assert.equal(f.viewport.style.height, '1100px');
  assert.deepEqual(f.observers[0].observed, [f.viewport, ...f.slides]);
  f.root.emit('click', { target: f.selectors[1] });
  assert.equal(f.viewport.style.height, '830px');
  const navigation = f.viewport.lastScroll;
  f.slides[1].offsetHeight = 1250;
  f.observers[0].callback();
  assert.equal(f.viewport.style.height, '1250px');
  assert.equal(f.viewport.lastScroll, navigation);
  f.slides[1].offsetHeight = 830;
  f.observers[0].callback();
  assert.equal(f.viewport.style.height, '830px');
  f.slides[0].offsetHeight = 1450;
  f.observers[0].callback();
  assert.equal(f.viewport.style.height, '830px');
  f.root.emit('click', { target: f.selectors[0] });
  assert.equal(f.viewport.style.height, '1450px');
  f.cleanup();
  assert.equal(f.viewport.style.height, '');
});

test('cleanup removes listeners and restores access to both cases', () => {
  const f = fixture();
  f.cleanup();
  assert.ok(f.observers[0].disconnected);
  assert.equal(f.root.dataset.carouselReady, undefined);
  assert.ok(f.slides.every(s => !s.inert && s.attrs['aria-hidden'] === undefined));
  assert.ok([...f.viewport.listeners.values()].every(listeners => listeners.size === 0));
});

test('new case figures preserve comparison periods and first-case evidence', () => {
  assert.equal(((pharmaCase.currentSales / pharmaCase.previousSales - 1) * 100).toFixed(2), '994.63');
  assert.equal(pharmaCase.currentUnits, 2169);
  assert.equal(pharmaCase.previousUnits, 190);
  assert.match(pharmaCase.comparisonNote, /Mismo intervalo frente al año anterior/);
  assert.equal(caseChartSeries.pharma.values.length, 11);
  assert.equal(caseChartSeries.pharma.values.at(-1), 5044.01);
  assert.equal(Math.min(...caseChartSeries.pharma.values), 788.60);
  assert.equal(Math.max(...caseChartSeries.organic.values), 5904.74);
  assert.equal(homeShowcase.featuredCase.reviews[0].author, 'Alberto');
});
