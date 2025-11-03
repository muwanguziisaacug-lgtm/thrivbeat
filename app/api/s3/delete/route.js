import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { s3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const aj = arcjet
	.withRule(
		detectBot({
			mode: "LIVE",
			allow: [],
		})
	)
	.withRule(
		fixedWindow({
			mode: "LIVE",
			window: "1m",
			max: 2,
		})
	);

export async function DELETE(request) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	try {
		const decision = await aj.protect(request, {
			fingerprint: session.user.id,
		});

		if (decision.isDenied()) {
			return NextResponse.json({ error: "Security threat detected " });
		}
		const body = await request.json();
		const key = body.key;
		if (!key) {
			return new Response("Key is required", { status: 400 });
		}

		const command = new DeleteObjectCommand({
			//   Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
			Bucket: process.env.NEXT_PUBLIC_R2_BUCKETNAME,
			Key: key,
		});

		await s3.send(command);
		return new Response("File deleted successfully", { status: 200 });
	} catch (error) {
		return new Response("Failed to delete file", { status: 500 });
	}
}
