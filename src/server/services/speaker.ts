import { prisma } from './db';

export async function getRandomSpeakersFromTechnologiesAndCategories(technologies: string[], categories: string[]) {
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
