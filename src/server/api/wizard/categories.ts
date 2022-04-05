import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  await prisma.$disconnect();

  return categories;
};
