import { z } from 'zod';
import { answerBoostQuestion } from './boost-answers.ts';
import { checkBoostQuestion } from './boost-safety.ts';
import { generateBoostAnswer } from './boost-inference.ts';
import { admitBoostRequest, hashBoostVisitor, type BoostDatabase } from './boost-rate-limit.ts';
import { boostCompanyEntryIds, type BoostEntry } from '../data/boost-assistant.ts';

export type BoostEnvironment = {
  BOOST_AI_ENABLED?: string;
  OPENROUTER_API_KEY?: string;
  BOOST_RATE_SECRET?: string;
  BOOST_ALLOWED_ORIGINS?: string;
  BOOST_GUARD?: BoostDatabase;
};

const inputSchema = z.object({
  question: z.string().trim().min(2).max(600),
  previousId: z.string().max(160).optional(),
  contactOffered: z.boolean().optional(),
  consent: z.literal(true),
}).strict();

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};
const reply = (body: unknown, status = 200, extra: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });

async function readInput(request: Request) {
  if (Number(request.headers.get('content-length')) > 4096) throw new Error('oversize');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('missing');
  let expired = false;
  const timer = setTimeout(() => { expired = true; void reader.cancel().catch(() => {}); }, 3000);
  let bytes = 0;
  let body = '';
  const decoder = new TextDecoder('utf-8', { fatal: true });
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (expired) throw new Error('timeout');
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) throw new Error('oversize');
      body += decoder.decode(value, { stream: true });
    }
    return inputSchema.parse(JSON.parse(body + decoder.decode()));
  } finally { clearTimeout(timer); void reader.cancel().catch(() => {}); }
}

export async function handleBoostRequest(request: Request, env: BoostEnvironment, address: string, entries: BoostEntry[], fetcher: typeof fetch = fetch): Promise<Response> {
  if (request.method !== 'POST') return reply({ error: 'method' }, 405, { Allow: 'POST' });
  const origins = (env.BOOST_ALLOWED_ORIGINS ?? 'https://amznboost.es,https://www.amznboost.es').split(',').map(origin => origin.trim());
  const origin = request.headers.get('Origin');
  if (!origin || !origins.includes(origin) || request.headers.get('Sec-Fetch-Site') === 'cross-site') return reply({ error: 'origin' }, 403);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type') ?? '')) return reply({ error: 'content-type' }, 415);
  let input;
  try { input = await readInput(request); }
  catch { return reply({ error: 'input', message: 'Escribe una pregunta breve, sin datos privados, y acepta el envío a OpenRouter.' }, 400); }

  const blocked = checkBoostQuestion(input.question);
  if (blocked) return reply({ answer: blocked, mode: 'prepared', reason: 'safety' });
  if (input.previousId && !entries.some(entry => entry.id === input.previousId)) return reply({ error: 'context' }, 400);
  const prepared = answerBoostQuestion(input.question, entries, input.previousId, input.contactOffered);
  const fallback = (reason: string) => reply({ answer: prepared, mode: 'prepared', reason });
  // Identity, guarantees, contact, privacy and unsupported subjects stay deterministic.
  if (prepared.kind !== 'answer' || !prepared.entry || boostCompanyEntryIds.has(prepared.entry.id)) return fallback('curated');
  if (env.BOOST_AI_ENABLED !== 'true' || !env.OPENROUTER_API_KEY || !env.BOOST_GUARD || !env.BOOST_RATE_SECRET || env.BOOST_RATE_SECRET.length < 32 || !address) return fallback('unavailable');

  let release: (() => Promise<void>) | null;
  try { release = await admitBoostRequest(env.BOOST_GUARD, await hashBoostVisitor(address, env.BOOST_RATE_SECRET)); }
  catch { return fallback('unavailable'); }
  if (!release) return reply({ answer: prepared, mode: 'prepared', reason: 'rate-limit', retryAfter: 60 }, 429, { 'Retry-After': '60' });
  try {
    const sources = [prepared.entry];
    const general = entries.find(entry => entry.id === prepared.entry!.id.split(':faq:')[0]);
    if (general && general.id !== prepared.entry.id) sources.push(general);
    const agency = entries.find(entry => entry.id === 'agencia');
    if (agency && !sources.some(source => source.id === agency.id)) sources.push(agency);
    const result = await generateBoostAnswer(env.OPENROUTER_API_KEY, input.question, sources, request.signal, fetcher);
    if (!result.text) return fallback(result.reason);
    return reply({ answer: { ...prepared, text: result.text }, mode: 'generated' });
  } finally {
    // A failed release leaves only a short, expiring lease, never an unlimited bypass.
    try { await release(); } catch { /* Fail closed until the lease expires. */ }
  }
}
