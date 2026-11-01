// First response by Amazon Boost, supplied by the owner; not an Amazon resolution deadline.
export const unlockingService = {
  path: '/servicios/desbloqueos-amazon/',
  responseTime: 'Respondemos en menos de 24 horas laborables.',
  responseNote: 'Primera respuesta de Amazon Boost. El plazo de revisión y la decisión sobre la cuenta dependen de Amazon.',
  whatsapp: 'https://wa.me/34650606400?text=' + encodeURIComponent('Hola, tengo una cuenta de Amazon bloqueada y quisiera contaros mi caso. Puedo facilitar un resumen y el motivo de la notificación, sin datos sensibles.'),
  topics: ['verificación KYC Amazon', 'fondos retenidos Amazon', 'apelación Amazon'],
  firstSteps: [
    'No envíes otra apelación a ciegas: cada respuesta incompleta o repetida puede complicar el caso.',
    'Guarda todos los avisos y correos de Amazon, con sus fechas.',
    'Revisa el Estado de la cuenta (Account Health) y anota el motivo exacto indicado.',
    'No abras una segunda cuenta de vendedor para eludir el bloqueo: puede agravar la situación y afectar a cuentas relacionadas. Amazon exige una necesidad comercial legítima para tener varias cuentas y que todas estén en buen estado.',
    'No envíes documentos editados o incompletos: la autenticidad de la documentación es clave.',
    'Anota los plazos que indique Amazon en la notificación.',
    'Pide ayuda antes de responder si no tienes claro el motivo.',
  ],
  // Situación de partida / qué hicimos / resultado. Populate only with an approved, anonymized real case.
  caseStudy: null as { startingPoint: string; actions: string; result: string } | null,
};
