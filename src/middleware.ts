import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that should be accessible only to authenticated users
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
];

// Add paths that should be accessible only to non-authenticated users
const authPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  // Check if the path is protected and user is not authenticated
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if the path is for non-authenticated users and user is authenticated
  if (authPaths.some(path => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 