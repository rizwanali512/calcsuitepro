import type { Metadata } from 'next';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS, siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    `${siteConfig.name} is a calculator platform for finance, math, and physics with simple, reliable web-based workflows.`,
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/about' },
  openGraph: {
    title: `About ${siteConfig.name} – Calculator Platform`,
    description:
      `${siteConfig.name} helps users solve finance, math, and physics problems with formula-based calculators.`,
    url: getBaseUrl() + '/about',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${siteConfig.name} – Calculator Platform`,
    description:
      `${siteConfig.name} helps users solve finance, math, and physics problems with formula-based calculators.`,
  },
};

export default function AboutPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          About {siteConfig.name}
        </h1>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
          {siteConfig.name} is a calculator-first platform focused on finance, math, and physics workflows.
        </p>

        <div className="space-y-10 text-gray-600 dark:text-gray-300 leading-6">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Our mission
            </h2>
            <p>
              Our goal is to provide accurate, easy-to-use calculators for everyday
              formulas. Everything runs in your browser with a fast and consistent
              interface.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              What we offer
            </h2>
            <p className="mb-4">
              We provide a growing collection of calculator categories:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-gray-800 dark:text-white/90">
                  Finance calculators
                </strong>{' '}
                — Interest, EMI, and planning calculations.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-white/90">
                  Math calculators
                </strong>{' '}
                — Percentage and core formula solving.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-white/90">
                  Physics calculators
                </strong>{' '}
                — Motion and mechanics calculations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Why choose us
            </h2>
            <p>
              Our calculators are built to be fast, reliable, and private. We keep the
              interface simple and the results accurate. Whether you&apos;re
              solving a finance, math, or physics problem, you get a no-fuss
              experience with no account required.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Get in touch
            </h2>
            <p className="mb-4">
              Have feedback, ideas for new calculators, or questions? We&apos;d love to
              hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/all-calculators"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm bg-primary-500 hover:bg-primary-600 text-white transition"
              >
                Browse all calculators
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                Contact us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
