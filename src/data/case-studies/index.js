import { estrategiaPreciosLogisticaBebesData } from './estrategia-precios-logistica-bebes.js';
import { techLifeSolutionsData } from './tech-life-solutions.js';
import { casaModernaData } from './casa-moderna.js';
import { petJoyData } from './pet-joy.js';
import { ganhuData } from './ganhu.js';

// Array con todos los casos de éxito
export const allCaseStudies = [
  estrategiaPreciosLogisticaBebesData,
  techLifeSolutionsData,
  casaModernaData,
  petJoyData,
  ganhuData
];

// Mapa de casos de éxito por slug para búsquedas rápidas
export const caseStudiesBySlug = {
  [estrategiaPreciosLogisticaBebesData.slug]: estrategiaPreciosLogisticaBebesData,
  [techLifeSolutionsData.slug]: techLifeSolutionsData,
  [casaModernaData.slug]: casaModernaData,
  [petJoyData.slug]: petJoyData,
  [ganhuData.slug]: ganhuData
};