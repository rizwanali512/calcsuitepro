'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatedNumber, MetricCard, SliderInput, TabSwitch } from './CalcKit';
import { cn } from '@/lib/utils';

type GraphAxis = 'a-vs-F' | 'm-vs-F';

/* -------------------------------------------------------------------------- */
/*  Animated cart simulation: F = m·a                                         */
/* -------------------------------------------------------------------------- */

function CartScene({ mass, acceleration }: { mass: number; acceleration: number }) {
  const [t, setT] = useState(0);
  const lastRef = useRef<number | null>(null);
  const xRef = useRef(0);
  const vRef = useRef(0);
  const direction = acceleration === 0 ? 0 : acceleration > 0 ? 1 : -1;
  const reqRef = useRef<number | null>(null);

  useEffect(() => {
    xRef.current = 0;
    vRef.current = 0;
    lastRef.current = null;
    setT(0);
  }, [mass, acceleration]);

  useEffect(() => {
    let mounted = true;
    const tick = (now: number) => {
      if (!mounted) return;
      if (lastRef.current == null) lastRef.current = now;
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;
      vRef.current += acceleration * dt;
      xRef.current += vRef.current * dt;
      if (Math.abs(xRef.current) > 1.4) {
        xRef.current = 0;
        vRef.current = 0;
      }
      setT(xRef.current);
      reqRef.current = requestAnimationFrame(tick);
    };
    reqRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [mass, acceleration]);

  const cartW = Math.min(110, Math.max(36, 36 + mass * 1.6));
  const cartH = Math.min(60, Math.max(24, 22 + mass * 0.8));
  const offsetPct = Math.max(-32, Math.min(32, t * 30));

  const arrowMag = Math.min(80, Math.abs(mass * acceleration) * 0.4);
  const arrowDir = direction;

  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-30 [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:32px_32px] text-indigo-300 dark:text-indigo-500/40" />

      <div className="absolute inset-x-6 bottom-12 top-6 flex items-end">
        <div
          className="relative flex w-full items-end justify-center"
          style={{ transform: `translateX(${offsetPct}%)` }}
        >
          <motion.div
            initial={false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            className="relative"
            style={{ width: cartW, height: cartH }}
          >
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg" />
            <div className="absolute inset-x-2 top-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="absolute -bottom-2 left-2 h-3.5 w-3.5 rounded-full bg-slate-700 dark:bg-slate-200 ring-2 ring-slate-300 dark:ring-slate-700" />
            <div className="absolute -bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-slate-700 dark:bg-slate-200 ring-2 ring-slate-300 dark:ring-slate-700" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 shadow dark:bg-slate-800 dark:text-indigo-300">
              {mass.toFixed(0)} kg
            </div>

            {arrowMag > 4 ? (
              <svg
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: arrowDir > 0 ? '100%' : -arrowMag - 12,
                  width: arrowMag + 12,
                  height: 22,
                }}
                viewBox={`0 0 ${arrowMag + 12} 22`}
              >
                <defs>
                  <linearGradient id="force-arrow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                {arrowDir > 0 ? (
                  <>
                    <line
                      x1="0"
                      y1="11"
                      x2={arrowMag}
                      y2="11"
                      stroke="url(#force-arrow)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <polygon
                      points={`${arrowMag},5 ${arrowMag + 10},11 ${arrowMag},17`}
                      fill="#f43f5e"
                    />
                  </>
                ) : (
                  <>
                    <line
                      x1={arrowMag + 12}
                      y1="11"
                      x2="12"
                      y2="11"
                      stroke="url(#force-arrow)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <polygon points={`12,5 2,11 12,17`} fill="#f43f5e" />
                  </>
                )}
              </svg>
            ) : null}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-9 h-px bg-slate-300/80 dark:bg-white/15" />
      <div className="absolute inset-x-0 bottom-0 h-9 bg-[repeating-linear-gradient(135deg,transparent_0_8px,rgba(99,102,241,0.18)_8px_16px)]" />

      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-indigo-600 shadow ring-1 ring-indigo-100 dark:bg-slate-900/80 dark:text-indigo-300 dark:ring-indigo-500/30">
        a = {acceleration.toFixed(2)} m/s²
      </div>
      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-rose-600 shadow ring-1 ring-rose-100 dark:bg-slate-900/80 dark:text-rose-300 dark:ring-rose-500/30">
        F = {(mass * acceleration).toFixed(2)} N
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Force vs (mass | acceleration) line chart                                 */
/* -------------------------------------------------------------------------- */

function ForceLineChart({
  mass,
  acceleration,
  axis,
}: {
  mass: number;
  acceleration: number;
  axis: GraphAxis;
}) {
  const w = 720;
  const h = 240;
  const padding = { top: 16, right: 18, bottom: 28, left: 50 };
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;

  const xMax = axis === 'a-vs-F' ? Math.max(20, Math.abs(acceleration) * 2 || 20) : Math.max(50, mass * 2 || 50);
  const yMax = axis === 'a-vs-F' ? Math.max(50, Math.abs(mass * xMax) || 50) : Math.max(50, Math.abs(acceleration * xMax) || 50);

  const samples = 80;
  const points = useMemo(() => {
    const pts: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= samples; i++) {
      const xVal = (i / samples) * xMax;
      const yVal = axis === 'a-vs-F' ? mass * xVal : acceleration * xVal;
      const x = padding.left + (xVal / xMax) * innerW;
      const y = padding.top + innerH - (yVal / yMax) * innerH;
      pts.push({ x, y });
    }
    return pts;
  }, [mass, acceleration, axis, xMax, yMax, innerH, innerW, padding.left, padding.top]);

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  const currentX = axis === 'a-vs-F' ? Math.abs(acceleration) : Math.abs(mass);
  const currentY = Math.abs(mass * acceleration);
  const markerX = padding.left + (currentX / xMax) * innerW;
  const markerY = padding.top + innerH - (currentY / yMax) * innerH;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/40">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-[240px] w-full min-w-[480px]">
          <defs>
            <linearGradient id="force-line-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="force-line-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <g key={p}>
              <line
                x1={padding.left}
                x2={w - padding.right}
                y1={padding.top + innerH - p * innerH}
                y2={padding.top + innerH - p * innerH}
                stroke="currentColor"
                className="text-gray-200 dark:text-white/10"
                strokeDasharray="3 4"
              />
              <text
                x={padding.left - 6}
                y={padding.top + innerH - p * innerH + 4}
                textAnchor="end"
                className="fill-gray-400 text-[10px] tabular-nums"
              >
                {(yMax * p).toFixed(0)}
              </text>
            </g>
          ))}

          <motion.path
            d={`${path} L ${padding.left + innerW} ${padding.top + innerH} L ${padding.left} ${padding.top + innerH} Z`}
            fill="url(#force-line-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#force-line-stroke)"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />

          <line
            x1={padding.left}
            x2={w - padding.right}
            y1={padding.top + innerH}
            y2={padding.top + innerH}
            stroke="currentColor"
            className="text-gray-300 dark:text-white/20"
          />

          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <text
              key={p}
              x={padding.left + p * innerW}
              y={h - 8}
              textAnchor="middle"
              className="fill-gray-400 text-[10px]"
            >
              {(xMax * p).toFixed(axis === 'a-vs-F' ? 1 : 0)}
            </text>
          ))}

          <motion.g
            initial={false}
            animate={{ x: markerX, y: markerY }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          >
            <circle r="6" fill="#fff" stroke="#ec4899" strokeWidth="2.5" />
            <circle r="3" fill="#ec4899" />
          </motion.g>

          <text
            x={padding.left + 10}
            y={padding.top + 16}
            className="fill-gray-500 text-[11px] dark:fill-gray-300"
          >
            {axis === 'a-vs-F'
              ? `Force (N) vs Acceleration (m/s²) at m = ${mass.toFixed(0)} kg`
              : `Force (N) vs Mass (kg) at a = ${acceleration.toFixed(2)} m/s²`}
          </text>
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function ForceCalculatorPro() {
  const [mass, setMass] = useState(10);
  const [acceleration, setAcceleration] = useState(2);
  const [axis, setAxis] = useState<GraphAxis>('a-vs-F');

  const force = mass * acceleration;
  const weight = mass * 9.80665;
  const inLbf = force * 0.224809;

  const examples = [
    { label: 'Apple drop (≈1 N)', mass: 0.1, acceleration: 9.81 },
    { label: 'Cyclist accel (≈80 N)', mass: 80, acceleration: 1 },
    { label: 'Car braking (≈8 kN)', mass: 1500, acceleration: -5.5 },
    { label: 'Rocket thrust (≈30 kN)', mass: 5000, acceleration: 6 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Force Calculator{' '}
            <span className="ml-2 align-middle rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              Pro
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Newton&apos;s second law · F = m · a · live simulation
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {examples.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => {
                setMass(ex.mass);
                setAcceleration(ex.acceleration);
              }}
              className="rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-rose-300 hover:text-rose-600 dark:hover:border-rose-500/30 dark:hover:text-rose-300 transition"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </header>

      <CartScene mass={mass} acceleration={acceleration} />

      <div className="grid gap-4 md:grid-cols-2">
        <SliderInput
          label="Mass (m)"
          value={mass}
          min={0.1}
          max={5000}
          step={0.1}
          unit="kg"
          accent="indigo"
          onChange={(v) => setMass(Math.max(0, v))}
          presets={[
            { label: '1 kg', value: 1 },
            { label: '10 kg', value: 10 },
            { label: '100 kg', value: 100 },
            { label: '1000 kg', value: 1000 },
          ]}
        />
        <SliderInput
          label="Acceleration (a)"
          value={acceleration}
          min={-50}
          max={50}
          step={0.1}
          unit="m/s²"
          accent="rose"
          onChange={setAcceleration}
          hint="Negative values reverse direction (deceleration)."
          presets={[
            { label: '1 m/s²', value: 1 },
            { label: 'g (9.81)', value: 9.81 },
            { label: '−5', value: -5 },
            { label: '20', value: 20 },
          ]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Force"
          value={force}
          decimals={2}
          suffix=" N"
          accent="rose"
          caption={`${(force / 1000).toFixed(3)} kN · ${inLbf.toFixed(2)} lbf`}
        />
        <MetricCard
          label="Weight (on Earth)"
          value={weight}
          decimals={2}
          suffix=" N"
          accent="amber"
          caption="W = m × g, g = 9.80665 m/s²"
        />
        <MetricCard
          label="Magnitude"
          value={Math.abs(force)}
          decimals={2}
          suffix=" N"
          accent="indigo"
          caption={
            force > 0
              ? 'Direction: forward (+)'
              : force < 0
                ? 'Direction: reverse (−)'
                : 'No net acceleration'
          }
        />
        <MetricCard
          label="Equivalent dynes"
          value={force * 1e5}
          decimals={0}
          suffix=" dyn"
          accent="sky"
          caption="1 N = 100 000 dynes (CGS)"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Linear relationship
          </h3>
          <TabSwitch
            options={[
              { id: 'a-vs-F', label: 'F vs a (m fixed)' },
              { id: 'm-vs-F', label: 'F vs m (a fixed)' },
            ]}
            value={axis}
            onChange={setAxis}
          />
        </div>
        <ForceLineChart mass={mass} acceleration={acceleration} axis={axis} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-rose-50 via-white to-orange-50 p-5 dark:border-white/10 dark:from-rose-500/10 dark:via-slate-900/0 dark:to-orange-500/10">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Step-by-step calculation
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Step n="1" title="Mass">
            <span className="font-mono text-base text-gray-800 dark:text-white">
              m = {mass.toFixed(2)} kg
            </span>
          </Step>
          <Step n="2" title="Acceleration">
            <span className="font-mono text-base text-gray-800 dark:text-white">
              a = {acceleration.toFixed(2)} m/s²
            </span>
          </Step>
          <Step n="3" title="Force">
            <span className="font-mono text-base text-rose-600 dark:text-rose-300">
              F = {mass.toFixed(2)} × {acceleration.toFixed(2)} ={' '}
              <AnimatedNumber value={force} decimals={2} suffix=" N" />
            </span>
          </Step>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900/40">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white',
            'bg-gradient-to-br from-indigo-500 to-purple-600'
          )}
        >
          {n}
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {title}
        </p>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
