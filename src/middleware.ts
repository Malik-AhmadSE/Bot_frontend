import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Token')?.value;
  const authPaths = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
  if (authPaths) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return NextResponse.redirect(new URL(`/charts/${payload.userID}`, request.url));
      } catch (error) {
        console.error('JWT verification failed:', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login','/signup','/reset/:path*', '/payment/:path*', '/otp/:path*', '/subscription/:path*', '/charts/:path*', '/api/v1/stripe/:path*'],
};
