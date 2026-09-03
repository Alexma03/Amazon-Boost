export type ServicePage = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  promise: string;
  category: string;
  intro: string;
  needs: string[];
  scope: { title: string; text: string; items: string[] }[];
  deliverable: string;
  preparation: string[];
  faqs: { question: string; answer: string }[];
  guides: string[];
  related: string[];
  proof: 'organic' | 'team' | 'visual';
};

export const servicePages: ServicePage[] = [
  {
    path: '/servicios/gestion-de-cuenta/',
    title: 'Gestión de cuentas Amazon',
    metaTitle: 'Gestión de cuentas Amazon Seller Central | Amazon Boost',
    description: 'Delega la gestión de tu cuenta Amazon: catálogo, publicidad, contenido y stock conectados con una misma estrategia. Solicita un diagnóstico inicial.',
    promise: 'Delega la cuenta. Conserva el control.',
    category: 'Gestión integral',
    intro: 'Un equipo para conectar las decisiones de Seller Central con lo que necesita tu negocio. Trabajamos con marcas privadas en España y Europa, con prioridades claras e informes que explican qué cambia y por qué.',
    needs: ['La operativa absorbe a tu equipo.', 'Publicidad, catálogo y stock avanzan por separado.', 'Necesitas entender el margen antes de crecer.'],
    scope: [
      { title: 'Dirección de cuenta', text: 'Partimos de tu catálogo, tus recursos y tus objetivos. Acordamos qué delegas y qué decisiones necesitan tu aprobación.', items: ['Diagnóstico inicial y prioridades por ASIN.', 'Plan de trabajo compartido con responsables.', 'Informes de evolución y siguientes decisiones.'] },
      { title: 'Publicidad y conversión', text: 'El presupuesto no se decide al margen del producto. Coordinamos campañas, fichas y propuesta visual para trabajar sobre el mismo objetivo.', items: ['Estructura y seguimiento de campañas PPC.', 'SEO de listings e imágenes según el alcance.', 'Lectura conjunta de tráfico, pedidos y margen.'] },
      { title: 'Catálogo y disponibilidad', text: 'Cuidamos la operativa que sostiene las ventas y anticipamos los cambios que exige cada mercado.', items: ['Incidencias de catálogo y variantes.', 'Seguimiento de inventario FBA y FBM.', 'Coordinación de precios y expansión europea.'] },
    ],
    deliverable: 'Una cuenta con responsables, prioridades e información para decidir. Tú sabes qué está pasando; nosotros nos ocupamos de ejecutar el alcance acordado.',
    preparation: ['Enlace a tu marca o catálogo.', 'Países en los que vendes y modelo FBA o FBM.', 'Qué gestiona hoy tu equipo y qué quieres delegar.'],
    faqs: [
      { question: '¿Podéis gestionar toda la cuenta o solo una parte?', answer: 'Podemos abordar la gestión integral o un alcance concreto. Antes de empezar dejamos por escrito responsabilidades, entregables y coordinación con tu equipo.' },
      { question: '¿La inversión en Amazon Ads está incluida?', answer: 'El presupuesto publicitario y los honorarios son conceptos distintos. Los concretamos en la propuesta según el catálogo, los mercados y el trabajo necesario.' },
      { question: '¿Sigo siendo titular de la cuenta?', answer: 'Sí. La cuenta y sus activos siguen siendo tuyos. Cuando se necesite acceso, trabajamos con permisos delegados, sin pedirte que compartas tu contraseña.' },
      { question: '¿Cómo sabré qué se está haciendo?', answer: 'Acordamos la frecuencia de seguimiento y los informes. Revisamos acciones, evolución de indicadores y decisiones pendientes; no solo la cifra de ventas.' },
    ],
    guides: ['evitar-roturas-stock-amazon', 'variantes-amazon-parent-child', 'buy-box-amazon-oferta-destacada', 'inventario-varado-amazon', 'cambiar-agencia-amazon', 'suscribete-y-ahorra-amazon-vendedores', 'reducir-devoluciones-amazon', 'amazon-store-marca', 'vender-cosmetica-amazon', 'vender-complementos-alimenticios-amazon', 'vender-productos-mascotas-amazon', 'tarifas-fba-calcular-rentabilidad', 'indice-rendimiento-inventario-ipi-amazon', 'reembolsos-inventario-fba-perdido', 'tarifas-fba-bajo-precio-amazon'],
    related: ['/servicios/gestion-de-ppc/', '/servicios/auditoria-de-cuenta/', '/consultoria-amazon/'],
    proof: 'organic',
  },
  {
    path: '/servicios/gestion-de-ppc/',
    title: 'Agencia PPC Amazon',
    metaTitle: 'Agencia PPC Amazon para marcas privadas | Amazon Boost',
    description: 'Gestión de Amazon Ads para marcas privadas: estrategia, campañas, términos de búsqueda y seguimiento del margen. Solicita una revisión de tu publicidad.',
    promise: 'Publicidad con dirección. Crecimiento con criterio.',
    category: 'Amazon Ads',
    intro: 'Diseñamos una estrategia para escalar la cuenta y trabajar el posicionamiento sin perder de vista la rentabilidad. Cada campaña tiene una función; cada decisión, una razón.',
    needs: ['El gasto crece sin una lectura clara del retorno.', 'Hay campañas activas, pero no una estrategia común.', 'Quieres lanzar o escalar productos con control.'],
    scope: [
      { title: 'Entender dónde puede competir el producto', text: 'Revisamos margen, precio, disponibilidad y ficha antes de decidir cuánto sentido tiene atraer más tráfico.', items: ['Objetivos por ASIN y fase del producto.', 'Lectura de ACOS y TACOS con el contexto de la cuenta.', 'Revisión del histórico y de los periodos de atribución.'] },
      { title: 'Dar una función a cada campaña', text: 'Ordenamos descubrimiento, captación y defensa de marca para que la estructura se pueda interpretar y mantener.', items: ['Segmentación por búsquedas y productos.', 'Campañas y formatos según elegibilidad y objetivo.', 'Negativas y presupuestos con criterio documentado.'] },
      { title: 'Optimizar y explicar las decisiones', text: 'Contrastar hipótesis exige datos comparables. Registramos cambios y revisamos su efecto sin confundir una oscilación puntual con una tendencia.', items: ['Revisión de términos, pujas y asignación de inversión.', 'Coordinación con cambios de listing y stock.', 'Informe de rendimiento y siguientes acciones.'] },
    ],
    deliverable: 'Una estructura publicitaria que se entiende, objetivos ligados al producto y seguimiento del gasto. Sin comprometer un ACOS universal ni prometer ventas que nadie puede asegurar.',
    preparation: ['Catálogo prioritario y países.', 'Inversión actual y objetivos de negocio.', 'Informes publicitarios del periodo que acordemos.'],
    faqs: [
      { question: '¿Qué ACOS podéis conseguir?', answer: 'No fijamos una cifra sin conocer el margen, la categoría y el objetivo. Un lanzamiento, una campaña de marca y una de captación no se evalúan de la misma manera.' },
      { question: '¿Trabajáis con campañas que ya están activas?', answer: 'Sí. Primero revisamos su histórico y su función. Conservamos lo que aporta información útil y proponemos cambios con una razón, no una reconstrucción automática.' },
      { question: '¿Hace falta un presupuesto mínimo?', answer: 'La viabilidad depende del coste del tráfico, la conversión esperada y la cantidad de productos. Revisamos si la inversión permite aprender antes de recomendar un alcance.' },
      { question: '¿PPC incluye cambiar mis imágenes y listings?', answer: 'Detectamos esas necesidades al revisar la cuenta. La producción de imágenes o una optimización completa se concreta de forma separada en la propuesta.' },
    ],
    guides: ['acos-tacos-amazon', 'listing-amazon-visitas-sin-ventas', 'evitar-roturas-stock-amazon', 'amazon-ads-sin-impresiones', 'palabras-clave-negativas-amazon', 'amazon-attribution-trafico-externo', 'cupones-promociones-amazon'],
    related: ['/servicios/optimizacion-de-listados/', '/servicios/gestion-de-cuenta/', '/servicios/auditoria-de-cuenta/'],
    proof: 'team',
  },
  {
    path: '/servicios/auditoria-de-cuenta/',
    title: 'Auditoría de cuenta Amazon',
    metaTitle: 'Auditoría de cuenta Amazon: diagnóstico inicial | Amazon Boost',
    description: 'Identifica qué frena tu cuenta Amazon: campañas, conversión, catálogo y stock. Solicita una auditoría inicial y conoce las prioridades de tu cuenta.',
    promise: 'Antes de invertir más, entiende qué está pasando.',
    category: 'Diagnóstico',
    intro: 'Las ventas son el resultado de muchas decisiones conectadas. Revisamos las señales que explican el rendimiento y separamos lo urgente de lo que realmente puede desbloquear el crecimiento.',
    needs: ['Las ventas se han estancado y no sabes por dónde empezar.', 'La publicidad parece funcionar, pero el margen no acompaña.', 'Necesitas una segunda lectura antes de delegar.'],
    scope: [
      { title: 'Publicidad y demanda', text: 'Relacionamos búsquedas, inversión y rendimiento del producto para localizar dónde merece la pena profundizar.', items: ['Estructura publicitaria y términos de búsqueda.', 'Visibilidad del catálogo y competencia relevante.', 'Consistencia de periodos y métricas.'] },
      { title: 'La decisión de compra', text: 'Leemos la ficha desde la perspectiva del comprador: qué entiende, qué le falta y qué puede frenar el pedido.', items: ['Título, contenido e imágenes.', 'Precio, disponibilidad y condiciones de entrega.', 'Diferencias entre productos y variantes.'] },
      { title: 'Lo que sostiene la venta', text: 'Una ficha bien trabajada necesita una cuenta operativa. Revisamos los obstáculos que pueden limitar cualquier mejora comercial.', items: ['Incidencias y estado de cuenta.', 'Inventario, reposición y operativa FBA o FBM.', 'Prioridades según impacto y esfuerzo.'] },
    ],
    deliverable: 'Una primera lectura de la situación y una conversación sobre prioridades. Si hace falta un análisis profundo, delimitamos su alcance y presupuesto antes de realizarlo.',
    preparation: ['Enlace a la tienda o ASIN principales.', 'El problema que quieres resolver.', 'Países y una descripción breve de la operativa.'],
    faqs: [
      { question: '¿La auditoría inicial es gratuita?', answer: 'Sí, la revisión inicial sirve para conocer la cuenta y detectar áreas de trabajo. No equivale a una auditoría exhaustiva de cada ASIN, campaña y obligación del negocio.' },
      { question: '¿Necesitáis acceso a Seller Central?', answer: 'Para una primera conversación podemos empezar con enlaces y datos que compartas. Si necesitamos revisar más, acordamos permisos delegados o informes específicos.' },
      { question: '¿Me obliga a contratar una gestión mensual?', answer: 'No. Después del diagnóstico puedes valorar una intervención puntual, consultoría o gestión, según lo que necesite tu cuenta.' },
      { question: '¿También revisáis cuentas suspendidas?', answer: 'Sí, pero las tratamos como una incidencia específica. El primer paso es revisar la notificación y la documentación, no una auditoría comercial genérica.' },
    ],
    guides: ['listing-amazon-visitas-sin-ventas', 'acos-tacos-amazon', 'cuenta-amazon-suspendida'],
    related: ['/consultoria-amazon/', '/servicios/gestion-de-cuenta/', '/servicios/desbloqueos-amazon/'],
    proof: 'team',
  },
  {
    path: '/servicios/optimizacion-de-listados/',
    title: 'Optimización de listings Amazon',
    metaTitle: 'Optimización de listings y SEO Amazon | Amazon Boost',
    description: 'SEO, títulos, contenido A+ e imágenes para fichas de Amazon que se entienden y convierten. Revisamos tus listings y definimos qué mejorar primero.',
    promise: 'Ganar el clic es solo el principio.',
    category: 'SEO y conversión',
    intro: 'Conectamos lo que busca el comprador con lo que ve al llegar a tu producto. Trabajamos relevancia, argumentos y claridad visual para que la ficha ayude a tomar una decisión.',
    needs: ['Tienes visitas, pero pocos pedidos.', 'El producto se diferencia más de lo que explica la ficha.', 'El catálogo necesita coherencia entre países o variantes.'],
    scope: [
      { title: 'Encontrar las búsquedas adecuadas', text: 'Partimos del producto, del lenguaje del cliente y de la intención de compra. No todas las palabras con tráfico encajan con tu oferta.', items: ['Mapa de términos por producto y mercado.', 'Revisión de títulos, atributos y términos de búsqueda.', 'Priorización de relevancia frente a repetición.'] },
      { title: 'Convertir características en argumentos', text: 'Ordenamos beneficios y objeciones sin atribuir al producto cualidades que no se puedan respaldar.', items: ['Títulos y bullet points fáciles de leer.', 'Descripción y propuesta de contenido A+ según acceso.', 'Coherencia de medidas, compatibilidad y contenido del pack.'] },
      { title: 'Conectar texto, imágenes y A+', text: 'Construimos una secuencia que responda a las preguntas importantes, especialmente en móvil.', items: ['Dirección de imagen principal y secundarias.', 'Contenido A+ y A+ Premium según elegibilidad.', 'Revisión de variantes y seguimiento de conversión.'] },
    ],
    deliverable: 'Un listing con una intención clara: aparecer en búsquedas relevantes y explicar por qué elegir tu producto. El alcance puede incluir diagnóstico, redacción, diseño y publicación.',
    preparation: ['ASIN o enlaces de los productos.', 'Ficha técnica y argumentos que puedas acreditar.', 'Mercados, idiomas y materiales visuales disponibles.'],
    faqs: [
      { question: '¿Garantizáis la primera posición?', answer: 'No. La visibilidad depende de múltiples factores y de la competencia. Trabajamos relevancia y conversión, medimos la evolución y ajustamos las decisiones.' },
      { question: '¿Podéis incluir imágenes, A+ y A+ Premium?', answer: 'Sí. Podemos coordinar la redacción con la producción del set visual y preparar contenido A+ o A+ Premium cuando la cuenta sea elegible. La propuesta concreta las piezas y revisiones incluidas.' },
      { question: '¿Traducís listings para otros países?', answer: 'Trabajamos la adaptación al mercado: búsquedas, lenguaje del comprador y características del producto. No basta con trasladar literalmente el texto español.' },
    ],
    guides: ['listing-amazon-visitas-sin-ventas', 'imagenes-amazon-requisitos', 'imagenes-cosmetica-amazon', 'contenido-a-plus-amazon', 'como-redactar-listings-amazon', 'tests-ab-listings-amazon', 'terminos-busqueda-backend-amazon', 'contenido-a-plus-premium-amazon'],
    related: ['/servicios/imagenes-para-amazon/', '/servicios/gestion-de-ppc/', '/servicios/gestion-de-cuenta/'],
    proof: 'organic',
  },
  {
    path: '/servicios/desbloqueos-amazon/',
    title: 'Desbloqueo de cuentas Amazon',
    metaTitle: 'Desbloqueo de cuentas Amazon y fondos retenidos | Amazon Boost',
    description: 'Ayuda con cuentas Amazon suspendidas, verificaciones y fondos retenidos. Revisamos el motivo, la documentación y los siguientes pasos de tu incidencia.',
    promise: 'Cuando la cuenta se para, cada respuesta importa.',
    category: 'Resolución de incidencias',
    intro: 'Revisamos la comunicación de Amazon, ordenamos los antecedentes y preparamos una respuesta coherente con el motivo del bloqueo. Sin promesas de reactivación ni plazos que dependan de terceros.',
    needs: ['Tu cuenta ha sido desactivada o suspendida.', 'Hay pagos retenidos o una verificación pendiente.', 'Has enviado respuestas sin resolver la incidencia.'],
    scope: [
      { title: 'Entender el motivo exacto', text: 'Una suspensión, una reserva de fondos y una verificación no son el mismo problema. Empezamos por identificar el alcance de la notificación.', items: ['Lectura de avisos y antecedentes.', 'Cronología de comunicaciones y respuestas.', 'Identificación de documentos que faltan.'] },
      { title: 'Preparar el expediente', text: 'La respuesta debe apoyarse en hechos y documentos auténticos. Adaptamos el trabajo a lo que Amazon solicita en tu caso.', items: ['Revisión de coherencia documental.', 'Preparación de respuesta o plan de acción cuando proceda.', 'Organización de evidencias y medidas correctoras.'] },
      { title: 'Seguimiento y prevención', text: 'Registramos las respuestas para no perder contexto y definimos qué cambiar en la operativa si se recupera la actividad.', items: ['Seguimiento por los canales indicados en la cuenta.', 'Revisión de nuevas solicitudes de información.', 'Medidas para reducir la recurrencia del problema.'] },
    ],
    deliverable: 'Un expediente ordenado y una vía de actuación razonada. La decisión sobre reactivación y desembolso corresponde a Amazon; no podemos garantizar el resultado.',
    preparation: ['Texto de la notificación, ocultando datos sensibles.', 'Fecha y resumen de lo ocurrido.', 'Respuestas ya enviadas y estado actual de la cuenta.'],
    faqs: [
      { question: '¿Podéis garantizar que se desbloquee la cuenta?', answer: 'No. Evaluamos la situación y preparamos el caso, pero la decisión es de Amazon. Desconfía de una garantía de reactivación sin revisar la causa.' },
      { question: '¿Cuenta bloqueada y fondos retenidos se resuelven igual?', answer: 'No necesariamente. Hay que revisar cada comunicación y el estado de pagos. No asumimos que recuperar la actividad implique un desembolso inmediato.' },
      { question: '¿Cuánto tarda una apelación?', answer: 'Depende del motivo, de la documentación y de las revisiones de Amazon. Podemos concretar nuestro trabajo, pero no el plazo de respuesta o resolución de la plataforma.' },
      { question: '¿Os envío documentos por WhatsApp?', answer: 'Para empezar basta un resumen sin datos sensibles. Acordamos después un canal adecuado para la documentación. No envíes contraseñas, códigos de acceso ni documentos de identidad por el primer mensaje.' },
    ],
    guides: ['cuenta-amazon-suspendida', 'fondos-retenidos-amazon', 'variantes-amazon-parent-child', 'listing-suprimido-amazon', 'salud-cuenta-amazon-metricas'],
    related: ['/servicios/auditoria-de-cuenta/', '/servicios/gestion-de-cuenta/', '/consultoria-amazon/'],
    proof: 'team',
  },
  {
    path: '/agencia-amazon/',
    title: 'Agencia Amazon para marcas privadas',
    metaTitle: 'Agencia Amazon para marcas privadas en España | Amazon Boost',
    description: 'Amazon Boost: agencia para marcas privadas en España y Europa. Gestión integral, PPC, SEO, imágenes y resolución de incidencias. Hablemos de tu cuenta.',
    promise: 'Un equipo. Una dirección. Tu canal Amazon.',
    category: 'España y Europa',
    intro: 'Ayudamos a marcas que quieren profesionalizar su presencia en Amazon. Desde una intervención concreta hasta delegar la cuenta, conectamos estrategia y ejecución con la realidad del negocio.',
    needs: ['Quieres un equipo al que delegar la cuenta.', 'Necesitas conectar marketing y operativa.', 'Buscas una dirección clara para la siguiente etapa.'],
    scope: [
      { title: 'Una visión completa', text: 'No aislamos la publicidad de lo que ocurre en la ficha o en el almacén. El plan parte del conjunto.', items: ['Auditoría de cuenta y prioridades.', 'Dirección estratégica con tu equipo.', 'Alcance adaptado a la fase de la marca.'] },
      { title: 'Especialistas que ejecutan', text: 'Aterrizamos el plan en decisiones y entregables que puedas seguir.', items: ['PPC y seguimiento del rendimiento.', 'SEO, listings e imágenes de producto.', 'Catálogo, incidencias y disponibilidad.'] },
      { title: 'Crecimiento con visibilidad', text: 'La relación con la agencia debe darte contexto, no incertidumbre.', items: ['Informes y decisiones explicadas.', 'Coordinación para España y Europa.', 'Permisos delegados y propiedad de tus activos.'] },
    ],
    deliverable: 'Una propuesta que explica qué necesita tu cuenta, qué asumimos y cómo mediremos el trabajo. Empezamos por conocer la marca, no por encajarte en un paquete.',
    preparation: ['Enlace a tu marca y productos.', 'Situación actual en Amazon.', 'Qué esperas de una agencia y de tu equipo.'],
    faqs: [
      { question: '¿Con qué tipo de empresas trabajáis?', answer: 'El foco está en marcas privadas que venden o preparan su entrada en Amazon. Revisamos el catálogo, los recursos y el objetivo para valorar si nuestro servicio encaja.' },
      { question: '¿Sois Amazon o una agencia independiente?', answer: 'Amazon Boost es una agencia independiente. Trabajamos sobre el canal Amazon, pero las decisiones de la plataforma y sus políticas no dependen de nosotros.' },
      { question: '¿Puedo contratar solo un servicio?', answer: 'Sí. Puedes empezar con auditoría, PPC, listings, imágenes o una incidencia concreta, sin delegar toda la cuenta.' },
    ],
    guides: ['acos-tacos-amazon', 'amazon-fba-fbm', 'listing-amazon-visitas-sin-ventas', 'cuanto-cuesta-agencia-amazon'],
    related: ['/servicios/gestion-de-cuenta/', '/servicios/gestion-de-ppc/', '/consultoria-amazon/', '/servicios/optimizacion-de-listados/', '/servicios/lanzamiento-marca-privada-amazon/', '/servicios/expansion-amazon-europa/'],
    proof: 'organic',
  },
  {
    path: '/consultoria-amazon/',
    title: 'Consultoría Amazon',
    metaTitle: 'Consultoría Amazon para marcas y equipos internos | Amazon Boost',
    description: 'Consultoría Amazon para decidir qué mejorar, en qué orden y con qué recursos. Estrategia de catálogo, publicidad y crecimiento para tu equipo interno.',
    promise: 'Tu equipo ejecuta. La dirección se decide con criterio.',
    category: 'Dirección estratégica',
    intro: 'Si ya tienes equipo, una visión externa puede ayudarte a desbloquear decisiones. Analizamos la cuenta contigo y convertimos los hallazgos en un plan que tus responsables puedan llevar a la práctica.',
    needs: ['Tienes equipo, pero faltan prioridades compartidas.', 'Quieres contrastar una decisión de inversión o expansión.', 'Necesitas un plan puntual, no delegar toda la operativa.'],
    scope: [
      { title: 'Delimitar la decisión', text: 'Una consultoría útil empieza por una pregunta concreta y por los datos necesarios para responderla.', items: ['Objetivo de negocio y punto de partida.', 'Revisión de informes y restricciones operativas.', 'Hipótesis que conviene contrastar.'] },
      { title: 'Priorizar con tu equipo', text: 'Comparamos alternativas según impacto, recursos y dependencias. No todo lo que se puede hacer debe hacerse ahora.', items: ['Plan por productos y mercados.', 'Criterios para asignar inversión y esfuerzo.', 'Responsables y secuencia de acciones.'] },
      { title: 'Dar continuidad al criterio', text: 'Dejamos documentado cómo evaluar el avance y cuándo replantear una decisión.', items: ['Resumen de conclusiones y prioridades.', 'Indicadores para revisar con el equipo.', 'Sesiones de seguimiento si se acuerdan.'] },
    ],
    deliverable: 'Un plan de decisiones aplicable a tus recursos. Tú mantienes la ejecución interna y cuentas con una lectura externa para contrastar el rumbo.',
    preparation: ['La decisión o problema que quieres trabajar.', 'Funciones de tu equipo y recursos disponibles.', 'Informes que ayuden a entender la situación.'],
    faqs: [
      { question: '¿Qué diferencia hay con la gestión integral?', answer: 'En consultoría trabajamos el análisis y la dirección; tu equipo mantiene la ejecución. En gestión asumimos también las tareas operativas pactadas.' },
      { question: '¿Puede ser una intervención puntual?', answer: 'Sí. Definimos una pregunta y un alcance concreto. Si después tiene sentido acompañar la ejecución, lo valoramos por separado.' },
      { question: '¿Entregáis conclusiones por escrito?', answer: 'La propuesta concreta los entregables. El objetivo es que queden claras las conclusiones, prioridades y criterios de seguimiento para tu equipo.' },
    ],
    guides: ['acos-tacos-amazon', 'evitar-roturas-stock-amazon', 'amazon-fba-fbm', 'brand-analytics-amazon', 'amazon-business-vender-empresas'],
    related: ['/servicios/gestion-de-cuenta/', '/servicios/lanzamiento-marca-privada-amazon/', '/servicios/expansion-amazon-europa/'],
    proof: 'team',
  },
  {
    path: '/servicios/lanzamiento-marca-privada-amazon/',
    title: 'Lanzamiento de marca privada en Amazon',
    metaTitle: 'Lanzamiento de marca privada en Amazon | Amazon Boost',
    description: 'Prepara el lanzamiento de tu marca en Amazon: catálogo, listings, imágenes, logística y publicidad inicial. Definimos el plan antes de invertir.',
    promise: 'Tu marca tiene producto. Démosle un plan de salida.',
    category: 'Lanzamiento de marcas',
    intro: 'Entrar en Amazon exige coordinar más que el alta de una cuenta. Acompañamos a marcas con producto propio para ordenar referencias, preparar la oferta y empezar con una estrategia comercial que se pueda medir.',
    needs: ['Tienes producto, pero aún no un canal Amazon preparado.', 'Quieres lanzar una nueva gama sin improvisar la operativa.', 'Necesitas conectar contenido, stock y presupuesto desde el inicio.'],
    scope: [
      { title: 'Elegir qué sale primero', text: 'Revisamos producto, costes y recursos para definir un catálogo inicial que puedas sostener. No todos los productos tienen que salir al mismo tiempo.', items: ['Selección de referencias y primer marketplace.', 'Revisión de costes y presupuesto disponible.', 'Mapa de requisitos, materiales y decisiones pendientes.'] },
      { title: 'Preparar una oferta completa', text: 'Coordinamos la información que necesita la cuenta y lo que verá el comprador. El diseño y la redacción parten del producto real.', items: ['Estructura de catálogo y variantes.', 'Listings, brief visual y contenido acordado.', 'Coordinación de disponibilidad y modelo FBA o FBM.'] },
      { title: 'Activar, observar y ajustar', text: 'La primera inversión debe tener una función clara. Acordamos qué queremos aprender, con qué presupuesto y cuándo revisaremos la decisión.', items: ['Plan publicitario inicial según el producto.', 'Comprobación de la experiencia de compra.', 'Informe de señales, incidencias y prioridades de mejora.'] },
    ],
    deliverable: 'Un plan de lanzamiento por etapas, con responsables y dependencias claras. La propuesta concreta qué analizamos, qué producimos y qué ejecutamos; no presupone una fecha de ventas ni un resultado garantizado.',
    preparation: ['Productos, variantes y materiales de marca.', 'Costes, stock disponible y plazos de reposición.', 'Estado de la cuenta y de la marca registrada.'],
    faqs: [
      { question: '¿Podéis lanzar una marca desde cero?', answer: 'Sí, si el producto, la empresa y la operativa están definidos. Coordinamos la preparación de la cuenta, el catálogo y la salida al mercado; la cuenta siempre pertenece al titular del negocio.' },
      { question: '¿Qué debe estar listo antes de empezar?', answer: 'Producto, costes, stock, documentación y materiales de marca. Si falta alguna pieza, la detectamos al inicio y la incorporamos a la hoja de ruta antes de invertir.' },
      { question: '¿Incluye listings, imágenes, A+ y PPC?', answer: 'Puede incluirlos. Diseñamos el alcance según el catálogo y dejamos por escrito qué contenido producimos, qué campañas activamos y qué debe aportar la marca.' },
      { question: '¿Cuánto presupuesto necesito para lanzar?', answer: 'Depende del catálogo, la logística, el contenido y la publicidad. Separamos cada partida para recomendar una inversión ajustada al producto, no una cifra universal.' },
      { question: '¿Incluye fabricación y trámites legales?', answer: 'No por defecto. Trabajamos con un producto ya definido y coordinamos la información necesaria para Amazon; fabricación, propiedad industrial y validaciones regulatorias corresponden a sus especialistas.' },
      { question: '¿Garantizáis pedidos durante el primer mes?', answer: 'No. Un lanzamiento bien preparado reduce improvisación y permite aprender con datos, pero la demanda, la competencia y la disponibilidad también influyen.' },
    ],
    guides: ['lanzar-producto-amazon-checklist', 'brand-registry-amazon-requisitos', 'acos-tacos-amazon', 'amazon-vine-requisitos', 'amazon-transparency-marca'],
    related: ['/servicios/imagenes-para-amazon/', '/servicios/gestion-de-ppc/', '/servicios/gestion-de-cuenta/'],
    proof: 'team',
  },
  {
    path: '/servicios/expansion-amazon-europa/',
    title: 'Expansión en Amazon Europa',
    metaTitle: 'Expansión en Amazon Europa para marcas | Amazon Boost',
    description: 'Prepara tu expansión desde España a otros mercados de Amazon: catálogo, contenido local, publicidad y coordinación logística. Un plan por país y producto.',
    promise: 'Otra tienda. Otra demanda. La misma marca.',
    category: 'Crecimiento internacional',
    intro: 'Ayudamos a marcas a preparar su siguiente mercado europeo con una lectura propia de cada país. Priorizamos productos, adaptamos la propuesta y coordinamos el lanzamiento con la capacidad real del negocio.',
    needs: ['Vendes en España y quieres decidir el siguiente mercado.', 'Tu catálogo está traducido, pero no preparado para competir.', 'Necesitas ordenar publicidad, precios y stock por país.'],
    scope: [
      { title: 'Decidir dónde tiene sentido entrar', text: 'Contrastamos demanda, oferta competidora y recursos. La expansión se organiza por combinación de producto y mercado, no solo por tamaño del país.', items: ['Selección del catálogo piloto y mercados prioritarios.', 'Lectura de precios, búsquedas y competencia local.', 'Revisión de costes y restricciones con los responsables del negocio.'] },
      { title: 'Preparar catálogo y contenido local', text: 'Adaptamos la ficha a las búsquedas y dudas del comprador. Mantener la identidad de marca no significa replicar literalmente cada texto.', items: ['Revisión de referencias, atributos y variantes.', 'Adaptación de títulos, argumentos e imágenes según alcance.', 'Comprobación de oferta, precio y disponibilidad en destino.'] },
      { title: 'Coordinar el crecimiento', text: 'Conectamos inversión y reposición para que la apertura de un mercado no desordene los que ya funcionan.', items: ['Plan publicitario y seguimiento por marketplace.', 'Coordinación operativa de FBA, FBM y opciones logísticas.', 'Informe por país y decisión sobre la siguiente etapa.'] },
    ],
    deliverable: 'Una hoja de ruta por mercado con catálogo, materiales, responsables y condiciones de salida. Los trámites fiscales, aduaneros y regulatorios se contrastan con tus asesores antes de activar la operativa correspondiente.',
    preparation: ['Mercados actuales y países que estás valorando.', 'Catálogo prioritario, costes y capacidad de reposición.', 'Situación logística y asesores fiscales o regulatorios disponibles.'],
    faqs: [
      { question: '¿Debo abrir todos los países a la vez?', answer: 'No necesariamente. Podemos plantear una entrada por etapas para concentrar recursos y aprender con un catálogo piloto. La elección depende de la demanda, los costes y tu capacidad operativa.' },
      { question: '¿Traducir los listings es suficiente?', answer: 'No. También hay que comprobar búsquedas, atributos, oferta, precio, entrega y requisitos del producto. La adaptación debe validar qué verá realmente el comprador en cada mercado.' },
      { question: '¿Incluís declaraciones de IVA o trámites regulatorios?', answer: 'No se incluyen por defecto. Coordinamos las necesidades operativas con tus especialistas, pero no sustituimos al asesor fiscal, jurídico o de cumplimiento del producto.' },
      { question: '¿Tengo que utilizar el programa Paneuropeo?', answer: 'No lo damos por hecho. Comparamos alternativas logísticas según catálogo, costes y capacidad. Antes de autorizar almacenamiento se revisan condiciones y obligaciones aplicables con tus asesores.' },
      { question: '¿Podéis continuar con la gestión tras el lanzamiento?', answer: 'Sí, podemos acordar la gestión de los mercados activos. Delimitamos seguimiento, contenido, publicidad y operativa para que sepas qué queda cubierto.' },
    ],
    guides: ['preparar-catalogo-amazon-europa', 'amazon-paneuropeo-o-efn', 'evitar-roturas-stock-amazon', 'gpsr-amazon-requisitos-europa'],
    related: ['/consultoria-amazon/', '/servicios/gestion-de-cuenta/', '/servicios/optimizacion-de-listados/'],
    proof: 'team',
  },
];

// This existing visual service keeps its dedicated gallery and URL.
export const visualService = {
  path: '/servicios/imagenes-para-amazon/', title: 'Imágenes para Amazon',
  category: 'Diseño y conversión',
  description: 'Imagen principal, infografías y contenido visual a medida para tu producto.',
};
export const serviceDirectory = [...servicePages, visualService];
export const serviceByPath = new Map(servicePages.map((page) => [page.path, page]));
export const serviceAliases: Record<string, string> = {
  '/gestion-cuenta-amazon-seller-central/': '/servicios/gestion-de-cuenta/',
  '/agencia-ppc-amazon/': '/servicios/gestion-de-ppc/',
  '/auditoria-cuenta-amazon/': '/servicios/auditoria-de-cuenta/',
  '/optimizacion-listings-amazon/': '/servicios/optimizacion-de-listados/',
  '/servicios/belleza/': '/guias/imagenes-cosmetica-amazon/',
  '/servicios/agencia-amazon-cosmetica/': '/guias/vender-cosmetica-amazon/',
  '/servicios/agencia-amazon-suplementos/': '/guias/vender-complementos-alimenticios-amazon/',
  '/servicios/agencia-amazon-mascotas/': '/guias/vender-productos-mascotas-amazon/',
};
