import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalculatorTemplate from '@/components/CalculatorTemplate';
import { calculators, getCalculatorBySlug } from '@/lib/calculators';
import { siteConfig } from '@/lib/seo';
import { getSeoPageBySlug, seoPages } from '@/lib/seoPages';

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Allow valid slugs not present in the last build output to render (no redirect to base calculator). */
export const dynamicParams = true;

export function generateStaticParams() {
  return [
    ...calculators.map((c) => ({ slug: c.slug })),
    ...seoPages.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const directCalculator = getCalculatorBySlug(slug);
  const seoPage = getSeoPageBySlug(slug);
  const calculator = directCalculator ?? (seoPage ? getCalculatorBySlug(seoPage.calculatorSlug) : null);

  if (!calculator) {
    return {
      title: 'Calculator Not Found',
      description: 'The requested calculator page could not be found.',
    };
  }

  const title = seoPage?.title ?? calculator.seoTitle ?? calculator.name;
  const description = seoPage?.description ?? calculator.seoDescription ?? calculator.description;
  const url = `${siteConfig.url}/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

export default async function SeoCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const seoPage = getSeoPageBySlug(slug);
  const directCalculator = getCalculatorBySlug(slug);
  const calculator = directCalculator ?? (seoPage ? getCalculatorBySlug(seoPage.calculatorSlug) : null);

  if (!calculator) {
    notFound();
  }

  const title = seoPage?.title ?? calculator.name;
  const description = seoPage?.description ?? calculator.description;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    url: `${siteConfig.url}/${slug}`,
    applicationCategory: 'Calculator',
    operatingSystem: 'All',
    description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {seoPage ? (
        <div className="wrapper pt-10 md:pt-14 pb-2">
          <div className="max-w-5xl mx-auto">
            <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
              {seoPage.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-7">
              {seoPage.description} This entry uses the path &apos;{seoPage.slug}&apos; so indexed snippets can match
              specific searches; the interactive {calculator.name} tool below uses the same engine, inputs,
              validation, and formula behavior as the primary calculator page.
            </p>
          </div>
        </div>
      ) : null}

      <CalculatorTemplate calculator={calculator} />
    </>
  );
}
