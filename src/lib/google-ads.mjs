export const ADS_ID = 'AW-18508657011';
export const ADS_EVENTS = Object.freeze({
  audit: `${ADS_ID}/k3_bCNDqxpodEPPizvlE`,
  whatsapp: `${ADS_ID}/Dol2CNPqxpodEPPizvlE`,
  phone: `${ADS_ID}/bK2JCNbqxpodEPPizvlE`,
});
export const CONSENT_KEY = 'ab-consent-v1';
export const ATTRIBUTION_KEY = 'ab-attribution-v1';
export const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000;
const ATTRIBUTION_TTL = 30 * 60 * 1000;
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'gbraid', 'wbraid'];

export function consentSignals(choice) {
  return {
    ad_storage: choice.measurement ? 'granted' : 'denied',
    analytics_storage: 'denied',
    ad_user_data: choice.measurement ? 'granted' : 'denied',
    ad_personalization: choice.measurement && choice.personalization ? 'granted' : 'denied',
  };
}

export function readConsent(storage, now = Date.now()) {
  try {
    const value = JSON.parse(storage.getItem(CONSENT_KEY));
    if (value?.version !== 1 || typeof value.measurement !== 'boolean' || typeof value.personalization !== 'boolean'
      || !Number.isFinite(value.savedAt) || now < value.savedAt || now - value.savedAt >= CONSENT_TTL) return null;
    return value;
  } catch { return null; }
}

export function contactKind(href, base) {
  try {
    const url = new URL(href, base);
    if (url.protocol === 'tel:') return 'phone';
    if (url.protocol === 'whatsapp:' || (url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname))) return 'whatsapp';
  } catch { /* Invalid links are not conversions. */ }
  return null;
}

export function createAdsRuntime(win) {
  let storedConsent = null;
  try { storedConsent = readConsent(win.localStorage); } catch { /* Storage may be unavailable. */ }
  let choice = storedConsent ?? { measurement: false, personalization: false };
  let ready = false;
  let loading = false;
  let configured = false;
  let pending = [];
  const audited = new Set();
  const clicks = new WeakSet();
  const safe = (fn) => { try { return fn(); } catch { return undefined; } };
  const tag = (...args) => safe(() => win.gtag(...args));
  const location = () => `${win.location.origin}${win.location.pathname}`;

  function clearAttribution() {
    safe(() => win.sessionStorage.removeItem(ATTRIBUTION_KEY));
  }

  function attribution() {
    if (!choice.measurement) return undefined;
    return safe(() => {
      const now = Date.now();
      const query = new URL(win.location.href).searchParams;
      const fields = {};
      for (const key of attributionKeys) {
        const value = query.get(key);
        // Campaign metadata is allowlisted; arbitrary query strings never reach Google or Firestore.
        if (value && value.length <= 200 && /^[\p{L}\p{N} _.,:+\-/~]+$/u.test(value) && !value.includes('@')) fields[key] = value;
      }
      if (Object.keys(fields).length) {
        const data = { ...fields, captured_at: new Date(now).toISOString() };
        safe(() => win.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ expires: now + ATTRIBUTION_TTL, data })));
        return data;
      }
      const stored = JSON.parse(win.sessionStorage.getItem(ATTRIBUTION_KEY));
      if (!stored || stored.expires <= now || stored.expires > now + ATTRIBUTION_TTL) { clearAttribution(); return undefined; }
      const data = {};
      for (const key of attributionKeys) {
        const value = stored.data?.[key];
        if (typeof value === 'string' && value.length <= 200 && /^[\p{L}\p{N} _.,:+\-/~]+$/u.test(value) && !value.includes('@')) data[key] = value;
      }
      if (!Object.keys(data).length) return undefined;
      if (typeof stored.data.captured_at === 'string') data.captured_at = stored.data.captured_at;
      return data;
    });
  }

  function configure() {
    configured = true;
    tag('js', new Date());
    tag('config', ADS_ID, {
      page_location: location(),
      page_referrer: '',
      allow_enhanced_conversions: false,
      allow_ad_personalization_signals: choice.personalization,
      cookie_expires: 90 * 24 * 60 * 60,
    });
  }

  function loadTag() {
    if (!choice.measurement || loading || ready) return;
    loading = true;
    const script = win.document.createElement('script');
    script.async = true;
    script.id = 'ab-google-tag';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    script.onload = () => {
      loading = false;
      ready = true;
      if (!choice.measurement) { pending = []; return; }
      configure();
      for (const args of pending) tag(...args);
      pending = [];
    };
    script.onerror = () => { loading = false; pending = []; script.remove(); };
    win.document.head.append(script);
  }

  function update(next, persist = true) {
    choice = { measurement: next.measurement === true, personalization: next.measurement === true && next.personalization === true };
    if (persist) safe(() => win.localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, ...choice, savedAt: Date.now() })));
    tag('consent', 'update', consentSignals(choice));
    tag('set', 'ads_data_redaction', true);
    tag('set', 'url_passthrough', false);
    tag('set', 'allow_enhanced_conversions', false);
    if (choice.measurement) {
      attribution();
      if (ready && !configured) configure();
      else if (ready) tag('set', 'allow_ad_personalization_signals', choice.personalization);
      loadTag();
    } else {
      pending = [];
      clearAttribution();
      safe(() => {
        for (const item of win.document.cookie.split(';')) {
          const name = item.split('=')[0].trim();
          if (!name.startsWith('_gcl_')) continue;
          for (const domain of ['', win.location.hostname, `.${win.location.hostname}`, '.amznboost.es']) {
            win.document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
          }
        }
      });
    }
    return choice;
  }

  function conversion(kind, id) {
    if (!choice.measurement || !ADS_EVENTS[kind]) return false;
    if (kind === 'audit') {
      if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(id) || audited.has(id)) return false;
      audited.add(id);
    }
    const payload = { send_to: ADS_EVENTS[kind], page_location: location(), page_referrer: '', transport_type: 'beacon' };
    if (kind === 'audit') payload.transaction_id = id;
    const args = ['event', 'conversion', payload];
    if (ready) tag(...args);
    else { pending.push(args); loadTag(); }
    return true;
  }

  function onClick(event) {
    if (clicks.has(event) || event.defaultPrevented || event.button > 0) return;
    const link = event.target?.closest?.('a[href]');
    if (!link) return;
    const kind = contactKind(link.getAttribute('href'), win.location.href);
    if (!kind) return;
    clicks.add(event);
    conversion(kind);
  }

  update(choice, false);
  win.document.addEventListener('click', onClick);
  win.addEventListener('storage', (event) => {
    if (event.key === CONSENT_KEY) update(readConsent(win.localStorage) ?? { measurement: false, personalization: false }, false);
  });
  return { update, attribution, conversion, getChoice: () => ({ ...choice }) };
}

let runtime;
export function getAdsRuntime() {
  if (typeof window === 'undefined' || !document.querySelector('[data-ab-consent]')) return undefined;
  return runtime ??= createAdsRuntime(window);
}
export function getLeadAttribution() {
  try { return getAdsRuntime()?.attribution(); } catch { return undefined; }
}
export function trackAuditReceived(documentId) {
  try { return getAdsRuntime()?.conversion('audit', documentId) ?? false; } catch { return false; }
}
