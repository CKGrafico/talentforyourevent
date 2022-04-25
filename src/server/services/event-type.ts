import { prisma } from './db';

export async function getAllEventTypes() {
  const events = await prisma.eventType.findMany();

  await prisma.$disconnect();

  return events;
}
