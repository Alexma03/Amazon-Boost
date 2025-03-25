import { techLifeSolutionsData } from './tech-life-solutions.js';
import { casaModernaData } from './casa-moderna.js';
import { petJoyData } from './pet-joy.js';

// Array con todos los casos de éxito
export const allCaseStudies = [
  techLifeSolutionsData,
  casaModernaData,
  petJoyData
];

// Mapa de casos de éxito por slug para búsquedas rápidas
export const caseStudiesBySlug = {
  [techLifeSolutionsData.slug]: techLifeSolutionsData,
  [casaModernaData.slug]: casaModernaData,
  [petJoyData.slug]: petJoyData
};