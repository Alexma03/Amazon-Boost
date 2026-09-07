import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { siteUrl, indexablePaths, isIndexablePath, sitemapLastModified } from './src/data/site-index.ts';
import { serviceAliases } from './src/data/service-pages.ts';

export default defineConfig({
  site: siteUrl,
  redirects: serviceAliases,
  integrations: [tailwind(), react(), sitemap({
    filter: (url) => isIndexablePath(new URL(url).pathname),
    customPages: indexablePaths.map((path) => new URL(path, siteUrl).href),
    serialize: (item) => {
      const lastmod = sitemapLastModified(new URL(item.url).pathname);
      return lastmod ? { ...item, lastmod } : item;
    },
  })],
  output: 'static',
  vite: {
    server: {
      fs: {
        deny: ['**/.env*', '**/.dev.vars*', '**/.git/**', '**/*.{crt,pem}', '**/.wrangler/**', '**/artifacts/private/**'],
      },
    },
  },
  adapter: cloudflare({
    platformProxy: { configPath: 'wrangler.local.jsonc' },
    // Sitemap files are emitted after the adapter collects static routes.
    routes: { extend: { exclude: [{ pattern: '/sitemap-*' }] } },
  })
});
