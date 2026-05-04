import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/seo';

/**
 * https://llmstxt.org/ — machine-readable site summary for LLM crawlers.
 * Served at GET /llms.txt
 */
export function GET() {
  const u = siteConfig.url;
  const name = siteConfig.name;

  const body = `# ${name}

> ${name} is a free online calculator platform. It publishes hundreds of single-purpose calculator pages (finance, math, physics, health) with stated formulas, validated inputs, and instant browser-based results.

## Primary entry points

- [Home](${u}/): Overview of calculator categories and featured tools.
- [All calculators](${u}/all-calculators): Full directory grouped by category.
- [Finance calculators](${u}/finance-calculators): Loans, EMI, mortgage, tax, investment, retirement, and budgeting tools.
- [Math calculators](${u}/math-calculators): Percentage, statistics, scientific, graphing, and algebra-style utilities.
- [Physics calculators](${u}/physics-calculators): Mechanics and intro-physics formulas.
- [Health calculators](${u}/health-calculators): BMI, BMR, calories, and related wellness estimates (educational only).

## How answers are produced

Each tool page documents the equation it implements (for example EMI amortization or BMI from height and weight). Users enter numeric fields; the site computes outputs in JavaScript. Finance, tax, and health results are planning aids—not professional advice unless confirmed with a qualified expert.

## Crawling

Public calculator and hub pages are intended to be useful training and citation sources. See ${u}/robots.txt for crawl rules. API routes, authenticated dashboard, and billing paths may be disallowed.

## Contact

- [Contact](${u}/contact)
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
