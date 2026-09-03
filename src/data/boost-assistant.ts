export type BoostEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string;
  source: { label: string; href: string };
  related?: { label: string; href: string };
};

export const boostStarters = [
  { label: 'Mejorar rentabilidad', question: 'Gasto mucho en publicidad. ¿Por dónde empiezo?', guide: 'acos-tacos-amazon' },
  { label: 'Conseguir más ventas', question: 'Tengo visitas, pero no consigo ventas.', guide: 'listing-amazon-visitas-sin-ventas' },
  { label: 'Cuenta bloqueada', question: 'Me han bloqueado la cuenta de Amazon.', guide: 'cuenta-amazon-suspendida' },
  { label: 'Lanzar mi marca', question: 'Quiero empezar a vender mi marca en Amazon.', guide: 'lanzar-producto-amazon-checklist' },
];

export const boostEssentials: BoostEntry[] = [
  {
    id: 'agencia', question: '¿Qué es Amazon Boost?',
    answer: 'Amazon Boost es una agencia especializada en ayudar a marcas privadas a vender y crecer en Amazon en España y Europa. Conectamos estrategia, publicidad Amazon Ads, SEO, imágenes, catálogo y stock para trabajar el crecimiento y la rentabilidad del canal. Puedes delegar la gestión completa o una parte: empezamos con una auditoría inicial gratuita para identificar las prioridades de tu cuenta.',
    keywords: 'amazon boost amznboost agencia quienes somos quienes sois empresa informacion conoceis dedicais presentacion',
    source: { label: 'Conocer Amazon Boost', href: '/agencia-amazon/' },
    related: { label: 'Explorar nuestros servicios', href: '/servicios/' },
  },
  {
    id: 'equipo', question: '¿Quién está detrás de Amazon Boost?',
    answer: 'Sergio Porras es el fundador de Amazon Boost. Creó la agencia para que marcas y vendedores puedan delegar la operativa y la estrategia de su cuenta en un equipo, sin perder visibilidad sobre lo que ocurre. Trabajamos con prioridades claras, decisiones explicadas e informes que dan contexto al crecimiento.',
    keywords: 'equipo fundador sergio porras quien fundo creo dirige detras nosotros',
    source: { label: 'Conocer al fundador', href: '/#fundador' },
    related: { label: 'Hablar con el equipo', href: '/#auditoria' },
  },
  {
    id: 'enfoque', question: '¿Cómo trabajáis en Amazon Boost?',
    answer: 'Primero entendemos dónde está el margen y qué frena la cuenta. Después conectamos publicidad, listings, imágenes, catálogo y stock en un mismo plan, con prioridades y responsabilidades acordadas. Los informes explican qué cambia y por qué, para que puedas delegar la ejecución sin perder el control. Podemos trabajar una necesidad concreta o la gestión integral.',
    keywords: 'metodo enfoque trabajo trabajais diferencia diferente elegir contratar informes seguimiento delegar control',
    source: { label: 'Nuestra dirección estratégica', href: '/#direccion-estrategica' },
    related: { label: 'Gestión integral de Amazon', href: '/servicios/gestion-de-cuenta/' },
  },
  {
    id: 'mercados', question: '¿Con qué marcas y mercados trabajáis?',
    answer: 'Nos centramos en marcas privadas que venden o quieren empezar a vender en Amazon en España y Europa. Ayudamos tanto con lanzamientos como con cuentas activas y expansión a otros mercados. El plan se adapta al producto, los países, la publicidad y la operativa FBA o FBM; la auditoría inicial sirve para valorar qué necesita tu marca.',
    keywords: 'marcas clientes paises mercados espana europa trabajais especializais especialidad sectores pequenos empezar',
    source: { label: 'Agencia para marcas privadas', href: '/agencia-amazon/' },
    related: { label: 'Expansión en Amazon Europa', href: '/servicios/expansion-amazon-europa/' },
  },
  {
    id: 'auditoria', question: '¿Cómo solicito una auditoría gratis?',
    answer: 'Puedes solicitar la auditoría inicial desde el formulario de la web. Cuéntanos qué vendes, en qué países y qué te preocupa de la cuenta. El equipo concretará contigo la revisión; no hace falta compartir contraseñas.',
    keywords: 'auditoria gratuita gratis diagnostico revisar revision solicitar pedir',
    source: { label: 'Solicitar auditoría inicial', href: '/#auditoria' },
    related: { label: 'Qué revisamos en una auditoría', href: '/servicios/auditoria-de-cuenta/' },
  },
  {
    id: 'contacto', question: '¿Cómo puedo hablar con el equipo?',
    answer: 'Puedes hablar con el equipo de Amazon Boost por WhatsApp o llamar al 650 606 400. Si prefieres explicar primero tu situación, tienes el formulario de auditoría inicial.',
    keywords: 'contacto contactar hablar persona humano experto equipo sergio telefono llamar whatsapp',
    source: { label: 'Solicitar auditoría inicial', href: '/#auditoria' },
  },
  {
    id: 'honorarios', question: '¿Cuánto cuesta trabajar con Amazon Boost?',
    answer: 'No hay una tarifa única publicada: la propuesta depende del catálogo, los países y el alcance que necesites. Los honorarios de gestión y la inversión en publicidad son conceptos distintos. Podemos empezar por revisar tu situación.',
    keywords: 'coste costo precio precios cuesta cuanto cobrais vale tarifa honorarios contratar presupuesto agencia',
    source: { label: 'Cómo comparar presupuestos', href: '/guias/cuanto-cuesta-agencia-amazon/' },
    related: { label: 'Solicitar una propuesta', href: '/#auditoria' },
  },
  {
    id: 'servicios', question: '¿Qué hace Amazon Boost?',
    answer: 'Ayudamos a marcas privadas a gestionar Amazon en España y Europa: publicidad, listings, imágenes, catálogo, stock e incidencias. Podemos abordar la cuenta completa o una necesidad concreta, con responsabilidades y alcance acordados.',
    keywords: 'servicios hace haceis ofrecen ofreceis ayudar ayudais amazon boost agencia gestion integral delegar cuenta',
    source: { label: 'Explorar los servicios', href: '/servicios/' },
    related: { label: 'Gestión integral de la cuenta', href: '/servicios/gestion-de-cuenta/' },
  },
  {
    id: 'resultados', question: '¿Podéis garantizar ventas o una primera posición?',
    answer: 'No garantizamos una cifra de ventas, un plazo de recuperación ni una primera posición. Los objetivos se definen con datos de la cuenta. Puedes consultar los casos documentados, pero sus resultados no son una promesa para otra marca.',
    keywords: 'garantizar garantizado garantizais garantias asegurar prometer resultados casos exito primera posicion cuanto vender facturar',
    source: { label: 'Ver casos de éxito', href: '/casos-de-exito/' },
  },
  {
    id: 'asistente', question: '¿Eres una IA o una persona?',
    answer: 'Soy Boost, el asistente virtual de Amazon Boost, no una persona ni un representante de Amazon. Puedo combinar respuestas de nuestras guías con IA a través de OpenRouter cuando está disponible y autorizas el envío. No tengo acceso a Seller Central y puedo equivocarme. Para valorar tu cuenta, puedes hablar con nuestro equipo.',
    keywords: 'eres ia inteligencia artificial bot robot chatgpt asistente humano persona oficial amazon',
    source: { label: 'Hablar con Amazon Boost', href: '/#auditoria' },
  },
];

// Agency facts remain available even when the free inference provider is down.
export const boostCompanyEntryIds = new Set(boostEssentials.map(entry => entry.id));

export const boostFundamentals: BoostEntry[] = [
  {
    id: 'amazon-general', question: '¿Qué es Amazon y cómo se vende allí?',
    answer: 'Amazon es una plataforma de comercio electrónico en la que también pueden vender otras empresas y marcas. Para una marca, abrir el canal implica preparar la cuenta de vendedor, las fichas de producto, la oferta, la logística y la atención a la operativa. En Amazon Boost ayudamos a conectar esas piezas, desde el lanzamiento hasta la gestión de una cuenta que ya está vendiendo.',
    keywords: 'amazon marketplace plataforma comercio electronico vender funciona funcionamiento',
    source: { label: 'Cómo preparar un lanzamiento en Amazon', href: '/guias/lanzar-producto-amazon-checklist/' },
    related: { label: 'Lanzamiento de marca privada', href: '/servicios/lanzamiento-marca-privada-amazon/' },
  },
  {
    id: 'seller-central', question: '¿Qué es Seller Central?',
    answer: 'Seller Central es el panel desde el que un vendedor gestiona su actividad en Amazon: catálogo, inventario, pedidos, pagos, informes y estado de cuenta, entre otras funciones. No es una agencia ni este chat tiene acceso a él. Amazon Boost puede encargarse de la gestión acordada con permisos delegados; la cuenta sigue siendo tuya.',
    keywords: 'seller central panel vendedor gestionar cuenta acceso',
    source: { label: 'Gestión de cuentas y Seller Central', href: '/servicios/gestion-de-cuenta/' },
  },
  {
    id: 'marca-privada', question: '¿Qué es una marca privada en Amazon?',
    answer: 'Una marca privada vende productos bajo su propia marca, en lugar de limitarse a revender referencias de otras marcas. En Amazon eso exige trabajar la propuesta del producto, el catálogo, el contenido, la captación y la disponibilidad de forma coherente. Es el tipo de negocio en el que se especializa Amazon Boost, tanto para lanzar como para mejorar una cuenta existente.',
    keywords: 'marca privada private label producto propio marca propia',
    source: { label: 'Lanzar una marca privada en Amazon', href: '/servicios/lanzamiento-marca-privada-amazon/' },
  },
  {
    id: 'listing-basico', question: '¿Qué es un listing de Amazon?',
    answer: 'Un listing es la ficha en la que se presenta un producto en Amazon. El título, las imágenes, las características y la descripción ayudan al comprador a entender qué recibe y si le encaja; la oferta y la disponibilidad también influyen en la compra. Optimizamos estas piezas junto con el SEO para mejorar la claridad y la relevancia de la ficha.',
    keywords: 'listing ficha producto listado listados descripcion titulo bullets',
    source: { label: 'Optimización de listings y SEO', href: '/servicios/optimizacion-de-listados/' },
  },
  {
    id: 'amazon-ads-basico', question: '¿Qué es Amazon Ads y qué significa PPC?',
    answer: 'Amazon Ads es la plataforma publicitaria de Amazon. PPC significa pago por clic: en este modelo se paga cuando alguien hace clic en el anuncio, no cuando compra. Para una marca no basta con atraer visitas; conectamos campañas, ficha de producto y margen para orientar la inversión hacia los objetivos de la cuenta.',
    keywords: 'amazon ads ppc publicidad anuncio anuncios definicion significa pago clic',
    source: { label: 'Cómo gestionamos Amazon Ads', href: '/servicios/gestion-de-ppc/' },
    related: { label: 'Entender ACOS y TACOS', href: '/guias/acos-tacos-amazon/' },
  },
];

export const boostGuideKeywords: Record<string, string> = {
  'acos-tacos-amazon': 'ppc ads acos tacos roas publicidad anuncios gasto gastar dinero rentable rentabilidad margen presupuesto campanas',
  'listing-amazon-visitas-sin-ventas': 'visitas trafico ventas vender conversion convierte convierten pedidos',
  'imagenes-amazon-requisitos': 'imagenes fotos fotografia infografias carrusel diseno',
  'variantes-amazon-parent-child': 'variantes variaciones parent child familia agrupar',
  'cuenta-amazon-suspendida': 'cuenta suspendida suspension bloqueada bloqueado bloqueo desactivada desbloquear reactivar apelacion',
  'fondos-retenidos-amazon': 'fondos retenidos retenido dinero pago pagos retencion retiene saldo',
  'evitar-roturas-stock-amazon': 'stock inventario reponer reposicion roturas agotado existencias',
  'amazon-fba-fbm': 'fba fbm logistica envio envios almacen',
  'lanzar-producto-amazon-checklist': 'empezar empezar vender lanzamiento lanzar abrir marca privada cero comenzar',
  'brand-registry-amazon-requisitos': 'brand registry registrar registro inscribir marca',
  'contenido-a-plus-amazon': 'contenido a+ aplus plus',
  'preparar-catalogo-amazon-europa': 'europa expansion internacional francia alemania italia paises mercados internacionalizar',
  'amazon-paneuropeo-o-efn': 'paneuropeo pan europeo efn',
  'buy-box-amazon-oferta-destacada': 'buybox buy box oferta destacada',
  'cambiar-agencia-amazon': 'cambiar agencia relevo traspaso',
  'amazon-ads-sin-impresiones': 'impresiones visibilidad anuncios campanas',
  'palabras-clave-negativas-amazon': 'palabras negativas negativa concordancia busquedas',
  'listing-suprimido-amazon': 'listing suprimido suprimida inactivo ficha eliminado',
  'inventario-varado-amazon': 'inventario varado varadas unidades',
  'vender-cosmetica-amazon': 'cosmetica cosmeticos belleza cremas maquillaje',
  'vender-complementos-alimenticios-amazon': 'suplementos suplementacion complementos alimenticios vitaminas personas',
  'suscribete-y-ahorra-amazon-vendedores': 'suscribete ahorra suscripcion recurrencia recurrente',
  'reducir-devoluciones-amazon': 'devoluciones devolucion devuelven devuelto devoluciones',
  'vender-productos-mascotas-amazon': 'mascotas perros gatos animales nutricion animal',
  'amazon-store-marca': 'store tienda escaparate',
  'brand-analytics-amazon': 'brand analytics analitica busquedas analisis',
  'amazon-business-vender-empresas': 'business b2b empresas mayorista',
  'como-redactar-listings-amazon': 'redactar escribir titulos bullets descripcion seo listing',
  'tests-ab-listings-amazon': 'test tests experimentos ab probar comparar versiones',
};
