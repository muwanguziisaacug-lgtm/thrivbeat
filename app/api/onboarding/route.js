
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId: bodyUserId, ...data } = body;

    // Try to get authenticated user from session (cookie)
    const cookie = req.headers.get("cookie") || undefined;
    let sessionUserId = null;
    if (cookie) {
      try {
        const session = await auth.api.getSession({ headers: { cookie } });
        sessionUserId = session?.user?.id || session?.userId || null;
      } catch (e) {
        // ignore session errors; fall back to body userId
      }
    }

    const userId = sessionUserId || bodyUserId;
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 401 });
    }

    // Upsert onboarding info for user
    const onboarding = await prisma.onboarding.upsert({
      where: { userId },
      update: { ...data },
      create: { userId, ...data },
    });

    return NextResponse.json({ success: true, onboarding });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId");

  // Try to get userId from session if not provided in query
  const cookie = req.headers.get("cookie") || undefined;
  let sessionUserId = null;
  if (!userIdParam && cookie) {
    try {
      const session = await auth.api.getSession({ headers: { cookie } });
      sessionUserId = session?.user?.id || session?.userId || null;
    } catch (e) {
      // ignore
    }
  }

  const userId = userIdParam || sessionUserId;
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 401 });
  }

  try {
    const onboarding = await prisma.onboarding.findUnique({ where: { userId } });
    if (!onboarding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ onboarding });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
