import { diagnosticSignals } from "../data/home-signals.ts";

export function mountDiagnosticExperience(root: HTMLElement): () => void {
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-signal]");
  const scenes = root.querySelectorAll<HTMLElement>("[data-diagnostic-scene]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-motion-toggle]")!;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  let paused = false;
  let visible = false;
  let transitions: Animation[] = [];

  const cancelTransitions = () => {
    transitions.forEach(animation => animation.cancel());
    transitions = [];
  };
  const syncMotion = () => {
    root.dataset.motion = !paused && visible && !document.hidden && !motion.matches ? "running" : "paused";
    toggle.setAttribute("aria-pressed", String(paused));
    const label = paused ? "Reanudar animación" : "Pausar animación";
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
    if (motion.matches || paused || !visible || document.hidden) cancelTransitions();
  };

  buttons.forEach(button => {
    button.disabled = false;
    button.addEventListener("click", () => {
      const next = diagnosticSignals[button.dataset.signal as keyof typeof diagnosticSignals];
      if (!next) return;
      cancelTransitions();
      root.dataset.tone = next.tone;
      scenes.forEach(scene => { scene.hidden = scene.dataset.diagnosticScene !== button.dataset.signal; });
      buttons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      const values = { label: next.label, title: next.title, copy: next.text, metric: next.metric, detail: next.detail };
      Object.entries(values).forEach(([key, value]) => {
        root.querySelector<HTMLElement>(`[data-diagnostic-${key}]`)!.textContent = value;
      });
      root.querySelectorAll<HTMLElement>("[data-diagnostic-keyword]").forEach((node, index) => { node.textContent = next.checks[index].label; });
      if (!motion.matches && !paused) {
        root.querySelectorAll<HTMLElement>("[data-diagnostic-copy-group], [data-diagnostic-illustration]").forEach(node => {
          transitions.push(node.animate([{ opacity: .5, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: "ease-out" }));
        });
      }
    }, { signal: events.signal });
  });
  toggle.disabled = false;
  toggle.addEventListener("click", () => { paused = !paused; syncMotion(); }, { signal: events.signal });
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    syncMotion();
  }, { threshold: 0 });
  observer.observe(root);
  document.addEventListener("visibilitychange", syncMotion, { signal: events.signal });
  motion.addEventListener("change", syncMotion);
  syncMotion();

  return () => {
    cancelTransitions();
    events.abort();
    observer.disconnect();
    motion.removeEventListener("change", syncMotion);
    root.dataset.motion = "paused";
  };
}
