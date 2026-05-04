'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import GraphCalculator from '@/components/GraphCalculator';
import ScientificCalculator from '@/components/ScientificCalculator';
import {
  buildGraphFaqJsonLd,
  GRAPH_CALCULATOR_FAQ,
  GraphCalculatorArticle,
  GraphCalculatorIntro,
} from '@/components/GraphCalculatorPageContent';
import {
  buildScientificFaqJsonLd,
  SCIENTIFIC_CALCULATOR_FAQ,
  ScientificCalculatorArticle,
  ScientificCalculatorIntro,
} from '@/components/ScientificCalculatorPageContent';
import {
  VisceralFatDeepSeoSection,
  VisceralFatFeaturedSnippetSection,
  VisceralFatRangeChart,
  VisceralFatRangeExplainerSection,
  VisceralFatResultInterpretation,
  VisceralFatRiskTableSection,
  VisceralFatTipsSection,
  VISCERAL_FAT_CALCULATOR_FAQ,
} from '@/components/VisceralFatCalculatorEnhancements';
import {
  buildVelocityFaqJsonLd,
  VELOCITY_CALCULATOR_FAQ,
  VelocityCalculatorArticle,
  VelocityCalculatorIntro,
} from '@/components/VelocityCalculatorPageContent';
import ForceCalculatorPro from '@/components/calculators/pro/ForceCalculatorPro';
import LogarithmCalculatorPro from '@/components/calculators/pro/LogarithmCalculatorPro';
import StudentLoanCalculatorPro from '@/components/calculators/pro/StudentLoanCalculatorPro';
import { Input } from '@/components/ui/inputs';
import { calculate, type CalculationResult } from '@/lib/calculatorEngine';
import {
  getLearnMoreBlogsForCalculator,
  getRelatedCalculatorsSameCategory,
} from '@/lib/internalLinking';
import { Calculator, getPopularCalculators } from '@/lib/calculators';
import { buildCalculatorFaqPageJsonLd } from '@/lib/calculatorFaqSchema';
import { getCalculatorSeoTitle } from '@/lib/calculatorSeoMeta';
import { siteConfig } from '@/lib/seo';
import { getFieldPlaceholder, validateCalculatorForm } from '@/lib/validateInputs';
import { cn } from '@/lib/utils';

type Props = {
  calculator: Calculator;
  /** Compact mode for blog embeds: tool UI only, no FAQ/SEO tail. */
  embed?: boolean;
};

type FormValues = Record<string, number | string>;

const cardClass =
  'glass-card p-6 sm:p-8 rounded-2xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300';

const financeSubcategoryPaths: Record<string, { href: string; label: string }> = {
  mortgage: { href: '/mortgage-calculators', label: 'Explore more mortgage calculators' },
  auto: { href: '/auto-calculators', label: 'Explore more auto calculators' },
  investment: { href: '/investment-calculators', label: 'Explore more investment calculators' },
  retirement: { href: '/retirement-calculators', label: 'Explore more retirement calculators' },
  tax: { href: '/tax-calculators', label: 'Explore more tax calculators' },
  loans: { href: '/loan-calculators', label: 'Explore more loan calculators' },
  general: { href: '/general-finance-calculators', label: 'Explore more general finance calculators' },
};

const categoryPaths: Record<Calculator['category'], { href: string; label: string }> = {
  finance: { href: '/finance-calculators', label: 'Finance Calculators' },
  math: { href: '/math-calculators', label: 'Math Calculators' },
  physics: { href: '/physics-calculators', label: 'Physics Calculators' },
  health: { href: '/health-calculators', label: 'Health Calculators' },
};

const categoryUseCases: Record<Calculator['category'], string[]> = {
  finance: [
    'budget planning and monthly cash-flow checks',
    'loan comparisons before committing to repayments',
    'investment projections for short-term and long-term goals',
  ],
  math: [
    'homework verification and exam practice',
    'daily percentage and ratio calculations',
    'quick checks while building reports or dashboards',
  ],
  physics: [
    'classroom problem solving and revision',
    'engineering estimations in early planning',
    'validating assumptions in motion and energy calculations',
  ],
  health: [
    'personal wellness tracking and routine planning',
    'estimating body metrics before fitness decisions',
    'building healthier goals with measurable numbers',
  ],
};

function toSentenceList(items: string[]) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function explanationParagraphs(calculator: Calculator): string[] {
  if (calculator.slug === 'scientific-calculator') {
    return [
      `${calculator.name} evaluates full mathematical expressions in your browser: arithmetic, parentheses, powers, roots, factorial, logarithms, and trigonometry. Choose degrees or radians for trig arguments; inverse functions return results in the same angular mode. Memory keys and a short history make repeated work faster without retyping.`,
      `The tool is useful for homework checks, quick lab arithmetic, and day-to-day calculations. You can drive it from the keypad or the keyboard (digits, operators, Enter for equals, Backspace to edit). Invalid syntax, division by zero, and other undefined cases surface as a clear error instead of a silent bad value.`,
      `History stores recent runs so you can reopen an expression with one tap. MC, MR, M+, and M− behave like a classic calculator memory for running totals and stored constants.`,
    ];
  }
  if (calculator.slug === 'velocity-calculator') {
    return [
      `${calculator.name} computes average velocity as displacement divided by time (v = Δx / Δt) for motion along one axis. Enter the net change in position and the elapsed interval using consistent units—meters with seconds, kilometers with hours, and so on—then get a quick numeric result you can compare to your handwritten work.`,
      `Students and tutors use an online velocity calculator to sanity-check kinematics homework, lab prep, and exam-style problems before moving on to acceleration, graphs, or energy chapters. The tool assumes you already chose a positive direction and identified displacement correctly; mixing up total path length with net displacement is the most common reason answers disagree with the problem statement.`,
      `Because the page is free and browser-based, you can revisit it during study sessions without installing software. Pair it with careful unit conversion and dimensional analysis: velocity should always carry the same length-per-time dimension as your inputs. If time is zero or missing, the calculator surfaces an error instead of producing a meaningless value.`,
    ];
  }
  const inputLabels = calculator.inputs.map((input) => input.label.toLowerCase());
  const useCases = categoryUseCases[calculator.category] ?? [];
  const calculatorTerm = `${calculator.name.toLowerCase()} online`;

  const paragraph1 = `${calculator.name} is a practical ${calculatorTerm} tool that helps you apply the formula "${calculator.formula}" without doing repetitive manual math. Instead of handling multiple arithmetic steps by hand, you can enter your values once and get a result instantly. This is useful when you need quick decisions, consistent outputs, and fewer input mistakes. Because the calculator runs directly in the browser, it is fast to use on desktop or mobile and works well for both one-time checks and repeated calculations.`;

  const paragraph2 = `This calculator is most useful when you want reliable results for ${toSentenceList(
    useCases
  )}. Typical inputs include ${toSentenceList(inputLabels)}, and each value directly affects the final output. When users search for a ${calculatorTerm}, they usually need a simple workflow that is easy to understand: enter values, calculate, and compare scenarios. That is exactly what this page is designed to support, while keeping the formula visible so the result stays transparent and trustworthy.`;

  const paragraph3 = `In real-world use, many people run the same formula several times with different values to compare outcomes before taking action. For example, you can test conservative and aggressive assumptions, review best-case and worst-case numbers, and pick the most realistic target. This makes the ${calculator.name.toLowerCase()} useful for planning, learning, and validation. If any value is missing or invalid, the calculator safely returns an error state so you can correct inputs and recalculate with confidence.`;

  return [paragraph1, paragraph2, paragraph3];
}

function buildHowToUseSteps(calculator: Calculator): string[] {
  if (calculator.slug === 'scientific-calculator') {
    return [
      'Select DEG or RAD for trigonometry (and matching inverse-trig output).',
      'Enter an expression using the buttons or your keyboard; use parentheses where needed.',
      'Press = or Enter to evaluate. Open the clock icon for the last five runs; use MC / MR / M+ / M− for memory.',
    ];
  }
  const labels = calculator.inputs.map((input) =>
    input.type === 'select'
      ? `${input.label} (${input.options?.map((o) => o.label).join(' / ') ?? ''})`
      : input.label
  );
  return [
    `Enter or choose ${toSentenceList(labels)} as indicated.`,
    'Use the units shown under each field (for example kg, m, cm, years).',
    `Click Calculate to run the ${calculator.formula} formula.`,
    'Read the result and compare with alternate values if you want scenario-based planning.',
  ];
}

function buildExampleValues(calculator: Calculator): FormValues {
  if (calculator.slug === 'visceral-fat-calculator') {
    return {
      gender: 'woman',
      age: 25,
      weightKg: 70,
      heightM: 1.75,
      waistCm: 85,
      thighCm: 55,
    };
  }
  if (calculator.slug === 'bmi-calculator') {
    return { weight: 70, height: 1.75 };
  }
  if (calculator.slug === 'bmr-calculator') {
    return { gender: 'woman', age: 32, heightCm: 165, weight: 62 };
  }
  if (calculator.slug === 'calorie-calculator') {
    return { gender: 'man', age: 35, heightCm: 178, weight: 82, activity: 'moderate' };
  }
  if (calculator.slug === 'body-fat-calculator') {
    return { gender: 'woman', age: 28, heightCm: 168, weight: 65 };
  }
  if (calculator.slug === 'velocity-calculator') {
    return { displacement: 100, time: 5 };
  }
  return Object.fromEntries(
    calculator.inputs.map((input, index) => {
      if (input.type === 'select') {
        return [input.name, input.options?.[0]?.value ?? ''];
      }
      return [input.name, (index + 2) * 10];
    })
  ) as FormValues;
}

/** Stable DOM id per field — avoids collisions with generic ids like `height` / `age` (browser globals / page noise). */
function calculatorFieldId(calculatorSlug: string, inputName: string) {
  return `calc-field-${calculatorSlug}-${inputName}`;
}

export default function CalculatorTemplate({ calculator, embed = false }: Props) {
  const [values, setValues] = useState<FormValues>({});
  const [result, setResult] = useState<CalculationResult>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const relatedCalculators = useMemo(
    () => getRelatedCalculatorsSameCategory(calculator, 5),
    [calculator]
  );

  const popularCalculators = useMemo(
    () => getPopularCalculators().filter((item) => item.slug !== calculator.slug).slice(0, 5),
    [calculator.slug]
  );
  const categoryHubLink = useMemo(() => `/${calculator.category}-calculators`, [calculator.category]);
  const subcategoryHub = useMemo(() => {
    if (calculator.category !== 'finance' || !calculator.subcategory) return null;
    return financeSubcategoryPaths[calculator.subcategory] ?? null;
  }, [calculator.category, calculator.subcategory]);
  const relatedBlogs = useMemo(
    () => getLearnMoreBlogsForCalculator(calculator.slug, 5),
    [calculator.slug]
  );
  const breadcrumbs = useMemo(() => {
    const categoryCrumb = categoryPaths[calculator.category];
    const items: Array<{ name: string; href: string }> = [
      { name: 'Home', href: '/' },
      { name: categoryCrumb.label, href: categoryCrumb.href },
    ];
    if (calculator.category === 'finance' && calculator.subcategory) {
      const subcategoryCrumb = financeSubcategoryPaths[calculator.subcategory];
      if (subcategoryCrumb) {
        items.push({ name: subcategoryCrumb.label.replace('Explore more ', '').replace(/^./, (c) => c.toUpperCase()), href: subcategoryCrumb.href });
      }
    }
    items.push({ name: calculator.name, href: `/${calculator.slug}` });
    return items;
  }, [calculator.category, calculator.subcategory, calculator.name, calculator.slug]);
  const breadcrumbSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteConfig.url}${item.href}`,
      })),
    }),
    [breadcrumbs]
  );

  const onInputChange = (name: string, rawValue: string, kind: 'number' | 'select' = 'number') => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setShowValidationSummary(false);

    if (kind === 'select') {
      setValues((prev) => ({ ...prev, [name]: rawValue }));
      return;
    }
    if (rawValue.trim() === '') {
      setValues((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
      return;
    }
    const parsed = Number(rawValue);
    setValues((prev) => ({
      ...prev,
      [name]: Number.isFinite(parsed) ? parsed : NaN,
    }));
  };

  const onCalculate = () => {
    setAttemptedSubmit(true);
    const validation = validateCalculatorForm(calculator, values, calculatorFieldId);
    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setShowValidationSummary(true);
      setHasCalculated(false);
      setResult(null);
      return;
    }
    setFieldErrors({});
    setShowValidationSummary(false);
    setHasCalculated(true);
    const nextResult = calculate(calculator.slug, validation.payload);
    setResult(nextResult);
  };

  const seoExplanation = useMemo(() => explanationParagraphs(calculator), [calculator]);
  const howToUseSteps = useMemo(() => buildHowToUseSteps(calculator), [calculator]);
  const example = useMemo(() => {
    if (calculator.slug === 'scientific-calculator') {
      return {
        sampleValues: {} as FormValues,
        sampleResult:
          'In DEG mode: sin(90)+4 → 5. Use Ans after a result, or the history icon to recall recent expressions.',
      };
    }
    const sampleValues = buildExampleValues(calculator);
    const sampleResult = calculate(calculator.slug, sampleValues);
    return { sampleValues, sampleResult };
  }, [calculator]);
  const faqItems = useMemo(() => {
    if (calculator.slug === 'scientific-calculator') {
      return SCIENTIFIC_CALCULATOR_FAQ.map((item) => ({ q: item.q, a: item.a }));
    }
    if (calculator.slug === 'graph-calculator') {
      return GRAPH_CALCULATOR_FAQ.map((item) => ({ q: item.q, a: item.a }));
    }
    if (calculator.slug === 'visceral-fat-calculator') {
      return VISCERAL_FAT_CALCULATOR_FAQ.map((item) => ({ q: item.q, a: item.a }));
    }
    if (calculator.slug === 'velocity-calculator') {
      return VELOCITY_CALCULATOR_FAQ.map((item) => ({ q: item.q, a: item.a }));
    }
    return [
      {
        q: `What is a ${calculator.name.toLowerCase()}?`,
        a: `${calculator.name} helps you apply the formula "${calculator.formula}" quickly using your own values.`,
      },
      {
        q: `When should I use this ${calculator.name.toLowerCase()}?`,
        a: `Use it when you need quick and repeatable ${calculator.category} calculations without manual errors.`,
      },
      {
        q: 'How accurate are the results?',
        a: 'Results are formula-based and depend on entering correct values with the right units.',
      },
      {
        q: 'Why am I seeing an invalid input message?',
        a: 'One or more required values are missing, non-numeric, or caused a divide-by-zero condition.',
      },
      {
        q: 'Is this calculator free to use?',
        a: 'Yes. You can use this calculator online for free.',
      },
    ];
  }, [calculator]);

  const faqPageJsonLd = useMemo(() => {
    if (calculator.slug === 'scientific-calculator') return buildScientificFaqJsonLd();
    if (calculator.slug === 'graph-calculator') return buildGraphFaqJsonLd();
    if (calculator.slug === 'velocity-calculator') return buildVelocityFaqJsonLd();
    return buildCalculatorFaqPageJsonLd(faqItems);
  }, [calculator.slug, faqItems]);

  return (
    <div className={cn('wrapper', embed ? 'py-4 md:py-6' : 'py-8 md:py-12')}>
      <div className="max-w-5xl mx-auto space-y-6">
        {!embed ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        ) : null}
        {!embed && faqPageJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
          />
        ) : null}
        {!embed ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="inline-flex items-center gap-2">
                    {index > 0 ? <span>/</span> : null}
                    {isLast ? (
                      <span className="text-gray-700 dark:text-gray-200">{crumb.name}</span>
                    ) : (
                      <Link href={crumb.href} className="hover:text-primary-500 transition">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        <header>
          {embed ? (
            <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90 md:text-2xl">
              {calculator.name}
            </h2>
          ) : (
            <>
              <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
                {getCalculatorSeoTitle(calculator)}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 leading-6">{calculator.description}</p>
            </>
          )}
        </header>

        {!embed && calculator.slug === 'scientific-calculator' ? (
          <ScientificCalculatorIntro />
        ) : !embed && calculator.slug === 'graph-calculator' ? (
          <GraphCalculatorIntro />
        ) : !embed && calculator.slug === 'velocity-calculator' ? (
          <VelocityCalculatorIntro />
        ) : null}

        <section className={cardClass}>
          {calculator.slug === 'scientific-calculator' ? (
            <>
              <ScientificCalculator />
              <div className="mt-6">
                <Link
                  href={embed ? `/${calculator.slug}` : '/all-calculators'}
                  className="inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
                >
                  {embed ? 'Open full calculator page' : 'Try another calculator'}
                </Link>
              </div>
            </>
          ) : calculator.slug === 'graph-calculator' ? (
            <>
              <GraphCalculator />
              <div className="mt-6">
                <Link
                  href={embed ? `/${calculator.slug}` : '/all-calculators'}
                  className="inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
                >
                  {embed ? 'Open full calculator page' : 'Try another calculator'}
                </Link>
              </div>
            </>
          ) : calculator.slug === 'student-loan-calculator' ? (
            <>
              <StudentLoanCalculatorPro />
              <div className="mt-6">
                <Link
                  href={embed ? `/${calculator.slug}` : '/all-calculators'}
                  className="inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
                >
                  {embed ? 'Open full calculator page' : 'Try another calculator'}
                </Link>
              </div>
            </>
          ) : calculator.slug === 'force-calculator' ? (
            <>
              <ForceCalculatorPro />
              <div className="mt-6">
                <Link
                  href={embed ? `/${calculator.slug}` : '/all-calculators'}
                  className="inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
                >
                  {embed ? 'Open full calculator page' : 'Try another calculator'}
                </Link>
              </div>
            </>
          ) : calculator.slug === 'logarithm-calculator' ? (
            <>
              <LogarithmCalculatorPro />
              <div className="mt-6">
                <Link
                  href={embed ? `/${calculator.slug}` : '/all-calculators'}
                  className="inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
                >
                  {embed ? 'Open full calculator page' : 'Try another calculator'}
                </Link>
              </div>
            </>
          ) : (
            <>
              {showValidationSummary && Object.keys(fieldErrors).length > 0 ? (
                <p
                  className="mb-4 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300 transition-colors duration-150"
                  role="alert"
                >
                  Please fix the highlighted fields
                </p>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {calculator.inputs.map((input) => {
                  const fieldId = calculatorFieldId(calculator.slug, input.name);
                  const fieldError = fieldErrors[input.name];
                  return (
                    <div key={input.name}>
                      <label
                        htmlFor={fieldId}
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {input.label}
                      </label>
                      {input.hint ? (
                        <p className="mb-1.5 text-xs text-gray-500 dark:text-gray-400">{input.hint}</p>
                      ) : null}
                      {input.type === 'select' && input.options?.length ? (
                        <>
                          <select
                            id={fieldId}
                            name={input.name}
                            className={cn(
                              'h-12 w-full rounded-full border bg-white dark:bg-slate-800 px-5 py-2.5 text-left text-sm text-gray-800 dark:text-slate-100 shadow-theme-xs transition-colors duration-150 ease-out',
                              fieldError
                                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500'
                                : 'border-gray-300 dark:border-slate-600 focus:border-transparent focus:ring-2 focus:ring-indigo-500',
                              'focus:outline-0'
                            )}
                            defaultValue={input.options[0]?.value}
                            onChange={(event) => onInputChange(input.name, event.target.value, 'select')}
                            aria-invalid={fieldError ? true : undefined}
                          >
                            {input.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {fieldError ? (
                            <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{fieldError}</p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <Input
                            id={fieldId}
                            name={input.name}
                            autoComplete="off"
                            type="number"
                            inputMode="decimal"
                            step="any"
                            placeholder={getFieldPlaceholder(calculator, input)}
                            error={Boolean(fieldError)}
                            onChange={(event) => onInputChange(input.name, event.target.value, 'number')}
                            aria-invalid={fieldError ? true : undefined}
                          />
                          {fieldError ? (
                            <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{fieldError}</p>
                          ) : null}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onCalculate}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 active:scale-95 text-white transition-all duration-300 shadow-md"
                >
                  Calculate
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</p>
                {!hasCalculated ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    {attemptedSubmit && Object.keys(fieldErrors).length > 0
                      ? 'Fix the fields marked above, then click Calculate again.'
                      : 'Enter values and click calculate.'}
                  </p>
                ) : typeof result === 'string' ? (
                  <div className="space-y-1 text-red-600 dark:text-red-400">
                    <p className="font-medium">Could not calculate</p>
                    <p className="text-sm leading-relaxed">{result}</p>
                  </div>
                ) : result == null ? (
                  <p className="text-red-500">Invalid input. Please check values and try again.</p>
                ) : typeof result === 'object' ? (
                  <pre className="text-sm text-gray-800 dark:text-white/90 whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                ) : calculator.slug === 'visceral-fat-calculator' ? (
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
                      Proxy score: {result.toFixed(2)}
                    </p>
                    <VisceralFatResultInterpretation score={result} />
                    <VisceralFatRangeChart score={result} />
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    {result.toFixed(4)}
                  </p>
                )}
                {hasCalculated && (
                  <Link
                    href={embed ? `/${calculator.slug}` : '/all-calculators'}
                    className="mt-3 inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
                  >
                    {embed ? 'Open full calculator page' : 'Try another calculator'}
                  </Link>
                )}
              </div>
            </>
          )}
        </section>

        {!embed && calculator.slug === 'scientific-calculator' ? (
          <section className={cardClass}>
            <ScientificCalculatorArticle />
          </section>
        ) : !embed && calculator.slug === 'graph-calculator' ? (
          <section className={cardClass}>
            <GraphCalculatorArticle />
          </section>
        ) : !embed ? (
          <>
            <section className={cardClass}>
              <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">Formula</h2>
              <p className="text-gray-600 dark:text-gray-300">{calculator.formula}</p>
            </section>

            <section className={cardClass}>
              <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Explanation</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-7">
                {seoExplanation.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className={cardClass}>
              <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">How to Use</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                {howToUseSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section className={cardClass}>
              <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Example</h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p>
                  Sample inputs:{' '}
                  {calculator.inputs
                    .map((input) => {
                      const v = example.sampleValues[input.name];
                      const display = v === undefined ? '—' : String(v);
                      return `${input.label} = ${display}`;
                    })
                    .join(', ')}
                </p>
                <p>
                  Calculated result:{' '}
                  {example.sampleResult == null
                    ? 'Unable to generate sample output for this formula.'
                    : typeof example.sampleResult === 'string'
                      ? example.sampleResult
                      : typeof example.sampleResult === 'object'
                        ? JSON.stringify(example.sampleResult)
                        : calculator.slug === 'visceral-fat-calculator'
                          ? example.sampleResult.toFixed(2)
                          : example.sampleResult.toFixed(4)}
                </p>
                <p>
                  You can replace these values with your own numbers to calculate a real-world result
                  instantly.
                </p>
                {calculator.slug === 'visceral-fat-calculator' ? (
                  <p>
                    Second example (Man, age 42, 88 kg, 1.78 m height, waist 98 cm, thigh 54 cm): run the same
                    protocol with consistent tape placement—compare scores month to month rather than day to day.
                  </p>
                ) : null}
                {calculator.slug === 'velocity-calculator' ? (
                  <p>
                    Second example: displacement −30 m in 10 s yields −3 m/s average velocity toward the negative
                    direction—useful when checking sign conventions before a unit test.
                  </p>
                ) : null}
              </div>
            </section>

            {calculator.slug === 'visceral-fat-calculator' ? (
              <>
                <VisceralFatFeaturedSnippetSection />
                <VisceralFatRangeExplainerSection />
                <VisceralFatTipsSection />
                <VisceralFatDeepSeoSection />
                <VisceralFatRiskTableSection />
              </>
            ) : null}
            {calculator.slug === 'velocity-calculator' ? (
              <section className={cardClass}>
                <VelocityCalculatorArticle />
              </section>
            ) : null}
          </>
        ) : null}

        {!embed ? (
        <section className={cardClass}>
          <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">FAQ</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            {faqItems.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">{faq.q}</h3>
                <p className="mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
        ) : null}

        {!embed && relatedCalculators.length > 0 ? (
          <section className={cardClass}>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Related Calculators
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              More tools in the same category—ideal for homework, comparisons, and what-if scenarios.
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedCalculators.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {!embed && popularCalculators.length > 0 ? (
          <section className={cardClass}>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Popular Calculators
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              High-traffic tools across the site (excluding this page).
            </p>
            <div className="flex flex-wrap gap-2">
              {popularCalculators.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {!embed ? (
        <section className={cardClass}>
          <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
            Browse More Calculators
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={categoryHubLink}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse all {calculator.category} calculators
            </Link>
            {subcategoryHub ? (
              <Link
                href={subcategoryHub.href}
                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
              >
                {subcategoryHub.label}
              </Link>
            ) : null}
            <Link
              href="/finance-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Finance Calculators
            </Link>
            <Link
              href="/math-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Math Calculators
            </Link>
            <Link
              href="/physics-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Physics Calculators
            </Link>
            <Link
              href="/free-calculators"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
            >
              Browse Free Calculators
            </Link>
          </div>
        </section>
        ) : null}

        {!embed ? (
        <section className={cardClass}>
          <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Learn More</h2>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Read guides that link to this tool—or start from curated picks in the same topic area.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500/30"
              >
                <p className="font-medium text-gray-800 dark:text-white/90">{blog.title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{blog.description}</p>
              </Link>
            ))}
          </div>
        </section>
        ) : null}
      </div>
    </div>
  );
}
