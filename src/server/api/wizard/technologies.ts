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
