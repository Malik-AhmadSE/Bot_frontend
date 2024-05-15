import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const Token=request.cookies.get('Token')?.value;
  const AuthPaths=request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
  if(AuthPaths){
    if(Token){
      return NextResponse.redirect(new URL(`/charts/12345`, request.url))
    }
  }
}
 

export const config = {
  matcher: '/',
}
  // return loading==true ? Loading() : NextResponse.redirect(new URL('/', request.url))
