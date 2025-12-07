import { NextResponse } from "next/server";
import { communityFeaturedMembers, deleteMember } from "@/app/actions/public-actions";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await communityFeaturedMembers(body);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/community/members POST error", err);
    return NextResponse.json({ success: false, message: "Failed to create featured member" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const result = await deleteMember(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/community/members DELETE error", err);
    return NextResponse.json({ success: false, message: "Failed to delete member" }, { status: 500 });
  }
}
