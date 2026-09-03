import { answerBoostQuestion, validBoostEntries, type BoostAnswer } from './boost-answers.ts';
import { boostEssentials, type BoostEntry } from '../data/boost-assistant.ts';
import { getBoostContact } from './boost-contact.ts';
import { checkBoostQuestion } from './boost-safety.ts';
import { requestBoostAnswer } from './boost-client.ts';

export function mountBoostAssistant(root: HTMLElement) {
  if (root.dataset.mounted) return () => {};
  root.dataset.mounted = 'true';
  const dialog = root.querySelector<HTMLDialogElement>('dialog')!;
  const launcher = root.querySelector<HTMLButtonElement>('[data-boost-open]')!;
  const close = root.querySelector<HTMLButtonElement>('[data-boost-close]')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-boost-reset]')!;
  const form = root.querySelector<HTMLFormElement>('[data-boost-form]')!;
  const input = root.querySelector<HTMLTextAreaElement>('[data-boost-input]')!;
  const send = root.querySelector<HTMLButtonElement>('[data-boost-send]')!;
  const status = root.querySelector<HTMLElement>('[data-boost-status]')!;
  const welcome = root.querySelector<HTMLElement>('[data-boost-welcome]')!;
  const messages = root.querySelector<HTMLElement>('[data-boost-messages]')!;
  const scroll = root.querySelector<HTMLElement>('[data-boost-scroll]')!;
  const invitation = root.querySelector<HTMLElement>('[data-boost-contact-invitation]')!;
  const auditLabel = root.querySelector<HTMLElement>('[data-boost-audit-label]')!;
  const whatsapp = root.querySelector<HTMLAnchorElement>('[data-boost-whatsapp]')!;
  const consent = root.querySelector<HTMLInputElement>('[data-boost-consent]');
  const generative = root.dataset.boostMode === 'generative';
  const events = new AbortController();
  let request: AbortController | undefined;
  let knowledge: BoostEntry[] | undefined;
  let pending: Promise<BoostEntry[]> | undefined;
  let previousId: string | undefined;
  let epoch = 0;
  let busy = false;
  let contactService: string | undefined;
  let contactDeclined = false;
  let inference: AbortController | undefined;
  let cooldownUntil = 0;
  let cooldownTimer: number | undefined;

  const clearContact = () => {
    invitation.hidden = true;
    invitation.textContent = '';
    auditLabel.textContent = 'Solicitar auditoría';
    whatsapp.href = getBoostContact().whatsappUrl;
  };
  const updateContact = (answer: BoostAnswer, question: string) => {
    if (answer.kind === 'decline') contactDeclined = true;
    if (answer.kind === 'privacy' || answer.kind === 'decline') { clearContact(); return; }
    if (!answer.entry || answer.entry.id === 'asistente') return;
    if (answer.entry.id === 'contacto' || (answer.entry.id === 'auditoria' && /solicitar|pedir|me interesa|quiero/i.test(question))) contactDeclined = false;
    if (contactDeclined) return;
    const contact = getBoostContact(answer.entry, contactService);
    contactService = contact.service;
    invitation.textContent = contact.invitation;
    invitation.hidden = false;
    auditLabel.textContent = contact.action;
    whatsapp.href = contact.whatsappUrl;
  };

  const updateSend = () => { send.disabled = busy || !input.value.trim() || (generative && !consent?.checked) || Date.now() < cooldownUntil; };
  const setBusy = (value: boolean) => {
    busy = value;
    input.readOnly = value;
    form.setAttribute('aria-busy', String(value));
    root.querySelectorAll<HTMLButtonElement>('[data-boost-question], [data-boost-choice]').forEach(button => { button.disabled = value; });
    updateSend();
  };
  const setViewport = () => {
    if (!dialog.open || !window.visualViewport) return;
    const viewport = window.visualViewport;
    dialog.dataset.compact = String(viewport.height < 480);
    dialog.style.setProperty('--boost-vh', `${viewport.height}px`);
    dialog.style.setProperty('--boost-keyboard', `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`);
  };
  const finishClose = () => {
    launcher.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('boost-dialog-open');
    launcher.focus({ preventScroll: true });
  };
  const load = () => {
    if (knowledge) return Promise.resolve(knowledge);
    if (pending) return pending;
    request = new AbortController();
    const timeout = window.setTimeout(() => request?.abort(), 8000);
    pending = fetch('/asistente/conocimiento.json', { signal: request.signal, credentials: 'same-origin' })
      .then(response => { if (!response.ok) throw new Error('Knowledge unavailable'); return response.json(); })
      .then(payload => { knowledge = validBoostEntries(payload); return knowledge; })
      .finally(() => { window.clearTimeout(timeout); pending = undefined; });
    return pending;
  };
  const addLink = (parent: HTMLElement, link: { label: string; href: string }) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    const icon = document.createElement('img');
    icon.src = '/icons/lucide/arrow-right.svg'; icon.alt = ''; icon.width = 16; icon.height = 16;
    anchor.append(icon);
    anchor.addEventListener('click', () => dialog.close(), { signal: events.signal });
    parent.append(anchor);
  };
  const addMessage = (text: string, role: 'user' | 'assistant', answer?: BoostAnswer) => {
    const message = document.createElement('div');
    message.className = `boost-message boost-message-${role}`;
    const byline = document.createElement('span');
    byline.className = 'boost-byline'; byline.textContent = role === 'user' ? 'Tú' : 'Boost';
    const paragraph = document.createElement('p'); paragraph.textContent = text;
    message.append(byline, paragraph);
    if (answer?.entry) {
      const links = document.createElement('div'); links.className = 'boost-answer-links';
      addLink(links, answer.entry.source);
      if (answer.entry.related) addLink(links, answer.entry.related);
      message.append(links);
    }
    if (answer?.alternatives.length) {
      const choices = document.createElement('div'); choices.className = 'boost-answer-choices';
      for (const entry of answer.alternatives) {
        const button = document.createElement('button'); button.type = 'button'; button.dataset.boostChoice = entry.id; button.textContent = entry.question;
        button.addEventListener('click', () => void ask(entry.question, entry), { signal: events.signal });
        choices.append(button);
      }
      message.append(choices);
    }
    messages.append(message);
    scroll.scrollTop = scroll.scrollHeight;
  };
  const ask = async (value: string, selected?: BoostEntry) => {
    const question = value.trim().slice(0, 600);
    if (!question || busy) return;
    if (generative && !consent?.checked) { status.textContent = 'Acepta el envío a OpenRouter para usar el asistente o explora las guías sin IA.'; return; }
    if (Date.now() < cooldownUntil) { status.textContent = 'Espera un momento antes de enviar otra consulta. Puedes seguir leyendo las guías.'; return; }
    const turn = epoch;
    setBusy(true);
    welcome.hidden = true;
    input.value = '';
    addMessage(question, 'user');
    status.textContent = generative ? 'Preparando la respuesta…' : 'Consultando el contenido de la web…';
    try {
      const blocked = generative ? checkBoostQuestion(question) : undefined;
      if (blocked) {
        addMessage(blocked.text, 'assistant', blocked);
        updateContact(blocked, question);
        status.textContent = 'Esta consulta no se ha enviado a OpenRouter.';
        return;
      }
      let entries: BoostEntry[];
      let limited = false;
      try { entries = await load(); } catch { entries = boostEssentials; limited = true; }
      if (events.signal.aborted || turn !== epoch) return;
      let answer: BoostAnswer = selected ? { kind: 'answer', text: selected.answer, entry: selected, alternatives: [] } : answerBoostQuestion(question, entries, previousId, !invitation.hidden && !contactDeclined);
      let notice = limited ? 'No se han podido cargar las guías. Puedes reintentarlo con otra pregunta o hablar con el equipo.' : '';
      if (generative) {
        const controller = new AbortController();
        inference = controller;
        const timeout = window.setTimeout(() => controller.abort(), 30_000);
        try {
          const result = await requestBoostAnswer(question, previousId, !invitation.hidden && !contactDeclined, controller.signal);
          if (events.signal.aborted || turn !== epoch) return;
          answer = result.answer;
          notice = result.mode === 'generated' ? 'Respuesta generada con IA. Contrasta los detalles en la guía.' : 'Respuesta del contenido de nuestra web.';
          if (result.reason === 'rate-limit' && result.retryAfter) {
            cooldownUntil = Date.now() + result.retryAfter * 1000;
            cooldownTimer = window.setTimeout(updateSend, result.retryAfter * 1000);
            notice = 'Límite temporal de IA alcanzado. Te mostramos la respuesta de nuestra guía.';
          } else if (['unavailable', 'provider', 'timeout', 'validation'].includes(result.reason ?? '')) {
            notice = 'La IA no está disponible para esta consulta. Te mostramos la respuesta de nuestra guía.';
          }
        } catch {
          if (events.signal.aborted || turn !== epoch) return;
          notice = 'No hemos podido consultar la IA. Esta respuesta procede de nuestras guías.';
        } finally { window.clearTimeout(timeout); if (inference === controller) inference = undefined; }
      }
      if (events.signal.aborted || turn !== epoch) return;
      previousId = answer.entry?.id ?? previousId;
      addMessage(answer.text, 'assistant', answer);
      updateContact(answer, question);
      status.textContent = notice;
    } catch {
      if (turn === epoch && !events.signal.aborted) status.textContent = 'No he podido consultar esa respuesta. Vuelve a intentarlo o habla con el equipo.';
    } finally {
      if (turn === epoch && !events.signal.aborted) {
        setBusy(false);
        scroll.scrollTop = scroll.scrollHeight;
      }
    }
  };

  launcher.hidden = false;
  launcher.addEventListener('click', () => {
    dialog.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('boost-dialog-open');
    setViewport();
    // Keep the mobile keyboard closed until the visitor chooses to type.
    if (window.matchMedia('(min-width: 641px)').matches) input.focus({ preventScroll: true });
  }, { signal: events.signal });
  close.addEventListener('click', () => dialog.close(), { signal: events.signal });
  dialog.addEventListener('close', finishClose, { signal: events.signal });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }, { signal: events.signal });
  reset.addEventListener('click', () => {
    epoch++;
    inference?.abort();
    previousId = undefined;
    contactService = undefined;
    contactDeclined = false;
    clearContact();
    messages.replaceChildren();
    welcome.hidden = false;
    input.value = '';
    status.textContent = '';
    setBusy(false);
    scroll.scrollTop = 0;
    if (window.matchMedia('(min-width: 641px)').matches) input.focus({ preventScroll: true });
  }, { signal: events.signal });
  form.addEventListener('submit', event => { event.preventDefault(); void ask(input.value); }, { signal: events.signal });
  input.addEventListener('input', updateSend, { signal: events.signal });
  consent?.addEventListener('change', () => {
    if (!consent.checked) { epoch++; inference?.abort(); setBusy(false); status.textContent = 'El envío a OpenRouter está desactivado.'; }
    updateSend();
  }, { signal: events.signal });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); void ask(input.value); }
  }, { signal: events.signal });
  root.querySelectorAll<HTMLButtonElement>('[data-boost-question]').forEach(button => button.addEventListener('click', () => void ask(button.dataset.boostQuestion!), { signal: events.signal }));
  root.querySelectorAll<HTMLElement>('[data-boost-handoff]').forEach(link => link.addEventListener('click', () => dialog.close(), { signal: events.signal }));
  window.visualViewport?.addEventListener('resize', setViewport, { signal: events.signal });
  window.visualViewport?.addEventListener('scroll', setViewport, { signal: events.signal });

  return () => {
    epoch++;
    events.abort(); request?.abort(); inference?.abort();
    if (cooldownTimer) window.clearTimeout(cooldownTimer);
    if (dialog.open) dialog.close();
    document.documentElement.classList.remove('boost-dialog-open');
    launcher.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    delete root.dataset.mounted;
  };
}
