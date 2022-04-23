import prismaClient from '@prisma/client';
import { getAllCategories, getUserFromServer } from '~/server/services';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  await getUserFromServer(req);

  const categories = await getAllCategories();

  return categories;
};
