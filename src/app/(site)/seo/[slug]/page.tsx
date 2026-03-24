import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getSeoPageConfig,
  getSeoPageTools,
  SEO_PAGE_SLUGS,
} from '@/lib/seo-pages';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS, siteConfig } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SEO_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getSeoPageConfig(slug);
  if (!config) return { title: 'Page not found' };

  const title = `${config.title} | ${siteConfig.name}`;
  const description = config.metaDescription;

  return {
    title: config.title,
    description,
    keywords: `${DEFAULT_KEYWORDS}, ${config.slug}`,
    alternates: { canonical: getBaseUrl() + '/seo/' + slug },
    openGraph: {
      title,
      description,
      url: getBaseUrl() + '/seo/' + slug,
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getSeoPageConfig(slug);
  if (!config) notFound();

  const pageTools = getSeoPageTools(config);

  return (
    <div className="wrapper py-14 md:py-28">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            {config.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-6">
            {config.description}
          </p>
        </header>

        {pageTools.length > 0 ? (
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
              Tools
            </h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {pageTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:underline text-sm md:text-base"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No tools match this category yet.
          </p>
        )}
      </article>
    </div>
  );
}
