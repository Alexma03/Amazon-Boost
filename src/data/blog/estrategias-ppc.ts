import type { BlogPost } from './index';

export const estrategiasPpcData: BlogPost = {
  slug: 'estrategias-ppc',
  title: 'Estrategia PPC en Amazon: cada campaña necesita un propósito',
  date: '2025-04-01',
  updatedAt: '2026-08-28',
  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1080&auto=format&fit=crop',
  category: 'Publicidad',
  excerpt: 'Una estructura de campañas útil conecta inversión, catálogo y objetivos. Qué decidir antes de aumentar presupuesto o automatizar las pujas.',
  takeaway: 'No hay una arquitectura de PPC válida para todas las cuentas. El papel del producto, la intención de búsqueda y los costes deben orientar la inversión; un ACOS aislado no cuenta toda la historia.',
  sections: [
    { id: 'objetivo', title: 'Asigna un objetivo antes de asignar presupuesto', paragraphs: ['Distingue qué campañas buscan descubrir demanda, cuáles trabajan búsquedas conocidas y cuáles apoyan referencias prioritarias. Es una propuesta de organización, no una obligación de crear tres campañas por producto.', 'Define qué aprendizaje o resultado esperas y qué señales justificarían ampliar, corregir o limitar la inversión. La decisión debe incorporar el papel del producto en la gama y su disponibilidad. No tiene sentido evaluar igual una referencia recién lanzada y otra con un historial estable.'] },
    { id: 'segmentacion', title: 'Usa la segmentación para responder a una pregunta', paragraphs: ['Sponsored Products dispone de mecanismos de segmentación automática y manual, incluidas opciones por palabras clave y productos. Amazon documenta también concordancias y segmentación negativa. Comprueba las opciones del tipo de campaña que estás gestionando.', 'Una campaña automática puede aportar información, pero no garantiza que todo el tráfico sea útil. Tampoco existe una escalera obligatoria de amplia a frase y exacta. Elige el alcance según lo que quieres investigar y revisa las búsquedas reales antes de mover o excluir términos.'], source: 0 },
    { id: 'economia', title: 'Decide con el producto, no solo con el anuncio', paragraphs: ['Relaciona la inversión con ingresos y costes del mismo alcance. Un indicador publicitario puede mejorar mientras la cuenta pierde margen por descuentos, logística o devoluciones. Conserva una lectura por producto y otra del canal completo.', 'No adoptes un porcentaje objetivo porque aparezca en otra cuenta. Define el criterio con el negocio y separa ventas atribuidas, ventas totales y beneficio. Las ventanas de atribución y los periodos comparados deben quedar claros en el informe.'] },
    { id: 'revision', title: 'Convierte el informe en una lista de decisiones', paragraphs: ['Cada revisión debería terminar con acciones justificadas, no con cambios por costumbre. Si faltan impresiones, investiga entrega y elegibilidad. Si hay clics sin compras, contrasta intención, ficha y oferta antes de aumentar la puja.', 'Cuando excluyas una búsqueda, registra el motivo y el alcance. Una consulta irrelevante para un ASIN puede encajar con otro. Las reglas automáticas deben tener responsables y revisión; no sustituyen entender qué está pasando.'], items: ['Observación y periodo analizado.', 'Hipótesis y datos que la respaldan.', 'Acción, alcance y responsable.', 'Fecha y criterio de revisión.'] },
    { id: 'escala', title: 'Escala cuando puedas sostener el siguiente pedido', paragraphs: ['Antes de ampliar presupuesto, comprueba reposición, capacidad operativa y coherencia del catálogo. Si se acerca una rotura de stock, coordina las decisiones de inversión y compra de inventario.', 'Una mejora puntual no demuestra que el siguiente tramo de gasto vaya a rendir igual. Avanza con seguimiento y conserva el contexto de promociones o cambios de precio. Escalar es una decisión de cuenta, no simplemente subir un límite diario.'] },
  ],
  tags: ['PPC', 'Amazon Ads', 'campañas', 'publicidad'],
  service: '/servicios/gestion-de-ppc/',
  guides: ['acos-tacos-amazon', 'amazon-ads-sin-impresiones', 'palabras-clave-negativas-amazon'],
  relatedPosts: ['optimizacion-listings-amazon', 'aumentar-conversion-amazon'],
  sources: [{ label: 'Amazon Ads: segmentación con Sponsored Products', url: 'https://advertising.amazon.com/es-es/library/guides/targeting-with-sponsored-products', note: 'Mecanismos de segmentación. La estructura, los objetivos y los límites de inversión deben adaptarse a tu cuenta.' }],
  seo: {
    metaTitle: 'Estrategia PPC Amazon: campañas, presupuesto y rentabilidad',
    metaDescription: 'Prepara una estrategia PPC en Amazon con objetivos por producto, segmentación, revisión y stock. Qué comprobar antes de automatizar pujas o aumentar inversión.',
  },
};
