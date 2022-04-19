import { useQuery } from 'h3';
import { addSearchTimeToUserSearcher, findTechnologiesByCategories, isUserLogged } from '~/server/services';

export default async (req, res) => {
  const user = await isUserLogged(req);
  const query = useQuery(req);

  if (!query['categories[]']) {
    return [];
  }

  const technologies = await findTechnologiesByCategories([...new Set(query['categories[]'])]);

  await addSearchTimeToUserSearcher(user.login);

  return technologies;
};
