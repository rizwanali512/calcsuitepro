type InputValues = Record<string, unknown>;

export type CalculationResult =
  | number
  | {
      type: 'fraction';
      numerator: number;
      denominator: number;
      decimal: number;
    }
  | {
      type: 'ratio';
      a: number;
      b: number;
      ratio: string;
    }
  | {
      type: 'stats';
      mean: number;
      median: number;
      mode: number | null;
    }
  | {
      type: 'quadratic';
      root1: number;
      root2: number;
    }
  | null;

type Handler = (values: InputValues) => CalculationResult;

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function getNumbers(values: InputValues, keys: string[]): Record<string, number> | null {
  const result: Record<string, number> = {};
  for (const key of keys) {
    const value = asNumber(values[key]);
    if (value == null) return null;
    result[key] = value;
  }
  return result;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function parseNumberList(values: InputValues): number[] | null {
  const raw = values.numbers;
  if (typeof raw !== 'string') return null;
  const list = raw
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item));
  return list.length > 0 ? list : null;
}

function mean(list: number[]) {
  return list.reduce((sum, n) => sum + n, 0) / list.length;
}

function median(list: number[]) {
  const sorted = [...list].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function mode(list: number[]) {
  const freq = new Map<number, number>();
  for (const n of list) freq.set(n, (freq.get(n) ?? 0) + 1);
  let modeValue: number | null = null;
  let maxCount = 1;
  for (const [key, count] of freq.entries()) {
    if (count > maxCount) {
      maxCount = count;
      modeValue = key;
    }
  }
  return modeValue;
}

const handlers: Record<string, Handler> = {
  'percentage-calculator': (values) => {
    const nums = getNumbers(values, ['value', 'total']);
    if (!nums || nums.total === 0) return null;
    return (nums.value / nums.total) * 100;
  },
  'exponent-calculator': (values) => {
    const nums = getNumbers(values, ['base', 'exponent']);
    if (!nums) return null;
    const result = Math.pow(nums.base, nums.exponent);
    return Number.isFinite(result) ? result : null;
  },
  'root-calculator': (values) => {
    const value = asNumber(values.value);
    const root = asNumber(values.root) ?? asNumber(values.degree);
    if (value == null || root == null || root === 0) return null;
    if (value < 0 && Math.abs(root % 2) !== 1) return null;
    const result = Math.pow(value, 1 / root);
    return Number.isFinite(result) ? result : null;
  },
  'ratio-calculator': (values) => {
    const nums = getNumbers(values, ['a', 'b']);
    if (!nums || nums.b === 0) return null;
    const divisor = gcd(nums.a, nums.b);
    const simplifiedA = nums.a / divisor;
    const simplifiedB = nums.b / divisor;
    return {
      type: 'ratio',
      a: simplifiedA,
      b: simplifiedB,
      ratio: `${simplifiedA}:${simplifiedB}`,
    };
  },
  'fraction-calculator': (values) => {
    // New format requested for fraction calculator.
    const v2 = getNumbers(values, ['numerator1', 'denominator1', 'numerator2', 'denominator2']);
    if (v2) {
      if (v2.denominator1 === 0 || v2.denominator2 === 0) return null;
      const numerator = v2.numerator1 * v2.denominator2 + v2.numerator2 * v2.denominator1;
      const denominator = v2.denominator1 * v2.denominator2;
      if (denominator === 0) return null;
      const divisor = gcd(numerator, denominator);
      const n = numerator / divisor;
      const d = denominator / divisor;
      return { type: 'fraction', numerator: n, denominator: d, decimal: n / d };
    }

    // Backward-compatible format.
    const legacy = getNumbers(values, ['numerator', 'denominator']);
    if (!legacy || legacy.denominator === 0) return null;
    return legacy.numerator / legacy.denominator;
  },
  'scientific-calculator': (values) => {
    const expression = values.expression;
    if (typeof expression !== 'string') return null;
    const safeExpression = expression.trim();
    if (!safeExpression) return null;

    // Allow digits, operators, decimal points, spaces, and parentheses.
    if (!/^[\d+\-*/().\s*]+$/.test(safeExpression)) return null;

    // Prevent unsupported tokens and consecutive unsafe operators.
    if (/([A-Za-z]|[=,;:{}[\]])/.test(safeExpression)) return null;

    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${safeExpression});`)();
    return typeof result === 'number' && Number.isFinite(result) ? result : null;
  },
  'mean-median-mode-range-calculator': (values) => {
    const numbers = parseNumberList(values);
    if (!numbers) return null;
    return {
      type: 'stats',
      mean: mean(numbers),
      median: median(numbers),
      mode: mode(numbers),
    };
  },
  'standard-deviation-calculator': (values) => {
    const numbers = parseNumberList(values);
    if (numbers) {
      const m = mean(numbers);
      const variance = numbers.reduce((acc, n) => acc + Math.pow(n - m, 2), 0) / numbers.length;
      const sd = Math.sqrt(variance);
      return Number.isFinite(sd) ? sd : null;
    }

    // Backward-compatible summary-input support.
    const legacy = getNumbers(values, ['sumSquaredDiff', 'count']);
    if (!legacy || legacy.count <= 0) return null;
    const variance = legacy.sumSquaredDiff / legacy.count;
    if (variance < 0) return null;
    return Math.sqrt(variance);
  },
  'probability-calculator': (values) => {
    const nums = getNumbers(values, ['favorable', 'total']);
    if (!nums || nums.total === 0) return null;
    return nums.favorable / nums.total;
  },
  'quadratic-formula-calculator': (values) => {
    const nums = getNumbers(values, ['a', 'b', 'c']);
    if (!nums || nums.a === 0) return null;
    const discriminant = nums.b * nums.b - 4 * nums.a * nums.c;
    if (discriminant < 0) return null;
    const rootPart = Math.sqrt(discriminant);
    const denominator = 2 * nums.a;
    if (denominator === 0) return null;
    return {
      type: 'quadratic',
      root1: (-nums.b + rootPart) / denominator,
      root2: (-nums.b - rootPart) / denominator,
    };
  },
  'random-number-generator': (values) => {
    const nums = getNumbers(values, ['min', 'max']);
    if (!nums || nums.max < nums.min) return null;
    return nums.min + Math.random() * (nums.max - nums.min);
  },
  // Keep existing widely-used non-math calculators to avoid regressions.
  'compound-interest-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'timePeriod', 'compoundingFrequency']);
    if (!nums || nums.compoundingFrequency === 0) return null;
    const r = nums.interestRate / 100;
    return nums.principal * Math.pow(1 + r / nums.compoundingFrequency, nums.compoundingFrequency * nums.timePeriod);
  },
  'emi-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'tenure']);
    if (!nums || nums.tenure <= 0) return null;
    const r = nums.interestRate / 100 / 12;
    if (r === 0) return null;
    const denominator = Math.pow(1 + r, nums.tenure) - 1;
    if (denominator === 0) return null;
    return (nums.principal * r * Math.pow(1 + r, nums.tenure)) / denominator;
  },
  'mortgage-calculator': (values) => handlers['emi-calculator'](values),
  'loan-calculator': (values) => handlers['emi-calculator'](values),
  'payment-calculator': (values) => handlers['emi-calculator'](values),
  'auto-loan-calculator': (values) => handlers['emi-calculator'](values),
  'student-loan-calculator': (values) => handlers['emi-calculator'](values),
  'roi-calculator': (values) => {
    const nums = getNumbers(values, ['investment', 'returnValue']);
    if (!nums || nums.investment === 0) return null;
    return ((nums.returnValue - nums.investment) / nums.investment) * 100;
  },
  'future-value-calculator': (values) => {
    const nums = getNumbers(values, ['presentValue', 'interestRate', 'timePeriod']);
    if (!nums) return null;
    const r = nums.interestRate / 100;
    return nums.presentValue * Math.pow(1 + r, nums.timePeriod);
  },
  'present-value-calculator': (values) => {
    const nums = getNumbers(values, ['futureValue', 'interestRate', 'timePeriod']);
    if (!nums) return null;
    const denominator = Math.pow(1 + nums.interestRate / 100, nums.timePeriod);
    if (denominator === 0) return null;
    return nums.futureValue / denominator;
  },
  'inflation-calculator': (values) => {
    const modern = getNumbers(values, ['value', 'rate', 'time']);
    if (modern) {
      const denominator = Math.pow(1 + modern.rate / 100, modern.time);
      if (denominator === 0) return null;
      return modern.value / denominator;
    }
    const legacy = getNumbers(values, ['presentCost', 'inflationRate', 'timePeriod']);
    if (!legacy) return null;
    const denominator = Math.pow(1 + legacy.inflationRate / 100, legacy.timePeriod);
    if (denominator === 0) return null;
    return legacy.presentCost / denominator;
  },
  'discount-calculator': (values) => {
    const legacy = getNumbers(values, ['originalPrice', 'discountRate']);
    if (legacy) return legacy.originalPrice - legacy.originalPrice * (legacy.discountRate / 100);
    const modern = getNumbers(values, ['price', 'discountPercent']);
    if (!modern) return null;
    return modern.price - modern.price * (modern.discountPercent / 100);
  },
  'tax-calculator': (values) => {
    const nums = getNumbers(values, ['income', 'taxRate']);
    if (!nums) return null;
    return nums.income * (nums.taxRate / 100);
  },
  'income-tax-calculator': (values) => {
    const nums = getNumbers(values, ['taxableIncome', 'taxRate']);
    if (!nums) return null;
    return nums.taxableIncome * (nums.taxRate / 100);
  },
  'sales-tax-calculator': (values) => {
    const nums = getNumbers(values, ['price', 'taxRate']);
    if (!nums) return null;
    return nums.price * (nums.taxRate / 100);
  },
  'vat-calculator': (values) => {
    const nums = getNumbers(values, ['amount', 'vatRate']);
    if (!nums) return null;
    return nums.amount * (nums.vatRate / 100);
  },
  'budget-calculator': (values) => {
    const nums = getNumbers(values, ['income', 'expenses']);
    if (!nums) return null;
    return nums.income - nums.expenses;
  },
};

export function calculate(slug: string, values: InputValues): CalculationResult {
  try {
    const handler = handlers[slug];
    if (!handler) return null;
    const result = handler(values);
    return result ?? null;
  } catch {
    return null;
  }
}
