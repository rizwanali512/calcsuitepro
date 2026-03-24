import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `General Finance Calculators - Free Online Tools | ${siteConfig.name}`,
  description:
    'Explore general finance calculators including inflation, discount, margin, commission, and budget tools.',
  alternates: { canonical: `${getBaseUrl()}/general-finance-calculators` },
};

export default function GeneralFinanceCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="general" />;
}
