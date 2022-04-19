import { useQuery } from 'h3';
import { findTechnologiesByCategories, isUserLogged } from '~/server/services';

export default async (req, res) => {
  await isUserLogged(req);
  const query = useQuery(req);

  if (!query['categories[]']) {
    return [];
  }

  const technologies = findTechnologiesByCategories([...new Set(query['categories[]'])]);

  return technologies;
};
