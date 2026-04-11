import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';
import { getToolsByCategory } from '@/lib/categories';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: `Math Calculators | ${siteConfig.name}`,
  description: 'Math calculators for algebra, geometry, and percentage problems.',
  alternates: { canonical: getBaseUrl() + '/math-calculators' },
};

export default function MathCalculatorsPage() {
  const tools = getToolsByCategory('math');
  const mathTopics = [
    { name: 'Scientific Calculator', href: '/scientific-calculator' },
    { name: 'Graph Calculator', href: '/graph-calculator' },
    { name: 'Fraction Calculator', href: '/fraction-calculator' },
    { name: 'Probability Calculator', href: '/probability-calculator' },
    { name: 'Quadratic Formula Calculator', href: '/quadratic-formula-calculator' },
  ];
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Math Calculators
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400 mb-8">
          Solve common math formulas with instant results and clean outputs.
        </p>
      </div>
      <div className="max-w-6xl mx-auto mb-8">
        <SearchBar calculators={tools} />
      </div>
      <section className="max-w-6xl mx-auto mb-10">
        <h2 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
          Explore Math Calculator Topics
        </h2>
        <p className="mb-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Browse algebra, fraction, scientific, and statistics calculator topics.
        </p>
        <div className="flex flex-wrap gap-2">
          {mathTopics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              {topic.name}
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
