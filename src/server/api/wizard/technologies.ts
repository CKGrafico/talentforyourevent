import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  const prisma = new PrismaClient();
  const technologies = await prisma.technology.findMany();

  await prisma.$disconnect();

  return technologies;
};
