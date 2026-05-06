'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatedNumber, SliderInput, TabSwitch } from './CalcKit';
import {
  VisceralFatRangeChart,
  VisceralFatResultInterpretation,
} from '@/components/VisceralFatCalculatorEnhancements';
import { calculate, type CalculationResult } from '@/lib/calculatorEngine';
import { interpretVisceralFatProxy } from '@/lib/visceralFatProxy';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Unit helpers                                                              */
/* -------------------------------------------------------------------------- */

const CM_PER_INCH = 2.54;
const KG_PER_LB = 0.45359237;

type Gender = 'woman' | 'man';
type WeightUnit = 'kg' | 'lb';
type LengthUnit = 'cm' | 'in';
type HeightUnit = 'cm' | 'm' | 'ft';

function toCm(value: number, unit: LengthUnit): number {
  return unit === 'in' ? value * CM_PER_INCH : value;
}
function fromCm(cm: number, unit: LengthUnit): number {
  return unit === 'in' ? cm / CM_PER_INCH : cm;
}
function toKg(value: number, unit: WeightUnit): number {
  return unit === 'lb' ? value * KG_PER_LB : value;
}
function fromKg(kg: number, unit: WeightUnit): number {
  return unit === 'lb' ? kg / KG_PER_LB : kg;
}

/* Height has 3 modes: cm, m, ft (with inches handled inside) */
function heightToM(value: number, unit: HeightUnit): number {
  if (unit === 'm') return value;
  if (unit === 'cm') return value / 100;
  return value * 0.3048; // ft to m (approximate; we keep ft as decimal for simplicity)
}
function heightFromM(meters: number, unit: HeightUnit): number {
  if (unit === 'm') return meters;
  if (unit === 'cm') return meters * 100;
  return meters / 0.3048;
}

/* -------------------------------------------------------------------------- */
/*  Body silhouette diagram (lightweight inline SVG, no external assets)      */
/* -------------------------------------------------------------------------- */

function BodyDiagram({ gender }: { gender: Gender }) {
  // Single neutral silhouette; tape lines highlight waist & mid-thigh.
  return (
    <svg
      viewBox="0 0 120 220"
      role="img"
      aria-label={`Where to measure waist and thigh on a ${gender}`}
      className="h-44 w-auto sm:h-52"
    >
      <defs>
        <linearGradient id="vfBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(165 180 252)" />
          <stop offset="100%" stopColor="rgb(129 140 248)" />
        </linearGradient>
      </defs>

      {/* head */}
      <circle cx="60" cy="20" r="14" fill="url(#vfBody)" opacity="0.85" />
      {/* torso */}
      <path
        d="M40 38 Q44 60 42 88 Q40 110 50 130 Q60 138 70 130 Q80 110 78 88 Q76 60 80 38 Z"
        fill="url(#vfBody)"
        opacity="0.9"
      />
      {/* arms */}
      <path d="M40 42 Q28 70 32 110" stroke="url(#vfBody)" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M80 42 Q92 70 88 110" stroke="url(#vfBody)" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.85" />
      {/* legs */}
      <path d="M52 130 Q50 170 48 210" stroke="url(#vfBody)" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M68 130 Q70 170 72 210" stroke="url(#vfBody)" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* waist tape */}
      <line x1="32" y1="98" x2="88" y2="98" stroke="rgb(244 63 94)" strokeWidth="2" strokeDasharray="3 3" />
      <text x="92" y="100" fontSize="9" fontWeight="700" fill="rgb(244 63 94)">
        Waist
      </text>

      {/* thigh tape */}
      <line x1="44" y1="158" x2="76" y2="158" stroke="rgb(16 185 129)" strokeWidth="2" strokeDasharray="3 3" />
      <text x="80" y="160" fontSize="9" fontWeight="700" fill="rgb(16 185 129)">
        Thigh
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  History (localStorage, SSR-safe)                                          */
/* -------------------------------------------------------------------------- */

type HistoryEntry = {
  ts: number;
  score: number;
  level: 'low' | 'normal' | 'high';
  gender: Gender;
};

const HISTORY_KEY = 'csp:visceral-fat-history';
const MAX_HISTORY = 5;

function readHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is HistoryEntry =>
        e &&
        typeof e.ts === 'number' &&
        typeof e.score === 'number' &&
        (e.level === 'low' || e.level === 'normal' || e.level === 'high') &&
        (e.gender === 'woman' || e.gender === 'man')
    );
  } catch {
    return [];
  }
}
function writeHistory(entries: HistoryEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)));
  } catch {
    /* ignore quota errors */
  }
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

/* -------------------------------------------------------------------------- */
/*  Defaults                                                                   */
/* -------------------------------------------------------------------------- */

type FormState = {
  gender: Gender;
  age: number;
  weightKg: number;
  heightM: number;
  waistCm: number;
  thighCm: number;
};

const DEFAULTS: Record<Gender, FormState> = {
  woman: { gender: 'woman', age: 30, weightKg: 65, heightM: 1.65, waistCm: 80, thighCm: 55 },
  man: { gender: 'man', age: 35, weightKg: 80, heightM: 1.78, waistCm: 92, thighCm: 56 },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function VisceralFatCalculatorPro() {
  const [state, setState] = useState<FormState>(DEFAULTS.woman);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('m');
  const [waistUnit, setWaistUnit] = useState<LengthUnit>('cm');
  const [thighUnit, setThighUnit] = useState<LengthUnit>('cm');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  const result = useMemo<CalculationResult>(() => {
    return calculate('visceral-fat-calculator', {
      gender: state.gender,
      age: state.age,
      weightKg: state.weightKg,
      heightM: state.heightM,
      waistCm: state.waistCm,
      thighCm: state.thighCm,
    });
  }, [state]);

  const numericResult = typeof result === 'number' ? result : null;
  const interpretation = useMemo(
    () => (numericResult != null ? interpretVisceralFatProxy(numericResult) : null),
    [numericResult]
  );

  /* ------- Derived display values for unit toggles --------------------- */

  const weightDisplay = useMemo(
    () => Number(fromKg(state.weightKg, weightUnit).toFixed(1)),
    [state.weightKg, weightUnit]
  );
  const heightDisplay = useMemo(
    () =>
      Number(
        heightFromM(state.heightM, heightUnit).toFixed(heightUnit === 'm' ? 2 : 1)
      ),
    [state.heightM, heightUnit]
  );
  const waistDisplay = useMemo(
    () => Number(fromCm(state.waistCm, waistUnit).toFixed(1)),
    [state.waistCm, waistUnit]
  );
  const thighDisplay = useMemo(
    () => Number(fromCm(state.thighCm, thighUnit).toFixed(1)),
    [state.thighCm, thighUnit]
  );

  /* ------- Setters that respect units ---------------------------------- */

  const setWeight = (display: number) =>
    setState((s) => ({ ...s, weightKg: Number(toKg(display, weightUnit).toFixed(2)) }));
  const setHeight = (display: number) =>
    setState((s) => ({ ...s, heightM: Number(heightToM(display, heightUnit).toFixed(3)) }));
  const setWaist = (display: number) =>
    setState((s) => ({ ...s, waistCm: Number(toCm(display, waistUnit).toFixed(1)) }));
  const setThigh = (display: number) =>
    setState((s) => ({ ...s, thighCm: Number(toCm(display, thighUnit).toFixed(1)) }));

  /* ------- Slider min/max helpers (unit-aware) ------------------------- */

  const weightRange = weightUnit === 'kg' ? { min: 30, max: 250, step: 1 } : { min: 66, max: 550, step: 1 };
  const waistRange = waistUnit === 'cm' ? { min: 50, max: 160, step: 0.5 } : { min: 20, max: 63, step: 0.5 };
  const thighRange = thighUnit === 'cm' ? { min: 30, max: 110, step: 0.5 } : { min: 12, max: 43, step: 0.5 };
  const heightRange =
    heightUnit === 'm'
      ? { min: 1.2, max: 2.2, step: 0.01 }
      : heightUnit === 'cm'
        ? { min: 120, max: 220, step: 1 }
        : { min: 4.0, max: 7.2, step: 0.05 }; // ft (decimal)

  /* ------- Actions ------------------------------------------------------ */

  const applyPreset = useCallback((g: Gender) => {
    setState(DEFAULTS[g]);
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULTS[state.gender]);
  }, [state.gender]);

  const saveMeasurement = useCallback(() => {
    if (numericResult == null || !interpretation) return;
    const entry: HistoryEntry = {
      ts: Date.now(),
      score: Number(numericResult.toFixed(2)),
      level: interpretation.level,
      gender: state.gender,
    };
    const next = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(next);
    writeHistory(next);
  }, [numericResult, interpretation, history, state.gender]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    writeHistory([]);
  }, []);

  const copyResult = useCallback(async () => {
    if (numericResult == null || !interpretation) return;
    const summary = [
      `Visceral Fat Proxy: ${numericResult.toFixed(2)} (${interpretation.headline})`,
      `Gender: ${state.gender === 'woman' ? 'Woman' : 'Man'}, Age: ${state.age}`,
      `Weight: ${weightDisplay} ${weightUnit}, Height: ${heightDisplay} ${heightUnit}`,
      `Waist: ${waistDisplay} ${waistUnit}, Thigh: ${thighDisplay} ${thighUnit}`,
      'Educational only — not a medical diagnosis.',
      'https://calcsuitepro.com/visceral-fat-calculator',
    ].join('\n');
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }, [
    numericResult,
    interpretation,
    state.age,
    state.gender,
    weightDisplay,
    weightUnit,
    heightDisplay,
    heightUnit,
    waistDisplay,
    waistUnit,
    thighDisplay,
    thighUnit,
  ]);

  /* ------- Breakdown (transparent formula contribution) ---------------- */

  const breakdown = useMemo(() => {
    const heightM = state.heightM;
    if (!heightM) return null;
    const a = state.waistCm / heightM;
    const b = state.weightKg / heightM;
    const c = state.thighCm / 10;
    return { a, b, c, total: a + b - c };
  }, [state.heightM, state.waistCm, state.weightKg, state.thighCm]);

  const isError = typeof result === 'string';
  const lastEntry = history[1]; // entry before the most recent saved one
  const delta =
    numericResult != null && lastEntry != null
      ? Number((numericResult - lastEntry.score).toFixed(2))
      : null;

  return (
    <div className="space-y-6">
      {/* ===== HEADER ROW ================================================== */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
            Advanced calculator
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Live proxy score from your measurements — switch units, save trends, share results.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset('woman')}
            className="rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            Sample (woman)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('man')}
            className="rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            Sample (man)
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-rose-300 hover:text-rose-700 dark:hover:text-rose-300 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ===== LEFT: INPUTS =============================================== */}
        <div className="space-y-5 lg:col-span-3">
          {/* Gender pills */}
          <fieldset className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/50 p-5">
            <legend className="px-1 text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Gender
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(['woman', 'man'] as const).map((g) => {
                const active = state.gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, gender: g }))}
                    aria-pressed={active}
                    className={cn(
                      'group relative flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition',
                      active
                        ? 'border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                        : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 text-gray-700 dark:text-gray-200 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300'
                    )}
                  >
                    <span aria-hidden className="text-base">
                      {g === 'woman' ? '♀' : '♂'}
                    </span>
                    <span className="capitalize">{g}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Age */}
          <SliderInput
            label="Age"
            value={state.age}
            min={10}
            max={100}
            step={1}
            unit="years"
            onChange={(v) => setState((s) => ({ ...s, age: v }))}
            accent="indigo"
            presets={[
              { label: '20s', value: 25 },
              { label: '30s', value: 35 },
              { label: '40s', value: 45 },
              { label: '50s', value: 55 },
            ]}
          />

          {/* Weight (with unit toggle) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Weight unit
              </p>
              <TabSwitch
                options={[
                  { id: 'kg', label: 'kg' },
                  { id: 'lb', label: 'lb' },
                ]}
                value={weightUnit}
                onChange={(v) => setWeightUnit(v as WeightUnit)}
              />
            </div>
            <SliderInput
              label="Weight"
              value={weightDisplay}
              min={weightRange.min}
              max={weightRange.max}
              step={weightRange.step}
              unit={weightUnit}
              onChange={setWeight}
              accent="emerald"
            />
          </div>

          {/* Height (with unit toggle) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Height unit
              </p>
              <TabSwitch
                options={[
                  { id: 'm', label: 'm' },
                  { id: 'cm', label: 'cm' },
                  { id: 'ft', label: 'ft' },
                ]}
                value={heightUnit}
                onChange={(v) => setHeightUnit(v as HeightUnit)}
              />
            </div>
            <SliderInput
              label="Height"
              value={heightDisplay}
              min={heightRange.min}
              max={heightRange.max}
              step={heightRange.step}
              unit={heightUnit}
              onChange={setHeight}
              accent="sky"
              hint={heightUnit === 'ft' ? 'Decimal feet (e.g. 5.75 ≈ 5 ft 9 in)' : undefined}
            />
          </div>

          {/* Waist (with unit toggle) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Waist unit
              </p>
              <TabSwitch
                options={[
                  { id: 'cm', label: 'cm' },
                  { id: 'in', label: 'in' },
                ]}
                value={waistUnit}
                onChange={(v) => setWaistUnit(v as LengthUnit)}
              />
            </div>
            <SliderInput
              label="Waist circumference"
              value={waistDisplay}
              min={waistRange.min}
              max={waistRange.max}
              step={waistRange.step}
              unit={waistUnit}
              onChange={setWaist}
              accent="rose"
              hint="Measure at the narrowest point above the hip bone, after a relaxed exhale."
            />
          </div>

          {/* Thigh (with unit toggle) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Thigh unit
              </p>
              <TabSwitch
                options={[
                  { id: 'cm', label: 'cm' },
                  { id: 'in', label: 'in' },
                ]}
                value={thighUnit}
                onChange={(v) => setThighUnit(v as LengthUnit)}
              />
            </div>
            <SliderInput
              label="Thigh circumference"
              value={thighDisplay}
              min={thighRange.min}
              max={thighRange.max}
              step={thighRange.step}
              unit={thighUnit}
              onChange={setThigh}
              accent="amber"
              hint="Measure at the widest point of the upper thigh, standing relaxed."
            />
          </div>

          {/* Tape diagram */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-slate-950/40 p-4 sm:flex-row sm:items-start sm:gap-5">
            <BodyDiagram gender={state.gender} />
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-6">
              <p className="font-semibold text-gray-800 dark:text-white/90">
                Where to measure
              </p>
              <ul className="mt-1.5 list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-rose-600 dark:text-rose-300">Waist</span>: narrowest
                  point above the hip bone, soft tape, end of an exhale.
                </li>
                <li>
                  <span className="font-medium text-emerald-600 dark:text-emerald-300">Thigh</span>:
                  widest point of the upper leg, standing relaxed, equal weight on both feet.
                </li>
                <li>Use the same time of day and clothing each session for clean trends.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ===== RIGHT: LIVE RESULT ========================================= */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Big result card */}
            <motion.div
              layout
              className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 p-6 shadow-sm"
            >
              <div className="absolute inset-0 -z-0 opacity-50 [background-image:radial-gradient(circle_at_top_right,rgba(129,140,248,0.18),transparent_60%)]" />
              <p className="relative text-xs font-semibold uppercase tracking-widest text-indigo-700/80 dark:text-indigo-300">
                Visceral fat proxy score
              </p>

              {isError ? (
                <p className="relative mt-2 text-sm font-medium text-rose-600 dark:text-rose-400">
                  {result}
                </p>
              ) : numericResult != null && interpretation ? (
                <>
                  <p className="relative mt-2 flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold tabular-nums tracking-tight text-gray-900 dark:text-white">
                      <AnimatedNumber value={numericResult} decimals={2} />
                    </span>
                    {delta != null ? (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-semibold',
                          delta > 0
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                            : delta < 0
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300'
                        )}
                        aria-label="Change since last saved measurement"
                      >
                        {delta > 0 ? '▲' : delta < 0 ? '▼' : '•'} {Math.abs(delta).toFixed(2)}
                      </span>
                    ) : null}
                  </p>

                  <VisceralFatResultInterpretation score={numericResult} />
                  <VisceralFatRangeChart score={numericResult} />

                  {/* Action row */}
                  <div className="relative mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={saveMeasurement}
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-2 text-sm font-semibold text-white shadow hover:opacity-95 active:scale-[0.98] transition"
                    >
                      Save measurement
                    </button>
                    <button
                      type="button"
                      onClick={copyResult}
                      className="rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                    >
                      {copied ? 'Copied!' : 'Copy result'}
                    </button>
                  </div>
                </>
              ) : (
                <p className="relative mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Adjust the inputs to see your live proxy score.
                </p>
              )}
            </motion.div>

            {/* Breakdown card */}
            {breakdown && numericResult != null && !isError ? (
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Score breakdown
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-200">
                  <li className="flex items-center justify-between gap-2 tabular-nums">
                    <span className="text-gray-500 dark:text-gray-400">Waist ÷ Height</span>
                    <span className="font-semibold">+{breakdown.a.toFixed(2)}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2 tabular-nums">
                    <span className="text-gray-500 dark:text-gray-400">Weight ÷ Height</span>
                    <span className="font-semibold">+{breakdown.b.toFixed(2)}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2 tabular-nums">
                    <span className="text-gray-500 dark:text-gray-400">Thigh ÷ 10</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-300">
                      −{breakdown.c.toFixed(2)}
                    </span>
                  </li>
                  <li className="mt-1 flex items-center justify-between gap-2 border-t border-gray-200 dark:border-white/10 pt-1.5 tabular-nums">
                    <span className="font-semibold text-gray-800 dark:text-white/90">Total</span>
                    <span className="font-bold">{breakdown.total.toFixed(2)}</span>
                  </li>
                </ul>
                <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Educational proxy formula on this site only — not a medical or imaging measurement.
                </p>
              </div>
            ) : null}

            {/* History card */}
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Recent measurements
                </p>
                {history.length > 0 ? (
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-[11px] font-semibold text-gray-500 hover:text-rose-600 dark:hover:text-rose-300 transition"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
              {history.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Saved measurements appear here for quick week-to-week comparisons. Stored only in
                  your browser.
                </p>
              ) : (
                <ul className="mt-2 divide-y divide-gray-200 dark:divide-white/10">
                  {history.map((entry) => (
                    <li
                      key={entry.ts}
                      className="flex items-center justify-between py-2 text-sm text-gray-700 dark:text-gray-200"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className={cn(
                            'inline-block h-2.5 w-2.5 rounded-full',
                            entry.level === 'low'
                              ? 'bg-emerald-500'
                              : entry.level === 'normal'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                          )}
                        />
                        <span className="font-mono tabular-nums font-semibold">
                          {entry.score.toFixed(2)}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {entry.gender}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatRelative(entry.ts)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Disclaimer */}
            <p className="rounded-xl border border-amber-200/80 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-[11px] leading-relaxed text-amber-800 dark:text-amber-200">
              <strong>Educational only.</strong> This proxy is not a medical, MRI, or DEXA reading,
              and the bands are heuristics for orientation. For diagnosis or care decisions, talk to
              a qualified clinician.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
