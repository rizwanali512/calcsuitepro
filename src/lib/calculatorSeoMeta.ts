/**
 * Centralized calculator titles & meta descriptions for SERP CTR (2026).
 * Titles emphasize Free / Fast / Accurate / Easy; descriptions cover what, speed, and audience.
 */

export const CALCULATOR_SEO_YEAR = '2026';

export type CalculatorForSeo = {
  name: string;
  slug: string;
  description: string;
  category: 'finance' | 'math' | 'physics' | 'health';
};

const TITLE_OVERRIDES: Record<string, string> = {
  'scientific-calculator':
    'Scientific Calculator Online – Free, Advanced & Easy to Use (2026)',
  'graph-calculator': 'Graph Calculator Online – Free, Instant & Easy to Use (2026)',
  'visceral-fat-calculator':
    'Visceral Fat Calculator – Check Your Fat Level Instantly (Free Tool)',
  'bmi-calculator': 'BMI Calculator – Free Body Mass Index (kg & m/cm) | 2026',
  'bmr-calculator': 'BMR Calculator – Mifflin–St Jeor Basal Metabolic Rate (Free)',
  'calorie-calculator': 'Calorie Calculator – TDEE & Daily Maintenance Calories (Free)',
  'body-fat-calculator': 'Body Fat Calculator – Estimate Body Fat % from BMI (Free)',
};

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  'scientific-calculator':
    'Evaluate trig, logs, ln, powers, roots, and full expressions in your browser. Instant, accurate results—free and easy for students, STEM homework, and quick lab math.',
  'graph-calculator':
    'Plot y = f(x) with zoom, pan, and multiple equations—plus optional 3D surfaces. Instant, accurate graphs—free and easy for algebra through calculus and quick checks.',
  'visceral-fat-calculator':
    'Estimate an abdominal adiposity proxy from waist, thigh, height, weight, age, and gender. Instant, easy results—free wellness tool for education only (not medical advice).',
  'bmi-calculator':
    'Calculate BMI from weight (kg) and height in meters or centimeters. Instant, accurate results—free screening-style math for wellness and coursework (not a diagnosis).',
  'bmr-calculator':
    'Estimate resting calorie burn with the Mifflin–St Jeor equation from sex, age, height (cm), and weight (kg). Fast, free BMR for planning—education only.',
  'calorie-calculator':
    'Estimate maintenance calories (TDEE): Mifflin–St Jeor BMR × activity level (sedentary to very active). Instant TDEE—free tool for rough targets, not medical advice.',
  'body-fat-calculator':
    'Estimate body fat % from sex, age, height, and weight using a standard BMI-based regression. Quick, free composition proxy—trends matter more than one reading.',
};

const AUDIENCE_BY_CATEGORY: Record<CalculatorForSeo['category'], string> = {
  finance: 'borrowers, investors, and planners',
  math: 'students, teachers, and everyday math',
  physics: 'students and engineers',
  health: 'wellness tracking and fitness planning',
};

function displayName(calculator: CalculatorForSeo): string {
  const n = calculator.name;
  if (n.toLowerCase().includes('calculator')) return n;
  return `${n} Calculator`;
}

/** Default title: [Name] – Free, Fast & Accurate (2026), with curated overrides. */
export function getCalculatorSeoTitle(calculator: CalculatorForSeo): string {
  return (
    TITLE_OVERRIDES[calculator.slug] ??
    `${displayName(calculator)} – Free, Fast & Accurate (${CALCULATOR_SEO_YEAR})`
  );
}

/**
 * Meta description: what it does (from `description`), plus instant / accurate / free / easy + audience.
 * Target ~155–160 characters where possible.
 */
export function getCalculatorSeoDescription(calculator: CalculatorForSeo): string {
  const override = DESCRIPTION_OVERRIDES[calculator.slug];
  if (override) return override;

  const audience = AUDIENCE_BY_CATEGORY[calculator.category];
  const what = calculator.description.trim();
  const sentence = what.endsWith('.') ? what : `${what}.`;
  const tail = ` Instant, accurate results—free and easy for ${audience}.`;
  const maxLen = 160;

  if (sentence.length + tail.length <= maxLen) {
    return sentence + tail;
  }

  const budget = Math.max(40, maxLen - tail.length - 1);
  const clipped = sentence.slice(0, budget).replace(/\s+\S*$/, '') + '…';
  return clipped + tail;
}
