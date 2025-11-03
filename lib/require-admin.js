import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function requireAdmin() {
  // Get session token from cookies
  const sessionToken = cookies().get('session')?.value;
  
  if (!sessionToken) {
    throw new Error("Unauthorized: Not authenticated");
  }

  // Find the session and include user data
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: { select: { isAdmin: true } } }
  });

  // Check if session is valid and not expired
  if (!session || session.expiresAt < new Date()) {
    throw new Error("Unauthorized: Invalid or expired session");
  }

  if (!session.user?.isAdmin) {
    throw new Error("Unauthorized: Not an admin");
  }

  return true;
}