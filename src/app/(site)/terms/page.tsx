import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and conditions for using our calculator platform. Use of calculators, intellectual property, and disclaimers.',
  keywords: 'terms and conditions, calculators, legal',
  alternates: { canonical: getBaseUrl() + '/terms' },
  openGraph: {
    title: 'Terms & Conditions',
    description:
      'Terms and conditions for using our calculator platform. Use of calculators, intellectual property, and disclaimers.',
    url: getBaseUrl() + '/terms',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: { card: 'summary_large_image', title: 'Terms & Conditions', description: 'Terms and conditions for using our calculator platform.' },
};

export default function TermsPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Terms &amp; Conditions
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-6">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Acceptance of terms
            </h2>
            <p>
              By accessing or using this calculator platform, you agree to
              these Terms &amp; Conditions. If you do not agree, please do not
              use the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Use of calculators
            </h2>
            <p>
              Our calculators are provided for educational and general utility
              purposes. You may use them in accordance with applicable laws. You
              are responsible for ensuring your usage and any data you input
              complies with your own policies and regulations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Intellectual property
            </h2>
            <p>
              The platform, including its design, code, and content (excluding
              user-provided data), is owned by us or our licensors. You may not
              copy, modify, or distribute our materials without permission. You
              retain rights to the content you create or input when using the
              calculators.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Disclaimer of warranties
            </h2>
            <p>
              The platform and calculators are provided &quot;as is&quot; and
              &quot;as available&quot; without warranties of any kind, express or
              implied. We do not guarantee that the calculators will be error-free,
              secure, or suitable for any particular purpose. Use them at your
              own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, we are not liable for any
              indirect, incidental, special, or consequential damages arising
              from your use of the platform or calculators. Our total liability shall
              not exceed the amount you paid to use the service, if any.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Changes to terms
            </h2>
            <p>
              We may update these Terms from time to time. We will post the
              updated terms on this page and update the &quot;Last updated&quot;
              date. Your continued use of the platform after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Contact information
            </h2>
            <p>
              If you have questions about these Terms &amp; Conditions, please
              contact us through the contact or support options provided on this
              website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
