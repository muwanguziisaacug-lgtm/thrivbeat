import { requireSession } from "./require-session";
import { prisma } from "./prisma";

export async function verifyAdmin() {
  try {
    const session = await requireSession();
    
    if (!session?.user?.id) {
      return { success: false, message: 'Not Authenticated' };
    }

    const admin = await prisma.user.findUnique({
      where: { 
        id: session.user.id 
      },
      select: {
        isAdmin: true,
      },
    });


    if (!admin) {
      return { success: false, message: 'Failed to Verify'};
    }

    if (!admin.isAdmin) {
      return { success: false, message: 'Not Admin'};
    }

    return { success: true, message: 'Logged In Successfully'};
  } catch (error) {
    console.error('Admin verification error:', error);
    return { success: false, message: 'Internal Server Error'};
  }
}