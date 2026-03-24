import type { Metadata } from 'next';
import Link from 'next/link';
import { calculators } from '@/lib/calculators';
import { CATEGORY_META, getToolsByCategory } from '@/lib/categories';
import { getBaseUrl } from '@/lib/site-url';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Calculators',
  description:
    'Browse the complete collection of formula-based finance, math, and physics calculators.',
  alternates: { canonical: getBaseUrl() + '/all-tools' },
  openGraph: {
    title: `All Calculators | ${siteConfig.name}`,
    description:
      'Browse the complete collection of formula-based finance, math, and physics calculators.',
    url: getBaseUrl() + '/all-tools',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `All Calculators | ${siteConfig.name}`,
    description:
      `Browse the complete collection of formula-based calculators on ${siteConfig.name}.`,
  },
};

export default function AllToolsPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <header className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          All Calculators
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-6">
          Browse the complete collection of formula calculators available on
          {siteConfig.name}.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-14">
        {CATEGORY_META.map((cat) => {
          const categoryTools = getToolsByCategory(cat.slug);
          if (categoryTools.length === 0) return null;

          return (
            <section key={cat.slug} className="scroll-mt-6">
              <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90 border-b border-gray-200 dark:border-gray-700 pb-2">
                {cat.name}
              </h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {categoryTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline text-sm md:text-base"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

      </div>

      <p className="mt-12 max-w-2xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        {siteConfig.name} offers {calculators.length} formula calculators across core
        categories, all free to use in your browser.
      </p>
    </div>
  );
}
