import type { APIRoute } from 'astro';
import { buildBoostKnowledge } from '../../lib/boost-knowledge.ts';
import { handleBoostRequest, type BoostEnvironment } from '../../lib/boost-api.ts';

export const prerender = false;
const knowledge = buildBoostKnowledge();

export const ALL: APIRoute = async context => {
  const env = (context.locals as { runtime?: { env?: BoostEnvironment } }).runtime?.env ?? {};
  let address = '';
  try { address = context.clientAddress; } catch { /* No trusted address means no inference. */ }
  return handleBoostRequest(context.request, env, address, knowledge);
};
