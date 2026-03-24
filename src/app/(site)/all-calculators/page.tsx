import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORY_META, getToolsByCategory } from '@/lib/categories';
import SearchBar from '@/components/SearchBar';
import { calculators } from '@/lib/calculators';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `All Calculators | ${siteConfig.name}`,
  description:
    'Browse all finance, math, and physics calculators with formulas and instant results.',
  alternates: { canonical: getBaseUrl() + '/all-calculators' },
};

export default function AllCalculatorsPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <header className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          All Calculators
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-6">
          Discover formula-based calculators across finance, math, and physics.
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-10">
        <SearchBar calculators={calculators} />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-14">
        {CATEGORY_META.map((cat) => {
          const items = getToolsByCategory(cat.slug);
          if (items.length === 0) return null;
          return (
            <section key={cat.slug}>
              <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90 border-b border-gray-200 dark:border-gray-700 pb-2">
                {cat.name}
              </h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {items.map((tool) => (
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
    </div>
  );
}
