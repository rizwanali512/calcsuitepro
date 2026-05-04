import { cn } from '@/lib/utils';

/**
 * Citation-friendly “Quick answer” block for AI crawlers and readers.
 * Place immediately after the page H1 (or main title) when possible.
 */
type Props = {
  /** Visible heading; defaults to “Quick answer”. */
  heading?: string;
  /** 2–4 short paragraphs; lead each with a self-contained sentence when you can. */
  paragraphs: readonly string[];
  className?: string;
};

export function QuickAnswerBlock({
  heading = 'Quick answer',
  paragraphs,
  className = '',
}: Props) {
  if (paragraphs.length === 0) return null;

  return (
    <section
      className={cn(
        'rounded-2xl border border-indigo-200/90 bg-indigo-50/80 px-5 py-4 sm:px-6 sm:py-5 dark:border-indigo-500/35 dark:bg-indigo-950/40',
        className
      )}
      aria-labelledby="page-quick-answer-heading"
    >
      <h2
        id="page-quick-answer-heading"
        className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200 mb-3"
      >
        {heading}
      </h2>
      <div className="space-y-2.5 text-[15px] sm:text-base leading-relaxed text-gray-900 dark:text-gray-100">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </section>
  );
}
