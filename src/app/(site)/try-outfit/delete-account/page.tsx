import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Delete Your Try Outfit Account',
  description:
    'How to delete your Try Outfit account and data. Delete in the app or request deletion by email.',
  alternates: { canonical: getBaseUrl() + '/try-outfit/delete-account' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Delete Your Try Outfit Account',
    description:
      'How to delete your Try Outfit account and data. Delete in the app or request deletion by email.',
    url: getBaseUrl() + '/try-outfit/delete-account',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delete Your Try Outfit Account',
    description: 'How to delete your Try Outfit account and data.',
  },
};

export default function TryOutfitDeleteAccountPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          Delete Your Try Outfit Account
        </h1>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-6">
          <section>
            <p>
              Try Outfit (developed by Rizwan Diplana) gives you full control over your account and
              data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Option 1: Delete your account in the app (recommended)
            </h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Open the Try Outfit app</li>
              <li>
                Go to <strong>Settings</strong>
              </li>
              <li>
                Tap <strong>Delete Account</strong>
              </li>
              <li>
                Type &quot;DELETE&quot; to confirm, then tap <strong>Delete My Account</strong>
              </li>
            </ol>
            <p className="mt-4">
              Your account, photos, try-on history, and credits will be permanently deleted
              immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Option 2: Request deletion without the app
            </h2>
            <p>
              If you no longer have access to the app (e.g. you&apos;ve uninstalled it or lost access
              to your Google account), you can request deletion by email instead:
            </p>
            <ol className="mt-4 list-decimal pl-6 space-y-1">
              <li>
                Send an email to <strong>rizwandiplana@gmail.com</strong> from the same email address
                you used to sign in to Try Outfit (via Google Sign-In)
              </li>
              <li>
                Use the subject line: <strong>&quot;Delete My Account&quot;</strong>
              </li>
              <li>
                We will verify your request and permanently delete your account within{' '}
                <strong>7 business days</strong>
              </li>
              <li>You will receive a confirmation email once deletion is complete</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              What gets deleted
            </h2>
            <p>When your account is deleted, we permanently remove:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Your profile information (name, email, profile picture)</li>
              <li>Your uploaded photos and outfit images</li>
              <li>Your try-on history</li>
              <li>Your remaining credit balance</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              What may be retained
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Records required for legal, tax, or fraud-prevention purposes may be retained for a
                limited period as required by law, even after account deletion.
              </li>
              <li>
                Purchase records may be retained by Google Play in accordance with Google&apos;s own
                policies, separate from our systems.
              </li>
              <li>
                A one-way hash of your device identifier and email address is retained to prevent
                abuse of our free credit offer. This hash cannot be used to identify you or recover
                your original information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Questions</h2>
            <p>
              If you have any questions about this process, contact{' '}
              <strong>rizwandiplana@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
