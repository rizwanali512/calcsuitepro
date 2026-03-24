import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORY_META } from '@/lib/categories';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Calculator Categories',
  description:
    'Browse calculators organized by Finance, Math, and Physics categories.',
  alternates: { canonical: getBaseUrl() + '/categories' },
  openGraph: {
    title: `Calculator Categories – ${siteConfig.name}`,
    description:
      'Browse calculators organized by Finance, Math, and Physics categories.',
    url: getBaseUrl() + '/categories',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Calculator Categories – ${siteConfig.name}`,
    description:
      'Browse calculators organized by Finance, Math, and Physics categories.',
  },
};

export default function CategoriesPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Calculator Categories
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400 mb-8">
          Browse calculators organized by Finance, Math, and Physics.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {CATEGORY_META.map((category) => (
          <div
            key={category.slug}
            className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
          >
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {category.description}
            </p>
            <Link
              href={`/category/${category.slug}`}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              View Calculators
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
