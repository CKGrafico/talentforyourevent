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

  const technologies = Array.isArray(query['technologies[]'])
    ? query['technologies[]'].map((x) => Number(x))
    : [Number(query['technologies[]'])];

  const categories = Array.isArray(query['categories[]'])
    ? query['categories[]'].map((x) => Number(x))
    : [Number(query['categories[]'])];

  await addSearchTimeToUserEvent(user.login);

  const speakers = await getRandomSpeakersFromTechnologiesAndCategories(technologies, categories);

  await addSpeakersToLastSearchOfUserEvent(user.login, speakers);

  const mappedSpeakers = speakers.map((x, i) => ({
    id: i,
    technologies: x.technologies,
    categories: x.categories
  }));

  return mappedSpeakers;
};
