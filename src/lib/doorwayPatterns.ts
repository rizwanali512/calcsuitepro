/**
 * Shared helpers for identifying doorway/duplicate calculator URL patterns.
 *
 * "Doorway" pages here are thin SEO variants that point at the same calculator
 * engine as a canonical page. Google explicitly flags these as spam, so we:
 *   1. Generate 301 redirects for every variant URL pattern in next.config.ts
 *   2. Exclude them from the sitemap
 *   3. Set <meta name="robots" content="noindex, follow"> as a transition-period
 *      safety net for any indexed URL that slips past the redirect layer
 *
 * The patterns reflect what the previous auto-generator produced and what Google
 * Search Console flagged as duplicates.
 */

/** Suffixes that the previous auto-generator appended to canonical slugs. */
export const DOORWAY_SUFFIXES = ['online', 'free', 'with-formula'] as const;

/** Year-suffix doorways such as `<slug>-2026`. We treat any 4-digit suffix as a doorway. */
const YEAR_SUFFIX_REGEX = /-\d{4}$/;

/** Manual programmatic entries that are doorway-style and need explicit redirects. */
export const MANUAL_DOORWAY_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: '/scientific-calculator-online-free', to: '/scientific-calculator' },
  { from: '/graph-calculator-online-free', to: '/graph-calculator' },
  { from: '/function-plotter-online', to: '/graph-calculator' },
  { from: '/free-online-graphing-calculator-no-signup', to: '/graph-calculator' },
  { from: '/algebra-graph-calculator-online', to: '/graph-calculator' },
  { from: '/speed-calculator-online', to: '/velocity-calculator' },
];

const MANUAL_DOORWAY_SLUGS = new Set(
  MANUAL_DOORWAY_REDIRECTS.map((entry) => entry.from.replace(/^\//, ''))
);

/**
 * Returns true if a slug matches any known doorway pattern. Used in metadata
 * generation as a noindex safety net and in the sitemap to keep these URLs out.
 */
export function isDoorwaySlug(slug: string): boolean {
  if (!slug) return false;
  if (MANUAL_DOORWAY_SLUGS.has(slug)) return true;
  for (const suffix of DOORWAY_SUFFIXES) {
    if (slug.endsWith(`-${suffix}`)) return true;
  }
  if (YEAR_SUFFIX_REGEX.test(slug)) return true;
  if (slug.startsWith('online-')) return true;
  return false;
}
