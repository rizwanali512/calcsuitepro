'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentToolSlugs } from '@/lib/recent-tools-storage';
import { getCalculatorBySlug } from '@/lib/calculators';

const cardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

export function RecentlyUsedTools() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(getRecentToolSlugs());
  }, []);

  const tools = slugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t != null);

  if (tools.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90">
        Recently Used Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.slug} className={cardClass}>
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {tool.description}
            </p>
            <Link
              href={`/${tool.slug}`}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              Open Tool
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
