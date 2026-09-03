import { getAuditContact } from '../data/audit-contact.ts';
import type { BoostEntry } from '../data/boost-assistant.ts';

export function getBoostContact(entry?: BoostEntry, previousService?: string) {
  const isService = (path?: string) => path?.startsWith('/servicios/') || path === '/consultoria-amazon/';
  const service = isService(entry?.related?.href) ? entry!.related!.href : isService(entry?.source.href) ? entry!.source.href : previousService;
  const profile = getAuditContact(service).assistant;
  // Only a fixed editorial topic goes to WhatsApp, never the visitor's words or history.
  const message = `Hola, he consultado a Boost y quiero hablar con vuestro equipo sobre ${profile.topic}.`;
  return { ...profile, service, whatsappUrl: `https://wa.me/34650606400?text=${encodeURIComponent(message)}` };
}
