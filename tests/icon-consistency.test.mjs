import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const sourceFiles = [
  '../src/components/Header.astro',
  '../src/components/Footer.astro',
  '../src/components/HomeRedesign.astro',
  '../src/components/FeaturedCases.astro',
  '../src/layouts/SeoLandingLayout.astro',
  '../src/layouts/ServiceLayout.astro',
  '../src/pages/control.astro',
  '../src/pages/dejar-resena.astro',
  '../src/pages/servicios/imagenes-para-amazon.astro',
];

const inconsistentGlyphs = /[↗↘→←↓↑›‹✕×✓★⌂◫◇□≡⌕♢⌄＋]/u;

test('public controls use Lucide SVG icons instead of platform-dependent glyphs', () => {
  for (const file of sourceFiles) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.doesNotMatch(source, inconsistentGlyphs, file);
  }

  const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(home, inconsistentGlyphs);
  assert.match(home, /lucide-arrow-up-right/);
  assert.match(home, /lucide-star/);
});
