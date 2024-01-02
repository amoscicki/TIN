import prisma from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new prisma.PrismaClient();

const seedData = async () => {
  await db.role.create({
    data: {
      name: 'admin'
    }
  });

  await db.role.create({
    data: {
      name: 'user'
    }
  });

  await db.user.create({
    data: {
      email: 'admin@fq.admin',
      passwordHash: await bcrypt.hash('admin', 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: 'admin' } }
    }
  });

  await db.user.create({
    data: {
      email: 'user@fq.user',
      passwordHash: await bcrypt.hash('user', 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: 'user' } }
    }
  });

  await prisma.$disconnect();
};

seedData().catch((error) => {
  console.error(error);
  process.exit(1);
});
