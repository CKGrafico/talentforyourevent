import { useQuery } from 'h3';
import { findTechnologiesByCategories, getUserFromServer } from '~/server/services';

export default async (req, res) => {
  const user = await getUserFromServer(req);
  const query = useQuery(req);

  if (!query['categories[]']) {
    return [];
  }

  const technologies = await findTechnologiesByCategories([...new Set(query['categories[]'])]);

  return technologies;
};
