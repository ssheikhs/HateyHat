import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Fast, optimistic check: no session cookie -> send to login and come back after.
// The (private) layout still verifies the session on the server.
export function proxy(request) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    const { pathname, search } = request.nextUrl;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
    "/profile/:path*",
  ],
};
