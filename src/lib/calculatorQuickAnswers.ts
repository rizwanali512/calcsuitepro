import type { Calculator } from '@/lib/calculators';

/**
 * Short, citation-friendly paragraphs for AI systems (ChatGPT, Perplexity, Claude, Gemini)
 * and featured snippets. Placed near the top of each calculator page.
 */
const BY_SLUG: Record<string, readonly [string, string, string]> = {
  'emi-calculator': [
    'An EMI calculator estimates your fixed monthly loan payment from principal, annual interest rate, and loan term in months or years.',
    'It uses the standard amortizing loan formula: payment equals principal times the periodic rate times one plus that rate to the power of the number of payments, divided by one plus that rate to the power of payments minus one.',
    'Use it to compare loans or refinancing options; results are mathematical estimates and do not replace lender disclosures or professional advice.',
  ],
  'mortgage-calculator': [
    'A mortgage calculator estimates the monthly payment on a home loan from amount borrowed, interest rate, and repayment period.',
    'Like other EMI-style tools, it applies the same amortizing payment formula so principal and interest are split consistently over the schedule you enter.',
    'Treat the output as a planning number—actual payments depend on taxes, insurance, PMI, fees, and your lender’s exact terms.',
  ],
  'student-loan-calculator': [
    'A student loan calculator estimates the monthly payment on education debt from loan balance, annual interest rate, and repayment term in months.',
    'It uses the same core idea as an EMI calculator: level payments that retire the balance over time at the rate you specify.',
    'Federal and private programs can add income-driven plans, grace periods, or subsidies; this page models a standard fixed-payment loan for what-if math.',
  ],
  'compound-interest-calculator': [
    'A compound interest calculator projects how money grows when interest is added to the principal and future interest earns on that larger balance.',
    'You typically enter starting principal, annual rate, compounding frequency, and time; the tool applies periodic compounding to return an ending balance.',
    'It helps compare savings or investment scenarios; it does not predict market returns, fees, or taxes unless those fields exist on the specific tool.',
  ],
  'simple-interest-calculator': [
    'A simple interest calculator finds interest earned or owed as principal times annual rate times time, without compounding within the period.',
    'It is appropriate for short-term loans or teaching examples where interest does not reinvest into the balance each period.',
    'Output is a straightforward multiple of rate and time; confirm whether your real contract uses simple or compound interest.',
  ],
  'percentage-calculator': [
    'A percentage calculator answers “what percent is A of B?” or related part-whole questions from two numeric inputs.',
    'It divides the part by the whole (or equivalent) and scales to 100 so you can interpret ratios as percents.',
    'Use it for discounts, growth rates, and homework checks; always confirm which number is the base “100%” in your wording.',
  ],
  'bmi-calculator': [
    'A BMI calculator estimates Body Mass Index as weight in kilograms divided by height in meters squared (or equivalent conversions).',
    'It classifies underweight, normal, overweight, or obese ranges for screening in populations—not a diagnosis of body composition or health risk alone.',
    'Athletes, older adults, and pregnancy may need different metrics; use results as educational context with a clinician when decisions matter.',
  ],
  'bmr-calculator': [
    'A BMR calculator estimates basal metabolic rate—calories your body may burn at rest—often using height, weight, age, and sex in a published equation.',
    'CalcSuite Pro uses a common predictive formula (for example Mifflin–St Jeor style inputs) to return a single number you can compare across scenarios.',
    'Actual metabolism varies with genetics, muscle mass, illness, and medication; treat output as an estimate, not a meal plan or medical prescription.',
  ],
  'calorie-calculator': [
    'A calorie calculator estimates daily energy needs by combining a basal metabolic estimate with an activity multiplier you select.',
    'It outputs approximate maintenance calories so you can reason about intake versus expenditure for planning.',
    'Individual needs differ; athletes, clinical patients, and pregnancy require tailored guidance from qualified professionals.',
  ],
  'scientific-calculator': [
    'CalcSuite Pro’s scientific calculator evaluates typed mathematical expressions in the browser: trig, logs, powers, roots, factorial, and parentheses.',
    'You choose degrees or radians for trigonometry; inverse trig returns angles in the same mode you selected.',
    'It is for numeric checks and homework support, not symbolic algebra or step-by-step proof grading.',
  ],
  'graph-calculator': [
    'The graph calculator plots one or more functions you enter so you can see shape, intercepts, and trends visually in the browser.',
    'It complements numeric tools when a course or problem asks for intuition about how a formula behaves across inputs.',
    'Read axis scales and domain carefully; very steep or discontinuous functions may need window adjustments.',
  ],
  'velocity-calculator': [
    'This velocity calculator computes average velocity as displacement divided by elapsed time on one axis (v = Δx / Δt).',
    'Displacement is net change in position, not necessarily total distance traveled; negative results mean motion opposite your chosen positive direction.',
    'Use consistent units (for example meters and seconds) so the result is a speed in length per time.',
  ],
  'force-calculator': [
    'A force calculator uses Newton’s second law: force equals mass times acceleration (F = m × a) in consistent SI-style units unless you convert explicitly.',
    'Enter mass and acceleration; the tool multiplies them to return force, often shown in newtons.',
    'Sign matters when acceleration opposes your reference direction; magnitude alone is not always the full physics story.',
  ],
  'logarithm-calculator': [
    'A logarithm calculator returns log base b of x using the change-of-base rule: natural log of x divided by natural log of b.',
    'The argument x must be positive; the base b must be positive and not equal to one, or the logarithm is undefined in real numbers.',
    'It is useful for orders of magnitude, entropy-style ratios, and verifying homework change-of-base steps.',
  ],
  'loan-calculator': [
    'A loan calculator estimates periodic payments on an amortizing loan from amount financed, interest rate, and number of payment periods.',
    'It is structurally the same family as EMI and mortgage payment tools: solve for a level payment that retires the balance over time.',
    'Check whether your lender uses add-on interest, balloon payments, or fees that a simple amortization model does not include.',
  ],
  'tax-calculator': [
    'A tax calculator estimates tax owed as taxable income times a tax rate percentage you enter, for quick proportional math.',
    'Real income tax systems use brackets, deductions, credits, and filing status; use this page for rough scenarios or teaching, not filing.',
    'Always verify against current law, withholding, and a qualified tax professional before making decisions.',
  ],
};

function defaultParagraphs(c: Calculator): readonly [string, string, string] {
  const labels = c.inputs.map((i) => i.label.toLowerCase()).join(', ');
  const healthNote =
    c.category === 'health'
      ? ' Outputs are educational estimates only—not medical diagnosis or treatment advice.'
      : '';
  return [
    `${c.name} is a free online ${c.category} calculator on CalcSuite Pro. It implements: ${c.formula}. You enter ${labels || 'the fields on the form'}, then get a computed result in your browser.`,
    `It is built for quick checks, homework verification, and scenario comparisons when you already understand the underlying model and units.${healthNote}`,
    'Invalid or missing inputs show an error instead of a misleading number; compare multiple runs when you stress-test assumptions.',
  ];
}

export function getCalculatorQuickAnswerParagraphs(c: Calculator): readonly string[] {
  const custom = BY_SLUG[c.slug];
  if (custom) return [...custom];
  return [...defaultParagraphs(c)];
}
