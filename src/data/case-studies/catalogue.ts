import { homeShowcase, pharmaCase, websiteReviews } from '../home-showcase.ts';

export interface CaseStudy {
  slug: string;
  kind: 'documented' | 'draft' | 'archive';
  title: string;
  sector: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  headline?: { lead: string; value: string; tail: string };
  image?: { src: string; alt: string; caption: string };
  metrics: { value: string; label: string }[];
  context: { label: string; value: string }[];
  sections: { id: string; label: string; title: string; paragraphs: string[]; decisions?: { title: string; text: string }[] }[];
  chart?: 'organic' | 'pharma';
  proofImage?: { src: string; alt: string; caption: string };
  testimonial?: { quote: string; author: string; role: string; source: string; url?: string };
  evidence: string;
  pending?: string[];
  service: string;
  guides: string[];
  related: string[];
}

const original = homeShowcase.featuredCase;
const nutritionReview = websiteReviews.find((review) => review.id === 'suplementacion-animales')!;
const beautyReview = websiteReviews.find((review) => review.id === 'cosmetica-general')!;

export const featuredCaseStudies: CaseStudy[] = [
  {
    slug: 'bebes-estrategia-precios-logistica', kind: 'documented', sector: 'Bebés · Crecimiento orgánico',
    title: 'De 600 € a casi 6.000 € al mes, sin publicidad.',
    headline: { lead: 'De 600 € a casi', value: '6.000 €', tail: 'al mes, sin publicidad.' },
    summary: 'SEO, imágenes y una operativa FBA + FBM coordinada para hacer crecer un producto sin inversión publicitaria.',
    metaTitle: 'Caso Amazon: de 600 € a casi 6.000 € sin publicidad | Amazon Boost',
    metaDescription: 'Cómo conectamos SEO, imágenes y logística FBA + FBM para llevar un producto de Bebés de 600 € a casi 6.000 € mensuales sin invertir en publicidad.',
    image: { src: original.lifestyleImage, alt: 'Composición del pack de productos del caso de Bebés sobre fondo negro', caption: 'Recreación visual del producto. No es una captura de resultados.' },
    metrics: [{ value: '5.904,74 €', label: 'Pico mensual en la captura' }, { value: '0 €', label: 'Inversión publicitaria' }, { value: 'FBA + FBM', label: 'Operativa coordinada' }],
    context: [{ label: 'Mercado', value: 'Amazon España' }, { label: 'Punto de partida', value: 'Alrededor de 600 € al mes' }, { label: 'Enfoque', value: 'SEO, imágenes y disponibilidad' }],
    sections: [
      { id: 'reto', label: 'El punto de partida', title: 'Un producto con recorrido. Una operativa que exigía adaptarse.', paragraphs: ['El producto generaba alrededor de 600 € mensuales. Sus requisitos obligaban a alternar entre FBA y FBM: el trabajo comercial tenía que acompañar esos cambios de logística.', 'El objetivo no era comprar más tráfico con campañas. Había que mejorar cómo se encontraba y se entendía el producto, y mantener una oferta coherente con la forma de entrega disponible.'] },
      { id: 'decisiones', label: 'Qué conectamos', title: 'La ficha y la oferta tenían que trabajar juntas.', paragraphs: ['La intervención unió posicionamiento, contenido visual y gestión de la oferta. El proyecto no se limitó a cambiar palabras clave ni a producir imágenes de forma aislada.'], decisions: [
        { title: 'SEO con intención', text: 'Revisamos los textos del listing para que el producto respondiera a búsquedas relevantes y explicara mejor su propuesta.' },
        { title: 'Imágenes que aclaran', text: 'Trabajamos la presentación visual para ayudar al comprador a entender el producto y reducir dudas antes del pedido.' },
        { title: 'Una oferta adaptable', text: 'Coordinamos FBA y FBM y ajustamos la oferta al contexto logístico, sin separar precio, disponibilidad y conversión.' },
      ] },
      { id: 'resultado', label: 'Qué cambió', title: 'Más facturación, sin añadir gasto publicitario.', paragraphs: ['La evolución aportada pasa de unos 600 € mensuales a un pico de 5.904,74 €. Es la cifra que resumimos como casi 6.000 € al mes, alcanzada en menos de cinco meses según el relato del proyecto.', 'La inversión publicitaria del caso fue de 0 €. El resultado muestra la evolución conjunta del proyecto; no permite atribuir una cantidad exacta de ventas a cada cambio de SEO, imagen o logística. Tampoco equivale a beneficio neto.'] },
    ],
    chart: 'organic',
    proofImage: { src: original.chartImage, alt: 'Captura de Seller Central con un pico de ventas de productos encargados de 5.904,74 euros', caption: 'Captura original aportada de Seller Central, con datos parcialmente anonimizados.' },
    testimonial: { quote: original.reviews[0].fullQuote, author: original.reviews[0].author, role: 'Cliente de Amazon Boost', source: 'Trustpilot', url: original.reviews[0].url },
    evidence: 'La captura muestra ventas de productos encargados. La curva interactiva reconstruye visualmente su evolución: los puntos intermedios son aproximados; el pico de 5.904,74 € procede de la captura. La imagen del producto es una recreación, no evidencia de ventas.',
    service: '/servicios/optimizacion-de-listados/', guides: ['como-redactar-listings-amazon', 'imagenes-amazon-requisitos', 'evitar-roturas-stock-amazon'], related: ['crecimiento-marca-farmaceutica-amazon'],
  },
  {
    slug: 'crecimiento-marca-farmaceutica-amazon', kind: 'documented', sector: 'Sector farmacéutico · Gestión integral',
    title: 'De 2.537,70 € a 27.778,49 € en el periodo comparado.',
    headline: { lead: 'De 2.537,70 € a', value: '27.778,49 €', tail: 'en el periodo comparado.' },
    summary: pharmaCase.description,
    metaTitle: 'Caso Amazon: crecimiento de una marca farmacéutica | Amazon Boost',
    metaDescription: 'De 2.537,70 € a 27.778,49 € en el periodo comparado. Diseño, publicidad y stock conectados para una marca española con más de cien años de historia.',
    metrics: [{ value: '+994,63%', label: 'Ventas frente al mismo periodo anterior' }, { value: '2.169', label: 'Unidades en el periodo comparado' }, { value: '9 meses', label: 'Intervalo comparado, aproximadamente' }],
    context: [{ label: 'Marca', value: 'Institución española con más de 100 años' }, { label: 'Comparación', value: pharmaCase.period }, { label: 'Identidad', value: 'Reservada por confidencialidad' }],
    sections: [
      { id: 'reto', label: 'El punto de partida', title: 'La autoridad fuera de Amazon no bastaba dentro.', paragraphs: ['Una marca española con más de un siglo de historia necesitaba trasladar su trayectoria a un canal con reglas comerciales propias. El comprador tenía que entender su propuesta desde la ficha, mientras la cuenta organizaba inversión y disponibilidad.', 'El reto era coordinar esas decisiones en un mercado competido. La identidad de la marca se mantiene reservada; los datos publicados corresponden al material aportado para este proyecto.'] },
      { id: 'decisiones', label: 'Qué conectamos', title: 'Diseño, inversión y stock. Una misma dirección.', paragraphs: ['El trabajo se centró en tres frentes complementarios. Presentar mejor el producto, concentrar la inversión y anticipar disponibilidad formaban parte de la misma estrategia.'], decisions: [...pharmaCase.decisions] },
      { id: 'resultado', label: 'Qué cambió', title: 'Una nueva dimensión para el canal.', paragraphs: ['Las ventas del intervalo comparado pasaron de 2.537,70 € a 27.778,49 €, un incremento del 994,63%. Las unidades pasaron de 190 a 2.169. El periodo va de finales de octubre de 2025 a finales de julio de 2026 frente al mismo intervalo del año anterior.', 'La serie mensual aporta otra lectura: desde 1.116,15 € en septiembre de 2025 hasta 5.044,01 € en julio de 2026, con un mínimo de 788,60 € en febrero. Mostrar ese recorrido evita convertir un resultado acumulado en una historia de crecimiento lineal.', 'No se publica un porcentaje de rentabilidad ni un TACOS concreto de este caso. Ventas, beneficio y eficiencia publicitaria son medidas distintas.'] },
    ],
    chart: 'pharma',
    evidence: 'Datos aportados en el dossier del proyecto a partir de Seller Central. La comparación interanual cubre aproximadamente nueve meses; la serie mensual comprende septiembre de 2025 a julio de 2026. Son intervalos distintos y no deben sumarse o compararse como si fueran equivalentes. Identidad reservada por confidencialidad.',
    service: '/servicios/gestion-de-cuenta/', guides: ['brand-analytics-amazon', 'acos-tacos-amazon', 'evitar-roturas-stock-amazon'], related: ['bebes-estrategia-precios-logistica'],
  },
];

// These briefs use the supplied testimonials, not invented Seller Central data.
// They stay noindex and outside the sitemap until the case evidence is approved.
export const draftCaseStudies: CaseStudy[] = [
  {
    slug: 'suplementacion-animal-ppc-listings', kind: 'draft', sector: 'Suplementación animal',
    title: 'De una publicidad que pesaba demasiado a un canal más ordenado.',
    summary: 'Una experiencia sobre listings, estructura PPC y compra recurrente, contada por el responsable de una marca de nutrición animal.',
    metaTitle: 'Suplementación animal en Amazon: historia en preparación | Amazon Boost',
    metaDescription: 'Borrador de una experiencia de nutrición animal a partir del testimonio facilitado: optimización de listings y reorganización publicitaria.',
    metrics: [], context: [{ label: 'Origen', value: 'Testimonio facilitado a Amazon Boost' }, { label: 'Identidad', value: 'Marca no identificada públicamente' }, { label: 'Estado', value: 'Historia pendiente de documentación' }],
    sections: [
      { id: 'reto', label: 'Lo que cuenta el cliente', title: 'Vender no era suficiente si la publicidad absorbía el canal.', paragraphs: ['El responsable de la marca describe una cuenta que ya vendía en Amazon, pero cuya inversión publicitaria pesaba demasiado sobre la facturación. Ese es el punto de partida de su testimonio.', 'La historia se está preparando a partir de esa reseña. Todavía no se han incorporado periodos, informes ni comparativas de la cuenta que permitan cuantificar el antes y el después.'] },
      { id: 'decisiones', label: 'Trabajo mencionado en la reseña', title: 'Conectar la captación con una ficha mejor resuelta.', paragraphs: ['El testimonio menciona optimización de listados y una reestructuración de las campañas PPC. También describe una mayor importancia de la compra recurrente.'], decisions: [
        { title: 'Listados', text: 'Documentar qué cambió en la presentación de los productos y qué materiales se utilizaron.' },
        { title: 'Publicidad', text: 'Incorporar la estructura anterior y posterior de campañas junto al periodo de medición.' },
        { title: 'Recurrencia', text: 'Separar la percepción del cliente de los indicadores que se puedan contrastar en los informes.' },
      ] },
      { id: 'resultado', label: 'Alcance del testimonio', title: 'El resultado lo relata el cliente. Falta documentarlo.', paragraphs: ['La reseña cita un TACOS del 15% y describe el canal como más predecible y rentable. Esa cifra se conserva dentro de su cita, no se presenta como una medición verificada por esta página.', 'Antes de publicar el caso completo necesitamos el periodo, la inversión y las ventas que permitan contextualizar ese ratio. No se ha creado una gráfica ni un crecimiento estimado para sustituir esa información.'] },
    ],
    testimonial: { quote: nutritionReview.quote, author: nutritionReview.author, role: nutritionReview.meta, source: 'Testimonio facilitado a Amazon Boost' },
    evidence: 'Borrador basado únicamente en el testimonio facilitado. Sin documentación de Seller Central adjunta ni verificación independiente de las cifras. No se atribuye esta reseña a Trustpilot o LinkedIn.',
    pending: ['Periodo exacto y autorización para publicar la historia.', 'Ventas totales e inversión publicitaria del mismo intervalo para contextualizar el TACOS.', 'Imágenes de producto y ejemplos de listings antes y después.', 'Capturas anonimizadas y datos de recurrencia, si están disponibles.'],
    service: '/servicios/gestion-de-cuenta/', guides: ['acos-tacos-amazon', 'vender-productos-mascotas-amazon', 'suscribete-y-ahorra-amazon-vendedores'], related: ['crecimiento-marca-farmaceutica-amazon'],
  },
  {
    slug: 'dermocosmetica-contenido-conversion', kind: 'draft', sector: 'Dermocosmética',
    title: 'Una marca de belleza que necesitaba explicar mejor su valor.',
    summary: 'La experiencia de conectar SEO, imágenes, contenido A+ y publicidad para dar coherencia a un catálogo de dermocosmética.',
    metaTitle: 'Dermocosmética en Amazon: historia en preparación | Amazon Boost',
    metaDescription: 'Borrador de una experiencia de dermocosmética basada en el testimonio facilitado: contenido visual, SEO, A+ y publicidad coordinados.',
    metrics: [], context: [{ label: 'Origen', value: 'Testimonio facilitado a Amazon Boost' }, { label: 'Identidad', value: 'Firma de dermocosmética no identificada' }, { label: 'Estado', value: 'Historia pendiente de documentación' }],
    sections: [
      { id: 'reto', label: 'Lo que cuenta el cliente', title: 'Un catálogo amplio que no conseguía transmitir su propuesta.', paragraphs: ['El responsable de marketing describe dificultades de conversión al competir con otras marcas. La reseña sitúa la presentación del producto y la experiencia de compra en móvil en el centro del proyecto.', 'No contamos todavía con una comparación de conversión, fechas ni imágenes aprobadas del catálogo. El borrador recoge la experiencia del cliente sin añadir cifras o identificar una marca por suposiciones.'] },
      { id: 'decisiones', label: 'Trabajo mencionado en la reseña', title: 'Una misma propuesta, desde el anuncio hasta el contenido.', paragraphs: ['La reseña destaca la coordinación entre PPC, SEO, imágenes y contenido A+. El caso completo desarrollará esa relación con ejemplos reales de los materiales.'], decisions: [
        { title: 'SEO y claridad', text: 'Mostrar cómo se ordenó la información del catálogo y qué preguntas del comprador se resolvieron.' },
        { title: 'Imágenes y A+', text: 'Incorporar piezas visuales aprobadas y explicar su función en la decisión de compra.' },
        { title: 'Publicidad coordinada', text: 'Documentar cómo se conectaron las campañas con la propuesta de las fichas.' },
      ] },
      { id: 'resultado', label: 'Alcance del testimonio', title: 'Una mejor experiencia, todavía sin una cifra atribuible.', paragraphs: ['El cliente describe una mejora de su posición comercial y una valoración positiva del trabajo realizado. La reseña no aporta un porcentaje concreto de conversión o crecimiento.', 'Por eso esta historia no incluye un antes y un después numérico. Se completará con datos comparables y ejemplos autorizados, sin atribuir toda la evolución del canal a una única intervención.'] },
    ],
    testimonial: { quote: beautyReview.quote, author: beautyReview.author, role: beautyReview.meta, source: 'Testimonio facilitado a Amazon Boost' },
    evidence: 'Borrador basado en la reseña facilitada, sin capturas ni resultados cuantificados. No equivale a un estudio de atribución ni se presenta como reseña de una plataforma externa.',
    pending: ['Autorización de la marca y periodo del proyecto.', 'Imágenes, contenido A+ y ejemplos de fichas aprobados.', 'Sesiones y pedidos de periodos comparables para contextualizar la conversión.', 'Ventas e inversión, si se desea desarrollar la parte publicitaria.'],
    service: '/servicios/optimizacion-de-listados/', guides: ['contenido-a-plus-amazon', 'imagenes-amazon-requisitos', 'tests-ab-listings-amazon'], related: ['bebes-estrategia-precios-logistica'],
  },
];

// Keep previous addresses available without publishing unconfirmed identities,
// testimonials or results from the old collection as fresh evidence.
export const archivedCaseStudies: CaseStudy[] = [
  { slug: 'dominacion-en-la-categoria-de-electronicos', sector: 'Electrónica', title: 'Catálogo y publicidad en electrónica.', service: '/servicios/gestion-de-ppc/', guides: ['acos-tacos-amazon', 'como-redactar-listings-amazon'] },
  { slug: 'historia-de-exito-en-hogar-y-cocina', sector: 'Colección anterior', title: 'Una historia pendiente de una nueva lectura.', service: '/servicios/gestion-de-cuenta/', guides: ['brand-analytics-amazon', 'evitar-roturas-stock-amazon'] },
  { slug: 'expansion-en-productos-para-mascotas', sector: 'Mascotas', title: 'Preparar un catálogo para crecer en mascotas.', service: '/servicios/gestion-de-cuenta/', guides: ['vender-productos-mascotas-amazon', 'lanzar-producto-amazon-checklist'] },
  { slug: 'exito-organico-en-productos-para-bebe', sector: 'Bebés', title: 'Posicionamiento orgánico en productos para bebé.', service: '/servicios/optimizacion-de-listados/', guides: ['como-redactar-listings-amazon', 'imagenes-amazon-requisitos'] },
].map((entry) => ({
  ...entry, kind: 'archive', summary: 'Esta historia forma parte de la colección anterior y está pendiente de revisión editorial.',
  metaTitle: `${entry.sector}: caso en revisión | Amazon Boost`,
  metaDescription: 'Historia de la colección anterior de Amazon Boost pendiente de actualización. Consulta los casos actuales y sus datos contextualizados.',
  metrics: [], context: [{ label: 'Estado', value: 'Archivo editorial' }],
  sections: [{ id: 'revision', label: 'Actualización del caso', title: 'Los resultados necesitan su contexto.', paragraphs: ['Estamos revisando la documentación de esta historia antes de volver a presentarla como un caso de éxito. Mientras tanto, sus cifras y testimonios anteriores no se utilizan como prueba de resultados.', 'Puedes consultar los dos casos destacados de la colección actual, con sus periodos, cifras y fuentes explicados.'] }],
  evidence: 'Contenido anterior pendiente de validación. Esta página no se incluye en el índice de casos ni en el sitemap.',
  related: featuredCaseStudies.map((study) => study.slug),
}));

export const allCaseStudies = [...featuredCaseStudies, ...draftCaseStudies, ...archivedCaseStudies];
export const caseStudiesBySlug = Object.fromEntries(allCaseStudies.map((study) => [study.slug, study]));
export const casePath = (study: Pick<CaseStudy, 'slug'>) => `/casos-de-exito/${study.slug}/`;
export const caseLabel = (study: CaseStudy) => study.kind === 'documented' ? 'Caso de éxito' : study.kind === 'draft' ? 'Borrador · Experiencia de cliente' : 'Archivo · En revisión';
export const excludedCasePaths = allCaseStudies.filter((study) => study.kind !== 'documented').map(casePath);
