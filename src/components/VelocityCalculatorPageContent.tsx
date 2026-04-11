import Link from 'next/link';
import { buildCalculatorFaqPageJsonLd } from '@/lib/calculatorFaqSchema';

export function VelocityCalculatorIntro() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 dark:border-white/10 dark:bg-white/5 sm:px-6">
      <p className="text-gray-600 dark:text-gray-300 leading-7 text-[15px] sm:text-base">
        A <strong className="font-medium text-gray-800 dark:text-white/90">velocity calculator</strong> solves the
        average-velocity relationship{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">v = displacement ÷ time</strong> for
        straight-line (or single-axis) problems. Enter displacement and time in{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">matching units</strong>—meters and seconds,
        kilometers and hours, and so on—and get an instant numeric check. This free tool is built for physics homework,
        exam prep, tutoring, and quick engineering estimates where you already modeled Δx and Δt correctly.
      </p>
    </div>
  );
}

export function VelocityCalculatorArticle() {
  return (
    <section className="space-y-8 text-gray-600 dark:text-gray-300 leading-7">
      <div>
        <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">What is velocity?</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base">
          <strong>Velocity</strong> describes how fast position changes along a direction. In intro physics,{' '}
          <strong>average velocity</strong> is <strong>displacement ÷ time</strong> (net change in position over an
          interval). It can be negative if you move opposite your chosen positive axis; <strong>speed</strong> is the
          magnitude (non-negative) when you ignore direction.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">How to calculate velocity</h2>
        <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
          <li>
            Pick a <strong className="text-gray-800 dark:text-white/90">positive direction</strong> for your problem
            (e.g., east or +x).
          </li>
          <li>
            Find <strong className="text-gray-800 dark:text-white/90">displacement Δx</strong>—final position minus
            initial position along that axis (not total distance if you turned around).
          </li>
          <li>
            Measure the <strong className="text-gray-800 dark:text-white/90">elapsed time Δt</strong> for that same
            interval (&gt; 0).
          </li>
          <li>
            Use <strong className="text-gray-800 dark:text-white/90">v_avg = Δx ÷ Δt</strong> with{' '}
            <strong className="text-gray-800 dark:text-white/90">matching units</strong> (m/s, km/h, etc.).
          </li>
          <li>
            Enter <strong className="text-gray-800 dark:text-white/90">displacement</strong> and{' '}
            <strong className="text-gray-800 dark:text-white/90">time</strong> in the calculator above to check your
            arithmetic.
          </li>
        </ol>

        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">
          Values vs result (average velocity)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Displacement and time inputs with resulting average velocity</caption>
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Displacement (Δx)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Time (Δt)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Average velocity (v)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3 font-mono tabular-nums">100 m</td>
                <td className="px-4 py-3 font-mono tabular-nums">5 s</td>
                <td className="px-4 py-3 font-mono tabular-nums">20 m/s</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono tabular-nums">120 km</td>
                <td className="px-4 py-3 font-mono tabular-nums">2 h</td>
                <td className="px-4 py-3 font-mono tabular-nums">60 km/h</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono tabular-nums">−30 m</td>
                <td className="px-4 py-3 font-mono tabular-nums">10 s</td>
                <td className="px-4 py-3 font-mono tabular-nums">−3 m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
          Velocity formula, meaning, and common search variants
        </h2>
        <p className="mb-3">
          In introductory physics, <strong className="text-gray-800 dark:text-white/90">average velocity</strong> is
          defined as displacement divided by the elapsed time interval:{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">v_avg = Δx / Δt</code>.
          People search for a <strong className="text-gray-800 dark:text-white/90">velocity formula calculator</strong>,{' '}
          <strong className="text-gray-800 dark:text-white/90">average velocity calculator</strong>, or even “speed
          from distance and time” when they really mean one-dimensional motion. The critical idea is{' '}
          <strong className="text-gray-800 dark:text-white/90">displacement</strong> (net change in position along an
          axis), not necessarily total path length—if your problem gives round-trip distance, you may need average{' '}
          <em>speed</em> instead.
        </p>
        <p>
          <strong className="text-gray-800 dark:text-white/90">Velocity vs speed:</strong> on a line, velocity carries
          a sign (forward vs backward); speed is the magnitude. Our calculator implements the algebraic average from
          two inputs you provide, so treat negative displacement as valid when your positive direction is defined
          upstream in the problem statement.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
          Worked examples (same tool, different unit stories)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Scenario</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Displacement</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Time</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3">Sprinter straight segment</td>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">100 m</td>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">10 s</td>
                <td className="px-4 py-3">10 m/s average velocity</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Highway trip (net toward destination)</td>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">120 km</td>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">2 h</td>
                <td className="px-4 py-3">60 km/h average velocity</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Negative direction on x-axis</td>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">−24 m</td>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">6 s</td>
                <td className="px-4 py-3">−4 m/s (toward −x)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Enter the same numbers in the calculator above to verify arithmetic after you set up the model on paper.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Use cases that map cleanly to v = Δx/Δt</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Use case</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Why this calculator fits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3">High school / AP physics kinematics</td>
                <td className="px-4 py-3">
                  Check Δx/Δt after drawing a diagram and choosing a positive direction—ideal before multi-step tests.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Intro college mechanics labs</td>
                <td className="px-4 py-3">
                  Quick verification when spreadsheets are overkill; keeps focus on measurement uncertainty discussion.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Tutoring &amp; homework help</td>
                <td className="px-4 py-3">
                  Students verbalize displacement; tutors confirm with a shared, consistent online{' '}
                  <strong className="text-gray-800 dark:text-white/90">physics velocity calculator</strong>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Logistics “average run” estimates</td>
                <td className="px-4 py-3">
                  When net displacement and duration are known, average velocity is immediate—distinct from traffic speed
                  averages over path length.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Unit discipline &amp; typical mistakes</h2>
        <p className="mb-3">
          The fastest way to break a <strong className="text-gray-800 dark:text-white/90">velocity calculation</strong>{' '}
          is mixed units: kilometers with seconds without converting, or minutes disguised as hours. Align displacement
          and time first, then divide. Dimensional analysis helps: if displacement is in meters and time in seconds,
          velocity emerges in m/s.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-gray-800 dark:text-white/90">Distance vs displacement:</strong> round trips can
            have zero displacement but nonzero distance—this tool expects displacement for average velocity.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Instantaneous vs average:</strong> this page targets
            average velocity from two scalars; instantaneous velocity needs calculus or extra data (e.g., position
            functions).
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Divide-by-zero:</strong> time must be nonzero; the
            engine rejects invalid combinations the same way handwritten work should.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Related tools on this site</h2>
        <p>
          Pair this page with the{' '}
          <Link href="/acceleration-calculator" className="font-medium text-primary-500 hover:underline">
            acceleration calculator
          </Link>{' '}
          when problems chain Δv and Δt, the{' '}
          <Link href="/distance-calculator" className="font-medium text-primary-500 hover:underline">
            distance calculator
          </Link>{' '}
          when speed × time is given explicitly, and the{' '}
          <Link href="/graph-calculator" className="font-medium text-primary-500 hover:underline">
            graph calculator
          </Link>{' '}
          to visualize linear position vs time. For pure arithmetic on expressions, use the{' '}
          <Link href="/scientific-calculator" className="font-medium text-primary-500 hover:underline">
            scientific calculator
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export const VELOCITY_CALCULATOR_FAQ = [
  {
    q: 'What is the velocity formula this calculator uses?',
    a: 'It computes average velocity as displacement divided by time (v = Δx / Δt) from the two values you enter. Displacement is the net change in position along your chosen axis, not necessarily total distance traveled.',
  },
  {
    q: 'Is this an average velocity calculator or instantaneous velocity?',
    a: 'It is for average velocity from a displacement interval and a time interval. Instantaneous velocity requires a function of time or additional data (calculus or sensors), which is out of scope for this two-field tool.',
  },
  {
    q: 'Can velocity be negative?',
    a: 'Yes, when your positive direction is defined and displacement is opposite that direction. A negative result means motion toward the negative side of your axis; speed would be the magnitude.',
  },
  {
    q: 'What units should I use?',
    a: 'Use consistent units: for example meters with seconds to get m/s, or kilometers with hours to get km/h. Do not mix minutes with hours or miles with meters without converting first.',
  },
  {
    q: 'How is velocity different from speed?',
    a: 'In one dimension, velocity includes direction via sign; speed is the absolute value of velocity (non-negative). In richer 2D/3D settings, velocity is a vector; this calculator handles the scalar one-axis case.',
  },
  {
    q: 'Why is my answer wrong when I used total distance?',
    a: 'If the problem involves a round trip or curved path, total path length divided by time is average speed, not average velocity. Use net displacement from start to finish for average velocity along a line.',
  },
  {
    q: 'Is this velocity calculator free?',
    a: 'Yes. It runs in your browser with no download required, like other tools on CalcSuite Pro.',
  },
  {
    q: 'Can I use this for homework and exams?',
    a: 'Use it to verify arithmetic when your instructor allows calculators. Always follow your course’s academic integrity rules; understanding the setup matters more than the numeric button press.',
  },
] as const;

export function buildVelocityFaqJsonLd() {
  return buildCalculatorFaqPageJsonLd(VELOCITY_CALCULATOR_FAQ);
}
