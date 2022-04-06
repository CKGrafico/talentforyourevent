import prismaClient from '@prisma/client';
import { useQuery } from 'h3';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  const query = useQuery(req);

  if (!query['categories[]']) {
    return [];
  }

  // Number(query.category.toString())
  const prisma = new PrismaClient();
  const technologies = await prisma.technology.findMany({
    where: {
      categoryId: { in: [...new Set(query['categories[]'])].map((x) => Number(x.toString())) }
    }
  });

  await prisma.$disconnect();

  return technologies;
};
