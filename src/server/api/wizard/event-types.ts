import prismaClient from '@prisma/client';
import { getAllEventTypes, getUserFromServer } from '~/server/services';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  await getUserFromServer(req);

  const events = await getAllEventTypes();

  return events;
};
