"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // your server auth

export async function requireSession() {
	// Serialize headers to a plain object before using them in async calls
	const h = await headers();

	// Build plain headers object (safer for passing into other libs)
	const headersObj = {};
	try {
		// Prefer entries() when available
		if (typeof h.entries === "function") {
			for (const [k, v] of h.entries()) headersObj[k] = v;
		} else {
			// fallback: try common cookie access
			const cookie =
				typeof h.get === "function" ? h.get("cookie") : undefined;
			if (cookie) headersObj.cookie = cookie;
		}

		// Now call auth.api.getSession with serialized headers
		const session = await auth.api.getSession({ headers: headersObj });

		if (!session) return { success: false, message: "Not Authenticated" };

		return session;
	} catch (err) {
		// Log for debugging (don't expose stack in production)
		console.error("[requireSession] auth.api.getSession error:", err);

		// If we can't validate the session (DB down, etc), redirect to login.
		// This is safer than rendering sensitive pages when session cannot be confirmed.
		redirect("/login");
	}
}
