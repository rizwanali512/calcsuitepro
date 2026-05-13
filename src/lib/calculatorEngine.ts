import { evaluateScientificExpression } from '@/lib/scientificEvaluate';

type InputValues = Record<string, unknown>;

export type CalculationResult =
  | number
  /** User-visible error (e.g. visceral fat validation). */
  | string
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

/** Monthly loan payment (EMI): principal, annual % APR, term in months. Supports 0% interest. */
function emiMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): number | null {
  if (!Number.isFinite(principal) || principal < 0) return null;
  if (!Number.isFinite(tenureMonths) || tenureMonths <= 0) return null;
  const r = annualRatePercent / 100 / 12;
  if (r === 0) return principal / tenureMonths;
  const growth = Math.pow(1 + r, tenureMonths);
  const denom = growth - 1;
  if (denom === 0) return null;
  return (principal * r * growth) / denom;
}

/** Months to amortize balance to zero at fixed payment and APR (credit card / mortgage payoff). */
function monthsToPayDownLoan(
  balance: number,
  annualAprPercent: number,
  monthlyPayment: number
): number | null {
  if (balance <= 0 || monthlyPayment <= 0) return null;
  const r = annualAprPercent / 100 / 12;
  if (r === 0) {
    const m = balance / monthlyPayment;
    return Number.isFinite(m) && m > 0 ? m : null;
  }
  const minDue = balance * r;
  if (monthlyPayment <= minDue) return null;
  const inner = 1 - (balance * r) / monthlyPayment;
  if (inner <= 0 || inner >= 1) return null;
  const n = Math.log(inner) / Math.log(1 + r);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Max principal for a given monthly payment, APR, and amortization term (months). */
function maxPrincipalFromMonthlyPayment(
  monthlyPayment: number,
  annualRatePercent: number,
  termMonths: number
): number | null {
  if (monthlyPayment <= 0 || termMonths <= 0) return null;
  const r = annualRatePercent / 100 / 12;
  if (r === 0) return monthlyPayment * termMonths;
  const factor = Math.pow(1 + r, termMonths);
  if (factor === 1) return null;
  return (monthlyPayment * (factor - 1)) / (r * factor);
}

function npvUniformCashFlow(
  initialInvestment: number,
  annualCashFlow: number,
  discountRatePercent: number,
  years: number
): number | null {
  if (years < 0 || !Number.isFinite(years)) return null;
  const r = discountRatePercent / 100;
  if (years === 0) return -initialInvestment;
  let sum = 0;
  for (let t = 1; t <= years; t++) {
    sum += annualCashFlow / Math.pow(1 + r, t);
  }
  return -initialInvestment + sum;
}

/** IRR for -I + uniform C at t=1..n (Newton). */
function irrUniformCashFlow(initialInvestment: number, annualCashFlow: number, years: number): number | null {
  if (initialInvestment <= 0 || years <= 0 || !Number.isFinite(years)) return null;
  if (annualCashFlow <= 0) return null;

  let rate = 0.1;
  for (let i = 0; i < 80; i++) {
    let f = -initialInvestment;
    let df = 0;
    for (let t = 1; t <= years; t++) {
      const disc = Math.pow(1 + rate, t);
      f += annualCashFlow / disc;
      df += (-t * annualCashFlow) / ((1 + rate) ** (t + 1));
    }
    if (Math.abs(f) < 1e-7 * Math.max(1, initialInvestment)) return rate * 100;
    if (df === 0 || !Number.isFinite(df)) break;
    const next = rate - f / df;
    if (!Number.isFinite(next)) break;
    if (next <= -0.9999) rate = -0.5;
    else rate = next;
  }
  return null;
}

/** Male = true, female = false; null if missing/invalid. */
function parseGenderIsMale(values: InputValues): boolean | null {
  const raw = values.gender;
  const g = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
  if (g === 'man' || g === 'male' || g === 'm') return true;
  if (g === 'woman' || g === 'female' || g === 'f' || g === 'w') return false;
  return null;
}

function mifflinStJeorBmr(weightKg: number, heightCm: number, age: number, isMale: boolean): number {
  const sexAdj = isMale ? 5 : -161;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + sexAdj;
}

function normalizeHeightMeters(heightRaw: number): number {
  if (heightRaw >= 100 && heightRaw <= 250) return heightRaw / 100;
  return heightRaw;
}

const CALORIE_ACTIVITY_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

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
    const result = evaluateScientificExpression(expression, 'DEG', null);
    return result === 'INVALID' ? null : result;
  },
  'graph-calculator': () => null,
  'logarithm-calculator': (values) => {
    const value = asNumber(values.value);
    const base = asNumber(values.base);
    if (value == null || base == null) return null;
    if (value <= 0 || base <= 0 || base === 1) return null;
    const result = Math.log(value) / Math.log(base);
    return Number.isFinite(result) ? result : null;
  },
  'force-calculator': (values) => {
    const mass = asNumber(values.mass);
    const acceleration = asNumber(values.acceleration);
    if (mass == null || acceleration == null) return null;
    const result = mass * acceleration;
    return Number.isFinite(result) ? result : null;
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
    if (!nums) return null;
    return emiMonthlyPayment(nums.principal, nums.interestRate, nums.tenure);
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
  'simple-interest-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'timePeriod']);
    if (!nums) return null;
    return (nums.principal * nums.interestRate * nums.timePeriod) / 100;
  },
  'profit-margin-calculator': (values) => {
    const nums = getNumbers(values, ['cost', 'revenue']);
    if (!nums || nums.revenue === 0) return null;
    const profit = nums.revenue - nums.cost;
    return (profit / nums.revenue) * 100;
  },
  'savings-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'timePeriod']);
    if (!nums) return null;
    return nums.principal * Math.pow(1 + nums.interestRate / 100, nums.timePeriod);
  },
  'salary-calculator': (values) => {
    const nums = getNumbers(values, ['grossSalary', 'deductions']);
    if (!nums) return null;
    return nums.grossSalary - nums.deductions;
  },
  'sip-calculator': (values) => {
    const nums = getNumbers(values, ['monthlyInvestment', 'annualReturn', 'months']);
    if (!nums || nums.months <= 0) return null;
    const r = nums.annualReturn / 100 / 12;
    if (r === 0) return nums.monthlyInvestment * nums.months;
    const growth = Math.pow(1 + r, nums.months);
    return nums.monthlyInvestment * ((growth - 1) / r) * (1 + r);
  },
  'loan-interest-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'tenure']);
    if (!nums) return null;
    const emi = emiMonthlyPayment(nums.principal, nums.interestRate, nums.tenure);
    if (emi == null) return null;
    return emi * nums.tenure - nums.principal;
  },
  'retirement-calculator': (values) => {
    const nums = getNumbers(values, ['currentSavings', 'monthlyContribution', 'annualReturn', 'years']);
    if (!nums || nums.years < 0) return null;
    const n = Math.round(nums.years * 12);
    const r = nums.annualReturn / 100 / 12;
    const growth = Math.pow(1 + r, n);
    const fromSavings = nums.currentSavings * growth;
    if (r === 0) return fromSavings + nums.monthlyContribution * n;
    const fromContrib = nums.monthlyContribution * ((growth - 1) / r);
    return fromSavings + fromContrib;
  },
  'credit-card-payoff-calculator': (values) => {
    const nums = getNumbers(values, ['balance', 'apr', 'monthlyPayment']);
    if (!nums) return null;
    return monthsToPayDownLoan(nums.balance, nums.apr, nums.monthlyPayment);
  },
  'fixed-deposit-calculator': (values) => handlers['compound-interest-calculator'](values),
  'recurring-deposit-calculator': (values) => {
    const nums = getNumbers(values, ['monthlyDeposit', 'interestRate', 'months']);
    if (!nums || nums.months <= 0) return null;
    const r = nums.interestRate / 100 / 12;
    if (r === 0) return nums.monthlyDeposit * nums.months;
    const growth = Math.pow(1 + r, nums.months);
    return nums.monthlyDeposit * ((growth - 1) / r);
  },
  'break-even-calculator': (values) => {
    const nums = getNumbers(values, ['fixedCost', 'pricePerUnit', 'variableCostPerUnit']);
    if (!nums) return null;
    const margin = nums.pricePerUnit - nums.variableCostPerUnit;
    if (margin <= 0) return null;
    return nums.fixedCost / margin;
  },
  'depreciation-calculator': (values) => {
    const nums = getNumbers(values, ['assetCost', 'salvageValue', 'usefulLife']);
    if (!nums || nums.usefulLife <= 0) return null;
    return (nums.assetCost - nums.salvageValue) / nums.usefulLife;
  },
  'currency-converter-calculator': (values) => {
    const nums = getNumbers(values, ['amount', 'exchangeRate']);
    if (!nums) return null;
    return nums.amount * nums.exchangeRate;
  },
  'cagr-calculator': (values) => {
    const nums = getNumbers(values, ['beginningValue', 'endingValue', 'years']);
    if (!nums || nums.years <= 0 || nums.beginningValue <= 0 || nums.endingValue <= 0) return null;
    return (Math.pow(nums.endingValue / nums.beginningValue, 1 / nums.years) - 1) * 100;
  },
  'npv-calculator': (values) => {
    const nums = getNumbers(values, ['initialInvestment', 'cashFlow', 'discountRate', 'years']);
    if (!nums) return null;
    return npvUniformCashFlow(nums.initialInvestment, nums.cashFlow, nums.discountRate, nums.years);
  },
  'irr-calculator': (values) => {
    const nums = getNumbers(values, ['initialInvestment', 'annualCashFlow', 'years']);
    if (!nums) return null;
    return irrUniformCashFlow(nums.initialInvestment, nums.annualCashFlow, nums.years);
  },
  'payback-period-calculator': (values) => {
    const nums = getNumbers(values, ['initialInvestment', 'annualCashFlow']);
    if (!nums || nums.annualCashFlow <= 0) return null;
    return nums.initialInvestment / nums.annualCashFlow;
  },
  'amortization-calculator': (values) => handlers['emi-calculator'](values),
  'mortgage-payoff-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'monthlyPayment']);
    if (!nums) return null;
    return monthsToPayDownLoan(nums.principal, nums.interestRate, nums.monthlyPayment);
  },
  'house-affordability-calculator': (values) => {
    const nums = getNumbers(values, ['monthlyIncome', 'monthlyExpenses', 'downPayment']);
    if (!nums) return null;
    const surplus = nums.monthlyIncome - nums.monthlyExpenses;
    const maxPayment = Math.max(0, surplus * 0.9);
    const maxLoan = maxPrincipalFromMonthlyPayment(maxPayment, 7, 360);
    if (maxLoan == null) return nums.downPayment;
    return maxLoan + nums.downPayment;
  },
  'refinance-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'oldRate', 'newRate', 'tenure']);
    if (!nums) return null;
    const oldEmi = emiMonthlyPayment(nums.principal, nums.oldRate, nums.tenure);
    const newEmi = emiMonthlyPayment(nums.principal, nums.newRate, nums.tenure);
    if (oldEmi == null || newEmi == null) return null;
    return oldEmi - newEmi;
  },
  'rent-vs-buy-calculator': (values) => {
    const nums = getNumbers(values, ['monthlyRent', 'monthlyMortgage', 'months']);
    if (!nums) return null;
    return nums.monthlyMortgage * nums.months - nums.monthlyRent * nums.months;
  },
  'auto-lease-calculator': (values) => {
    const nums = getNumbers(values, ['vehiclePrice', 'residualValue', 'leaseTerm']);
    if (!nums || nums.leaseTerm <= 0) return null;
    const depreciation = (nums.vehiclePrice - nums.residualValue) / nums.leaseTerm;
    const financeCharge = (nums.vehiclePrice + nums.residualValue) * 0.00125;
    return depreciation + financeCharge;
  },
  'investment-calculator': (values) => {
    const nums = getNumbers(values, ['principal', 'interestRate', 'timePeriod']);
    if (!nums) return null;
    return nums.principal * Math.pow(1 + nums.interestRate / 100, nums.timePeriod);
  },
  'interest-calculator': (values) => handlers['simple-interest-calculator'](values),
  'annuity-calculator': (values) => {
    const nums = getNumbers(values, ['payment', 'interestRate', 'periods']);
    if (!nums || nums.periods <= 0) return null;
    const r = nums.interestRate / 100 / 12;
    if (r === 0) return nums.payment * nums.periods;
    const growth = Math.pow(1 + r, nums.periods);
    return nums.payment * ((growth - 1) / r);
  },
  'pension-calculator': (values) => {
    const nums = getNumbers(values, ['annualContribution', 'interestRate', 'years']);
    if (!nums || nums.years <= 0) return null;
    const r = nums.interestRate / 100;
    if (r === 0) return nums.annualContribution * nums.years;
    const growth = Math.pow(1 + r, nums.years);
    return nums.annualContribution * ((growth - 1) / r);
  },
  'credit-card-calculator': (values) => {
    const nums = getNumbers(values, ['balance', 'apr', 'monthlyPayment']);
    if (!nums) return null;
    return nums.balance * (nums.apr / 100 / 12);
  },
  'debt-payoff-calculator': (values) => {
    const nums = getNumbers(values, ['debt', 'apr', 'monthlyPayment']);
    if (!nums) return null;
    return monthsToPayDownLoan(nums.debt, nums.apr, nums.monthlyPayment);
  },
  'margin-calculator': (values) => {
    const nums = getNumbers(values, ['cost', 'sellingPrice']);
    if (!nums || nums.sellingPrice === 0) return null;
    return ((nums.sellingPrice - nums.cost) / nums.sellingPrice) * 100;
  },
  'commission-calculator': (values) => {
    const nums = getNumbers(values, ['sales', 'commissionRate']);
    if (!nums) return null;
    return nums.sales * (nums.commissionRate / 100);
  },
  'percentage-increase-calculator': (values) => {
    const nums = getNumbers(values, ['oldValue', 'newValue']);
    if (!nums || nums.oldValue === 0) return null;
    return ((nums.newValue - nums.oldValue) / nums.oldValue) * 100;
  },
  'percentage-decrease-calculator': (values) => {
    const nums = getNumbers(values, ['oldValue', 'newValue']);
    if (!nums || nums.oldValue === 0) return null;
    return ((nums.oldValue - nums.newValue) / nums.oldValue) * 100;
  },
  'bmi-calculator': (values) => {
    const nums = getNumbers(values, ['weight', 'height']);
    if (!nums) return null;
    const heightM = normalizeHeightMeters(nums.height);
    if (heightM < 1 || heightM > 2.5 || nums.weight < 30 || nums.weight > 300) return null;
    const bmi = nums.weight / (heightM * heightM);
    if (!Number.isFinite(bmi)) return null;
    return Number(bmi.toFixed(1));
  },
  'bmr-calculator': (values) => {
    const isMale = parseGenderIsMale(values);
    if (isMale === null) return null;
    const nums = getNumbers(values, ['weight', 'heightCm', 'age']);
    if (!nums) return null;
    const { weight, heightCm, age } = nums;
    if (weight < 30 || weight > 300 || heightCm < 50 || heightCm > 250 || age < 10 || age > 120) {
      return null;
    }
    const bmr = mifflinStJeorBmr(weight, heightCm, age, isMale);
    if (!Number.isFinite(bmr) || bmr <= 0 || bmr > 8000) return null;
    return Math.round(bmr);
  },
  'calorie-calculator': (values) => {
    const isMale = parseGenderIsMale(values);
    if (isMale === null) return null;
    const activityRaw = values.activity;
    const activityKey =
      typeof activityRaw === 'string' ? activityRaw.trim().toLowerCase() : '';
    const factor = CALORIE_ACTIVITY_FACTORS[activityKey];
    if (factor == null) return null;

    const nums = getNumbers(values, ['weight', 'heightCm', 'age']);
    if (!nums) return null;
    const { weight, heightCm, age } = nums;
    if (weight < 30 || weight > 300 || heightCm < 50 || heightCm > 250 || age < 10 || age > 120) {
      return null;
    }
    const bmr = mifflinStJeorBmr(weight, heightCm, age, isMale);
    if (!Number.isFinite(bmr) || bmr <= 0 || bmr > 8000) return null;
    const tdee = bmr * factor;
    if (!Number.isFinite(tdee)) return null;
    return Math.round(tdee);
  },
  'body-fat-calculator': (values) => {
    const isMale = parseGenderIsMale(values);
    if (isMale === null) return null;
    const nums = getNumbers(values, ['weight', 'heightCm', 'age']);
    if (!nums) return null;
    const { weight, heightCm, age } = nums;
    if (weight < 30 || weight > 300 || heightCm < 50 || heightCm > 250 || age < 10 || age > 120) {
      return null;
    }
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    if (!Number.isFinite(bmi) || bmi < 10 || bmi > 60) return null;
    const sexCoeff = isMale ? 1 : 0;
    const bodyFat = 1.2 * bmi + 0.23 * age - 10.8 * sexCoeff - 5.4;
    if (!Number.isFinite(bodyFat)) return null;
    const clamped = Math.max(0, Math.min(60, bodyFat));
    return Number(clamped.toFixed(1));
  },
  /**
   * Simple educational estimate (not clinical). Waist/thigh in cm, height in m, weight in kg.
   * visceralFat = (waist / height) + (weight / height) - (thigh / 10)
   */
  'visceral-fat-calculator': (values) => {
    const genderRaw = values.gender;
    const gender =
      typeof genderRaw === 'string' ? genderRaw.trim().toLowerCase() : '';
    const isMale = gender === 'man' || gender === 'male' || gender === 'm';
    const isFemale =
      gender === 'woman' || gender === 'female' || gender === 'f' || gender === 'w';
    if (!isMale && !isFemale) {
      return 'Please complete all fields (gender and all measurements).';
    }

    const nums = getNumbers(values, ['age', 'weightKg', 'heightM', 'waistCm', 'thighCm']);
    if (!nums) {
      return 'Please complete all fields (gender and all measurements).';
    }

    const { age, weightKg, waistCm, thighCm } = nums;
    let heightM = nums.heightM;

    if (heightM >= 100 && heightM <= 250) {
      heightM = heightM / 100;
    }

    if (
      age < 10 ||
      age > 120 ||
      weightKg < 30 ||
      weightKg > 300 ||
      heightM < 1 ||
      heightM > 2.5 ||
      waistCm < 50 ||
      waistCm > 200 ||
      thighCm < 30 ||
      thighCm > 150
    ) {
      return 'Please enter realistic values';
    }

    const visceralFat =
      waistCm / heightM + weightKg / heightM - thighCm / 10;
    if (!Number.isFinite(visceralFat)) {
      return 'Please enter realistic values';
    }

    return Number(visceralFat.toFixed(2));
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
