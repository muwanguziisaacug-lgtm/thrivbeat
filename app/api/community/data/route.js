import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({ orderBy: { id: 'desc' } });
    const events = await prisma.event.findMany({ orderBy: { id: 'desc' } });
    const featuredMembers = await prisma.featuredMember.findMany({ orderBy: { id: 'desc' } });

    return NextResponse.json({ success: true, gallery, events, featuredMembers });
  } catch (err) {
    console.error("/api/community/data GET error", err);
    return NextResponse.json({ success: false, message: "Failed to fetch community data" }, { status: 500 });
  }
}
