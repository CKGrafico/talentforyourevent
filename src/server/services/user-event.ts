import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { UserSpeaker } from '~/models';
import { prisma } from './db';

export const MAX_QUERIES_DAY = 3;

export async function getUserEvent(userLogin: string) {
  const userEvent = await prisma.userEvent.findFirst({
    where: {
      github: userLogin
    }
  });

  await prisma.$disconnect();

  return userEvent;
}

export async function saveLastLoginUserEventAndCheckQueriesToday(userLogin: string) {
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
      queriesToday: 0,
      lastUsersSearchIds: ''
    }
  });

  await prisma.$disconnect();
}

export async function addSearchTimeToUserEvent(userLogin: string) {
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

  await prisma.userEvent.update({
    where: {
      github: userLogin
    },
    data: {
      lastQuery: today,
      revealedNow: 0,
      queriesToday: isFromYesterday
        ? 1
        : {
            increment: 1
          }
    }
  });

  await prisma.$disconnect();
}

export async function addSpeakersToLastSearchOfUserEvent(userLogin: string, speakers: UserSpeaker[]) {
  await prisma.userEvent.update({
    where: {
      github: userLogin
    },
    data: {
      lastUsersSearchIds: speakers.map((x) => x.id).join(',')
    }
  });

  await prisma.$disconnect();
}

export async function addRevealedToUser(userLogin: string) {
  await prisma.userEvent.update({
    where: {
      github: userLogin
    },
    data: {
      revealedNow: {
        increment: 1
      }
    }
  });

  await prisma.$disconnect();
}
