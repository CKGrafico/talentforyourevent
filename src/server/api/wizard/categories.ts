import { getAllCategories, getUserFromServer } from '~/server/services';

export default async (req, res) => {
  await getUserFromServer(req);

  const categories = await getAllCategories();

  return categories;
};
