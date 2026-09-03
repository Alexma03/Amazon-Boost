import { serviceDirectory, serviceAliases } from './service-pages.ts';
import { guides } from './guides.ts';
import { allBlogPosts } from './blog/index.ts';
import { featuredCaseStudies, excludedCasePaths, casePath } from './case-studies/catalogue.ts';
import { releasePendingPages } from './release-status.ts';

export const siteUrl = 'https://amznboost.es';
export const pendingReleasePaths = releasePendingPages.map((page) => page.path);
export const indexablePaths = [...new Set([
  '/', '/servicios/', '/guias/', '/blog/', '/casos-de-exito/',
  ...serviceDirectory.map((page) => page.path),
  ...guides.map((guide) => guide.path),
  ...allBlogPosts.map((post) => `/blog/${post.slug}/`),
  ...featuredCaseStudies.map(casePath),
])];
const indexable = new Set(indexablePaths);

export function normalizePagePath(path: string): string {
  const pathname = new URL(path, siteUrl).pathname;
  return /\.[^/]+$/.test(pathname) ? pathname : pathname.replace(/\/?$/, '/');
}

export const canonicalPageUrl = (path: string) => new URL(normalizePagePath(path), siteUrl).href;
export const isIndexablePath = (path: string) => indexable.has(normalizePagePath(path));
export const isInternalPath = (path: string) => /^\/(admin|api|control|mensajes)(\/|$)/.test(path);
export const isPrivateToolPath = (path: string) => /^\/(admin|control|mensajes)(\/|$)/.test(path);
export const shouldNoindex = (path: string) => isInternalPath(path) || pendingReleasePaths.includes(normalizePagePath(path)) || excludedCasePaths.includes(normalizePagePath(path)) || ['/dejar-resena/', '/404/', '/404.html', '/asistente/conocimiento.json'].includes(normalizePagePath(path));

// Redirect only known page addresses. Keep queries, and never redirect a POST
// or convert an unknown URL into a successful page.
export function pageRedirect(url: URL, method: string): string | undefined {
  if (!['GET', 'HEAD'].includes(method)) return;
  const path = normalizePagePath(url.pathname);
  const alias = serviceAliases[path];
  if (alias) return alias + url.search;
  if (indexable.has(path) && path !== url.pathname) return path + url.search;
}

const modified = new Map(allBlogPosts.map((post) => [`/blog/${post.slug}/`, post.updatedAt]));
export const sitemapLastModified = (path: string) => modified.get(normalizePagePath(path));
