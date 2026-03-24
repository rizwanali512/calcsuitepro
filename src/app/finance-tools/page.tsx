import type { Metadata } from 'next';
import CalculatorIndexingPage from '@/components/CalculatorIndexingPage';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Finance Tools - Free Online Calculators',
  description:
    'Explore finance tools and calculators for EMI, simple interest, compound interest, and profit margin calculations.',
  alternates: { canonical: `${getBaseUrl()}/finance-tools` },
};

export default function FinanceToolsPage() {
  const seoContent = [
    'Finance tools help users make better money decisions by turning financial formulas into simple, instant calculations. Instead of manually computing interest rates, installments, or margins, you can use dedicated online finance calculators to get fast and consistent outputs. This saves time and improves accuracy, especially when you need to compare multiple scenarios.',
    'This finance tools page aggregates important calculators used for personal budgeting, loan planning, business analysis, and investment forecasting. You can quickly move between EMI calculators, interest calculators, and margin tools based on your current use case. Because each calculator has its own slug and content page, this hub also makes navigation easier for users who are exploring related financial metrics.',
    'As an indexing booster page, finance tools create strong internal linking signals for search engines while improving user discovery. A single optimized hub linking to multiple finance calculator pages helps crawlers understand topic relevance and page relationships. It also helps visitors find the exact calculator they need without searching repeatedly. Use this page as your finance starting point, then branch to other categories when your calculation workflow crosses into math, physics, or health.',
  ];

  return (
    <CalculatorIndexingPage
      title="Finance Tools"
      seoContent={seoContent}
      calculators={getCalculatorsByCategory('finance')}
    />
  );
}
