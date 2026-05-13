'use client';

import { SearchIcon } from '@/icons/icons';
import { OPEN_CALCULATOR_COMMAND_MENU_EVENT } from '@/lib/commandMenuEvents';

/**
 * Opens the same calculator command palette as Cmd/Ctrl+K. Styled to match
 * `theme-toggle.tsx` (rounded-full, bordered pill on light/dark backgrounds).
 */
export default function CommandSearchButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(OPEN_CALCULATOR_COMMAND_MENU_EVENT));
      }}
      aria-label="Search calculators"
      title="Search calculators (⌘K / Ctrl+K)"
      className="inline-flex items-center justify-center size-11 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-200 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition"
    >
      <SearchIcon className="size-5" width={20} height={20} aria-hidden />
    </button>
  );
}
