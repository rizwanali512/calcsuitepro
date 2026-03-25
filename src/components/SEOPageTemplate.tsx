import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SeoPage } from '@/lib/seoPages';
import type { Calculator as Tool } from '@/lib/calculators';
import { getCategoryDisplayName } from '@/lib/categories';

type Props = {
  page: SeoPage;
  baseTool: Tool;
  relatedTools: Tool[];
  content: string[];
  howToUse: string[];
  useCases: string[];
  faq: Array<{ q: string; a: string }>;
  embeddedTool: ReactNode;
};

export function SEOPageTemplate({
  page,
  baseTool,
  relatedTools,
  content,
  howToUse,
  useCases,
  faq,
  embeddedTool,
}: Props) {
  const categoryLabel = getCategoryDisplayName(baseTool.category);

  return (
    <div className="wrapper py-14 md:py-28">
      <article className="max-w-5xl mx-auto">
        <header className="max-w-3xl">
          <h1 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            {page.title}
          </h1>
          <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
            {content.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </header>

        <section className="mt-10" aria-label="Tool embed">
          <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
            Try {baseTool.name}
          </h2>
          <p className="mb-5 text-gray-500 dark:text-gray-400 leading-7">
            This page embeds the real tool interface so you can run the exact workflow immediately.
          </p>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-3">
            {embeddedTool}
          </div>
        </section>

        <section className="mt-12" aria-label="Related tools">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Related tools
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.slug}`}
                  className="block rounded-xl border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-500/40 transition"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-label="How to use">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">How to Use</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
            {howToUse.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-12" aria-label="Use cases">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">Use Cases</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
            {useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-label="Frequently asked questions">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">FAQ</h2>
          <div className="space-y-4 text-gray-500 dark:text-gray-400">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-label="Internal links">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Explore more
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${baseTool.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Base tool
            </Link>
            <Link
              href={`/category/${baseTool.category}`}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              {categoryLabel}
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              All tools
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Categories
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
            >
              Homepage
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

