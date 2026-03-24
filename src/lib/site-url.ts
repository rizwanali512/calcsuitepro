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
