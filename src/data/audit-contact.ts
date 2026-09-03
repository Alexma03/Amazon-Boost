export interface AuditContact {
  title: string;
  description: string;
  preparation: string[];
  assistant: { invitation: string; action: string; topic: string };
}

const account: AuditContact = {
  assistant: { invitation: 'Llevemos esta orientación a tu cuenta con una auditoría inicial.', action: 'Revisar mi cuenta', topic: 'la situación de mi cuenta Amazon' },
  title: '¿Qué está frenando el crecimiento de tu cuenta?',
  description: 'Entender el problema es el primer paso. Una auditoría inicial nos permite llevarlo a tu caso: cuéntanos dónde estás y revisaremos qué tendría sentido mover primero.',
  preparation: ['Tu marca y un enlace al catálogo.', 'Qué quieres mejorar en tu cuenta.', 'En qué mercados vendes o quieres empezar.'],
};

const advertising: AuditContact = {
  assistant: { invitation: 'Revisemos tus campañas junto al margen de tus productos.', action: 'Revisar mi publicidad', topic: 'mi publicidad y la rentabilidad en Amazon' },
  title: '¿Tu publicidad crece más que tu margen?',
  description: 'Solicita una auditoría inicial para revisar cómo encajan tus campañas, tus ventas y el margen del producto. Empecemos por entender dónde se está yendo la inversión.',
  preparation: ['Tu catálogo y los productos prioritarios.', 'El objetivo de tus campañas actuales.', 'Qué te preocupa del gasto o de las ventas.'],
};

const listings: AuditContact = {
  assistant: { invitation: 'Podemos revisar qué está frenando la compra en tus fichas.', action: 'Revisar mis listings', topic: 'la conversión de mis listings de Amazon' },
  title: '¿Recibes visitas, pero faltan pedidos?',
  description: 'Llevemos el análisis a tus productos. Solicita una auditoría inicial para revisar la ficha, la propuesta visual y la oferta, y valorar qué puede estar frenando la compra.',
  preparation: ['El enlace a uno o varios productos.', 'Qué has cambiado ya en sus fichas.', 'Dónde notas la falta de resultados.'],
};

const images: AuditContact = {
  assistant: { invitation: 'Veamos qué podrían explicar mejor las imágenes de tu producto.', action: 'Revisar mis imágenes', topic: 'las imágenes de mis productos en Amazon' },
  title: '¿Tus imágenes están ayudando a vender?',
  description: 'Solicita una auditoría inicial de la presentación de tus productos. Revisaremos qué entiende el comprador y qué información puede estar echando en falta antes de decidir.',
  preparation: ['Un enlace al producto o a la Store.', 'Las imágenes que utilizas actualmente.', 'Qué diferencia a tu marca y a tu producto.'],
};

const incidents: AuditContact = {
  assistant: { invitation: 'Cuéntanos qué ha ocurrido y valoraremos contigo el siguiente paso.', action: 'Consultar mi incidencia', topic: 'una incidencia de cuenta, catálogo o fondos en Amazon' },
  title: '¿Una incidencia está frenando tu cuenta?',
  description: 'Cuéntanos qué ha ocurrido y solicita una revisión inicial. Valoraremos el alcance del problema y qué información hace falta para preparar el siguiente paso, sin prometer una resolución que depende de Amazon.',
  preparation: ['El tipo de incidencia y cuándo comenzó.', 'Qué pasos has dado hasta ahora.', 'Si afecta a la cuenta, a productos o a fondos.'],
};

const launch: AuditContact = {
  assistant: { invitation: 'Revisemos tu proyecto antes de empezar a invertir en Amazon.', action: 'Valorar mi lanzamiento', topic: 'el lanzamiento de mi marca en Amazon' },
  title: 'Antes de lanzar, revisemos tu punto de partida.',
  description: 'No necesitas tener la cuenta en marcha para empezar la conversación. Solicita una auditoría inicial de tu proyecto y valoremos catálogo, contenido y preparación del lanzamiento.',
  preparation: ['Qué marca y productos quieres lanzar.', 'Los mercados que estás valorando.', 'En qué fase se encuentra el proyecto.'],
};

const expansion: AuditContact = {
  assistant: { invitation: 'Veamos qué necesita tu marca antes de abrir el siguiente mercado.', action: 'Revisar mi expansión', topic: 'la expansión de mi marca en Amazon Europa' },
  title: '¿Tu cuenta está preparada para el siguiente mercado?',
  description: 'Solicita una auditoría inicial antes de ampliar el canal. Revisemos el catálogo, los recursos y la operativa para identificar qué necesita tu marca antes de dar el siguiente paso.',
  preparation: ['Dónde vendes actualmente.', 'Qué países y productos quieres priorizar.', 'La principal dificultad para expandirte.'],
};

const strategy: AuditContact = {
  assistant: { invitation: 'Pongamos el foco en la decisión que necesita tu marca.', action: 'Hablar de mi proyecto', topic: 'la estrategia de mi marca en Amazon' },
  title: 'De la información a una decisión para tu marca.',
  description: 'Solicita una auditoría inicial y cuéntanos qué necesitas decidir. Pondremos el foco en tu situación y en las prioridades que merece la pena revisar antes de actuar.',
  preparation: ['Tu marca y el estado actual del canal.', 'La decisión que necesitas tomar.', 'Qué equipo y recursos tienes disponibles.'],
};

const profiles: Record<string, AuditContact> = {
  '/servicios/gestion-de-ppc/': advertising,
  '/servicios/optimizacion-de-listados/': listings,
  '/servicios/imagenes-para-amazon/': images,
  '/servicios/desbloqueos-amazon/': incidents,
  '/servicios/lanzamiento-marca-privada-amazon/': launch,
  '/servicios/expansion-amazon-europa/': expansion,
  '/consultoria-amazon/': strategy,
};

export const getAuditContact = (service?: string): AuditContact => service ? profiles[service] ?? account : account;
