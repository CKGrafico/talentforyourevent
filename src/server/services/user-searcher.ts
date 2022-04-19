import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

export async function addSearchTimeToUserSearcher(user: string) {
  const prisma = new PrismaClient();
  const today = new Date();

  // TODO continue here

  /*
   const userSearcher = await prisma.searcher.findOne({
    where: {
      github: user
    }
  });
  */

  await prisma.searcher.upsert({
    where: {
      github: user
    },
    update: {
      lastQuery: new Date(),
      queriesToday: {
        increment: 1
      }
    },
    create: {
      github: user,
      lastQuery: new Date(),
      queriesToday: 1
    }
  });

  await prisma.$disconnect();
}
