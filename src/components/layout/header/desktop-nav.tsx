import { ChevronDown2Icon } from '@/icons/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, type NavItem } from './nav-items';
import { useEffect, useState } from 'react';

export default function DesktopNav() {
  const pathname = usePathname();
  const [activeDropdownKey, setActiveDropdownKey] = useState('');

  function toggleActiveDropdown(key: string) {
    setActiveDropdownKey((prevKey) => (prevKey === key ? '' : key));
  }

  useEffect(() => {
    // Hide dropdown on pathname changes
    setActiveDropdownKey('');
  }, [pathname]);

  return (
    <nav className="hidden lg:flex lg:items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 max-h-fit border border-gray-200 dark:border-slate-700">
      {navItems.map((item: NavItem) => {
        if (item.type === 'link') {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-gray-500 dark:text-gray-400 text-sm px-4 py-1.5 rounded-full hover:text-primary-500 font-medium',
                {
                  'bg-[var(--card)] dark:bg-slate-900 font-medium text-gray-800 dark:text-white/90 shadow-xs':
                    pathname === item.href,
                }
              )}
            >
              {item.label}
            </Link>
          );
        }

        if (item.type === 'dropdown') {
          const toggleThisDropdown = () => {
            toggleActiveDropdown(item.label);
          };

          const isDropdownActive = activeDropdownKey === item.label;

          return (
            <div key={item.label} className="relative">
              <button
                onClick={toggleThisDropdown}
                onMouseEnter={toggleThisDropdown}
                onMouseLeave={toggleThisDropdown}
                onKeyDown={(e) => {
                  if (isDropdownActive && e.key === 'Escape') {
                    toggleThisDropdown();
                  }
                }}
                className={cn(
                  'text-gray-500 dark:text-gray-400 hover:text-primary-500 group text-sm inline-flex gap-1 items-center px-4 py-1.5 font-medium rounded-full',
                  {
                    'bg-[var(--card)] dark:bg-slate-900 font-medium text-gray-800 dark:text-white/90 shadow-xs':
                      item.items.some(({ href }) => pathname?.includes(href)),
                  }
                )}
              >
                <span>{item.label}</span>
                <ChevronDown2Icon
                  className={cn('size-4 transition-transform duration-200', {
                    'rotate-180': isDropdownActive,
                  })}
                />
              </button>

              {isDropdownActive && (
                <div
                  onMouseEnter={toggleThisDropdown}
                  onMouseLeave={toggleThisDropdown}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      toggleThisDropdown();
                    }
                  }}
                  className="absolute right-0 w-[266px] bg-[var(--card)] dark:bg-slate-900 dark:border-slate-700 rounded-2xl shadow-theme-lg border border-gray-200 p-3 z-50"
                >
                  <div className="space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }
      })}
    </nav>
  );
}
