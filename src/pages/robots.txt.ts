import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `
# Allow all crawlers including AI agents
User-agent: *
Allow: /

# Allow all AI crawlers specifically
# Traditional Search Engines
User-agent: Googlebot
Allow: /

User-agent: BingBot
Allow: /

# AI & LLM Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: google-extended
Allow: /

User-agent: Google-CloudVertexBot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Meta-ExternalFetcher
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Novellum AI Crawl
Allow: /

User-agent: ProRataInc
Allow: /

User-agent: Timpibot
Allow: /

# Data Collection & Archive Crawlers
User-agent: CCBot
Allow: /

User-agent: archive.org_bot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: PetalBot
Allow: /

# Additional crawlers
User-agent: omgili
Allow: /

User-agent: Anchor Browser
Allow: /

# Block admin areas from all crawlers including AI
User-agent: *
Disallow: /admin/
Disallow: /mensajes/
Disallow: /*?utm_*
Disallow: /en/

# Allow access to important content for AI training
Allow: /blog/
Allow: /casos-de-exito/
Allow: /servicios/

# Sitemap for search engines and AI
Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
