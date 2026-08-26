export type SeoLandingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  hero: string;
  intro: string;
  intent: string;
  primaryCta: string;
  sections: Array<{
    title: string;
    text: string;
    bullets: string[];
  }>;
  signals: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "agencia-amazon",
    title: "Agencia Amazon",
    metaTitle: "Agencia Amazon en España para vender más con margen | Amazon Boost",
    metaDescription:
      "Agencia Amazon especializada en Seller Central, PPC, listings, FBA/FBM y auditoría de cuentas para marcas que quieren escalar ventas rentables.",
    eyebrow: "Agencia Amazon especializada",
    hero: "Una agencia Amazon para convertir tu cuenta en un canal rentable, medible y escalable.",
    intro:
      "Si vendes en Amazon, necesitas algo más que ejecutar tareas sueltas. Necesitas una lectura completa de la cuenta: tráfico, conversión, publicidad, stock, precio, Buy Box, catálogo y competencia. En Amazon Boost trabajamos todo el sistema para que cada decisión tenga impacto en ventas y margen.",
    intent:
      "Esta página está pensada para empresas que buscan una agencia Amazon en España capaz de auditar, ordenar y escalar su cuenta Seller Central o Vendor con una estrategia clara.",
    primaryCta: "Solicitar auditoría de cuenta",
    sections: [
      {
        title: "Qué hace una agencia Amazon de verdad",
        text:
          "Una agencia Amazon no debería limitarse a tocar campañas o cambiar títulos. El valor está en entender qué frena el crecimiento y priorizar las acciones que pueden mover el resultado con menos fricción.",
        bullets: [
          "Auditoría de cuenta, catálogo, pricing, stock y rentabilidad.",
          "Optimización SEO y CRO de listings para mejorar visibilidad y conversión.",
          "Gestión de Amazon Ads con foco en ACOS, ROAS, TACoS y margen.",
          "Lectura de competencia y oportunidades por categoría.",
        ],
      },
      {
        title: "Cuándo tiene sentido contratar una agencia Amazon",
        text:
          "Tiene sentido cuando Amazon ya representa una oportunidad relevante o cuando la cuenta empieza a exigir decisiones más técnicas de las que puede absorber el equipo interno.",
        bullets: [
          "Vendes, pero no sabes qué productos merecen más inversión.",
          "Tu PPC consume presupuesto sin una estructura clara.",
          "Tus listings tienen tráfico, pero no convierten como deberían.",
          "Quieres entrar en nuevos mercados de Amazon Europa con menos riesgo.",
        ],
      },
      {
        title: "Nuestro enfoque",
        text:
          "Primero diagnosticamos. Después priorizamos. Solo entonces ejecutamos. Así evitamos cambios cosméticos y centramos el trabajo en las palancas que afectan al negocio.",
        bullets: [
          "Diagnóstico inicial con oportunidades accionables.",
          "Plan mensual por impacto, esfuerzo y dependencia operativa.",
          "Implementación y medición semanal.",
          "Revisión de resultados y siguiente bloque de crecimiento.",
        ],
      },
    ],
    signals: [
      "Seller Central desordenado",
      "PPC sin rentabilidad",
      "Listings con baja conversión",
      "Stock que rompe ranking",
      "Crecimiento sin lectura de margen",
    ],
    faqs: [
      {
        question: "¿Trabajáis solo PPC o también cuenta completa?",
        answer:
          "Podemos trabajar PPC, listings o gestión integral, pero siempre revisamos el contexto de cuenta porque la publicidad depende de precio, ficha, stock y conversión.",
      },
      {
        question: "¿La auditoría es gratuita?",
        answer:
          "Sí. La auditoría inicial sirve para detectar oportunidades reales y decidir si tiene sentido trabajar juntos.",
      },
      {
        question: "¿Trabajáis con Amazon Europa?",
        answer:
          "Sí. El enfoque está pensado para marcas y vendedores que operan o quieren crecer en marketplaces europeos.",
      },
    ],
  },
  {
    slug: "consultoria-amazon",
    title: "Consultoría Amazon",
    metaTitle: "Consultoría Amazon para Seller Central, FBA y crecimiento rentable",
    metaDescription:
      "Consultoría Amazon para marcas que necesitan diagnóstico, estrategia y acompañamiento en Seller Central, PPC, listings, stock y expansión.",
    eyebrow: "Consultoría Amazon estratégica",
    hero: "Diagnóstico y dirección para saber qué mover en Amazon, en qué orden y por qué.",
    intro:
      "La consultoría Amazon es para empresas que no necesitan solo manos, sino criterio. Revisamos la cuenta, interpretamos métricas y convertimos el ruido de Seller Central en una hoja de ruta clara.",
    intent:
      "Ideal si ya tienes equipo interno, pero necesitas una lectura externa experta para priorizar decisiones, validar campañas o desbloquear crecimiento.",
    primaryCta: "Pedir diagnóstico estratégico",
    sections: [
      {
        title: "Qué revisamos en una consultoría Amazon",
        text:
          "Miramos los puntos donde normalmente se atasca el crecimiento: visibilidad, conversión, publicidad, margen, catálogo, logística y competencia.",
        bullets: [
          "Sesiones de diagnóstico y priorización.",
          "Revisión de métricas de negocio y publicidad.",
          "Análisis de listings, imágenes, reviews y contenido A+.",
          "Plan de acción para el equipo interno.",
        ],
      },
      {
        title: "Para quién encaja",
        text:
          "Encaja especialmente en marcas que venden, pero sienten que Amazon se ha vuelto una caja negra: hay datos, pero faltan decisiones.",
        bullets: [
          "Dirección general o ecommerce que quiere entender Amazon.",
          "Equipos internos con dudas sobre PPC o catálogo.",
          "Marcas que preparan lanzamiento o expansión internacional.",
          "Cuentas con inversión, pero sin plan por producto.",
        ],
      },
      {
        title: "Resultado esperado",
        text:
          "La salida no es un informe bonito. Es una lista ordenada de acciones, riesgos y oportunidades para saber exactamente qué hacer después.",
        bullets: [
          "Mapa de problemas por impacto.",
          "Prioridades de corto y medio plazo.",
          "Indicadores que conviene vigilar cada semana.",
          "Recomendación de ejecución interna o acompañada.",
        ],
      },
    ],
    signals: [
      "Muchos datos, pocas decisiones",
      "Equipo interno saturado",
      "Dudas antes de escalar inversión",
      "Lanzamientos sin hoja de ruta",
      "Expansión europea pendiente",
    ],
    faqs: [
      {
        question: "¿La consultoría implica gestión mensual?",
        answer:
          "No necesariamente. Puede ser una auditoría puntual, sesiones estratégicas o un acompañamiento mensual si la cuenta lo necesita.",
      },
      {
        question: "¿Podéis revisar una cuenta antes de invertir más en PPC?",
        answer:
          "Sí, de hecho es uno de los usos más útiles: detectar si la cuenta está lista para escalar o si primero hay que corregir base.",
      },
      {
        question: "¿Necesitáis acceso a Seller Central?",
        answer:
          "Para una revisión completa, sí. Si todavía no quieres dar acceso, podemos empezar con informes exportados y capturas clave.",
      },
    ],
  },
  {
    slug: "gestion-cuenta-amazon-seller-central",
    title: "Gestión de cuenta Amazon Seller Central",
    metaTitle: "Gestión de cuenta Amazon Seller Central | Amazon Boost",
    metaDescription:
      "Gestión de cuentas Amazon Seller Central para marcas que necesitan control de catálogo, PPC, stock, listings, pricing y crecimiento rentable.",
    eyebrow: "Seller Central bajo control",
    hero: "Gestionamos tu cuenta Amazon para que cada semana avance algo que importa.",
    intro:
      "Seller Central concentra ventas, inventario, campañas, catálogo, incidencias y oportunidades. Si nadie lo mira con método, la cuenta se llena de decisiones pendientes. Nuestra gestión busca ordenar la operación y convertirla en crecimiento medible.",
    intent:
      "Para empresas que venden en Amazon y necesitan apoyo operativo y estratégico en el día a día de Seller Central.",
    primaryCta: "Evaluar mi cuenta Seller Central",
    sections: [
      {
        title: "Qué incluye la gestión",
        text:
          "Nos ocupamos de revisar la cuenta con una mirada comercial y operativa: lo que afecta a ventas, margen, visibilidad y estabilidad.",
        bullets: [
          "Seguimiento de ventas, conversión, sesiones y rentabilidad.",
          "Optimización de catálogo, títulos, bullets, A+ e imágenes.",
          "Control de campañas PPC y términos de búsqueda.",
          "Revisión de stock, FBA/FBM, Buy Box e incidencias.",
        ],
      },
      {
        title: "Por qué no basta con mirar ventas",
        text:
          "Una cuenta puede vender más y aun así perder margen. Por eso revisamos señales combinadas: ACOS, TACoS, conversión, precio, stock, ranking y competencia.",
        bullets: [
          "Detectar productos ganadores y productos que drenan presupuesto.",
          "Evitar rupturas de stock que dañan posicionamiento.",
          "Corregir listings antes de escalar anuncios.",
          "Separar crecimiento sano de crecimiento artificial.",
        ],
      },
      {
        title: "Cómo reportamos",
        text:
          "El reporting tiene que ayudar a decidir. Priorizamos lectura clara, cambios aplicados, impacto observado y próximos pasos.",
        bullets: [
          "Resumen ejecutivo de cuenta.",
          "Acciones realizadas y motivo.",
          "Métricas clave por producto o grupo.",
          "Siguientes prioridades por impacto.",
        ],
      },
    ],
    signals: [
      "Seller Central sin dueño claro",
      "Incidencias repetidas",
      "Stock y PPC desconectados",
      "Catálogo con errores",
      "Reporting poco accionable",
    ],
    faqs: [
      {
        question: "¿Podéis gestionar solo una parte de la cuenta?",
        answer:
          "Sí, aunque recomendamos revisar la cuenta completa para no optimizar una parte mientras otra limita el resultado.",
      },
      {
        question: "¿Trabajáis con FBA y FBM?",
        answer:
          "Sí. De hecho muchas estrategias rentables combinan FBA y FBM para proteger ventas, stock y ranking.",
      },
      {
        question: "¿También resolvéis incidencias?",
        answer:
          "Podemos ayudar a detectar, ordenar y acompañar incidencias, aunque algunas dependen de los tiempos y criterios de Amazon.",
      },
    ],
  },
  {
    slug: "agencia-ppc-amazon",
    title: "Agencia PPC Amazon",
    metaTitle: "Agencia PPC Amazon para bajar ACOS y escalar ventas rentables",
    metaDescription:
      "Gestión PPC Amazon Ads para optimizar campañas, reducir ACOS, mejorar ROAS y escalar ventas con estructura por producto, margen y keyword.",
    eyebrow: "Amazon Ads con criterio",
    hero: "PPC Amazon que no solo compra ventas: construye rentabilidad.",
    intro:
      "Amazon Ads puede acelerar una cuenta o esconder problemas durante meses. Gestionamos PPC desde la estructura, la intención de búsqueda y el margen, no desde subir o bajar pujas a ciegas.",
    intent:
      "Para vendedores que buscan agencia PPC Amazon, optimización de campañas, reducción de ACOS o escalado de publicidad con control.",
    primaryCta: "Auditar mis campañas PPC",
    sections: [
      {
        title: "Qué miramos en una auditoría PPC",
        text:
          "Antes de tocar presupuesto analizamos estructura, términos de búsqueda, campañas automáticas, manuales, branded, defensa, conquista y rentabilidad por producto.",
        bullets: [
          "ACOS, ROAS, TACoS y margen por ASIN.",
          "Keywords que convierten y términos que drenan presupuesto.",
          "Campañas mezcladas que impiden leer datos.",
          "Pujas, ubicaciones, concordancias y negativos.",
        ],
      },
      {
        title: "Cómo optimizamos Amazon Ads",
        text:
          "La optimización combina limpieza, reasignación de presupuesto y nuevas hipótesis. No se trata de apagar todo lo que gasta, sino de entender qué inversión merece crecer.",
        bullets: [
          "Separación por intención, producto y fase de embudo.",
          "Cosecha de términos rentables.",
          "Negativización de tráfico irrelevante.",
          "Escalado progresivo en productos con margen.",
        ],
      },
      {
        title: "PPC y listing van juntos",
        text:
          "Si el listing no convierte, el PPC se encarece. Por eso revisamos imagen principal, precio, reviews, contenido A+ y oferta antes de forzar más inversión.",
        bullets: [
          "Mejora de CTR con imagen y posicionamiento.",
          "Conversión antes de escalado agresivo.",
          "Lectura conjunta de sesiones, pedidos y gasto.",
          "Test por producto, no decisiones generales.",
        ],
      },
    ],
    signals: [
      "ACOS subiendo",
      "ROAS estancado",
      "Campañas sin estructura",
      "Keywords sin control",
      "TACoS fuera de objetivo",
    ],
    faqs: [
      {
        question: "¿Garantizáis bajar el ACOS?",
        answer:
          "No prometemos una cifra sin revisar la cuenta. Primero vemos margen, conversión y estructura para definir un objetivo realista.",
      },
      {
        question: "¿Se puede escalar sin disparar el gasto?",
        answer:
          "Sí, cuando hay productos y términos con datos suficientes. El escalado se hace por bloques, no aumentando presupuesto sin lectura.",
      },
      {
        question: "¿Trabajáis Sponsored Products, Brands y Display?",
        answer:
          "Sí, pero elegimos formatos según objetivo, madurez de cuenta y margen disponible.",
      },
    ],
  },
  {
    slug: "auditoria-cuenta-amazon",
    title: "Auditoría de cuenta Amazon",
    metaTitle: "Auditoría de cuenta Amazon gratis | Detecta fugas de ventas y margen",
    metaDescription:
      "Auditoría de cuenta Amazon para revisar PPC, listings, conversión, stock, precio, catálogo y oportunidades de crecimiento rentable.",
    eyebrow: "Diagnóstico antes de ejecutar",
    hero: "Auditoría de cuenta Amazon para saber qué está frenando tus ventas.",
    intro:
      "Una auditoría de cuenta Amazon sirve para dejar de adivinar. Revisamos dónde se escapa el dinero, qué productos tienen más potencial y qué acciones deberían priorizarse antes de invertir más.",
    intent:
      "Para empresas que quieren una revisión profesional de su cuenta Amazon antes de contratar gestión, escalar PPC o lanzar nuevos productos.",
    primaryCta: "Solicitar auditoría gratuita",
    sections: [
      {
        title: "Áreas que revisamos",
        text:
          "Miramos la cuenta como un sistema. Si una pieza falla, el resto paga el coste: PPC, listing, precio, stock, catálogo o reputación.",
        bullets: [
          "Publicidad: estructura, gasto, términos, ACOS y TACoS.",
          "Listings: SEO, imagen principal, bullets, A+ y conversión.",
          "Operativa: stock, FBA/FBM, Buy Box e incidencias.",
          "Mercado: competidores, precios, reviews y oportunidades.",
        ],
      },
      {
        title: "Qué recibes",
        text:
          "La auditoría no busca impresionar con datos, sino darte claridad. Priorizamos hallazgos que pueden convertirse en acciones.",
        bullets: [
          "Lectura de problemas por impacto.",
          "Oportunidades rápidas y oportunidades estratégicas.",
          "Riesgos que pueden limitar crecimiento.",
          "Recomendación de siguientes pasos.",
        ],
      },
      {
        title: "Cuándo conviene pedirla",
        text:
          "Conviene pedirla cuando hay ventas pero falta rentabilidad, cuando PPC se vuelve difícil de leer o cuando vas a tomar una decisión importante.",
        bullets: [
          "Antes de aumentar inversión publicitaria.",
          "Antes de lanzar un nuevo producto.",
          "Cuando cae la conversión o el ranking.",
          "Cuando quieres entender si la cuenta está bien gestionada.",
        ],
      },
    ],
    signals: [
      "Ventas sin margen",
      "Gasto PPC poco claro",
      "Conversión baja",
      "Stock irregular",
      "Catálogo con oportunidades",
    ],
    faqs: [
      {
        question: "¿La auditoría tiene coste?",
        answer:
          "La primera auditoría es gratuita. Sirve para detectar si existe una oportunidad clara y cómo podríamos ayudarte.",
      },
      {
        question: "¿Cuánto tarda?",
        answer:
          "Depende del tamaño de la cuenta, pero una primera lectura puede hacerse de forma ágil si tenemos acceso o datos exportados.",
      },
      {
        question: "¿Necesito tener muchas ventas?",
        answer:
          "No necesariamente. Lo importante es que haya producto, datos o una hipótesis comercial que podamos evaluar.",
      },
    ],
  },
  {
    slug: "optimizacion-listings-amazon",
    title: "Optimización de listings Amazon",
    metaTitle: "Optimización de listings Amazon: SEO, imágenes y conversión",
    metaDescription:
      "Optimización de listings Amazon para mejorar SEO, CTR, conversión, imágenes, bullets, contenido A+ y posicionamiento orgánico.",
    eyebrow: "SEO y conversión en Amazon",
    hero: "Listings que convierten mejor cada clic que ya estás pagando o ganando.",
    intro:
      "El listing es el punto donde se decide si el tráfico compra o se va. Optimizamos títulos, bullets, imágenes, A+, keywords y propuesta de valor para que el producto compita mejor.",
    intent:
      "Para marcas que buscan optimización de listings Amazon, SEO Amazon, mejora de conversión o rediseño de imágenes de producto.",
    primaryCta: "Revisar mis listings",
    sections: [
      {
        title: "Qué optimizamos",
        text:
          "La optimización combina SEO, persuasión, claridad visual y lectura competitiva. No basta con meter keywords si la ficha no convence.",
        bullets: [
          "Título con keyword, beneficio y claridad comercial.",
          "Bullets orientados a objeciones, usos y diferenciación.",
          "Imágenes e infografías para aumentar CTR y conversión.",
          "Contenido A+ para reforzar marca, confianza y comparación.",
        ],
      },
      {
        title: "Por qué afecta al PPC",
        text:
          "Un listing débil encarece cada venta. Si mejoras CTR y conversión, las campañas pueden aprovechar mejor el presupuesto.",
        bullets: [
          "Más conversión con el mismo tráfico.",
          "Mejor lectura de campañas por producto.",
          "Menos gasto desperdiciado por ficha poco convincente.",
          "Más posibilidades de ranking orgánico sostenido.",
        ],
      },
      {
        title: "Cómo priorizamos productos",
        text:
          "No todos los listings merecen el mismo esfuerzo. Priorizamos los que tienen tráfico, margen, potencial o señales claras de bloqueo.",
        bullets: [
          "ASINs con sesiones y baja conversión.",
          "Productos con inversión PPC relevante.",
          "Listings con buena demanda y mal contenido.",
          "Productos estratégicos para la categoría.",
        ],
      },
    ],
    signals: [
      "Mucho tráfico, pocas ventas",
      "CTR bajo",
      "Imagen principal débil",
      "Bullets genéricos",
      "A+ sin estrategia",
    ],
    faqs: [
      {
        question: "¿También hacéis imágenes para Amazon?",
        answer:
          "Sí. Podemos definir la estructura visual, infografías y narrativa de beneficios para mejorar la conversión.",
      },
      {
        question: "¿Optimizar listings ayuda al SEO de Amazon?",
        answer:
          "Sí, porque mejora relevancia, conversión y rendimiento. Amazon combina muchas señales, y el contenido es una parte importante.",
      },
      {
        question: "¿Cuántos productos conviene optimizar primero?",
        answer:
          "Normalmente empezamos por los ASINs con más impacto potencial: tráfico, margen, inversión PPC o valor estratégico.",
      },
    ],
  },
  {
    slug: "amazon-fba-fbm",
    title: "Amazon FBA y FBM",
    metaTitle: "Estrategia Amazon FBA y FBM para proteger ventas, stock y margen",
    metaDescription:
      "Estrategia Amazon FBA/FBM para marcas que quieren gestionar stock, logística, ranking, Buy Box y crecimiento sin perder ventas.",
    eyebrow: "Logística que protege crecimiento",
    hero: "FBA y FBM bien coordinados para no frenar ventas cuando la demanda sube.",
    intro:
      "La logística en Amazon no es solo enviar producto. Afecta al ranking, la Buy Box, la experiencia del cliente y la capacidad de sostener campañas. Una estrategia FBA/FBM evita que el crecimiento se rompa por stock o tiempos.",
    intent:
      "Para empresas que venden con Amazon FBA, FBM o una estrategia híbrida y quieren mejorar stock, continuidad de ventas y rentabilidad.",
    primaryCta: "Revisar mi estrategia FBA/FBM",
    sections: [
      {
        title: "Por qué FBA y FBM importan en crecimiento",
        text:
          "Cuando un producto empieza a traccionar, el stock se convierte en una palanca estratégica. Quedarse sin disponibilidad puede dañar ranking y ventas futuras.",
        bullets: [
          "Planificación de stock según demanda y campañas.",
          "Uso de FBM como respaldo para proteger ventas.",
          "Lectura de Buy Box, precio y disponibilidad.",
          "Coordinación entre logística, PPC y ranking.",
        ],
      },
      {
        title: "Estrategia híbrida",
        text:
          "No siempre hay que elegir entre FBA y FBM. En algunos casos, combinarlos permite vender más estable, reaccionar mejor y reducir riesgos.",
        bullets: [
          "FBA para velocidad, Prime y conversión.",
          "FBM para continuidad ante rupturas o limitaciones.",
          "Ajustes por producto, margen y capacidad operativa.",
          "Decisiones conectadas con publicidad y pricing.",
        ],
      },
      {
        title: "Qué revisamos",
        text:
          "Analizamos si la logística está ayudando o limitando la cuenta. Muchas veces el problema no está en el anuncio, sino en stock, precio o disponibilidad.",
        bullets: [
          "Histórico de stock y ventas perdidas.",
          "Impacto de disponibilidad en ranking.",
          "Costes logísticos y margen por canal.",
          "Riesgos antes de escalar campañas.",
        ],
      },
    ],
    signals: [
      "Rupturas de stock",
      "Ranking inestable",
      "Buy Box irregular",
      "FBA saturado",
      "FBM sin estrategia",
    ],
    faqs: [
      {
        question: "¿FBM puede ayudar aunque use FBA?",
        answer:
          "Sí. En algunos productos, FBM funciona como respaldo para evitar perder ventas cuando FBA se queda corto.",
      },
      {
        question: "¿La logística afecta al PPC?",
        answer:
          "Muchísimo. Si no hay stock o la oferta pierde atractivo, la publicidad puede gastar peor y convertir menos.",
      },
      {
        question: "¿Revisáis margen logístico?",
        answer:
          "Sí. La estrategia debe tener sentido en ventas y margen, no solo en volumen.",
      },
    ],
  },
];

export const seoPagesBySlug = Object.fromEntries(
  seoLandingPages.map((page) => [page.slug, page])
) as Record<string, SeoLandingPage>;
