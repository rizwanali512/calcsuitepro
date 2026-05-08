import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Mortgage Calculators - Free Online Tools',
  description:
    'Explore mortgage calculators including EMI, affordability, payoff, refinance, and rent vs buy tools.',
  alternates: { canonical: `${getBaseUrl()}/mortgage-calculators` },
};

export default function MortgageCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="mortgage" />;
}
