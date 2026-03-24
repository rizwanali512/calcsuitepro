import Link from 'next/link';
import { Calculator } from '@/lib/calculators';

type Props = {
  title: string;
  seoContent: string[];
  calculators: Calculator[];
};

const cardClass =
  'glass-card p-6 rounded-2xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 flex flex-col';

export default function CalculatorIndexingPage({ title, seoContent, calculators }: Props) {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {title}
        </h1>

        <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-7">
          {seoContent.map((paragraph) => (
            <p key={paragraph.slice(0, 50)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <article key={calculator.slug} className={cardClass}>
              <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                {calculator.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
                {calculator.description}
              </p>
              <Link
                href={`/${calculator.slug}`}
                className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md w-fit"
              >
                Open {calculator.name}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
            Explore More Calculator Hubs
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/free-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Free Online Calculators
            </Link>
            <Link
              href="/finance-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Finance Calculators
            </Link>
            <Link
              href="/math-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Math Calculators
            </Link>
            <Link
              href="/physics-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Physics Calculators
            </Link>
            <Link
              href="/health-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Health Calculators
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
