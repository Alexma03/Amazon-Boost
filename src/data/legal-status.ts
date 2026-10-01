export const legalPagePaths = [
  '/aviso-legal/',
  '/politica-de-privacidad/',
  '/politica-de-cookies/',
] as const;

export const legalDetails = {
  ownerName: '',
  taxId: '',
  professionalAddress: '',
  contactRetention: '',
  reviewedByAdvisor: false,
  productionCookieAuditComplete: false,
} as const;

export const legalReady = Boolean(
  legalDetails.ownerName &&
  legalDetails.taxId &&
  legalDetails.professionalAddress &&
  legalDetails.contactRetention &&
  legalDetails.reviewedByAdvisor &&
  legalDetails.productionCookieAuditComplete,
);
