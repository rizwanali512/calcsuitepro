/**
 * Replaced fictional testimonials (Big Kahuna Burger Ltd, Abstergo Ltd,
 * Biffco, Barone, Binford, Acme Co — all movie/game references) with three
 * real, factual use-case cards. Fake testimonials damage E-E-A-T because
 * Google's reviewers and most readers recognise these brand names.
 */

type UseCase = {
  audience: string;
  blurb: string;
  icon: string;
  examples: string[];
  accent: string;
};

const USE_CASES: UseCase[] = [
  {
    audience: 'Students',
    blurb:
      'Verify physics, math, and statistics homework with the formula visible alongside every result.',
    icon: '🎓',
    examples: ['Velocity & acceleration', 'Quadratic equations', 'Probability & statistics'],
    accent: 'from-indigo-500/15 to-purple-500/10',
  },
  {
    audience: 'Professionals',
    blurb:
      'Sanity-check finance scenarios in seconds—EMI offers, mortgage refinances, ROI projections.',
    icon: '💼',
    examples: ['EMI & loan comparison', 'Mortgage payoff', 'Investment ROI'],
    accent: 'from-emerald-500/15 to-teal-500/10',
  },
  {
    audience: 'Educators',
    blurb:
      'Demonstrate formulas live in class with calculators that show the equation behind each answer.',
    icon: '📚',
    examples: ['Compound interest', 'Trigonometry', 'Body mass index'],
    accent: 'from-orange-500/15 to-pink-500/10',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="md:py-28 py-14 relative">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p className="mb-3 inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-800 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-200">
            Who uses CalcSuite Pro
          </p>
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Built for everyday calculation work
          </h2>
          <p className="max-w-xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Free, no sign-up, formulas always shown. From classroom homework to refinance decisions,
            our calculator suite covers the work people actually need to do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.audience}
              className="relative flex flex-col rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm transition hover:border-primary-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-primary-500/30"
            >
              <div
                className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${useCase.accent} opacity-60`}
                aria-hidden
              />
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-2xl shadow-sm dark:bg-white/10">
                <span aria-hidden>{useCase.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {useCase.audience}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {useCase.blurb}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {useCase.examples.map((example) => (
                  <li
                    key={example}
                    className="inline-flex items-center rounded-full border border-gray-200/80 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
