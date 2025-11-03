import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get session token from cookies
    const sessionToken = cookies().get('session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    // Find the session and include user data
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: { select: { isAdmin: true } } }
    });

    // Check if session is valid and not expired
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    return NextResponse.json({ isAdmin: !!session.user?.isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}