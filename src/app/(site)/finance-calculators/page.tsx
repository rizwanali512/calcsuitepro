import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';
import { getToolsByCategory } from '@/lib/categories';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: `Finance Calculators | ${siteConfig.name}`,
  description: 'Finance calculators for EMI, interest, and investment planning.',
  alternates: { canonical: getBaseUrl() + '/finance-calculators' },
};

export default function FinanceCalculatorsPage() {
  const tools = getToolsByCategory('finance');
  const subcategoryLinks = [
    {
      title: 'Mortgage Calculators',
      href: '/mortgage-calculators',
      description: 'EMI, affordability, refinance, and mortgage planning tools.',
    },
    {
      title: 'Auto Loan Calculators',
      href: '/auto-calculators',
      description: 'Estimate car loan and lease payments before you finance.',
    },
    {
      title: 'Investment Calculators',
      href: '/investment-calculators',
      description: 'ROI, compound interest, and value growth calculators.',
    },
    {
      title: 'Retirement Calculators',
      href: '/retirement-calculators',
      description: 'Plan retirement corpus, annuity, and pension outcomes.',
    },
    {
      title: 'Tax Calculators',
      href: '/tax-calculators',
      description: 'Income tax, sales tax, VAT, and salary tax estimators.',
    },
    {
      title: 'Loan Calculators',
      href: '/loan-calculators',
      description: 'Loan, EMI, debt payoff, and repayment tools.',
    },
    {
      title: 'General Finance Calculators',
      href: '/general-finance-calculators',
      description: 'Inflation, discount, margin, commission, and budgeting.',
    },
  ];

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Finance Calculators
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400 mb-8">
          Calculate loans, interest, and returns using practical finance formulas.
        </p>
      </div>
      <div className="max-w-6xl mx-auto mb-8">
        <SearchBar calculators={tools} />
      </div>
      <section className="max-w-6xl mx-auto mb-10">
        <h2 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
          Explore Finance Calculator Categories
        </h2>
        <p className="mb-6 max-w-4xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Browse our finance calculator categories including mortgage, investment, loan, and tax
          tools to find the right calculator for your needs.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subcategoryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[16px] border border-gray-200 bg-white p-5 transition hover:border-primary-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500/30"
            >
              <p className="text-base font-semibold text-gray-800 dark:text-white/90">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <article
            key={tool.slug}
            className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
          >
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">{tool.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">{tool.description}</p>
            <Link href={`/${tool.slug}`} className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit">
              Open Calculator
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
