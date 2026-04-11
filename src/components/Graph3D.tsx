'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { evaluate } from 'mathjs';
import { Suspense, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

/** Strip optional leading `z =` from user input. */
export function normalizeZExpression(raw: string): string {
  return raw.replace(/^\s*z\s*=\s*/i, '').trim();
}

function evalZ(expression: string, x: number, y: number): number | null {
  try {
    const v = evaluate(expression, { x, y, pi: Math.PI, e: Math.E });
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/**
 * Sample z = f(x, y) on a grid and build a Y-up triangle mesh
 * (Three.js Y = mathematical z height; XZ = domain plane).
 */
export function buildSurfaceGeometry(
  expression: string,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  segments: number
): THREE.BufferGeometry | null {
  const expr = normalizeZExpression(expression);
  if (!expr) return null;

  const nx = segments;
  const ny = segments;
  const positions: number[] = [];
  const valid: boolean[] = [];

  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      const x = xMin + ((xMax - xMin) * i) / nx;
      const y = yMin + ((yMax - yMin) * j) / ny;
      const z = evalZ(expr, x, y);
      const ok = z !== null;
      valid.push(ok);
      positions.push(x, ok ? z! : 0, y);
    }
  }

  const idx = (i: number, j: number) => j * (nx + 1) + i;
  const indices: number[] = [];

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = idx(i, j);
      const b = idx(i + 1, j);
      const c = idx(i, j + 1);
      const d = idx(i + 1, j + 1);
      if (valid[a] && valid[b] && valid[c]) {
        indices.push(a, b, c);
      }
      if (valid[b] && valid[d] && valid[c]) {
        indices.push(b, d, c);
      }
    }
  }

  if (indices.length === 0) return null;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

type SurfaceMeshProps = {
  expression: string;
  segments?: number;
  xRange?: readonly [number, number];
  yRange?: readonly [number, number];
};

function SurfaceMesh({
  expression,
  segments = 48,
  xRange = [-3, 3] as const,
  yRange = [-3, 3] as const,
}: SurfaceMeshProps) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const geometry = useMemo(
    () => buildSurfaceGeometry(expression, xMin, xMax, yMin, yMax, segments),
    [expression, xMin, xMax, yMin, yMax, segments]
  );

  useEffect(() => {
    return () => {
      geometry?.dispose();
    };
  }, [geometry]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.12}
        roughness={0.42}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

type Graph3DProps = {
  className?: string;
};

export default function Graph3D({ className }: Graph3DProps) {
  const [expression, setExpression] = useState('x^2 + y^2');
  const [surfaceError, setSurfaceError] = useState<string | null>(null);

  useEffect(() => {
    const g = buildSurfaceGeometry(expression, -3, 3, -3, 3, 20);
    setSurfaceError(
      g
        ? null
        : 'Could not build surface. Use x and y (e.g. x^2 + y^2, sin(x)*cos(y)).'
    );
    g?.dispose();
  }, [expression]);

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            3D surface
          </p>
          <div className="flex max-w-xl min-w-0 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 dark:border-slate-600 dark:bg-slate-800/80">
            <span className="shrink-0 text-xs text-slate-400">z =</span>
            <input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-sm text-slate-800 outline-none dark:text-slate-100"
              spellCheck={false}
              autoComplete="off"
              aria-label="z as a function of x and y"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setExpression('x^2 + y^2')}
            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
          >
            Paraboloid
          </button>
          <button
            type="button"
            onClick={() => setExpression('sin(sqrt(x^2 + y^2))')}
            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
          >
            Ripple
          </button>
          <button
            type="button"
            onClick={() => setExpression('x * y')}
            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
          >
            Saddle
          </button>
        </div>
      </div>

      {surfaceError ? (
        <p
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
          role="alert"
        >
          {surfaceError}
        </p>
      ) : null}

      <div className="h-[min(420px,55vh)] w-full min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-600">
        <Canvas
          className="h-full w-full touch-none"
          camera={{ position: [7.5, 5.5, 7.5], fov: 50, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#0f172a']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={1.15} />
          <Suspense fallback={null}>
            <SurfaceMesh expression={expression} segments={48} />
          </Suspense>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.25, 0]}>
            <planeGeometry args={[24, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={1} metalness={0} />
          </mesh>
          <OrbitControls
            makeDefault
            enableZoom
            enableRotate
            enablePan
            minDistance={4}
            maxDistance={36}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Drag to rotate, scroll to zoom. Ground plane uses{' '}
        <code className="rounded bg-slate-100 px-1 dark:bg-white/10">planeGeometry</code> +{' '}
        <code className="rounded bg-slate-100 px-1 dark:bg-white/10">meshStandardMaterial</code>; the plot is a
        sampled heightfield mesh.
      </p>
    </div>
  );
}
