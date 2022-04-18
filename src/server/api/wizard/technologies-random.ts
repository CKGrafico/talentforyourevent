import prismaClient from '@prisma/client';
import { createError, useCookies, useQuery } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  try {
    await githubFetch('/user', {}, useCookies(req)[GITHUB_TOKEN]);
  } catch {
    return createError({ statusCode: 401 });
  }

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
