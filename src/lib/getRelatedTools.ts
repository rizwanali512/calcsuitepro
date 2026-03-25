import { type Calculator, calculators as tools } from '@/lib/calculators';
import { CORE_POPULAR_SLUGS } from '@/lib/popularTools';

const MIN_RELATED = 3;
const MAX_RELATED = 6;

export type RelatedTool = {
  name: string;
  description: string;
  slug: string;
  href: string;
};

/** Tokens for cross-category similarity (keywords + category + subcategory). */
function relationTokens(t: Calculator): string[] {
  const out: string[] = [t.category];
  if (t.subcategory) out.push(t.subcategory);
  if (t.keywords) {
    out.push(t.keywords.primary.trim().toLowerCase());
    for (const s of t.keywords.secondary) {
      const x = s.trim().toLowerCase();
      if (x) out.push(x);
    }
  }
  return out;
}

function tagOverlap(a: string[], b: string[]): number {
  const bs = new Set(b);
  return a.filter((x) => bs.has(x)).length;
}

function toRelated(t: (typeof tools)[number]): RelatedTool {
  return {
    name: t.name,
    description: t.description,
    slug: t.slug,
    href: `/${t.slug}`,
  };
}

/**
 * Related tools for SEO internal linking:
 * 1) Same category first
 * 2) Then other tools ranked by shared keyword/category tokens
 * 3) Fill with core popular tools if still below MIN_RELATED
 * Max MAX_RELATED links.
 */
export function getRelatedTools(currentSlug: string): RelatedTool[] {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return [];

  const sameCategory = tools.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  );

  const currentTokens = relationTokens(current);
  const otherByTags = tools
    .filter((t) => t.slug !== currentSlug && t.category !== current.category)
    .map((t) => ({
      tool: t,
      score: tagOverlap(currentTokens, relationTokens(t)),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.tool);

  const othersNoTagMatch = tools.filter(
    (t) =>
      t.slug !== currentSlug &&
      t.category !== current.category &&
      !otherByTags.some((o) => o.slug === t.slug)
  );

  const ordered: typeof tools = [];
  const seen = new Set<string>();

  const push = (t: (typeof tools)[number]) => {
    if (seen.has(t.slug) || ordered.length >= MAX_RELATED) return;
    ordered.push(t);
    seen.add(t.slug);
  };

  for (const t of sameCategory) push(t);
  for (const t of otherByTags) push(t);
  for (const t of othersNoTagMatch) push(t);

  let pi = 0;
  while (ordered.length < MIN_RELATED && pi < CORE_POPULAR_SLUGS.length) {
    const slug = CORE_POPULAR_SLUGS[pi++];
    if (slug === currentSlug || seen.has(slug)) continue;
    const t = tools.find((x) => x.slug === slug);
    if (t) push(t);
  }

  return ordered.slice(0, MAX_RELATED).map(toRelated);
}
