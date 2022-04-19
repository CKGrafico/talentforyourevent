import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

export async function getAllEventTypes() {
  const prisma = new PrismaClient();
  const events = await prisma.eventType.findMany();

  await prisma.$disconnect();

  return events;
}
