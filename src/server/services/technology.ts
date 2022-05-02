import { prisma } from './db';

export async function findTechnologiesByCategories(categories: number[]) {
  const technologies = await prisma.technology.findMany({
    where: {
      categoryId: { in: categories }
    },
    orderBy: [{ name: 'asc' }]
  });

  await prisma.$disconnect();

  return technologies;
}

export async function getRandomTechnologies(take: number) {
  const itemCount = await prisma.technology.count();
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - take);

  const technologies = prisma.technology.findMany({
    take,
    skip: skip,
    orderBy: { ['id']: 'asc' }
  });

  await prisma.$disconnect();

  return technologies;
}
