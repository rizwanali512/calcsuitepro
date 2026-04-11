import { blogs, type Blog } from '@/lib/blogs';
import {
  calculators,
  getCalculatorBySlug,
  type Calculator,
} from '@/lib/calculators';
import { seoPages } from '@/lib/seoPages';

/** Up to `limit` other calculators in the same category; subcategory matches sort first, then name. */
export function getRelatedCalculatorsSameCategory(
  calculator: Calculator,
  limit = 5
): Calculator[] {
  return calculators
    .filter((c) => c.slug !== calculator.slug && c.category === calculator.category)
    .sort((a, b) => {
      const aSub =
        calculator.subcategory != null && a.subcategory === calculator.subcategory ? 0 : 1;
      const bSub =
        calculator.subcategory != null && b.subcategory === calculator.subcategory ? 0 : 1;
      if (aSub !== bSub) return aSub - bSub;
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}

function blogReferencesPath(content: string, path: string): boolean {
  if (!path.startsWith('/')) return false;
  return content.includes(`](${path})`) || content.includes(`(${path})`);
}

/** Programmatic SEO paths that embed the same calculator engine. */
export function getSeoPathsForCalculator(calculatorSlug: string): string[] {
  const paths = new Set<string>([`/${calculatorSlug}`]);
  for (const page of seoPages) {
    if (page.calculatorSlug === calculatorSlug) {
      paths.add(`/${page.slug}`);
    }
  }
  return [...paths];
}

const CATEGORY_BLOG_FALLBACK: Record<Calculator['category'], readonly string[]> = {
  finance: [
    'how-to-calculate-compound-interest',
    'emi-explained-for-beginners',
    'percentage-guide-with-real-examples',
    'personal-finance-tips-with-calculators',
  ],
  math: [
    'math-formulas-list-for-daily-use',
    'quadratic-equation-solver-guide',
    'probability-and-statistics-basics',
  ],
  physics: [
    'physics-formulas-for-students',
    'work-energy-and-power-explained',
    'momentum-and-collision-basics',
  ],
  health: [
    'bmi-and-body-fat-complete-guide',
    'calorie-and-macro-planning-guide',
    'running-pace-and-vo2-max-guide',
  ],
};

/**
 * Blogs that link to this calculator (or its programmatic SEO URLs), plus editorial fallbacks
 * so “Learn more” always surfaces internal links when possible.
 */
export function getLearnMoreBlogsForCalculator(
  calculatorSlug: string,
  limit = 5
): Pick<Blog, 'slug' | 'title' | 'description'>[] {
  const paths = getSeoPathsForCalculator(calculatorSlug);
  const direct: Blog[] = [];
  const seen = new Set<string>();

  for (const blog of blogs) {
    if (paths.some((p) => blogReferencesPath(blog.content, p))) {
      direct.push(blog);
      seen.add(blog.slug);
    }
  }

  const calc = getCalculatorBySlug(calculatorSlug);
  const fallbackSlugs = calc ? CATEGORY_BLOG_FALLBACK[calc.category] ?? [] : [];

  for (const slug of fallbackSlugs) {
    if (direct.length >= limit) break;
    const blog = blogs.find((b) => b.slug === slug);
    if (blog && !seen.has(blog.slug)) {
      direct.push(blog);
      seen.add(blog.slug);
    }
  }

  return direct.slice(0, limit).map((b) => ({
    slug: b.slug,
    title: b.title,
    description: b.description,
  }));
}

/** Map a URL slug (tool or programmatic SEO page) to the canonical calculator slug if known. */
export function resolveSlugToCalculatorSlug(slug: string): string | null {
  if (getCalculatorBySlug(slug)) return slug;
  const page = seoPages.find((p) => p.slug === slug);
  return page?.calculatorSlug ?? null;
}
