import { calculators } from '@/lib/calculators';

/** Display title for each canonical category slug (matches tool.category). */
export const CATEGORY_LABELS: Record<string, string> = {
  finance: 'Finance Calculators',
  math: 'Math Calculators',
  physics: 'Physics Calculators',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  finance:
    'Finance calculators for interest, EMI, returns, and practical money planning scenarios.',
  math:
    'Math calculators for algebra, arithmetic, geometry, and percentage-based problem solving.',
  physics:
    'Physics calculators for core mechanics, motion, and energy equations.',
};

/** URL slug is the same as `tool.category` (e.g. json → /category/json). */
export function categoryToSlug(category: string): string {
  return category;
}

export function getCategoryDisplayName(categorySlug: string): string {
  return CATEGORY_LABELS[categorySlug] ?? categorySlug;
}

export function slugToCategory(slug: string): string | null {
  const entry = CATEGORY_META.find((c) => c.slug === slug);
  return entry ? entry.name : null;
}

export const CATEGORY_SLUGS = [
  ...new Set(calculators.map((c) => c.category)),
] as string[];

export const CATEGORY_META = (() => {
  const seen = new Set<string>();
  const list: { name: string; slug: string; description: string }[] = [];
  for (const c of calculators) {
    if (seen.has(c.category)) continue;
    seen.add(c.category);
    const slug = c.category;
    list.push({
      name: CATEGORY_LABELS[slug] ?? slug,
      slug,
      description: CATEGORY_DESCRIPTIONS[slug] ?? '',
    });
  }
  return list;
})();

export function getToolsByCategory(categorySlug: string) {
  return calculators.filter((c) => c.category === categorySlug);
}

/**
 * 200–300 words of indexable copy for category hub pages (ToolBaz-style hubs).
 */
export function getCategoryLongSeo(categorySlug: string, toolCount: number): string {
  const short = CATEGORY_DESCRIPTIONS[categorySlug] ?? '';
  return (
    `${short} ` +
    `CalcSuite Pro organizes calculators by domain so users can quickly move from a broad topic to a specific formula page without friction. ` +
    `This category currently includes ${toolCount} calculators, each designed for fast input, instant results, and clear formula references to support students, professionals, and decision-makers. ` +
    `The internal linking structure helps both users and search engines discover related calculators in a natural flow: open one calculation, compare methods, then continue into adjacent pages when the problem expands. ` +
    `Every calculator page is built as a focused landing page with explanatory content and practical context so the platform can scale to 100+ pages while maintaining consistency. ` +
    `Use this hub as your starting point for recurring calculations, and switch to All Calculators when you need cross-category discovery.`
  );
}
