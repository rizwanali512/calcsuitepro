import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BlogCalculatorEmbed from '@/components/BlogCalculatorEmbed';
import { BlogArticleBody } from '@/components/blog/BlogArticleBody';
import { blogs, getBlogBySlug } from '@/lib/blogs';
import { estimateReadingMinutes } from '@/lib/blogReadingTime';
import { getCalculatorBySlug, getPopularCalculators } from '@/lib/calculators';
import { resolveSlugToCalculatorSlug } from '@/lib/internalLinking';
import { siteConfig } from '@/lib/seo';

type Params = {
  slug: string;
};

type BlogPageProps = {
  params: Promise<Params>;
};

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog article could not be found.',
    };
  }

  return {
    title: `${blog.title} | ${siteConfig.name}`,
    description: `${blog.description} Read more on ${siteConfig.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/blog/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.title} | ${siteConfig.name}`,
      description: `${blog.description} Read more on ${siteConfig.name}.`,
      url: `${siteConfig.url}/blog/${blog.slug}`,
      siteName: siteConfig.name,
      type: 'article',
    },
  };
}

function CalculatorCardLink({
  href,
  name,
  description,
}: {
  href: string;
  name: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-gray-200/90 bg-white p-4 shadow-sm transition hover:border-primary-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-primary-500/40"
    >
      <p className="font-semibold text-gray-900 transition group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-300">
        {name}
      </p>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <span className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
        Open calculator
        <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const readTime = estimateReadingMinutes(blog.content);
  const popularCalculators = getPopularCalculators().slice(0, 6);
  const linkedPaths = Array.from(blog.content.matchAll(/\]\(\/([a-z0-9-]+)\)/g)).map((m) => m[1]);
  const relatedCalculatorSlugs = Array.from(
    new Set(
      linkedPaths
        .map((slugValue) => resolveSlugToCalculatorSlug(slugValue))
        .filter((canonical): canonical is string => Boolean(canonical))
    )
  ).slice(0, 6);
  const relatedCalculators = relatedCalculatorSlugs
    .map((slugValue) => getCalculatorBySlug(slugValue))
    .filter((calculator): calculator is NonNullable<typeof calculator> => calculator != null);

  const embedCalculator =
    blog.embedCalculatorSlug != null ? getCalculatorBySlug(blog.embedCalculatorSlug) : null;

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/80 py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]"
        aria-hidden
      />
      <article className="wrapper relative mx-auto max-w-5xl">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/blog"
            className="rounded-full border border-gray-200 bg-white px-3 py-1 font-medium text-gray-700 transition hover:border-primary-200 hover:text-primary-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-primary-500/30 dark:hover:text-primary-300"
          >
            Blog
          </Link>
          <span className="text-gray-300 dark:text-gray-600" aria-hidden>
            /
          </span>
          <span className="line-clamp-1 text-gray-600 dark:text-gray-300">{blog.title}</span>
        </nav>

        <header className="mb-10 border-b border-gray-200/80 pb-10 dark:border-white/10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200">
              Guide
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{readTime} min read</span>
          </div>
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl md:leading-tight lg:text-[2.5rem]">
            {blog.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {blog.description}
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)]">
          {embedCalculator ? (
            <div className="border-b border-gray-100 bg-slate-50/80 dark:border-white/5 dark:bg-slate-950/40">
              <BlogCalculatorEmbed calculator={embedCalculator} />
            </div>
          ) : null}

          <section className="p-6 md:p-10 lg:p-12">
            <div className="mx-auto max-w-[42rem]">
              <BlogArticleBody content={blog.content} blogSlug={blog.slug} />
            </div>

            {relatedCalculators.length > 0 && (
              <div className="mx-auto mt-14 max-w-[56rem] border-t border-gray-100 pt-10 dark:border-white/10">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
                  Related calculators
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Tools referenced in this article, including URLs that map to the same calculator
                  experience.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedCalculators.map((calculator) => (
                    <CalculatorCardLink
                      key={calculator.slug}
                      href={`/${calculator.slug}`}
                      name={calculator.name}
                      description={calculator.description}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mx-auto mt-14 max-w-[56rem] border-t border-gray-100 pt-10 dark:border-white/10">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Popular calculators
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Continue with practical tools after reading this guide.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {popularCalculators.map((calculator) => (
                  <CalculatorCardLink
                    key={calculator.slug}
                    href={calculator.href}
                    name={calculator.name}
                    description={calculator.description}
                  />
                ))}
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-[42rem]">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-primary-300 hover:bg-gray-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-primary-500/40 dark:hover:bg-white/10"
              >
                ← All articles
              </Link>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
