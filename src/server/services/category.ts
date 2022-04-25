import { prisma } from './db';

export async function getAllCategories() {
  const categories = await prisma.category.findMany();

  await prisma.$disconnect();

  return categories;
}
