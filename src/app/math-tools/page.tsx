import type { Metadata } from 'next';
import CalculatorIndexingPage from '@/components/CalculatorIndexingPage';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Math Tools - Free Online Calculators',
  description:
    'Explore free math tools and calculators for percentage and formula-based math problem solving.',
  alternates: { canonical: `${getBaseUrl()}/math-tools` },
};

export default function MathToolsPage() {
  const seoContent = [
    'Math tools are essential for fast and error-free numeric problem solving. Instead of repeating manual arithmetic, users can enter values into online math calculators and receive immediate results. This is useful for students, analysts, educators, and professionals who rely on quick validation for formula-based tasks.',
    'This math tools hub is designed to gather important math calculators in one place. It improves workflow by reducing page-hopping and helping users discover related formula pages through meaningful internal links. Whether you are calculating percentages, checking ratio-like values, or reviewing baseline equations, a dedicated category page gives a cleaner path to the right calculator.',
    'From an SEO perspective, math tools pages act as high-value entry points that connect topical content and calculator pages. By linking to multiple calculators with descriptive anchors, this page supports stronger crawlability and better content relationships across the site. If your workflow extends beyond math, use the category links below to navigate to finance, physics, health, or the full free calculators directory.',
  ];

  return (
    <CalculatorIndexingPage
      title="Math Tools"
      seoContent={seoContent}
      calculators={getCalculatorsByCategory('math')}
    />
  );
}
