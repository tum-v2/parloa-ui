import { getIronSession } from 'iron-session';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SessionData, sessionOptions } from './lib/auth/session';
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  // const session: session = await fetch(
  //   `${process.env.serverURL}/api/auth/session`,
  //   {
  //     headers: headers()
  //     // cache: "no-store"
  //   }
  // ).then(async res => await res.json());
  // const token = request.cookies.get('token');
  // // TODO: Validate token, if invalid, redirect to login
  // // const loggedIn = Object.keys(session).length > 0 ? true : false;

  // const isLoggedin = token ? true : false;
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const pathname = request.nextUrl.pathname;
  const isLoggedin = session.isLoggedIn;
  // const token = session.token;
  // const url = request.nextUrl.clone();
  console.log(pathname);
  if (!isLoggedin && pathname !== '/login') {
    // url.pathname = '/login';
    // console.log('redirecting to login');
    // const redirectTo = request.nextUrl.pathname.split('/login')[0];
    // return NextResponse.rewrite(new URL('/login', request.url));
  }

  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  }
  // url.pathname = '/dashboard';
  // return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/simulations/:path*', '/chat/:path*']
};
