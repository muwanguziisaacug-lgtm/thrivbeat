import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { requireSession } from "@/lib/require-session";

export async function GET() {
  try {
    try {
    const session = await requireSession()

      console.log(session)

      if(!session) return NextResponse.json({ isAdmin: false}, { status: 500 });
      // Get session and user data
      // const session = await prisma.user.findUnique({
      //   where: { id: ses.user.id },
      //   include: {
      //     user: {
      //       select: { isAdmin: true }
      //     }
      //   }
      // });
      
      // if (!session?.user) {
      //   return NextResponse.json({ isAdmin: false }, { status: 401 });
      // }

      // Get user data directly
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
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