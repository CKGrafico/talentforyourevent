import { getUserEvent, getUserFromServer, MAX_QUERIES_DAY } from '~/server/services';

export default async (req, res) => {
  try {
    const user = await getUserFromServer(req);

    const userEvent = await getUserEvent(user.login);

    return {
      pendingQueries: MAX_QUERIES_DAY - userEvent.queriesToday
    };
  } catch {
    return {};
  }
};
