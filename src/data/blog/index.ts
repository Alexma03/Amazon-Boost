import { optimizacionListingsData } from './optimizacion-listings.ts';
import { estrategiasPpcData } from './estrategias-ppc.ts';
import { tendenciasEcommerceData } from './tendencias-ecommerce.ts';
import { herramientasSeoData } from './herramientas-seo.ts';
import { tacticasResenasData } from './tacticas-resenas.ts';
import { aumentarConversionData } from './aumentar-conversion.ts';
import { algoritmoAmazonData } from './algoritmo-amazon.ts';
import { internacionalizacionData } from './internacionalizacion.ts';
import { marketingInfluencersData } from './marketing-influencers.ts';

export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  source?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updatedAt: string;
  image: string;
  category: string;
  excerpt: string;
  takeaway: string;
  sections: BlogSection[];
  tags: string[];
  service: string;
  guides: string[];
  relatedPosts: string[];
  sources: { label: string; url: string; note?: string }[];
  seo: { metaTitle: string; metaDescription: string };
}

export const allBlogPosts: BlogPost[] = [
  estrategiasPpcData,
  optimizacionListingsData,
  aumentarConversionData,
  algoritmoAmazonData,
  herramientasSeoData,
  tacticasResenasData,
  internacionalizacionData,
  marketingInfluencersData,
  tendenciasEcommerceData,
];

export const blogPostsBySlug: Record<string, BlogPost> = Object.fromEntries(allBlogPosts.map((post) => [post.slug, post]));

export const readingMinutes = (post: BlogPost) => {
  const text = [post.excerpt, post.takeaway, ...post.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.items ?? [])])].join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
};
