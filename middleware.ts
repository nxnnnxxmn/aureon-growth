import { NextResponse, type NextRequest } from "next/server";

/**
 * Aureon Command Center — password gate.
 *
 * Auth (interim — replace with NextAuth / Supabase / Clerk before real prod):
 *   - All /app/* routes require a valid `aureon_auth` cookie.
 *   - The cookie is set by /api/app-login after the user posts ADMIN_PASSWORD.
 *   - /app/login and /api/app-login are public so the login flow can run.
 *
 * Also redirects /admin and /command-center to /app for the unified entrypoint.
 */
const PUBLIC_APP_PATHS = ["/app/login"];

function isPublic(pathname: string) {
  return PUBLIC_APP_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Unified entry point
  if (pathname === "/admin" || pathname === "/command-center") {
    return NextResponse.redirect(new URL("/app", req.url));
  }
  if (pathname.startsWith("/admin/") || pathname.startsWith("/command-center/")) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/(admin|command-center)/, "/app"), req.url));
  }

  if (!pathname.startsWith("/app")) return NextResponse.next();
  if (isPublic(pathname)) return NextResponse.next();

  const cookie = req.cookies.get("aureon_auth");
  if (cookie?.value && cookie.value.length > 0) {
    // value match is validated server-side at API. Middleware just enforces presence.
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/app/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*", "/admin", "/command-center/:path*", "/command-center"],
};
