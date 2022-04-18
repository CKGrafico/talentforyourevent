import prismaClient from '@prisma/client';
import { createError, useCookies } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  try {
    await githubFetch('/user', {}, useCookies(req)[GITHUB_TOKEN]);
  } catch {
    return createError({ statusCode: 401 });
  }

  const prisma = new PrismaClient();

  const events = await prisma.eventType.findMany();

  await prisma.$disconnect();

  return events;
};
