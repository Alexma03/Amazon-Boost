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
    ready: false,
    label: 'Textos legales y datos del titular',
    detail: 'Faltan titular o razón social, NIF/CIF, dirección profesional, privacidad, conservación de formularios y validación del asesor.',
  },
  {
    id: 'proof',
    ready: false,
    label: 'Cifras y testimonios',
    detail: 'Confirmar la vigencia y fuente de +20, +3 años y +50k €/año, y la autorización o fuente pública de cada testimonio.',
  },
  {
    id: 'production-services',
    ready: false,
    label: 'Servicios de producción',
    detail: 'Firebase y la recepción en la aplicación están verificados. La IA queda desactivada para el lanzamiento. Falta confirmar el entorno final de Cloudflare y el acceso administrativo.',
  },
  {
    id: 'visual-signoff',
    ready: false,
    label: 'Aprobación visual final',
    detail: 'Pendiente de la revisión visual y confirmación expresa de Amazon Boost antes de desplegar.',
  },
] as const;
