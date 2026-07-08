import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cheap edge gate for /admin. This only checks for the presence of the session
// cookie to avoid the latency of JWT verification on the edge. The page itself
// calls requireSession(), which does the real cryptographic verification.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!request.cookies.has("vael_session")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
