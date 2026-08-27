// Temporary proof content from the previous website. Replace this file when the
// new 2026 metrics, case studies and approved imagery are ready.
export const homeShowcase = {
  status: "provisional" as const,
  proofNote: "Cifras de la versión anterior. Pendientes de actualizar con los datos y casos de 2026.",
  proof: [
    { value: "+20", label: "marcas y vendedores confían en nosotros" },
    { value: "+3 años", label: "trabajando y gestionando cuentas Amazon" },
    { value: "+50k €/año", label: "en publicidad Amazon gestionada" },
    { value: "FBA + FBM", label: "operativa y crecimiento conectados" },
  ],
  heroDemo: {
    status: "Demo visual · Datos de muestra",
    health: "Panel de muestra",
    metrics: [
      { label: "Publicidad", value: "PPC", detail: "métrica por actualizar" },
      { label: "Oportunidades", value: "04", detail: "áreas de análisis" },
      { label: "Marketplace", value: "EU", detail: "estructura de muestra" },
    ],
  },
  featuredCase: {
    status: "Caso de éxito",
    title: "De 600 € a facturar 6.000 € al mes sin publicidad.",
    description: "Por los requisitos del producto, tuvimos que alternar entre FBA y FBM. Aun así, sin invertir un solo euro en publicidad, escalamos de 600 € a 6.000 € mensuales en menos de cinco meses mediante posicionamiento SEO e imágenes.",
    lifestyleImage: "/images/caso-exito-bebe-producto-negro-v2.png",
    chartImage: "/images/Gráfico de facturación mensual – categoría Bebés (datos parcialmente anonimizados).png",
    metrics: [
      { value: "+1000%", label: "facturación mensual" },
      { value: "0 €", label: "gasto publicitario" },
      { value: "#1", label: "posición orgánica conseguida" },
    ],
    href: "/casos-de-exito/bebes-estrategia-precios-logistica",
    reviews: [
      {
        platform: "Trustpilot",
        author: "Alberto",
        initials: "AL",
        meta: "ES · 2 reseñas",
        date: "26 feb 2026",
        title: "Una empresa muy recomendable si vendes en Amazon",
        quote: "Muy enfocados en tus problemas y con grandes soluciones para cualquier cosa que pueda surgir.",
        url: "https://es.trustpilot.com/review/amznboost.es",
      },
      {
        platform: "LinkedIn",
        author: "Alberto Gonzalez Redondo",
        initials: "AG",
        meta: "Principal Chief Executive Officer en Momentosgourmet",
        date: "26 feb 2026",
        title: "Una persona muy atenta y enfocada, siempre centrada en el objetivo.",
        quote: "Sergio es de las personas más competentes que puedes encontrarte. Es un placer haber podido contar con él, ya que es un solucionador.",
        url: "https://www.linkedin.com/in/sergio-deroman-amazon/",
      },
    ],
  },
};

export const websiteReviews = [
  {
    id: "suplementacion-personas",
    title: "Suplementación para personas",
    author: "Director de E-commerce",
    meta: "Marca de Suplementación y Salud",
    quote: "Nos abrieron el canal desde cero. Hemos escalado la facturación manteniendo un TACOS muy rentable y ya nos estamos posicionando con un margen de beneficio muy sólido. Haber superado los 15.000 € de facturación mensual partiendo de cero demuestra su control absoluto del ecosistema.",
  },
  {
    id: "suplementacion-animales",
    title: "Suplementación para animales",
    author: "Founder",
    meta: "Nutrición Animal Premium",
    quote: "Antes de trabajar con Amazon Boost ya estábamos en Amazon, pero pagábamos más en publicidad de lo que facturábamos. Optimizaron los listados y reestructuraron toda la arquitectura de campañas PPC, consiguiendo un TACOS del 15%. Ahora el canal es predecible, rentable y, gracias a que fomentaron la compra recurrente, mucho más orgánico.",
  },
  {
    id: "suplementacion-perros",
    title: "Suplementación para perros",
    author: "CEO",
    meta: "Marca de Salud Canina",
    quote: "Lanzar un condroprotector canino en Amazon parecía un suicidio por el altísimo nivel de competencia. Amazon Boost preparó unos listings súper optimizados con unas imágenes tremendas y muy profesionales. En el primer mes ya estábamos en la primera página. Un trabajo excelente; ya estamos pensando en ampliar el catálogo con ellos.",
  },
  {
    id: "cosmetica-general",
    title: "Cosmética general",
    author: "CMO",
    meta: "Firma de Dermocosmética",
    quote: "Teníamos un catálogo amplio, pero la conversión era pésima al competir contra marcas extranjeras. Al empezar a trabajar con ellos, alinearon el PPC con un Contenido A+ brutal, un SEO preciso y unas imágenes milimétricas. Entienden perfectamente la psicología de compra de belleza en móvil. Nos hemos hecho nuestro hueco en el mercado y estamos rindiendo muy bien.",
  },
  {
    id: "cosmetica-coreana",
    title: "Cosmética coreana",
    author: "Co-Founder",
    meta: "Marca de Cosmética Coreana",
    quote: "El nicho de K-Beauty va muy rápido, impulsado por tendencias virales. Lograron capturar todo ese tráfico orgánico optimizando nuestro listado y gestionando el inventario con una dinámica logística perfecta para no romper stock en los picos de demanda. Son unos cracks.",
  },
  {
    id: "cosmetica-tradicional",
    title: "Cosmética tradicional",
    author: "Director General",
    meta: "Laboratorios Cosméticos",
    quote: "Llevamos décadas en el mercado tradicional, pero Amazon era un agujero negro operativo. Digitalizaron nuestro catálogo manteniendo intacto el prestigio institucional de la marca, gestionaron toda la burocracia de los algoritmos y consiguieron que el canal se vuelva rentable en menos de seis meses. Pura ingeniería de cuenta.",
  },
  {
    id: "higiene-jabones",
    title: "Higiene y jabones",
    author: "Responsable Digital",
    meta: "Marca de Higiene y Cuidado Personal",
    quote: "Vender geles y jabones en FBA es muy complejo porque el peso del producto y el ticket medio bajo pulverizan el margen. Entendieron nuestra estructura de costes desde la auditoría inicial, reestructuraron la oferta y nos hicieron rentables donde otras agencias fracasaron. Muy recomendables.",
  },
] as const;

// Case 02: supplied dossier, pages 6-9. Keep the client anonymous (NDA).
// The year-on-year comparison and the monthly series cover different intervals.
export const pharmaCase = {
  title: "+994,63% en ventas para una marca farmacéutica centenaria.",
  description: "Una institución española con más de cien años de historia necesitaba convertir su autoridad en ventas dentro de Amazon. Conectamos diseño, inversión publicitaria y disponibilidad para escalar un catálogo en un mercado muy competido.",
  period: "Finales de octubre de 2025 a finales de julio de 2026",
  comparisonNote: "Mismo intervalo frente al año anterior. Aproximadamente nueve meses, no un ejercicio anual completo.",
  previousSales: 2537.70,
  currentSales: 27778.49,
  previousUnits: 190,
  currentUnits: 2169,
  metrics: [
    { value: "+994,63%", label: "ventas frente al año anterior" },
    { value: "2.169", label: "unidades en el periodo" },
    { value: "9 meses", label: "periodo comparado, aprox." },
  ],
  decisions: [
    { title: "Diseño para convertir", text: "Jerarquía visual móvil e infografías que explican el producto y transmiten confianza." },
    { title: "Inversión con foco", text: "Productos prioritarios para concentrar la demanda y controlar el TACOS durante el arranque." },
    { title: "Stock preparado", text: "Planificación FBA antes del verano para sostener la demanda sin frenar la disponibilidad." },
  ],
} as const;

export const caseChartSeries = {
  organic: {
    labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
    values: [600, 820, 1080, 2380, 5904.74, 5280],
    approximate: true,
  },
  pharma: {
    labels: ["Sep 25", "Oct 25", "Nov 25", "Dic 25", "Ene 26", "Feb 26", "Mar 26", "Abr 26", "May 26", "Jun 26", "Jul 26"],
    values: [1116.15, 1438.45, 1426.40, 1001.40, 990.55, 788.60, 1743.48, 2934.45, 3989.54, 4379.23, 5044.01],
    approximate: false,
  },
} as const;
