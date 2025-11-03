import { z } from "zod";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requireSession } from "@/lib/require-session";
import { NextResponse } from "next/server";
import s3 from "@/lib/S3Client";

// --- Schema: validate whole object with superRefine ---
const UploadSchema = z
	.object({
		fileName: z.string().min(1, "fileName is required"),
		contentType: z.string().min(1, "contentType is required"),
		size: z.number().nonnegative("size must be a number"),
		isImage: z.boolean().optional(),
		isVideo: z.boolean().optional(),
	})
	.superRefine((data, ctx) => {
		// Ensure contentType and flags align
		if (data.isImage && !data.contentType.startsWith("image/")) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"contentType does not look like an image but isImage was set",
				path: ["contentType"],
			});
		}
		if (data.isVideo && !data.contentType.startsWith("video/")) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"contentType does not look like a video but isVideo was set",
				path: ["contentType"],
			});
		}

		// Determine max size
		const maxImage = 5 * 1024 * 1024; // 5 MB
		const maxVideo = 1000 * 1024 * 1024; // 1 GB (example)
		const max = data.isImage
			? maxImage
			: data.isVideo
				? maxVideo
				: maxVideo;

		if (data.size > max) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_big,
				maximum: max,
				type: "number",
				inclusive: true,
				message: `File too large (max ${max} bytes)`,
				path: ["size"],
			});
		}
	});

// Arcjet rules
const aj = arcjet
	.withRule(detectBot({ mode: "LIVE", allow: [] }))
	.withRule(fixedWindow({ mode: "LIVE", window: "5m", max: 20 }));

export async function POST(req) {
	const session = await requireSession();

	try {
		const decision = await aj.protect(req, {
			fingerprint: session.user.id,
		});
		if (decision.isDenied()) {
			return NextResponse.json(
				{ error: "Too many requests" },
				{ status: 429 }
			);
		}

		const body = await req.json();
		const { fileName, contentType, size, isVideo } =
			UploadSchema.parse(body);

		// choose bucket (optionally pick different bucket for videos)
		const bucket = process.env.NEXT_PUBLIC_R2_BUCKETNAME; // <-- swap if you use a videos bucket
		const key = `${uuidv4()}-${fileName}`;

		// Note: do NOT include ContentLength here for presigned PUT — client will send real body
		// Keep ContentType if you want the signed URL to require the client to send that header (must match exactly)
		const command = new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			ContentType: contentType,
			// do not set ContentLength here
		});

		const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

		return NextResponse.json({ url, key });
	} catch (err) {
		if (err instanceof z.ZodError) {
			const msg =
				err.errors?.map((e) => e.message).join(", ") ||
				"Validation error";
			return NextResponse.json({ error: msg }, { status: 422 });
		}
		console.error(err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
