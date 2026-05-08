import React from 'react';

/**
 * Replaced the fake "Trusted by world's largest companies" logo wall with a
 * factual stats bar. The previous component used generic stock SVGs (br-1.svg
 * → br-7.svg) which damage E-E-A-T trust signals because the brands depicted
 * have no relationship with this site.
 */
const STATS = [
  { value: '200+', label: 'Calculators' },
  { value: 'Free', label: 'To Use' },
  { value: 'No Sign-up', label: 'Required' },
  { value: 'Browser-Based', label: 'Instant Results' },
];

export default function HeroStatsBar() {
  return (
    <div className="wrapper">
      <div className="max-w-[1016px] relative z-30 mx-auto pt-10 pb-14">
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center justify-center bg-white/5 px-4 py-5 text-center"
            >
              <span className="text-base sm:text-lg font-semibold text-white">{stat.value}</span>
              <span className="mt-1 text-xs sm:text-sm text-white/60">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
