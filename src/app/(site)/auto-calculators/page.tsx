import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `Auto Calculators - Free Online Tools | ${siteConfig.name}`,
  description: 'Explore auto calculators including car loan and lease estimation tools.',
  alternates: { canonical: `${getBaseUrl()}/auto-calculators` },
};

export default function AutoCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="auto" />;
}
