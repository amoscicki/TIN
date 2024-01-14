import prisma from '@prisma/client';

export const db = prisma?.PrismaClient ? new prisma.PrismaClient() : null;
