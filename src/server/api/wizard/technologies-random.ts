import prismaClient from '@prisma/client';
import { useQuery } from 'h3';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  const query = useQuery(req);
  const prisma = new PrismaClient();

  const take = Number(query['take']) || 1;

  const itemCount = await prisma.technology.count();
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - take);

  const technologies = prisma.technology.findMany({
    take,
    skip: skip,
    orderBy: { ['id']: 'asc' }
  });

  await prisma.$disconnect();

  return technologies;
};
