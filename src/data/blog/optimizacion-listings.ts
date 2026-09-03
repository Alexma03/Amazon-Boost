import type { BlogPost } from './index';

export const optimizacionListingsData: BlogPost = {
  slug: 'optimizacion-listings-amazon',
  title: 'Optimización de listings en Amazon: ordena el proyecto completo',
  date: '2025-03-30',
  updatedAt: '2026-08-28',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.0.3',
  category: 'SEO y catálogo',
  excerpt: 'Contenido, oferta e inventario influyen en lo que ocurre después de una búsqueda. Cómo organizar una mejora del listing sin perder la visión del conjunto.',
  takeaway: 'Un proyecto de optimización necesita una referencia correcta, una propuesta comprensible y un criterio para evaluar los cambios. Redactar más texto o añadir imágenes no resuelve por sí solo un problema de oferta.',
  sections: [
    { id: 'punto-partida', title: 'Empieza por una ficha que puedas auditar', paragraphs: ['Registra ASIN, SKU, país y versión del producto. Comprueba que la ficha describa lo que realmente se entrega: formato, contenido, materiales y variantes. Un error de referencia debe corregirse antes de evaluar el estilo de los textos.', 'Amazon distingue la página de detalle de las ofertas que se asocian al producto. Esa diferencia importa: mejorar la información de la ficha no equivale a corregir precio, disponibilidad o condiciones de tu oferta. Revisa ambas capas y asigna cada incidencia al responsable adecuado.'], source: 0 },
    { id: 'prioridad', title: 'Elige qué problema merece atención primero', paragraphs: ['Nuestra propuesta es separar falta de visibilidad, falta de clics y dudas al comprar. No son diagnósticos automáticos: son preguntas para ordenar la investigación. Una ficha con visitas poco relevantes necesita un análisis distinto de otra que recibe tráfico adecuado y presenta información contradictoria.', 'Prioriza con una matriz sencilla de impacto esperado, evidencia disponible y esfuerzo. Si hay un dato falso, corrígelo; si solo hay una preferencia estética, formúlala como una hipótesis. Así evitas gastar el presupuesto visual en el problema equivocado.'] },
    { id: 'produccion', title: 'Conecta redacción, imágenes y catálogo', paragraphs: ['Prepara un brief común para quien redacta, diseña y publica. Debe identificar el producto, el comprador previsto, las dudas principales y los argumentos aprobados. Cada pieza puede ampliar la información, pero no contradecirla.', 'El título identifica; los argumentos explican; las imágenes muestran. El contenido A+ puede desarrollar aspectos adicionales cuando sea elegible. Antes de producir, comprueba los requisitos vigentes del marketplace y evita copiar límites de caracteres o especificaciones de una plantilla antigua.'], items: ['Datos de producto y envase confirmados.', 'Responsable de aprobar los argumentos.', 'Materiales que deben actualizarse juntos.', 'Orden de publicación y comprobación.'] },
    { id: 'oferta', title: 'No separes el contenido de la compra real', paragraphs: ['Revisa la oferta que puede ver el comprador: precio, entrega, unidades y disponibilidad. Una promesa comercial atractiva no compensa que el formato elegido esté agotado o que las fotografías hagan esperar accesorios no incluidos.', 'Si se modifica un pack, una variante o el packaging, coordina contenido y operaciones. Conserva trazabilidad de lo que cambió y de las unidades que siguen circulando. La consistencia del catálogo debe sostenerse después de publicar, no solo el día de la entrega del diseño.'] },
    { id: 'resultado', title: 'Cierra el proyecto con una decisión medible', paragraphs: ['Define qué observarás y con qué periodo de comparación. Registra cambios de campañas, precio y stock que puedan afectar a la lectura. Una subida posterior no demuestra, por sí sola, que la haya causado el nuevo contenido.', 'Cuando el producto permita experimentos controlados, puedes plantear versiones para una hipótesis específica. En otros casos, documenta la observación con sus límites. El entregable final debería explicar qué se corrigió, qué queda por comprobar y quién revisará el siguiente resultado.'] },
  ],
  tags: ['listings', 'SEO Amazon', 'catálogo', 'contenido'],
  service: '/servicios/optimizacion-de-listados/',
  guides: ['como-redactar-listings-amazon', 'imagenes-amazon-requisitos', 'tests-ab-listings-amazon'],
  relatedPosts: ['aumentar-conversion-amazon', 'algoritmo-amazon'],
  sources: [{ label: 'Amazon: fichas de producto y ofertas', url: 'https://sell.amazon.com/blog/amazon-product-listings', note: 'Referencia de estructura. Los requisitos concretos deben revisarse en tu categoría y marketplace.' }],
  seo: {
    metaTitle: 'Optimización de listings Amazon: contenido, oferta y medición',
    metaDescription: 'Organiza la optimización de tus listings de Amazon: diagnóstico, redacción, imágenes, oferta y evaluación. Prioriza cambios con una visión completa del catálogo.',
  },
};
