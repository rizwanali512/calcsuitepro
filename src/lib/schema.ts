/**
 * Reusable JSON-LD schema generators for SEO.
 *
 * Each function returns a plain object that should be stringified and injected
 * via a `<script type="application/ld+json">` tag. Centralising them here
 * means we never duplicate canonical-URL building, brand strings, or schema
 * vocabulary across pages.
 */

import { siteConfig } from '@/lib/seo';

const SITE_URL = siteConfig.url;
const SITE_NAME = siteConfig.name;

/** Returns `${siteUrl}/${path}` with safe leading-slash handling. */
function url(path: string): string {
  if (!path) return SITE_URL;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/* -------------------------------------------------------------------------- */
/* WebApplication                                                             */
/* -------------------------------------------------------------------------- */

export type WebApplicationConfig = {
  /** Display name of the calculator/app. */
  name: string;
  /** Path for canonical URL, e.g. "/emi-calculator". Slash optional. */
  slug: string;
  /** Plain-language description used by Google for sitelinks. */
  description: string;
  /** Optional. Defaults to "UtilitiesApplication". */
  applicationCategory?: string;
};

export function generateWebApplicationSchema(config: WebApplicationConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.name,
    url: url(config.slug),
    description: config.description,
    applicationCategory: config.applicationCategory ?? 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/* -------------------------------------------------------------------------- */
/* FAQPage                                                                    */
/* -------------------------------------------------------------------------- */

export type FaqEntry = {
  question: string;
  answer: string;
};

export function generateFAQSchema(faqs: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* BreadcrumbList                                                             */
/* -------------------------------------------------------------------------- */

export type BreadcrumbItem = {
  /** Label that the user sees, e.g. "Finance Calculators". */
  name: string;
  /** Path for the link, e.g. "/finance-calculators". */
  path: string;
};

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* BlogPosting                                                                */
/* -------------------------------------------------------------------------- */

export type BlogPostingConfig = {
  title: string;
  description: string;
  slug: string;
  /** ISO date string. Falls back to dateModified or current date if not set. */
  datePublished?: string;
  /** ISO date string. Falls back to datePublished or current date. */
  dateModified?: string;
};

export function generateBlogPostingSchema(post: BlogPostingConfig) {
  const fallbackDate = new Date().toISOString();
  const datePublished = post.datePublished ?? post.dateModified ?? fallbackDate;
  const dateModified = post.dateModified ?? datePublished;
  const postUrl = url(`/blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: postUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* WebSite (homepage only)                                                    */
/* -------------------------------------------------------------------------- */

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free online calculators for finance, math, physics, and health',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/all-calculators?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Convenience helper for inlining a schema object as a JSON-LD `<script>` tag
 * via `dangerouslySetInnerHTML`.
 */
export function jsonLdString(schema: unknown): string {
  return JSON.stringify(schema);
}
