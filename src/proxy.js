import { NextResponse } from 'next/server';

export default function proxy(request) {
  const path = request.nextUrl.pathname;
  
  // Define protected routes
  const isProtectedRoute = path.startsWith('/admin/dashboard');
  
  // Check auth cookie
  const isAuthenticated = request.cookies.has('admin_session');

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect authenticated users away from login
  if (path === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
