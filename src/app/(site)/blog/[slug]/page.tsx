import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import BlogCalculatorEmbed from '@/components/BlogCalculatorEmbed';
import { blogs, getBlogBySlug } from '@/lib/blogs';
import { getCalculatorBySlug, getPopularCalculators } from '@/lib/calculators';
import { resolveSlugToCalculatorSlug } from '@/lib/internalLinking';
import { siteConfig } from '@/lib/seo';

type Params = {
  slug: string;
};

type BlogPageProps = {
  params: Promise<Params>;
};

function renderParagraphWithLinks(paragraph: string) {
  const regex = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = regex.exec(paragraph);

  while (match) {
    const [fullMatch, text, href] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(paragraph.slice(lastIndex, start));
    }

    nodes.push(
      <Link key={`${href}-${start}`} href={href} className="text-primary hover:underline">
        {text}
      </Link>,
    );

    lastIndex = start + fullMatch.length;
    match = regex.exec(paragraph);
  }

  if (lastIndex < paragraph.length) {
    nodes.push(paragraph.slice(lastIndex));
  }

  return nodes;
}

const heading2Class =
  'scroll-mt-24 text-2xl font-bold text-gray-800 dark:text-white/90 md:text-3xl';
const heading3Class = 'text-xl font-semibold text-gray-800 dark:text-white/90';

function renderBlogBlocks(content: string, blogSlug: string) {
  const blocks = content
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block.split('\n');
    const first = lines[0]?.trim() ?? '';

    if (first.startsWith('## ') && !first.startsWith('###')) {
      const title = first.replace(/^##\s+/, '').trim();
      const rest = lines.slice(1).join('\n').trim();
      const subParas = rest ? rest.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : [];
      return (
        <div key={`${blogSlug}-block-${index}`} className="space-y-4">
          <h2 className={heading2Class}>{title}</h2>
          {subParas.map((p, j) => (
            <p key={j} className="leading-8">
              {renderParagraphWithLinks(p)}
            </p>
          ))}
        </div>
      );
    }

    if (first.startsWith('### ')) {
      const title = first.replace(/^###\s+/, '').trim();
      const rest = lines.slice(1).join('\n').trim();
      const subParas = rest ? rest.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : [];
      return (
        <div key={`${blogSlug}-block-${index}`} className="space-y-3">
          <h3 className={heading3Class}>{title}</h3>
          {subParas.map((p, j) => (
            <p key={j} className="leading-8">
              {renderParagraphWithLinks(p)}
            </p>
          ))}
        </div>
      );
    }

    return (
      <p key={`${blogSlug}-block-${index}`} className="leading-8">
        {renderParagraphWithLinks(block)}
      </p>
    );
  });
}

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

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

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
    <main className="wrapper py-14 md:py-24">
      <article className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/blog" className="transition hover:text-primary-500">
              Blog
            </Link>{' '}
            / {blog.title}
          </p>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90 md:text-title-lg">
            {blog.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
            {blog.description}
          </p>
        </header>

        <div className="rounded-[20px] border border-gray-200 bg-white p-6 shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.06)] dark:border-white/10 dark:bg-white/5 md:p-8">
          {embedCalculator ? <BlogCalculatorEmbed calculator={embedCalculator} /> : null}
          <section className="space-y-8 text-base text-gray-700 dark:text-gray-200">
            {renderBlogBlocks(blog.content, blog.slug)}
          </section>

          {relatedCalculators.length > 0 && (
            <section className="mt-10 border-t border-gray-200 pt-8 dark:border-white/10">
              <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
                Related Calculators
              </h2>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                Tools referenced in this article (including programmatic landing URLs mapped to the same
                calculator engine).
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedCalculators.map((calculator) => (
                  <Link
                    key={calculator.slug}
                    href={`/${calculator.slug}`}
                    className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500/30"
                  >
                    <p className="font-medium text-gray-800 dark:text-white/90">{calculator.name}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {calculator.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10 border-t border-gray-200 pt-8 dark:border-white/10">
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Popular Calculators
            </h2>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Continue with practical tools after reading this guide.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {popularCalculators.map((calculator) => (
                <Link
                  key={calculator.slug}
                  href={calculator.href}
                  className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500/30"
                >
                  <p className="font-medium text-gray-800 dark:text-white/90">{calculator.name}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {calculator.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-primary-200 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:border-primary-500/30"
            >
              Back to all blog posts
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
