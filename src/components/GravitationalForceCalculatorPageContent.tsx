import Link from 'next/link';
import { buildCalculatorFaqPageJsonLd } from '@/lib/calculatorFaqSchema';

export function GravitationalForceCalculatorIntro() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 dark:border-white/10 dark:bg-white/5 sm:px-6">
      <p className="text-gray-600 dark:text-gray-300 leading-7 text-[15px] sm:text-base">
        A <strong className="font-medium text-gray-800 dark:text-white/90">gravitational force calculator</strong>{' '}
        applies Newton’s law of universal gravitation:{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">F = G · m₁ · m₂ ÷ r²</strong>, where{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">G ≈ 6.674 × 10⁻¹¹ N·m²/kg²</strong> is the
        universal gravitational constant. Enter both masses in{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">kilograms</strong> and the centre-to-centre
        distance in <strong className="font-medium text-gray-800 dark:text-white/90">metres</strong> to get the
        attractive force in <strong className="font-medium text-gray-800 dark:text-white/90">newtons</strong>—free,
        instant, and tuned for physics homework, exam prep, and quick orbital estimates.
      </p>
    </div>
  );
}

export function GravitationalForceCalculatorArticle() {
  return (
    <section className="space-y-8 text-gray-600 dark:text-gray-300 leading-7">
      <div>
        <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">What is gravitational force?</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base">
          <strong>Gravitational force</strong> is the mutual attraction every pair of masses exerts on each other.
          Newton’s law of universal gravitation states that the magnitude of this force is proportional to the product
          of the two masses and inversely proportional to the square of the distance between their centres of mass.
          The force always points along the line joining the two bodies and is attractive in classical mechanics.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">
          Newton’s law of universal gravitation (formula)
        </h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base">
          The formula is{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">
            F = G · m₁ · m₂ / r²
          </code>
          , with the universal gravitational constant{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">
            G = 6.674 × 10⁻¹¹ N·m²/kg²
          </code>
          . Treat each body as a point mass (or use the centre of mass for spherically symmetric bodies viewed from
          outside). Use SI units throughout and the result naturally comes out in newtons.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">
          How to calculate gravitational force
        </h2>
        <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
          <li>
            Convert both masses to <strong className="text-gray-800 dark:text-white/90">kilograms</strong>.
          </li>
          <li>
            Convert the separation to <strong className="text-gray-800 dark:text-white/90">metres</strong>—use
            centre-to-centre distance for spherical bodies.
          </li>
          <li>
            Compute{' '}
            <strong className="text-gray-800 dark:text-white/90">F = (G · m₁ · m₂) ÷ r²</strong> with G ≈ 6.674 × 10⁻¹¹.
          </li>
          <li>
            Read the result in <strong className="text-gray-800 dark:text-white/90">newtons</strong>; convert to other
            units only outside the formula.
          </li>
        </ol>

        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">Worked examples</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Sample inputs for Newton’s law of universal gravitation with computed forces
            </caption>
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Scenario</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">m₁ (kg)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">m₂ (kg)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">r (m)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">F (N) ≈</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3">Two 1 kg balls, 1 m apart</td>
                <td className="px-4 py-3 font-mono tabular-nums">1</td>
                <td className="px-4 py-3 font-mono tabular-nums">1</td>
                <td className="px-4 py-3 font-mono tabular-nums">1</td>
                <td className="px-4 py-3 font-mono tabular-nums">6.674 × 10⁻¹¹</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Earth ↔ Moon</td>
                <td className="px-4 py-3 font-mono tabular-nums">5.972 × 10²⁴</td>
                <td className="px-4 py-3 font-mono tabular-nums">7.342 × 10²²</td>
                <td className="px-4 py-3 font-mono tabular-nums">3.844 × 10⁸</td>
                <td className="px-4 py-3 font-mono tabular-nums">1.98 × 10²⁰</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Earth ↔ Sun</td>
                <td className="px-4 py-3 font-mono tabular-nums">5.972 × 10²⁴</td>
                <td className="px-4 py-3 font-mono tabular-nums">1.989 × 10³⁰</td>
                <td className="px-4 py-3 font-mono tabular-nums">1.496 × 10¹¹</td>
                <td className="px-4 py-3 font-mono tabular-nums">3.54 × 10²²</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Reproduce any row by entering the same masses and distance into the calculator above. Differences in the last
          decimal are normal due to rounded astronomical constants.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Why distance matters more than mass</h2>
        <p>
          Because of the inverse-square term <em>r²</em>, doubling the distance between the bodies makes the force one
          quarter, while doubling either mass only doubles the force. This is why orbits depend strongly on radius and
          why gravity drops off so quickly with altitude even though Earth’s mass is enormous.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Common mistakes</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-gray-800 dark:text-white/90">Forgetting r²:</strong> dividing by r instead of r² is
            the single most common source of wrong answers.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Wrong units:</strong> entering masses in grams or
            distance in kilometres without converting; G is defined in SI, so use kg and m.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Surface vs centre distance:</strong> for planets, r is
            the centre-to-centre distance, not the surface separation.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Treating the formula as relativistic:</strong> Newton’s
            law is an excellent approximation for everyday and most astronomical scales, but extreme regimes (very
            close to black holes, near light speed) need general relativity.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Related physics tools on this site</h2>
        <p>
          For Newton’s second law (F = m·a), use the{' '}
          <Link href="/force-calculator" className="font-medium text-primary-500 hover:underline">
            force calculator
          </Link>
          . When the question is about contact pressure rather than gravitational pull, see the{' '}
          <Link href="/pressure-calculator" className="font-medium text-primary-500 hover:underline">
            pressure calculator
          </Link>
          . For motion that follows once you know the force, jump to the{' '}
          <Link href="/acceleration-calculator" className="font-medium text-primary-500 hover:underline">
            acceleration calculator
          </Link>{' '}
          or{' '}
          <Link href="/velocity-calculator" className="font-medium text-primary-500 hover:underline">
            velocity calculator
          </Link>
          , and for energy reasoning use the{' '}
          <Link href="/kinetic-energy-calculator" className="font-medium text-primary-500 hover:underline">
            kinetic energy calculator
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export const GRAVITATIONAL_FORCE_CALCULATOR_FAQ = [
  {
    q: 'What is the gravitational force formula this calculator uses?',
    a: 'It uses Newton’s law of universal gravitation: F = G · m₁ · m₂ / r², where G ≈ 6.674 × 10⁻¹¹ N·m²/kg². Both masses go in kilograms and r in metres, so the result comes out in newtons.',
  },
  {
    q: 'What is the value of G in this calculator?',
    a: 'The universal gravitational constant G is approximately 6.674 × 10⁻¹¹ N·m²/kg² (CODATA recommended). Some textbooks round it to 6.67 × 10⁻¹¹; expect tiny differences in the last decimal places.',
  },
  {
    q: 'What units should I use for the masses and distance?',
    a: 'Use kilograms for the masses and metres for the distance between centres of mass. If your data is in grams, kilometres, or astronomical units, convert first so the SI definition of G stays valid.',
  },
  {
    q: 'Is this calculator only for planets and stars?',
    a: 'No. It works for any pair of masses—two atoms, two cricket balls, or two stars—although for everyday objects the resulting force is incredibly small. That is exactly why we mostly notice gravity from very large bodies like Earth.',
  },
  {
    q: 'Why does distance affect the force more strongly than mass?',
    a: 'Because the formula is inverse-square in r. Doubling either mass doubles the force, but doubling the distance reduces the force by a factor of four. Halving the distance multiplies the force by four.',
  },
  {
    q: 'Does this calculator account for general relativity?',
    a: 'No. It implements the classical Newtonian formula, which is highly accurate for normal masses and distances. For very strong gravity (near black holes or neutron stars) or very high speeds, general relativity is required.',
  },
  {
    q: 'How is gravitational force different from weight?',
    a: 'Weight is the gravitational force a planet exerts on a specific object at its surface, often written W = m·g. This calculator computes the more general two-body attraction. On Earth’s surface, weight is just a special case of F = G·m_Earth·m / R_Earth².',
  },
  {
    q: 'Is this gravitational force calculator free to use?',
    a: 'Yes. It runs in your browser with no signup, install, or paywall, like the other physics calculators on CalcSuite Pro.',
  },
] as const;

export function buildGravitationalForceFaqJsonLd() {
  return buildCalculatorFaqPageJsonLd(GRAVITATIONAL_FORCE_CALCULATOR_FAQ);
}
