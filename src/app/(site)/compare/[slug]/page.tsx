import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getComparePageConfig,
  COMPARE_PAGE_SLUGS,
} from '@/lib/compare-pages';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS, siteConfig } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COMPARE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getComparePageConfig(slug);
  if (!config) return { title: 'Page not found' };

  const title = `${config.title} | ${siteConfig.name}`;

  return {
    title: config.title,
    description: config.metaDescription,
    keywords: `${DEFAULT_KEYWORDS}, compare, ${config.slug}`,
    alternates: { canonical: getBaseUrl() + '/compare/' + slug },
    openGraph: {
      title,
      description: config.metaDescription,
      url: getBaseUrl() + '/compare/' + slug,
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: config.metaDescription,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const config = getComparePageConfig(slug);
  if (!config) notFound();

  const [toolA, toolB] = config.tools;

  return (
    <div className="wrapper py-14 md:py-28">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            {config.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-6">
            {config.introduction}
          </p>
        </header>

        {/* Links to tools */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Try the tools
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href={toolA.href}
              className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm bg-primary-500 hover:bg-primary-600 text-white transition"
            >
              {toolA.name}
            </Link>
            <Link
              href={toolB.href}
              className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
            >
              {toolB.name}
            </Link>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-10 overflow-x-auto">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Comparison
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white/90 w-[30%]">
                  Aspect
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white/90">
                  {toolA.name}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white/90">
                  {toolB.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {config.comparisonTable.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-medium">
                    {row.aspect}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {row.toolA}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {row.toolB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90">
            Frequently asked questions
          </h2>
          <ul className="space-y-6">
            {config.faq.map((item, i) => (
              <li key={i}>
                <h3 className="font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-6">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/all-calculators" className="text-primary-500 hover:underline">
            Browse all calculators
          </Link>{' '}
          on {siteConfig.name}.
        </p>
      </article>
    </div>
  );
}
