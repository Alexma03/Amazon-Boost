import { validBoostEntries, type BoostAnswer } from './boost-answers.ts';

export type BoostReply = { answer: BoostAnswer; mode: 'generated' | 'prepared'; reason?: string; retryAfter?: number };

export function validateBoostReply(payload: unknown): BoostReply {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid response');
  const data = payload as BoostReply;
  const answer = data.answer;
  if (!['generated', 'prepared'].includes(data.mode) || !answer || !['answer', 'clarify', 'privacy', 'decline'].includes(answer.kind)
    || typeof answer.text !== 'string' || answer.text.length > 3000 || !Array.isArray(answer.alternatives) || answer.alternatives.length > 3) throw new Error('Invalid answer');
  const entries = [...(answer.entry ? [answer.entry] : []), ...answer.alternatives];
  if (entries.length) validBoostEntries({ version: 1, entries });
  return {
    answer, mode: data.mode,
    reason: typeof data.reason === 'string' ? data.reason : undefined,
    retryAfter: data.reason === 'rate-limit' ? Math.min(300, Math.max(1, Number(data.retryAfter) || 60)) : undefined,
  };
}

export function boostApiPath(pathname: string) {
  const shared = pathname.match(/^\/preview\/[a-f0-9]{48}(?=\/|$)/);
  return `${shared?.[0] ?? ''}/api/boost`;
}

export async function requestBoostAnswer(question: string, previousId: string | undefined, contactOffered: boolean, signal: AbortSignal): Promise<BoostReply> {
  const response = await fetch(boostApiPath(window.location.pathname), {
    method: 'POST', credentials: 'same-origin', signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, previousId, contactOffered, consent: true }),
  });
  if (!response.ok && response.status !== 429) throw new Error('Assistant unavailable');
  return validateBoostReply(await response.json());
}
