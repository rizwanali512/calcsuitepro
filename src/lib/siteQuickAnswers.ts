import { siteConfig } from '@/lib/seo';

const base = siteConfig.name;

/** Homepage — site-level extraction block. */
export const HOME_QUICK_ANSWER: readonly string[] = [
  `${base} is a free online calculator platform: finance (EMI, mortgage, compound interest, tax), math, physics, and health tools with visible formulas and instant browser-based results.`,
  'You browse by category hub or open a specific calculator URL; each tool validates inputs, shows the equation it uses, and returns numeric answers without installing software.',
  'Use results for planning, homework, and comparisons; finance, tax, and health outputs are educational estimates—not professional advice unless you confirm with a qualified expert.',
];

/** Full directory page. */
export const ALL_CALCULATORS_QUICK_ANSWER: readonly string[] = [
  'The all-calculators directory lists free tools across finance, math, physics, and health so you can jump straight to the formula you need.',
  'Each listing links to a dedicated page with inputs, the documented relationship (for example EMI or BMI), and related calculators in the same category.',
  'Pick a tool, enter consistent units, run Calculate, then adjust values to compare scenarios side by side in your browser.',
];

type Hub = 'finance' | 'math' | 'physics' | 'health';

const HUB_COPY: Record<Hub, { p1: string; p2: string; p3: string }> = {
  finance: {
    p1: `${base}’s finance hub groups loan, mortgage, investment, tax, retirement, and budgeting calculators in one place for cash-flow and growth planning.`,
    p2: 'Tools typically ask for principal, rate, and time (or income and tax rate) and apply standard formulas such as amortizing payments or compound growth.',
    p3: 'Outputs help you compare what-if cases before you talk to a lender, accountant, or advisor; they are not binding quotes or legal tax determinations.',
  },
  math: {
    p1: `The math hub on ${base} collects percentage, statistics, roots, probability, and algebra-style utilities for students and analysts.`,
    p2: 'Each page states the operation it performs (for example standard deviation or quadratic roots) and expects numeric inputs in the units described on the form.',
    p3: 'Use them to verify homework, sanity-check spreadsheet cells, or prototype a calculation before you code it elsewhere.',
  },
  physics: {
    p1: 'The physics hub covers mechanics and related formulas—force, energy, motion, and common intro-course relationships—with clear variable names.',
    p2: 'You supply measured quantities in consistent SI or stated units; the calculator returns the derived quantity from the documented equation.',
    p3: 'Results support classroom and lab estimates; engineering safety and instrument error need your course or workplace standards beyond a web form.',
  },
  health: {
    p1: 'Health tools estimate metrics such as BMI, BMR, calories, or body-fat proxies from height, weight, age, sex, and activity inputs you provide.',
    p2: 'They apply published predictive equations and show assumptions so you can understand what is being modeled.',
    p3: 'Treat every health number as educational screening—not a diagnosis, prescription, or substitute for a clinician when symptoms or risk matter.',
  },
};

export function getHubQuickAnswerParagraphs(hub: Hub): readonly string[] {
  const c = HUB_COPY[hub];
  return [c.p1, c.p2, c.p3];
}
