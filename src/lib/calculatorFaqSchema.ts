/**
 * FAQPage JSON-LD (schema.org) for calculator pages — must match visible FAQ copy.
 * @see https://schema.org/FAQPage
 */
export function buildCalculatorFaqPageJsonLd(
  faqs: ReadonlyArray<{ q: string; a: string }>
): Record<string, unknown> | null {
  const mainEntity = faqs
    .filter((f) => f.q?.trim() && f.a?.trim())
    .map((item) => ({
      '@type': 'Question',
      name: item.q.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.trim(),
      },
    }));

  if (mainEntity.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}
