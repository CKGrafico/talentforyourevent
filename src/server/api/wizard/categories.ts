import prismaClient from '@prisma/client';
import { getAllCategories, isUserLogged } from '~/server/services';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  await isUserLogged(req);

  const categories = await getAllCategories();

  return categories;
};
