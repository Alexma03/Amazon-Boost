import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ADS_ID, ADS_EVENTS, CONSENT_KEY, ATTRIBUTION_KEY, CONSENT_TTL, consentSignals, readConsent, contactKind, createAdsRuntime } from '../src/lib/google-ads.mjs';

function storage() {
  const entries = new Map();
  return { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key) };
}
function browser(url = 'https://amznboost.es/?utm_source=google&gclid=TestClick123') {
  const commands = [], scripts = [], listeners = {};
  const win = {
    location: new URL(url), localStorage: storage(), sessionStorage: storage(),
    gtag: (...args) => commands.push(args),
    addEventListener: (name, fn) => { listeners[name] = fn; },
    document: {
      cookie: '',
      head: { append: script => scripts.push(script) },
      createElement: () => ({ remove() { scripts.splice(scripts.indexOf(this), 1); } }),
      addEventListener: (name, fn) => { listeners[name] = fn; },
    },
  };
  return { win, commands, scripts, listeners, events: () => commands.filter(args => args[0] === 'event') };
}
const granted = { measurement: true, personalization: false };
const denied = { measurement: false, personalization: false };

test('real Ads destinations are distinct and use the verified account tag', () => {
  assert.equal(ADS_ID, 'AW-18508657011');
  assert.deepEqual(ADS_EVENTS, {
    audit: 'AW-18508657011/k3_bCNDqxpodEPPizvlE',
    whatsapp: 'AW-18508657011/Dol2CNPqxpodEPPizvlE',
    phone: 'AW-18508657011/bK2JCNbqxpodEPPizvlE',
  });
  assert.equal(new Set(Object.values(ADS_EVENTS)).size, 3);
  assert.ok(Object.values(ADS_EVENTS).every(id => id.startsWith(`${ADS_ID}/`)));
});
test('missing, corrupt, expired and future consent fail closed', () => {
  const store = storage();
  assert.equal(readConsent(store), null);
  store.setItem(CONSENT_KEY, '{'); assert.equal(readConsent(store), null);
  store.setItem(CONSENT_KEY, JSON.stringify({ version: 1, ...granted, savedAt: 1000 }));
  assert.equal(readConsent(store, 1000 + CONSENT_TTL), null);
  assert.equal(readConsent(store, 999), null);
  assert.equal(readConsent(store, 1001).measurement, true);
});
test('four Consent Mode v2 permissions are independent from contact consent', () => {
  assert.deepEqual(consentSignals(denied), { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  assert.deepEqual(consentSignals(granted), { ad_storage: 'granted', analytics_storage: 'denied', ad_user_data: 'granted', ad_personalization: 'denied' });
  assert.equal(consentSignals({ measurement: false, personalization: true }).ad_personalization, 'denied');
});
test('default denial and rejection load no Google library, store no attribution, replay no events', () => {
  const b = browser(); const ads = createAdsRuntime(b.win);
  assert.equal(ads.conversion('audit', 'AbDocument123'), false);
  ads.update(denied);
  assert.equal(ads.attribution(), undefined);
  assert.equal(b.win.sessionStorage.getItem(ATTRIBUTION_KEY), null);
  assert.equal(b.scripts.length, 0);
  ads.update(granted); b.scripts[0].onload();
  assert.equal(b.events().length, 0);
});
test('grant loads one library, one config, sanitizes URLs and deduplicates the Firestore transaction', () => {
  const b = browser('https://amznboost.es/?email=private@example.com&utm_source=google');
  const ads = createAdsRuntime(b.win);
  ads.update(granted); ads.update(granted);
  assert.equal(b.scripts.length, 1);
  ads.conversion('audit', 'AbDocument123'); ads.conversion('audit', 'AbDocument123');
  assert.equal(b.events().length, 0);
  b.scripts[0].onload();
  assert.equal(b.commands.filter(a => a[0] === 'config').length, 1);
  assert.deepEqual(b.events()[0][2], { send_to: ADS_EVENTS.audit, page_location: 'https://amznboost.es/', page_referrer: '', transport_type: 'beacon', transaction_id: 'AbDocument123' });
  assert.equal(b.events().length, 1);
  assert.ok(!JSON.stringify(b.commands).includes('private@example.com'));
  assert.equal(ads.conversion('audit', ''), false);
});
test('WhatsApp and tel destinations are preserved; a repeated click object fires once', () => {
  assert.equal(contactKind('https://wa.me/34650606400?text=Hello', 'https://amznboost.es/'), 'whatsapp');
  assert.equal(contactKind('https://api.whatsapp.com/send?phone=123', 'https://amznboost.es/'), 'whatsapp');
  assert.equal(contactKind('tel:+34650606400', 'https://amznboost.es/'), 'phone');
  assert.equal(contactKind('https://wa.me.evil.test', 'https://amznboost.es/'), null);
  const b = browser(), ads = createAdsRuntime(b.win); ads.update(granted); b.scripts[0].onload();
  const event = { button: 0, target: { closest: () => ({ getAttribute: () => 'https://wa.me/34650606400?text=private' }) } };
  b.listeners.click(event); b.listeners.click(event);
  assert.equal(b.events().length, 1);
  assert.deepEqual(b.events()[0][2], { send_to: ADS_EVENTS.whatsapp, page_location: 'https://amznboost.es/', page_referrer: '', transport_type: 'beacon' });
  b.listeners.click({ button: 0, target: { closest: () => ({ getAttribute: () => 'tel:+34650606400' }) } });
  assert.equal(b.events().length, 2);
  assert.ok(!JSON.stringify(b.events()).includes('34650606400'));
});
test('attribution is allowlisted, consent gated, session-scoped and removed on revocation', () => {
  const b = browser('https://amznboost.es/?utm_source=google&utm_campaign=brand&gclid=Click123&gbraid=Braid123&wbraid=Web123&name=Secret&email=secret@example.com');
  const ads = createAdsRuntime(b.win); assert.equal(ads.attribution(), undefined);
  ads.update(granted);
  const data = ads.attribution();
  assert.equal(data.gclid, 'Click123'); assert.equal(data.gbraid, 'Braid123'); assert.equal(data.wbraid, 'Web123');
  assert.equal(data.name, undefined); assert.equal(data.email, undefined);
  b.win.location = new URL('https://amznboost.es/servicios/');
  assert.equal(ads.attribution().utm_campaign, 'brand');
  ads.update(denied);
  assert.equal(ads.attribution(), undefined);
  assert.equal(b.win.sessionStorage.getItem(ATTRIBUTION_KEY), null);
  assert.equal(ads.conversion('phone'), false);
});
test('revoking during loading drops queued events and permits safe subsequent grant', () => {
  const b = browser(), ads = createAdsRuntime(b.win);
  ads.update(granted); ads.conversion('audit', 'TestDocument'); ads.update(denied); b.scripts[0].onload();
  assert.equal(b.events().length, 0);
  ads.update(granted); ads.conversion('phone');
  assert.equal(b.commands.filter(a => a[0] === 'config').length, 1);
  assert.equal(b.scripts.length, 1);
  assert.equal(b.events().length, 1);
});
test('blocked storage and a failed Google tag do not throw or cause uncontrolled retries', () => {
  const b = browser();
  Object.defineProperty(b.win, 'localStorage', { get() { throw Error('blocked'); } });
  const ads = createAdsRuntime(b.win);
  assert.equal(ads.conversion('phone'), false);
  assert.doesNotThrow(() => ads.update(granted));
  b.scripts[0].onerror();
  assert.equal(b.events().length, 0);
  assert.doesNotThrow(() => ads.update(denied));
});

const home = readFileSync(new URL('../src/components/HomeRedesign.astro', import.meta.url), 'utf8');
// Execute the original form handler with only its Firebase imports substituted.
async function submitForm({ fail = false, valid = true } = {}) {
  let handler, writes = 0, savedData;
  const status = { dataset: {} }, submit = { disabled: false };
  const form = {
    addEventListener: (_, fn) => { handler = fn; },
    querySelector: selector => selector === '[data-form-status]' ? status : submit,
    querySelectorAll: () => [], reportValidity: () => valid, reset() {},
  };
  const document = { querySelectorAll: () => [form] };
  let block = home.slice(home.indexOf('document.querySelectorAll<HTMLFormElement>(".audit-form")'), home.indexOf('    const auditForm ='));
  block = block.replace(/<(?:HTMLFormElement|HTMLElement|HTMLButtonElement)>/g, '').replace(/<HTMLInputElement \| HTMLButtonElement \| HTMLSelectElement \| HTMLTextAreaElement>/g, '');
  block = block.replace('import("../lib/firebase")', 'Promise.resolve({ db: {} })').replace('import("firebase/firestore")', 'Promise.resolve(firebase)');
  const run = new Function('document', 'FormData', 'firebase', block);
  const addDoc = async (_, data) => { writes++; savedData = data; if (fail) throw Error('Firebase failure'); return { id: 'SavedDoc123' }; };
  run(document, class { entries() { return [['name', 'Test'], ['email', 'test@example.com'], ['consent', 'on']]; } }, { collection: () => ({}), addDoc });
  await handler({ preventDefault() {} });
  return { status, submit, writes, savedData };
}
test('audit requests still save and confirm without Ads or campaign attribution', async () => {
  const success = await submitForm();
  assert.equal(success.writes, 1);
  assert.equal(success.savedData.name, 'Test');
  assert.equal(success.savedData.email, 'test@example.com');
  assert.equal(success.savedData.attribution, undefined);
  assert.equal(success.status.dataset.state, 'success');
  assert.equal(success.submit.disabled, false);
  const invalid = await submitForm({ valid: false }); assert.equal(invalid.writes, 0);
  const failure = await submitForm({ fail: true });
  assert.equal(failure.status.dataset.state, 'error');
  assert.equal(failure.submit.disabled, false);
  assert.doesNotMatch(home, /google-ads|getLeadAttribution|trackAuditReceived/);
});
test('shared layout and footer do not activate Ads or render cookie consent controls', () => {
  const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(layout, /CookieNotice|allowMeasurement|dataLayer|gtag|google-ads/);
  assert.doesNotMatch(footer, /data-cookie-settings|showCookiePreferences/);
});
