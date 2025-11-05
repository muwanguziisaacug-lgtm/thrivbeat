import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    try {
      // Get session and user data
      const session = await prisma.session.findUnique({
        where: { token: sessionToken },
        include: {
          user: {
            select: { isAdmin: true }
          }
        }
      });
      
      if (!session?.user) {
        return NextResponse.json({ isAdmin: false }, { status: 401 });
      }

      // Get user data directly
      const user = await prisma.user.findUnique({
        where: { id: sessionData.userId },
        select: { isAdmin: true }
      });

      return NextResponse.json({ isAdmin: !!user?.isAdmin });
    } catch (e) {
      console.error('Error decoding session:', e);
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}