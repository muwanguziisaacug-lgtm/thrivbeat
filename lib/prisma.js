import 'server-only';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

const prismaClient = new PrismaClient();

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== 'production') {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
  }
}