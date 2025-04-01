import { optimizacionListingsData } from './optimizacion-listings.ts';
import { estrategiasPpcData } from './estrategias-ppc.ts';
import { tendenciasEcommerceData } from './tendencias-ecommerce.ts';
import { herramientasSeoData } from './herramientas-seo.ts';
import { tacticasResenasData } from './tacticas-resenas.ts';
import { aumentarConversionData } from './aumentar-conversion.ts';
import { algoritmoAmazonData } from './algoritmo-amazon.ts';
import { internacionalizacionData } from './internacionalizacion.ts';
import { marketingInfluencersData } from './marketing-influencers.ts';

// Definimos la interfaz para las secciones del blog
export interface BlogSection {
  title: string;
  content: string;
  type?: 'text' | 'list' | 'highlight' | 'image';
  items?: string[];
  imageUrl?: string;
}

// Definimos la interfaz para los posts del blog
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  content?: string; // Campo opcional para mantener compatibilidad
  sections?: BlogSection[]; // Nuevo campo para contenido estructurado
  tags: string[];
  callToAction: {
    text: string;
    url: string;
  };
  relatedPosts: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Array con todos los posts del blog
export const allBlogPosts: BlogPost[] = [
  optimizacionListingsData,
  estrategiasPpcData,
  tendenciasEcommerceData,
  herramientasSeoData,
  tacticasResenasData,
  aumentarConversionData,
  algoritmoAmazonData,
  internacionalizacionData,
  marketingInfluencersData
];

// Mapa de posts por slug para búsquedas rápidas
export const blogPostsBySlug: Record<string, BlogPost> = {
  [optimizacionListingsData.slug]: optimizacionListingsData,
  [estrategiasPpcData.slug]: estrategiasPpcData,
  [tendenciasEcommerceData.slug]: tendenciasEcommerceData,
  [herramientasSeoData.slug]: herramientasSeoData,
  [tacticasResenasData.slug]: tacticasResenasData,
  [aumentarConversionData.slug]: aumentarConversionData,
  [algoritmoAmazonData.slug]: algoritmoAmazonData,
  [internacionalizacionData.slug]: internacionalizacionData,
  [marketingInfluencersData.slug]: marketingInfluencersData
}; 