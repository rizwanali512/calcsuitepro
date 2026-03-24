import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `Retirement Calculators - Free Online Tools | ${siteConfig.name}`,
  description:
    'Explore retirement calculators including retirement corpus, annuity, and pension planning tools.',
  alternates: { canonical: `${getBaseUrl()}/retirement-calculators` },
};

export default function RetirementCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="retirement" />;
}
