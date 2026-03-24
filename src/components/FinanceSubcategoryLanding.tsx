import Link from 'next/link';

import { calculators } from '@/lib/calculators';

type SubcategoryKey =
  | 'mortgage'
  | 'auto'
  | 'investment'
  | 'retirement'
  | 'tax'
  | 'loans'
  | 'general';

type SubcategoryPageConfig = {
  slug: string;
  title: string;
  intro: string;
  longSeoText: string;
};

const PAGE_CONFIG: Record<SubcategoryKey, SubcategoryPageConfig> = {
  mortgage: {
    slug: 'mortgage-calculators',
    title: 'Mortgage Calculators',
    intro:
      'Explore practical mortgage tools for monthly payments, affordability, refinance planning, and home buying decisions.',
    longSeoText:
      'Mortgage calculators help you understand how a home loan affects your monthly cash flow and long-term financial plan. Before finalizing a property purchase, most buyers want to know three things: what the monthly payment will be, how much home they can safely afford, and whether refinancing can reduce costs later. A mortgage calculator system gives clear answers quickly by using your loan amount, annual interest rate, and tenure. You can compare scenarios like shorter vs longer term, higher vs lower down payment, and fixed budget vs target property value. This makes it easier to avoid over-borrowing and to align housing costs with your savings and lifestyle goals. These tools are useful for first-time buyers, repeat buyers, and even investors evaluating rental property financing. Instead of relying on rough estimates, you get formula-based outputs that improve confidence before applying for a loan. If rates change, you can instantly recalculate and adjust your strategy. Use these calculators to build a realistic plan for EMI, payoff timeline, and affordability so your home decision stays financially sustainable.',
  },
  auto: {
    slug: 'auto-calculators',
    title: 'Auto Calculators',
    intro:
      'Use auto finance calculators for car loans and lease estimates before selecting your next vehicle.',
    longSeoText:
      'Auto calculators help drivers plan vehicle financing with more clarity and less guesswork. Whether you are deciding between a car loan and a lease, you need to understand the monthly cost, total paid over time, and the impact of interest rates on your budget. With these tools, you can estimate loan payments based on principal, tenure, and annual rate, then compare that against lease-style payment assumptions. This comparison is useful when you are balancing comfort, affordability, and long-term ownership goals. Buyers can test multiple scenarios quickly, such as increasing down payment, choosing a different term, or waiting for a lower rate. By modeling these choices early, you reduce the risk of selecting a payment level that strains your monthly finances. Auto finance calculators are also useful for negotiation because you can evaluate offers from dealerships and lenders using the same inputs. Instead of focusing only on sticker price, you can compare true monthly impact and overall financing cost. Use these calculators to make smarter car financing decisions, protect cash flow, and choose the option that fits your personal budget and usage timeline.',
  },
  investment: {
    slug: 'investment-calculators',
    title: 'Investment Calculators',
    intro:
      'Plan returns, value growth, and portfolio decisions using compound, ROI, present value, and future value tools.',
    longSeoText:
      'Investment calculators are designed to turn return assumptions into clear, measurable outcomes. Investors often ask how much money a portfolio can grow to, what return percentage a project is generating, or what a future amount is worth today. With tools like compound interest, ROI, present value, and future value calculators, you can answer these questions in minutes. They are especially useful for comparing short-term vs long-term strategies, evaluating fixed return opportunities, and setting realistic wealth targets. By changing one variable at a time, such as annual return rate or time horizon, you can see how sensitive outcomes are to market assumptions. This helps with risk-aware decision making and better expectations. These calculators are valuable for beginners learning core finance formulas as well as experienced users validating allocation ideas. They also support goal planning, such as education funds, retirement corpus targets, or business investment analysis. Instead of relying on intuition, you can use data-driven projections to decide contribution levels and timeline adjustments. Use these investment tools regularly to track progress, compare opportunities, and keep your financial strategy aligned with your long-term goals.',
  },
  retirement: {
    slug: 'retirement-calculators',
    title: 'Retirement Calculators',
    intro:
      'Estimate retirement readiness using contribution, annuity, and pension-focused calculators.',
    longSeoText:
      'Retirement calculators help you convert long-term savings goals into practical monthly and yearly actions. Planning retirement is not just about guessing a large number; it is about understanding how contributions, return rates, and time horizon interact. With retirement, annuity, and pension calculators, you can estimate the future corpus needed, project contribution growth, and compare income scenarios after retirement. These tools are helpful for salaried professionals, self-employed individuals, and families building multi-decade financial plans. You can test what happens if you increase annual contributions, delay retirement age, or change expected return assumptions. That scenario analysis makes your plan more flexible and realistic in changing markets. Instead of waiting until late career to evaluate readiness, these calculators support continuous planning from early earning years. They also make it easier to align retirement goals with other priorities like education, housing, and emergency funds. A well-structured retirement calculator flow reduces uncertainty and encourages disciplined saving behavior. Use these tools to define milestones, measure progress, and build a retirement plan that supports financial independence with better confidence and fewer surprises.',
  },
  tax: {
    slug: 'tax-calculators',
    title: 'Tax Calculators',
    intro:
      'Estimate income tax, salary tax impact, sales tax, and VAT with quick percentage-based tools.',
    longSeoText:
      'Tax calculators simplify one of the most important parts of personal and business financial planning. Many people know their gross income or invoice amount but are unsure how much tax is actually payable or how taxes affect net take-home value. With income tax, sales tax, VAT, and salary-focused calculators, you can estimate tax obligations quickly using straightforward formula-based inputs. These tools are useful for budgeting, pricing, payroll planning, and compliance preparation. For individuals, they help forecast net income and avoid year-end surprises. For businesses, they support quote accuracy by separating base value and tax components clearly. They are also useful for comparing rates across products, services, or jurisdictions when applicable. By checking tax impact before making decisions, you improve pricing strategy and cash flow planning. These calculators do not replace professional tax advice, but they provide a fast first-pass estimate that improves day-to-day financial decisions. Use tax calculators regularly during invoicing, salary planning, and annual reviews so your numbers stay realistic and aligned with your actual payable amounts.',
  },
  loans: {
    slug: 'loan-calculators',
    title: 'Loan Calculators',
    intro:
      'Calculate loan payments, EMI, debt payoff estimates, and repayment planning with practical debt tools.',
    longSeoText:
      'Loan calculators are essential when borrowing decisions can affect your monthly budget for years. Whether you are evaluating personal loans, student loans, or credit card balances, you need a reliable way to estimate periodic payment and repayment burden. These tools use principal, interest rate, and tenure to produce practical outcomes you can compare before accepting any offer. In addition to basic payment estimates, debt-focused calculators can help you think about payoff strategy and payment discipline. You can model higher payments, shorter terms, or lower rates to understand the trade-offs between monthly affordability and total interest cost. This allows borrowers to avoid choosing repayment plans that look attractive initially but become difficult to sustain. Loan calculators are useful for both new borrowing and restructuring existing debt. They support pre-approval planning, lender comparison, and household cash flow decisions. Instead of making debt choices based only on marketing headlines, you can use formula-driven comparisons to prioritize stability. Use these calculators to set responsible repayment targets, reduce uncertainty, and maintain better control of your financial commitments.',
  },
  general: {
    slug: 'general-finance-calculators',
    title: 'General Finance Calculators',
    intro:
      'Use everyday finance tools for inflation, discount, margin, commission, and budget calculations.',
    longSeoText:
      'General finance calculators support the daily decisions that shape long-term money outcomes. Not every financial task is a loan or investment decision. Many are practical checks like evaluating a discount, estimating inflation impact, calculating commission, understanding margin, or balancing monthly budget. These tools are designed for quick and accurate answers using simple inputs, making them useful for households, freelancers, students, and business owners. An inflation calculator helps you understand purchasing power changes over time, while discount and margin tools assist with smarter buying and pricing decisions. Commission calculators can support sales planning, and budget calculators help track whether spending is within limits. Together, these utilities improve financial awareness in day-to-day life. They also reduce arithmetic mistakes that can lead to poor decisions, especially when repeated frequently. By using standardized formulas, you can compare scenarios consistently and take action faster. General finance calculators are ideal for routine planning and quick validation before spending, pricing, or allocating money. Use them regularly to improve clarity, maintain discipline, and build better financial habits through data-backed decisions.',
  },
};

const SUBCATEGORY_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Mortgage Calculators', href: '/mortgage-calculators' },
  { label: 'Auto Calculators', href: '/auto-calculators' },
  { label: 'Investment Calculators', href: '/investment-calculators' },
  { label: 'Retirement Calculators', href: '/retirement-calculators' },
  { label: 'Tax Calculators', href: '/tax-calculators' },
  { label: 'Loan Calculators', href: '/loan-calculators' },
  { label: 'General Finance Calculators', href: '/general-finance-calculators' },
];

type Props = {
  subcategory: SubcategoryKey;
};

export default function FinanceSubcategoryLanding({ subcategory }: Props) {
  const config = PAGE_CONFIG[subcategory];
  const tools = calculators.filter(
    (calculator) => calculator.category === 'finance' && calculator.subcategory === subcategory
  );

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {config.title}
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
          {config.intro}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <article
            key={tool.slug}
            className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
          >
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">{tool.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {tool.description}
            </p>
            <Link
              href={`/${tool.slug}`}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              Open Calculator
            </Link>
          </article>
        ))}
      </div>

      {tools.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 py-8">
          No calculators in this subcategory yet.
        </p>
      )}

      <section className="max-w-3xl mx-auto mt-10">
        <p className="text-gray-500 dark:text-gray-400 leading-7 text-left">
          {config.longSeoText}
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
          Explore More Finance Pages
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/finance-calculators"
            className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
          >
            Back to Finance Calculators
          </Link>
          {SUBCATEGORY_LINKS.filter((item) => item.href !== `/${config.slug}`).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
