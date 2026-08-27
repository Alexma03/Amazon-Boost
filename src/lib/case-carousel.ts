export function mountCaseCarousel(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>("[data-case-viewport]");
  const slides = [...root.querySelectorAll<HTMLElement>("[data-case-slide]")];
  const selectors = [...root.querySelectorAll<HTMLButtonElement>("[data-case-select]")];
  const controls = [...root.querySelectorAll<HTMLButtonElement>("[data-case-step]")];
  const status = root.querySelector<HTMLElement>("[data-case-status]");
  if (!viewport || !slides.length || root.dataset.carouselReady) return;

  root.dataset.carouselReady = "true";
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0;
  let destination: number | null = null;
  let drag: { id: number; x: number; left: number; index: number; moved: boolean } | null = null;
  const bounded = (index: number) => Math.max(0, Math.min(slides.length - 1, index));

  const update = (index: number) => {
    active = bounded(index);
    slides.forEach((slide, i) => {
      slide.inert = i !== active;
      slide.setAttribute("aria-hidden", String(i !== active));
    });
    selectors.forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.caseSelect) === active)));
    controls.forEach((button) => {
      button.disabled = Number(button.dataset.caseStep) < 0 ? active === 0 : active === slides.length - 1;
    });
    if (status) status.textContent = `${active + 1} / ${slides.length}`;
  };
  const go = (index: number, animate = true) => {
    const next = bounded(index);
    destination = next;
    viewport.scrollTo({ left: next * viewport.clientWidth, behavior: animate && !motion.matches ? "smooth" : "instant" });
    update(next);
  };
  const onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("[data-case-select], [data-case-step]");
    if (!button || !root.contains(button) || button.disabled) return;
    go(button.dataset.caseSelect !== undefined ? Number(button.dataset.caseSelect) : active + Number(button.dataset.caseStep));
  };
  const onScroll = () => {
    if (!viewport.clientWidth || drag) return;
    if (destination !== null && Math.abs(viewport.scrollLeft - destination * viewport.clientWidth) > 1) return;
    destination = null;
    update(Math.round(viewport.scrollLeft / viewport.clientWidth));
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.target !== viewport) return;
    const keyTargets: Record<string, number> = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 };
    const next = keyTargets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    go(next);
  };
  const onPointerDown = (event: PointerEvent) => {
    destination = null;
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("a,button,canvas")) return;
    drag = { id: event.pointerId, x: event.clientX, left: viewport.scrollLeft, index: active, moved: false };
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;
    if (!event.buttons) { onPointerEnd(event); return; }
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 8) return;
    drag.moved = true;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
    viewport.scrollLeft = drag.left - distance;
    event.preventDefault();
  };
  const onPointerEnd = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;
    const previous = drag;
    drag = null;
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (previous.moved) {
      const distance = event.clientX - previous.x;
      go(event.type === "pointercancel" ? previous.index : previous.index + (Math.abs(distance) > 40 ? Math.sign(-distance) : 0));
    }
  };
  const onDragStart = (event: Event) => event.preventDefault();
  const onWheel = () => { destination = null; };
  const resize = new ResizeObserver(() => go(active, false));
  root.addEventListener("click", onClick);
  viewport.addEventListener("scroll", onScroll, { passive: true });
  viewport.addEventListener("keydown", onKey);
  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerEnd);
  viewport.addEventListener("pointercancel", onPointerEnd);
  viewport.addEventListener("dragstart", onDragStart);
  viewport.addEventListener("wheel", onWheel, { passive: true });
  resize.observe(viewport);
  update(0);

  return () => {
    resize.disconnect();
    root.removeEventListener("click", onClick);
    viewport.removeEventListener("scroll", onScroll);
    viewport.removeEventListener("keydown", onKey);
    viewport.removeEventListener("pointerdown", onPointerDown);
    viewport.removeEventListener("pointermove", onPointerMove);
    viewport.removeEventListener("pointerup", onPointerEnd);
    viewport.removeEventListener("pointercancel", onPointerEnd);
    viewport.removeEventListener("dragstart", onDragStart);
    viewport.removeEventListener("wheel", onWheel);
    slides.forEach((slide) => { slide.inert = false; slide.removeAttribute("aria-hidden"); });
    delete root.dataset.carouselReady;
  };
}
