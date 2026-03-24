import Link from 'next/link';
import { calculators as tools } from '@/lib/calculators';
import {
  categoryToSlug,
  getCategoryDisplayName,
} from '@/lib/categories';

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

type Props = {
  toolSlug: string;
  /** Max links for crawl budget (default 6). */
  max?: number;
};

/**
 * “More from this category” — links to sibling tools + category hub.
 */
export function MoreFromCategory({ toolSlug, max = 6 }: Props) {
  const tool = tools.find((t) => t.slug === toolSlug);
  if (!tool) return null;

  const peers = tools
    .filter((t) => t.category === tool.category && t.slug !== toolSlug)
    .slice(0, max);

  if (peers.length === 0) return null;

  const label = getCategoryDisplayName(tool.category);
  const categoryHref = `/category/${categoryToSlug(tool.category)}`;

  return (
    <section className={cardClass} aria-label={`More ${label} tools`}>
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
        More from this category
      </h2>
      <p className="mb-4 text-gray-500 dark:text-gray-400 leading-7">
        Browse the full{' '}
        <Link
          href={categoryHref}
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          {label}
        </Link>{' '}
        collection on CalcSuite Pro.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
        {peers.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${t.slug}`}
              className="text-primary-500 hover:text-primary-600 underline font-medium"
            >
              {t.name}
            </Link>
            {t.description ? ` — ${t.description}` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
