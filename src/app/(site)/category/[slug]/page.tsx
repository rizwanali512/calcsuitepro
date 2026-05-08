import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getToolsByCategory,
  CATEGORY_META,
  getCategoryLongSeo,
} from '@/lib/categories';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export function generateStaticParams() {
  return CATEGORY_META.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META.find((c) => c.slug === slug);
  if (!meta) return { title: 'Category not found' };
  const canonical = getBaseUrl() + '/category/' + slug;
  return {
    title: meta.name,
    description: meta.description,
    keywords: `${meta.name}, calculators, ${slug}`,
    alternates: { canonical },
    openGraph: {
      title: `${meta.name} | ${siteConfig.name}`,
      description: meta.description,
      url: canonical,
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.name} | ${siteConfig.name}`,
      description: meta.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = CATEGORY_META.find((c) => c.slug === slug);
  if (!meta) notFound();

  const categoryTools = getToolsByCategory(slug);
  const longSeo = getCategoryLongSeo(slug, categoryTools.length);
  const baseUrl = getBaseUrl();
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + '/' },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: baseUrl + '/categories' },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta.name,
        item: baseUrl + '/category/' + slug,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mb-10">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {meta.name}
        </h1>
        <p className="leading-6 text-gray-500 dark:text-gray-400">
          {meta.description}
        </p>
        <p className="mt-8 text-gray-500 dark:text-gray-400 leading-7 text-left">
          {longSeo}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl">
        {categoryTools.map((tool) => (
          <div
            key={tool.slug}
            className="bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col"
          >
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
              {tool.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 flex-1">
              {tool.description}
            </p>
            <Link href={`/${tool.slug}`} className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition w-fit">
              Open Calculator
            </Link>
          </div>
        ))}
      </div>

      {categoryTools.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 py-8">
          No calculators in this category yet.
        </p>
      )}
    </div>
    </>
  );
}
