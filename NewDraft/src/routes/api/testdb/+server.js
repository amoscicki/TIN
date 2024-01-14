import prisma from '@prisma/client';

export async function GET() {
  try {
    const db = await new prisma.PrismaClient();
    await db.$connect();
    return new Response('Database responded', { status: 200 });
  } catch (e) {
    prisma.$disconnect();
    return new Response('Database unavailable ' + e.message, { status: 500 });
  }
}
