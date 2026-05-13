'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { calculators } from '@/lib/calculators';
import { OPEN_CALCULATOR_COMMAND_MENU_EVENT } from '@/lib/commandMenuEvents';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = normalized
      ? calculators.filter((item) => item.name.toLowerCase().includes(normalized))
      : calculators;
    return list.slice(0, 10);
  }, [query]);

  useEffect(() => {
    const onOpenFromUi = () => setOpen(true);
    window.addEventListener(OPEN_CALCULATOR_COMMAND_MENU_EVENT, onOpenFromUi);
    return () => window.removeEventListener(OPEN_CALCULATOR_COMMAND_MENU_EVENT, onOpenFromUi);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const cmdOrCtrl = event.metaKey || event.ctrlKey;

      if (cmdOrCtrl && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (event.key === 'Escape') {
        setOpen(false);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(matches.length, 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + Math.max(matches.length, 1)) % Math.max(matches.length, 1));
      } else if (event.key === 'Enter' && matches[activeIndex]) {
        window.location.href = `/${matches[activeIndex].slug}`;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, matches, open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-slate-950/40 backdrop-blur-sm p-4"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="mx-auto mt-24 w-full max-w-2xl glass-card rounded-2xl p-4 md:p-5"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Calculator command menu"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Search calculators
          </p>
          <button
            onClick={() => setOpen(false)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
            type="button"
          >
            ESC
          </button>
        </div>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search calculators... (Cmd/Ctrl + K)"
          className="w-full rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-3 text-sm text-gray-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div className="mt-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden">
          {matches.length === 0 ? (
            <div className="px-4 py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">No calculators found</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Try searching another keyword
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200/80 dark:divide-white/10">
              {matches.map((item, index) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className={`block px-4 py-3 text-sm transition ${
                      index === activeIndex
                        ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
