import prismaClient from '@prisma/client';
import { useQuery } from 'h3';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  const query = useQuery(req);

  if (!query.category) {
    return [];
  }

  const prisma = new PrismaClient();
  const technologies = await prisma.technology.findMany({
    where: {
      categoryId: Number(query.category.toString())
    }
  });

  await prisma.$disconnect();

  return technologies;
};
