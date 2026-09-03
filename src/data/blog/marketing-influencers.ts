import type { BlogPost } from './index';

export const marketingInfluencersData: BlogPost = {
  slug: 'marketing-influencers',
  title: 'Influencers y Amazon: prepara una colaboración que puedas evaluar',
  date: '2025-03-10',
  updatedAt: '2026-08-28',
  image: 'https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.0.3',
  category: 'Crecimiento',
  excerpt: 'Audiencia, contenido, destino y medición deben encajar antes de una colaboración. Cómo evaluar tráfico externo sin confundir alcance con ventas.',
  takeaway: 'Una colaboración necesita un objetivo claro y una oferta preparada. El número de seguidores no demuestra afinidad, y las ventas atribuidas no equivalen automáticamente a ventas nuevas causadas por la campaña.',
  sections: [
    { id: 'encaje', title: 'Selecciona por afinidad y contexto de compra', paragraphs: ['Define a quién quieres llegar y qué debería entender del producto. Revisa muestras de contenido y pide información pertinente sobre la audiencia y el rendimiento de colaboraciones comparables. No conviertas una cifra de seguidores en una previsión de pedidos.', 'Valora si el creador puede mostrar el producto de forma comprensible y creíble. Un formato adecuado para explicar un accesorio no necesariamente sirve para una gama técnica. Antes de negociar volumen de publicaciones, concreta la pregunta del comprador que quieres resolver.'] },
    { id: 'brief', title: 'Acuerda qué se puede decir y cómo se identificará la colaboración', paragraphs: ['Prepara un brief con producto, materiales aprobados, contenido del envío y límites de los argumentos. Distingue libertad creativa de afirmaciones que requieren respaldo. Una demostración no debería sugerir usos o resultados que la marca no pueda acreditar.', 'Deja claros entregables, identificación de la colaboración, derechos de uso y proceso de aprobación con los responsables correspondientes. No presupongas que pagar una publicación permite reutilizarla indefinidamente en fichas o anuncios. Este artículo no sustituye la revisión contractual o de cumplimiento.'], items: ['Objetivo y audiencia de la colaboración.', 'Referencia y argumentos aprobados.', 'Entregables, autorizaciones y usos acordados.', 'Destino del enlace y plan de medición.'] },
    { id: 'destino', title: 'Lleva al comprador a una oferta preparada', paragraphs: ['Elige entre una ficha específica y una sección de Store según lo que muestre el contenido. Si se presenta un producto concreto, un destino genérico puede añadir decisiones innecesarias. Comprueba país, variante, precio y disponibilidad antes de publicar.', 'Coordina las fechas con reposición y atención. Una campaña no debería prometer un pack diferente del que se vende ni mantener un mensaje de promoción después de que cambien sus condiciones. Define quién revisará enlaces y contenido durante la colaboración.'] },
    { id: 'atribucion', title: 'Prepara la medición antes de recibir visitas', paragraphs: ['Amazon Attribution permite medir resultados de acciones de marketing externas en cuentas y mercados elegibles. Revisa el acceso y configura los enlaces conforme a la documentación vigente antes de lanzar una campaña.', 'Distingue clics, compras atribuidas y resultado económico. Un acortador de enlaces no equivale a una medición de ventas en Amazon. Registra también el coste de producto, creación y distribución que corresponda a la colaboración, sin asumir que toda venta observada sea incremental.'], source: 0 },
    { id: 'limites', title: 'No mezcles promoción y compra de reseñas', paragraphs: ['Una colaboración de contenido no debe convertirse en un acuerdo para publicar opiniones de producto en Amazon. Las pautas de Amazon prohíben influir en las valoraciones o solicitar opiniones positivas. Mantén esa separación aunque el creador reciba producto o remuneración.', 'Al evaluar, recoge qué audiencia llegó, qué información funcionó y qué límites tienen los datos. Decide después si repetir, cambiar el formato o detener la prueba. No prometas pedidos ni mejores posiciones orgánicas por contratar a un creador.'], source: 1 },
  ],
  tags: ['influencers', 'tráfico externo', 'Amazon Attribution', 'creadores'],
  service: '/consultoria-amazon/',
  guides: ['amazon-store-marca', 'listing-amazon-visitas-sin-ventas', 'evitar-roturas-stock-amazon'],
  relatedPosts: ['tacticas-resenas', 'tendencias-ecommerce'],
  sources: [
    { label: 'Amazon Ads: Amazon Attribution', url: 'https://advertising.amazon.com/es-es/solutions/products/amazon-attribution', note: 'Confirma acceso, mercados y metodología de medición antes de configurar la campaña.' },
    { label: 'Amazon: pautas de comunicación y opiniones', url: 'https://sell.amazon.com/tools/customer-reviews', note: 'La promoción de contenido y las reseñas de producto no deben confundirse.' },
  ],
  seo: {
    metaTitle: 'Marketing de influencers para Amazon: estrategia y medición',
    metaDescription: 'Prepara colaboraciones con influencers para Amazon: audiencia, brief, destino y atribución. Evalúa el resultado sin confundir alcance, reseñas y ventas nuevas.',
  },
};
