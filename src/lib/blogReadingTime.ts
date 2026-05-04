/** ~200 words per minute for online technical reading. */
const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return Math.min(25, Math.max(1, minutes));
}
