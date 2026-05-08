import type { Metadata } from 'next';
import BenefitsGrid from '@/components/sections/benefits-grid';
import TestimonialsSection from '@/components/sections/client-testimonial';
import FaqAccordion from '@/components/sections/faq-accordion';
import HeroSection from '@/components/sections/hero-section';
import ToolsTab from '@/components/sections/tools-tab';
import { CoreFeatures } from '@/components/sections/core-features';
import PricingSection from '@/components/sections/pricing';
import { PopularTools } from '@/components/tools/PopularTools';
import { RecentlyUsedTools } from '@/components/tools/RecentlyUsedTools';
import { getBaseUrl } from '@/lib/site-url';
import { features } from '@/config/features';
import Link from 'next/link';
import { QuickAnswerBlock } from '@/components/seo/QuickAnswerBlock';
import { getTopCalculators } from '@/lib/calculators';
import { HOME_QUICK_ANSWER } from '@/lib/siteQuickAnswers';
import { generateWebSiteSchema, jsonLdString } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Free Online Calculators & Formula Tools',
  description:
    'CalcSuite Pro is a free online calculator platform: EMI, mortgage, compound interest, percentage, BMI, scientific calculator, graphing, physics formulas, and more. Browse finance, math, physics, and health hubs with SEO-friendly tool pages.',
  keywords: [
    'online calculator',
    'free calculator',
    'finance calculator',
    'EMI calculator',
    'mortgage calculator',
    'BMI calculator',
    'scientific calculator',
    'graph calculator',
    'math calculator',
    'physics calculator',
  ],
  alternates: (() => {
    const home = getBaseUrl() + '/';
    return {
      canonical: home,
      languages: { en: home, 'x-default': home },
    };
  })(),
};

const cardClass =
  'glass-card p-6 rounded-2xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 flex flex-col';

export default async function Home() {
  const topTools = getTopCalculators();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(websiteSchema) }}
      />
      <HeroSection />
      <div className="wrapper pt-2 pb-6 md:pb-10">
        <div className="max-w-3xl mx-auto">
          <QuickAnswerBlock paragraphs={HOME_QUICK_ANSWER} />
        </div>
      </div>
      <CoreFeatures />
      {features.homepageToolsTabEnabled && <ToolsTab />}
      <BenefitsGrid />
      <TestimonialsSection />
      {features.pricingEnabled && <PricingSection />}
      <section className="wrapper py-14 md:py-28">
        <RecentlyUsedTools />

        <div className="max-w-5xl mx-auto w-full">
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            Used by thousands of users worldwide.
          </p>
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Featured Calculators
            </h2>
            <Link
              href="/free-calculators"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
            >
              Browse all calculators
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTools.map((t) => (
              <div key={t.slug} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {t.description}
                </p>
                <Link
                  href={t.href}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md w-fit"
                >
                  Open calculator
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <PopularTools />
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Popular Calculators
            </h2>
            <Link
              href="/all-calculators"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
            >
              View popular calculator pages
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {getTopCalculators()
              .slice(0, 8)
              .map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                >
                  {tool.name}
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Calculator Categories
            </h2>
            <Link
              href="/categories"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
            >
              View all categories
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: '/finance-calculators',
                name: 'Finance Calculators',
                description:
                  'Calculate EMI, interest, and common finance formulas.',
              },
              {
                href: '/math-calculators',
                name: 'Math Calculators',
                description:
                  'Solve percentage and core math formulas quickly.',
              },
              {
                href: '/physics-calculators',
                name: 'Physics Calculators',
                description:
                  'Compute motion and mechanics formulas in seconds.',
              },
              {
                href: '/health-calculators',
                name: 'Health Calculators',
                description:
                  'Track BMI, calorie, and wellness metrics with clear formulas.',
              },
            ].map((hub) => (
              <article key={hub.href} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {hub.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {hub.description}
                </p>
                <Link
                  href={hub.href}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md w-fit"
                >
                  View calculators
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18 max-w-5xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Finance Subcategories
            </h2>
            <Link
              href="/finance-calculators"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
            >
              View finance calculators
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: '/mortgage-calculators',
                name: 'Mortgage Calculators',
                description: 'Plan EMI, refinancing, payoff, and affordability scenarios.',
              },
              {
                href: '/investment-calculators',
                name: 'Investment Calculators',
                description: 'Estimate compounding, ROI, and future value growth.',
              },
              {
                href: '/loan-calculators',
                name: 'Loan Calculators',
                description: 'Compare loan repayment options and debt payoff plans.',
              },
            ].map((hub) => (
              <article key={hub.href} className={cardClass}>
                <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                  {hub.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                  {hub.description}
                </p>
                <Link
                  href={hub.href}
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md w-fit"
                >
                  View calculators
                </Link>
              </article>
            ))}
          </div>
        </div>

      </section>
      <FaqAccordion />
    </>
  );
}
