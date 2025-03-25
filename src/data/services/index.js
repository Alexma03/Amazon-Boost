import { accountAuditData } from './account-audit.js';
import { accountManagementData } from './account-management.js';
import { listingOptimizationData } from './listing-optimization.js';
import { ppcManagementData } from './ppc-management.js';

// Array con todos los servicios
export const allServices = [
  accountAuditData,
  accountManagementData,
  listingOptimizationData,
  ppcManagementData
];

// Mapa de servicios por slug para búsquedas rápidas
export const servicesBySlug = {
  [accountAuditData.slug]: accountAuditData,
  [accountManagementData.slug]: accountManagementData,
  [listingOptimizationData.slug]: listingOptimizationData,
  [ppcManagementData.slug]: ppcManagementData
};