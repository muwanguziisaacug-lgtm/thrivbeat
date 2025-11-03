import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    // Extract cookie header to pass into auth.api.getSession
    const cookie = req.headers.get('cookie') || '';
    const session = await auth.api.getSession({ headers: { cookie } });

    if (!session) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true, user: session.user });
  } catch (err) {
    console.error('[auth/status] error', err?.message || err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
