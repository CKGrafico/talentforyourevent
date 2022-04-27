import { prisma } from './db';

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: [{ name: 'asc' }]
  });

  await prisma.$disconnect();

  return categories;
}
