import type { Metadata } from 'next';

import FinanceSubcategoryLanding from '@/components/FinanceSubcategoryLanding';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `Tax Calculators - Free Online Tools | ${siteConfig.name}`,
  description: 'Explore tax calculators including income tax, salary tax impact, sales tax, and VAT tools.',
  alternates: { canonical: `${getBaseUrl()}/tax-calculators` },
};

export default function TaxCalculatorsPage() {
  return <FinanceSubcategoryLanding subcategory="tax" />;
}
