/**
 * Heuristic interpretation for the on-site visceral-fat **proxy** only:
 * (waist_cm / height_m) + (weight_kg / height_m) - (thigh_cm / 10)
 * Not clinical staging; bands are for UX orientation and trend context.
 */
export type VisceralProxyLevel = 'low' | 'normal' | 'high';

export function interpretVisceralFatProxy(score: number): {
  level: VisceralProxyLevel;
  /** User-facing: Low / Normal / High */
  headline: string;
  summary: string;
} {
  if (!Number.isFinite(score)) {
    return {
      level: 'normal',
      headline: 'Normal',
      summary: 'Enter valid measurements to see a range label for this proxy score.',
    };
  }

  if (score < 73) {
    return {
      level: 'low',
      headline: 'Low',
      summary:
        'Your proxy score sits in a lower band for this formula. Many people here have smaller waist-to-stature load in the model—still track trends over time and discuss concerns with a clinician if you have risk factors.',
    };
  }

  if (score <= 98) {
    return {
      level: 'normal',
      headline: 'Normal',
      summary:
        'Your proxy score falls in a middle band for this educational formula. Use consistent weekly measurements to see direction; one reading is never a full picture of health.',
    };
  }

  return {
    level: 'high',
    headline: 'High',
    summary:
      'Your proxy score is in a higher band for this model—often associated with larger waist and weight inputs relative to height in the formula. Consider lifestyle support and professional guidance, especially if you have metabolic symptoms or family history.',
  };
}

/** Visual axis for the on-page range chart (proxy units). */
export const VISCERAL_PROXY_CHART_MIN = 50;
export const VISCERAL_PROXY_CHART_MAX = 130;
