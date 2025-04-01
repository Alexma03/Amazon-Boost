import { optimizacionListingsData } from './blog/optimizacion-listings.ts';
import { estrategiasPpcData } from './blog/estrategias-ppc.ts';
import { tendenciasEcommerceData } from './blog/tendencias-ecommerce.ts';
import { herramientasSeoData } from './blog/herramientas-seo.ts';
import { tacticasResenasData } from './blog/tacticas-resenas.ts';
import { aumentarConversionData } from './blog/aumentar-conversion.ts';
import { algoritmoAmazonData } from './blog/algoritmo-amazon.ts';
import { internacionalizacionData } from './blog/internacionalizacion.ts';
import { marketingInfluencersData } from './blog/marketing-influencers.ts';
import type { BlogPost } from './blog/index.ts';

// Versión simplificada de BlogPost para mostrar en la lista de posts
export interface BlogPostPreview {
  slug: string;
  image: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
}

// Convertir los posts completos a versiones de vista previa
export const posts: BlogPostPreview[] = [
  estrategiasPpcData,
  optimizacionListingsData,
  tendenciasEcommerceData,
  herramientasSeoData,
  tacticasResenasData,
  aumentarConversionData,
  algoritmoAmazonData,
  internacionalizacionData,
  marketingInfluencersData
].map(post => ({
  slug: post.slug,
  image: post.image,
  title: post.title,
  date: post.date,
  author: post.author,
  excerpt: post.excerpt
})); 