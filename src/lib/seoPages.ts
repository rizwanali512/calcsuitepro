import { calculators, type Calculator } from '@/lib/calculators';
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

type VariantTemplate = {
  suffix: 'online' | 'free' | 'with-formula' | '2026';
  title: (calculator: Calculator) => string;
  description: (calculator: Calculator) => string;
};

const variantTemplates: VariantTemplate[] = [
  {
    suffix: 'online',
    title: (calculator) => `${calculator.name} Online (Free Tool)`,
    description: (calculator) =>
      `Use this ${calculator.name.toLowerCase()} online to get fast and accurate results for ${calculator.category} calculations. ` +
      `This “online” entry point is written for people searching browser-based ${calculator.name.toLowerCase()} workflows without installing software.`,
  },
  {
    suffix: 'free',
    title: (calculator) => `Free ${calculator.name}`,
    description: (calculator) =>
      `Try this free ${calculator.name.toLowerCase()} to calculate values quickly using simple inputs and instant output. ` +
      `The “free” page variant targets searches for no-cost access while using the same calculator engine as the primary tool page.`,
  },
  {
    suffix: 'with-formula',
    title: (calculator) => `${calculator.name} with Formula`,
    description: (calculator) =>
      `Calculate with ${calculator.name.toLowerCase()} and view the formula "${calculator.formula}" for transparent step-based understanding. ` +
      `The “with formula” variant highlights the displayed equation and how inputs map to the result.`,
  },
  {
    suffix: '2026',
    title: (calculator) => `${calculator.name} 2026`,
    description: (calculator) =>
      `Use the updated ${calculator.name.toLowerCase()} 2026 version for quick ${calculator.category} planning and formula-based results. ` +
      `This dated variant answers year-specific queries while keeping methodology aligned with the main calculator.`,
  },
];

export const seoPages: SeoPage[] = (() => {
  const manual = programmaticSeoCalculatorPages as SeoPage[];
  const manualSlugs = new Set(manual.map((p) => p.slug));

  const pages = calculators.flatMap((calculator) =>
    variantTemplates.map((variant) => ({
      slug: `${calculator.slug}-${variant.suffix}`,
      calculatorSlug: calculator.slug,
      title: variant.title(calculator),
      description: variant.description(calculator),
    }))
  );

  const generatedFiltered = pages.filter((page) => !manualSlugs.has(page.slug));

  // Safety dedupe in case slugs overlap in future variants.
  const seen = new Set<string>();
  const dedupedGenerated = generatedFiltered.filter((page) => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  });

  return [...manual, ...dedupedGenerated];
})();

export function getSeoPageBySlug(slug: string): SeoPage | null {
  return seoPages.find((page) => page.slug === slug) ?? null;
}

