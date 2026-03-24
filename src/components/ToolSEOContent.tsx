import Link from 'next/link';
import { calculators as tools } from '@/lib/calculators';
import { categoryToSlug, getCategoryDisplayName } from '@/lib/categories';
import { buildToolSeoSpec } from '@/lib/tool-seo';
import { isPriorityToolSlug } from '@/lib/priority-tools-seo';

type Props = {
  title: string;
  description: string;
  slug: string;
};

const cardClass =
  'bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

/**
 * SEO content below the tool UI: introduction, how to use, use cases, FAQ
 * (and for non-priority tools: features + example). Semantic HTML: article,
 * section, h2, p, ul, dl.
 */
export function ToolSEOContent({ title, description, slug }: Props) {
  const tool = tools.find((t) => t.slug === slug);
  const category = tool?.category;
  if (!tool || !category) return null;

  const spec = buildToolSeoSpec(slug, title, description, category);
  const categoryHref = `/category/${categoryToSlug(category)}`;
  const categoryLabel = getCategoryDisplayName(category);
  const priority = isPriorityToolSlug(slug);

  const introBlocks = spec.intro.split(/\n\n+/).filter(Boolean);

  return (
    <article className="max-w-5xl mx-auto w-full space-y-6">
      <section
        className={cardClass}
        aria-labelledby={`intro-heading-${slug}`}
      >
        <h2
          id={`intro-heading-${slug}`}
          className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90"
        >
          Introduction
        </h2>
        <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
          {introBlocks.map((block, i) => (
            <p key={`${slug}-intro-${i}`}>{block}</p>
          ))}
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 leading-7">
          Explore more in{' '}
          <Link
            href="/tools"
            className="text-primary-500 hover:text-primary-600 underline font-medium"
          >
            Tools
          </Link>
          ,{' '}
          <Link
            href="/all-tools"
            className="text-primary-500 hover:text-primary-600 underline font-medium"
          >
            All Tools
          </Link>
          , or the{' '}
          <Link
            href={categoryHref}
            className="text-primary-500 hover:text-primary-600 underline font-medium"
          >
            {categoryLabel}
          </Link>{' '}
          category.
        </p>
      </section>

      <section
        className={cardClass}
        aria-labelledby={`how-heading-${slug}`}
      >
        <h2
          id={`how-heading-${slug}`}
          className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90"
        >
          How to use
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
          {spec.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {!priority && (
        <section className={cardClass} aria-labelledby={`features-${slug}`}>
          <h2
            id={`features-${slug}`}
            className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90"
          >
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
            {spec.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      <section
        className={cardClass}
        aria-labelledby={`usecases-heading-${slug}`}
      >
        <h2
          id={`usecases-heading-${slug}`}
          className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90"
        >
          Use cases
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
          {spec.useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </section>

      {!priority && (
        <section className={cardClass} aria-label="Example">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Example
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Input
              </p>
              <pre className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {spec.example.input}
              </pre>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Output
              </p>
              <pre className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {spec.example.output}
              </pre>
            </div>
          </div>
        </section>
      )}

      <section
        className={cardClass}
        aria-labelledby={`faq-heading-${slug}`}
      >
        <h2
          id={`faq-heading-${slug}`}
          className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90"
        >
          FAQ
        </h2>
        <dl className="space-y-5">
          {spec.faqs.slice(0, 5).map((item) => (
            <div key={item.q}>
              <dt className="text-base font-semibold text-gray-800 dark:text-white/90">
                {item.q}
              </dt>
              <dd className="mt-1 text-gray-500 dark:text-gray-400 leading-7 pl-0">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
