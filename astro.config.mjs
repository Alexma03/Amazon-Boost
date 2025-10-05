import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amznboost.es',
  integrations: [tailwind(), react(), sitemap()],
  output: 'server',
  adapter: cloudflare()
});