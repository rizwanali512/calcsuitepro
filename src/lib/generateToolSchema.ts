import type { Calculator as Tool } from '@/lib/calculators';
import { siteConfig } from '@/lib/seo';
import { buildToolSeoSpec } from '@/lib/tool-seo';

/**
 * WebApplication JSON-LD for individual tool URLs (rich results / SEO).
 */
export function generateWebApplicationSchema(tool: Tool): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${siteConfig.url}/${tool.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/**
 * FAQPage JSON-LD when SEO content defines FAQs (same source as ToolSEOContent).
 */
export function generateFaqPageSchema(tool: Tool): Record<string, unknown> | null {
  const spec = buildToolSeoSpec(
    tool.slug,
    tool.name,
    tool.description,
    tool.category
  );
  const faqs = spec.faqs.slice(0, 5).filter((f) => f.q && f.a);
  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * BreadcrumbList for tool detail pages.
 */
export function generateToolBreadcrumbSchema(tool: Tool): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/tools` },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${siteConfig.url}/${tool.slug}`,
      },
    ],
  };
}

/**
 * All JSON-LD objects to emit for a tool route (SSR-safe; stringify in the page).
 * Order: WebApplication → FAQPage (if any) → BreadcrumbList.
 */
export function generateToolSchema(tool: Tool): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [
    generateWebApplicationSchema(tool),
  ];

  const faq = generateFaqPageSchema(tool);
  if (faq) schemas.push(faq);

  schemas.push(generateToolBreadcrumbSchema(tool));

  return schemas;
}
