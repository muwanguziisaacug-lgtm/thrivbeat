import { NextResponse } from "next/server";
import { communityGallery, deleteGallery } from "@/app/actions/public-actions";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await communityGallery(body);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/community/gallery POST error", err);
    return NextResponse.json({ success: false, message: "Failed to create gallery item" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const result = await deleteGallery(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/community/gallery DELETE error", err);
    return NextResponse.json({ success: false, message: "Failed to delete gallery item" }, { status: 500 });
  }
};