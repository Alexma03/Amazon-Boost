import type { APIRoute } from 'astro';

// Public noindex pages remain crawlable so robots can read their directives.
export const GET: APIRoute = ({ site }) => new Response([
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin',
  'Disallow: /api/',
  '',
  `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
  '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
