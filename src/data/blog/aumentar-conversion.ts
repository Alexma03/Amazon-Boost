import type { BlogPost } from './index';

export const aumentarConversionData: BlogPost = {
  slug: 'aumentar-conversion-amazon',
  title: 'Mejorar la conversión en Amazon: de la hipótesis al experimento',
  date: '2025-03-20',
  updatedAt: '2026-08-28',
  image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.0.3',
  category: 'Conversión',
  excerpt: 'Cómo construir un programa de mejora de conversión: separar señales, priorizar cambios y evaluar el resultado sin atribuirlo todo al diseño.',
  takeaway: 'La conversión mejora con un proceso de investigación, no con una lista universal de trucos. Primero aclara qué mide tu informe; después decide qué fricción vas a investigar y cómo comprobarás el cambio.',
  sections: [
    { id: 'medida', title: 'Acuerda qué significa conversión en tu análisis', paragraphs: ['Antes de comparar cifras, identifica el informe, el periodo y el denominador. Unidades por sesión, compras por visita y conversión publicitaria no son medidas intercambiables. Evita reunirlas en una única gráfica sin explicar las diferencias.', 'Separa referencias y mercados. Un promedio de cuenta puede cambiar porque aumenta el peso de un producto, aunque sus fichas no hayan mejorado. Guarda también el contexto de disponibilidad, precio y captación para no atribuir al contenido lo que responde a otro factor.'] },
    { id: 'friccion', title: 'Investiga la fricción que tiene evidencia', paragraphs: ['Reúne dudas de compradores, motivos de devolución y observaciones de la oferta. Busca patrones: tamaño poco claro, contenido del pack ambiguo, imágenes que no corresponden o condiciones de entrega que alteran la decisión.', 'No todas las señales piden un rediseño. Si la referencia que recibe el clic no está disponible, empieza por la oferta. Si llega tráfico incompatible con el producto, revisa captación. Si el producto no cumple lo prometido, implica al responsable de calidad.'] },
    { id: 'priorizar', title: 'Construye una cola de mejoras, no una reforma permanente', paragraphs: ['Nuestra propuesta es ordenar cada oportunidad por evidencia, impacto esperado y esfuerzo. Escribe una hipótesis que explique por qué el cambio puede ayudar al comprador. Evita producir una nueva imagen únicamente porque resulta más vistosa.', 'Distingue correcciones de pruebas. Un tamaño incorrecto se corrige; una forma alternativa de presentar un dato correcto se puede evaluar. No mantengas información engañosa para comparar cuál genera más pedidos.'], items: ['Problema observado y referencias afectadas.', 'Cambio propuesto y resultado que se espera observar.', 'Condiciones que deben mantenerse comparables.', 'Responsable de aprobar, publicar y revisar.'] },
    { id: 'prueba', title: 'Elige una evaluación que permita esa referencia', paragraphs: ['Manage Your Experiments permite comparar versiones de contenido en productos elegibles. Amazon evalúa el acceso y el tráfico disponible; no todos los ASIN pueden utilizar la herramienta ni todos los tipos de prueba estarán disponibles en cualquier cuenta.', 'Cuando no puedas realizar un experimento controlado, registra cambios y observa periodos comparables. Presenta la conclusión como una señal con límites. Comparar una semana promocional con otra sin promoción no aísla el efecto de un nuevo diseño.'], source: 0 },
    { id: 'aprendizaje', title: 'Evalúa también lo que ocurre después de comprar', paragraphs: ['Una ficha que genera pedidos pero confunde sobre el contenido puede trasladar el problema a devoluciones y atención. Combina la lectura de conversión con las incidencias que correspondan a esa referencia y periodo.', 'Documenta resultados inconclusos y cambios que no funcionaron. El objetivo es construir un criterio reutilizable sin convertirlo en una regla universal. Una conclusión obtenida con un producto no se traslada automáticamente a toda la gama o a otro mercado.'] },
  ],
  tags: ['conversión', 'CRO', 'imágenes', 'experimentos'],
  service: '/servicios/optimizacion-de-listados/',
  guides: ['listing-amazon-visitas-sin-ventas', 'tests-ab-listings-amazon', 'reducir-devoluciones-amazon'],
  relatedPosts: ['optimizacion-listings-amazon', 'tacticas-resenas'],
  sources: [{ label: 'Amazon: pruebas de contenido con Manage Your Experiments', url: 'https://sell.amazon.com/tools/manage-your-experiments', note: 'Comprueba acceso, elegibilidad y configuración en tu cuenta. No se adoptan porcentajes de mejora de otras marcas.' }],
  seo: {
    metaTitle: 'Mejorar la conversión en Amazon: hipótesis, pruebas y revisión',
    metaDescription: 'Crea un proceso de mejora de conversión en Amazon: entiende tus métricas, investiga fricciones, prioriza pruebas y revisa pedidos e incidencias con contexto.',
  },
};
