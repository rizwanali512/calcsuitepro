import Link from 'next/link';
import { buildCalculatorFaqPageJsonLd } from '@/lib/calculatorFaqSchema';

export function GraphCalculatorIntro() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 dark:border-white/10 dark:bg-white/5 sm:px-6">
      <p className="text-gray-600 dark:text-gray-300 leading-7 text-[15px] sm:text-base">
        A <strong className="font-medium text-gray-800 dark:text-white/90">graph calculator online</strong> lets you
        turn formulas into pictures: you type a function of <em>x</em>, and the tool draws <em>y = f(x)</em> on
        axes with a grid. Use it to see shape, intercepts, and how curves compare—then scroll to zoom and drag to
        pan. This page also includes a <strong className="font-medium text-gray-800 dark:text-white/90">3D surface</strong>{' '}
        section for <em>z = f(x, y)</em> so you can explore bowls, ripples, and saddles in the browser with orbit
        controls.
      </p>
    </div>
  );
}

export function GraphCalculatorArticle() {
  return (
    <section className="space-y-8 text-gray-600 dark:text-gray-300 leading-7">
      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">
          What is a graph calculator?
        </h2>
        <p className="mb-3">
          A graph calculator (or function grapher) evaluates <em>y</em> for many values of <em>x</em> and connects the
          points into a smooth curve on a coordinate plane. It answers questions that raw numbers hide: Is the graph
          U-shaped? Does it cross the x-axis? Where does it climb fastest? Students use graph calculators to check
          homework; professionals use them to sanity-check models before committing to heavier tools.
        </p>
        <p>
          When people search for a <strong className="font-medium text-gray-800 dark:text-white/90">graph calculator online</strong>, they
          usually want speed, zero installation, and controls that feel familiar. This tool is built for that: multiple
          colored traces, clear error messages, and responsive layout on desktop and mobile.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">How to plot functions</h2>
        <p className="mb-3">
          Plotting starts with a valid expression in <em>x</em>. Powers use the caret, e.g.{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">x^2</code>. Common
          functions include <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">sin(x)</code>,{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">cos(x)</code>,{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">tan(x)</code>,{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">log(x)</code> (common
          logarithm), <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">ln(x)</code>,{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">sqrt(x)</code>, and
          parentheses for grouping. After you enter the right-hand side next to “y =”, the plot updates automatically.
        </p>
        <p>
          To <strong className="text-gray-800 dark:text-white/90">adjust what you see</strong>, use the mouse or trackpad:
          scroll to zoom in and out, click-drag on the plot to pan the viewing window, and read the grid and axis
          labels to estimate scale. If an expression is invalid for part of the domain (for example log of a negative
          number), the plotter skips those samples and may show an error banner so you can fix the formula.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">How to use this page</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <strong className="text-gray-800 dark:text-white/90">Enter a function:</strong> type the expression after{' '}
            <strong>y =</strong> (the prefix is optional if you paste without it). Add more lines with{' '}
            <strong>+ Add equation</strong> to compare curves.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Visualize the graph:</strong> watch the 2D plot update
            live; use zoom and pan to inspect neighborhoods, peaks, and crossings.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Adjust variables conceptually:</strong> change the
            formula itself (e.g. from <code className="rounded bg-gray-100 px-1 font-mono text-xs dark:bg-white/10">x^2</code> to{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-xs dark:bg-white/10">2*x^2</code>) to see how coefficients
            stretch or narrow the graph. For 3D, edit <strong>z =</strong> and rotate the surface to read slopes and
            symmetry.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Examples</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-gray-800 dark:text-white/90">Parabola:</strong>{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">y = x^2</code> — opens
            upward with vertex at the origin.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Sine wave:</strong>{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">y = sin(x)</code> — periodic
            oscillation between −1 and 1 (radians as expected by the plotter).
          </li>
          <li>
            <strong className="text-gray-800 dark:text-white/90">Log curve:</strong>{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">y = log(x)</code> — defined
            for positive <em>x</em>; useful for growth that compresses large inputs.
          </li>
        </ul>
        <p className="mt-3">
          Try the built-in example chips on the left for one-click presets, then layer a second equation to compare
          shapes side by side.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-white/90">Benefits</h2>
        <p className="mb-3">
          You get immediate visual feedback, which reduces algebra mistakes and builds intuition. The page is free,
          works in the browser, and pairs well with symbolic work on our{' '}
          <Link href="/scientific-calculator" className="font-medium text-primary-500 hover:underline">
            scientific calculator
          </Link>{' '}
          when you need numeric answers, or the{' '}
          <Link href="/log-calculator" className="font-medium text-primary-500 hover:underline">
            log calculator
          </Link>{' '}
          when you want base-specific logarithms in a form-first workflow.           For more geometry and trig-related tools, browse our{' '}
          <Link href="/math-calculators" className="font-medium text-primary-500 hover:underline">
            trigonometry calculators
          </Link>{' '}
          and other math tools on CalcSuite Pro.
        </p>
        <p>
          Together, 2D plotting plus optional 3D surfaces make this a practical <strong className="font-medium text-gray-800 dark:text-white/90">graph calculator online</strong> for
          previewing functions before exams, presentations, or code—without installing a separate graphing app.
        </p>
      </div>
    </section>
  );
}

export const GRAPH_CALCULATOR_FAQ = [
  {
    q: 'How do I plot a graph with this calculator?',
    a: 'Enter the right-hand side of y = f(x) next to the y = label (or paste the full expression). The graph updates automatically. Use the scroll wheel to zoom and drag on the plot to pan. Add more equations with + Add equation to overlay multiple curves.',
  },
  {
    q: 'What is a function graph?',
    a: 'A function graph is the set of points (x, f(x)) drawn on a coordinate plane. It shows how the output changes as x moves along the horizontal axis, making trends, maxima, and crossings easy to see.',
  },
  {
    q: 'Can I plot multiple graphs at the same time?',
    a: 'Yes. Use + Add equation to create additional rows. Each valid function is drawn in its own color on the same axes so you can compare them directly.',
  },
  {
    q: 'What is the 3D section for?',
    a: 'Below the 2D plot you can graph z = f(x, y) as a surface. Drag to orbit, scroll to zoom, and edit the z = field to explore shapes like paraboloids or ripples.',
  },
  {
    q: 'Is this graph calculator free?',
    a: 'Yes. CalcSuite Pro provides this graph calculator online at no charge in supported browsers.',
  },
] as const;

export function buildGraphFaqJsonLd() {
  return buildCalculatorFaqPageJsonLd(GRAPH_CALCULATOR_FAQ);
}
