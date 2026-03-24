import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `Loan Calculators - Free Online Tools | ${siteConfig.name}`,
  description:
    'Explore loan calculators including EMI, payment, debt payoff, credit card, and student loan tools.',
  alternates: { canonical: `${getBaseUrl()}/loan-calculators` },
};

export default function LoanCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="loans" />;
}
