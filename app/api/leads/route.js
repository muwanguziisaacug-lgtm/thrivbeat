import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { leadSchema, splitLeadData } from "@/lib/lead-schema";
import { consumeLeadRateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!consumeLeadRateLimit(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 }); }
  if (body?.website) return NextResponse.json({ success: true, id: "accepted" }, { status: 201 });

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted information.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.create({ data: splitLeadData(parsed.data) });
    const to = process.env.LEAD_NOTIFICATION_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;
    if (process.env.RESEND_API_KEY && to && from) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from,
        to,
        subject: `New ${lead.kind.toLowerCase().replace("_", " ")} enquiry — ${lead.name}`,
        text: `A new ThrivBeats enquiry has been stored.\n\nName: ${lead.name}\nEmail: ${lead.email}\nKind: ${lead.kind}\nLead ID: ${lead.id}\n\nReview it in the admin lead queue.`,
      }).catch((error) => console.error("[lead-notification] Delivery failed", error?.message));
    }
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[leads] Unable to store lead", error?.message);
    return NextResponse.json({ error: "We could not submit your enquiry. Please try again." }, { status: 500 });
  }
}
