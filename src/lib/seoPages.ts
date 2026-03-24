import { calculators, type Calculator } from '@/lib/calculators';

export type SeoPage = {
  slug: string;
  calculatorSlug: string;
  title: string;
  description: string;
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
      `Use this ${calculator.name.toLowerCase()} online to get fast and accurate results for ${calculator.category} calculations.`,
  },
  {
    suffix: 'free',
    title: (calculator) => `Free ${calculator.name}`,
    description: (calculator) =>
      `Try this free ${calculator.name.toLowerCase()} to calculate values quickly using simple inputs and instant output.`,
  },
  {
    suffix: 'with-formula',
    title: (calculator) => `${calculator.name} with Formula`,
    description: (calculator) =>
      `Calculate with ${calculator.name.toLowerCase()} and view the formula "${calculator.formula}" for transparent step-based understanding.`,
  },
  {
    suffix: '2026',
    title: (calculator) => `${calculator.name} 2026`,
    description: (calculator) =>
      `Use the updated ${calculator.name.toLowerCase()} 2026 version for quick ${calculator.category} planning and formula-based results.`,
  },
];

export const seoPages: SeoPage[] = (() => {
  const pages = calculators.flatMap((calculator) =>
    variantTemplates.map((variant) => ({
      slug: `${calculator.slug}-${variant.suffix}`,
      calculatorSlug: calculator.slug,
      title: variant.title(calculator),
      description: variant.description(calculator),
    }))
  );

  // Safety dedupe in case slugs overlap in future variants.
  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  });
})();

export function getSeoPageBySlug(slug: string): SeoPage | null {
  return seoPages.find((page) => page.slug === slug) ?? null;
}

