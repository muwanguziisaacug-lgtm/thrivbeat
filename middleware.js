import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function middleware(request) {
  // Check if the current route is an admin route
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  try {
    // Get the session token from cookies
    const sessionToken = request.cookies.get('session')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify session and get user
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: { select: { isAdmin: true } } }
    });

    // Check if session is valid and not expired
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // For admin routes, check if the user is an admin
    if (isAdminRoute && !session.user?.isAdmin) {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*" // Added admin routes to the matcher
  ]
};