import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as Trigger } from 'gsap/ScrollTrigger';

type MotionRuntime = { gsap: typeof Gsap; ScrollTrigger: typeof Trigger };
const mounted = new WeakMap<HTMLElement, () => void>();
const openDuration = 1;
const holdDuration = .12;

export function mountMacbookScroll(hero: HTMLElement, { gsap, ScrollTrigger }: MotionRuntime) {
  mounted.get(hero)?.();
  const laptop = hero.querySelector<HTMLElement>('[data-hero-macbook]');
  const stage = hero.querySelector<HTMLElement>('[data-macbook-stage]');
  if (!laptop || !stage) return () => {};
  const lid = laptop.querySelector<HTMLElement>('.ab-macbook-lid');
  const screen = laptop.querySelector<HTMLElement>('.ab-seller-window');
  if (!lid || !screen) return () => {};

  // Arriving directly at a case or the audit must not insert a scroll detour.
  let destination: HTMLElement | null = null;
  try { destination = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); }
  catch { /* An invalid fragment must not prevent the page from working. */ }
  if (destination && !hero.contains(destination)) return () => {};

  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const events = new AbortController();
  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    events.abort();
    media.revert();
    hero.classList.remove('is-scroll-opening');
    laptop.classList.remove('is-open');
    mounted.delete(hero);
  };
  mounted.set(hero, cleanup);

  try {
    media.add({
      all: 'all',
      reduced: '(prefers-reduced-motion: reduce)',
      room: '(min-height: 560px)',
    }, context => {
      if (context.conditions?.reduced || !context.conditions?.room) return;
      hero.classList.add('is-scroll-opening');

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'home-macbook-opening',
          trigger: stage,
          pin: hero,
          pinSpacing: true,
          // Center the device below the fixed header, including stacked mobile layouts.
          start: () => {
            const header = document.querySelector<HTMLElement>('[data-site-header]');
            const inset = header?.getBoundingClientRect().height ?? 64;
            return `clamp(center ${(window.innerHeight + inset) / 2}px)`;
          },
          end: () => `+=${Math.round(Math.min(620, Math.max(360, window.innerHeight * .65)))}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: self => laptop.classList.toggle('is-open', self.progress >= openDuration / (openDuration + holdDuration)),
        },
      });
      // Animate the painted elements directly so scrolling does not recalculate
      // custom properties across the complete Seller Central mockup.
      timeline.fromTo(lid, {
        rotationX: -84,
        force3D: true,
      }, {
        rotationX: 0,
        force3D: true,
        duration: openDuration,
        ease: 'power1.inOut',
      }, 0);
      timeline.fromTo(screen, { opacity: .12 }, {
        opacity: 1,
        duration: openDuration * .72,
        ease: 'none',
      }, 0);
      // A short fully-open hold finishes before the pin releases, without scrub lag.
      timeline.to({}, { duration: holdDuration });
      return () => {
        hero.classList.remove('is-scroll-opening');
        laptop.classList.remove('is-open');
      };
    });

    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true, signal: events.signal });
    window.addEventListener('pageshow', refresh, { signal: events.signal });
    // A bfcache return keeps the timeline; a real departure removes pins and listeners.
    window.addEventListener('pagehide', event => { if (!event.persisted) cleanup(); }, { signal: events.signal });
    document.addEventListener('astro:before-swap', cleanup, { once: true, signal: events.signal });
  } catch (error) {
    cleanup();
    console.warn('MacBook scroll animation unavailable; showing the open device.', error);
  }
  return cleanup;
}
