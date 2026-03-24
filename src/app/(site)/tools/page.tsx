import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getBaseUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Tools Redirect',
  description: 'Redirecting to all calculators.',
  alternates: { canonical: `${getBaseUrl()}/all-calculators` },
  robots: { index: false, follow: true },
};

export default function LegacyToolsPage() {
  redirect('/all-calculators');
}
