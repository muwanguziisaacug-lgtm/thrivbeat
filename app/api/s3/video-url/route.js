import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/S3Client";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { exerciseId } = body || {};
    if (!exerciseId) return NextResponse.json({ error: "exerciseId required" }, { status: 400 });

    // load exercise and video key
    const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } });
    if (!exercise) return NextResponse.json({ error: "Exercise not found" }, { status: 404 });

    const { videoKey, plan } = exercise;
    if (!videoKey) return NextResponse.json({ error: "No video available" }, { status: 404 });

    // if premium, require session and active subscription
    if (plan === "PREMIUM") {
      // call auth.api.getSession with serialized headers to avoid redirect behaviour
      try {
        const h = headers();
        const headersObj = {};
        if (typeof h.entries === "function") {
          for (const [k, v] of h.entries()) headersObj[k] = v;
        } else {
          const cookie = typeof h.get === "function" ? h.get("cookie") : undefined;
          if (cookie) headersObj.cookie = cookie;
        }

        const session = await auth.api.getSession({ headers: headersObj });
        if (!session || !session.user || !session.user.id) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const sub = await prisma.subscription.findFirst({
          where: {
            userId: session.user.id,
            status: "active",
            OR: [{ endDate: { gt: new Date() } }, { endDate: null }],
          },
        });
        if (!sub) return NextResponse.json({ error: "Not subscribed" }, { status: 403 });
      } catch (err) {
        console.error("video-url: auth check failed", err);
        return NextResponse.json({ error: "Auth check failed" }, { status: 500 });
      }
    }

    // create signed GET url
    const bucket = process.env.AWS_BUCKET;
    if (!bucket) return NextResponse.json({ error: "S3 bucket not configured" }, { status: 500 });

    const command = new GetObjectCommand({ Bucket: bucket, Key: videoKey });
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("/api/s3/video-url error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
