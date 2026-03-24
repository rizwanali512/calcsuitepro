import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `Investment Calculators - Free Online Tools | ${siteConfig.name}`,
  description:
    'Explore investment calculators including compound interest, ROI, present value, and future value tools.',
  alternates: { canonical: `${getBaseUrl()}/investment-calculators` },
};

export default function InvestmentCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="investment" />;
}
