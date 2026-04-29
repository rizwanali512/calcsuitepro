import type { Metadata } from 'next';
import Link from 'next/link';
import { UniversityDirectoryClient } from '@/components/gpa/UniversityDirectoryClient';
import { universities } from '@/lib/universities';
import { siteConfig } from '@/lib/seo';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: `Pakistan University GPA & CGPA Calculator | ${siteConfig.name}`,
  description:
    'Calculate GPA and CGPA for Pakistani universities with grading scales, semester tracking, and downloadable results.',
  keywords: [
    'gpa calculator pakistan',
    'cgpa calculator pakistan',
    'university gpa calculator',
    'semester gpa calculator',
    'grading scale pakistan',
    'credit hour gpa calculator',
  ],
  alternates: { canonical: getBaseUrl() + '/gpa-calculator' },
  openGraph: {
    title: `Pakistan University GPA & CGPA Calculator | ${siteConfig.name}`,
    description:
      'Calculate GPA and CGPA for Pakistani universities with grading scales, semester tracking, and downloadable results.',
    url: getBaseUrl() + '/gpa-calculator',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Pakistan University GPA & CGPA Calculator | ${siteConfig.name}`,
    description:
      'Calculate GPA and CGPA for Pakistani universities with grading scales, semester tracking, and downloadable results.',
  },
};

export const revalidate = 60 * 60 * 24;

export default function GPACalculatorIndexPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <header className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Pakistan University GPA & CGPA Calculator
        </h1>
        <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
          Pick your university to calculate GPA, CGPA, view the official grading scale, and export your results.
        </p>
      </header>

      <section className="mb-8" aria-label="Quick links">
        <div className="flex flex-wrap gap-2 justify-center">
          {universities.slice(0, 8).map((u) => (
            <Link
              key={u.slug}
              href={`/gpa-calculator/${u.slug}`}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              {u.short}
            </Link>
          ))}
        </div>
      </section>

      <UniversityDirectoryClient universities={universities} />
    </div>
  );
}

