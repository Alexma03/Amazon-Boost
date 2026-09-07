import { defineMiddleware } from 'astro:middleware';
import { isInternalPath, isPrivateToolPath, pageRedirect, shouldNoindex } from './data/site-index';

export const onRequest = defineMiddleware(async ({ url, request }, next) => {
  const isMessagesPanel = /^\/admin\/mensajes(\/|$)/.test(url.pathname);
  const internalToolsEnabled = import.meta.env.PUBLIC_INTERNAL_TOOLS_ENABLED === 'true';
  const messagesPanelEnabled = import.meta.env.PUBLIC_ADMIN_MESSAGES_ENABLED !== 'false';
  const isOtherPrivateTool = !isMessagesPanel;
  if (import.meta.env.PROD && isPrivateToolPath(url.pathname) && ((isOtherPrivateTool && !internalToolsEnabled) || (isMessagesPanel && !messagesPanelEnabled))) {
    return new Response('Not Found', { status: 404, headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'private, no-store' } });
  }

  // Resolve known aliases before Astro falls through to its static 404. The
  // redirect helper preserves campaign parameters and ignores unsafe methods.
  const target = pageRedirect(new URL(request.url), request.method);
  if (target) return new Response(null, { status: 301, headers: { Location: target } });

  const response = await next();
  if (shouldNoindex(url.pathname) || response.status >= 400) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  if (isInternalPath(url.pathname)) response.headers.set('Cache-Control', 'private, no-store');
  return response;
});
