'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/inputs';
import { calculate, type CalculationResult } from '@/lib/calculatorEngine';
import { blogs } from '@/lib/blogs';
import {
  Calculator,
  calculators,
  getCalculatorsByCategory,
  getPopularCalculators,
} from '@/lib/calculators';
import { siteConfig } from '@/lib/seo';

type Props = {
  calculator: Calculator;
};

type FormValues = Record<string, number>;

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
  const labels = calculator.inputs.map((input) => input.label);
  return [
    `Enter ${toSentenceList(labels)} in the input fields.`,
    'Review that all values are numeric and use the correct units shown in each label.',
    `Click Calculate to run the ${calculator.formula} formula.`,
    'Read the result and compare with alternate values if you want scenario-based planning.',
  ];
}

function buildExampleValues(calculator: Calculator): FormValues {
  return Object.fromEntries(
    calculator.inputs.map((input, index) => [input.name, (index + 2) * 10])
  );
}

export default function CalculatorTemplate({ calculator }: Props) {
  const [values, setValues] = useState<FormValues>({});
  const [result, setResult] = useState<CalculationResult>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const relatedCalculators = useMemo(
    () => {
      const sameSubcategory = calculators.filter(
        (item) =>
          item.slug !== calculator.slug &&
          item.category === calculator.category &&
          calculator.subcategory != null &&
          item.subcategory === calculator.subcategory
      );

      const fallbackSameCategory = getCalculatorsByCategory(calculator.category).filter(
        (item) =>
          item.slug !== calculator.slug &&
          !sameSubcategory.some((subItem) => subItem.slug === item.slug)
      );

      return [...sameSubcategory, ...fallbackSameCategory].slice(0, 5);
    },
    [calculator.category, calculator.slug, calculator.subcategory]
  );

  const popularCalculators = useMemo(
    () => getPopularCalculators().filter((item) => item.slug !== calculator.slug).slice(0, 3),
    [calculator.slug]
  );
  const categoryHubLink = useMemo(() => `/${calculator.category}-calculators`, [calculator.category]);
  const subcategoryHub = useMemo(() => {
    if (calculator.category !== 'finance' || !calculator.subcategory) return null;
    return financeSubcategoryPaths[calculator.subcategory] ?? null;
  }, [calculator.category, calculator.subcategory]);
  const relatedBlogs = useMemo(() => {
    const slugPath = `(/${calculator.slug})`;
    return blogs
      .filter((blog) => blog.content.includes(slugPath))
      .slice(0, 3)
      .map((blog) => ({
        slug: blog.slug,
        title: blog.title,
        description: blog.description,
      }));
  }, [calculator.slug]);
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

  const onInputChange = (name: string, rawValue: string) => {
    const parsed = Number(rawValue);
    setValues((prev) => ({
      ...prev,
      [name]: Number.isFinite(parsed) ? parsed : NaN,
    }));
  };

  const onCalculate = () => {
    const nextResult = calculate(calculator.slug, values);
    setResult(nextResult);
    setHasCalculated(true);
  };

  const seoExplanation = useMemo(() => explanationParagraphs(calculator), [calculator]);
  const howToUseSteps = useMemo(() => buildHowToUseSteps(calculator), [calculator]);
  const example = useMemo(() => {
    const sampleValues = buildExampleValues(calculator);
    const sampleResult = calculate(calculator.slug, sampleValues);
    return { sampleValues, sampleResult };
  }, [calculator]);
  const faqItems = useMemo(
    () => [
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
    ],
    [calculator]
  );

  return (
    <div className="wrapper py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
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
        <header>
          <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            {calculator.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-6">
            {calculator.description}
          </p>
        </header>

        <section className={cardClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calculator.inputs.map((input) => (
              <div key={input.name}>
                <label
                  htmlFor={input.name}
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {input.label}
                </label>
                <Input
                  id={input.name}
                  type={input.type}
                  placeholder={`Enter ${input.label.toLowerCase()}`}
                  onChange={(event) => onInputChange(input.name, event.target.value)}
                />
              </div>
            ))}
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
              <p className="text-gray-700 dark:text-gray-300">Enter values and click calculate.</p>
            ) : result == null ? (
              <p className="text-red-500">Invalid input. Please check values and try again.</p>
            ) : typeof result === 'object' ? (
              <pre className="text-sm text-gray-800 dark:text-white/90 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {result.toFixed(4)}
              </p>
            )}
            {hasCalculated && (
              <Link
                href="/all-calculators"
                className="mt-3 inline-flex text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline transition"
              >
                Try another calculator
              </Link>
            )}
          </div>
        </section>

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
                .map((input) => `${input.label} = ${example.sampleValues[input.name]}`)
                .join(', ')}
            </p>
            <p>
              Calculated result:{' '}
              {example.sampleResult == null
                ? 'Unable to generate sample output for this formula.'
                : typeof example.sampleResult === 'object'
                  ? JSON.stringify(example.sampleResult)
                  : example.sampleResult.toFixed(4)}
            </p>
            <p>
              You can replace these values with your own numbers to calculate a real-world result
              instantly.
            </p>
          </div>
        </section>

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

        {relatedCalculators.length > 0 && (
          <section className={cardClass}>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Related Calculators
            </h2>
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
        )}

        {popularCalculators.length > 0 && (
          <section className={cardClass}>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
              Popular Calculators
            </h2>
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
        )}

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

        {relatedBlogs.length > 0 && (
          <section className={cardClass}>
            <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Learn More</h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Read practical guides related to this calculator.
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
        )}
      </div>
    </div>
  );
}
