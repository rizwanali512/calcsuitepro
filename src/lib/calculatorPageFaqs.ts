/**
 * Server-safe FAQ list for calculator routes. Must stay in sync with the
 * visible FAQ section in CalculatorTemplate (same questions and answers).
 */

import type { Calculator } from '@/lib/calculators';
import type { FaqEntry } from '@/lib/schema';
import { GRAPH_CALCULATOR_FAQ } from '@/components/GraphCalculatorPageContent';
import { SCIENTIFIC_CALCULATOR_FAQ } from '@/components/ScientificCalculatorPageContent';
import { VISCERAL_FAT_CALCULATOR_FAQ } from '@/components/VisceralFatCalculatorEnhancements';
import { VELOCITY_CALCULATOR_FAQ } from '@/components/VelocityCalculatorPageContent';
import { PRESSURE_CALCULATOR_FAQ } from '@/components/PressureCalculatorPageContent';
import { GRAVITATIONAL_FORCE_CALCULATOR_FAQ } from '@/components/GravitationalForceCalculatorPageContent';

function fromQa(items: ReadonlyArray<{ q: string; a: string }>): FaqEntry[] {
  return items
    .map((item) => ({
      question: item.q.trim(),
      answer: item.a.trim(),
    }))
    .filter((entry) => entry.question.length > 0 && entry.answer.length > 0);
}

/**
 * FAQ pairs for JSON-LD (`generateFAQSchema`) and Rich Results testing.
 * Mirrors `faqItems` inside CalculatorTemplate.tsx.
 */
export function getCalculatorFaqEntries(calculator: Calculator): FaqEntry[] {
  if (calculator.slug === 'scientific-calculator') {
    return fromQa(SCIENTIFIC_CALCULATOR_FAQ);
  }
  if (calculator.slug === 'graph-calculator') {
    return fromQa(GRAPH_CALCULATOR_FAQ);
  }
  if (calculator.slug === 'visceral-fat-calculator') {
    return fromQa(VISCERAL_FAT_CALCULATOR_FAQ);
  }
  if (calculator.slug === 'velocity-calculator') {
    return fromQa(VELOCITY_CALCULATOR_FAQ);
  }
  if (calculator.slug === 'pressure-calculator') {
    return fromQa(PRESSURE_CALCULATOR_FAQ);
  }
  if (calculator.slug === 'gravitational-force-calculator') {
    return fromQa(GRAVITATIONAL_FORCE_CALCULATOR_FAQ);
  }

  return fromQa([
    {
      q: `What is a ${calculator.name.toLowerCase()}?`,
      a: `${calculator.name} helps you apply the formula "${calculator.formula}" quickly using your own values.`,
    },
    {
      q: `When should I use this ${calculator.name.toLowerCase()}?`,
      a: `Use it when you need quick and repeatable ${calculator.category} calculations without manual errors.`,
    },
    {
      q: 'How accurate are the results?',
      a: 'Results are formula-based and depend on entering correct values with the right units.',
    },
    {
      q: 'Why am I seeing an invalid input message?',
      a: 'One or more required values are missing, non-numeric, or caused a divide-by-zero condition.',
    },
    {
      q: 'Is this calculator free to use?',
      a: 'Yes. You can use this calculator online for free.',
    },
  ]);
}
