import { createError } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';
import { FakeUser, User } from '~/models';

export async function getUserFromServer(req): Promise<User> {
  if (process.env.IS_OFFLINE) {
    return FakeUser;
  }

  try {
    return await githubFetch('/user', {}, req.headers[GITHUB_TOKEN]);
  } catch {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }
}
