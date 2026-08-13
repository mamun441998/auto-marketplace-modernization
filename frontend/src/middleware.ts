import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// Domains that belong to the PLATFORM itself (not dealer custom domains).
// In production set NEXT_PUBLIC_ROOT_DOMAINS, e.g. "motohave.com,www.motohave.com"
const ROOT_DOMAINS = (process.env.NEXT_PUBLIC_ROOT_DOMAINS || "localhost,127.0.0.1,vercel.app")
  .split(",")
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0]; // strip port

  /*
   * Ignore Next.js internals & static assets (applies to every host)
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
   * ---- Custom domain handling ----
   * If the request is NOT on one of the platform's own domains, treat the
   * hostname as a dealer's custom domain and render that dealer's site.
   */
  const isRootDomain = ROOT_DOMAINS.some((d) => host === d || host.endsWith("." + d));

  if (!isRootDomain) {
    // Already on a /s/ path (e.g. vehicle detail) → let it through.
    if (pathname.startsWith("/s/")) {
      return NextResponse.next();
    }

    try {
      const res = await fetch(`${API}/sites/resolve-domain?domain=${encodeURIComponent(host)}`, {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();

      if (data?.success && data.slug) {
        const url = request.nextUrl.clone();
        url.pathname = `/s/${data.slug}${pathname === "/" ? "" : pathname}`;
        return NextResponse.rewrite(url); // URL bar keeps the custom domain
      }
    } catch {
      /* backend unreachable → fall through to normal handling */
    }

    return NextResponse.next();
  }

  /*
   * ---- Platform (root) domain: your existing logic ----
   */
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  /*
   * Dealer/Admin authentication is handled by AuthContext + Dealer Layout
   * (token in localStorage), so nothing to enforce here.
   */
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};