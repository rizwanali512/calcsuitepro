import type { Metadata } from 'next';
import Link from 'next/link';

import { blogs } from '@/lib/blogs';
import { estimateReadingMinutes } from '@/lib/blogReadingTime';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Blog - ${siteConfig.name} Guides, Formulas, and Tips`,
  description: `Read practical guides on calculators, formulas, finance, math, and physics from ${siteConfig.name} to improve everyday decision-making.`,
};

export default function BlogListingPage() {
  const [featured, ...rest] = blogs;

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/80 py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(99,102,241,0.2),transparent)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(99,102,241,0.14),transparent)]"
        aria-hidden
      />

      <div className="wrapper relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-800 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-200">
            Learning center
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl md:leading-tight">
            Guides & articles
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Clear walkthroughs on formulas, planning, and how to get the most from our calculator
            suite—written for real-world decisions, not textbook filler.
          </p>
          <p className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
          </p>
        </header>

        <div className="mt-14 space-y-10 md:mt-16">
          {featured ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.2)] transition hover:border-primary-300/80 hover:shadow-[0_28px_90px_-44px_rgba(99,102,241,0.25)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-primary-500/35 md:p-10"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary-400/20 to-purple-500/10 blur-2xl transition group-hover:from-primary-400/30 dark:from-primary-500/15"
                aria-hidden
              />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary-500 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                      Featured
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {estimateReadingMinutes(featured.content)} min read
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 transition group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-300 md:text-3xl md:leading-snug">
                    {featured.title}
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                    {featured.description}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center self-start rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-primary-600 dark:bg-white dark:text-gray-900 dark:group-hover:bg-primary-400 dark:group-hover:text-white">
                  Read article
                  <span className="ml-2 transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </Link>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((blog) => (
                <article
                  key={blog.slug}
                  className="flex flex-col rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm transition hover:border-primary-200 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-primary-500/30"
                >
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    <span className="h-1 w-1 rounded-full bg-primary-500" aria-hidden />
                    Guide
                    <span className="text-gray-300 dark:text-gray-600">·</span>
                    <span>{estimateReadingMinutes(blog.content)} min</span>
                  </div>
                  <h2 className="text-lg font-bold leading-snug text-gray-900 dark:text-white">
                    <Link
                      className="transition hover:text-primary-600 dark:hover:text-primary-300"
                      href={`/blog/${blog.slug}`}
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {blog.description}
                  </p>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400"
                  >
                    Read more
                    <span className="ml-1" aria-hidden>
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
