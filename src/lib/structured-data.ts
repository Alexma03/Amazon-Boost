import { siteUrl } from '../data/site-index';

export const schemaIds = {
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  founder: `${siteUrl}/#fundador`,
};

export const schemaId = (url: string, entity: 'webpage' | 'service' | 'article' | 'breadcrumb') => `${url}#${entity}`;

interface PageData {
  title?: string;
  description?: string;
  image?: string | null;
  date?: string;
  dateModified?: string;
}

interface SchemaOptions {
  url: string;
  title: string;
  description: string;
  type: 'organization' | 'article' | 'service' | 'breadcrumb';
  pageType?: string;
  image?: string | null;
  data?: PageData;
}

const ref = (id: string) => ({ '@id': id });
const absolute = (path: string) => new URL(path, siteUrl).href;

export function buildPageSchema({ url, title, description, type, pageType, image, data }: SchemaOptions) {
  const pageId = schemaId(url, 'webpage');
  const page: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url,
    name: title,
    description,
    inLanguage: 'es-ES',
    isPartOf: ref(schemaIds.website),
    publisher: ref(schemaIds.organization),
    ...(url === `${siteUrl}/` ? { mainEntity: ref(schemaIds.organization) } : {}),
  };

  const graph: Record<string, unknown>[] = [page];

  if (url === `${siteUrl}/`) {
    graph.push({
      '@type': 'Organization',
      '@id': schemaIds.organization,
      name: 'Amazon Boost',
      url: `${siteUrl}/`,
      description: 'Agencia Amazon para marcas privadas en Espa\u00f1a y Europa.',
      logo: {
        '@type': 'ImageObject',
        url: absolute('/images/amazon-boost-logo.png'),
        width: 800,
        height: 800,
      },
      address: { '@type': 'PostalAddress', addressCountry: 'ES' },
      areaServed: ['Espa\u00f1a', 'Europa'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+34650606400',
        email: 'info@amznboost.es',
        availableLanguage: ['es'],
      },
      founder: ref(schemaIds.founder),
      sameAs: [
        'https://www.linkedin.com/company/amznboost/',
        'https://es.trustpilot.com/review/amznboost.es',
      ],
    });
    graph.push({
      '@type': 'Person',
      '@id': schemaIds.founder,
      name: 'Sergio Porras de Román',
      url: schemaIds.founder,
      jobTitle: 'Fundador de Amazon Boost',
      worksFor: ref(schemaIds.organization),
      sameAs: ['https://www.linkedin.com/in/sergio-deroman-amazon/'],
    });
    graph.push({
      '@type': 'WebSite',
      '@id': schemaIds.website,
      name: 'Amazon Boost',
      url: `${siteUrl}/`,
      inLanguage: 'es-ES',
      publisher: ref(schemaIds.organization),
    });
  }

  if (type === 'service' && data) {
    const serviceId = schemaId(url, 'service');
    page.mainEntity = ref(serviceId);
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: data.title || title,
      description: data.description || description,
      url,
      serviceType: data.title || title,
      provider: ref(schemaIds.organization),
      areaServed: ['Espa\u00f1a', 'Europa'],
      mainEntityOfPage: ref(pageId),
    });
  }

  if (type === 'article' && data) {
    const articleId = schemaId(url, 'article');
    page.mainEntity = ref(articleId);
    graph.push({
      '@type': pageType === 'blog' ? 'BlogPosting' : 'Article',
      '@id': articleId,
      headline: data.title || title,
      description: data.description || description,
      mainEntityOfPage: ref(pageId),
      author: ref(schemaIds.organization),
      publisher: ref(schemaIds.organization),
      inLanguage: 'es-ES',
      ...(data.image || image ? { image: absolute(data.image || image!) } : {}),
      ...(data.date ? { datePublished: data.date } : {}),
      ...(data.dateModified ? { dateModified: data.dateModified } : {}),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildBreadcrumbSchema(url: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': schemaId(url, 'breadcrumb'),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}
