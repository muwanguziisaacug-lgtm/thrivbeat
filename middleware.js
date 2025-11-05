import { NextResponse } from "next/server";
import { verifyAdmin } from "./lib/require-admin";

// Separate admin and protected paths
const adminPaths = ["/admin"];
const protectedPaths = ["/dashboard"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if path is admin route
  const isAdminRoute = adminPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Check if path is protected route
  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Check for authentication cookie
  const token = request.cookies.get("better-auth.session_token")?.value;

  if (!token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For admin routes, get the session and verify admin status
  if (isAdminRoute) {
    const headers = Object.fromEntries(request.headers.entries());
    try {
      const response = await fetch(new URL('/api/auth/check-admin', request.url), {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      });
      
      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error('Admin check error:', error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // For admin routes, verify admin status
  if (isAdminRoute) {
    try {
      const adminCheck = await verifyAdmin();
      if (!adminCheck.success) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request
  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
