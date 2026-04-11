import Link from 'next/link';
import {
  interpretVisceralFatProxy,
  VISCERAL_PROXY_CHART_MAX,
  VISCERAL_PROXY_CHART_MIN,
  type VisceralProxyLevel,
} from '@/lib/visceralFatProxy';

const cardClass =
  'glass-card p-6 sm:p-8 rounded-2xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300';

const levelStyles: Record<VisceralProxyLevel, { badge: string }> = {
  low: {
    badge:
      'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 border border-emerald-200/80 dark:border-emerald-800/60',
  },
  normal: {
    badge:
      'bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100 border border-amber-200/80 dark:border-amber-800/60',
  },
  high: {
    badge:
      'bg-rose-100 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100 border border-rose-200/80 dark:border-rose-800/60',
  },
};

export function VisceralFatResultInterpretation({ score }: { score: number }) {
  const { level, headline, summary } = interpretVisceralFatProxy(score);
  const styles = levelStyles[level];

  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-3 ${styles.badge}`}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
        Result interpretation
      </p>
      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
        {headline} proxy range
      </p>
      <p className="mt-2 text-sm leading-relaxed opacity-95">{summary}</p>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        Educational only—not a diagnosis. Bands apply to this calculator&apos;s formula, not MRI or
        DXA visceral fat.
      </p>
    </div>
  );
}

/** Horizontal band chart: Low / Normal / High zones with marker for current proxy score. */
export function VisceralFatRangeChart({ score }: { score: number }) {
  const min = VISCERAL_PROXY_CHART_MIN;
  const max = VISCERAL_PROXY_CHART_MAX;
  const clamped = Math.min(max, Math.max(min, score));
  const pct = ((clamped - min) / (max - min)) * 100;

  const lowEnd = ((73 - min) / (max - min)) * 100;
  const normalEnd = ((98 - min) / (max - min)) * 100;

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Where your score sits on this proxy scale
      </p>
      <div className="relative flex h-14 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
        <div
          className="flex h-full items-center justify-center bg-emerald-500/85 px-1 text-[10px] font-medium text-white/95 sm:text-xs dark:bg-emerald-600/80"
          style={{ width: `${lowEnd}%` }}
        >
          Low
        </div>
        <div
          className="flex h-full items-center justify-center bg-amber-500/85 px-1 text-[10px] font-medium text-white/95 sm:text-xs dark:bg-amber-600/80"
          style={{ width: `${normalEnd - lowEnd}%` }}
        >
          Normal
        </div>
        <div
          className="flex h-full items-center justify-center bg-rose-500/85 px-1 text-[10px] font-medium text-white/95 sm:text-xs dark:bg-rose-600/80"
          style={{ width: `${100 - normalEnd}%` }}
        >
          High
        </div>
      </div>
      <div
        className="relative h-6 -mt-1"
        style={{ marginLeft: '0%', width: '100%' }}
        aria-hidden
      >
        <div
          className="absolute top-0 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-white -translate-x-1/2"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>{min}</span>
        <span className="tabular-nums">Your score: {score.toFixed(2)}</span>
        <span>{max}</span>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        Chart axis ({min}–{max}) is a visual guide for this site&apos;s proxy formula. Cutoffs (~73
        / ~98) are heuristics to separate lower, middle, and higher bands—not clinical thresholds.
      </p>
    </div>
  );
}

/** Concise Q&amp;A + steps + table shapes for featured-snippet style SERP blocks. */
export function VisceralFatFeaturedSnippetSection() {
  return (
    <section className={cardClass} itemScope itemType="https://schema.org/DefinedTerm">
      <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">What is visceral fat?</h2>
      <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base" itemProp="description">
        <strong itemProp="name">Visceral fat</strong> is fat stored deep in the abdomen around organs (visceral
        adipose tissue), unlike pinchable fat under the skin. It is linked to metabolic health in population research,
        but only imaging or clinical tests measure it directly—this page uses a <strong>proxy score</strong> from your
        measurements, not an MRI reading.
      </p>

      <h2 className="mb-2 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">
        How to calculate the visceral fat proxy on this page
      </h2>
      <ol className="list-decimal space-y-2 pl-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <li>Select <strong className="text-gray-800 dark:text-white/90">sex</strong> (Man or Woman).</li>
        <li>
          Enter <strong className="text-gray-800 dark:text-white/90">age</strong>,{' '}
          <strong className="text-gray-800 dark:text-white/90">weight</strong> (kg),{' '}
          <strong className="text-gray-800 dark:text-white/90">height</strong> (meters, or cm 100–250 converted),{' '}
          <strong className="text-gray-800 dark:text-white/90">waist</strong> (cm), and{' '}
          <strong className="text-gray-800 dark:text-white/90">thigh</strong> (cm) using the same tape protocol each
          time.
        </li>
        <li>
          Click <strong className="text-gray-800 dark:text-white/90">Calculate</strong>. The tool applies this
          site&apos;s formula: (waist ÷ height) + (weight ÷ height) − (thigh ÷ 10).
        </li>
        <li>
          Read your <strong className="text-gray-800 dark:text-white/90">proxy score</strong> and the{' '}
          <strong className="text-gray-800 dark:text-white/90">Low / Normal / High</strong> band—educational only, not
          a diagnosis.
        </li>
      </ol>

      <h2 className="mb-3 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">
        Example values and proxy result
      </h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">Sample inputs and example visceral fat proxy output</caption>
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Sex</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Age</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Weight (kg)</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Height (m)</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Waist (cm)</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Thigh (cm)</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Proxy score (example)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            <tr>
              <td className="px-4 py-3">Woman</td>
              <td className="px-4 py-3 font-mono tabular-nums">25</td>
              <td className="px-4 py-3 font-mono tabular-nums">70</td>
              <td className="px-4 py-3 font-mono tabular-nums">1.75</td>
              <td className="px-4 py-3 font-mono tabular-nums">85</td>
              <td className="px-4 py-3 font-mono tabular-nums">55</td>
              <td className="px-4 py-3 font-mono tabular-nums">~83.1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        Example row uses the same defaults as the on-page sample; your result depends on your inputs. Educational use
        only.
      </p>
    </section>
  );
}

export function VisceralFatTipsSection() {
  return (
    <section className={cardClass}>
      <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
        Tips: how to reduce visceral fat over time
      </h2>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        Sustainable habits beat crash plans. These evidence-aligned steps support waist trends and
        metabolic health for many people—always personalize with your clinician if you have
        conditions or medications.
      </p>
      <ul className="list-disc space-y-3 pl-5 text-gray-600 dark:text-gray-300 leading-relaxed">
        <li>
          <strong className="text-gray-800 dark:text-white/90">Protein + fiber:</strong> anchor meals
          with lean protein and vegetables or legumes to improve satiety without constant restriction.
        </li>
        <li>
          <strong className="text-gray-800 dark:text-white/90">Strength training:</strong> two to
          three full-body sessions weekly help preserve muscle while waist proxies improve.
        </li>
        <li>
          <strong className="text-gray-800 dark:text-white/90">Daily movement:</strong> brisk
          walks—especially after meals—can support glucose handling for some individuals.
        </li>
        <li>
          <strong className="text-gray-800 dark:text-white/90">Sleep 7–9h:</strong> regular sleep
          windows reduce hunger-hormone swings that derail adherence.
        </li>
        <li>
          <strong className="text-gray-800 dark:text-white/90">Alcohol moderation:</strong> fewer
          weekly drinks often aligns with lower waist trends and better sleep.
        </li>
        <li>
          <strong className="text-gray-800 dark:text-white/90">Measure the same way:</strong> same
          tape height, time of day, and clothing weekly—not daily noise.
        </li>
      </ul>
      <p className="mt-5 text-sm">
        <Link
          href="/blog/how-to-reduce-visceral-fat"
          className="font-medium text-primary-500 hover:text-primary-600 hover:underline"
        >
          Read the full guide: how to reduce visceral fat →
        </Link>
      </p>
    </section>
  );
}

/** Long-form SEO: keyword variations (level, meaning, normal range) + education disclaimers. */
export function VisceralFatDeepSeoSection() {
  return (
    <section className={cardClass}>
      <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
        Visceral fat meaning, level, and “normal range” in plain language
      </h2>
      <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-7">
        <p>
          <strong className="text-gray-800 dark:text-white/90">Visceral fat meaning:</strong> in medicine and
          physiology, visceral adipose tissue sits deep around organs in the abdomen. It is not the same as pinchable
          subcutaneous fat. Imaging can measure it; home tools usually infer risk from waist, weight, and related
          measures. This page’s <strong className="text-gray-800 dark:text-white/90">visceral fat calculator</strong>{' '}
          outputs one <strong className="text-gray-800 dark:text-white/90">proxy score</strong> from your tape
          measurements—not a direct organ-fat mass.
        </p>
        <p>
          <strong className="text-gray-800 dark:text-white/90">Visceral fat level</strong> on consumer devices is
          often a bucket or index (for example “level” on a scale). Here, “level” maps to{' '}
          <strong className="text-gray-800 dark:text-white/90">Low / Normal / High</strong> bands on{' '}
          <em>this formula only</em>, so you can discuss trends the same way you might discuss a{' '}
          <strong className="text-gray-800 dark:text-white/90">visceral fat score</strong> from another app—as long as
          you do not confuse it with MRI-derived volume.
        </p>
        <p>
          <strong className="text-gray-800 dark:text-white/90">Visceral fat normal range</strong> is not universal:
          guidelines use waist circumference, metabolic risk factors, and sometimes imaging in research. For this
          calculator, “normal range” means the middle proxy band (~73–98 on our scale) where many adults land when using
          the same inputs—<strong className="text-gray-800 dark:text-white/90">not</strong> a clinical cutoff. If you
          need medical thresholds, use clinician advice and appropriate tests.
        </p>
        <p>
          People also search <strong className="text-gray-800 dark:text-white/90">how to measure visceral fat at
          home</strong>: the honest answer is you measure reliable proxies (waist, weight, progress photos, strength)
          consistently. This tool standardizes a numeric proxy from waist, thigh, height, weight, age, and sex so you
          can compare <em>your</em> weeks on equal footing—then discuss changes with a professional if risk factors
          apply.
        </p>
      </div>
    </section>
  );
}

/** Proxy band vs educational risk framing (not clinical staging). */
export function VisceralFatRiskTableSection() {
  return (
    <section className={cardClass}>
      <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
        Proxy band vs what it suggests (educational)
      </h2>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        This table summarizes the <strong className="text-gray-700 dark:text-gray-300">on-page bands</strong> for this
        site’s formula. It does <strong className="text-gray-700 dark:text-gray-300">not</strong> replace blood
        pressure, lipids, glucose, family history, or clinician judgment.
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Proxy band</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Score (approx.)</th>
              <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">How to read it</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            <tr>
              <td className="px-4 py-3 font-medium text-emerald-800 dark:text-emerald-200">Low</td>
              <td className="px-4 py-3 font-mono text-xs sm:text-sm">&lt; ~73</td>
              <td className="px-4 py-3">
                Lower on this proxy model—still track habits; &quot;low&quot; does not rule out metabolic risk for every
                person.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-amber-800 dark:text-amber-200">Normal (middle)</td>
              <td className="px-4 py-3 font-mono text-xs sm:text-sm">~73 – ~98</td>
              <td className="px-4 py-3">
                Typical spread for many adults on this formula; prioritize{' '}
                <strong className="text-gray-800 dark:text-white/90">direction of change</strong> over a single
                session.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-rose-800 dark:text-rose-200">High</td>
              <td className="px-4 py-3 font-mono text-xs sm:text-sm">&gt; ~98</td>
              <td className="px-4 py-3">
                Higher proxy band—worth repeating measurements, tightening technique, and discussing lifestyle or
                screening with a clinician if you carry cardiometabolic risk factors.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function VisceralFatRangeExplainerSection() {
  return (
    <section className={cardClass}>
      <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
        Understanding proxy ranges (chart)
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        This calculator outputs one number from your waist, thigh, height, and weight. Higher
        values usually mean a larger waist and weight relative to height in the model—not a direct
        MRI measurement of organ fat. The colored bands group scores into{' '}
        <strong>Low</strong>, <strong>Normal</strong>, and <strong>High</strong> for orientation
        only.
      </p>
      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
        <p>
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">Low (&lt; ~73):</span>{' '}
          Lower proxy band—still track over time; &quot;low&quot; is not a guarantee of metabolic
          health for every person.
        </p>
        <p>
          <span className="font-semibold text-amber-800 dark:text-amber-200">Normal (~73–98):</span>{' '}
          Middle band where many adults fall on this formula; focus on trend direction.
        </p>
        <p>
          <span className="font-semibold text-rose-800 dark:text-rose-200">High (&gt; ~98):</span>{' '}
          Higher band—worth discussing lifestyle and screening with a professional if you have risk
          factors.
        </p>
      </div>
      <p className="mt-4 text-sm">
        <Link
          href="/blog/normal-visceral-fat-range"
          className="font-medium text-primary-500 hover:text-primary-600 hover:underline"
        >
          More on normal ranges &amp; proxies →
        </Link>
      </p>
    </section>
  );
}

export const VISCERAL_FAT_CALCULATOR_FAQ = [
  {
    q: 'What does my visceral fat calculator score mean?',
    a: 'It is a single proxy number from your measurements using this site’s formula—not an MRI or DEXA reading. Use it to compare week-to-week with the same tape protocol; interpret Low / Normal / High as broad bands for engagement, not a diagnosis.',
  },
  {
    q: 'What is visceral fat meaning in simple terms?',
    a: 'Visceral fat is deep abdominal fat around organs, linked to metabolic risk in population studies. This calculator does not see inside your body; it estimates a proxy from circumferences and body size so you can track a consistent index at home.',
  },
  {
    q: 'What is a visceral fat level versus subcutaneous fat?',
    a: '“Level” here refers to our Low/Normal/High proxy bands, not a universal clinical stage. Subcutaneous fat sits under the skin; visceral fat lies deeper. Waist-heavy proxies correlate with central adiposity but cannot separate the two tissues without imaging.',
  },
  {
    q: 'What is visceral fat normal range on this calculator?',
    a: 'On this tool, the middle proxy band is roughly scores ~73–98—meaning “typical spread for many adults on this formula,” not a medical normal range. Real-world “normal” depends on imaging, guidelines, and your clinician’s context.',
  },
  {
    q: 'Is this calculator a medical diagnosis?',
    a: 'No. It is educational. Only qualified clinicians can diagnose conditions or order appropriate tests. If you have symptoms, abnormal labs, or a family history of heart disease or diabetes, seek professional advice.',
  },
  {
    q: 'How accurate is this compared to a body scan?',
    a: 'Imaging can quantify visceral fat directly; this tool cannot. Online proxies trade accuracy for convenience. Treat outputs as directional—helpful for habits and conversations, not replacements for clinical assessment.',
  },
  {
    q: 'How often should I measure?',
    a: 'Weekly or monthly is usually enough; daily waist measures bounce with fluid and digestion. Log how you measure (e.g., waist at navel, relaxed exhale) so changes reflect habit, not technique drift.',
  },
  {
    q: 'What should I do if my result is in the High band?',
    a: 'Stay calm—one number is not destiny. Re-check inputs, repeat in two weeks with consistent technique, and consider nutrition, sleep, strength training, and alcohol moderation. Book a clinician visit if you have risk factors or want a structured plan.',
  },
] as const;
