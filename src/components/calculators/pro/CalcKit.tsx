'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Animated number                                                           */
/* -------------------------------------------------------------------------- */

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  duration = 0.7,
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 90,
    damping: 18,
    mass: 0.8,
    duration,
  });
  const display = useTransform(spring, (latest: number) => {
    if (!Number.isFinite(latest)) return '—';
    const fixed = latest.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${prefix}${decPart ? `${intFormatted}.${decPart}` : intFormatted}${suffix}`;
  });

  useEffect(() => {
    if (Number.isFinite(value)) {
      motionValue.set(value);
    }
  }, [motionValue, value]);

  return <motion.span className={className}>{display}</motion.span>;
}

/* -------------------------------------------------------------------------- */
/*  Slider with input field                                                   */
/* -------------------------------------------------------------------------- */

type SliderInputProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string;
  onChange: (value: number) => void;
  accent?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
  presets?: Array<{ label: string; value: number }>;
};

const accentMap: Record<NonNullable<SliderInputProps['accent']>, string> = {
  indigo: 'from-indigo-500 to-purple-600',
  emerald: 'from-emerald-500 to-teal-600',
  amber: 'from-amber-500 to-orange-600',
  rose: 'from-rose-500 to-pink-600',
  sky: 'from-sky-500 to-blue-600',
};

const accentRingMap: Record<NonNullable<SliderInputProps['accent']>, string> = {
  indigo:
    'focus-within:border-indigo-500 focus-within:ring-indigo-500/30 hover:border-indigo-300 dark:hover:border-indigo-500/40',
  emerald:
    'focus-within:border-emerald-500 focus-within:ring-emerald-500/30 hover:border-emerald-300 dark:hover:border-emerald-500/40',
  amber:
    'focus-within:border-amber-500 focus-within:ring-amber-500/30 hover:border-amber-300 dark:hover:border-amber-500/40',
  rose:
    'focus-within:border-rose-500 focus-within:ring-rose-500/30 hover:border-rose-300 dark:hover:border-rose-500/40',
  sky:
    'focus-within:border-sky-500 focus-within:ring-sky-500/30 hover:border-sky-300 dark:hover:border-sky-500/40',
};

const accentTextMap: Record<NonNullable<SliderInputProps['accent']>, string> = {
  indigo: 'text-indigo-600 dark:text-indigo-300',
  emerald: 'text-emerald-600 dark:text-emerald-300',
  amber: 'text-amber-600 dark:text-amber-300',
  rose: 'text-rose-600 dark:text-rose-300',
  sky: 'text-sky-600 dark:text-sky-300',
};

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  hint,
  onChange,
  accent = 'indigo',
  presets,
}: SliderInputProps) {
  const id = useId();
  const safeValue = Number.isFinite(value) ? value : min;
  const pct = useMemo(() => {
    if (max === min) return 0;
    return Math.min(100, Math.max(0, ((safeValue - min) / (max - min)) * 100));
  }, [safeValue, min, max]);

  const decimalsForStep =
    step >= 1 ? 0 : Math.min(4, String(step).split('.')[1]?.length ?? 0);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const decrement = () => {
    const next = clamp(safeValue - step);
    onChange(Number(next.toFixed(decimalsForStep)));
  };
  const increment = () => {
    const next = clamp(safeValue + step);
    onChange(Number(next.toFixed(decimalsForStep)));
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/50 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300"
        >
          {label}
        </label>
        {unit ? (
          <span
            className={cn(
              'rounded-full bg-gray-100 dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider',
              accentTextMap[accent]
            )}
          >
            {unit}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      ) : null}

      <div
        className={cn(
          'mt-3 flex items-stretch overflow-hidden rounded-xl border-2 border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-slate-950/50 transition focus-within:ring-4 focus-within:ring-offset-0',
          accentRingMap[accent]
        )}
      >
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={decrement}
          className="flex w-12 shrink-0 items-center justify-center border-r-2 border-gray-200 dark:border-white/15 bg-white dark:bg-slate-900 text-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-300 transition"
        >
          −
        </button>
        <input
          id={id}
          type="number"
          value={Number.isFinite(value) ? value : ''}
          min={min}
          max={max}
          step={step}
          inputMode="decimal"
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === '') {
              onChange(min);
              return;
            }
            const next = Number(raw);
            onChange(Number.isFinite(next) ? next : min);
          }}
          onFocus={(e) => e.target.select()}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-3 py-3 text-center text-xl sm:text-2xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white outline-none',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          )}
        />
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={increment}
          className="flex w-12 shrink-0 items-center justify-center border-l-2 border-gray-200 dark:border-white/15 bg-white dark:bg-slate-900 text-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-300 transition"
        >
          +
        </button>
      </div>

      <div className="mt-4 relative h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full bg-gradient-to-r',
            accentMap[accent]
          )}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          aria-label={`${label} slider`}
        />
        <motion.span
          aria-hidden
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full shadow-lg ring-4 ring-white dark:ring-slate-900 bg-gradient-to-br',
            accentMap[accent]
          )}
          initial={false}
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {presets && presets.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.value)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition',
                safeValue === preset.value
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-300'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Metric card                                                               */
/* -------------------------------------------------------------------------- */

type MetricCardProps = {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  accent?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
  caption?: string;
  className?: string;
};

const metricAccentBg: Record<NonNullable<MetricCardProps['accent']>, string> = {
  indigo:
    'from-indigo-500/15 via-purple-500/10 to-transparent border-indigo-200/60 dark:border-indigo-500/20',
  emerald:
    'from-emerald-500/15 via-teal-500/10 to-transparent border-emerald-200/60 dark:border-emerald-500/20',
  amber:
    'from-amber-500/15 via-orange-500/10 to-transparent border-amber-200/60 dark:border-amber-500/20',
  rose:
    'from-rose-500/15 via-pink-500/10 to-transparent border-rose-200/60 dark:border-rose-500/20',
  sky:
    'from-sky-500/15 via-blue-500/10 to-transparent border-sky-200/60 dark:border-sky-500/20',
};

const metricAccentText: Record<NonNullable<MetricCardProps['accent']>, string> = {
  indigo: 'text-indigo-600 dark:text-indigo-300',
  emerald: 'text-emerald-600 dark:text-emerald-300',
  amber: 'text-amber-600 dark:text-amber-300',
  rose: 'text-rose-600 dark:text-rose-300',
  sky: 'text-sky-600 dark:text-sky-300',
};

export function MetricCard({
  label,
  value,
  decimals = 2,
  prefix = '',
  suffix = '',
  accent = 'indigo',
  caption,
  className,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-white dark:bg-slate-900/40 p-4 sm:p-5 shadow-sm transition hover:shadow-md',
        metricAccentBg[accent],
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 -z-0 bg-gradient-to-br opacity-90',
          metricAccentBg[accent]
        )}
      />
      <p className="relative text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p
        className={cn(
          'relative mt-1.5 text-2xl sm:text-3xl font-bold tabular-nums',
          metricAccentText[accent]
        )}
      >
        <AnimatedNumber
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      </p>
      {caption ? (
        <p className="relative mt-1 text-xs text-gray-500 dark:text-gray-400">
          {caption}
        </p>
      ) : null}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reset / Reveal animation                                                  */
/* -------------------------------------------------------------------------- */

export function FadeInOnMount({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tab switcher                                                              */
/* -------------------------------------------------------------------------- */

type TabSwitchProps<T extends string> = {
  options: ReadonlyArray<{ id: T; label: string; icon?: React.ReactNode }>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function TabSwitch<T extends string>({
  options,
  value,
  onChange,
  className,
}: TabSwitchProps<T>) {
  const [hovered, setHovered] = useState<T | null>(null);
  return (
    <div
      className={cn(
        'inline-flex flex-wrap gap-1 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100/70 dark:bg-white/5 p-1 backdrop-blur',
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.id === value;
        const isHover = hovered === opt.id && !isActive;
        return (
          <button
            key={opt.id}
            type="button"
            onMouseEnter={() => setHovered(opt.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(opt.id)}
            className={cn(
              'relative rounded-lg px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40',
              isActive
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              />
            ) : null}
            {isHover ? (
              <span className="absolute inset-0 rounded-lg bg-gray-200/70 dark:bg-white/5" />
            ) : null}
            <span className="relative inline-flex items-center gap-1.5">
              {opt.icon}
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
