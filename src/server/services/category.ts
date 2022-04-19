import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

export async function getAllCategories() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  await prisma.$disconnect();

  return categories;
}
