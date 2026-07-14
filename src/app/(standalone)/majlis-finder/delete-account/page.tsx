import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: {
    absolute: 'Delete Your Majlis Finder Account',
  },
  description:
    'How to request deletion of your Majlis Finder account and associated data.',
  alternates: { canonical: getBaseUrl() + '/majlis-finder/delete-account' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Delete Your Majlis Finder Account',
    description:
      'How to request deletion of your Majlis Finder account and associated data.',
    url: getBaseUrl() + '/majlis-finder/delete-account',
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

export default function MajlisFinderDeleteAccountPage() {
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
          Delete Your Majlis Finder Account
        </h1>
        <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: '0.95rem' }}>
          Last updated: July 14, 2026
        </p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>1. Introduction</h2>
          <p style={paragraphStyle}>
            This page describes how to request deletion of your Majlis Finder account and its
            associated data.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>2. How to request deletion</h2>
          <ul style={listStyle}>
            <li>
              Email <strong>shia.events.app@gmail.com</strong> with the subject line{' '}
              <strong>&quot;Account Deletion Request&quot;</strong>
            </li>
            <li>
              The email must be sent from the same email address associated with your Google Sign-In
              account
            </li>
            <li>Include your name in the request</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>3. What happens after a request</h2>
          <p style={paragraphStyle}>
            Requests are processed within <strong>5 business days</strong>. When your account is
            deleted, the following data is removed:
          </p>
          <ul style={listStyle}>
            <li>Profile information (name, email, profile photo)</li>
            <li>Saved events, followed organizations and Zakireen</li>
            <li>Volunteer sign-up history and any phone number provided during sign-up</li>
          </ul>
          <p style={paragraphStyle}>
            Some data may be retained briefly if required for legal, security, or fraud-prevention
            purposes, and will be permanently deleted after that retention period ends.
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={headingStyle}>4. Contact</h2>
          <p style={{ ...paragraphStyle, marginBottom: 0 }}>
            For account deletion requests or any related questions, contact us at{' '}
            <strong>shia.events.app@gmail.com</strong>.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20 }}>
          <p style={{ ...paragraphStyle, marginBottom: 0, fontSize: '0.95rem' }}>
            See also our{' '}
            <Link href="/majlis-finder/privacy" style={linkStyle}>
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
