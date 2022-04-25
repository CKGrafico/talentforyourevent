import { getAllEventTypes, getUserFromServer } from '~/server/services';

export default async (req, res) => {
  await getUserFromServer(req);

  const events = await getAllEventTypes();

  return events;
};
