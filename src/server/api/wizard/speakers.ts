import { useQuery } from 'h3';
import {
  addSearchTimeToUserEvent,
  addSpeakersToLastSearchOfUserEvent,
  getRandomSpeakersFromTechnologiesAndCategories,
  getUserFromServer
} from '~/server/services';

export default async (req, res) => {
  const user = await getUserFromServer(req);
  const query = useQuery(req);

  if (!query['technologies[]'] || !query['categories[]']) {
    return [];
  }

  await addSearchTimeToUserEvent(user.login);

  const speakers = await getRandomSpeakersFromTechnologiesAndCategories(
    [...new Set(query['technologies[]'])],
    [...new Set(query['categories[]'])]
  );

  await addSpeakersToLastSearchOfUserEvent(user.login, speakers);

  return speakers.map((x, index) => ({
    id: index
  }));
};
