import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/solutions",
  "/blog",
  "/careers",

  "/sign-in",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Ignore Next.js internals & static assets
   */

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/uploads") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  /*
   * Public Routes
   */

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  /*
   * Dealer/Admin authentication
   *
   * Authentication is currently handled
   * by AuthContext + Dealer Layout
   * because the access token is stored
   * inside localStorage.
   */

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};