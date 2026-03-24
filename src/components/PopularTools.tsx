import Link from 'next/link';
import { getPopularCalculators as getPopularTools } from '@/lib/calculators';

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

const miniCardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col';

type Props = {
  /** Omit on hub pages; on tool pages pass current slug to avoid a self-link. */
  excludeSlug?: string;
  /** Cap links for SEO (tool pages use 6; homepage can use more). */
  max?: number;
};

/**
 * Static popular tools list from `lib/popularTools.ts` (via getPopularTools).
 */
export function PopularTools({ excludeSlug, max = 24 }: Props) {
  const popular = getPopularTools()
    .filter((t) => (excludeSlug ? t.slug !== excludeSlug : true))
    .slice(0, max);

  if (popular.length === 0) return null;

  return (
    <section className={`${cardClass} max-w-5xl mx-auto w-full`} aria-label="Popular developer tools">
      <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90">
        Popular tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popular.map((tool) => (
          <article key={tool.slug} className={miniCardClass}>
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              <Link
                href={tool.href}
                className="hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded"
              >
                {tool.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {tool.description}
            </p>
            <Link
              href={tool.href}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit"
            >
              Open {tool.name}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
