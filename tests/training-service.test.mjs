import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { trainingService, trainingGuide, trainingBlog, trainingGuidePreview, trainingBlogPreview } from '../src/data/training.ts';
import { guides, guideBySlug } from '../src/data/guides.ts';
import { allBlogPosts } from '../src/data/blog/index.ts';
import { serviceDirectory } from '../src/data/service-pages.ts';
import { indexablePaths } from '../src/data/site-index.ts';

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const body = (entry) => entry.sections.flatMap((section) => section.paragraphs);

test('only the three approved training pages are public, with correct metadata and sitemap discovery', () => {
  const sitemap = source('dist/sitemap-0.xml');
  const publicPaths = [trainingService.path, trainingGuide.path, `/blog/${trainingBlog.slug}/`];
  assert.equal(trainingService.publicationState, 'published');
  assert.equal(trainingBlog.date, '2026-10-29');
  assert.ok(!('publicationState' in trainingBlog));
  assert.ok(!('preparedAt' in trainingBlog));
  for (const path of publicPaths) {
    assert.ok(indexablePaths.includes(path));
    assert.ok(sitemap.includes(path));
    const html = source('dist' + path + 'index.html');
    assert.ok(html.includes('href="https://amznboost.es' + path + '"'));
    assert.doesNotMatch(html, /noindex|Borrador local|Pendiente de aprobación|href="\/borradores\//);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /https:\/\/wa.me\/34650606400/);
  }
  for (const path of [trainingService.previewPath, trainingGuidePreview, trainingBlogPreview]) {
    assert.ok(!indexablePaths.includes(path));
    assert.ok(!existsSync(new URL('../dist' + path + 'index.html', import.meta.url)));
  }
  assert.ok(serviceDirectory.some((service) => service.path === trainingService.path));
  assert.ok(guides.some((guide) => guide.slug === trainingGuide.slug));
  assert.ok(allBlogPosts.some((post) => post.slug === trainingBlog.slug));
  assert.ok(source('dist/servicios/index.html').includes('href="' + trainingService.path + '"'));
  assert.doesNotMatch(source('dist/servicios/index.html'), /href="\/borradores\//);
  assert.equal(indexablePaths.length, 116);
});

test('service reflects personalized training, limited support and no public prices or client identities', () => {
  const publicCopy = JSON.stringify([trainingService, trainingGuide, trainingBlog]) + source('src/components/TrainingServicePage.astro');
  assert.doesNotMatch(publicCopy, /\b(?:440|540|1620|2640)\b|Diamond.Service|SENDI/i);
  assert.doesNotMatch(publicCopy, /(?:3 o 6|tres o seis) meses|(?:1 o 2|una o dos) horas|24[–-]48 horas|sesiones semanales|cada semana/);
  assert.match(publicCopy, /frecuencia/);
  assert.match(publicCopy, /disponibilidad/);
  assert.match(publicCopy, /plazo del acompañamiento/);
  assert.match(publicCopy, /No.*respuesta inmediata/);
  assert.match(publicCopy, /No pedimos contraseñas/);
  assert.match(publicCopy, /aprobación/);
  assert.match(publicCopy, /por separado/);
  assert.match(publicCopy, /independiente de Amazon Boost/);
  const whatsapp = new URL(trainingService.whatsapp);
  assert.equal(whatsapp.hostname, 'wa.me');
  assert.match(whatsapp.searchParams.get('text'), /formación y acompañamiento/);
  assert.ok(trainingService.faqs.length >= 8);
});

test('new guide and blog answer distinct questions without duplicating the existing library', () => {
  assert.ok(body(trainingGuide).join(' ').split(/\s+/).length >= 500);
  assert.ok(body(trainingBlog).join(' ').split(/\s+/).length >= 500);
  assert.ok(trainingGuide.checklist.length >= 5 && trainingGuide.table.rows.length >= 4);
  assert.equal(trainingBlog.sections.length, 6);
  assert.ok(trainingGuide.related.every((slug) => guideBySlug.has(slug)));
  assert.ok(trainingBlog.guides.every((slug) => guideBySlug.has(slug)));
  assert.ok(trainingBlog.relatedPosts.every((slug) => allBlogPosts.some((post) => post.slug === slug)));
  const existing = new Set([...guides, ...allBlogPosts].filter((entry) => entry.slug !== trainingGuide.slug && entry.slug !== trainingBlog.slug).flatMap(body).map((paragraph) => paragraph.trim().toLowerCase()));
  const fresh = [...body(trainingGuide), ...body(trainingBlog)].map((paragraph) => paragraph.trim().toLowerCase());
  assert.equal(new Set(fresh).size, fresh.length);
  assert.ok(fresh.every((paragraph) => !existing.has(paragraph)));
  assert.ok(trainingGuide.metaTitle.length <= 75 && trainingBlog.seo.metaTitle.length <= 75);
  assert.ok(existsSync(new URL('../public' + trainingBlog.image, import.meta.url)));
  assert.match(trainingBlog.imageCaption, /No representa/);
  for (const entry of [trainingGuide, trainingBlog]) {
    assert.equal(entry.service, trainingService.path);
    assert.equal(new Set(entry.sections.map((section) => section.id)).size, entry.sections.length);
    assert.ok(entry.sections.every((section) => section.source === undefined || entry.sources[section.source]));
    for (const reference of entry.sources) {
      assert.match(new URL(reference.url).hostname, /^sell\.amazon\.(es|com)$/);
      assert.match(reference.note, /28 de octubre de 2026/);
    }
  }
});

test('training explains the offer in order, including real work during sessions', () => {
  const page = source('src/components/TrainingServicePage.astro');
  const order = ['No todas las marcas', 'La gestión, dentro', 'id="como-funciona"', 'id="programa"', 'id="a-medida"', 'id="temario"', 'id="preguntas"'];
  for (let i = 1; i < order.length; i++) assert.ok(page.indexOf(order[i]) > page.indexOf(order[i - 1]));
  assert.match(page, /problema concreto/);
  assert.match(trainingService.faqs.find((faq) => faq.question.includes('problemas')).answer, /aplicamos los cambios juntos/);
  assert.match(page, /vuestra aprobación/);
  assert.doesNotMatch(page, /training-plans|training-facts|training-method-figure/);
});

test('guide speaks from the agency to the client and keeps distinct blog decision intent', () => {
  assert.match(trainingGuide.title, /Cómo formamos a tu equipo/);
  assert.match(trainingGuide.answer, /no tienes que preparar tú un curso/);
  for (const section of trainingGuide.sections) assert.match(section.paragraphs.join(' '), /nosotros|nuestro|revisaríamos|prepararíamos|empezaríamos|trabajamos|explicamos|acordamos|os mostraríamos/i);
  assert.match(trainingBlog.sections.map((section) => section.title).join(' '), /Formar:.*Delegar:.*Combinar:/);
  assert.equal(trainingBlog.date, '2026-10-29');
  assert.equal(trainingBlog.updatedAt, '2026-10-29');
  assert.equal(trainingGuide.path, '/guias/plan-formacion-equipo-amazon/');
});

test('readable responsive diagrams enhance the approved training pages', () => {
  const graphic = source('src/components/TrainingDiagram.astro');
  assert.match(graphic, /<figcaption>/);
  assert.match(graphic, /<ol/);
  assert.match(graphic, /<h3>/);
  assert.match(graphic, /from '\.\/Icon.astro'/);
  assert.doesNotMatch(graphic, /<canvas|<script|<svg|font-size:\s*[^;]*(?:vw|clamp)|letter-spacing:\s*-/);
  const guideRoute = source('src/pages/guias/[slug].astro');
  const blogRoute = source('src/pages/blog/[slug].astro');
  assert.match(guideRoute, /variant="guide"/);
  assert.match(blogRoute, /variant="decision"/);
  assert.match(guideRoute, /slot="early-contact"/);
  assert.match(blogRoute, /frontmatter=\{post\} compactIndex/);
  assert.match(source('scripts/render-blog-editorial-covers.mjs'), /slug: 'formar-equipo-o-delegar-amazon'.*type: 'compare'/);
});

test('accompaniment includes the client preferred channel, distinct from the WhatsApp enquiry link', () => {
  const page = source('src/components/TrainingServicePage.astro');
  assert.match(page, /id="whatsapp-acompanamiento"/);
  assert.match(page, /href="#whatsapp-acompanamiento"/);
  assert.match(page, /Incluimos un canal directo entre vuestro equipo y Amazon Boost/);
  assert.match(page, /WhatsApp, email u otro canal que prefiráis y acordemos juntos/);
  assert.doesNotMatch(page, /Seguimos a vuestro lado por WhatsApp|Os orientamos por WhatsApp/);
  assert.match(page, /durante el acompañamiento/);
  assert.match(page, /horarios y tiempos de respuesta se acuerdan/);
  assert.match(trainingService.faqs.find((faq) => faq.question.includes('elegir el canal')).answer, /WhatsApp, email u otro canal/);
  assert.match(source('src/components/TrainingContact.astro'), /href=\{trainingService.whatsapp\}/);
});
