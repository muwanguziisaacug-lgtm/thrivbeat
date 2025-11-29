import { NextResponse } from "next/server";

// Protect only the dashboard route
const protectedPaths = ["/dashboard"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if path is protected
  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtectedRoute) {
    // Not a protected route, allow access
    return NextResponse.next();
  }

  // Check for authentication cookie
  const token = request.cookies.get("better-auth.session_token")?.value;

  if (!token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    console.log('Token not found')
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

// Apply middleware only to the dashboard route
export const config = {
  matcher: ["/dashboard/:path*"],
};
