import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getResult } from '@/lib/result-storage';
import { getCalculatorBySlug } from '@/lib/calculators';
import { getBaseUrl } from '@/lib/site-url';
import { ToolResultView } from './ToolResultView';

type PageProps = {
  params: Promise<{ slug: string; id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, id } = await params;
  const canonical = `${getBaseUrl()}/${slug}/result/${id}`;
  return {
    title: 'Shared Result',
    description: 'View shared calculator result',
    robots: { index: false, follow: false },
    alternates: { canonical },
  };
}

export default async function CalculatorResultPage({ params }: PageProps) {
  const { slug, id } = await params;
  const result = getResult(id);
  if (!result || result.toolSlug !== slug) notFound();

  const calculator = getCalculatorBySlug(slug);
  const calculatorName = calculator?.name ?? slug;

  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${slug}`}
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6"
        >
          ← Back to {calculatorName}
        </Link>
        <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-2xl md:text-3xl">
          {calculatorName} – Shared Result
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          This is a shareable result. Data is stored temporarily.
        </p>
        <ToolResultView
          input={result.input}
          output={result.output}
          slug={slug}
        />
      </div>
    </div>
  );
}
