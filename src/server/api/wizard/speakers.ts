import { useQuery } from 'h3';
import { getRandomSpeakersFromTechnologiesAndCategories, isUserLogged } from '~/server/services';

export default async (req, res) => {
  const user = await isUserLogged(req);
  const query = useQuery(req);

  if (!query['technologies[]'] || !query['categories[]']) {
    return [];
  }

  const speakers = await getRandomSpeakersFromTechnologiesAndCategories(
    [...new Set(query['technologies[]'])],
    [...new Set(query['categories[]'])]
  );

  // TODO anonymize speakers

  return speakers;
};
