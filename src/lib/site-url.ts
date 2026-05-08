import { siteConfig } from '@/lib/seo';

/**
 * Canonical base URL for the site. Prefer NEXT_PUBLIC_SITE_URL, then NEXT_PUBLIC_APP_URL, then VERCEL_URL.
 */
export function getBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (url) return url.replace(/\/$/, '');
  return siteConfig.url;
}

/**
 * Builds the `alternates` block for `Metadata`. The site is English-only, so we
 * declare both `en` and `x-default` pointing at the same URL—this prevents
 * Google from interpreting the absence of hreflang as an unspecified locale.
 */
export function buildAlternates(canonical: string) {
  return {
    canonical,
    languages: {
      en: canonical,
      'x-default': canonical,
    },
  };
}
