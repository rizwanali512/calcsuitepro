import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORY_META, getToolsByCategory } from '@/lib/categories';
import SearchBar from '@/components/SearchBar';
import { calculators } from '@/lib/calculators';
import { QuickAnswerBlock } from '@/components/seo/QuickAnswerBlock';
import { ALL_CALCULATORS_QUICK_ANSWER } from '@/lib/siteQuickAnswers';
import { buildAlternates, getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'All Calculators',
  description:
    'Browse all finance, math, physics, and health calculators with formulas and instant browser results.',
  alternates: buildAlternates(getBaseUrl() + '/all-calculators'),
};

function getCategoryMeta(slug: string): { icon: string; accent: string } {
  switch (slug) {
    case 'finance':
      return { icon: '💰', accent: 'from-emerald-500 to-teal-600' };
    case 'math':
      return { icon: '🧮', accent: 'from-indigo-500 to-purple-600' };
    case 'physics':
      return { icon: '🧲', accent: 'from-sky-500 to-blue-600' };
    case 'health':
      return { icon: '❤️', accent: 'from-rose-500 to-pink-600' };
    default:
      return { icon: '🧰', accent: 'from-slate-500 to-gray-600' };
  }
}

export default function AllCalculatorsPage() {
  const categoriesWithItems = CATEGORY_META.map((cat) => ({
    cat,
    items: getToolsByCategory(cat.slug),
  })).filter((x) => x.items.length > 0);

  const totalTools = categoriesWithItems.reduce((sum, x) => sum + x.items.length, 0);

  return (
    <div className="relative">
      {/* ===== HERO ===================================================== */}
      <section className="relative overflow-hidden border-b border-gray-200/60 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.18] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:42px_42px] text-indigo-300 dark:text-indigo-500/30" />

        <div className="wrapper py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700 backdrop-blur dark:border-indigo-500/30 dark:bg-white/5 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              All hubs
            </span>
            <h1 className="mt-4 font-bold text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl tracking-tight">
              All Calculators
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300 leading-7">
              Discover formula-based calculators across finance, math, physics, and health — fast,
              free, and explained.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
              <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                <span className="text-indigo-600 dark:text-indigo-300">{totalTools}</span> calculators
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                {categoriesWithItems.length} categories
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                Free · No signup
              </span>
            </div>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <SearchBar calculators={calculators} />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <QuickAnswerBlock paragraphs={ALL_CALCULATORS_QUICK_ANSWER} />
          </div>
        </div>
      </section>

      {/* ===== MAIN: Sidebar + Category sections ======================== */}
      <section className="wrapper py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-10">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                  Categories
                </h2>
                <Link
                  href="/categories"
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300"
                >
                  Browse hubs →
                </Link>
              </div>
              <nav aria-label="Calculator categories">
                <ul className="space-y-1.5">
                  {categoriesWithItems.map(({ cat, items }) => {
                    const meta = getCategoryMeta(cat.slug);
                    return (
                      <li key={cat.slug}>
                        <a
                          href={`#cat-${cat.slug}`}
                          className="group flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 transition hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${meta.accent} text-base shadow-sm`}
                            aria-hidden
                          >
                            {meta.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className="truncate text-sm font-semibold text-gray-800 dark:text-white/90 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                                {cat.name}
                              </span>
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold tabular-nums text-gray-600 dark:bg-white/10 dark:text-gray-300">
                                {items.length}
                              </span>
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] leading-4 text-gray-500 dark:text-gray-400">
                              Browse {cat.slug} calculators
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Category sections */}
          <main className="min-w-0 space-y-10">
            {categoriesWithItems.map(({ cat, items }) => {
              const meta = getCategoryMeta(cat.slug);
              return (
                <section key={cat.slug} id={`cat-${cat.slug}`} className="scroll-mt-28">
                  <div className="mb-4 flex items-end justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} text-lg shadow`}
                        aria-hidden
                      >
                        {meta.icon}
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {cat.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {items.length} calculators
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/${cat.slug}-calculators`}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300"
                    >
                      Open hub →
                    </Link>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((tool) => (
                      <article
                        key={tool.slug}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-500/40"
                      >
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 transition group-hover:opacity-100" />
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {tool.name}
                        </h3>
                        <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400 flex-1">
                          {tool.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <Link
                            href={`/${tool.slug}`}
                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow hover:opacity-95 active:scale-[0.98] transition"
                          >
                            Open calculator →
                          </Link>
                          <Link
                            href={`/${tool.slug}`}
                            className="text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300"
                            aria-label={`Learn more about ${tool.name}`}
                          >
                            Details
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </section>
    </div>
  );
}
