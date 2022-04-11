import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

export default async (req, res) => {
  const prisma = new PrismaClient();
  const events = await prisma.eventType.findMany();

  await prisma.$disconnect();

  return events;
};
