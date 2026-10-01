import { legalReady } from './legal-status.ts';

export const releasePendingPages = [
  {
    path: '/quienes-somos/',
    label: 'Quiénes somos',
    reason: 'Pendiente de fotografías reales del equipo y revisión final del texto.',
  },
] as const;

export const releaseApprovals = [
  {
    id: 'legal',
    ready: legalReady,
    label: 'Textos legales y datos del titular',
    detail: 'Faltan titular o razón social, NIF/CIF, dirección profesional, plazo de conservación, revisión jurídica y auditoría de cookies en producción.',
  },
  {
    id: 'proof',
    ready: true,
    label: 'Cifras y testimonios',
    detail: 'El titular ha confirmado las tres cifras públicas y el permiso para publicar los testimonios mostrados en la web.',
  },
  {
    id: 'production-services',
    ready: false,
    label: 'Servicios de producción',
    detail: 'Firebase y la recepción en la aplicación están verificados. La IA queda desactivada para el lanzamiento. Falta confirmar el entorno final de Cloudflare y el acceso administrativo.',
  },
  {
    id: 'visual-signoff',
    ready: true,
    label: 'Aprobación visual final',
    detail: 'Amazon Boost ha solicitado expresamente publicar todos los cambios preparados.',
  },
] as const;
