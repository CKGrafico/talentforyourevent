import { useQuery } from 'h3';
import { findTechnologiesByCategories, getUserFromServer } from '~/server/services';

export default async (req, res) => {
  const user = await getUserFromServer(req);
  const query = useQuery(req);

  if (!query['categories[]']) {
    return [];
  }

  const ids = Array.isArray(query['categories[]'])
    ? query['categories[]'].map((x) => Number(x))
    : [Number(query['categories[]'])];

  const technologies = await findTechnologiesByCategories(ids);

  return technologies;
};
