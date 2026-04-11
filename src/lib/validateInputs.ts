import type { Calculator } from '@/lib/calculators';

export type FieldIdFn = (slug: string, fieldName: string) => string;

export type ValidateAllResult =
  | { ok: true; payload: Record<string, unknown> }
  | { ok: false; fieldErrors: Record<string, string> };

function isPercentLikeField(name: string): boolean {
  if (name === 'exchangeRate') return false;
  if (name === 'bodyFat') return true;
  if (/Percent$/i.test(name)) return true;
  if (/Rate$/i.test(name)) return true;
  return false;
}

function inferValidationRule(
  calculator: Calculator,
  input: Calculator['inputs'][number]
): { min?: number; max?: number; message?: string; placeholder?: string } | null {
  if (input.type === 'select') return null;

  const n = input.name;
  const label = input.label;
  const ll = label.toLowerCase();

  if (n === 'age') {
    return {
      min: 10,
      max: 120,
      message: 'Age must be between 10 and 120 years',
      placeholder: 'e.g. 25',
    };
  }

  if (n === 'weightKg' || (n === 'weight' && ll.includes('(kg)'))) {
    return {
      min: 30,
      max: 300,
      message: 'Weight must be between 30 and 300 kg',
      placeholder: 'e.g. 70',
    };
  }

  if (n === 'heightM' || (n === 'height' && ll.includes('(m)'))) {
    return {
      min: 1,
      max: 2.5,
      message: 'Height must be between 1 and 2.5 meters',
      placeholder: 'e.g. 1.75',
    };
  }

  if (n === 'height' && ll.includes('(cm)')) {
    return {
      min: 50,
      max: 250,
      message: 'Height must be between 50 and 250 cm',
      placeholder: 'e.g. 170',
    };
  }

  if (n === 'waistCm') {
    return {
      min: 50,
      max: 200,
      message: 'Waist circumference must be between 50 and 200 cm',
      placeholder: 'e.g. 85',
    };
  }

  if (n === 'thighCm') {
    return {
      min: 30,
      max: 150,
      message: 'Thigh circumference must be between 30 and 150 cm',
      placeholder: 'e.g. 55',
    };
  }

  if (n === 'intensity' && calculator.slug === 'heart-rate-calculator') {
    return {
      min: 0,
      max: 1,
      message: 'Intensity must be between 0 and 1',
      placeholder: 'e.g. 0.75',
    };
  }

  if (isPercentLikeField(n)) {
    return {
      min: 0,
      max: 100,
      message: 'Enter a value between 0 and 100',
      placeholder: 'e.g. 5',
    };
  }

  if (n === 'timePeriod') {
    return {
      min: 0,
      max: 100,
      message: 'Time period must be between 0 and 100',
      placeholder: 'e.g. 10',
    };
  }

  return null;
}

function getEffectiveValidation(
  calculator: Calculator,
  input: Calculator['inputs'][number]
): { min?: number; max?: number; message?: string; placeholder?: string } | null {
  const inferred = inferValidationRule(calculator, input);
  const ex = input.validation;
  if (!inferred && !ex) return null;
  return {
    min: ex?.min ?? inferred?.min,
    max: ex?.max ?? inferred?.max,
    message: ex?.message ?? inferred?.message,
    placeholder: ex?.placeholder ?? inferred?.placeholder,
  };
}

export function getFieldPlaceholder(
  calculator: Calculator,
  input: Calculator['inputs'][number]
): string {
  const rule = getEffectiveValidation(calculator, input);
  if (rule?.placeholder) return rule.placeholder;
  if (input.placeholder) return input.placeholder;
  return `Enter ${input.label.toLowerCase()}`;
}

/**
 * Validates already-parsed `values` (keys must exist for fields that passed parsing).
 * Applies each input's `validation` and shared inference rules (age, weight, height, rates, etc.).
 */
export function validateInputs(
  calculator: Calculator,
  values: Record<string, unknown>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const input of calculator.inputs) {
    if (!(input.name in values)) continue;

    if (input.type === 'select') {
      const s = typeof values[input.name] === 'string' ? (values[input.name] as string).trim() : '';
      if (!s) errors[input.name] = 'This field is required';
      continue;
    }

    const value = values[input.name];
    const num = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(num)) {
      errors[input.name] = 'Enter a valid number';
      continue;
    }

    const rule = getEffectiveValidation(calculator, input);
    if (rule) {
      if (rule.min !== undefined && num < rule.min) {
        errors[input.name] = rule.message ?? `Must be at least ${rule.min}`;
      } else if (rule.max !== undefined && num > rule.max) {
        errors[input.name] = rule.message ?? `Must be at most ${rule.max}`;
      }
    }
  }

  return errors;
}

export function readRawFieldValue(
  calculator: Calculator,
  input: Calculator['inputs'][number],
  state: Record<string, number | string>,
  getFieldId: FieldIdFn
): { ok: true; value: number | string } | { ok: false; error: string } {
  const fieldId = getFieldId(calculator.slug, input.name);
  const el = typeof document !== 'undefined' ? document.getElementById(fieldId) : null;

  if (input.type === 'select') {
    let s = '';
    if (el instanceof HTMLSelectElement) s = el.value.trim();
    if (!s) {
      const st = state[input.name];
      if (typeof st === 'string') s = st.trim();
    }
    if (!s) return { ok: false, error: 'This field is required' };
    return { ok: true, value: s };
  }

  let n: number | undefined;
  if (el instanceof HTMLInputElement) {
    const raw = el.value.trim();
    if (raw !== '') {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) n = parsed;
      else return { ok: false, error: 'Enter a valid number' };
    }
  }
  if (n === undefined) {
    const v = state[input.name];
    if (typeof v === 'number' && Number.isFinite(v)) n = v;
  }

  if (n === undefined) {
    return { ok: false, error: 'This field is required' };
  }

  let num = n;
  if (
    calculator.slug === 'visceral-fat-calculator' &&
    input.name === 'heightM' &&
    num >= 100 &&
    num <= 250
  ) {
    num = num / 100;
  }

  if (
    calculator.slug === 'bmi-calculator' &&
    input.name === 'height' &&
    num >= 100 &&
    num <= 250
  ) {
    num = num / 100;
  }

  return { ok: true, value: num };
}

/** Read every field, then apply range rules. */
export function validateCalculatorForm(
  calculator: Calculator,
  state: Record<string, number | string>,
  getFieldId: FieldIdFn
): ValidateAllResult {
  const values: Record<string, unknown> = {};
  const parseErrors: Record<string, string> = {};

  for (const input of calculator.inputs) {
    const r = readRawFieldValue(calculator, input, state, getFieldId);
    if (!r.ok) parseErrors[input.name] = r.error;
    else values[input.name] = r.value;
  }

  const rangeErrors = validateInputs(calculator, values);
  const fieldErrors: Record<string, string> = { ...rangeErrors, ...parseErrors };

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }
  return { ok: true, payload: values };
}
