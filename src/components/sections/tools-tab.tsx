'use client';

import type React from 'react';
import { Fragment, useState } from 'react';

import {
  CodeGeneratorIcon,
  EmailGeneratorIcon,
  ImageGeneratorIcon,
  TextGeneratorIcon,
  VideoGeneratorIcon,
} from '@/icons/icons';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  lightImage: string;
  darkImage: string;
  title: string;
  description: string;
}

/**
 * Homepage showcase: highlights real calculator routes (not dev utilities).
 * Images remain generic UI previews; copy and links match the product.
 */
export default function ToolsTab() {
  const [activeTab, setActiveTab] = useState('compound');

  const tabs: Tab[] = [
    {
      id: 'compound',
      label: 'Compound interest',
      href: '/compound-interest-calculator',
      icon: <CodeGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-1.jpg',
      darkImage: '/images/tab-image/tab-image-1-dark.jpg',
      title: 'Compound interest & growth',
      description:
        'Project savings and investments with compounding periods you control. See how rate and time change your balance—ideal for planning and comparing scenarios.',
    },
    {
      id: 'emi',
      label: 'EMI & loans',
      href: '/emi-calculator',
      icon: <TextGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-2.jpg',
      darkImage: '/images/tab-image/tab-image-2-dark.jpg',
      title: 'EMI & loan repayment',
      description:
        'Estimate monthly payments from principal, APR, and term. Pair with mortgage and student-loan tools when you compare financing options.',
    },
    {
      id: 'bmi',
      label: 'BMI & health',
      href: '/bmi-calculator',
      icon: <ImageGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-3.jpg',
      darkImage: '/images/tab-image/tab-image-3-dark.jpg',
      title: 'BMI & wellness metrics',
      description:
        'Check body mass index and related health calculators with visible formulas. Use consistent units and treat results as educational, not medical advice.',
    },
    {
      id: 'scientific',
      label: 'Scientific',
      href: '/scientific-calculator',
      icon: <VideoGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-4.jpg',
      darkImage: '/images/tab-image/tab-image-4-dark.jpg',
      title: 'Scientific calculator',
      description:
        'Evaluate full expressions with trig, logarithms, powers, and roots. Degrees or radians, keyboard-friendly—built for students and technical work.',
    },
    {
      id: 'graph',
      label: 'Graphing',
      href: '/graph-calculator',
      icon: <EmailGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-5.jpg',
      darkImage: '/images/tab-image/tab-image-5-dark.jpg',
      title: 'Graph calculator',
      description:
        'Plot functions to visualize relationships alongside numeric checks. Complements algebra, calculus, and physics study workflows.',
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className="py-14 md:py-28 dark:bg-dark-primary">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            Free online calculators at a glance
          </h2>
          <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Finance, health, math, physics, and advanced tools—each page shows the formula, validates inputs, and runs
            instantly in your browser. Explore hubs like{' '}
            <Link href="/finance-calculators" className="font-medium text-primary-500 hover:underline">
              finance
            </Link>
            ,{' '}
            <Link href="/math-calculators" className="font-medium text-primary-500 hover:underline">
              math
            </Link>
            , and{' '}
            <Link href="/physics-calculators" className="font-medium text-primary-500 hover:underline">
              physics
            </Link>{' '}
            for full coverage.
          </p>
        </div>

        <div className="max-w-[1008px] mx-auto">
          <div>
            <div className="overflow-x-auto custom-scrollbar mx-auto max-w-fit relative">
              <div className="flex gap-2 min-w-max rounded-full bg-gray-100 dark:bg-white/5 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white dark:text-white/90 dark:bg-white/10 text-gray-800'
                        : 'text-gray-500 dark:text-gray-400 bg-transparent'
                    }`}
                  >
                    {tab.icon}
                    <span className="truncate">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 tab-img-bg overflow-hidden rounded-4xl mt-8">
              <div className="p-3 tab-img-overlay">
                {tabs.map((tab) => (
                  <Fragment key={tab.id}>
                    <Image
                      src={tab.lightImage || '/placeholder.svg'}
                      alt={`${tab.label} calculator preview on CalcSuite Pro`}
                      width={936}
                      height={535}
                      className={cn(
                        'w-full rounded-2xl block dark:hidden',
                        currentTab.id !== tab.id && 'hidden!'
                      )}
                      quality={90}
                      priority
                    />

                    <Image
                      src={tab.darkImage || '/placeholder.svg'}
                      alt={`${tab.label} calculator preview (dark theme)`}
                      width={936}
                      height={535}
                      className={cn(
                        'w-full rounded-2xl hidden dark:block',
                        currentTab.id !== tab.id && 'hidden!'
                      )}
                      quality={90}
                      priority
                    />
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                {currentTab.title}
              </h2>
              <p className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400">
                {currentTab.description}
              </p>
              <Link
                href={currentTab.href}
                className="inline-block px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-primary-500 hover:bg-primary-600"
              >
                Open calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
