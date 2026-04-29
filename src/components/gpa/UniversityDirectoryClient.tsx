'use client';

import { useMemo, useState } from 'react';
import type { University } from '@/lib/universities';
import { UniversityCard } from '@/components/gpa/UniversityCard';

type SortMode = 'rank' | 'name';

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function isSubsequence(needle: string, haystack: string) {
  if (!needle) return true;
  let i = 0;
  for (const ch of haystack) {
    if (ch === needle[i]) i += 1;
    if (i >= needle.length) return true;
  }
  return false;
}

function matchesFlexibleQuery(query: string, u: University) {
  const q = normalize(query);
  if (!q) return true;

  const tokens = q.split(/\s+/).filter(Boolean);
  const hay = normalize(`${u.name} ${u.short} ${u.location}`);

  // All tokens must match as partial word OR subsequence anywhere.
  return tokens.every((t) => hay.includes(t) || isSubsequence(t, hay));
}

export function UniversityDirectoryClient({ universities }: { universities: University[] }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [sort, setSort] = useState<SortMode>('rank');

  const cities = useMemo(() => {
    const set = new Set<string>();
    for (const u of universities) set.add(u.location);
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [universities]);

  const filtered = useMemo(() => {
    const q = query.trim();
    let list = universities;
    if (city !== 'all') list = list.filter((u) => u.location === city);
    if (q) {
      list = list.filter((u) => matchesFlexibleQuery(q, u));
    }
    list = [...list];
    if (sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => {
        const ar = a.rank ?? 9999;
        const br = b.rank ?? 9999;
        if (ar !== br) return ar - br;
        return a.name.localeCompare(b.name);
      });
    }
    return list;
  }, [universities, query, city, sort]);

  return (
    <div>
      <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300">
              Search universities
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, short code, or city..."
              className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-white/90 placeholder:text-gray-400 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:w-[360px]">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-white/90 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All cities' : c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-white/90 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
              >
                <option value="rank">By rank</option>
                <option value="name">A–Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white/90">{filtered.length}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white/90">{universities.length}</span> universities
          </p>
          {(query || city !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCity('all');
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Universities">
        {filtered.map((u) => (
          <UniversityCard key={u.slug} university={u} />
        ))}
      </div>
    </div>
  );
}

