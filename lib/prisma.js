  import 'server-only';
  import { PrismaClient } from '@prisma/client';
  import { PrismaPg } from '@prisma/adapter-pg';
  import { Pool } from 'pg';

  const globalForPrisma = globalThis;
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }
  const pool = new Pool({ connectionString });

  const adapter = new PrismaPg( pool )

  const prismaClient = new PrismaClient( { adapter });

  export const prisma = globalForPrisma.prisma || prismaClient;

  if (process.env.NODE_ENV !== 'production') {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = prisma;
    }
  }