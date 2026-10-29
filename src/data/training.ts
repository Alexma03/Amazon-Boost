import type { Guide } from './guides';
import type { BlogPost } from './blog/index';

// Approved for publication on 29 October 2026. Every proposal is tailored to the client.
export const trainingService = {
  publicationState: 'published' as const,
  path: '/servicios/formacion-amazon-empresas/',
  previewPath: '/borradores/formacion-amazon/',
  title: 'Formación y acompañamiento en Amazon',
  metaTitle: 'Formación Amazon para empresas y equipos | Amazon Boost',
  description: 'Formamos a tu equipo sobre vuestra propia cuenta de Amazon. Sesiones prácticas, resolución de dudas y un plan adaptado a vuestro nivel y disponibilidad.',
  category: 'Formación para empresas',
  whatsapp: 'https://wa.me/34650606400?text=' + encodeURIComponent('Hola, me interesa la formación y acompañamiento en Amazon para nuestro equipo. Quisiera valorar un programa personalizado sobre nuestra cuenta.'),
  blocks: [
    { number: '01', title: 'Gestionar el día a día', text: 'Para que tu equipo sepa moverse por la cuenta y atender lo que necesita.', items: ['Seller Central, accesos y salud de cuenta.', 'Incidencias y preparación de casos de soporte.', 'Inventario, reposiciones y envíos FBA o FBM.'] },
    { number: '02', title: 'Trabajar vuestros productos', text: 'Aprender con las fichas y las referencias que vais a gestionar.', items: ['Títulos, atributos, variantes y catálogo.', 'Imágenes, contenido A+ y tienda según elegibilidad.', 'Precios, costes y lectura de la rentabilidad.'] },
    { number: '03', title: 'Entender qué cambiar y por qué', text: 'Dar contexto a los datos antes de tomar una decisión.', items: ['Amazon Ads: campañas, pujas y términos de búsqueda.', 'Resultados, promociones y prioridades de mejora.', 'Rutinas de revisión y decisiones de stock.'] },
  ],
  faqs: [
    { question: '¿Para quién es esta formación?', answer: 'Para empresas que quieren gestionar Amazon de forma interna y necesitan preparar a la persona o al equipo que lo llevará. Puede encajar si vais a asumir el canal, os atascáis en tareas concretas o queréis ampliar conocimientos en un área.' },
    { question: '¿Trabajamos con nuestra propia cuenta?', answer: 'Sí. Preparamos las sesiones con vuestros productos, fichas, campañas y datos disponibles. Explicamos qué estamos revisando y por qué. Vuestra información no se utiliza para formar a otras marcas.' },
    { question: '¿Hay una duración o un número de horas fijo?', answer: 'No. Acordamos la frecuencia, la duración de las reuniones y el plazo del acompañamiento según lo que necesite aprender tu equipo y el tiempo del que disponga. Podemos ajustar el recorrido si cambian las prioridades.' },
    { question: '¿Podemos resolver problemas durante las clases?', answer: 'Sí. Podemos revisar una ficha, interpretar una campaña o trabajar una incidencia concreta. Si procede y lo aprobáis, aplicamos los cambios juntos y explicamos el proceso. Algunas incidencias dependen de documentación, de Amazon o de una intervención específica; no garantizamos resolverlas en una sesión.' },
    { question: '¿Podemos elegir el canal de acompañamiento?', answer: 'Sí. El acompañamiento incluye un canal directo con Amazon Boost para dudas entre sesiones: WhatsApp, email u otro canal que prefiráis y acordemos juntos. Podéis consultar dudas al aplicar lo aprendido y recibir orientación sobre incidencias y siguientes pasos sin esperar a la próxima sesión. Lo que requiera una revisión más profunda se trabaja en una reunión. Los horarios y tiempos de atención se concretan en la propuesta. No prometemos respuesta inmediata ni atención de urgencias permanente.' },
    { question: '¿Cómo accedéis a Seller Central?', answer: 'Acordamos un acceso delegado autorizado por Amazon con los permisos mínimos necesarios, o trabajamos con pantalla compartida. No pedimos contraseñas, códigos de acceso ni datos bancarios. Las actuaciones sobre la cuenta se realizan con vuestra aprobación.' },
    { question: '¿Es lo mismo que contratar la gestión de cuenta?', answer: 'No. Os explicamos y trabajamos con vosotros para que el equipo pueda gestionar las tareas acordadas. La ejecución continuada fuera de las sesiones se define por separado. Podemos combinar formación con un servicio concreto si tiene sentido para tu empresa.' },
    { question: '¿Cuánto cuesta y qué incluye la propuesta?', answer: 'Preparamos una propuesta personalizada, sin tarifas públicas cerradas. Recoge objetivos, participantes, temas, sesiones, seguimiento y alcance. La primera conversación es gratuita y sin compromiso.' },
    { question: '¿Es un curso oficial de Amazon?', answer: 'Es un servicio independiente de Amazon Boost, no una certificación oficial de Amazon. El objetivo es ayudar a tu equipo a trabajar con criterio y autonomía; no prometemos resultados de ventas ni resoluciones que dependan de Amazon.' },
  ],
};

export const trainingGuidePreview = '/borradores/formacion-amazon/plan-formacion-equipo/';
export const trainingBlogPreview = '/borradores/formacion-amazon/formar-o-delegar/';
const university = {
  label: 'Amazon España: Seller University',
  url: 'https://sell.amazon.es/vender-online/seller-university',
  note: 'Consultada el 28 de octubre de 2026. Recursos oficiales de aprendizaje. El acompañamiento descrito es un servicio independiente de Amazon Boost.',
};
const permissions = {
  label: 'Amazon: Seller Central y acceso del equipo',
  url: 'https://sell.amazon.com/es/tools/seller-central',
  note: 'Consultada el 28 de octubre de 2026. Referencia general sobre acceso y permisos; el procedimiento se comprueba en la cuenta y el marketplace.',
};

export const trainingGuide: Guide = {
  slug: 'plan-formacion-equipo-amazon',
  path: '/guias/plan-formacion-equipo-amazon/',
  updatedAt: '2026-10-29',
  title: 'Cómo formamos a tu equipo para gestionar Amazon',
  metaTitle: 'Cómo formamos a tu equipo en Amazon | Amazon Boost',
  description: 'Así trabajaríamos con tu empresa: entender la cuenta, adaptar las sesiones a vuestro tiempo y practicar con vuestros productos, datos y dudas reales.',
  category: 'Formación y equipo',
  service: trainingService.path,
  answer: 'Si quieres gestionar Amazon dentro de tu empresa, no tienes que preparar tú un curso para tus empleados. En Amazon Boost identificamos contigo qué necesita aprender el equipo y lo trabajamos sobre vuestra cuenta. Acordamos un ritmo realista, explicamos cada tarea en directo y revisamos las dudas que aparecen al aplicarla. El plan parte de vuestro trabajo, no de un calendario estándar.',
  table: { caption: 'Ejemplos de lo que podríamos trabajar contigo, según vuestra cuenta', headings: ['Si necesitáis…', 'Trabajaríamos juntos…', 'Para que después podáis…'], rows: [
    ['Mejorar una ficha', 'Una referencia vuestra: título, atributos y datos de producto.', 'Revisar otra ficha con el mismo criterio.'],
    ['Entender la publicidad', 'Un informe de vuestras campañas con su periodo y contexto.', 'Explicar el gasto y plantear el siguiente análisis.'],
    ['Gestionar una incidencia', 'El aviso, los antecedentes y la documentación pertinente.', 'Preparar un caso y seguir su estado.'],
    ['Organizar inventario', 'Existencias, ventas y condiciones reales de reposición.', 'Reconocer qué revisar antes de decidir un envío.'],
  ] },
  sections: [
    { id: 'punto-partida', title: '1. Entendemos tu empresa y quién va a aprender', paragraphs: ['Empezaríamos hablando contigo sobre quién lleva Amazon hoy, quién lo llevará después y en qué tareas necesitáis ayuda. No suponemos que todos parten del mismo nivel: una persona puede conocer muy bien el producto y necesitar apoyo con Seller Central; otra puede manejar la cuenta pero no entender los informes publicitarios.', 'Tú aportas el contexto del negocio y nosotros os ayudamos a convertirlo en prioridades de aprendizaje. No necesitas llegar con un temario ni conocer el nombre de cada herramienta. Basta con explicarnos dónde os atascáis, qué queréis asumir dentro y qué dudas os frenan en el trabajo habitual.'] },
    { id: 'plan-medida', title: '2. Te proponemos un plan adaptado a vuestro tiempo', paragraphs: ['Prepararíamos los temas, su orden y el nivel de profundidad. Antes de fijar reuniones, hablaríamos de la disponibilidad del equipo y del tiempo que puede dedicar a aplicar lo aprendido. La frecuencia, la duración de las sesiones y el plazo del acompañamiento se acuerdan contigo; no parten de un paquete único.', 'Si necesitáis centraros en catálogo, no os haríamos recorrer un curso completo de publicidad para llegar a ese tema. Si asumís el canal por primera vez, ordenaríamos las bases. Y si aparece una prioridad nueva, revisaríamos el recorrido para que siga siendo útil, en lugar de mantener un índice que ya no os ayuda.'] },
    { id: 'sesion-real', title: '3. Te explicamos el trabajo sobre vuestra propia cuenta', paragraphs: ['En las reuniones por videollamada usaríamos vuestros productos, fichas y datos disponibles. En vez de explicar un informe sin contexto, podríamos abrir uno de vuestras campañas: qué periodo recoge, qué preguntas permite responder y qué falta antes de proponer cambios. Os mostraríamos el recorrido y el motivo de cada paso, con espacio para preguntar y practicar.', 'Amazon tiene recursos generales de aprendizaje en Seller University que pueden servir para repasar conceptos. Nuestro acompañamiento añade la explicación aplicada a vuestra situación. No os vendemos el acceso exclusivo a información pública ni presentamos el servicio como una formación oficial de Amazon.'], source: 0 },
    { id: 'resolver-juntos', title: '4. Trabajamos problemas reales y aprendéis el proceso', paragraphs: ['Una sesión no tiene por qué quedarse en una demostración. Podemos revisar con vosotros una ficha, interpretar una campaña o abordar una incidencia abierta. Explicamos lo que vemos, valoramos opciones y, cuando proceda, hacemos el trabajo juntos con vuestra aprobación. Tu equipo participa y entiende lo que se está cambiando.', 'Si corregimos un atributo, explicamos de dónde sale el dato y qué habría que comprobar en otra referencia. Si una respuesta depende de Amazon o requiere documentación, aclaramos qué falta y el siguiente paso. No prometemos cerrar cualquier problema en una clase: aprovechamos el caso real para avanzar y aprender, con sus límites concretos.'] },
    { id: 'acompanamiento', title: '5. Os acompañamos cuando lo ponéis en práctica', paragraphs: ['Entre reuniones, el equipo puede continuar con las tareas acordadas y dejar preguntas por WhatsApp, email u otro canal que prefiráis y acordemos juntos. En la siguiente sesión revisaríamos qué ha podido aplicar, dónde se ha atascado y qué conviene explicar de otra forma. Los tiempos de atención y el alcance del seguimiento se acuerdan contigo; no lo confundimos con una gestión continua de la cuenta.', 'Para trabajar en Seller Central, concretamos el acceso autorizado y los permisos necesarios según la colaboración. También podemos compartir pantalla con vuestro equipo al control. No pedimos contraseñas, códigos de un solo uso o datos bancarios, ni incorporamos datos de compradores al material formativo.'], source: 1 },
    { id: 'continuidad', title: '6. Revisamos contigo qué puede asumir ya el equipo', paragraphs: ['No medimos el avance solo contando reuniones. Revisaríamos si la persona puede repetir una tarea, explicar sus decisiones y reconocer cuándo necesita ayuda. Así dedicamos la siguiente sesión a una necesidad real, en vez de repetir contenidos que ya domina. Lo importante es que el aprendizaje tenga continuidad dentro de vuestra empresa.', 'Al cerrar o ajustar el acompañamiento, repasaríamos los temas trabajados y los que siguen necesitando apoyo. Podéis continuar con otro bloque, acordar una intervención concreta o seguir internamente. La formación desarrolla capacidades, pero no garantiza ventas ni sustituye los recursos del negocio.', 'Cuéntanos quién llevará Amazon, qué necesita aprender y qué disponibilidad tiene. La primera conversación es gratuita y sin compromiso. Te proponemos cómo trabajaríamos con tu empresa y dejamos claro qué incluye el acompañamiento antes de comenzar.'] },
  ],
  checklist: ['Sabemos quién participaría y qué quiere asumir.', 'Podemos explicar dónde nos atascamos, sin preparar un temario.', 'La propuesta adapta sesiones y plazo a nuestra disponibilidad.', 'Entendemos cómo se utilizarán nuestra cuenta y nuestros productos.', 'Sabemos qué podemos trabajar en sesión y qué se acuerda aparte.', 'Conocemos el canal y los tiempos de atención.', 'Está claro cómo revisaremos el aprendizaje con la agencia.'],
  faqs: [
    { question: '¿Tenemos que diseñar nosotros la formación?', answer: 'No. Nos contáis vuestra situación y proponemos las prioridades y sesiones. Las ajustamos contigo antes de empezar.' },
    { question: '¿Se adapta a alguien que ya conoce parte de Amazon?', answer: 'Sí. Revisamos el nivel para trabajar lo que necesita aprender, sin repetir por sistema lo que ya resuelve.' },
    { question: '¿Podemos hacer una tarea real durante la reunión?', answer: 'Sí, si encaja con el objetivo y la información disponible. Explicamos el proceso y los cambios se realizan con vuestra aprobación.' },
    { question: '¿Hay un plazo obligatorio para todos?', answer: 'No hay un plazo estándar publicado. Acordamos duración y ritmo según los objetivos y la disponibilidad, con las condiciones recogidas en la propuesta.' },
  ],
  related: ['preparar-datos-auditoria-amazon', 'acos-tacos-amazon', 'como-redactar-listings-amazon'],
  sources: [university, permissions],
};

export const trainingBlog: BlogPost = {
  date: '2026-10-29', updatedAt: '2026-10-29', freeAudit: true,
  slug: 'formar-equipo-o-delegar-amazon',
  title: '¿Formar a tu equipo o delegar Amazon?',
  category: 'Formación y estrategia',
  excerpt: 'No todas las marcas necesitan la misma ayuda. Cuándo aprender a gestionarlo dentro, cuándo delegar y cuándo combinar las dos opciones.',
  takeaway: 'Si quieres mantener la gestión dentro y tienes una persona con disponibilidad, la formación puede darle método y acompañamiento. Si necesitas que alguien se encargue del trabajo, encaja mejor una gestión delegada. También puedes formar al equipo en unas tareas y apoyarte en la agencia para otras.',
  image: '/images/blog-editorial/formar-equipo-o-delegar-amazon.webp',
  imageAlt: 'Comparación de responsabilidades: en formación aprende y aplica tu equipo; en gestión la agencia ejecuta las tareas acordadas.',
  imageCaption: 'Esquema de responsabilidades de Amazon Boost. No representa resultados de un cliente; el alcance se define para cada empresa.',
  service: trainingService.path,
  sections: [
    { id: 'necesidad', title: 'Empieza por lo que necesita tu empresa', paragraphs: ['Hay marcas que quieren desarrollar Amazon dentro de su propia estructura. Conocen sus productos, tienen personas que pueden asumir el trabajo y prefieren conservar ese conocimiento en el equipo. Para ellas, contratar una agencia puede significar aprender con acompañamiento, no entregar toda la gestión.', 'Otras empresas ya tienen conocimientos, pero no tiempo para mantener campañas, catálogo e inventario. Añadir formación no resuelve por sí solo esa necesidad. En Amazon Boost te preguntaríamos quién puede trabajar la cuenta, qué sabe hacer y qué necesitas que asumamos nosotros. Así distinguimos la falta de conocimientos de la falta de capacidad para ejecutar.'] },
    { id: 'formacion', title: 'Formar: tu equipo quiere hacerse cargo', paragraphs: ['La formación encaja cuando una persona o un equipo va a gestionar Amazon y puede aplicar lo aprendido. No tiene que saberlo todo antes de empezar, pero necesita espacio en su trabajo para practicar. Lo acompañamos con explicaciones y revisión, en lugar de enviar un temario para que se las arregle solo.', 'Trabajaríamos sobre vuestra cuenta: una ficha, un informe o una incidencia. Acordaríamos sesiones y plazo según las necesidades y disponibilidad. Los recursos oficiales de Seller University pueden servir para repasar conceptos; el acompañamiento privado añade su aplicación a vuestro negocio, sin convertirse por ello en una formación oficial.'], source: 0, items: ['Quieres conservar el conocimiento dentro.', 'Hay alguien que puede participar y practicar.', 'Necesitáis aprender tareas que vais a seguir haciendo.'] },
    { id: 'gestion', title: 'Delegar: necesitas que el trabajo salga adelante', paragraphs: ['La gestión encaja cuando buscas que una agencia asuma las tareas acordadas y su seguimiento. Puede ser publicidad o un alcance más amplio. Tu empresa sigue aportando datos del producto, prioridades y aprobaciones; la agencia realiza el trabajo operativo definido en la propuesta. No significa que el titular desaparezca de las decisiones.', 'Si nadie puede revisar campañas entre reuniones, aprender a leer un informe no elimina ese hueco. Es un ejemplo hipotético, no un caso de cliente. Delegar puede cubrir una necesidad de ejecución que la formación no resuelve sola. Por eso conviene comparar responsabilidades y continuidad, no tratar ambos servicios como el mismo trabajo a distinto precio.'], items: ['El equipo no tiene tiempo para mantener las tareas.', 'Buscas que la agencia asuma un alcance operativo.', 'Necesitas ejecución continuada, además de explicaciones.'] },
    { id: 'combinar', title: 'Combinar: una parte dentro, otra con la agencia', paragraphs: ['No hace falta elegir un modelo para toda la cuenta. Quizá queréis mantener catálogo e inventario dentro y apoyaros en publicidad. O aprender a revisar fichas mientras encargáis la producción visual. La combinación tiene sentido cuando responde a vuestra organización, no cuando solo añade servicios sin aclarar quién se ocupará de cada cosa.', 'Dejaríamos por escrito qué hace cada parte, quién aprueba los cambios y qué se trabaja en sesión. Una consulta entre reuniones no debería convertirse sin acuerdo en un encargo de producción. Y una sesión práctica sí puede incluir cambios reales, cuando proceda y los autoricéis: no se trata de separar artificialmente aprender y hacer.'] },
    { id: 'preguntas', title: 'Tres preguntas para elegir sin complicarlo', paragraphs: ['Primero: ¿quién llevará la cuenta después de la reunión? Si puedes identificar a esa persona y reservarle tiempo, hay una base para valorar formación. Si todo el equipo está dedicado a otras funciones, conviene hablar de qué tareas necesitáis delegar antes de fijar un programa de aprendizaje.', 'Segundo: ¿qué queréis poder hacer dentro de la empresa? No es igual aprender a revisar campañas que asumir toda la operativa. Tercero: ¿qué necesita avanzar ahora? Puede haber un problema concreto que trabajar primero y un aprendizaje que desarrollar después. Ninguna respuesta obliga a contratar un paquete fijo de horas o meses.'], items: ['Quién podrá aplicar lo trabajado.', 'Qué tareas queréis mantener dentro.', 'Qué necesita atención ahora y quién lo asumirá.'] },
    { id: 'siguiente-paso', title: 'Así lo valoraríamos contigo en Amazon Boost', paragraphs: ['Empezaríamos entendiendo cómo está organizada tu empresa y qué ocurre en la cuenta. Si encaja la formación, propondríamos un plan a medida con práctica sobre vuestros datos y productos. Si falta ejecución, explicaríamos qué gestión o intervención tiene sentido. No recomendamos formación a una persona que no dispondrá de tiempo para usarla.', 'Para comparar propuestas, mira qué tareas incluyen, quién las hace y qué apoyo queda entre reuniones. Podéis elegir WhatsApp, email u otro canal de seguimiento que acordemos juntos, con sus tiempos de atención definidos. Recibir consultas a cualquier hora no supone respuesta inmediata. Los trabajos operativos fuera de sesión se concretan por separado.', 'La primera conversación es gratuita y sin compromiso. Cuéntanos qué queréis mantener dentro, quién podría asumirlo y dónde necesitáis ayuda. Con ese contexto proponemos un reparto razonable de trabajo. Ningún modelo garantiza ventas: buscamos que la gestión tenga responsables, recursos y continuidad.'] },
  ],
  tags: ['formación Amazon', 'equipo interno', 'agencia boutique', 'gestión de cuenta'],
  guides: ['preparar-datos-auditoria-amazon', 'acos-tacos-amazon', 'como-redactar-listings-amazon'],
  relatedPosts: ['agencia-boutique-amazon-responsabilidad', 'automatizar-amazon-control-decisiones'],
  sources: [university],
  seo: { metaTitle: 'Formar a tu equipo o delegar Amazon: cómo elegir', metaDescription: 'Formación, gestión delegada o ambas: compara quién ejecuta las tareas y qué necesita tu empresa para elegir cómo trabajar Amazon con una agencia.' },
};
