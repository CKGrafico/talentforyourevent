import { createError } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';

export async function isUserLogged(req) {
  try {
    await githubFetch('/user', {}, req.headers[GITHUB_TOKEN]);
  } catch {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }
}
