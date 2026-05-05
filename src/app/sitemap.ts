import type { MetadataRoute } from 'next';

import { blogs } from '@/lib/blogs';
import { calculators } from '@/lib/calculators';
import { CATEGORY_META } from '@/lib/categories';
import { COMPARE_PAGE_SLUGS } from '@/lib/compare-pages';
import { getBaseUrl } from '@/lib/site-url';
import { SEO_PAGE_SLUGS } from '@/lib/seo-pages';
import { seoPages } from '@/lib/seoPages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/all-calculators',
    '/categories',
    '/free-calculators',
    '/finance-calculators',
    '/math-calculators',
    '/physics-calculators',
    '/health-calculators',
    '/mortgage-calculators',
    '/auto-calculators',
    '/investment-calculators',
    '/retirement-calculators',
    '/tax-calculators',
    '/loan-calculators',
    '/general-finance-calculators',
    '/finance-tools',
    '/math-tools',
    '/privacy-policy',
    '/terms',
    '/blog',
  ];

  const calculatorPaths = calculators.map((calculator) => `/${calculator.slug}`);
  const seoPaths = seoPages.map((seoPage) => `/${seoPage.slug}`);
  const blogPaths = blogs.map((blog) => `/blog/${blog.slug}`);
  const categoryPaths = CATEGORY_META.map((category) => `/category/${category.slug}`);
  const comparePaths = COMPARE_PAGE_SLUGS.map((slug) => `/compare/${slug}`);
  const seoLandingPaths = SEO_PAGE_SLUGS.map((slug) => `/seo/${slug}`);

  const allPaths = [
    ...staticPaths,
    ...calculatorPaths,
    ...seoPaths,
    ...blogPaths,
    ...categoryPaths,
    ...comparePaths,
    ...seoLandingPaths,
  ];
  const uniquePaths = Array.from(new Set(allPaths));

  return uniquePaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
