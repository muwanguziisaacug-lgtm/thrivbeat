import { NextResponse } from "next/server";
import { communityEvents, deleteEvent } from "@/app/actions/public-actions";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await communityEvents(body);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/community/events POST error", err);
    return NextResponse.json({ success: false, message: "Failed to create event" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const result = await deleteEvent(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/community/events DELETE error", err);
    return NextResponse.json({ success: false, message: "Failed to delete event" }, { status: 500 });
  }
}
