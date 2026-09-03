import type { BlogPost } from './index';

export const algoritmoAmazonData: BlogPost = {
  slug: 'algoritmo-amazon',
  title: 'Algoritmo de Amazon: qué puedes trabajar y qué no debes dar por hecho',
  date: '2025-04-01',
  updatedAt: '2026-08-28',
  image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'SEO y catálogo',
  excerpt: 'Relevancia, oferta y resultados de búsqueda sin fórmulas secretas. Una lectura práctica del SEO de Amazon para decidir con evidencia.',
  takeaway: 'No utilizamos A9 o A10 como una fórmula pública confirmada con pesos conocidos. La estrategia debe apoyarse en información verificable del producto, una oferta preparada y observaciones que puedas contrastar.',
  sections: [
    { id: 'limites', title: 'Separa la explicación útil de la fórmula supuesta', paragraphs: ['La guía oficial de SEO de Amazon utilizada como referencia describe búsqueda, filtros, contenido y oferta. No proporciona una ponderación que permita calcular cuánto subirá un ASIN por cambiar una imagen o recibir tráfico externo.', 'Los nombres A9 y A10 aparecen en conversaciones sobre posicionamiento, pero no justifican reglas como que una señal pesa un porcentaje fijo. Tampoco utilizamos la falta de conversión de una campaña como prueba automática de una penalización orgánica. Una hipótesis necesita evidencia antes de convertirse en recomendación.'], source: 0 },
    { id: 'intencion', title: 'Trabaja la relación entre búsqueda y producto', paragraphs: ['Nuestra primera revisión sería si el producto responde realmente a la intención de las consultas que quieres captar. Una palabra puede tener volumen y, aun así, describir otro formato, uso o destinatario.', 'Organiza búsquedas por intención y relaciona cada grupo con referencias concretas. No añadas compatibilidades, usos o beneficios que el producto no tenga para ampliar alcance. El posicionamiento no debe construirse a costa de prometer una oferta diferente de la que entregas.'] },
    { id: 'lectura', title: 'Distingue presencia, clics y elección', paragraphs: ['Una observación de posición no resume toda la experiencia de búsqueda. Registra país, consulta, momento y condiciones de la comprobación. Después contrasta los informes disponibles en la cuenta para no decidir por una captura aislada.', 'Cuando tengas acceso a Brand Analytics, utiliza sus definiciones y separa vista de marca, ASIN y periodo. Las cuotas de clics o compras no equivalen a una tasa de conversión ni describen todo el tráfico de la cuenta. Un dato orienta una investigación; no revela el funcionamiento interno completo del buscador.'] },
    { id: 'oferta', title: 'No confundas clasificación de ventas y posición de búsqueda', paragraphs: ['Amazon presenta Best Sellers Rank como una medida del rendimiento de ventas dentro de categorías. No es la posición de tu producto para una palabra clave concreta. Mantén separados ambos conceptos al informar del progreso.', 'Revisa también que el comprador pueda elegir la referencia correcta y recibirla en las condiciones previstas. Nuestra recomendación es coordinar SEO con catálogo, contenido y disponibilidad, sin prometer que una actuación aislada garantice una posición.'], source: 0 },
    { id: 'seguimiento', title: 'Construye un registro de cambios y conclusiones', paragraphs: ['Anota qué se cambió, cuándo y por qué: título, imágenes, precio, campaña o disponibilidad. Si varias cosas cambian al mismo tiempo, conserva ese límite al interpretar el resultado.', 'El informe debería distinguir hechos, hipótesis y siguientes pasos. Una mejora de posición no demuestra por sí sola rentabilidad; una caída no demuestra automáticamente una sanción. Investiga con contexto y evita recetas que prometen dominar el algoritmo con una sola acción.'], items: ['Consultas y referencias prioritarias.', 'Fuentes y alcance de los datos.', 'Cambios de cuenta y fechas.', 'Conclusión y grado de certeza.'] },
  ],
  tags: ['algoritmo Amazon', 'A9', 'A10', 'posicionamiento', 'SEO'],
  service: '/servicios/optimizacion-de-listados/',
  guides: ['brand-analytics-amazon', 'como-redactar-listings-amazon', 'buy-box-amazon-oferta-destacada'],
  relatedPosts: ['herramientas-seo-amazon', 'optimizacion-listings-amazon'],
  sources: [{ label: 'Amazon: SEO y funcionamiento de la búsqueda', url: 'https://sell.amazon.com/blog/amazon-seo', note: 'Orientación oficial, no una fórmula de ranking con ponderaciones públicas. Comprueba las reglas de contenido vigentes en tu cuenta.' }],
  seo: {
    metaTitle: 'Algoritmo Amazon y SEO: relevancia, ranking y mitos de A10',
    metaDescription: 'Entiende qué trabajar en el SEO de Amazon sin fórmulas de A9 o A10: intención, contenido, oferta y seguimiento. Diferencia posicionamiento y ranking de ventas.',
  },
};
