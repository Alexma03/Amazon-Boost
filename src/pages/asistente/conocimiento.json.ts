import type { APIRoute } from 'astro';
import { buildBoostKnowledge } from '../../lib/boost-knowledge.ts';

export const prerender = true;

export const GET: APIRoute = () => {
  const entries = buildBoostKnowledge();
  return new Response(JSON.stringify({ version: 1, entries }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  });
};
