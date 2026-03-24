import Link from 'next/link';
import { getRelatedTools } from '@/lib/getRelatedTools';
import { getPopularCalculators as getPopularTools } from '@/lib/calculators';

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

const miniCardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

type Props = {
  /** Current tool slug (page context). */
  toolSlug: string;
};

/**
 * Internal linking: related tools by category + tags, with fallback to popular tools.
 */
export function RelatedTools({ toolSlug }: Props) {
  let items = getRelatedTools(toolSlug);
  if (items.length === 0) {
    items = getPopularTools()
      .filter((t) => t.slug !== toolSlug)
      .slice(0, 6);
  }

  if (items.length === 0) return null;

  return (
    <section className={cardClass} aria-label="Related developer tools">
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
        Related tools
      </h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400 leading-7">
        Explore more free online developer tools that pair well with this page.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t) => (
          <article key={t.slug} className={miniCardClass}>
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              <Link
                href={t.href}
                className="hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded"
              >
                {t.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {t.description}
            </p>
            <Link
              href={t.href}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              Open {t.name}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
