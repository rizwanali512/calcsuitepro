import Link from 'next/link';
import { buildCalculatorFaqPageJsonLd } from '@/lib/calculatorFaqSchema';

export function ScientificCalculatorIntro() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 dark:border-white/10 dark:bg-white/5 sm:px-6">
      <p className="text-gray-600 dark:text-gray-300 leading-7 text-[15px] sm:text-base">
        A <strong className="font-medium text-gray-800 dark:text-white/90">scientific calculator</strong> is an
        advanced math tool that goes beyond addition and subtraction. It supports trigonometry (sin, cos, tan),
        logarithms, powers, roots, factorials, and parentheses so you can evaluate real formulas in one step—whether
        you searched for a <strong className="font-medium text-gray-800 dark:text-white/90">trig calculator</strong>,{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">log calculator online</strong>, or a general{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">algebra calculator with scientific
        functions</strong>. Our{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">free scientific calculator online</strong>{' '}
        runs entirely in your browser: type expressions naturally, switch DEG/RAD, use memory and history, copy
        results, and export your last calculations—fast, accurate, and install-free.
      </p>
    </div>
  );
}

export function ScientificCalculatorArticle() {
  return (
    <section className="space-y-8 text-gray-600 dark:text-gray-300 leading-7">
      <div>
        <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
          What is a scientific calculator?
        </h2>
        <p className="mb-3 text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base">
          A <strong className="text-gray-800 dark:text-white/90">scientific calculator</strong> is a math tool that
          evaluates expressions with <strong className="text-gray-800 dark:text-white/90">trigonometry</strong> (sin, cos,
          tan), <strong className="text-gray-800 dark:text-white/90">logarithms</strong> (log, ln),{' '}
          <strong className="text-gray-800 dark:text-white/90">powers and roots</strong>, factorial, and parentheses—not
          just add/subtract/multiply/divide. It returns a numeric result from one typed line, like a handheld TI-style
          keypad in your browser.
        </p>
        <p className="mb-3">
          Instead of memorizing lookup tables or breaking work into many small steps, you enter a single
          expression—such as{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">sin(30)+sqrt(16)</code>
          —and get a numeric answer. Compared to a basic four-function calculator, it is an{' '}
          <strong className="font-medium text-gray-800 dark:text-white/90">advanced calculator</strong> suited to
          homework, labs, and quick verification at work.
        </p>
        <p>
          People searching for a{' '}
          <strong className="font-medium text-gray-800 dark:text-white/90">scientific calculator online</strong> usually
          want the same capabilities as a handheld model: reliable trig and logs, clear error handling, and a layout that
          works on a laptop or phone. This page delivers that experience without an app store install, so you can
          bookmark it and return whenever you need a quick check.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
          How to calculate with a scientific calculator
        </h2>
        <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
          <li>
            Set <strong className="text-gray-800 dark:text-white/90">DEG</strong> or{' '}
            <strong className="text-gray-800 dark:text-white/90">RAD</strong> before any trig so angles match your
            assignment.
          </li>
          <li>
            Type the <strong className="text-gray-800 dark:text-white/90">expression</strong> using parentheses for
            fractions, exponents, and function arguments (e.g. <code className="font-mono text-sm">sin(2*x)</code>).
          </li>
          <li>
            Use <strong className="text-gray-800 dark:text-white/90">^</strong> for powers,{' '}
            <strong className="text-gray-800 dark:text-white/90">sqrt(...)</strong> for square roots, and{' '}
            <strong className="text-gray-800 dark:text-white/90">log</strong> / <strong className="text-gray-800 dark:text-white/90">ln</strong>{' '}
            per your course&apos;s base convention.
          </li>
          <li>
            Press <strong className="text-gray-800 dark:text-white/90">=</strong> or{' '}
            <kbd className="rounded border border-gray-300 px-1 font-mono text-xs dark:border-gray-600">Enter</kbd> to
            evaluate; fix domain errors (e.g. log of a negative) if shown.
          </li>
          <li>
            Use <strong className="text-gray-800 dark:text-white/90">Ans</strong> or history to chain steps without
            retyping intermediate digits.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
          Expression → result (quick reference)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Sample expressions and numeric results in DEG unless noted</caption>
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Input (expression)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Typical result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">sin(90)</td>
                <td className="px-4 py-3 font-mono tabular-nums">1 (in DEG mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">sqrt(16)+3^2</td>
                <td className="px-4 py-3 font-mono tabular-nums">13</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">log(100)</td>
                <td className="px-4 py-3 font-mono tabular-nums">2 (log₁₀)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">ln(e)</td>
                <td className="px-4 py-3 font-mono tabular-nums">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Features</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-gray-800 dark:text-white/90">Trigonometry:</strong> sin, cos, tan and inverse
            (Inv) functions, with <strong>degree or radian</strong> mode.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Logarithms &amp; exponents:</strong> natural log
            (ln), common log (log), square root, powers, and scientific notation (EXP).
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Arithmetic:</strong> parentheses, percent, constants
            π and e, factorial, and Ans for the last result.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Workflow:</strong> keyboard shortcuts, copy result,
            persistent history (localStorage), export JSON/CSV, MC/MR/M+/M− memory.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">How to Use</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Choose <strong>DEG</strong> or <strong>RAD</strong> before evaluating trig functions.</li>
          <li>
            Build your expression with the keypad or keyboard; use <kbd className="rounded border border-gray-300 px-1 font-mono text-xs dark:border-gray-600">Enter</kbd> for equals and{' '}
            <kbd className="rounded border border-gray-300 px-1 font-mono text-xs dark:border-gray-600">Backspace</kbd> to edit.
          </li>
          <li>
            Tap <strong>=</strong> to evaluate. Open the history icon to review, reuse, or export past runs.
          </li>
          <li>
            Use <strong>Copy</strong> beside the result to paste into notes, spreadsheets, or chat.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Examples</h2>
        <p className="mb-2">
          In <strong>DEG</strong> mode, <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">sin(90)+4</code> evaluates
          to <strong className="text-gray-800 dark:text-white/90">5</strong>. For radians, switch to <strong>RAD</strong> and try{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">sin(pi/2)</code>. Powers
          use <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">^</code>, e.g.{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">2^10</code>. Combine
          functions freely as long as parentheses stay balanced.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Expression (mode)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Typical use</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">log(100)</td>
                <td className="px-4 py-3">Chem / pH-style orders of magnitude</td>
                <td className="px-4 py-3">Confirm whether your course treats log as base 10</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">ln(e^3)</td>
                <td className="px-4 py-3">Calculus growth models</td>
                <td className="px-4 py-3">Natural log pairs with exponentials and derivatives</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">sqrt(2)*cos(45)</td>
                <td className="px-4 py-3">Trig identity checks (DEG)</td>
                <td className="px-4 py-3">Verify exact-value reasoning numerically</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs sm:text-sm">(1+0.05)^12-1</td>
                <td className="px-4 py-3">Effective rate from compounding</td>
                <td className="px-4 py-3">Use parentheses so addition happens before the power</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
          Use cases: who searches for a scientific calculator online?
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Audience</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Typical tasks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3">Middle &amp; high school STEM</td>
                <td className="px-4 py-3">
                  Trig in geometry, logs in science class, powers in algebra—often phrased as “scientific calculator
                  for homework” or “trig calculator online.”
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Undergrad labs &amp; engineering intro</td>
                <td className="px-4 py-3">
                  Quick unit conversions chained into formulas; sanity checks before MATLAB or Excel workflows.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Teachers &amp; tutors</td>
                <td className="px-4 py-3">
                  Demonstrate identical keystrokes on a projector-friendly{' '}
                  <strong className="text-gray-800 dark:text-white/90">online scientific calculator</strong> students
                  can mirror at home.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Self-learners &amp; bootcamps</td>
                <td className="px-4 py-3">
                  Data exercises mixing percentages, exponentials, and logs without installing desktop software.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Searchers also look for adjacent phrases—<strong className="text-gray-800 dark:text-white/90">advanced
          calculator</strong>, <strong className="text-gray-800 dark:text-white/90">math calculator with sin cos
          tan</strong>, <strong className="text-gray-800 dark:text-white/90">engineering calculator online</strong>,
          or <strong className="text-gray-800 dark:text-white/90">calculator with logarithms</strong>. This page covers
          those intents with one consistent engine: expression entry, explicit errors, and reproducible results.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
          Modes, accuracy, and habits that protect your grade
        </h2>
        <p className="mb-3">
          Before any trig-heavy expression, pause on <strong className="text-gray-800 dark:text-white/90">DEG vs
          RAD</strong>. It is the single highest-leverage setting on any <strong className="text-gray-800 dark:text-white/90">scientific
          calculator</strong>. Next, use parentheses when dividing, exponentiating, or composing functions so the parser
          matches your written mathematics. When an answer looks plausible but wrong, re-check domain restrictions:
          logarithms of non-positive numbers, even roots of negatives, and divide-by-zero should surface as readable
          errors—not silent garbage.
        </p>
        <p>
          For <strong className="text-gray-800 dark:text-white/90">high precision scientific calculator</strong> expectations
          in coursework, carry extra digits internally by avoiding premature rounding, then round only at the end to the
          significant figures your rubric demands. History and export help you document intermediate steps for lab
          notebooks and group chats without retyping long decimals by hand.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Benefits</h2>
        <p className="mb-3">
          You get a <strong className="font-medium text-gray-800 dark:text-white/90">free scientific calculator</strong> that
          loads instantly, works on phone and desktop, and keeps optional history on your device. Pair it with other
          CalcSuite Pro tools when a specialized workflow fits better: visualize functions with our{' '}
          <Link href="/graph-calculator" className="font-medium text-primary-500 hover:underline">
            graph calculator
          </Link>
          , work with parts and wholes using the{' '}
          <Link href="/percentage-calculator" className="font-medium text-primary-500 hover:underline">
            percentage calculator
          </Link>
          , or compute logarithms with a dedicated base in the{' '}
          <Link href="/log-calculator" className="font-medium text-primary-500 hover:underline">
            log calculator
          </Link>
          .
        </p>
        <p>
          Whether you searched for a <strong className="font-medium text-gray-800 dark:text-white/90">scientific calculator online</strong>, an{' '}
          <strong className="font-medium text-gray-800 dark:text-white/90">advanced calculator</strong> for trig and logs, or a no-install alternative to
          hardware, this page is built to load quickly, explain errors clearly, and stay accurate for everyday math.
        </p>
      </div>
    </section>
  );
}

export const SCIENTIFIC_CALCULATOR_FAQ = [
  {
    q: 'Is this scientific calculator free?',
    a: 'Yes. CalcSuite Pro offers this scientific calculator online at no cost. There is no download or subscription required to use the core features.',
  },
  {
    q: 'What is the difference between a scientific calculator and a basic calculator?',
    a: 'A basic calculator handles arithmetic. A scientific calculator adds functions such as sine, cosine, tangent, logarithms, powers, roots, and factorial—making it suitable for school, science, and engineering-style expressions.',
  },
  {
    q: 'Does it work as a scientific calculator online without installing software?',
    a: 'Yes. It runs in your web browser. As long as you have a modern browser and an internet connection to load the page, you can calculate immediately.',
  },
  {
    q: 'What does DEG vs RAD mean?',
    a: 'DEG (degrees) and RAD (radians) set how trigonometry interprets angles. For example, sin(90) equals 1 in degree mode. In radian mode, angles are expressed as multiples of π.',
  },
  {
    q: 'How accurate are the results?',
    a: 'Results are computed with a standard math engine suited to browser use. For critical engineering or safety work, always cross-check assumptions, units, and significant figures.',
  },
  {
    q: 'Can I use the keyboard?',
    a: 'Yes. You can type numbers and operators, press Enter for equals, Backspace to delete, and Escape to clear when the history panel is closed.',
  },
  {
    q: 'Is my calculation history stored?',
    a: 'Optional history is saved in your browser local storage so it can persist between visits on the same device. Clear history anytime from the panel or your browser settings.',
  },
  {
    q: 'Can I use this as an engineering or college math calculator?',
    a: 'Yes for standard algebra-through-calc numeric workflows: trig, logs, powers, roots, and multi-step expressions. It is not a CAS that symbolically simplifies or integrates arbitrary expressions; pair it with your course’s approved tools when rules require a specific device.',
  },
] as const;

export function buildScientificFaqJsonLd() {
  return buildCalculatorFaqPageJsonLd(SCIENTIFIC_CALCULATOR_FAQ);
}
