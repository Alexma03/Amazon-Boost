export const legalPagePaths = [
  '/aviso-legal/',
  '/politica-de-privacidad/',
  '/politica-de-cookies/',
] as const;

export const legalDetails = {
  ownerName: 'Sergio Porras de Román',
  taxId: '',
  professionalAddress: '',
  contactRetention: '',
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
