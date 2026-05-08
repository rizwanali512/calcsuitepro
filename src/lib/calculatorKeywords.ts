import type { Calculator } from '@/lib/calculators';

/**
 * Generates a unique, page-specific meta-keywords list per calculator.
 *
 * Strategy:
 *   1. If the calculator definition has explicit `keywords.primary` /
 *      `keywords.secondary`, use those — those are hand-curated and most
 *      semantically accurate.
 *   2. Otherwise build a deterministic list from the calculator's name +
 *      category so no two calculators share an identical keyword string.
 *
 * Output is returned as a string array (Next.js `Metadata.keywords` accepts
 * either string or string[]); array form keeps each phrase distinct in HTML.
 */

const CATEGORY_NOUNS: Record<Calculator['category'], string[]> = {
  finance: ['finance calculator', 'financial calculator', 'money calculator'],
  math: ['math calculator', 'mathematics calculator'],
  physics: ['physics calculator', 'science calculator'],
  health: ['health calculator', 'wellness calculator'],
};

const SUBCATEGORY_TERMS: Record<string, string[]> = {
  loans: ['loan calculator', 'monthly payment calculator', 'installment calculator'],
  mortgage: ['mortgage calculator', 'home loan calculator', 'mortgage payment calculator'],
  investment: ['investment calculator', 'compound growth calculator', 'savings calculator'],
  retirement: ['retirement calculator', 'retirement planner', 'pension calculator'],
  tax: ['tax calculator', 'income tax calculator'],
  general: ['budget calculator', 'percentage calculator'],
  geometry: ['geometry calculator', 'area calculator'],
  algebra: ['algebra calculator', 'equation calculator'],
  statistics: ['statistics calculator', 'probability calculator'],
  motion: ['motion calculator', 'kinematics calculator'],
  energy: ['energy calculator', 'work and energy calculator'],
  electricity: ['electricity calculator', 'circuit calculator'],
  fitness: ['fitness calculator', 'body composition calculator'],
  nutrition: ['nutrition calculator', 'calorie calculator'],
};

/**
 * Slug-specific, hand-tuned keyword overrides. These match the high-intent
 * search phrases each calculator actually ranks for. Add entries here for
 * top-traffic calculators; everything else gets the deterministic fallback.
 */
const SLUG_OVERRIDES: Record<string, string[]> = {
  'emi-calculator': [
    'emi calculator',
    'emi calculator online',
    'loan emi calculator',
    'monthly installment calculator',
    'emi formula',
    'emi calculation',
  ],
  'bmi-calculator': [
    'bmi calculator',
    'bmi calculator online',
    'body mass index calculator',
    'bmi formula',
    'weight height calculator',
    'bmi chart',
  ],
  'mortgage-calculator': [
    'mortgage calculator',
    'home loan calculator',
    'mortgage payment calculator',
    'monthly mortgage calculator',
    'mortgage formula',
  ],
  'compound-interest-calculator': [
    'compound interest calculator',
    'compound interest formula',
    'investment growth calculator',
    'compounding calculator',
    'savings interest calculator',
  ],
  'percentage-calculator': [
    'percentage calculator',
    'percent calculator',
    'percentage formula',
    'percentage change calculator',
    'percentage increase calculator',
  ],
  'tip-calculator': [
    'tip calculator',
    'tip percentage calculator',
    'restaurant tip calculator',
    'split bill calculator',
  ],
  'velocity-calculator': [
    'velocity calculator',
    'speed calculator',
    'velocity formula',
    'distance time calculator',
    'physics velocity calculator',
  ],
  'pressure-calculator': [
    'pressure calculator',
    'pressure formula',
    'p = f/a calculator',
    'force area pressure calculator',
    'physics pressure calculator',
  ],
  'gravitational-force-calculator': [
    'gravitational force calculator',
    'gravity calculator',
    'newton gravitational law calculator',
    'gravitational force formula',
    'mass distance gravity calculator',
  ],
  'visceral-fat-calculator': [
    'visceral fat calculator',
    'belly fat calculator',
    'visceral fat level',
    'visceral fat formula',
    'abdominal fat calculator',
  ],
  'scientific-calculator': [
    'scientific calculator',
    'scientific calculator online',
    'sin cos tan calculator',
    'log calculator',
    'expression calculator',
  ],
};

function slugToWords(slug: string): string {
  return slug.replace(/-/g, ' ').trim();
}

export function generateMetaKeywords(calculator: Calculator): string[] {
  const override = SLUG_OVERRIDES[calculator.slug];
  if (override) return [...override];

  if (calculator.keywords) {
    const merged = [calculator.keywords.primary, ...calculator.keywords.secondary]
      .map((k) => k.trim())
      .filter(Boolean);
    if (merged.length > 0) return Array.from(new Set(merged));
  }

  const baseName = calculator.name.toLowerCase();
  const slugTerms = slugToWords(calculator.slug);
  const categoryTerms = CATEGORY_NOUNS[calculator.category] ?? [];
  const subcategoryTerms = calculator.subcategory
    ? SUBCATEGORY_TERMS[calculator.subcategory] ?? []
    : [];

  const candidates = [
    baseName,
    `${baseName} online`,
    `${baseName} formula`,
    `${baseName} free`,
    slugTerms,
    ...subcategoryTerms,
    ...categoryTerms,
  ]
    .map((entry) => entry.trim())
    .filter(Boolean);

  return Array.from(new Set(candidates));
}
