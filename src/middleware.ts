import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_PREFIXES = ['/virtuals', '/casinoet'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isBlocked = BLOCKED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isBlocked) {
    return NextResponse.next();
  }

  console.error(`[security] blocked suspicious path ${pathname}`);

  return new NextResponse('Gone', {
    status: 410,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

export const config = {
  matcher: ['/virtuals/:path*', '/casinoet/:path*'],
};
