import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy for Try Outfit',
  description:
    'Privacy Policy for the Try Outfit mobile application. How Rizwan Diplana collects, uses, and protects your information.',
  alternates: { canonical: getBaseUrl() + '/try-outfit/privacy-policy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy for Try Outfit',
    description:
      'Privacy Policy for the Try Outfit mobile application. How Rizwan Diplana collects, uses, and protects your information.',
    url: getBaseUrl() + '/try-outfit/privacy-policy',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy for Try Outfit',
    description: 'Privacy Policy for the Try Outfit mobile application.',
  },
};

export default function TryOutfitPrivacyPolicyPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Privacy Policy for Try Outfit
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <strong>Last updated: June 27, 2026</strong>
        </p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-6">
          <section>
            <p>
              This Privacy Policy explains how Rizwan Diplana (&quot;I&quot;, &quot;we&quot;, &quot;us&quot;)
              collects, uses, and protects information when you use the Try Outfit mobile application
              (the &quot;App&quot;).
            </p>
            <p className="mt-4">
              Try Outfit is developed and operated by an individual developer (Rizwan Diplana), not a
              registered company.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              1. Information We Collect
            </h2>
            <p>
              <strong>Google Sign-In information:</strong> Try Outfit uses Google Sign-In as the only way
              to log in. When you sign in, we receive your <strong>name, email address, and profile picture</strong>{' '}
              from your Google account. This is used to create your in-app profile and identify your
              account.
            </p>
            <p className="mt-4">
              <strong>Photos you upload:</strong> When you use the virtual try-on feature, we collect:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>The photo of yourself that you upload</li>
              <li>The outfit image you upload or select</li>
            </ul>
            <p className="mt-4">
              These are required to generate your virtual try-on result.
            </p>
            <p className="mt-4">
              <strong>Purchase information:</strong> When you buy credits, payment is processed entirely
              by <strong>Google Play Billing</strong>. We do not see, collect, or store your card or
              payment details.
            </p>
            <p className="mt-4">
              <strong>Credit balance &amp; usage:</strong> We track your credit balance (including your 2
              free credits as a new user) and which features you&apos;ve used, to operate the app
              correctly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To create and manage your account (via Google Sign-In)</li>
              <li>To generate virtual try-on previews of outfits on your photo</li>
              <li>To track and apply your free and purchased credits</li>
              <li>To respond to support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              3. How Your Photos Are Processed
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Your uploaded photo and selected outfit image are sent to{' '}
                <strong>Google Cloud&apos;s Vertex AI Virtual Try-On API</strong> to generate the try-on
                result. Google processes this image data on our behalf to return the generated output.
              </li>
              <li>
                Your photo and outfit images are stored on <strong>Cloudflare</strong> (cloud storage),
                used to deliver the try-on feature reliably.
              </li>
              <li>
                Your uploaded photo and outfit images are kept in storage so you can view your try-on
                history within the app. They are retained for as long as your account remains active, and
                are deleted when you delete your account (see Section 5).
              </li>
              <li>
                We do not use your photos to train AI models, and we do not sell or share your photos with
                advertisers or any party other than the processors named in this policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              4. Third-Party Services
            </h2>
            <p>
              Try Outfit relies on the following third-party services to function:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-1">
              <li>
                <strong>Google Sign-In</strong> — for account login and authentication
              </li>
              <li>
                <strong>Google Cloud Vertex AI (Virtual Try-On API)</strong> — to generate try-on results
                from your photos
              </li>
              <li>
                <strong>Cloudflare</strong> — for secure cloud storage of uploaded images
              </li>
              <li>
                <strong>Google Play Billing</strong> — for processing credit purchases
              </li>
            </ul>
            <p className="mt-4">
              Each of these services processes data according to its own privacy policy:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                Google Privacy Policy:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:opacity-80"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://policies.google.com/privacy
                </a>
              </li>
              <li>
                Cloudflare Privacy Policy:{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:opacity-80"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://www.cloudflare.com/privacypolicy/
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              5. Data Retention
            </h2>
            <p>
              We retain your account information (name, email, profile picture), uploaded photos, and
              outfit images for as long as your account is active. When you delete your account, this
              data — including your stored photos and try-on history — is permanently deleted from our
              systems.
            </p>
            <p className="mt-4">
              To request account deletion, email rizwandiplana@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              6. Data Security
            </h2>
            <p>
              We rely on Google Sign-In, Google Cloud, and Cloudflare&apos;s industry-standard security
              practices, including encryption in transit, to help protect your information. However, no
              method of transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Try Outfit is not directed at children under 13. We do not knowingly collect data from
              children under 13. If you believe a child has used the App and provided personal data,
              contact us at rizwandiplana@gmail.com so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              8. Your Rights
            </h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Access the data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent and stop using the app</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact: <strong>rizwandiplana@gmail.com</strong>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              9. Changes to This Policy
            </h2>
            <p>
              This Privacy Policy may be updated from time to time. Changes will be posted on this page
              with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              10. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy or how your data is handled, contact:
            </p>
            <p className="mt-4">
              <strong>Rizwan Diplana</strong>
              <br />
              Email: rizwandiplana@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
