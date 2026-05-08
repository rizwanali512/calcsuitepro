import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalculatorTemplate from '@/components/CalculatorTemplate';
import { calculators, getCalculatorBySlug } from '@/lib/calculators';
import { getCalculatorSeoDescription, getCalculatorSeoTitle } from '@/lib/calculatorSeoMeta';
import { siteConfig } from '@/lib/seo';
import { getSeoPageBySlug, seoPages } from '@/lib/seoPages';
import { isDoorwaySlug } from '@/lib/doorwayPatterns';
import { generateMetaKeywords } from '@/lib/calculatorKeywords';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebApplicationSchema,
  jsonLdString,
} from '@/lib/schema';
import { CATEGORY_META } from '@/lib/categories';
import { getCalculatorFaqEntries } from '@/lib/calculatorPageFaqs';

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

  const title = seoPage?.title ?? getCalculatorSeoTitle(calculator);
  const description =
    seoPage?.metaDescription ?? seoPage?.description ?? getCalculatorSeoDescription(calculator);
  const url = `${siteConfig.url}/${slug}`;
  const keywordList = generateMetaKeywords(calculator);

  // Safety net: if a doorway URL slips past the next.config 301 (e.g. a
  // cached build artifact), serve it with noindex so Google drops it.
  const doorway = isDoorwaySlug(slug);

  return {
    title,
    description,
    keywords: keywordList,
    alternates: {
      canonical: url,
      languages: { en: url, 'x-default': url },
    },
    ...(doorway ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  const title = seoPage?.title ?? getCalculatorSeoTitle(calculator);
  const description =
    seoPage?.metaDescription ?? seoPage?.description ?? getCalculatorSeoDescription(calculator);

  const webAppSchema = generateWebApplicationSchema({
    name: title,
    slug,
    description,
  });

  const categoryMeta = CATEGORY_META.find((c) => c.slug === calculator.category);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    ...(categoryMeta
      ? [{ name: categoryMeta.name, path: `/${calculator.category}-calculators` }]
      : []),
    { name: calculator.name, path: `/${slug}` },
  ]);

  const faqEntries = getCalculatorFaqEntries(calculator);
  const faqPageSchema = faqEntries.length > 0 ? generateFAQSchema(faqEntries) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      {faqPageSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqPageSchema) }}
        />
      ) : null}

      <CalculatorTemplate calculator={calculator} />

      {seoPage ? (
        <div className="wrapper pb-10 md:pb-14 pt-6 md:pt-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-2xl md:text-3xl">
              {seoPage.title}
            </h2>
            {seoPage.content ? (
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-7">
                {seoPage.content
                  .trim()
                  .split(/\n\n+/)
                  .map((block) => block.trim())
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 leading-7">
                {seoPage.description} This entry uses the path &apos;{seoPage.slug}&apos; so indexed snippets can
                match specific searches; the interactive {calculator.name} tool above uses the same engine, inputs,
                validation, and formula behavior as the primary calculator page.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
