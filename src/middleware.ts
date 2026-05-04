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
  /**
   * Skip middleware for Next internals, API routes, and typical static files.
   * Matches the pattern recommended in the Next.js docs so dev HMR / chunks
   * (`/_next/static/...`, `/_next/webpack-hmr`, etc.) never touch this layer.
   */
  matcher: [
    '/((?!api|_next|favicon\\.ico|.*\\..*).*)',
  ],
};

