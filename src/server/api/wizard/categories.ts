import prismaClient from '@prisma/client';
import { createError } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  try {
    await githubFetch('/user', {}, req.headers[GITHUB_TOKEN]);
  } catch {
    return createError({ statusCode: 401 });
  }

  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  await prisma.$disconnect();

  return categories;
};
