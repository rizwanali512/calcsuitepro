'use client';

import { useState } from 'react';

type Props = {
  toolSlug: string;
  input: string;
  output: string;
};

export function ShareResultButton({ toolSlug, input, output }: Props) {
  const [loading, setLoading] = useState(false);
  const [shared, setShared] = useState(false);

  const share = async () => {
    setLoading(true);
    setShared(false);
    try {
      const res = await fetch('/api/tool-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: toolSlug, input, output }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const { id } = await res.json();
      const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${toolSlug}/result/${id}`;
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      disabled={loading}
      className="inline-flex items-center justify-center h-10 px-5 rounded-full font-medium text-sm border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition disabled:opacity-50"
    >
      {loading ? 'Saving…' : shared ? 'Link copied!' : 'Share Result'}
    </button>
  );
}
