import Link from 'next/link';
import { calculators as tools, type Calculator as Tool } from '@/lib/calculators';
import { getCategoryDisplayName } from '@/lib/categories';
import { cn } from '@/lib/utils';

type ToolFilter =
  | { type: 'categories'; categories: string[] }
  | { type: 'slugs'; slugs: string[] }
  | { type: 'mixed'; categories: string[]; slugs: string[] };

type Props = {
  h1: string;
  intro: string[];
  useCases: string[];
  conclusion: string[];
  filter: ToolFilter;
  /** Optional additional links to show under the intro paragraph. */
  extraLinks?: { href: string; label: string }[];
  /** Optional grouped link blocks for additional crawl paths. */
  toolGroups?: { title: string; slugs: string[] }[];
};

function uniqBySlug(list: Tool[]): Tool[] {
  const seen = new Set<string>();
  const out: Tool[] = [];
  for (const t of list) {
    if (seen.has(t.slug)) continue;
    seen.add(t.slug);
    out.push(t);
  }
  return out;
}

function pickTools(filter: ToolFilter): Tool[] {
  if (filter.type === 'categories') {
    return tools.filter((t) => filter.categories.includes(t.category));
  }
  if (filter.type === 'slugs') {
    const set = new Set(filter.slugs);
    return tools.filter((t) => set.has(t.slug));
  }
  const set = new Set(filter.slugs);
  return uniqBySlug(
    tools.filter((t) => filter.categories.includes(t.category) || set.has(t.slug))
  );
}

const cardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

export function ToolsLandingPage({
  h1,
  intro,
  useCases,
  conclusion,
  filter,
  extraLinks,
  toolGroups,
}: Props) {
  const selected = pickTools(filter);
  const selectedSlugSet = new Set(selected.map((t) => t.slug));
  const groupedTools =
    toolGroups?.map((group) => ({
      title: group.title,
      tools: group.slugs
        .map((slug) => tools.find((t) => t.slug === slug))
        .filter((t): t is Tool => Boolean(t))
        .filter((t) => selectedSlugSet.has(t.slug)),
    })) ?? [];

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {h1}
        </h1>

        <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
          >
            Browse Tools
          </Link>
          <Link
            href="/all-tools"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
          >
            View All Tools
          </Link>
          {extraLinks?.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <section className="mt-10" aria-label="Tool list">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Tools included
          </h2>

          {selected.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selected.map((tool) => (
                <article key={tool.slug} className={cardClass}>
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                      {getCategoryDisplayName(tool.category)}
                    </span>
                  </div>
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
                </article>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                'mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 text-gray-600 dark:text-gray-300'
              )}
            >
              <p className="leading-7">
                This page is ready for SEO, but there are currently no matching
                tools in the catalog for this category. In the meantime, browse
                the full directory on{' '}
                <Link
                  href="/tools"
                  className="text-primary-500 hover:text-primary-600 underline font-medium"
                >
                  Tools
                </Link>{' '}
                or{' '}
                <Link
                  href="/all-tools"
                  className="text-primary-500 hover:text-primary-600 underline font-medium"
                >
                  All Tools
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        {groupedTools.length > 0 && (
          <section className="mt-12" aria-label="Grouped tool links">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Browse by workflow
            </h2>
            <div className="space-y-6">
              {groupedTools.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 bg-white dark:bg-white/5"
                >
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-3">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12" aria-label="Use cases">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Common use cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
            {useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-label="Conclusion">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Final thoughts
          </h2>
          <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
            {conclusion.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

