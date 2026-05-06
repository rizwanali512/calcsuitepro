import Link from 'next/link';
import { buildCalculatorFaqPageJsonLd } from '@/lib/calculatorFaqSchema';

export function PressureCalculatorIntro() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 dark:border-white/10 dark:bg-white/5 sm:px-6">
      <p className="text-gray-600 dark:text-gray-300 leading-7 text-[15px] sm:text-base">
        A <strong className="font-medium text-gray-800 dark:text-white/90">pressure calculator</strong> applies the
        contact-pressure formula{' '}
        <strong className="font-medium text-gray-800 dark:text-white/90">P = F ÷ A</strong>: force divided by the area
        it acts on. Enter force in <strong className="font-medium text-gray-800 dark:text-white/90">newtons (N)</strong>{' '}
        and area in <strong className="font-medium text-gray-800 dark:text-white/90">square metres (m²)</strong> to get
        pressure in <strong className="font-medium text-gray-800 dark:text-white/90">pascals (Pa)</strong>. This free
        tool is tuned for physics homework, engineering estimates, and exam-style problems where force and area are
        already known.
      </p>
    </div>
  );
}

export function PressureCalculatorArticle() {
  return (
    <section className="space-y-8 text-gray-600 dark:text-gray-300 leading-7">
      <div>
        <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">What is pressure?</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base">
          <strong>Pressure</strong> is the perpendicular force exerted per unit area. In SI units it is measured in{' '}
          <strong>pascals (Pa)</strong>, where <strong>1 Pa = 1 N/m²</strong>. The same force concentrated on a smaller
          area produces a higher pressure—this is why a sharp knife cuts more easily than a blunt one and why snowshoes
          stop you from sinking into snow.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">Pressure formula (P = F / A)</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] sm:text-base">
          The basic mechanical-pressure formula is{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">P = F / A</code>, where
          F is the perpendicular force in newtons and A is the contact area in square metres. The output P is in
          pascals. To get kilopascals, divide by 1,000; for megapascals, divide by 1,000,000. This tool stays in SI so
          unit conversions never silently change the result.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">How to calculate pressure</h2>
        <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
          <li>
            Identify the <strong className="text-gray-800 dark:text-white/90">force F</strong> acting perpendicular to
            the surface (in newtons).
          </li>
          <li>
            Measure or compute the <strong className="text-gray-800 dark:text-white/90">contact area A</strong> in
            square metres.
          </li>
          <li>
            Divide: <strong className="text-gray-800 dark:text-white/90">P = F ÷ A</strong>. The result is in{' '}
            <strong className="text-gray-800 dark:text-white/90">pascals (Pa)</strong>.
          </li>
          <li>Convert to kPa, bar, or psi only after you have the value in pascals.</li>
        </ol>

        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-800 dark:text-white/90">Worked examples</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Force and area inputs with resulting pressure in pascals</caption>
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Scenario</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Force (N)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Area (m²)</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Pressure (Pa)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3">Box on the floor</td>
                <td className="px-4 py-3 font-mono tabular-nums">200</td>
                <td className="px-4 py-3 font-mono tabular-nums">0.5</td>
                <td className="px-4 py-3 font-mono tabular-nums">400</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Hydraulic piston load</td>
                <td className="px-4 py-3 font-mono tabular-nums">10,000</td>
                <td className="px-4 py-3 font-mono tabular-nums">0.02</td>
                <td className="px-4 py-3 font-mono tabular-nums">500,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Person on snowshoes</td>
                <td className="px-4 py-3 font-mono tabular-nums">700</td>
                <td className="px-4 py-3 font-mono tabular-nums">0.35</td>
                <td className="px-4 py-3 font-mono tabular-nums">2,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Reproduce any row in the calculator above by entering the same force and area values in SI units.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Pressure units & quick conversions</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Unit</th>
                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr>
                <td className="px-4 py-3 font-mono">1 Pa</td>
                <td className="px-4 py-3">1 N/m² (the SI base unit of pressure)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">1 kPa</td>
                <td className="px-4 py-3">1,000 Pa</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">1 bar</td>
                <td className="px-4 py-3">100,000 Pa = 100 kPa</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">1 atm</td>
                <td className="px-4 py-3">101,325 Pa ≈ 1.01325 bar</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">1 psi</td>
                <td className="px-4 py-3">≈ 6,894.76 Pa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Common mistakes</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-gray-800 dark:text-white/90">Mixing units:</strong> entering force in kilonewtons or
            area in cm² without converting; always reduce to N and m² first.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Using weight instead of force:</strong> remember{' '}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs dark:bg-white/10">F = m · g</code>, with{' '}
            g ≈ 9.81 m/s² on Earth.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Confusing fluid pressure with contact pressure:</strong>{' '}
            this tool solves P = F/A. For pressure at depth in a liquid, use{' '}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs dark:bg-white/10">P = ρ · g · h</code>.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Non-perpendicular force:</strong> only the component of
            force perpendicular to the surface produces pressure; resolve the vector before dividing.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Related physics tools on this site</h2>
        <p>
          For the force input itself, use the{' '}
          <Link href="/force-calculator" className="font-medium text-primary-500 hover:underline">
            force calculator
          </Link>{' '}
          (F = m·a). When the area depends on geometry, the{' '}
          <Link href="/surface-area-calculator" className="font-medium text-primary-500 hover:underline">
            surface area calculator
          </Link>{' '}
          helps. For fluid problems involving depth, pair this with the{' '}
          <Link href="/density-calculator" className="font-medium text-primary-500 hover:underline">
            density calculator
          </Link>
          , and for full kinematics or dynamics chains, jump to the{' '}
          <Link href="/acceleration-calculator" className="font-medium text-primary-500 hover:underline">
            acceleration calculator
          </Link>{' '}
          or{' '}
          <Link href="/velocity-calculator" className="font-medium text-primary-500 hover:underline">
            velocity calculator
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export const PRESSURE_CALCULATOR_FAQ = [
  {
    q: 'What is the pressure formula this calculator uses?',
    a: 'It uses P = F / A, where F is the perpendicular force in newtons and A is the contact area in square metres. The result is in pascals (Pa), the SI unit of pressure.',
  },
  {
    q: 'What units should I enter for force and area?',
    a: 'Enter force in newtons (N) and area in square metres (m²) so the output is in pascals. If your data is in kN, kPa, cm², or psi, convert before entering: 1 kN = 1,000 N, 1 m² = 10,000 cm², and 1 psi ≈ 6,894.76 Pa.',
  },
  {
    q: 'How do I convert pressure from pascals to other units?',
    a: 'Divide by 1,000 to get kilopascals, divide by 100,000 to get bar, divide by 101,325 to get standard atmospheres, and divide by 6,894.76 to get psi. The pascal is the canonical SI unit, so always convert outside the calculator.',
  },
  {
    q: 'Does this calculator work for fluid pressure or gas pressure?',
    a: 'No. It implements P = F / A for solid contact pressure, like an object resting on a surface or a piston load. Fluid pressure at depth uses P = ρ·g·h, and ideal gas pressure uses PV = nRT. Use those formulas for those scenarios.',
  },
  {
    q: 'How do I get the force value if I only know the mass?',
    a: 'Convert weight to force first using F = m · g, where g ≈ 9.81 m/s² on Earth. For a 50 kg mass, F ≈ 50 × 9.81 = 490.5 N. Then divide by the contact area to get pressure.',
  },
  {
    q: 'What does it mean when pressure is very high for a small area?',
    a: 'A fixed force concentrated on a small area produces a higher pressure because P is inversely proportional to A. This is why nails, pins, and knife edges work, and why distributing weight over a larger area (like snowshoes) reduces pressure on the surface.',
  },
  {
    q: 'Is the calculator free to use?',
    a: 'Yes. It runs entirely in your browser with no signup, install, or paywall, like the other physics tools on CalcSuite Pro.',
  },
  {
    q: 'Can I use this for engineering or homework?',
    a: 'Yes. Treat the output as a numerical aid: model the force vector and contact area carefully on paper, then verify the arithmetic here. For design decisions involving safety, always cross-check with engineering standards and the relevant material limits.',
  },
] as const;

export function buildPressureFaqJsonLd() {
  return buildCalculatorFaqPageJsonLd(PRESSURE_CALCULATOR_FAQ);
}
