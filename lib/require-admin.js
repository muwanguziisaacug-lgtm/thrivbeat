import { requireSession } from "./require-session";
import { prisma } from "./prisma";

export async function verifyAdmin() {
  try {
    const session = await requireSession();
    
    if (!session?.user?.id) {
      console.log('No session or user found');
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

    console.log('Admin check result:', admin);

    if (!admin) {
      console.log('No user found');
      return { success: false, message: 'Failed to Verify'};
    }

    if (!admin.isAdmin) {
      console.log('User is not admin');
      return { success: false, message: 'Not Admin'};
    }

    return { success: true, message: 'Logged In Successfully'};
  } catch (error) {
    console.error('Admin verification error:', error);
    return { success: false, message: 'Internal Server Error'};
  }
}