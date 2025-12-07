import { TestimonialForm } from "@/app/actions/public-actions";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    
    const result = await TestimonialForm(body);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    }
    
    return NextResponse.json(result, { status: 400 });
  } catch (error) {
    console.error('Testimonial submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
