import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAlternates, getBaseUrl } from '@/lib/site-url';
import { getToolsByCategory } from '@/lib/categories';
import { QuickAnswerBlock } from '@/components/seo/QuickAnswerBlock';
import SearchBar from '@/components/SearchBar';
import { getHubQuickAnswerParagraphs } from '@/lib/siteQuickAnswers';
import { POPULAR_CALCULATOR_SLUGS, getCalculatorBySlug } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'Math Calculators',
  description:
    'Free math calculators for percentages, fractions, quadratic equations, probability, statistics, geometry, and scientific calculations with formulas shown.',
  alternates: buildAlternates(getBaseUrl() + '/math-calculators'),
};

function getMathCardMeta(slug: string): {
  title: string;
  icon: string;
  accent: string;
} {
  const s = slug.toLowerCase();

  // High-signal exact tools
  if (s === 'scientific-calculator') {
    return { title: 'Scientific', icon: '🧮', accent: 'from-indigo-500 to-purple-500' };
  }
  if (s === 'graph-calculator') {
    return { title: 'Graphing', icon: '📉', accent: 'from-sky-500 to-blue-600' };
  }
  if (s.includes('fraction')) {
    return { title: 'Fractions', icon: '➗', accent: 'from-emerald-500 to-teal-600' };
  }
  if (s.includes('probability') || s.includes('permutation') || s.includes('combination')) {
    return { title: 'Probability', icon: '🎲', accent: 'from-amber-500 to-orange-600' };
  }
  if (s.includes('quadratic')) {
    return { title: 'Quadratic', icon: '📐', accent: 'from-rose-500 to-pink-600' };
  }

  // Broader topic buckets
  if (s.includes('percentage') || s.includes('ratio') || s.includes('average') || s.includes('mean') || s.includes('median') || s.includes('mode') || s.includes('range')) {
    return { title: 'Arithmetic', icon: '🧾', accent: 'from-slate-500 to-gray-600' };
  }
  if (s.includes('area') || s.includes('perimeter') || s.includes('volume') || s.includes('triangle') || s.includes('circle') || s.includes('right-triangle')) {
    return { title: 'Geometry', icon: '📏', accent: 'from-sky-500 to-blue-600' };
  }
  if (s.includes('standard-deviation') || s.includes('z-score') || s.includes('confidence-interval') || s.includes('statistics')) {
    return { title: 'Statistics', icon: '📊', accent: 'from-emerald-500 to-teal-600' };
  }
  if (s.includes('square-root') || s.includes('log') || s.includes('factor') || s.includes('hcf') || s.includes('lcm')) {
    return { title: 'Algebra', icon: '∑', accent: 'from-indigo-500 to-purple-500' };
  }

  return { title: 'Math', icon: '🔢', accent: 'from-indigo-500 to-purple-600' };
}

export default function MathCalculatorsPage() {
  const tools = getToolsByCategory('math');
  const mathTopics = [
    {
      key: 'scientific',
      title: 'Scientific',
      href: '/scientific-calculator',
      description: 'Expressions, trig, logs, roots.',
      icon: '🧮',
      accent: 'from-indigo-500 to-purple-500',
    },
    {
      key: 'graphing',
      title: 'Graphing',
      href: '/graph-calculator',
      description: 'Plot y = f(x), zoom and compare.',
      icon: '📉',
      accent: 'from-sky-500 to-blue-600',
    },
    {
      key: 'fractions',
      title: 'Fractions',
      href: '/fraction-calculator',
      description: 'Add, subtract, simplify.',
      icon: '➗',
      accent: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'probability',
      title: 'Probability',
      href: '/probability-calculator',
      description: 'Odds, events, and outcomes.',
      icon: '🎲',
      accent: 'from-amber-500 to-orange-600',
    },
    {
      key: 'quadratic',
      title: 'Quadratic',
      href: '/quadratic-formula-calculator',
      description: 'Solve ax² + bx + c = 0.',
      icon: '📐',
      accent: 'from-rose-500 to-pink-600',
    },
  ] as const;

  const popular = POPULAR_CALCULATOR_SLUGS.map((s) => getCalculatorBySlug(s))
    .filter((c): c is NonNullable<typeof c> => !!c && c.category === 'math')
    .slice(0, 4);

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-gray-200/60 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.18] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:42px_42px] text-indigo-300 dark:text-indigo-500/30" />

        <div className="wrapper py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700 backdrop-blur dark:border-indigo-500/30 dark:bg-white/5 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Math hub
            </span>
            <h1 className="mt-4 font-bold text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Math Calculators
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300 leading-7">
              Solve algebra, geometry, probability, and number problems — fast, free, and
              explained.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
              <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                <span className="text-indigo-600 dark:text-indigo-300">{tools.length}+</span> tools
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                {mathTopics.length} topics
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                Free · No signup
              </span>
            </div>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <SearchBar calculators={tools} />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <QuickAnswerBlock paragraphs={getHubQuickAnswerParagraphs('math')} />
          </div>
        </div>
      </section>

      {popular.length > 0 ? (
        <section className="wrapper pt-10 pb-2">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
                  Popular in math
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-800 dark:text-white/90">
                  Most-used picks
                </h2>
              </div>
              <Link
                href="/all-calculators"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 sm:inline"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-500/40"
                >
                  <span className="absolute right-3 top-3 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    Popular
                  </span>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{p.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {p.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600 transition group-hover:translate-x-0.5 dark:text-indigo-300">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="wrapper py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-10">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                  Topics
                </h2>
                <Link
                  href="/categories"
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300"
                >
                  All hubs →
                </Link>
              </div>

              <nav aria-label="Math topics">
                <ul className="space-y-1.5">
                  {mathTopics.map((t) => (
                    <li key={t.key}>
                      <Link
                        href={t.href}
                        className="group flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 transition hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${t.accent} text-base shadow-sm`}
                          aria-hidden
                        >
                          {t.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-gray-800 dark:text-white/90 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                            {t.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] leading-4 text-gray-500 dark:text-gray-400">
                            {t.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-200/70 bg-emerald-50 p-4 text-xs leading-5 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-100">
              <p className="font-semibold">Study tip</p>
              <p className="mt-1">
                Use calculators to verify arithmetic — but write the formula first. Units and
                definitions matter more than button presses.
              </p>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
                  All math calculators
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-800 dark:text-white/90">
                  {tools.length} tools for fast checks and clean answers
                </h2>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => {
                const meta = getMathCardMeta(tool.slug);
                return (
                  <article
                    key={tool.slug}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-500/40"
                  >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 transition group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} text-lg shadow`}
                      aria-hidden
                    >
                      {meta.icon}
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:bg-white/10 dark:text-gray-300">
                      {meta.title}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white">{tool.name}</h3>
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
                );
              })}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
