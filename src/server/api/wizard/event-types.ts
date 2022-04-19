import prismaClient from '@prisma/client';
import { getAllEventTypes, isUserLogged } from '~/server/services';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  await isUserLogged(req);

  const events = await getAllEventTypes();

  return events;
};
