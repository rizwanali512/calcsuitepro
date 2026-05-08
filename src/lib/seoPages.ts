import { programmaticSeoCalculatorPages } from '@/lib/programmaticSeoCalculatorPages';

export type SeoPage = {
  slug: string;
  calculatorSlug: string;
  title: string;
  description: string;
  /** When set, used for meta tags, Open Graph, and JSON-LD instead of `description`. */
  metaDescription?: string;
  /** Long-form copy rendered below the embedded calculator on programmatic pages. */
  content?: string;
};

/**
 * Programmatic SEO calculator pages.
 *
 * Previously this file also auto-generated four "variant" pages per calculator
 * (`-online`, `-free`, `-with-formula`, `-2026`). Those were thin doorway pages
 * that Google flagged as duplicates, so the generator was removed.
 *
 * The list now contains only HAND-CURATED pages with substantial unique
 * content. Any URLs that previously came from the auto-generator are 301
 * redirected to their canonical calculator in `next.config.ts`.
 */
export const seoPages: SeoPage[] = (() => {
  const manual = programmaticSeoCalculatorPages as SeoPage[];
  const seen = new Set<string>();
  return manual.filter((page) => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  });
})();

export function getSeoPageBySlug(slug: string): SeoPage | null {
  return seoPages.find((page) => page.slug === slug) ?? null;
}
