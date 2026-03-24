import type { Metadata } from 'next';
import Link from 'next/link';

import { blogs } from '@/lib/blogs';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Blog - ${siteConfig.name} Guides, Formulas, and Tips`,
  description:
    `Read practical guides on calculators, formulas, finance, math, and physics from ${siteConfig.name} to improve everyday decision-making.`,
};

export default function BlogListingPage() {
  return (
    <main className="wrapper py-14 md:py-24">
      <section className="mx-auto mb-10 max-w-5xl text-center">
        <p className="mb-3 inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
          Blog & Learning Center
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white/90 md:text-title-lg">
          Blog
        </h1>
        <p className="mx-auto max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
          Explore practical guides on formulas, finance planning, and calculation methods that
          support smarter decisions and help you get more value from our calculator suite.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="flex flex-col rounded-[20px] border border-gray-200 bg-white p-6 shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.06)] transition hover:border-primary-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500/30"
          >
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              <Link className="transition hover:text-primary-500" href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            </h2>
            <p className="mb-5 flex-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {blog.description}
            </p>
            <Link
              href={`/blog/${blog.slug}`}
              className="inline-flex w-fit items-center justify-center rounded-full bg-primary-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-600"
            >
              Read full article
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
