import prismaClient from '@prisma/client';
import { differenceInDays } from 'date-fns';
const { PrismaClient } = prismaClient;

export const MAX_QUERIES_DAY = 3;

export async function saveLastLoginUserSearcherAndCheckQueriesToday(user: string) {
  const prisma = new PrismaClient();
  const today = new Date();

  const userSearcher = await prisma.userSearcher.findFirst({
    where: {
      github: user
    }
  });

  if (userSearcher && userSearcher.queriesToday >= MAX_QUERIES_DAY) {
    throw new Error('Cannot query more times today');
  }

  if (!userSearcher) {
    await prisma.userSearcher.create({
      github: user,
      lastLogin: today,
      queriesToday: 0
    });
  } else {
    await prisma.userSearcher.update({
      where: {
        github: user
      },
      lastLogin: today,
      queriesToday: differenceInDays(today, userSearcher?.lastLogin) > 0 ? 0 : userSearcher?.lastLogin
    });
  }

  await prisma.$disconnect();
}

export async function addSearchTimeToUserSearcher(user: string) {
  const prisma = new PrismaClient();
  const today = new Date();

  // TODO continue here

  /*
   const userSearcher = await prisma.userSearcher.findOne({
    where: {
      github: user
    }
  });
  */

  await prisma.userSearcher.upsert({
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
