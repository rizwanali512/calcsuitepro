import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorIndexingPage from '@/components/CalculatorIndexingPage';
import { calculators } from '@/lib/calculators';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Free Online Calculators - 100+ Tools',
  description:
    'Use free online calculators for finance, math, physics, and health. Fast, accurate, and easy-to-use calculation tools.',
  alternates: { canonical: `${getBaseUrl()}/free-calculators` },
};

export default function FreeCalculatorsPage() {
  const topCalculatorLinks = calculators.slice(0, 8);
  const seoContent = [
    'Free online calculators are one of the easiest ways to solve formula-based problems quickly without opening spreadsheets or writing manual equations. Whether you need to estimate loan payments, calculate interest, solve percentages, or check health metrics, a calculator page gives instant output with clean input fields and predictable results. This reduces human error and helps users repeat calculations with confidence.',
    'This free calculators hub is built as a broad entry point for search and discovery. It links to multiple calculator pages across finance, math, physics, and health so users can move from one calculation task to another without friction. Students can use it for assignments, professionals can use it for day-to-day analysis, and businesses can use it for faster planning decisions. The structure is intentionally simple: open a calculator, input your values, and get a result immediately.',
    'From an SEO architecture perspective, pages like this improve crawl depth and internal linking strength. Search engines can discover many calculator pages from one optimized landing page, while users get a clear navigation path to relevant tools. The content and links on this page are designed to support long-term scaling to 100+ calculators by keeping categories, slugs, and index pages organized. If you are looking for reliable free online calculators, this is the best place to start and branch into specific formula pages.',
  ];

  return (
    <>
      <CalculatorIndexingPage
        title="Free Online Calculators"
        seoContent={seoContent}
        calculators={calculators}
      />
      <section className="wrapper pb-14 md:pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Explore Calculator Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/finance-calculators', label: 'Finance Calculators' },
                { href: '/math-calculators', label: 'Math Calculators' },
                { href: '/physics-calculators', label: 'Physics Calculators' },
                { href: '/health-calculators', label: 'Health Calculators' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Explore Finance Subcategories
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/mortgage-calculators', label: 'Mortgage Calculators' },
                { href: '/investment-calculators', label: 'Investment Calculators' },
                { href: '/retirement-calculators', label: 'Retirement Calculators' },
                { href: '/tax-calculators', label: 'Tax Calculators' },
                { href: '/loan-calculators', label: 'Loan Calculators' },
                { href: '/general-finance-calculators', label: 'General Finance Calculators' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Top Calculator Pages
            </h2>
            <div className="flex flex-wrap gap-2">
              {topCalculatorLinks.map((calculator) => (
                <Link
                  key={calculator.slug}
                  href={`/${calculator.slug}`}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                >
                  {calculator.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
