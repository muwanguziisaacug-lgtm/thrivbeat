import SupportEmailTemplate from "@/components/EmailComponents/SupportEmailTemplate";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { success, z } from "zod";

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

		if (!created) return NextResponse.json({ success: false, message: 'Failed to submit' }, { status: 400 });

		await resend.emails.send({
			from: 'THRIVBEAT <onboarding@resend.dev>',
			to: ['muwanguziisaacuganda@gmail.com'],
			subject: 'THIRVBEATS - SUPPORT EMAILS',
			react: SupportEmailTemplate({ name: parsed.name, email: parsed.email, subject: parsed.subject, message: parsed.message })
		})


		return NextResponse.json({ success: true, id: created.id });
	} catch (err) {
		// Zod errors or prisma errors
		const message = err?.message || "Failed to create support message";
		return NextResponse.json({ success: false, message }, { status: 400 });
	}
}
