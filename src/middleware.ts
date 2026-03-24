import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Enforce a single canonical host:
 * www.calcsuitepro.com -> calcsuitepro.com
 *
 * This helps avoid duplicate indexing across hosts and prevents SEO dilution.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  if (!host) return NextResponse.next();

  // Skip local dev / preview hosts
  if (host.includes('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  // Redirect www host to apex domain
  if (host === 'www.calcsuitepro.com') {
    const url = req.nextUrl.clone();
    url.host = 'calcsuitepro.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Avoid redirecting Next.js internals and static assets.
  matcher: ['/((?!_next|.*\\..*).*)'],
};

