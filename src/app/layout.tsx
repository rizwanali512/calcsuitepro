import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Onest } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import './globals.css';
import { ToasterProvider } from './providers/toaster';
import { DEFAULT_KEYWORDS, siteConfig } from '@/lib/seo';

const onest = Onest({
  subsets: ['latin'],
});

const defaultTitle = 'CalcSuite Pro - Free Online Calculators';
const defaultDescription = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    other: {
      'msvalidate.01': '06BF31386DCF08F2E422762118498706',
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      {
        url: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'android-chrome',
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-6612RC4BCC';
  // Organization schema is safe sitewide; WebSite schema is moved to the
  // homepage only (see src/app/(site)/page.tsx) per Google's guidance that
  // sitelinks search-box markup belongs on the canonical home page.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] ${onest.className}`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ThemeProvider disableTransitionOnChange>
          {/* ToasterProvider must render before the children components */}
          {/* https://github.com/emilkowalski/sonner/issues/168#issuecomment-1773734618 */}
          <ToasterProvider />

          <div className="isolate flex flex-col flex-1">{children}</div>
        </ThemeProvider>
        {/* Vercel Analytics & Speed Insights: once in root layout, before closing body */}
        <Analytics />
        <SpeedInsights />

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
