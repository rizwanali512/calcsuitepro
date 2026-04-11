'use client';

import functionPlot, { type Chart } from 'function-plot';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Graph3D = dynamic(() => import('@/components/Graph3D'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-900/40 text-sm text-slate-400 dark:border-slate-600">
      Loading 3D view…
    </div>
  ),
});

const LINE_COLORS = ['#6366f1', '#22c55e', '#f97316', '#ec4899', '#06b6d4', '#eab308'];

function normalizeEquation(raw: string): string {
  return raw.replace(/^\s*y\s*=\s*/i, '').trim();
}

export default function GraphCalculator() {
  const [equations, setEquations] = useState<string[]>(['x']);
  const [plotError, setPlotError] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 600, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeWrapRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const el = resizeWrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 600;
      const width = Math.max(280, Math.floor(w));
      const height = Math.min(520, Math.max(280, Math.floor(width * 0.62)));
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const cleaned = equations
      .map(normalizeEquation)
      .filter((s) => s.length > 0);

    if (cleaned.length === 0) {
      target.innerHTML = '';
      chartRef.current = null;
      setPlotError(null);
      return;
    }

    const data = cleaned.map((fn, i) => ({
      fn,
      color: LINE_COLORS[i % LINE_COLORS.length],
      graphType: 'polyline' as const,
    }));

    try {
      if (!chartRef.current) {
        chartRef.current = functionPlot({
          target,
          width: size.width,
          height: size.height,
          grid: true,
          disableZoom: false,
          xAxis: { label: 'x' },
          yAxis: { label: 'y' },
          data,
        });
      } else {
        const opts = chartRef.current.options;
        opts.width = size.width;
        opts.height = size.height;
        opts.grid = true;
        opts.disableZoom = false;
        opts.xAxis = { label: 'x' };
        opts.yAxis = { label: 'y' };
        opts.data = data;
        chartRef.current.build();
      }
      setPlotError(null);
    } catch {
      target.innerHTML = '';
      chartRef.current = null;
      setPlotError(
        'Could not plot one or more functions. Use x as the variable (e.g. x^2, sin(x)).'
      );
    }
  }, [equations, size.width, size.height]);

  useEffect(() => {
    return () => {
      const t = containerRef.current;
      if (t) t.innerHTML = '';
      chartRef.current = null;
    };
  }, []);

  const updateEquation = useCallback((index: number, value: string) => {
    setEquations((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const addEquation = useCallback(() => {
    setEquations((prev) => [...prev, '']);
  }, []);

  const removeEquation = useCallback((index: number) => {
    setEquations((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }, []);

  const applyPreset = useCallback((fn: string) => {
    setEquations([fn]);
    setPlotError(null);
  }, []);

  return (
    <div className="flex w-full flex-col gap-8">
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
      <div className="w-full shrink-0 space-y-3 lg:w-80">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Equations <span className="font-normal normal-case">(y = …)</span>
        </p>
        <div className="space-y-2">
          {equations.map((eq, index) => (
            <div key={index} className="flex gap-2">
              <label className="sr-only" htmlFor={`graph-eq-${index}`}>
                Equation {index + 1}
              </label>
              <div className="flex min-w-0 flex-1 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 dark:border-slate-600 dark:bg-slate-800/80">
                <span className="shrink-0 text-xs text-slate-400">y =</span>
                <input
                  id={`graph-eq-${index}`}
                  value={eq}
                  onChange={(e) => updateEquation(index, e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-sm text-slate-800 outline-none dark:text-slate-100"
                  placeholder="x^2"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEquation(index)}
                disabled={equations.length <= 1}
                className={cn(
                  'shrink-0 rounded-xl border px-2.5 py-2 text-sm font-medium transition',
                  equations.length <= 1
                    ? 'cursor-not-allowed border-slate-200 text-slate-300 dark:border-slate-700 dark:text-slate-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50'
                )}
                aria-label={`Remove equation ${index + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addEquation}
          className="w-full rounded-xl border border-dashed border-indigo-300 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-500/40 dark:text-indigo-300 dark:hover:bg-indigo-950/40"
        >
          + Add equation
        </button>
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Examples</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyPreset('x^2')}
              className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
            >
              y = x²
            </button>
            <button
              type="button"
              onClick={() => applyPreset('sin(x)')}
              className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
            >
              y = sin(x)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('log(x)')}
              className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
            >
              y = log(x)
            </button>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Scroll to zoom, drag to pan. Grid and axes are on by default.
        </p>
      </div>

      <div
        ref={resizeWrapRef}
        className="flex min-h-[280px] w-full min-w-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-2 shadow-inner dark:border-slate-600 dark:bg-slate-900/40"
      >
        {plotError ? (
          <p
            className="mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
            role="alert"
          >
            {plotError}
          </p>
        ) : null}
        <div
          ref={containerRef}
          className="graph-calculator-plot w-full overflow-hidden rounded-xl bg-white dark:bg-slate-950"
          style={{ minHeight: size.height }}
        />
      </div>
    </div>

      <section className="border-t border-slate-200 pt-8 dark:border-slate-700" aria-label="3D graph">
        <Graph3D />
      </section>
    </div>
  );
}
