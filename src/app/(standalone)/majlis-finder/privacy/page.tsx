import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: {
    absolute: 'Privacy Policy — Majlis Finder',
  },
  description:
    'Privacy Policy for Majlis Finder. Learn what data we collect, how it is used, and how to request account deletion.',
  alternates: { canonical: getBaseUrl() + '/majlis-finder/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy — Majlis Finder',
    description:
      'Privacy Policy for Majlis Finder. Learn what data we collect, how it is used, and how to request account deletion.',
    url: getBaseUrl() + '/majlis-finder/privacy',
    type: 'website',
  },
};

const headingStyle: CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  margin: '0 0 12px',
  lineHeight: 1.35,
  color: '#111827',
};

const paragraphStyle: CSSProperties = {
  margin: '0 0 12px',
  color: '#374151',
};

const listStyle: CSSProperties = {
  margin: '0 0 12px',
  paddingLeft: 22,
  color: '#374151',
};

const linkStyle: CSSProperties = {
  color: '#1d4ed8',
  textDecoration: 'underline',
};

export default function MajlisFinderPrivacyPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f8f9fb',
        color: '#1a1a1a',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        lineHeight: 1.7,
        padding: '48px 20px 72px',
      }}
    >
      <article
        style={{
          maxWidth: 720,
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          padding: '40px 32px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3, margin: '0 0 8px' }}>
          Privacy Policy — Majlis Finder
        </h1>
        <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: '0.95rem' }}>
          Last updated: July 30, 2026
        </p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>1. Introduction</h2>
          <p style={paragraphStyle}>
            Majlis Finder is a community app helping users discover Shia Islamic religious events
            (Majalis), follow speakers and organizations, and access community features. This
            policy explains what data we collect and how it&apos;s used.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>2. Information we collect</h2>
          <ul style={listStyle}>
            <li>
              <strong>Account info via Google Sign-In:</strong> name, email address, profile photo
            </li>
            <li>
              <strong>Location data (approximate/city-level)</strong> — used to show nearby events,
              only if the user grants permission
            </li>
            <li>
              <strong>Device push notification token</strong> — used to send event reminders and
              updates
            </li>
            <li>
              <strong>User-generated content:</strong> saved events, followed organizations/Zakireen,
              event/announcement content submitted by verified organizers
            </li>
            <li>
              <strong>Advertising identifier and usage data</strong> — collected via third-party ad
              networks (Google AdMob) for showing and personalizing ads
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>3. How we use this information</h2>
          <ul style={listStyle}>
            <li>
              To provide core app functionality (showing relevant events, managing follows/saves,
              sending reminders)
            </li>
            <li>To show and measure advertising</li>
            <li>We do not sell personal data to third parties</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>4. Third-party services we use</h2>
          <ul style={listStyle}>
            <li>Google Sign-In (authentication)</li>
            <li>Google AdMob (advertising)</li>
            <li>Expo Push Notifications (notification delivery)</li>
            <li>Cloudflare R2 (file/image storage)</li>
            <li>MongoDB Atlas (database hosting)</li>
          </ul>
          <p style={paragraphStyle}>
            Each of these services processes data according to its own privacy practices. For Google
            Sign-In and Google AdMob, see the{' '}
            <a
              href="https://policies.google.com/privacy"
              style={linkStyle}
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Privacy Policy
            </a>
            .
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>5. Data retention</h2>
          <ul style={listStyle}>
            <li>We retain account data as long as the account is active</li>
            <li>Users may request account deletion at any time (see contact section)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>6. Data deletion</h2>
          <p style={paragraphStyle}>
            To request deletion of your account and associated data, email{' '}
            <strong>rizwandiplana@gmail.com</strong> from the same email address you used to sign in
            to Majlis Finder (via Google Sign-In). Please include a clear request to delete your
            account. We will process your request and permanently delete your account data from our
            systems.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>7. Children&apos;s privacy</h2>
          <p style={paragraphStyle}>
            The app is not directed at children under 13, and we do not knowingly collect data from
            children under 13.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>8. Changes to this policy</h2>
          <p style={paragraphStyle}>
            We may update this policy from time to time. Changes will be posted on this page with an
            updated date.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>9. Contact us</h2>
          <p style={{ ...paragraphStyle, marginBottom: 0 }}>
            If you have questions about this Privacy Policy or wish to request account or data
            deletion, contact us at <strong>rizwandiplana@gmail.com</strong>.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20 }}>
          <p style={{ ...paragraphStyle, marginBottom: 0, fontSize: '0.95rem' }}>
            To request account deletion, see{' '}
            <Link href="/majlis-finder/delete-account" style={linkStyle}>
              Delete Your Majlis Finder Account
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
