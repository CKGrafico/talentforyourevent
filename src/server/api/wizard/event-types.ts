import prismaClient from '@prisma/client';
import { createError } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  try {
    await githubFetch('/user', {}, req.headers[GITHUB_TOKEN]);
  } catch (e) {
    return createError({ statusCode: 401 });
  }

  const prisma = new PrismaClient();

  const events = await prisma.eventType.findMany();

  await prisma.$disconnect();

  return events;
};
