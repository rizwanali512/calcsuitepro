'use client';

import { useMemo, useState } from 'react';
import type { Calculator } from '@/lib/calculators';

type Props = {
  calculators: Calculator[];
};

export default function SearchBar({ calculators }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return [];
    const matches = calculators.filter((calculator) =>
      calculator.name.toLowerCase().includes(normalized)
    );
    return matches.slice(0, 10);
  }, [calculators, searchQuery]);

  return (
    <div className="w-full rounded-[24px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 md:p-5">
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search calculators..."
        className="w-full rounded-full border border-gray-300 dark:border-white/10 bg-white/90 dark:bg-white/5 px-5 py-3.5 text-sm text-gray-800 dark:text-white/90 outline-none placeholder:text-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-200/60 dark:focus:ring-primary-500/20"
      />

      {searchQuery.trim() ? (
        <div className="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
        {filteredCalculators.length === 0 ? (
          <div className="px-4 py-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">No calculators found</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Try searching another keyword
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-white/10">
            {filteredCalculators.map((calculator) => (
              <li key={calculator.slug}>
                <a
                  href={`/${calculator.slug}`}
                  className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                >
                  {calculator.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        </div>
      ) : null}
    </div>
  );
}
