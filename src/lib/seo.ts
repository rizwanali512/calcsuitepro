import { siteConfig as baseSiteConfig } from '@/lib/config';

export const siteDescription =
  'CalcSuite Pro offers free online calculators for finance, math, physics, and health. Fast, accurate, and easy-to-use tools.';

// Keep the existing `siteConfig.description` contract for SEO metadata.
export const siteConfig = {
  ...baseSiteConfig,
  description: siteDescription,
};

/**
 * Default SEO keywords for CalcSuite Pro.
 * Used in root layout and can be extended per page.
 */
export const DEFAULT_KEYWORDS =
  'free online calculators, finance calculator, math calculator, physics calculator, health calculator, formula calculator, calculator tools';
