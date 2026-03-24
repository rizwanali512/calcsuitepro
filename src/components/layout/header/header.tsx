'use client';
import { CloseIcon, MenuIcon } from '@/icons/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DesktopNav from './desktop-nav';
import MainMobileNav from './main-mobile-nav';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';
import { features } from '@/config/features';
import BrandLogo from '@/components/BrandLogo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-[var(--card)]/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 py-2 lg:py-4">
      <div className="px-4 sm:px-6 lg:px-7">
        <div className="grid grid-cols-2 items-center lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center">
            <BrandLogo />
          </div>

          <DesktopNav />

          <div className="flex items-center gap-4 justify-self-end">
            <ThemeToggle />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="order-last shrink-0 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {features.authEnabled && (
              <>
                <Link
                  href="/signin"
                  className="text-sm hidden lg:block font-medium text-gray-700 dark:text-gray-400 hover:text-primary-500"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="lg:inline-flex items-center px-5 py-3 gradient-btn hidden text-sm text-white rounded-full button-bg h-11"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <MainMobileNav isOpen={mobileMenuOpen} />
    </header>
  );
}
