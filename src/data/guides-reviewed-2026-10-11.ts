import type { Guide } from './guides';

// Reviewed publication batch; no imports from the draft collection.
export const reviewedGuides: Guide[] = [
  {
    "slug": "cpc-alto-amazon-ads",
    "path": "/guias/cpc-alto-amazon-ads/",
    "updatedAt": "2026-10-11",
    "title": "CPC alto en Amazon Ads: qué revisar antes de bajar todas las pujas",
    "metaTitle": "CPC alto Amazon Ads: diagnóstico y decisiones de puja",
    "description": "Investiga una subida del coste por clic con campañas y contextos comparables. Separa cambios de distribución, configuración y economía antes de reducir todas las pujas.",
    "category": "Publicidad",
    "service": "/servicios/gestion-de-ppc/",
    "answer": "Un CPC más alto no demuestra por sí solo que la publicidad sea menos rentable. Identifica dónde sube, qué tráfico estás comprando y qué ocurre después del clic. Compara campañas equivalentes, revisa cambios de puja y ubicación y relaciona el coste con la contribución del producto. No bajes todas las pujas a partir del promedio de la cuenta.",
    "table": {
      "caption": "Una subida de CPC puede exigir decisiones diferentes",
      "headings": [
        "Situación",
        "Comprobación",
        "Decisión posible"
      ],
      "rows": [
        [
          "Sube el promedio de cuenta",
          "Mezcla de productos y contextos.",
          "Separar grupos antes de actuar."
        ],
        [
          "Sube tras un ajuste",
          "Historial de estrategia y multiplicadores.",
          "Revisar el cambio concreto."
        ],
        [
          "Clic caro con compras viables",
          "Economía y estabilidad del resultado.",
          "Mantener prueba con límites."
        ],
        [
          "Clic caro sin encaje",
          "Término, objetivo y oferta.",
          "Reducir exposición o corregir relevancia."
        ]
      ]
    },
    "sections": [
      {
        "id": "calculo",
        "title": "Compara el coste por clic con el mismo alcance",
        "paragraphs": [
          "Amazon define CPC como coste dividido por clics y explica que en una subasta intervienen factores además de la puja. No confundas la puja que has configurado con el importe medio que acabas pagando. El promedio necesita contexto para poder interpretarse.",
          "Al agrupar campañas, calcula coste total dividido por clics totales compatibles; no hagas una media simple de CPC. Conserva periodo, moneda y formato. Si se ha invertido más en una referencia con clics caros, puede cambiar el promedio sin que suba el CPC de las otras."
        ],
        "source": 0
      },
      {
        "id": "cambios",
        "title": "Localiza qué configuración o contexto cambió",
        "paragraphs": [
          "Consulta el historial de pujas, estrategia, ajustes por ubicación y objetivos activados. Anota también fechas de promociones y modificaciones de presupuesto. Una subida observada después de varios cambios simultáneos no permite identificar una causa única.",
          "Separa tráfico de marca, genérico y objetivos de producto cuando esa clasificación sea pertinente. Comparar esos contextos como si fueran intercambiables puede llevar a frenar captación útil o a conservar tráfico que solo parece barato."
        ]
      },
      {
        "id": "economia",
        "title": "Evalúa lo que deja el clic, no solo lo que cuesta",
        "paragraphs": [
          "Relaciona resultados atribuidos con el margen de la referencia y la madurez del dato. Un producto con mejor economía puede asumir un clic distinto, pero no uses su margen para justificar pérdidas de otro. Documenta costes desconocidos antes de calcular límites.",
          "Un CPC bajo tampoco es un objetivo suficiente: puede corresponder a búsquedas irrelevantes. Valora gasto, pedidos, contribución y el propósito de la prueba juntos. No fijamos un CPC correcto para toda una categoría ni prometemos que bajar pujas mantenga ventas."
        ]
      },
      {
        "id": "actuacion",
        "title": "Haz una corrección localizada y revisable",
        "paragraphs": [
          "Elige el grupo con evidencia de desajuste y define qué cambiarás, por qué y cuándo revisarás. Si el problema es de oferta o stock, reducir puja no lo resuelve. Evita modificar todo a la vez si quieres entender el efecto de cada actuación.",
          "En una auditoría gratuita, Amazon Boost puede separar estos escenarios y acordar límites de inversión. La salida útil es una decisión por contexto, con sus datos y riesgos, no una regla automática aplicada al promedio de la cuenta."
        ]
      }
    ],
    "checklist": [
      "Cálculo y alcance comparables.",
      "Campañas y productos separados.",
      "Historial de configuración revisado.",
      "Relevancia del tráfico contrastada.",
      "Economía y atribución comprobadas.",
      "Cambio localizado con revisión prevista."
    ],
    "faqs": [
      {
        "question": "¿Un CPC alto siempre es malo?",
        "answer": "No. Depende de relevancia y economía del resultado. No concluyas rentabilidad usando únicamente el coste por clic."
      },
      {
        "question": "¿La puja es el CPC que pago?",
        "answer": "No son lo mismo. Revisa estrategia, ajustes y los datos de coste y clics de la campaña."
      },
      {
        "question": "¿Bajo todas las pujas si sube el promedio?",
        "answer": "No sin identificar qué grupos explican la subida. Un promedio puede cambiar por la mezcla de tráfico."
      }
    ],
    "related": [
      "acos-tacos-amazon",
      "presupuesto-amazon-ads",
      "ctr-bajo-amazon-ads",
      "amazon-ads-clics-sin-ventas"
    ],
    "sources": [
      {
        "label": "Amazon Ads: coste por clic y subastas",
        "url": "https://advertising.amazon.com/en-gb/library/guides/cost-per-click",
        "note": "La definición de CPC no establece un coste óptimo para todas las categorías."
      }
    ]
  },
  {
    "slug": "ctr-bajo-amazon-ads",
    "path": "/guias/ctr-bajo-amazon-ads/",
    "updatedAt": "2026-10-11",
    "title": "CTR bajo en Amazon Ads: cómo revisar relevancia y presentación",
    "metaTitle": "CTR bajo Amazon Ads: impresiones, clics e imagen del producto",
    "description": "Diagnostica un CTR bajo con segmentación, ubicación y oferta comparables. Revisa presentación y relevancia sin confundir más clics con más ventas rentables.",
    "category": "Publicidad",
    "service": "/servicios/gestion-de-ppc/",
    "relatedServices": [
      "/servicios/imagenes-para-amazon/"
    ],
    "answer": "El CTR relaciona clics e impresiones. Un valor bajo puede invitar a revisar contexto, relevancia y presentación, pero no señala por sí solo una imagen mala. Separa formatos y ubicaciones, comprueba qué oferta se muestra y valora después conversión y costes. Conseguir más clics no es el objetivo si atraen compradores equivocados.",
    "table": {
      "caption": "Cuatro situaciones con lecturas diferentes",
      "headings": [
        "Señal",
        "Qué revisar",
        "Qué evitar"
      ],
      "rows": [
        [
          "Muchas impresiones, pocos clics",
          "Contexto y ajuste de la oferta a la intención.",
          "Culpar al diseño sin comprobar segmentación."
        ],
        [
          "Clics aumentan, pedidos no",
          "Promesa del anuncio y decisión en la ficha.",
          "Declarar éxito solo por un CTR mayor."
        ],
        [
          "Cambia el promedio",
          "Mezcla de campañas y ubicaciones.",
          "Comparar promedios con composición distinta."
        ],
        [
          "Pocas impresiones",
          "Suficiencia del dato y estado de distribución.",
          "Sacar una conclusión firme de una muestra pequeña."
        ]
      ]
    },
    "sections": [
      {
        "id": "medida",
        "title": "Calcula y compara el CTR dentro del mismo contexto",
        "paragraphs": [
          "Amazon define CTR como clics divididos por impresiones. Para expresarlo en porcentaje, multiplica esa relación por cien. Revisa el mismo periodo y alcance; no compares una campaña de vídeo y una de producto como si tuvieran presentación y distribución idénticas.",
          "Si analizas grupos juntos, utiliza los clics e impresiones totales compatibles, no una media simple de porcentajes de tamaños diferentes. No existe un umbral universal que permita llamar bueno o malo al CTR de todas las categorías y ubicaciones."
        ],
        "source": 0
      },
      {
        "id": "relevancia",
        "title": "La oferta debe encajar con lo que el comprador busca",
        "paragraphs": [
          "Revisa términos, objetivos y contexto del tráfico. Un pack, tamaño o uso distinto de la necesidad buscada puede tener poca respuesta aunque la fotografía sea buena. Comprueba también cómo cambió la distribución de impresiones durante el periodo.",
          "Nuestra propuesta es clasificar los contextos observados como encaje claro, duda de encaje o desajuste verificable. No negativices a ciegas solo porque el porcentaje sea bajo; considera gasto, resultados y el aprendizaje que aporta ese grupo."
        ]
      },
      {
        "id": "presentacion",
        "title": "Revisa imagen y datos de la oferta sin exagerar el producto",
        "paragraphs": [
          "Observa la representación disponible en móvil: si se reconoce el artículo, su formato y su cantidad. El precio, entrega y otras señales visibles también influyen en la decisión. Un cambio de CTR no puede atribuirse automáticamente a la imagen si se modificaron esas condiciones.",
          "Plantea una revisión con un motivo concreto, como distinguir mejor la unidad o evitar confundir accesorios. Respeta requisitos de imagen principal y no añadas elementos no incluidos para llamar la atención. Si hay herramientas de experimentación disponibles, comprueba elegibilidad y alcance antes de medir."
        ]
      },
      {
        "id": "resultado",
        "title": "La mejora debe continuar después del clic",
        "paragraphs": [
          "Contrasta qué sucede con los pedidos, la contribución y el coste. Una creatividad puede atraer curiosidad y reducir relevancia de compradores. Mantén registrados versión visual, precio, stock y promociones para interpretar el resultado.",
          "Amazon Boost puede revisar anuncios e imágenes en una auditoría gratuita y decidir si el problema está antes o después del clic. No prometemos una mejora porcentual de CTR ni consideramos rentable una campaña solo porque gane atención."
        ],
        "bullets": [
          "Contexto de impresiones identificado.",
          "Desajustes de intención documentados.",
          "Cambio visual con hipótesis concreta.",
          "Clics, compras y economía valorados juntos."
        ]
      }
    ],
    "checklist": [
      "Clics e impresiones del mismo alcance.",
      "Formatos y ubicaciones separados.",
      "Muestra suficiente para la conclusión.",
      "Oferta e intención contrastadas.",
      "Cambios visuales registrados.",
      "Resultado después del clic comprobado."
    ],
    "faqs": [
      {
        "question": "¿Qué CTR es bueno en Amazon?",
        "answer": "Depende del contexto y del formato. Compáralo con grupos equivalentes y con la calidad de los resultados, sin adoptar una cifra universal."
      },
      {
        "question": "¿Debo cambiar la imagen si el CTR es bajo?",
        "answer": "No sin revisar relevancia, formato y condiciones de oferta. La imagen es una hipótesis posible, no la causa demostrada por el porcentaje."
      },
      {
        "question": "¿Un CTR más alto mejora automáticamente el ranking orgánico?",
        "answer": "No demuestra por sí mismo una mejora orgánica. Valora resultados comerciales y exposición con un análisis independiente y sus límites."
      }
    ],
    "related": [
      "imagenes-amazon-requisitos",
      "amazon-ads-clics-sin-ventas",
      "tests-ab-listings-amazon",
      "cpc-alto-amazon-ads"
    ],
    "sources": [
      {
        "label": "Amazon Ads: definición de click-through rate",
        "url": "https://advertising.amazon.com/en-ca/resources/faq",
        "note": "La definición de CTR no establece un porcentaje óptimo universal."
      }
    ]
  },
  {
    "slug": "infografias-packs-cantidades-amazon",
    "path": "/guias/infografias-packs-cantidades-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Cómo mostrar packs y cantidades en Amazon sin confundir al comprador",
    "metaTitle": "Infografías Amazon: packs, cantidad incluida y tamaño real",
    "description": "Prepara imágenes secundarias que expliquen unidades, cantidad y accesorios incluidos en Amazon. Alinea pack, atributos y variante para reducir dudas de compra.",
    "category": "Contenido visual",
    "service": "/servicios/imagenes-para-amazon/",
    "relatedServices": [
      "/servicios/optimizacion-de-listados/"
    ],
    "answer": "El comprador debe distinguir número de unidades, contenido de cada unidad y accesorios incluidos. Representa el pack exacto y revisa la variante seleccionada. Una infografía secundaria puede aclararlo, pero no corrige atributos contradictorios ni permite saltarse las reglas de imagen principal. Evita que el atrezzo parezca parte de la compra.",
    "table": {
      "caption": "Tres cantidades diferentes que conviene separar",
      "headings": [
        "Dato",
        "Pregunta",
        "Cómo comprobarlo"
      ],
      "rows": [
        [
          "Número de unidades",
          "¿Cuántas piezas o envases recibo?",
          "Comparar pack físico y referencia seleccionada."
        ],
        [
          "Contenido por unidad",
          "¿Qué cantidad tiene cada envase?",
          "Verificar medida y unidad del etiquetado."
        ],
        [
          "Contenido total",
          "¿Qué cantidad suma el pack?",
          "Calcular sin mezclar formatos o unidades."
        ],
        [
          "Accesorios",
          "¿Qué incluye y qué es opcional?",
          "Contrastar caja, instrucciones y oferta."
        ]
      ]
    },
    "sections": [
      {
        "id": "datos",
        "title": "Empieza por una ficha de contenido incluida",
        "paragraphs": [
          "Anota referencia, unidades, contenido por unidad, medidas relevantes y accesorios. La ficha física, el título y los atributos deben describir lo mismo. Si se ha cambiado un pack, revisa qué versión está realmente en inventario antes de cambiar las imágenes.",
          "Amazon describe la ficha como una combinación de información del producto e información de la oferta. Al completar el catálogo, revisa los campos de cantidad que admite la plantilla de tu categoría. No inventes un atributo o una unidad para que el pack parezca mayor; confirma cómo se expresa su contenido en el mercado de destino."
        ],
        "source": 0
      },
      {
        "id": "imagen",
        "title": "La imagen secundaria debe resolver una duda concreta",
        "paragraphs": [
          "Nuestra propuesta de composición es mostrar las unidades incluidas, un rótulo breve de cantidad y un detalle cuando el tamaño pueda confundirse. Una línea que explique qué contiene el paquete suele ser más útil que acumular sellos y eslóganes.",
          "No repitas el mismo objeto en una escena si se puede interpretar como más unidades de las que se entregan. Si muestras un accesorio no incluido, comprueba que el recurso y sus aclaraciones no inducen a error y cumplen la política. El diseño no sustituye fidelidad al producto."
        ]
      },
      {
        "id": "coherencia",
        "title": "Comprueba cada variante, no solo la imagen de la familia",
        "paragraphs": [
          "Una familia puede incluir formatos con cantidades diferentes. Abre cada referencia y verifica título, atributos e imágenes que ve el comprador al seleccionarla. No des por hecho que el contenido se actualiza correctamente para toda la familia.",
          "Revisa también móvil, donde una explicación pequeña puede no leerse. Compara unidades y escala visual de forma honesta, sin alterar proporciones para hacer un producto más grande. Si utilizas una medida, asegúrate de que corresponde a la dimensión mostrada y al producto embalado o sin embalaje, según lo indicado."
        ]
      },
      {
        "id": "seguimiento",
        "title": "Utiliza dudas y devoluciones como señales de revisión",
        "paragraphs": [
          "Agrupa motivos de consulta o devolución que mencionen cantidad, tamaño o accesorios, sin publicar datos personales. Son señales para revisar la claridad de la oferta, no una prueba automática de que una nueva infografía eliminará las devoluciones.",
          "La auditoría gratuita de Amazon Boost puede identificar contradicciones entre imagen, contenido y variantes. El objetivo es que la oferta se entienda mejor; la producción de recursos y su validación se concretan según alcance."
        ],
        "bullets": [
          "Contenido del paquete confirmado.",
          "Una duda por imagen secundaria.",
          "Variantes revisadas individualmente.",
          "Motivos de confusión documentados sin datos personales."
        ]
      }
    ],
    "checklist": [
      "Pack físico contrastado.",
      "Unidades y contenido separados.",
      "Accesorios incluidos identificados.",
      "Título y atributos coherentes.",
      "Cada variante revisada en móvil.",
      "Imágenes conformes y sin atrezzo engañoso."
    ],
    "faqs": [
      {
        "question": "¿Puedo añadir texto de cantidad a la imagen principal?",
        "answer": "Revisa las reglas de imagen principal del producto y mercado. Esta guía propone aclaraciones en recursos secundarios, no autoriza sobreimpresiones en la principal."
      },
      {
        "question": "¿Una misma infografía sirve para todos los packs?",
        "answer": "Solo si describe fielmente todas las referencias donde se utiliza. Si cambian unidades o medidas, prepara contenido específico y comprueba su asociación."
      },
      {
        "question": "¿Una infografía puede corregir un atributo incorrecto?",
        "answer": "No. Debes corregir el origen del dato y mantener título, atributos e imágenes alineados. El comprador no debería tener que decidir qué versión es la verdadera."
      }
    ],
    "related": [
      "imagenes-amazon-requisitos",
      "variantes-amazon-parent-child",
      "reducir-devoluciones-amazon",
      "brief-fotografia-producto-amazon"
    ],
    "sources": [
      {
        "label": "Amazon: estructura y atributos de las fichas de producto",
        "url": "https://sell.amazon.com/blog/amazon-product-listings",
        "note": "Referencia general. Consulta requisitos de imagen y campos de cantidad en la categoría y marketplace de destino."
      }
    ]
  },
  {
    "slug": "brief-fotografia-producto-amazon",
    "path": "/guias/brief-fotografia-producto-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Cómo preparar un briefing de fotografía de producto para Amazon",
    "metaTitle": "Brief de fotografía Amazon: producto, tomas y entregables",
    "description": "Encarga imágenes con una lista de tomas, producto real y dudas de compra concretas. Define cantidades, accesorios y entregables para evitar repetir una sesión de fotografía.",
    "category": "Contenido visual",
    "service": "/servicios/imagenes-para-amazon/",
    "relatedServices": [
      "/servicios/optimizacion-de-listados/"
    ],
    "answer": "Un buen briefing fotográfico indica qué debe entender el comprador en cada imagen y qué producto real hay que mostrar. Envía una muestra correcta, identifica variantes y accesorios incluidos y define tomas y entregables antes de la sesión. La imagen principal, las secundarias y el A+ tienen funciones y requisitos distintos; no encargues un conjunto de fotos bonitas sin una función comercial concreta.",
    "table": {
      "caption": "Lista de tomas basada en decisiones del comprador",
      "headings": [
        "Pregunta",
        "Toma propuesta",
        "Control"
      ],
      "rows": [
        [
          "¿Qué estoy comprando?",
          "Producto y cantidad reales.",
          "Accesorios incluidos identificados."
        ],
        [
          "¿Qué tamaño tiene?",
          "Escala o medida pertinente.",
          "Proporciones sin distorsión."
        ],
        [
          "¿Cómo se utiliza?",
          "Uso real y seguro del producto.",
          "Sin capacidades inventadas."
        ],
        [
          "¿Qué detalle lo diferencia?",
          "Detalle verificable.",
          "Respaldo y legibilidad en móvil."
        ]
      ]
    },
    "sections": [
      {
        "id": "muestra",
        "title": "Prepara la muestra que recibirá el comprador",
        "paragraphs": [
          "Utiliza una unidad representativa del producto que vas a vender y comprueba color, acabado, etiqueta y embalaje. Distingue prototipo de versión final. Si el diseño cambia después de fotografiar, anota qué recursos deben revisarse en lugar de publicarlos por inercia.",
          "Envía una lista de componentes y accesorios incluidos. Los objetos de ambientación deben identificarse como tales y cumplir los requisitos de la imagen donde se utilicen. No permitas que una composición sugiera una cantidad o complemento que el comprador no recibirá."
        ]
      },
      {
        "id": "tomas",
        "title": "Asigna una función a cada fotografía",
        "paragraphs": [
          "Amazon explica distintos enfoques de fotografía de producto y la importancia de representar el artículo con precisión. Elige tomas según las dudas de compra: identificación, escala, uso, detalle o embalaje. No necesitas repetir el mismo ángulo para completar un número de imágenes.",
          "Separa imagen principal de contenido secundario y comprueba las reglas vigentes de la categoría. Una toma ambientada válida para una secundaria no debe asumirse válida para la principal. La referencia visual de otra marca es inspiración, no autorización para copiar su composición o materiales."
        ],
        "source": 0
      },
      {
        "id": "entregables",
        "title": "Acuerda variantes y archivos antes de producir",
        "paragraphs": [
          "Define referencias, fondos, formatos, versiones y destinos. Pide archivos con calidad adecuada para la publicación y conserva originales cuando se acuerde. Identifica cada entrega por producto y versión para evitar intercambiar colores o tamaños.",
          "Comprueba derechos de uso de imágenes, modelos y materiales externos con quienes corresponda. Si se retoca una fotografía, no debe cambiar características reales del artículo. La edición puede mejorar presentación, pero no crear evidencia falsa de tamaño, resultado o seguridad."
        ]
      },
      {
        "id": "validacion",
        "title": "Revisa una muestra de publicación en móvil",
        "paragraphs": [
          "Comprueba reconocimiento del producto, legibilidad y coherencia de cantidades en el tamaño de uso. Contrasta las fotos con título, variantes e infografías. Un archivo nítido visto a pantalla completa puede no resolver la pregunta del comprador en una miniatura.",
          "Amazon Boost puede revisar el briefing y la secuencia visual en una auditoría gratuita. El objetivo es representar mejor la oferta y reducir dudas; no garantizamos un aumento porcentual de conversión por producir una sesión."
        ]
      }
    ],
    "checklist": [
      "Muestra final representativa.",
      "Componentes y ambientación diferenciados.",
      "Pregunta comercial por toma.",
      "Requisitos de cada destino verificados.",
      "Variantes, versiones y derechos acordados.",
      "Revisión móvil contra la oferta real."
    ],
    "faqs": [
      {
        "question": "¿Puedo fotografiar un prototipo?",
        "answer": "Solo con sus límites claros y revisando antes de publicar que represente el producto final. No muestres diferencias que el comprador no recibirá."
      },
      {
        "question": "¿Todas las imágenes deben usar el mismo formato?",
        "answer": "No necesariamente. Define su destino y requisitos actuales y acuerda las versiones necesarias."
      },
      {
        "question": "¿El retoque puede añadir características?",
        "answer": "No debe inventarlas. Mantén fidelidad a producto, cantidad, proporciones y capacidades demostrables."
      }
    ],
    "related": [
      "imagenes-amazon-requisitos",
      "infografias-packs-cantidades-amazon",
      "contenido-a-plus-amazon"
    ],
    "sources": [
      {
        "label": "Amazon: enfoques y fidelidad de la fotografía de producto",
        "url": "https://sell.amazon.com/blog/product-photos",
        "note": "Guía visual general. Confirma las reglas actuales de categoría y destino; el briefing propuesto no es una plantilla obligatoria de Amazon."
      }
    ]
  },
  {
    "slug": "preparar-datos-auditoria-amazon",
    "path": "/guias/preparar-datos-auditoria-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Qué datos preparar para una auditoría de Amazon sin compartir de más",
    "metaTitle": "Datos para una auditoría Amazon: informes, alcance y acceso",
    "description": "Prepara una auditoría de cuenta con un resumen de objetivos, ventas, costes y stock. Comparte solo la información necesaria y evita contraseñas o datos de compradores.",
    "category": "Contratar una agencia",
    "service": "/servicios/auditoria-de-cuenta/",
    "relatedServices": [
      "/servicios/gestion-de-cuenta/"
    ],
    "answer": "Para una primera auditoría no hace falta enviar todas las exportaciones de tu negocio. Empieza por objetivo, mercados, productos prioritarios y problema observado. Después acuerda los informes y periodos necesarios para contrastarlo. No compartas la contraseña principal ni datos de compradores sin necesidad; cualquier acceso a la cuenta debe tener un alcance definido.",
    "table": {
      "caption": "Información proporcionada según la pregunta de la auditoría",
      "headings": [
        "Pregunta",
        "Datos útiles",
        "No necesitas enviar por defecto"
      ],
      "rows": [
        [
          "¿Qué limita las ventas?",
          "Productos y evolución de tráfico y pedidos.",
          "Identidad y direcciones de compradores."
        ],
        [
          "¿La publicidad encaja con el margen?",
          "Gasto, atribución y costes de referencias.",
          "Credenciales bancarias."
        ],
        [
          "¿La logística frena el canal?",
          "Stock y estados por referencia.",
          "Todo el histórico sin seleccionar."
        ],
        [
          "¿Qué debería priorizarse?",
          "Objetivo, límites y actuaciones recientes.",
          "Acceso total sin responsabilidades acordadas."
        ]
      ]
    },
    "sections": [
      {
        "id": "pregunta",
        "title": "Define qué quieres decidir después de la auditoría",
        "paragraphs": [
          "Explica qué vendes, dónde y qué problema quieres entender. Diferencia un lanzamiento sin ventas de una cuenta con pedidos y rentabilidad insuficiente. Añade restricciones reales: plazo de reposición, presupuesto disponible o capacidad de preparación.",
          "Nuestra propuesta es limitar el primer resumen a productos prioritarios y una cronología de cambios recientes. No necesitas un dossier perfecto para solicitar la auditoría gratuita. Puedes empezar con la URL de marca o producto y describir qué te preocupa; después concretamos qué información hace falta."
        ]
      },
      {
        "id": "informes",
        "title": "Comparte periodos y definiciones, no cifras sueltas",
        "paragraphs": [
          "Indica de qué informe sale cada cifra, mercado, moneda y periodo. Los informes de negocio y los de publicidad tienen alcances distintos; una captura de ventas no responde por sí sola cuánto deja el canal. Conserva la fecha de extracción para interpretar cambios posteriores.",
          "Si la pregunta se centra en stock, añade estados por SKU. Si trata de publicidad, define el alcance de campañas y atribución. Cuando falten costes, márcalos como pendientes: no rellenes huecos con estimaciones presentadas como datos reales."
        ],
        "source": 0
      },
      {
        "id": "acceso",
        "title": "Acuerda qué información y permisos son necesarios",
        "paragraphs": [
          "Evita enviar contraseñas, códigos de verificación o documentos completos de compradores para una revisión comercial inicial. Utiliza resúmenes o archivos depurados cuando sirvan para responder la pregunta. Revisa también pestañas ocultas y columnas que no aportan al análisis.",
          "Si la revisión requiere acceso, acuerda quién entra, para qué y con qué permisos. Utiliza el mecanismo apropiado de Seller Central para usuarios o proveedores y confirma sus opciones actuales. No consideres una petición de acceso total como requisito automático de una auditoría."
        ],
        "source": 1
      },
      {
        "id": "resultado",
        "title": "Pide hallazgos, límites y siguientes pasos",
        "paragraphs": [
          "El resultado debería diferenciar hechos observados, hipótesis y datos que faltan. Para cada prioridad, interesa saber por qué se propone, qué habría que validar y qué servicio o actuación puede abordarla. Una cifra sin contexto no es una recomendación.",
          "Amazon Boost utiliza la auditoría gratuita y sin compromiso para entender el punto de partida y el encaje de la colaboración. No garantiza ventas ni presupone contratar gestión integral. Si el problema queda fuera de nuestro alcance, debe indicarse en lugar de ocultarlo detrás de un diagnóstico genérico."
        ]
      }
    ],
    "checklist": [
      "Objetivo y mercados definidos.",
      "Referencias prioritarias seleccionadas.",
      "Periodo, moneda e informe identificados.",
      "Costes desconocidos señalados.",
      "Archivos sin información innecesaria.",
      "Alcance y siguientes decisiones acordados."
    ],
    "faqs": [
      {
        "question": "¿Puedo pedir la auditoría sin tener todos los informes?",
        "answer": "Sí. Empieza explicando marca, productos y problema. Después se concreta qué datos hacen falta para contrastar la situación."
      },
      {
        "question": "¿Necesitáis mi contraseña de Seller Central?",
        "answer": "No compartas la contraseña principal. Si hace falta acceso, se define y autoriza mediante los mecanismos adecuados de la cuenta."
      },
      {
        "question": "¿Pedir la auditoría obliga a contratar?",
        "answer": "No. La auditoría inicial de Amazon Boost es gratuita y sin compromiso; sirve para entender prioridades y valorar el encaje."
      }
    ],
    "related": [
      "ventas-beneficio-amazon",
      "cuanto-cuesta-agencia-amazon",
      "primer-mes-agencia-amazon-prioridades",
      "agencia-amazon-vs-consultor"
    ],
    "sources": [
      {
        "label": "Amazon: informes de negocio y alcance de sus métricas",
        "url": "https://sell.amazon.com/blog/amazon-business-reports",
        "note": "Referencia de informes, no lista obligatoria de documentos para contratar Amazon Boost. La preparación propuesta es criterio editorial propio."
      },
      {
        "label": "Amazon: gestión de acceso y permisos de Seller Central",
        "url": "https://sell.amazon.com/tools/seller-central",
        "note": "Referencia de control de acceso. Confirma las opciones disponibles para tu cuenta; no compartas la contraseña principal."
      }
    ]
  },
  {
    "slug": "calendario-estacional-amazon",
    "path": "/guias/calendario-estacional-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Calendario estacional de Amazon: coordina demanda, stock y campañas",
    "metaTitle": "Calendario estacional Amazon: planificación para marcas",
    "description": "Planifica temporadas relevantes para tu producto sin depender solo de Prime Day o Navidad. Conecta fechas de demanda, preparación, reposición y límites de inversión.",
    "category": "Crecimiento",
    "service": "/servicios/gestion-de-cuenta/",
    "relatedServices": [
      "/servicios/gestion-de-ppc/"
    ],
    "answer": "Un calendario comercial útil empieza por cuándo necesita el comprador tu producto, no por una lista de eventos de Amazon. Contrasta estacionalidad, disponibilidad y plazos internos y prepara contenido, reposición y campañas hacia atrás desde la demanda esperada. Las fechas oficiales de eventos deben verificarse cada año; una temporada no garantiza ventas ni justifica acumular stock sin límites.",
    "table": {
      "caption": "Plan de temporada con decisiones previas",
      "headings": [
        "Momento",
        "Decisión",
        "Condición de salida"
      ],
      "rows": [
        [
          "Investigación",
          "Qué temporada importa para el producto.",
          "Evidencia y mercado concretos."
        ],
        [
          "Preparación",
          "Contenido, costes y elegibilidad.",
          "Oferta preparada y responsables."
        ],
        [
          "Abastecimiento",
          "Cantidad y fecha viable de llegada.",
          "Plazos y riesgo documentados."
        ],
        [
          "Activación y cierre",
          "Inversión y lectura posterior.",
          "Límites y criterio de revisión."
        ]
      ]
    },
    "sections": [
      {
        "id": "demanda",
        "title": "Distingue temporada de producto y evento promocional",
        "paragraphs": [
          "Una referencia puede responder a verano, vuelta a la rutina o un uso profesional sin depender de una gran promoción. Contrasta periodos anteriores y señales de demanda de tu mercado. Las herramientas de investigación de Amazon permiten explorar tendencias, pero su disponibilidad no sustituye el conocimiento de tu producto.",
          "No extrapoles un pico aislado provocado por una oferta, falta de competencia o cambio de catálogo. Anota qué condiciones acompañaron ese periodo y qué parte no puedes reproducir. Tampoco copies el calendario de otro país sin confirmar relevancia local."
        ],
        "source": 0
      },
      {
        "id": "plazos",
        "title": "Trabaja hacia atrás desde una oferta disponible",
        "paragraphs": [
          "Define cuándo debería estar comprable el producto y qué tiene que suceder antes: fabricación, preparación, transporte, recepción y revisión de la ficha. Añade la incertidumbre que conoces en cada paso en vez de dar por exacta la primera fecha prometida.",
          "Asigna responsables a contenido, costes y abastecimiento. Un anuncio listo sin inventario utilizable no completa el plan. Si el plazo no permite una llegada razonable, valora un alcance menor o esperar; no prometas entrega que tu operación no puede sostener."
        ]
      },
      {
        "id": "limites",
        "title": "Prepara escenarios de demanda y stock sobrante",
        "paragraphs": [
          "Plantea un escenario prudente y otro de mayor demanda, señalando sus supuestos. Calcula qué ocurriría con la contribución y el inventario si la promoción vende menos de lo previsto. La reposición debe considerar también la salida posterior a la temporada.",
          "El presupuesto de captación y el descuento deben evaluarse juntos. No dupliques las expectativas porque publicidad y promoción tengan objetivos separados. Comprueba condiciones y fechas oficiales dentro de la cuenta antes de solicitar una participación concreta."
        ]
      },
      {
        "id": "aprendizaje",
        "title": "Cierra la temporada con datos que sirvan al siguiente plan",
        "paragraphs": [
          "Registra disponibilidad real, cambios de precio, gasto, pedidos y stock restante. Distingue resultado observado de hipótesis sobre lo que lo causó. La caída posterior a una temporada puede ser esperable y no demuestra por sí sola un problema del canal.",
          "Amazon Boost puede coordinar estas decisiones en una auditoría gratuita y en la gestión de cuenta. No publicamos fechas inventadas de próximos eventos ni garantizamos un volumen de pedidos por participar en una campaña estacional."
        ]
      }
    ],
    "checklist": [
      "Temporada del producto identificada.",
      "Mercado y evidencia contrastados.",
      "Fechas oficiales verificadas cuando proceda.",
      "Plazos y responsables documentados.",
      "Riesgo de stock sobrante previsto.",
      "Cierre con datos comparables."
    ],
    "faqs": [
      {
        "question": "¿Toda marca necesita participar en Prime Day?",
        "answer": "No. Evalúa encaje, elegibilidad, stock y economía. Un evento conocido no es motivo suficiente para participar."
      },
      {
        "question": "¿Puedo reutilizar las fechas del año anterior?",
        "answer": "No como fechas confirmadas. Consulta cada edición y usa únicamente información oficial vigente."
      },
      {
        "question": "¿Cómo sé cuánto stock enviar?",
        "answer": "Relaciona demanda, cobertura, plazos y escenarios. Ninguna previsión elimina el riesgo de exceso o falta de stock."
      }
    ],
    "related": [
      "evitar-roturas-stock-amazon",
      "cupones-promociones-amazon",
      "presupuesto-amazon-ads",
      "cantidad-primer-lote-amazon"
    ],
    "sources": [
      {
        "label": "Amazon: tendencias y estacionalidad en la investigación de productos",
        "url": "https://sell.amazon.com/blog/product-opportunity-explorer",
        "note": "Referencia de investigación, no calendario oficial de eventos. Los plazos y escenarios propuestos deben construirse con datos propios."
      }
    ]
  },
  {
    "slug": "cantidad-primer-lote-amazon",
    "path": "/guias/cantidad-primer-lote-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Cuántas unidades pedir para el primer lote de una marca en Amazon",
    "metaTitle": "Primer lote Amazon: cantidad, MOQ y riesgo de inventario",
    "description": "Decide un primer lote con escenarios de demanda, plazos y coste total. Distingue el mínimo del proveedor de la cantidad que puedes validar y sostener en Amazon.",
    "category": "Crecimiento",
    "service": "/servicios/lanzamiento-marca-privada-amazon/",
    "relatedServices": [
      "/servicios/auditoria-de-cuenta/"
    ],
    "answer": "No existe una cantidad universal para el primer lote. Decide con demanda investigada, plazos, coste completo y riesgo asumible, no solo por el descuento del proveedor. Su mínimo de pedido es una condición comercial, no una previsión de ventas. Prepara escenarios y reserva recursos para contenido, logística y captación; comprar mercancía no completa la preparación del canal.",
    "table": {
      "caption": "Datos para discutir una cantidad sin inventar ventas",
      "headings": [
        "Dato",
        "Pregunta",
        "Decisión"
      ],
      "rows": [
        [
          "Demanda",
          "¿Qué sabemos y qué sigue siendo hipótesis?",
          "Acotar el escenario de salida."
        ],
        [
          "Proveedor",
          "¿Qué mínimos y plazos son reales?",
          "Comparar condiciones documentadas."
        ],
        [
          "Economía",
          "¿Qué cuesta poner el lote vendible?",
          "No decidir solo por coste unitario."
        ],
        [
          "Continuidad",
          "¿Qué pasa si vende lento o más rápido?",
          "Preparar revisión y reposición."
        ]
      ]
    },
    "sections": [
      {
        "id": "demanda",
        "title": "Separa datos de intención y pedidos propios",
        "paragraphs": [
          "La investigación de Amazon puede orientar sobre necesidades y tendencias, pero no convierte una señal agregada en pedidos para tu marca. Delimita producto y mercado y documenta qué parte de la expectativa es una hipótesis.",
          "Para una cuenta sin histórico, reconoce la incertidumbre. No utilices el volumen de un nicho como si pudieras capturarlo completo ni una venta de otra marca como demanda asegurada. La cantidad debe responder a un plan de validación, no a una cifra atractiva."
        ],
        "source": 0
      },
      {
        "id": "proveedor",
        "title": "Pide condiciones comparables al proveedor",
        "paragraphs": [
          "Nuestra propuesta es solicitar por escrito cantidad, precio, preparación, entrega y condiciones relevantes para cada alternativa. Si el mínimo obliga a más unidades de las que puedes validar, plantea otras opciones sin presentar su disponibilidad como segura.",
          "Un coste por unidad menor puede exigir mayor desembolso y más inventario inmovilizado. Compara costes totales y condiciones con responsables adecuados. No recomendamos asumir deuda ni garantizamos retorno por comprar un lote mayor."
        ]
      },
      {
        "id": "preparacion",
        "title": "Incluye el coste de poner el lote a la venta",
        "paragraphs": [
          "Contempla muestras, documentación, embalaje, fotografías, envío, recepción y publicidad según el caso. Mantén partidas confirmadas separadas de estimaciones. Si una condición de producto sigue pendiente, no compenses el riesgo aumentando cantidad.",
          "Considera capacidad, vida útil y disponibilidad logística. La primera compra no debe consumir todos los recursos necesarios para activar y mantener una oferta. Revisa los compromisos con tus responsables financieros y operativos."
        ]
      },
      {
        "id": "escenarios",
        "title": "Define qué revisarás antes de repetir la compra",
        "paragraphs": [
          "Construye escenarios de salida prudente y de mayor demanda, indicando supuestos y costes de exceso o rotura. Registra qué dato permitiría cambiar cantidad o reposición después de la prueba. No fijamos un número de días de cobertura válido para todo producto.",
          "Amazon Boost puede revisar preparación y alcance del lanzamiento en una auditoría gratuita. No certificamos una cantidad rentable ni garantizamos vender el primer lote: ayudamos a ordenar datos, incógnitas y decisiones del canal."
        ]
      }
    ],
    "checklist": [
      "Producto y mercado delimitados.",
      "Datos e hipótesis de demanda separados.",
      "Condiciones del proveedor documentadas.",
      "Coste completo del lote estimado con límites.",
      "Preparación y recursos restantes revisados.",
      "Escenarios y revisión de reposición definidos."
    ],
    "faqs": [
      {
        "question": "¿Hay un primer pedido ideal de cien o mil unidades?",
        "answer": "No universalmente. Depende de demanda, costes, requisitos, plazos y capacidad propia."
      },
      {
        "question": "¿El MOQ del proveedor demuestra cuánto venderé?",
        "answer": "No. Es una condición comercial del suministro, no una previsión de demanda de tu marca."
      },
      {
        "question": "¿Más descuento justifica siempre un lote mayor?",
        "answer": "No. Compara desembolso, preparación, riesgo de inventario y recursos necesarios para sostener el canal."
      }
    ],
    "related": [
      "cuanto-cuesta-lanzar-en-amazon",
      "cuando-no-lanzar-en-amazon",
      "lanzar-segunda-referencia-amazon",
      "tarifas-fba-calcular-rentabilidad"
    ],
    "sources": [
      {
        "label": "Amazon: límites de la investigación de oportunidades de producto",
        "url": "https://sell.amazon.com/tools/product-opportunity-explorer",
        "note": "No prescribe MOQ ni cantidad de compra. La comparación de condiciones y escenarios es una propuesta editorial propia, no asesoramiento financiero."
      }
    ]
  },
  {
    "slug": "lanzar-segunda-referencia-amazon",
    "path": "/guias/lanzar-segunda-referencia-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Cuándo lanzar una segunda referencia de tu marca en Amazon",
    "metaTitle": "Segunda referencia Amazon: ampliar catálogo sin dispersarse",
    "description": "Valora una segunda referencia con encaje de marca, demanda y capacidad operativa. Separa complementariedad de duplicación antes de comprometer stock, contenido y publicidad.",
    "category": "Crecimiento",
    "service": "/servicios/lanzamiento-marca-privada-amazon/",
    "relatedServices": [
      "/servicios/gestion-de-cuenta/"
    ],
    "answer": "Lanzar una segunda referencia tiene sentido si responde a una necesidad clara y puedes financiarla y gestionarla sin debilitar la primera. Define si completa un uso, atiende otra necesidad o mejora una propuesta existente. Contrasta demanda y economía por separado; vender bien un producto no demuestra que otro vaya a heredar sus ventas, reseñas o posicionamiento.",
    "table": {
      "caption": "Preguntas para aprobar una ampliación de catálogo",
      "headings": [
        "Decisión",
        "Evidencia",
        "Motivo para posponer"
      ],
      "rows": [
        [
          "Necesidad",
          "Pregunta de compra que la referencia resuelve.",
          "Solo cambia la presentación sin razón comercial."
        ],
        [
          "Economía",
          "Costes y escenario propio del producto.",
          "El éxito del primero sustituye al cálculo."
        ],
        [
          "Capacidad",
          "Stock, contenidos y inversión disponibles.",
          "Consume recursos críticos de la oferta actual."
        ],
        [
          "Validación",
          "Prueba y criterio de continuidad.",
          "No hay forma de interpretar su resultado."
        ]
      ]
    },
    "sections": [
      {
        "id": "necesidad",
        "title": "Escribe qué añade al catálogo actual",
        "paragraphs": [
          "Formula la necesidad del comprador y la diferencia respecto al producto existente. Una referencia complementaria puede ampliar un uso; una alternativa puede competir con lo que ya vendes. Considera ambos efectos antes de llamar crecimiento a cualquier aumento de ASIN.",
          "No construyas variantes artificiales para intentar compartir reseñas. Determina la estructura de catálogo permitida por la categoría y la identidad real del producto. La decisión comercial y la configuración técnica deben ser coherentes, no resolverse copiando la ficha anterior."
        ]
      },
      {
        "id": "demanda",
        "title": "Valida la oportunidad con datos del nuevo producto",
        "paragraphs": [
          "Amazon ofrece herramientas de investigación para contrastar necesidades y tendencias. Comprueba qué contexto representan sus datos y qué puedes observar por tu cuenta. Un producto sugerido por una herramienta no implica que tu marca tenga demanda asegurada.",
          "Separa lo que sabes de tu cliente actual de lo que solo imaginas del siguiente. Las señales de compra o dudas sobre la primera referencia pueden orientar la investigación, pero no sustituyen un análisis del nuevo precio, competencia y requisito de uso."
        ],
        "source": 0
      },
      {
        "id": "capacidad",
        "title": "Calcula el compromiso adicional de recursos",
        "paragraphs": [
          "Incluye desarrollo, primer lote, preparación, imágenes, contenido, publicidad y gestión. Evalúa qué ocurre si el producto tarda en vender. No traslades su riesgo a un stock insuficiente del artículo que ya mantiene el canal.",
          "Define qué partes se reutilizan de verdad y cuáles necesitan validación nueva. Un proveedor común o un envase parecido no asegura igualdad de tarifas, requisitos o conversión. Mantén separados sus costes y decisiones de inversión."
        ]
      },
      {
        "id": "lanzamiento",
        "title": "Prepara una prueba que permita decidir continuidad",
        "paragraphs": [
          "Acota el lanzamiento y registra los cambios del catálogo y publicidad. Observa resultado de la nueva referencia y del conjunto: una subida de ventas de una puede coincidir con caída de la otra. No atribuyas esa relación sin evidencia suficiente.",
          "En la auditoría gratuita, Amazon Boost puede revisar si ampliar ahora tiene sentido o si primero conviene estabilizar la cuenta. La propuesta de nuestra agencia boutique debe justificar el siguiente producto, no recomendar catálogo nuevo por rutina."
        ]
      }
    ],
    "checklist": [
      "Necesidad adicional definida.",
      "Estructura de catálogo válida.",
      "Demanda investigada con límites.",
      "Economía propia calculada.",
      "Recursos de la primera referencia protegidos.",
      "Prueba y continuidad acordadas."
    ],
    "faqs": [
      {
        "question": "¿El segundo producto hereda las reseñas del primero?",
        "answer": "No debes darlo por hecho ni crear relaciones artificiales para conseguirlo. Usa solo estructuras de variantes válidas."
      },
      {
        "question": "¿Debo lanzar más referencias si la primera vende bien?",
        "answer": "No automáticamente. Revisa necesidad, economía y capacidad operativa de la ampliación."
      },
      {
        "question": "¿Una referencia complementaria siempre aumenta ventas totales?",
        "answer": "No. Puede cambiar la composición del catálogo y consumir recursos. Evalúa la nueva referencia y el conjunto."
      }
    ],
    "related": [
      "lanzar-producto-amazon-checklist",
      "cuando-no-lanzar-en-amazon",
      "cantidad-primer-lote-amazon",
      "variantes-amazon-parent-child"
    ],
    "sources": [
      {
        "label": "Amazon: investigación para desarrollar nuevos productos",
        "url": "https://sell.amazon.com/blog/new-product-success",
        "note": "Información sobre herramientas de investigación; no valida un producto concreto ni garantiza transferencia de resultados entre referencias."
      }
    ]
  },
  {
    "slug": "primer-mes-agencia-amazon-prioridades",
    "path": "/guias/primer-mes-agencia-amazon-prioridades/",
    "updatedAt": "2026-10-11",
    "title": "Primer mes con una agencia Amazon: acuerda prioridades y evidencia de trabajo",
    "metaTitle": "Primer mes agencia Amazon: prioridades, accesos y revisión",
    "description": "Prepara un inicio de gestión con tareas, acceso y datos comparables. Acordad prioridades y revisión sin prometer una subida de ventas en 30 días ni cambiar toda la cuenta de golpe.",
    "category": "Contratar una agencia",
    "service": "/agencia-amazon/",
    "relatedServices": [
      "/servicios/auditoria-de-cuenta/",
      "/servicios/gestion-de-cuenta/"
    ],
    "answer": "El inicio de gestión debe dejar un alcance compartido, acceso autorizado, datos de partida y pocas prioridades ejecutables. Acordad qué se revisa, quién aprueba y cómo se registra el trabajo. No evalúes el primer mes solo por facturación ni exijas cambiar todo para aparentar actividad. Los resultados dependen del punto de partida; una actuación o aprobación pendiente debe identificarse sin prometer que estará resuelta en treinta días.",
    "table": {
      "caption": "Propuesta editorial de inicio; no calendario contractual de Amazon Boost",
      "headings": [
        "Bloque",
        "Entrega que acordar",
        "Dependencia"
      ],
      "rows": [
        [
          "Alcance",
          "Referencias, países y tareas incluidos.",
          "Información y responsables de la marca."
        ],
        [
          "Acceso",
          "Permisos necesarios y verificados.",
          "Autorización adecuada, sin contraseñas compartidas."
        ],
        [
          "Partida",
          "Métricas y estados con fecha.",
          "Datos comparables y limitaciones visibles."
        ],
        [
          "Prioridades",
          "Acción, aprobación y revisión.",
          "Stock, contenido o decisión externa pendientes."
        ]
      ]
    },
    "sections": [
      {
        "id": "alcance",
        "title": "Concretad el trabajo antes de cambiar nada",
        "paragraphs": [
          "Dejad por escrito mercados, catálogo, servicio y exclusiones. Identificad quién puede aprobar precios, materiales, inversión y actuaciones que afectan a producto o logística. Esta guía propone una conversación de inicio, no un contrato o compromiso universal de plazos.",
          "Separad honorarios, presupuesto publicitario y costes adicionales. Una instrucción de gestionar PPC no equivale a asumir compras de stock o certificaciones. Las responsabilidades que quedan en la marca también necesitan alguien que pueda atenderlas."
        ]
      },
      {
        "id": "acceso",
        "title": "Preparad acceso y datos con mínimo necesario",
        "paragraphs": [
          "Usad usuarios autorizados y comprobaciones de permisos según cuenta y tarea. Amazon permite gestionar permisos de Seller Central; ese acceso técnico no sustituye aprobación comercial ni convierte a la agencia en titular de la cuenta.",
          "Para una primera revisión, preparad datos agregados y contexto sin contraseñas ni información personal de compradores. Registrad qué información falta y por qué importa. No inventéis un diagnóstico completo para evitar reconocer una dependencia pendiente."
        ],
        "source": 0
      },
      {
        "id": "prioridades",
        "title": "Elegid actuaciones que cierren un problema concreto",
        "paragraphs": [
          "Separad incidencias que impiden vender, mejoras de oferta y pruebas de crecimiento. Ordenad cada una por impacto esperado, evidencia y capacidad de ejecución. Una tarea dependiente de soporte o fabricante no debe presentarse como plenamente controlable por la agencia.",
          "Definid estado inicial, hipótesis, cambio y condición de revisión. Evitad modificar catálogo, precio y campañas indiscriminadamente para demostrar movimiento. La actividad visible no sustituye decisiones justificadas ni permite atribuir después todas las ventas al nuevo proveedor."
        ]
      },
      {
        "id": "revision",
        "title": "Revisad trabajo, decisiones y resultados por separado",
        "paragraphs": [
          "Comprobad qué se ejecutó, qué quedó pendiente y qué datos permiten observar un cambio. Mantened periodos y definiciones comparables y contexto de promociones o falta de stock. Un primer periodo corto no demuestra causalidad ni una tendencia permanente.",
          "Amazon Boost puede empezar por una auditoría gratuita y concretar un alcance adecuado a tu marca. No garantizamos aumento de facturación en el primer mes: buscamos claridad sobre prioridades, responsabilidades y evidencia antes de comprometer una estrategia de crecimiento."
        ]
      }
    ],
    "checklist": [
      "Alcance y exclusiones acordados.",
      "Responsables y aprobaciones definidos.",
      "Acceso individual pertinente comprobado.",
      "Partida y limitaciones documentadas.",
      "Pocas prioridades con dependencia y revisión.",
      "Trabajo y resultado evaluados por separado."
    ],
    "faqs": [
      {
        "question": "¿La agencia debería cambiar toda la cuenta al comenzar?",
        "answer": "No. Primero necesita una lectura de partida y prioridades justificadas; un cambio masivo puede impedir interpretar resultados."
      },
      {
        "question": "¿Tiene que prometer más ventas en treinta días?",
        "answer": "No. Debe concretar trabajo y dependencias, sin garantizar resultados que también dependen de oferta, demanda y terceros."
      },
      {
        "question": "¿Este calendario forma parte del servicio contratado?",
        "answer": "No por sí solo. Es una propuesta para preparar el inicio; entregables y plazos reales se acuerdan en cada servicio."
      }
    ],
    "related": [
      "preparar-datos-auditoria-amazon",
      "cuanto-cuesta-agencia-amazon",
      "cambiar-agencia-amazon",
      "agencia-amazon-vs-consultor"
    ],
    "sources": [
      {
        "label": "Amazon: acceso y permisos de usuarios de Seller Central",
        "url": "https://sell.amazon.com/tools/seller-central",
        "note": "Respalda el control de acceso, no el calendario propuesto. La estructura de inicio es un criterio editorial propio que debe adaptarse al servicio acordado."
      }
    ]
  },
  {
    "slug": "precio-producto-amazon-margen",
    "path": "/guias/precio-producto-amazon-margen/",
    "updatedAt": "2026-10-11",
    "title": "Cómo fijar el precio de un producto en Amazon sin perder margen",
    "metaTitle": "Precio de venta en Amazon: costes, promociones y margen",
    "description": "Prepara precios de Amazon con costes vigentes, contribución y oferta comparable. Evalúa descuentos, packs y automatización sin copiar el precio más bajo.",
    "category": "Rentabilidad",
    "service": "/servicios/gestion-de-cuenta/",
    "relatedServices": [
      "/consultoria-amazon/"
    ],
    "answer": "Para fijar el precio en Amazon necesitas dos referencias: cuánto deja el producto después de sus costes y cómo se compara su oferta real con alternativas equivalentes. Calcula por SKU y escenario, incluyendo promociones y publicidad. El precio más bajo del mercado no es automáticamente el precio adecuado para tu marca.",
    "table": {
      "caption": "Cuatro escenarios de precio que conviene calcular",
      "headings": [
        "Escenario",
        "Qué incluir",
        "Qué decidir"
      ],
      "rows": [
        [
          "Venta habitual",
          "Ingreso efectivo, producto y costes de venta.",
          "Qué contribución necesita la referencia."
        ],
        [
          "Promoción",
          "Descuento y cargos adicionales aplicables.",
          "Cuánto cuesta captar o mover cada unidad."
        ],
        [
          "Pack o variante",
          "Contenido, embalaje y tarifas de esa referencia.",
          "Si cambia realmente el margen por pedido."
        ],
        [
          "Reprecio automático",
          "Límites y reglas que afecten a la oferta.",
          "Qué cambios permites y cómo comprobarlos."
        ]
      ]
    },
    "sections": [
      {
        "id": "costes",
        "title": "Calcula con el precio efectivo y los costes aplicables",
        "paragraphs": [
          "Distingue el importe que paga el comprador del ingreso neto que utilizas para calcular contribución. Alinea impuestos y costes recuperables con tu responsable financiero; esta guía es operativa y no sustituye asesoramiento fiscal.",
          "Amazon explica que la comisión por referencia se aplica al precio total de venta según sus condiciones, incluyendo ciertos cargos pagados por el comprador. Consulta la categoría y tarifa actuales. No apliques un porcentaje aproximado al ingreso neto y des por calculado el coste real."
        ],
        "source": 0
      },
      {
        "id": "comparables",
        "title": "Compara ofertas equivalentes, no solo etiquetas de precio",
        "paragraphs": [
          "Revisa formato, unidades, cantidad, entrega y características relevantes para el comprador. Un pack y una unidad suelta no son equivalentes aunque aparezcan en la misma búsqueda. Utiliza precio por unidad de medida cuando ayude a entender la comparación.",
          "Nuestra propuesta es registrar un pequeño grupo de alternativas realmente comparables y explicar la diferencia de tu producto. No inventes calidad, certificaciones o beneficios para justificar un precio mayor. Comprueba si el listing hace visible el valor que la marca puede demostrar."
        ]
      },
      {
        "id": "escenarios",
        "title": "Un descuento debe tener su propio cálculo",
        "paragraphs": [
          "Recalcula el ingreso y los costes de cada promoción. Anota si el descuento ya se refleja en las ventas del informe para no restarlo dos veces. Incluye cargos promocionales aplicables, publicidad y cambios de devolución o rotación según datos disponibles.",
          "Calcula contribución antes y después de publicidad con criterios consistentes. Un aumento de unidades no compensa necesariamente el menor margen por unidad. Valora también stock y la finalidad concreta: prueba comercial, captación o reducción de exceso."
        ]
      },
      {
        "id": "control",
        "title": "Define límites y comprueba los cambios reales",
        "paragraphs": [
          "Si utilizas automatización de precios, verifica qué regla está activa y qué referencias afecta. Define límites a partir del cálculo de costes y prueba su comportamiento, sin suponer que un mínimo configurado incorpora por sí solo todos tus costes.",
          "Amazon Boost puede revisar precio, publicidad y operativa en una auditoría gratuita de la cuenta. El objetivo es encontrar una oferta sostenible y entendible; no garantizar la oferta destacada ni fijar un precio idéntico para todo el catálogo."
        ],
        "bullets": [
          "Precio y condiciones con fecha de revisión.",
          "Costes vigentes y tratamiento de impuestos consistente.",
          "Escenarios de promoción calculados por separado.",
          "Cambios contrastados con pedidos y contribución reales."
        ]
      }
    ],
    "checklist": [
      "Precio efectivo e ingreso neto diferenciados.",
      "Tarifas actuales del SKU consultadas.",
      "Comparables equivalentes seleccionados.",
      "Promoción calculada sin duplicar descuentos.",
      "Límites de automatización revisados.",
      "Contribución y stock comprobados después del cambio."
    ],
    "faqs": [
      {
        "question": "¿Tengo que ser el más barato para vender en Amazon?",
        "answer": "No necesariamente. Precio, entrega y propuesta de producto influyen en la elección. Revisa alternativas equivalentes y no sacrifiques margen por una comparación incompleta."
      },
      {
        "question": "¿Puedo aplicar el mismo descuento a todas las referencias?",
        "answer": "No sin calcularlo por producto. Coste de compra, logística, comisión, rotación y publicidad pueden cambiar entre variantes y packs."
      },
      {
        "question": "¿Un precio mínimo automático garantiza que no pierda dinero?",
        "answer": "No. Su protección depende de cómo se haya calculado y de qué costes o cambios contemple. Revisa los cargos y el precio efectivo resultante."
      }
    ],
    "related": [
      "tarifas-fba-calcular-rentabilidad",
      "ventas-beneficio-amazon",
      "cupones-promociones-amazon",
      "buy-box-amazon-oferta-destacada"
    ],
    "sources": [
      {
        "label": "Amazon España: precios y base de las comisiones por referencia",
        "url": "https://sell.amazon.es/precios",
        "note": "Verifica categoría, precio total, tarifas y recargos vigentes para tu producto."
      }
    ]
  },
  {
    "slug": "caida-ventas-amazon",
    "path": "/guias/caida-ventas-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Han bajado mis ventas en Amazon: cómo identificar el problema",
    "metaTitle": "Caída de ventas en Amazon: causas y diagnóstico por ASIN",
    "description": "Diagnostica una caída de ventas en Amazon separando tráfico, conversión, disponibilidad y precio. Localiza el ASIN afectado antes de cambiar toda la cuenta.",
    "category": "Rentabilidad",
    "service": "/servicios/gestion-de-cuenta/",
    "relatedServices": [
      "/servicios/gestion-de-ppc/"
    ],
    "answer": "Si bajan las ventas, identifica primero qué referencias y fechas explican la caída. Después separa menos visitas, menor conversión y periodos sin oferta disponible. Compara también precio, promociones y estacionalidad: un cambio de facturación no demuestra por sí solo que el posicionamiento haya empeorado.",
    "table": {
      "caption": "Cuatro lecturas de una caída de ventas",
      "headings": [
        "Señal",
        "Qué contrastar",
        "Siguiente comprobación"
      ],
      "rows": [
        [
          "Bajan visitas y pedidos",
          "Disponibilidad, publicidad y demanda comparable.",
          "Localizar qué fuente o referencia pierde exposición."
        ],
        [
          "Visitas similares, menos pedidos",
          "Oferta, contenido, entrega y precio final.",
          "Revisar la decisión de compra del producto afectado."
        ],
        [
          "Pedidos similares, menos facturación",
          "Precio efectivo y mezcla de referencias.",
          "Separar volumen de unidades y valor por pedido."
        ],
        [
          "Solo cae una variante",
          "Stock, relación de variantes y oferta seleccionada.",
          "Corregir el problema local antes de tocar toda la familia."
        ]
      ]
    },
    "sections": [
      {
        "id": "comparacion",
        "title": "Compara periodos que representen situaciones similares",
        "paragraphs": [
          "Anota marketplace, intervalo, referencias y definición de ventas utilizada. No mezcles pedidos, unidades, ingreso neto y desembolsos como si fueran la misma cifra. Revisa también el grado de actualización de cada informe.",
          "Compara días equivalentes cuando sea posible y registra campañas promocionales, cambios de precio, temporada y falta de stock. Un periodo excepcionalmente alto no es siempre una base razonable para medir la caída siguiente. La comparación necesita contexto, no solo una flecha roja."
        ]
      },
      {
        "id": "referencias",
        "title": "Encuentra qué ASIN explica la mayor parte del cambio",
        "paragraphs": [
          "Usa los informes de ventas y tráfico disponibles en Seller Central para bajar del total de cuenta a los productos. Amazon ofrece vistas por fecha y por ASIN; confirma qué columnas y alcance estás utilizando.",
          "Nuestra propuesta es ordenar la pérdida absoluta y después su proporción. Una referencia pequeña puede caer mucho en porcentaje sin explicar el problema de la cuenta. Separa variantes y comprueba si la sustitución entre ellas mantiene las unidades de la familia."
        ],
        "source": 0
      },
      {
        "id": "causa",
        "title": "Distingue exposición, compra y disponibilidad",
        "paragraphs": [
          "Si faltan visitas, revisa anuncios, oferta activa y contexto de demanda. Si las visitas se mantienen, contrasta precio final, entrega, contenido y dudas del comprador. Una captura aislada de una búsqueda no demuestra un cambio permanente de posición.",
          "Abre la oferta correcta con un contexto de entrega pertinente y comprueba variantes y stock. Registra también si dejaron de funcionar campañas, cupones o elementos del listing. Evita culpar a una actualización de algoritmo antes de comprobar los cambios que sí puedes observar."
        ]
      },
      {
        "id": "plan",
        "title": "Actúa sobre una causa comprobable y mide después",
        "paragraphs": [
          "Corrige primero incidencias que impiden comprar. Para otras hipótesis, decide una acción, su alcance y la fecha de revisión. Cambiar precios, imágenes y campañas a la vez puede dificultar saber qué resolvió el problema.",
          "En una auditoría gratuita, Amazon Boost revisa los datos de la marca junto con publicidad, catálogo y stock. Si la causa sigue abierta, lo indicamos como pendiente: no prometemos recuperar posiciones o ventas en un plazo fijo."
        ],
        "bullets": [
          "ASIN prioritario y cambio identificado.",
          "Hipótesis vinculada a una señal concreta.",
          "Acción y variable que debe mejorar.",
          "Periodo de seguimiento sin nuevas alteraciones innecesarias."
        ]
      }
    ],
    "checklist": [
      "Métricas y periodos equivalentes.",
      "Promociones y estacionalidad anotadas.",
      "ASIN que explica la caída localizado.",
      "Oferta y disponibilidad comprobadas.",
      "Tráfico y conversión separados.",
      "Primera acción y revisión definidas."
    ],
    "faqs": [
      {
        "question": "¿Una bajada de ventas significa que he perdido SEO en Amazon?",
        "answer": "No necesariamente. Puede cambiar la demanda, la publicidad, el precio o la disponibilidad. Necesitas contrastar exposición y pedidos antes de atribuirlo a posicionamiento."
      },
      {
        "question": "¿Debo aumentar publicidad para recuperar las ventas?",
        "answer": "Solo si el diagnóstico lo justifica y la oferta puede convertir con margen. Un problema de stock o de entrega no se resuelve con más presupuesto."
      },
      {
        "question": "¿Qué datos necesito para una primera revisión?",
        "answer": "Fechas, referencias afectadas y un resumen de cambios y métricas comparables. No hacen falta contraseñas ni datos personales de compradores para explicar la situación inicial."
      }
    ],
    "related": [
      "ventas-beneficio-amazon",
      "listing-amazon-visitas-sin-ventas",
      "buy-box-amazon-oferta-destacada",
      "amazon-ads-clics-sin-ventas"
    ],
    "sources": [
      {
        "label": "Amazon: informes de ventas y tráfico por fecha y ASIN",
        "url": "https://sell.amazon.com/blog/amazon-business-reports",
        "note": "La referencia explica vistas B2B y totales. Selecciona el alcance adecuado y confirma definiciones en tu marketplace."
      }
    ]
  },
  {
    "slug": "plan-reposicion-fba-amazon",
    "path": "/guias/plan-reposicion-fba-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Cómo preparar un plan de reposición FBA por producto",
    "metaTitle": "Plan de reposición FBA: cuándo pedir y cuánto enviar a Amazon",
    "description": "Calcula una reposición FBA con demanda, plazos, unidades vendibles y stock en tránsito. Decide cuándo pedir y qué lote enviar sin acumular exceso de inventario.",
    "category": "Operativa",
    "service": "/servicios/gestion-de-cuenta/",
    "answer": "Un plan de reposición FBA combina demanda prevista, plazo completo de suministro y unidades que estarán disponibles a tiempo. Calcula cuándo pedir y cuánto enviar por SKU, incluyendo producción, transporte y recepción. No repongas solo porque aparece una recomendación ni restes stock en tránsito como si ya pudiera venderse.",
    "table": {
      "caption": "Información mínima para una decisión de reposición",
      "headings": [
        "Dato",
        "Qué registrar",
        "Por qué importa"
      ],
      "rows": [
        [
          "Demanda",
          "Unidades por día y cambios previstos.",
          "Permite estimar consumo durante el plazo."
        ],
        [
          "Plazo completo",
          "Producción, preparación, transporte y recepción.",
          "Determina cuándo debe iniciarse la reposición."
        ],
        [
          "Stock",
          "Disponible, reservado, externo y en tránsito.",
          "Evita contar las mismas unidades dos veces."
        ],
        [
          "Restricciones",
          "Lote mínimo, caducidad y capacidad aplicable.",
          "Puede hacer inviable el lote teórico."
        ]
      ]
    },
    "sections": [
      {
        "id": "demanda",
        "title": "Prepara una previsión por referencia, no un promedio de marca",
        "paragraphs": [
          "Elige un periodo representativo de ventas y registra promociones, días sin disponibilidad y cambios de temporada. Si el producto estuvo agotado, sus ventas observadas no reflejan toda la demanda que podría haber tenido.",
          "Nuestra propuesta es trabajar con un escenario base y otro de tensión, explicando qué cambia en cada uno. Un lanzamiento sin histórico necesita lotes de prueba y revisión frecuente; no convierte la demanda de un competidor en una previsión propia."
        ]
      },
      {
        "id": "plazo",
        "title": "Cuenta el tiempo hasta que la unidad pueda venderse",
        "paragraphs": [
          "Suma las fases que correspondan: producción, preparación, salida, transporte y recepción. Una fecha de entrega al almacén no implica necesariamente disponibilidad inmediata para el comprador. Usa tus tiempos reales y sus variaciones, no un plazo universal.",
          "Como orientación operativa, el punto de pedido se relaciona con la demanda durante ese plazo más un colchón de seguridad. Ese colchón depende del riesgo de retraso, coste de stock y nivel de servicio que necesitas; no se obtiene copiando un número fijo de días."
        ]
      },
      {
        "id": "cantidad",
        "title": "Decide el lote contando inventario y restricciones",
        "paragraphs": [
          "Separa unidades vendibles, reservadas, pendientes y externas. Asigna una fecha estimada de disponibilidad a las reposiciones en curso antes de descontarlas de la necesidad. No cuentes el mismo stock en el proveedor y en tránsito como dos lotes.",
          "Amazon ofrece herramientas de gestión de inventario para revisar exceso, disponibilidad y rendimiento. Contrasta sus recomendaciones con capacidad vigente, lote mínimo del proveedor, caducidad y caja de tu empresa antes de confirmar el pedido."
        ],
        "source": 0
      },
      {
        "id": "revision",
        "title": "Revisa el plan cuando cambie la demanda o el suministro",
        "paragraphs": [
          "Actualiza el calendario si cambia precio, publicidad, promoción o plazo de entrega. Si vendes más rápido de lo previsto, no basta con repetir el último pedido; comprueba cuándo se agotaría el disponible y qué alternativas viables existen.",
          "Amazon Boost revisa reposición junto con publicidad y margen en la auditoría gratuita. Podemos ayudarte a priorizar referencias y evitar decisiones de stock desconectadas de la demanda; no garantizamos que desaparezca todo riesgo de retraso o rotura."
        ],
        "bullets": [
          "Pedido propuesto, unidades y fecha objetivo.",
          "Responsable de confirmar cada fase.",
          "Señales que obligan a recalcular.",
          "Seguimiento de disponible y exceso por SKU."
        ]
      }
    ],
    "checklist": [
      "Demanda con estacionalidad y promociones contrastadas.",
      "Plazo hasta disponibilidad registrado.",
      "Stock vendible y en tránsito separado.",
      "Colchón de seguridad justificado.",
      "Lote, caducidad, capacidad y caja revisados.",
      "Calendario y siguiente revisión definidos."
    ],
    "faqs": [
      {
        "question": "¿Cuántos días de inventario debo enviar a FBA?",
        "answer": "Depende de rotación, plazos, variabilidad y costes. No existe una cifra universal que proteja a la vez de roturas y exceso en todas las referencias."
      },
      {
        "question": "¿Debo seguir siempre la recomendación de reposición de Amazon?",
        "answer": "Úsala como información de partida y comprueba los datos y restricciones de tu negocio. La recomendación no sustituye tu planificación de suministro o caja."
      },
      {
        "question": "¿Puedo contar como disponible todo el stock en tránsito?",
        "answer": "No. Tiene una fecha y un riesgo de recepción. Incorpóralo a la previsión cuando razonablemente pueda venderse, manteniendo separados los estados de inventario."
      }
    ],
    "related": [
      "evitar-roturas-stock-amazon",
      "inventario-fba-baja-rotacion",
      "indice-rendimiento-inventario-ipi-amazon",
      "presupuesto-amazon-ads"
    ],
    "sources": [
      {
        "label": "Amazon España: herramientas y gestión del inventario",
        "url": "https://sell.amazon.es/aprender/gestion-inventario",
        "note": "Contexto de inventario; la planificación debe incorporar tus tiempos y restricciones reales."
      }
    ]
  },
  {
    "slug": "error-8541-amazon",
    "path": "/guias/error-8541-amazon/",
    "updatedAt": "2026-10-11",
    "title": "Error 8541 en Amazon: cómo revisar un conflicto de catálogo",
    "metaTitle": "Error 8541 Amazon: conflicto de atributos, EAN y ASIN",
    "description": "Qué comprobar ante el error 8541 de Amazon: identificador, ASIN encontrado y atributos contradictorios. Prepara la corrección sin cambiar datos reales ni crear duplicados.",
    "category": "Catálogo",
    "service": "/servicios/gestion-de-cuenta/",
    "relatedServices": [
      "/servicios/desbloqueos-amazon/"
    ],
    "answer": "El error 8541 señala un conflicto entre los datos enviados y una referencia que Amazon identifica en su catálogo. Comprueba el identificador y decide si el ASIN encontrado es realmente tu producto. Corrige tu envío si está equivocado o solicita una revisión con pruebas si el dato incorrecto está en el catálogo.",
    "table": {
      "caption": "Cómo separar las posibles causas del conflicto",
      "headings": [
        "Comprobación",
        "Qué observar",
        "Decisión"
      ],
      "rows": [
        [
          "Identificador",
          "EAN u otro GTIN del producto real.",
          "Corregir un código equivocado antes de reenviar."
        ],
        [
          "Identidad",
          "Marca, modelo, tamaño y contenido del ASIN sugerido.",
          "Confirmar coincidencia solo si es la misma referencia."
        ],
        [
          "Atributo",
          "Valor enviado y valor del catálogo.",
          "Determinar dónde está la discrepancia real."
        ],
        [
          "Evidencia",
          "Envase, documentación y datos consistentes.",
          "Preparar la corrección o solicitud de revisión adecuada."
        ]
      ]
    },
    "sections": [
      {
        "id": "aviso",
        "title": "Guarda el mensaje completo y el ASIN que señala",
        "paragraphs": [
          "Registra SKU, mercado, identificador, ASIN sugerido y atributo conflictivo. La explicación del equipo de Amazon relaciona el 8541 con una coincidencia de identificador y datos que no concuerdan; no lo interpretes como un bloqueo genérico de la cuenta.",
          "Conserva también el envío que generó el error y su fecha. Si usas un archivo de catálogo, comprueba la fila y el informe de procesamiento correspondientes. Así puedes identificar qué valor se envió realmente, no solo lo que aparece en una captura del editor."
        ],
        "source": 0
      },
      {
        "id": "identidad",
        "title": "¿La ficha encontrada representa el mismo producto?",
        "paragraphs": [
          "Compara identificador, marca, modelo, presentación y unidades. Si el producto es distinto, no adaptes sus atributos para forzar la coincidencia. Revisa primero la autenticidad y asignación del identificador y reúne evidencia de la referencia correcta.",
          "Si sí representa el mismo producto, contrasta el atributo señalado con envase y documentación. Un error en tu archivo y un dato incorrecto del catálogo requieren actuaciones diferentes. No copies un valor falso solo para que el sistema acepte el alta."
        ]
      },
      {
        "id": "corregir",
        "title": "Corrige el origen del conflicto o prepara la revisión",
        "paragraphs": [
          "Si tu envío contiene el error, utiliza el procedimiento aplicable para corregirlo de forma coherente con el producto. Si el conflicto está en el catálogo, prepara fotografías legibles y documentación auténtica que permitan identificar la discrepancia.",
          "Consulta las opciones de conciliación disponibles en la cuenta o el canal de soporte correspondiente. Los nombres de las herramientas pueden cambiar. La solicitud debe explicar un atributo concreto y su evidencia; repetir altas o crear un duplicado no garantiza resolverlo."
        ]
      },
      {
        "id": "seguimiento",
        "title": "Comprueba el resultado en catálogo y operativa",
        "paragraphs": [
          "Guarda el expediente y cada respuesta. Después de una corrección, verifica la ficha, las variantes, la oferta y el stock afectados. Confirma que el producto publicado sigue describiendo la referencia real y no una adaptación hecha solo para superar el mensaje.",
          "Amazon Boost puede revisar este diagnóstico en una auditoría gratuita. No garantizamos aprobación ni plazo de soporte; sí podemos ayudarte a ordenar la evidencia y separar el conflicto de identidad de una incidencia distinta."
        ],
        "bullets": [
          "Versión enviada e informe de error conservados.",
          "Pruebas vinculadas al atributo conflictivo.",
          "Corrección y respuesta documentadas.",
          "Oferta e inventario revisados tras el cambio."
        ]
      }
    ],
    "checklist": [
      "Aviso completo y envío original guardados.",
      "Identificador y ASIN sugerido contrastados.",
      "Producto exacto comparado por atributos.",
      "Origen de la discrepancia identificado.",
      "Pruebas auténticas preparadas.",
      "Ficha y operativa comprobadas después de corregir."
    ],
    "faqs": [
      {
        "question": "¿Borrar el listing y volver a crearlo soluciona el 8541?",
        "answer": "No es una solución universal. Si persiste el conflicto de identidad o atributo, puede reaparecer. Revisa además las consecuencias para ofertas e inventario antes de borrar nada."
      },
      {
        "question": "¿Puedo cambiar la marca para que coincida con el ASIN sugerido?",
        "answer": "No si deja de describir tu producto real. Determina si el identificador y el ASIN son correctos y solicita revisión cuando corresponda."
      },
      {
        "question": "¿8541 y ASIN duplicado significan lo mismo?",
        "answer": "No. El 8541 señala un conflicto de coincidencia y atributos. Puede estar relacionado con problemas de catálogo, pero necesita su propio diagnóstico."
      }
    ],
    "related": [
      "asin-duplicados-amazon",
      "exencion-gtin-amazon",
      "variantes-amazon-parent-child",
      "listing-suprimido-amazon"
    ],
    "sources": [
      {
        "label": "Equipo de Amazon España: explicación del código 8541",
        "url": "https://sellercentral.amazon.es/seller-forums/discussions/t/ea957e7c-3401-47a6-bba4-e3dc8b91166b",
        "note": "Explicación publicada por el equipo de Amazon. Confirma la herramienta y el procedimiento vigentes en tu cuenta; no implica un plazo de resolución."
      }
    ]
  }
];
