import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { UniversityCalculatorClient } from '@/components/gpa/UniversityCalculatorClient';
import { getUniversityFaq, UniversitySeoContent } from '@/components/gpa/UniversitySeoContent';
import { getUniversityBySlug, universities } from '@/lib/universities';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

type PageProps = {
  params: Promise<{ university: string }>;
};

export const revalidate = 60 * 60 * 24;
export const dynamicParams = true;

export async function generateStaticParams() {
  return universities.slice(0, 10).map((u) => ({ university: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { university: slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return {};

  const title = `${uni.name} GPA Calculator | CGPA Calculator Pakistan`;
  const description = `Calculate GPA and CGPA for ${uni.name} (${uni.location}) with an accurate grading scale and downloadable result cards.`;
  const canonical = `${getBaseUrl()}/gpa-calculator/${uni.slug}`;
  const ogImage =
    uni.featuredImage && uni.featuredImage.startsWith('/')
      ? `${getBaseUrl()}${uni.featuredImage}`
      : uni.featuredImage;

  return {
    title,
    description,
    keywords: [
      `${uni.short} gpa calculator`,
      `${uni.short} cgpa calculator`,
      `${uni.name} gpa calculator`,
      'gpa calculator pakistan',
      'cgpa calculator pakistan',
      'grading scale',
      'credit hours gpa',
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function UniversityGPAPage({ params }: PageProps) {
  const { university: slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) notFound();

  const otherUniversities = universities.filter((u) => u.slug !== uni.slug);
  const gradeLevels = uni.grading.length;
  const description =
    uni.description ??
    `Calculate GPA and CGPA for ${uni.name} and view the grading scale used on this page.`;
  const canonical = `${getBaseUrl()}/gpa-calculator/${uni.slug}`;
  const faqs = getUniversityFaq(uni);

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${uni.name} GPA & CGPA Calculator`,
    url: canonical,
    applicationCategory: 'Calculator',
    operatingSystem: 'All',
    description,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="wrapper py-14 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <main>
          <header className="mb-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 size-14 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden flex items-center justify-center">
                {uni.logo ? (
                  <Image
                    src={uni.logo}
                    alt={`${uni.short} logo`}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <span className="font-extrabold text-gray-900 dark:text-white/90">{uni.short}</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white/90 leading-tight">
                  {uni.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10">
                    <span className="inline-block size-2 rounded-full bg-primary-500" />
                    {gradeLevels} Grade Levels
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10">
                    <span className="inline-block size-2 rounded-full bg-primary-500" />
                    Scale: 0 - {uni.scale.toFixed(1)}
                  </span>
                  {uni.officialSite ? (
                    <Link
                      href={uni.officialSite}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-500/40 transition"
                    >
                      <span className="inline-block size-2 rounded-full bg-primary-500" />
                      Official Site
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/70 dark:bg-white/5 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200/70 dark:border-white/10">
                      <span className="inline-block size-2 rounded-full bg-gray-300 dark:bg-white/20" />
                      Official Site
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-7 max-w-3xl">
                  {description}
                </p>
              </div>
            </div>
          </header>

          <UniversityCalculatorClient university={uni} />

          <UniversitySeoContent university={uni} otherUniversities={otherUniversities} />
        </main>

        <aside className="h-fit lg:sticky lg:top-24 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-gray-800 dark:text-white/90">Other universities</h2>
            <Link
              href="/gpa-calculator"
              className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              View all
            </Link>
          </div>

          <ul className="mt-4 space-y-2 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
            {otherUniversities.map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/gpa-calculator/${u.slug}`}
                  className="block rounded-xl border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-500/40 transition"
                >
                  <div className="font-semibold">{u.short}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {u.scale.toFixed(1)} scale
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

