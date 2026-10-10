export const legalPagePaths = [
  '/aviso-legal/',
  '/politica-de-privacidad/',
  '/politica-de-cookies/',
] as const;

export const legalDetails = {
  ownerName: 'Sergio Porras de Román',
  taxId: '',
  professionalAddress: '',
  contactRetention: 'Las consultas y solicitudes de auditoría que no den lugar a una contratación se conservarán durante un máximo de 12 meses desde el último contacto relacionado con la solicitud, para atenderla y realizar el seguimiento solicitado. Después se suprimirán o anonimizarán, salvo que sea necesario conservar información concreta para cumplir una obligación legal o atender una reclamación, durante el plazo aplicable a esa finalidad.',
  reviewedByAdvisor: false,
  productionCookieAuditComplete: false,
} as const;

// Publication approval is separate from verification of legal completeness.
export const legalPublicationApproved = true;

export const legalReady = Boolean(
  legalDetails.ownerName &&
  legalDetails.taxId &&
  legalDetails.professionalAddress &&
  legalDetails.contactRetention &&
  legalDetails.reviewedByAdvisor &&
  legalDetails.productionCookieAuditComplete,
);
