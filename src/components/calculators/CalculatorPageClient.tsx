'use client';

import { useMemo, useState } from 'react';
import type { Calculator } from '@/lib/calculators';

type Props = {
  tool: Calculator;
};

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function calculate(slug: string, values: Record<string, string>): string {
  const a = toNumber(values.a ?? '0');
  const b = toNumber(values.b ?? '0');
  const c = toNumber(values.c ?? '0');

  switch (slug) {
    case 'simple-interest-calculator': {
      const si = (a * b * c) / 100;
      return `Interest: ${si.toFixed(2)}, Total: ${(a + si).toFixed(2)}`;
    }
    case 'compound-interest-calculator': {
      const amount = a * Math.pow(1 + b / 100, c);
      return `Final Amount: ${amount.toFixed(2)}, Interest: ${(amount - a).toFixed(2)}`;
    }
    case 'loan-emi-calculator': {
      const monthlyRate = b / 1200;
      const months = c * 12;
      if (monthlyRate === 0 || months <= 0) return 'Enter valid rate and tenure.';
      const emi =
        (a * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      return `Monthly EMI: ${emi.toFixed(2)}`;
    }
    case 'percentage-calculator':
      return `${((a / (b || 1)) * 100).toFixed(2)}%`;
    case 'area-of-circle-calculator':
      return `Area: ${(Math.PI * a * a).toFixed(2)}`;
    case 'quadratic-equation-calculator': {
      const d = b * b - 4 * a * c;
      if (a === 0) return 'Coefficient a cannot be zero.';
      if (d < 0) return 'No real roots.';
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      return `Roots: ${x1.toFixed(4)}, ${x2.toFixed(4)}`;
    }
    case 'speed-calculator':
      return `Speed: ${(a / (b || 1)).toFixed(2)}`;
    case 'force-calculator':
      return `Force: ${(a * b).toFixed(2)}`;
    case 'kinetic-energy-calculator':
      return `Kinetic Energy: ${(0.5 * a * b * b).toFixed(2)}`;
    default:
      return 'Calculator formula not configured yet.';
  }
}

const inputLabelsBySlug: Record<string, string[]> = {
  'simple-interest-calculator': ['Principal', 'Rate (%)', 'Time (years)'],
  'compound-interest-calculator': ['Principal', 'Rate (%)', 'Time (years)'],
  'loan-emi-calculator': ['Loan Amount', 'Annual Rate (%)', 'Tenure (years)'],
  'percentage-calculator': ['Part', 'Whole'],
  'area-of-circle-calculator': ['Radius'],
  'quadratic-equation-calculator': ['a', 'b', 'c'],
  'speed-calculator': ['Distance', 'Time'],
  'force-calculator': ['Mass', 'Acceleration'],
  'kinetic-energy-calculator': ['Mass', 'Velocity'],
};

export function CalculatorPageClient({ tool }: Props) {
  const labels = useMemo(
    () => inputLabelsBySlug[tool.slug] ?? ['Input A', 'Input B'],
    [tool.slug]
  );
  const [values, setValues] = useState<Record<string, string>>({});

  const result = useMemo(() => calculate(tool.slug, values), [tool.slug, values]);

  return (
    <div className="wrapper py-8 md:py-12">
      <div className="mb-8 max-w-5xl mx-auto">
        <h1 className="mb-3 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
          {tool.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 leading-6 max-w-3xl">
          {tool.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-1 max-w-5xl mx-auto w-full">
        <div className="bg-white p-6 sm:p-9 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Formula: <span className="font-medium text-gray-800 dark:text-white/90">{tool.formula}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labels.map((label, idx) => {
              const key = idx === 0 ? 'a' : idx === 1 ? 'b' : 'c';
              return (
                <label key={label} className="space-y-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
                  <input
                    value={values[key] ?? ''}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    type="number"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary-500"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </label>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</p>
            <p className="text-base font-semibold text-gray-800 dark:text-white/90">{result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
