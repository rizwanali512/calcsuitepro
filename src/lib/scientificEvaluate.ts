import { evaluate } from 'mathjs';

export type AngleMode = 'DEG' | 'RAD';

function preprocessPercent(expr: string): string {
  return expr.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error('factorial');
  if (n <= 1) return 1;
  if (n > 170) throw new Error('factorial');
  return n * factorial(n - 1);
}

export function evaluateScientificExpression(
  raw: string,
  angleMode: AngleMode,
  ansValue: number | null
): number | 'INVALID' {
  const expr = preprocessPercent(raw).trim();
  if (!expr) return 'INVALID';
  if (/\bAns\b/.test(expr) && ansValue == null) return 'INVALID';

  const toRad = (x: number) => (x * Math.PI) / 180;
  const fromRad = (r: number) => (angleMode === 'DEG' ? (r * 180) / Math.PI : r);

  const trigIn =
    angleMode === 'DEG'
      ? {
          sin: (x: number) => Math.sin(toRad(x)),
          cos: (x: number) => Math.cos(toRad(x)),
          tan: (x: number) => Math.tan(toRad(x)),
        }
      : {
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
        };

  const scope = {
    ...trigIn,
    asin: (x: number) => fromRad(Math.asin(x)),
    acos: (x: number) => fromRad(Math.acos(x)),
    atan: (x: number) => fromRad(Math.atan(x)),
    pi: Math.PI,
    e: Math.E,
    Ans: ansValue ?? 0,
    factorial,
    ln: Math.log,
    log10: Math.log10,
    sqrt: Math.sqrt,
  };

  try {
    const v = evaluate(expr, scope);
    const num = typeof v === 'number' ? v : Number(v);
    if (!Number.isFinite(num)) return 'INVALID';
    return num;
  } catch {
    return 'INVALID';
  }
}

export function formatScientificNumber(n: number): string {
  if (!Number.isFinite(n)) return '';
  const ax = Math.abs(n);
  if (ax !== 0 && (ax >= 1e12 || ax < 1e-6)) return n.toExponential(8).replace(/\.?0+e/, 'e');
  const rounded = Number.parseFloat(n.toPrecision(14));
  return String(rounded);
}
