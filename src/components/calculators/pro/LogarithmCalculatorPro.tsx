'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedNumber, MetricCard, SliderInput, TabSwitch } from './CalcKit';

type BasePreset = 'e' | '10' | '2' | 'custom';

const BASE_VALUES: Record<Exclude<BasePreset, 'custom'>, number> = {
  e: Math.E,
  '10': 10,
  '2': 2,
};

function logBase(x: number, b: number): number | null {
  if (!Number.isFinite(x) || !Number.isFinite(b)) return null;
  if (x <= 0) return null;
  if (b <= 0 || b === 1) return null;
  const result = Math.log(x) / Math.log(b);
  return Number.isFinite(result) ? result : null;
}

/* -------------------------------------------------------------------------- */
/*  Animated logarithm curve                                                  */
/* -------------------------------------------------------------------------- */

function LogarithmGraph({ x, base }: { x: number; base: number }) {
  const w = 720;
  const h = 320;
  const padding = { top: 24, right: 24, bottom: 32, left: 50 };
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;

  const xMin = 0.1;
  const xMax = Math.max(10, x * 1.6, 20);
  const yEnd = logBase(xMax, base) ?? 1;
  const yStart = logBase(xMin, base) ?? -1;
  const yMin = Math.min(-2, yStart);
  const yMax = Math.max(2, yEnd);

  const xScale = (val: number) =>
    padding.left + ((val - xMin) / (xMax - xMin)) * innerW;
  const yScale = (val: number) =>
    padding.top + innerH - ((val - yMin) / (yMax - yMin)) * innerH;

  const samples = 220;
  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= samples; i++) {
    const xVal = xMin + (i / samples) * (xMax - xMin);
    const yVal = logBase(xVal, base);
    if (yVal == null) continue;
    points.push({ x: xScale(xVal), y: yScale(yVal) });
  }

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  const yValAtX = logBase(x, base);
  const safeMarker = yValAtX != null;
  const markerX = safeMarker ? xScale(x) : padding.left;
  const markerY = safeMarker ? yScale(yValAtX as number) : padding.top + innerH;

  const xTicks = [xMin, 1, Math.E, base, xMax / 2, xMax]
    .filter((v) => v >= xMin && v <= xMax)
    .filter((v, i, a) => a.findIndex((u) => Math.abs(u - v) < 0.05) === i)
    .sort((a, b) => a - b);

  const yTicks = (() => {
    const ticks: number[] = [];
    const range = yMax - yMin;
    const step = range / 5;
    for (let i = 0; i <= 5; i++) ticks.push(yMin + i * step);
    return ticks;
  })();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/40">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-[320px] w-full min-w-[520px]">
          <defs>
            <linearGradient id="log-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="log-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7a5af8" />
            </linearGradient>
          </defs>

          {yTicks.map((t) => (
            <g key={`y-${t}`}>
              <line
                x1={padding.left}
                x2={w - padding.right}
                y1={yScale(t)}
                y2={yScale(t)}
                stroke="currentColor"
                className="text-gray-200 dark:text-white/10"
                strokeDasharray="3 4"
              />
              <text
                x={padding.left - 6}
                y={yScale(t) + 4}
                textAnchor="end"
                className="fill-gray-400 text-[10px] tabular-nums"
              >
                {t.toFixed(1)}
              </text>
            </g>
          ))}

          {xTicks.map((t) => (
            <g key={`x-${t}`}>
              <line
                x1={xScale(t)}
                x2={xScale(t)}
                y1={padding.top}
                y2={padding.top + innerH}
                stroke="currentColor"
                className="text-gray-200/60 dark:text-white/10"
                strokeDasharray="3 4"
              />
              <text
                x={xScale(t)}
                y={h - 10}
                textAnchor="middle"
                className="fill-gray-400 text-[10px] tabular-nums"
              >
                {t < 0.5
                  ? t.toFixed(2)
                  : Math.abs(t - Math.E) < 0.05
                    ? 'e'
                    : t.toFixed(1)}
              </text>
            </g>
          ))}

          <line
            x1={padding.left}
            x2={w - padding.right}
            y1={yScale(0)}
            y2={yScale(0)}
            stroke="currentColor"
            className="text-gray-400 dark:text-white/30"
          />
          <line
            x1={xScale(1)}
            x2={xScale(1)}
            y1={padding.top}
            y2={padding.top + innerH}
            stroke="currentColor"
            className="text-gray-400/60 dark:text-white/15"
            strokeDasharray="2 4"
          />

          <motion.path
            d={`${path} L ${xScale(xMax).toFixed(2)} ${yScale(yMin).toFixed(2)} L ${xScale(xMin).toFixed(2)} ${yScale(yMin).toFixed(2)} Z`}
            fill="url(#log-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            key={`${base.toFixed(4)}-${xMax.toFixed(2)}`}
            d={path}
            fill="none"
            stroke="url(#log-stroke)"
            strokeWidth={2.6}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />

          {safeMarker ? (
            <>
              <line
                x1={markerX}
                x2={markerX}
                y1={padding.top + innerH}
                y2={markerY}
                stroke="#7a5af8"
                strokeDasharray="4 4"
                strokeWidth={1.4}
              />
              <line
                x1={padding.left}
                x2={markerX}
                y1={markerY}
                y2={markerY}
                stroke="#06b6d4"
                strokeDasharray="4 4"
                strokeWidth={1.4}
              />
              <motion.g
                initial={false}
                animate={{ x: markerX, y: markerY }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              >
                <circle r="7" fill="#fff" stroke="#7a5af8" strokeWidth="2.5" />
                <circle r="3.5" fill="#7a5af8" />
              </motion.g>
              <text
                x={Math.min(markerX + 12, w - padding.right - 80)}
                y={Math.max(markerY - 12, padding.top + 12)}
                className="fill-indigo-600 text-xs font-semibold dark:fill-indigo-300"
              >
                ({x.toFixed(2)}, {(yValAtX as number).toFixed(4)})
              </text>
            </>
          ) : (
            <text
              x={padding.left + innerW / 2}
              y={padding.top + innerH / 2}
              textAnchor="middle"
              className="fill-rose-500 text-sm font-semibold"
            >
              Logarithm undefined: x must be {'>'} 0 and base must be {'>'} 0, ≠ 1
            </text>
          )}

          <text
            x={padding.left + 12}
            y={padding.top + 16}
            className="fill-gray-500 text-[11px] dark:fill-gray-300"
          >
            y = log<tspan baselineShift="sub" fontSize="9">
              {Math.abs(base - Math.E) < 1e-6 ? 'e' : base.toFixed(2)}
            </tspan>
            (x)
          </text>
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Powers ladder visualization                                               */
/* -------------------------------------------------------------------------- */

function PowersLadder({ base }: { base: number }) {
  if (base <= 0 || base === 1 || !Number.isFinite(base)) return null;
  const exponents = [-2, -1, 0, 1, 2, 3, 4];
  const rows = exponents.map((e) => ({
    exponent: e,
    value: Math.pow(base, e),
  }));
  const safeBaseLabel =
    Math.abs(base - Math.E) < 1e-6
      ? 'e'
      : Number.isInteger(base)
        ? String(base)
        : base.toFixed(2);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Powers of {safeBaseLabel}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          log<sub>{safeBaseLabel}</sub>(value) reverses the exponent.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                Exponent
              </th>
              <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                {safeBaseLabel}^n
              </th>
              <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                Reverse: log<sub>{safeBaseLabel}</sub>(value)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {rows.map((row) => (
              <tr key={row.exponent}>
                <td className="px-4 py-2 font-mono tabular-nums">
                  {row.exponent}
                </td>
                <td className="px-4 py-2 font-mono tabular-nums">
                  {row.value < 0.001 || row.value > 100000
                    ? row.value.toExponential(3)
                    : row.value.toFixed(4)}
                </td>
                <td className="px-4 py-2 font-mono tabular-nums text-indigo-600 dark:text-indigo-300">
                  {row.exponent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function LogarithmCalculatorPro() {
  const [x, setX] = useState(100);
  const [basePreset, setBasePreset] = useState<BasePreset>('10');
  const [customBase, setCustomBase] = useState(2.5);

  const base =
    basePreset === 'custom' ? customBase : BASE_VALUES[basePreset as Exclude<BasePreset, 'custom'>];
  const result = logBase(x, base);
  const ln = x > 0 ? Math.log(x) : null;
  const log10 = x > 0 ? Math.log10(x) : null;
  const log2 = x > 0 ? Math.log2(x) : null;
  const lnB = base > 0 && base !== 1 ? Math.log(base) : null;

  const baseLabel =
    basePreset === 'e'
      ? 'ln (base e)'
      : basePreset === '10'
        ? 'log₁₀ (common log)'
        : basePreset === '2'
          ? 'log₂ (binary log)'
          : `log base ${customBase.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Logarithm Calculator{' '}
            <span className="ml-2 align-middle rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
              Pro
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            log<sub>b</sub>(x) = ln(x) / ln(b) · interactive curve & worked example
          </p>
        </div>
        <TabSwitch
          options={[
            { id: 'e', label: 'ln (e)' },
            { id: '10', label: 'log₁₀' },
            { id: '2', label: 'log₂' },
            { id: 'custom', label: 'Custom base' },
          ]}
          value={basePreset}
          onChange={setBasePreset}
        />
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <SliderInput
          label="Value (x)"
          value={x}
          min={0.01}
          max={10000}
          step={0.01}
          unit=""
          accent="sky"
          onChange={(v) => setX(Math.max(0.0001, v))}
          presets={[
            { label: '1', value: 1 },
            { label: '10', value: 10 },
            { label: '100', value: 100 },
            { label: '1000', value: 1000 },
          ]}
        />
        {basePreset === 'custom' ? (
          <SliderInput
            label="Base (b)"
            value={customBase}
            min={0.01}
            max={50}
            step={0.01}
            unit=""
            accent="indigo"
            onChange={(v) => setCustomBase(Math.max(0.0001, v))}
            hint="Base must be > 0 and not equal to 1."
            presets={[
              { label: '1.5', value: 1.5 },
              { label: '3', value: 3 },
              { label: '5', value: 5 },
              { label: '16', value: 16 },
            ]}
          />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Base
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white tabular-nums">
              {basePreset === 'e' ? 'e ≈ 2.71828' : basePreset}
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {basePreset === 'e'
                ? 'Natural logarithm — appears in calculus, growth/decay, and continuous compounding.'
                : basePreset === '10'
                  ? 'Common logarithm — pH, decibels, Richter, and orders-of-magnitude reasoning.'
                  : 'Binary logarithm — information theory, entropy, complexity analysis.'}
            </p>
            <button
              type="button"
              onClick={() => setBasePreset('custom')}
              className="mt-3 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:border-indigo-400 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
            >
              Switch to a custom base
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label={baseLabel}
          value={result ?? 0}
          decimals={6}
          accent="indigo"
          caption={
            result == null
              ? 'Undefined: x must be > 0 and base ≠ 1'
              : `${result > 0 ? '+' : ''}${result.toFixed(6)}`
          }
        />
        <MetricCard
          label="ln(x)"
          value={ln ?? 0}
          decimals={6}
          accent="emerald"
          caption="Natural log (base e)"
        />
        <MetricCard
          label="log₁₀(x)"
          value={log10 ?? 0}
          decimals={6}
          accent="sky"
          caption="Common log (base 10)"
        />
        <MetricCard
          label="log₂(x)"
          value={log2 ?? 0}
          decimals={6}
          accent="amber"
          caption="Binary log (base 2)"
        />
      </div>

      <LogarithmGraph x={x} base={base} />

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 p-5 dark:border-white/10 dark:from-cyan-500/10 dark:via-slate-900/0 dark:to-indigo-500/10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Change-of-base derivation
          </h3>
          <p className="mt-2 font-mono text-sm text-gray-700 dark:text-gray-200">
            log<sub>b</sub>(x) = ln(x) / ln(b)
          </p>
          <ul className="mt-3 grid gap-1 text-sm text-gray-600 dark:text-gray-300">
            <li>
              ln(x) = ln({x.toFixed(2)}) ={' '}
              <span className="font-mono text-emerald-600 dark:text-emerald-300">
                {ln != null ? ln.toFixed(6) : '—'}
              </span>
            </li>
            <li>
              ln(b) = ln({Math.abs(base - Math.E) < 1e-6 ? 'e' : base.toFixed(2)}) ={' '}
              <span className="font-mono text-emerald-600 dark:text-emerald-300">
                {lnB != null ? lnB.toFixed(6) : '—'}
              </span>
            </li>
            <li>
              Result ={' '}
              <span className="font-mono text-indigo-600 dark:text-indigo-300">
                <AnimatedNumber value={result ?? 0} decimals={6} />
              </span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Internally we use natural logarithms and divide. This works for any positive base
            other than 1.
          </p>
        </div>
        <PowersLadder base={base} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Quick identities & properties
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 font-mono">
            log<sub>b</sub>(1) = 0
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 font-mono">
            log<sub>b</sub>(b) = 1
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 font-mono">
            log<sub>b</sub>(x · y) = log<sub>b</sub>(x) + log<sub>b</sub>(y)
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 font-mono">
            log<sub>b</sub>(x / y) = log<sub>b</sub>(x) − log<sub>b</sub>(y)
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 font-mono">
            log<sub>b</sub>(x<sup>k</sup>) = k · log<sub>b</sub>(x)
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 font-mono">
            b<sup>log<sub>b</sub>(x)</sup> = x
          </div>
        </div>
      </div>
    </div>
  );
}
