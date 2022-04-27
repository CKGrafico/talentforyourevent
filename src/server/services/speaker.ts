import { prisma } from './db';

export async function getRandomSpeakersFromTechnologiesAndCategories(technologies: string[], categories: string[]) {
  // TODO:
  // Use event type
  // priorize technologies over categories

  const speakers = await prisma.user.findMany({
    where: {
      OR: [
        { categories: { some: { id: { in: categories.map((x) => Number(x.toString())) } } } },
        { technologies: { some: { id: { in: technologies.map((x) => Number(x.toString())) } } } }
      ]
    }
  });

  await prisma.$disconnect();

  return speakers;
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
