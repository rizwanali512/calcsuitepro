'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/lib/seo';

type Crumb = {
  name: string;
  href: string;
};

const routeLabelMap: Record<string, string> = {
  'all-calculators': 'All Calculators',
  'free-calculators': 'Free Calculators',
  'finance-calculators': 'Finance Calculators',
  'math-calculators': 'Math Calculators',
  'physics-calculators': 'Physics Calculators',
  'health-calculators': 'Health Calculators',
  'mortgage-calculators': 'Mortgage Calculators',
  'auto-calculators': 'Auto Calculators',
  'investment-calculators': 'Investment Calculators',
  'retirement-calculators': 'Retirement Calculators',
  'tax-calculators': 'Tax Calculators',
  'loan-calculators': 'Loan Calculators',
  'general-finance-calculators': 'General Finance Calculators',
  categories: 'Categories',
  blog: 'Blog',
  about: 'About',
  contact: 'Contact',
  terms: 'Terms',
  'privacy-policy': 'Privacy Policy',
  'try-outfit': 'Try Outfit',
};

function toTitleCase(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ name: 'Home', href: '/' }];

  if (segments.length === 0) return crumbs;

  // Calculator pages are handled with richer breadcrumb logic in CalculatorTemplate.
  if (segments.length === 1 && segments[0].endsWith('calculator')) return [];

  let runningPath = '';
  for (const segment of segments) {
    runningPath += `/${segment}`;
    crumbs.push({
      name: routeLabelMap[segment] ?? toTitleCase(segment),
      href: runningPath,
    });
  }
  return crumbs;
}

export default function GlobalBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  if (crumbs.length <= 1) return null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };

  return (
    <div className="wrapper pt-5 md:pt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.href} className="inline-flex items-center gap-2">
                {index > 0 ? <span>/</span> : null}
                {isLast ? (
                  <span className="text-gray-700 dark:text-gray-200">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary-500 transition">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
