'use client';

import Link from 'next/link';

import CalculatorTemplate from '@/components/CalculatorTemplate';
import type { Calculator } from '@/lib/calculators';

type Props = {
  calculator: Calculator;
};

/**
 * In-article calculator funnel: CTA + compact embed (same engine as full tool page).
 */
export default function BlogCalculatorEmbed({ calculator }: Props) {
  return (
    <div className="not-prose my-10 rounded-[20px] border border-primary-200/80 bg-gradient-to-b from-indigo-50/80 to-white p-6 dark:border-primary-500/25 dark:from-indigo-950/40 dark:to-white/5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white/90 md:text-2xl">Try this calculator</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Use the live {calculator.name} below—same formulas as the full page—or open it in a dedicated tab.
          </p>
        </div>
        <Link
          href={`/${calculator.slug}`}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
        >
          Open full calculator →
        </Link>
      </div>
      <CalculatorTemplate calculator={calculator} embed />
    </div>
  );
}
