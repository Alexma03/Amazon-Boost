import { guides } from '../data/guides.ts';
import { servicePages, serviceDirectory } from '../data/service-pages.ts';
import { boostEssentials, boostFundamentals, boostGuideKeywords, type BoostEntry } from '../data/boost-assistant.ts';

export function buildBoostKnowledge(): BoostEntry[] {
  return [
    ...boostEssentials,
    ...boostFundamentals,
    ...guides.flatMap(guide => {
      const service = serviceDirectory.find(item => item.path === guide.service);
      const source = { label: guide.title, href: guide.path };
      const related = service && { label: service.title, href: service.path };
      return [
        { id: guide.slug, question: guide.title, answer: guide.answer, keywords: boostGuideKeywords[guide.slug] ?? guide.category, source, related },
        ...guide.faqs.map((faq, i) => ({ id: `${guide.slug}:faq:${i}`, question: faq.question, answer: faq.answer, keywords: '', source, related })),
      ];
    }),
    ...servicePages.flatMap(service => [
      {
        id: service.path, question: service.title, answer: `${service.intro} ${service.deliverable}`,
        keywords: `${service.category} ${service.title}`,
        source: { label: service.title, href: service.path },
      },
      ...service.faqs.map((faq, i) => ({
        id: `${service.path}:faq:${i}`, question: faq.question, answer: faq.answer, keywords: '',
        source: { label: service.title, href: service.path },
      })),
    ]),
  ];
}
