import { UserSpeaker } from '~/models';
import { prisma } from './db';

export const MAX_SPEAKERS_TO_FIND = 3;

export async function getRandomSpeakersFromTechnologiesAndCategories(
  technologies: string[],
  categories: string[]
): Promise<UserSpeaker[]> {
  // TODO:
  // Use event type

  // TODO: This is not good for performance, better to use a join
  const speakersByTechs = await prisma.user.findMany({
    where: {
      OR: [{ technologies: { some: { id: { in: technologies.map((x) => Number(x.toString())) } } } }]
    },
    take: 10,
    orderBy: { id: 'asc' },
    include: {
      categories: {
        select: {
          name: true
        }
      },
      technologies: {
        select: {
          name: true
        }
      }
    }
  });

  const speakersByCategories = await prisma.user.findMany({
    where: {
      OR: [{ categories: { some: { id: { in: categories.map((x) => Number(x.toString())) } } } }]
    },
    take: 10,
    orderBy: { id: 'asc' },
    include: {
      categories: {
        select: {
          name: true
        }
      },
      technologies: {
        select: {
          name: true
        }
      }
    }
  });

  const speakers = [...speakersByTechs, ...speakersByCategories].map((x) => ({
    id: x.id,
    biography: x.biography,
    twitter: x.twitter,
    technologies: x.technologies,
    categories: x.categories
  }));
  const take = MAX_SPEAKERS_TO_FIND;
  const skip = Math.max(0, Math.floor(Math.random() * speakers.length) - take);
  const randomSpeakers = [speakers].slice(skip, take);

  await prisma.$disconnect();

  // TODO..
  return randomSpeakers as any[];
}

export async function getSpeakerFromId(id: number) {
  const speaker = await prisma.user.findFirst({
    where: {
      id: id
    }
  });

  await prisma.$disconnect();

  return speaker;
}
