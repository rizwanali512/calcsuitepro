import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sign In',
  alternates: { canonical: `${siteConfig.url}/signin` },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
