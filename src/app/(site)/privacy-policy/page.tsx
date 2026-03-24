import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for our calculator platform. Learn how we collect, use, and protect your information.',
  keywords: 'privacy policy, calculators, data protection',
  alternates: { canonical: getBaseUrl() + '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'Privacy policy for our calculator platform. Learn how we collect, use, and protect your information.',
    url: getBaseUrl() + '/privacy-policy',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: { card: 'summary_large_image', title: 'Privacy Policy', description: 'Privacy policy for our calculator platform.' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-6">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Introduction
            </h2>
            <p>
              This Privacy Policy describes how we collect, use, and protect
              information when you use our calculator platform. Most calculators run entirely in your
              browser and do not send your data to our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Information we collect
            </h2>
            <p>
              We may collect information you provide directly (e.g., account
              registration, contact forms) and automatically (e.g., usage data,
              cookies). When you use our calculators, inputs are processed in your browser.
              We do not store or transmit the content you enter into calculations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              How we use information
            </h2>
            <p>
              We use collected information to operate and improve the platform,
              personalize your experience, communicate with you, and comply with
              legal obligations. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Cookies and analytics
            </h2>
            <p>
              We may use cookies and similar technologies for authentication,
              preferences, and analytics. You can control cookies through your
              browser settings. Analytics help us understand how the site is
              used so we can improve it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Third-party services
            </h2>
            <p>
              Our platform may integrate third-party services (e.g., analytics,
              hosting). Those services have their own privacy practices. We
              encourage you to review their policies when you interact with them.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Data security
            </h2>
            <p>
              We take reasonable measures to protect your information. Because
              many calculator workflows run in the browser and do not store user data,
              the content you process is not retained on our systems.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will post
              the updated policy on this page and update the &quot;Last
              updated&quot; date. Continued use of the platform after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Contact information
            </h2>
            <p>
              If you have questions about this Privacy Policy or our practices,
              please contact us through the contact or support options provided
              on this website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
