import type { MetadataRoute } from 'next';

import { blogs } from '@/lib/blogs';
import { calculators } from '@/lib/calculators';
import { CATEGORY_META } from '@/lib/categories';
import { COMPARE_PAGE_SLUGS } from '@/lib/compare-pages';
import { getBaseUrl } from '@/lib/site-url';
import { SEO_PAGE_SLUGS } from '@/lib/seo-pages';
import { seoPages } from '@/lib/seoPages';
import { isDoorwaySlug } from '@/lib/doorwayPatterns';

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFreq = NonNullable<SitemapEntry['changeFrequency']>;

const STATIC_PRIORITY: Record<string, { priority: number; changeFrequency: ChangeFreq }> = {
  '/': { priority: 1.0, changeFrequency: 'weekly' },
  '/all-calculators': { priority: 0.9, changeFrequency: 'monthly' },
  '/categories': { priority: 0.8, changeFrequency: 'monthly' },
  '/free-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/finance-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/math-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/physics-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/health-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/mortgage-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/auto-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/investment-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/retirement-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/tax-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/loan-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/general-finance-calculators': { priority: 0.8, changeFrequency: 'monthly' },
  '/finance-tools': { priority: 0.7, changeFrequency: 'monthly' },
  '/math-tools': { priority: 0.7, changeFrequency: 'monthly' },
  '/blog': { priority: 0.7, changeFrequency: 'weekly' },
  '/about': { priority: 0.5, changeFrequency: 'yearly' },
  '/contact': { priority: 0.5, changeFrequency: 'yearly' },
  '/privacy-policy': { priority: 0.3, changeFrequency: 'yearly' },
  '/terms': { priority: 0.3, changeFrequency: 'yearly' },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const staticEntries: SitemapEntry[] = Object.entries(STATIC_PRIORITY).map(
    ([path, meta]) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      priority: meta.priority,
      changeFrequency: meta.changeFrequency,
    })
  );

  const calculatorEntries: SitemapEntry[] = calculators.map((calculator) => ({
    url: `${baseUrl}/${calculator.slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const seoEntries: SitemapEntry[] = seoPages
    .filter((page) => !isDoorwaySlug(page.slug))
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified,
      priority: 0.6,
      changeFrequency: 'monthly',
    }));

  const blogEntries: SitemapEntry[] = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified,
    priority: 0.6,
    changeFrequency: 'weekly',
  }));

  const categoryEntries: SitemapEntry[] = CATEGORY_META.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  const compareEntries: SitemapEntry[] = COMPARE_PAGE_SLUGS.map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified,
    priority: 0.5,
    changeFrequency: 'monthly',
  }));

  const seoLandingEntries: SitemapEntry[] = SEO_PAGE_SLUGS.map((slug) => ({
    url: `${baseUrl}/seo/${slug}`,
    lastModified,
    priority: 0.5,
    changeFrequency: 'monthly',
  }));

  const allEntries = [
    ...staticEntries,
    ...calculatorEntries,
    ...seoEntries,
    ...blogEntries,
    ...categoryEntries,
    ...compareEntries,
    ...seoLandingEntries,
  ];

  // Defensive: dedupe by URL in case of overlap.
  const seen = new Set<string>();
  return allEntries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
