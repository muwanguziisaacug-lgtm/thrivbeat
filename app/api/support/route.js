import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const supportSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	subject: z.string().min(1),
	message: z.string().min(1),
});

export async function POST(req) {
	try {
		const body = await req.json();
		const parsed = supportSchema.parse(body);

		// IMPORTANT: change `support` to your actual Prisma model name if different
		// e.g. prisma.supportMessage.create or prisma.contact.create etc.
		const created = await prisma.support.create({ data: parsed });

		return NextResponse.json({ success: true, id: created.id });
	} catch (err) {
		// Zod errors or prisma errors
		const message = err?.message || "Failed to create support message";
		return NextResponse.json({ success: false, message }, { status: 400 });
	}
}
