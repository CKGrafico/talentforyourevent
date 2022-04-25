import { prisma } from './db';

export async function findTechnologiesByCategories(categories: string[]) {
  const technologies = await prisma.technology.findMany({
    where: {
      categoryId: { in: categories.map((x) => Number(x.toString())) }
    }
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
