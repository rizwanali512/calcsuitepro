'use client';

import Link from 'next/link';
import { useState } from 'react';

const cardClass =
  'bg-white p-6 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[20px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)]';

type Props = {
  input: string;
  output: string;
  slug: string;
};

export function ToolResultView({ input, output, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-white/90">
          Input
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
          {input || '(empty)'}
        </pre>
      </div>
      <div className={cardClass}>
        <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-white/90">
          Output
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
          {output || '(empty)'}
        </pre>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyResult}
          className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm bg-primary-500 hover:bg-primary-600 text-white transition"
        >
          {copied ? 'Copied!' : 'Copy result'}
        </button>
        <Link
          href={`/${slug}`}
          className="inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
        >
          Edit result
        </Link>
      </div>
    </div>
  );
}
