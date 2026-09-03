import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { mountMacbookScroll } from '../src/lib/macbook-scroll.ts';

class ElementStub extends EventTarget {
  classes = new Set();
  classList = {
    add: value => this.classes.add(value),
    remove: value => this.classes.delete(value),
    toggle: (value, enabled) => enabled ? this.classes.add(value) : this.classes.delete(value),
  };
  style = {};
}

function fixture({ height = 900, reduced = false, hash = '', outside = false, fail = false } = {}) {
  const hero = new ElementStub();
  const stage = new ElementStub();
  const laptop = new ElementStub();
  const lid = new ElementStub();
  const screen = new ElementStub();
  const destination = new ElementStub();
  const document = new ElementStub();
  const window = new ElementStub();
  window.innerHeight = height;
  window.location = { hash };
  hero.querySelector = selector => selector === '[data-hero-macbook]' ? laptop : stage;
  laptop.querySelector = selector => selector === '.ab-macbook-lid' ? lid : screen;
  hero.contains = () => !outside;
  document.getElementById = id => id === 'auditoria' || id === 'inicio' ? destination : null;
  document.querySelector = () => ({ getBoundingClientRect: () => ({ height: 64 }) });
  globalThis.window = window;
  globalThis.document = document;
  const timelines = [];
  let callback;
  let contextCleanup;
  const revertContext = () => {
    contextCleanup?.();
    for (const timeline of timelines) timeline.killed = true;
    laptop.style = {};
    lid.style = {};
    screen.style = {};
  };
  const media = {
    add(queries, fn) {
      this.queries = queries;
      callback = fn;
      contextCleanup = fn({ conditions: { all: true, reduced, room: height >= 560 } });
    },
    change(conditions) {
      revertContext();
      contextCleanup = callback({ conditions });
    },
    revert: revertContext,
  };
  const gsap = {
    registered: false,
    registerPlugin() { this.registered = true; },
    matchMedia: () => media,
    timeline(config) {
      if (fail) throw new Error('Simulated initialization failure');
      const timeline = {
        config,
        killed: false,
        steps: [],
        fromTo(target, from, to) {
          this.steps.push({ target, from, to });
          Object.assign(target.style, from);
          return this;
        },
        to(target, to) { this.steps.push({ target, to }); return this; },
        progress(value) {
          if (value === 1) this.steps.filter(step => step.from).forEach(step => Object.assign(step.target.style, step.to));
          this.config.scrollTrigger.onUpdate({ progress: value });
        },
      };
      timelines.push(timeline);
      return timeline;
    },
  };
  const ScrollTrigger = { refreshCount: 0, refresh() { this.refreshCount++; } };
  const runtime = { gsap, ScrollTrigger };
  const cleanup = mountMacbookScroll(hero, runtime);
  return { hero, stage, laptop, lid, screen, document, window, timelines, media, gsap, ScrollTrigger, cleanup, runtime };
}

test('pins the hero while animating only the laptop, then releases after a fully-open hold', () => {
  const f = fixture();
  const timeline = f.timelines[0];
  const trigger = timeline.config.scrollTrigger;
  assert.equal(f.gsap.registered, true);
  assert.equal(trigger.pin, f.hero);
  assert.equal(trigger.trigger, f.stage);
  assert.equal(trigger.pinSpacing, true);
  assert.equal(trigger.scrub, true, 'No trailing scrub that keeps opening after release');
  assert.equal(timeline.steps[0].target, f.lid);
  assert.equal(f.lid.style.rotationX, -84);
  assert.equal(timeline.steps[0].to.rotationX, 0);
  assert.equal(timeline.steps[1].target, f.screen);
  assert.equal(timeline.steps[1].to.opacity, 1);
  assert.ok(timeline.steps[2].to.duration > 0);
  timeline.progress(.5);
  assert.equal(f.laptop.classes.has('is-open'), false);
  timeline.progress(.95);
  assert.equal(f.laptop.classes.has('is-open'), true);
  timeline.progress(1);
  assert.equal(f.lid.style.rotationX, 0);
  timeline.progress(0);
  assert.equal(f.laptop.classes.has('is-open'), false);
  f.cleanup();
});

test('positions the visible device below the header and recalculates after viewport changes', () => {
  const f = fixture();
  const trigger = f.timelines[0].config.scrollTrigger;
  assert.equal(trigger.start(), 'clamp(center 482px)');
  assert.equal(trigger.end(), '+=585');
  f.window.innerHeight = 600;
  assert.equal(trigger.start(), 'clamp(center 332px)');
  assert.equal(trigger.end(), '+=390');
  f.window.innerHeight = 2000;
  assert.equal(trigger.end(), '+=620');
  assert.equal(trigger.invalidateOnRefresh, true);
  f.cleanup();
});

test('reduced motion and short landscape screens have no pin or extra scroll distance', () => {
  for (const options of [{ reduced: true }, { height: 420 }]) {
    const f = fixture(options);
    assert.equal(f.timelines.length, 0);
    assert.equal(f.hero.classes.has('is-scroll-opening'), false);
    assert.deepEqual(f.laptop.style, {});
    f.cleanup();
  }
});

test('changing motion preference removes the old pin and restores the static open fallback', () => {
  const f = fixture();
  f.media.change({ all: true, reduced: true, room: true });
  assert.equal(f.timelines[0].killed, true);
  assert.equal(f.hero.classes.has('is-scroll-opening'), false);
  assert.deepEqual(f.laptop.style, {});
  f.media.change({ all: true, reduced: false, room: true });
  assert.equal(f.timelines.filter(item => !item.killed).length, 1);
  assert.equal(f.lid.style.rotationX, -84);
  f.cleanup();
});

test('direct links below the hero bypass the opening without rewriting the location', () => {
  const f = fixture({ hash: '#auditoria', outside: true });
  assert.equal(f.timelines.length, 0);
  assert.equal(f.window.location.hash, '#auditoria');
  assert.deepEqual(f.laptop.style, {});
  f.cleanup();
  const home = fixture({ hash: '#inicio' });
  assert.equal(home.timelines.length, 1);
  home.cleanup();
  const malformed = fixture({ hash: '#%not-a-fragment' });
  assert.equal(malformed.timelines.length, 1);
  malformed.cleanup();
});

test('remount and navigation clean up owned animation and refresh listeners', () => {
  const f = fixture();
  const secondCleanup = mountMacbookScroll(f.hero, f.runtime);
  assert.equal(f.timelines.filter(item => !item.killed).length, 1);
  const before = f.ScrollTrigger.refreshCount;
  f.window.dispatchEvent(new Event('pageshow'));
  assert.equal(f.ScrollTrigger.refreshCount, before + 1);
  f.document.dispatchEvent(new Event('astro:before-swap'));
  assert.ok(f.timelines.every(item => item.killed));
  assert.equal(f.hero.classes.has('is-scroll-opening'), false);
  const after = f.ScrollTrigger.refreshCount;
  f.window.dispatchEvent(new Event('pageshow'));
  assert.equal(f.ScrollTrigger.refreshCount, after);
  secondCleanup();
});

test('back-forward cache preserves the animation but a real departure disposes it', () => {
  const f = fixture();
  const cached = new Event('pagehide');
  cached.persisted = true;
  f.window.dispatchEvent(cached);
  assert.equal(f.timelines[0].killed, false);
  f.window.dispatchEvent(new Event('pageshow'));
  f.window.dispatchEvent(new Event('pagehide'));
  assert.equal(f.timelines[0].killed, true);
  f.cleanup();
});

test('initialization failures restore the non-blocking fallback', () => {
  const warn = console.warn;
  console.warn = () => {};
  try {
    const f = fixture({ fail: true });
    assert.equal(f.hero.classes.has('is-scroll-opening'), false);
    assert.deepEqual(f.laptop.style, {});
    f.cleanup();
  } finally { console.warn = warn; }
});

test('keeps frame geometry, removes competing scroll animation and never traps native input', () => {
  const home = readFileSync(new URL('../src/components/HomeRedesign.astro', import.meta.url), 'utf8');
  const controller = readFileSync(new URL('../src/lib/macbook-scroll.ts', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles/macbook-scroll.css', import.meta.url), 'utf8');
  assert.equal((home.match(/src="\/images\/macbook-graphite-frame.png"/g) ?? []).length, 2);
  assert.match(home, /class="ab-account-stage" data-macbook-stage/);
  assert.doesNotMatch(home, /mobileTrigger|--lid-angle|--screen-opacity|--open-progress/);
  assert.doesNotMatch(controller, /preventDefault|overflow|wheel|touchmove|keydown|scrollTo\(/);
  assert.match(css, /--lid-angle: 0deg/);
  assert.match(css, /--screen-opacity: 1/);
  assert.match(css, /transition: none/);
});
