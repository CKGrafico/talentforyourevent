import prismaClient from '@prisma/client';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
const { PrismaClient } = prismaClient;

export const MAX_QUERIES_DAY = 3;

export async function saveLastLoginUserEventAndCheckQueriesToday(userLogin: string) {
  const prisma = new PrismaClient();
  const today = startOfDay(new Date());

  const userEvent = await prisma.userEvent.findFirst({
    where: {
      github: userLogin
    }
  });

  const isFromYesterday = differenceInDays(today, userEvent?.lastQuery) > 0;

  if (userEvent && !isFromYesterday && userEvent.queriesToday >= MAX_QUERIES_DAY) {
    throw new Error('Cannot query more times today');
  }

  await prisma.userEvent.upsert({
    where: { github: userLogin },
    update: {
      lastLogin: today,
      queriesToday: isFromYesterday ? 0 : userEvent?.queriesToday
    },
    create: {
      github: userLogin,
      lastLogin: today,
      lastQuery: addDays(today, -1),
      queriesToday: 0
    }
  });

  await prisma.$disconnect();
}

export async function addSearchTimeToUserEvent(user: string) {
  const prisma = new PrismaClient();
  const today = startOfDay(new Date());

  const userEvent = await prisma.userEvent.findFirst({
    where: {
      github: user
    }
  });

  const isFromYesterday = differenceInDays(today, userEvent?.lastQuery) > 0;

  if (userEvent && !isFromYesterday && userEvent.queriesToday >= MAX_QUERIES_DAY) {
    throw new Error('Cannot query more times today');
  }

  await prisma.userEvent.update({
    where: {
      github: user
    },
    data: {
      lastQuery: today,
      queriesToday: isFromYesterday
        ? 1
        : {
            increment: 1
          }
    }
  });

  await prisma.$disconnect();
}
