import { useQuery } from 'h3';
import { getRandomTechnologies } from '~/server/services';

export default async (req, res) => {
  const query = useQuery(req);
  const take = Number(query['take']) || 1;

  const technologies = await getRandomTechnologies(take);

  return technologies;
};
