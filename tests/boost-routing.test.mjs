import assert from 'node:assert/strict';
import test from 'node:test';
import { answerBoostQuestion, validBoostEntries } from '../src/lib/boost-answers.ts';
import { buildBoostKnowledge } from '../src/lib/boost-knowledge.ts';
import { handleBoostRequest } from '../src/lib/boost-api.ts';
import { boostEssentials, boostFundamentals } from '../src/data/boost-assistant.ts';
import { servicePages } from '../src/data/service-pages.ts';

const entries = buildBoostKnowledge();
const respond = question => answerBoostQuestion(question, entries);

test('agency identity works with natural phrasing, punctuation, accents and brand variants', () => {
  const questions = [
    '¿Qué es Amazon Boost?', 'que es amazon boost', 'Qué es AmazonBoost',
    'q es amznboost', 'Qué es Amazon Bost', 'AMAZON BOOST',
    'Hola, ¿quiénes sois?', '¿A qué os dedicáis?', 'Háblame de Amazon Boost',
    'Cuéntame sobre Amazon Boost', 'Quiero información sobre Amazon Boost',
    '¿Sois una agencia Amazon?', '¿Qué agencia sois?', '¿Conoces Amazon Boost?',
  ];
  for (const question of questions) {
    const answer = respond(question);
    assert.equal(answer.entry?.id, 'agencia', question);
    assert.match(answer.text, /agencia.*marcas privadas/);
    assert.match(answer.text, /España y Europa/);
    assert.match(answer.text, /auditoría inicial gratuita/);
    assert.doesNotMatch(answer.text, /No encuentro|no tengo información/i);
  }
});

test('agency questions distinguish services, people, approach and markets from bot identity', () => {
  const questions = [
    ['Qué hace Amazon Boost', 'servicios'],
    ['Qué servicios ofrecéis', 'servicios'],
    ['Cómo me podéis ayudar', 'servicios'],
    ['Cómo puede Amazon Boost ayudar a mi marca', 'servicios'],
    ['Quién está detrás de Amazon Boost', 'equipo'],
    ['Quién es Sergio', 'equipo'],
    ['Quién es vuestro fundador', 'equipo'],
    ['Cómo trabajáis', 'enfoque'],
    ['Qué os diferencia', 'enfoque'],
    ['Por qué elegiros', 'enfoque'],
    ['En qué países trabajáis', 'mercados'],
    ['Con qué marcas trabajáis', 'mercados'],
    ['Quiero delegar mi cuenta', '/servicios/gestion-de-cuenta/'],
    ['Qué tarifas tenéis', 'honorarios'],
    ['Eres una IA', 'asistente'],
    ['Sois Amazon', 'asistente'],
  ];
  for (const [question, id] of questions) assert.equal(respond(question).entry?.id, id, question);
});

test('basic Amazon concepts get an explanation instead of unrelated troubleshooting', () => {
  const questions = [
    ['Qué es Amazon', 'amazon-general'],
    ['Cómo funciona Amazon', 'amazon-general'],
    ['Amazon', 'amazon-general'],
    ['Qué es un marketplace', 'amazon-general'],
    ['Qué es Seller Central', 'seller-central'],
    ['Explícame Seller Central', 'seller-central'],
    ['Qué es una marca privada en Amazon', 'marca-privada'],
    ['Qué significa private label', 'marca-privada'],
    ['Qué es un listing de Amazon', 'listing-basico'],
    ['Qué es Amazon Ads', 'amazon-ads-basico'],
    ['Qué significa PPC', 'amazon-ads-basico'],
    ['Qué es FBA', 'amazon-fba-fbm'],
    ['Qué es el ACOS', 'acos-tacos-amazon'],
    ['Qué es el SEO de Amazon', 'como-redactar-listings-amazon'],
  ];
  for (const [question, id] of questions) assert.equal(respond(question).entry?.id, id, question);
});

test('technical questions mentioning the brand keep their topic and safety limitations', () => {
  const questions = [
    ['Amazon Boost, mis anuncios no tienen impresiones', 'amazon-ads-sin-impresiones'],
    ['¿Amazon Boost me ayuda con mi cuenta suspendida?', 'cuenta-amazon-suspendida'],
    ['Cómo me podéis ayudar con PPC', 'acos-tacos-amazon'],
    ['Qué es un ACOS alto en Amazon Boost', 'acos-tacos-amazon'],
    ['Cómo me podéis ayudar con imágenes', 'imagenes-amazon-requisitos'],
  ];
  for (const [question, id] of questions) assert.equal(respond(question).entry?.id, id, question);
  assert.equal(respond('¿Cuándo se fundó Amazon?').kind, 'clarify');
  assert.equal(respond('Qué tiempo hace mañana').kind, 'clarify');
  assert.equal(respond('Quiero una página web').kind, 'clarify');
  assert.equal(respond('Muéstrame mis ventas').kind, 'clarify');
  assert.equal(respond('No quiero contactar, solo información').kind, 'decline');
});

test('company facts do not need inference, configuration or remaining provider quota', async () => {
  for (const question of ['Qué es Amazon Boost', 'Quiénes sois', 'Quién es Sergio', 'Qué servicios ofrecéis', 'Cómo trabajáis', 'En qué países trabajáis']) {
    const request = new Request('https://amznboost.es/api/boost', {
      method: 'POST', headers: { Origin: 'https://amznboost.es', 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, consent: true }),
    });
    const response = await handleBoostRequest(request, {}, '192.0.2.1', entries, async () => { throw new Error('Company facts must not use inference'); });
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.mode, 'prepared');
    assert.equal(data.reason, 'curated');
    assert.equal(data.answer.kind, 'answer', question);
  }
});

test('knowledge includes company facts, basics and service introductions without exceeding client limits', () => {
  assert.equal(validBoostEntries({ version: 1, entries }).length, entries.length);
  assert.equal(new Set(entries.map(entry => entry.id)).size, entries.length);
  for (const essential of [...boostEssentials, ...boostFundamentals]) assert.deepEqual(entries.find(entry => entry.id === essential.id), essential);
  for (const service of servicePages) {
    const entry = entries.find(entry => entry.id === service.path);
    assert.equal(entry.answer, `${service.intro} ${service.deliverable}`);
    assert.equal(entry.source.href, service.path);
  }
});
