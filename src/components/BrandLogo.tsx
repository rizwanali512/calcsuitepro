'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 whitespace-nowrap transition-opacity hover:opacity-90"
    >
      <Image
        src="/images/logo.png"
        alt="CalcSuite Pro"
        width={32}
        height={32}
        className="h-8 w-auto shrink-0"
      />
      <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
        CalcSuite
        <span className="text-primary-500"> Pro</span>
      </span>
    </Link>
  );
}
