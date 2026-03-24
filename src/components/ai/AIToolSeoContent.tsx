import Link from 'next/link';
import { aiTools } from '@/lib/ai-tools';

type Props = {
  toolSlug: string;
  toolName: string;
  toolDescription: string;
};

function buildLongIntro(toolName: string, toolDescription: string) {
  return (
    `${toolName} is an AI-powered online developer tool on CalcSuite Pro. It is designed to ${toolDescription.toLowerCase()} ` +
    `while keeping you in control of quality and security. AI-assisted utilities are best used as accelerators: they produce a strong first draft that you review, test against real inputs, and align with your team’s conventions before anything reaches production. ` +
    `This page explains how the tool fits into typical engineering workflows, which adjacent classic utilities pair well with it, and how to get consistent results without unnecessary rework. ` +
    `Whether you are documenting an API, drafting SQL, or generating structured text, combining AI output with deterministic tools—like a JSON formatter, regex tester, or Base64 encoder—helps you catch mistakes early and ship with confidence. ` +
    `Bookmark this page as the capability grows; the sections below include practical steps, feature highlights, and FAQs written for search-friendly discovery.`
  );
}

function buildSteps(toolSlug: string) {
  const common = [
    `Describe the outcome you want in plain language (requirements, constraints, examples).`,
    `Generate a first draft with ${toolSlug.includes('generator') ? 'the generator' : 'this AI tool'}.`,
    `Review output for correctness, edge cases, and security-sensitive fields.`,
    `Refine the prompt and rerun until the result matches your standards.`,
    `Optionally pass structured data through classic CalcSuite Pro utilities for validation and formatting.`,
  ];
  switch (toolSlug) {
    case 'code-generator':
      return [
        'Specify language, framework, and the behavior you need (inputs/outputs).',
        'Generate a draft function or component and read it for correctness.',
        'Add tests and run your usual linter/formatter.',
        'Iterate on naming, error handling, and edge cases.',
      ];
    case 'sql-generator':
      return [
        'Describe tables, filters, and the shape of the result set.',
        'Generate SQL and verify it against your schema.',
        'Run explain plans in your database tooling when possible.',
        'Adjust for dialect-specific syntax and performance.',
      ];
    default:
      return common;
  }
}

function buildFeatures(toolName: string) {
  return [
    `Purpose-built prompts and UI for ${toolName}`,
    'Fits alongside classic CalcSuite Pro formatters, encoders, and parsers',
    'Designed for fast iteration while you stay in the editor flow',
    'Encourages pairing AI drafts with deterministic validation tools',
  ];
}

function buildFaqs(toolName: string) {
  return [
    {
      q: `Is ${toolName} free to try on CalcSuite Pro?`,
      a: 'Yes. CalcSuite Pro lists AI tools alongside free browser-based developer utilities. Follow your organization’s policy for API keys and data handling.',
    },
    {
      q: 'Should I trust AI output without review?',
      a: 'No. Treat AI output as a draft. Review logic, security, and correctness—especially for auth, SQL, and PII.',
    },
    {
      q: 'What classic tools pair well with AI output?',
      a: 'Use the JSON Formatter and JSON Validator for structured data, Regex Tester for validation rules, and Base64 or JWT tools when inspecting encoded payloads.',
    },
    {
      q: 'How do I improve results?',
      a: 'Add examples, constraints, and desired output format. Smaller, clearer prompts usually outperform vague ones.',
    },
    {
      q: 'Where can I browse more utilities?',
      a: 'Explore calculator categories and the full calculators directory from the site navigation.',
    },
  ];
}

export function AIToolSeoContent({ toolSlug, toolName, toolDescription }: Props) {
  const intro = buildLongIntro(toolName, toolDescription);
  const steps = buildSteps(toolSlug);
  const features = buildFeatures(toolName);
  const faqs = buildFaqs(toolName);
  const related = aiTools.filter((t) => t.slug !== toolSlug).slice(0, 6);

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      <h2 className="mt-10 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        About this AI tool
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{intro}</p>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        How to use
      </h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Features
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Common use cases
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
        <li>Turn rough notes into structured drafts you can refine in your IDE</li>
        <li>Generate examples for documentation, tests, or onboarding materials</li>
        <li>Accelerate repetitive writing while keeping a human review step</li>
      </ul>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Pair with classic tools
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        After AI generates structured content, validate and format it with{' '}
        <Link
          href="/percentage-calculator"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          Percentage Calculator
        </Link>
        , test patterns with the{' '}
        <Link
          href="/scientific-calculator"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          Scientific Calculator
        </Link>
        , encode data with the{' '}
        <Link
          href="/fraction-calculator"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          Fraction Calculator
        </Link>
        , and inspect tokens using the{' '}
        <Link
          href="/probability-calculator"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          Probability Calculator
        </Link>
        .
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        FAQ
      </h2>
      <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
        {faqs.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold text-gray-800 dark:text-white/90">{f.q}</h3>
            <p className="mt-1">{f.a}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
        Site navigation
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Browse all AI utilities on{' '}
        <Link
          href="/all-calculators"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          All Calculators
        </Link>
        , explore classic utilities on{' '}
        <Link href="/tools" className="text-primary-500 hover:text-primary-600 underline font-medium">
          Tools
        </Link>{' '}
        and{' '}
        <Link
          href="/all-tools"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          All Tools
        </Link>
        , or open{' '}
        <Link
          href="/categories"
          className="text-primary-500 hover:text-primary-600 underline font-medium"
        >
          Categories
        </Link>{' '}
        for hub pages.
      </p>

      {related.length > 0 ? (
        <>
          <h2 className="mt-8 mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
            More AI tools
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/ai/${t.slug}`}
                  className="text-primary-500 hover:text-primary-600 underline font-medium"
                >
                  {t.name}
                </Link>
                {t.description ? ` — ${t.description}` : ''}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
