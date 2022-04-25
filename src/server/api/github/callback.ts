import { sendRedirect, setCookie, useQuery } from 'h3';
import { githubFetch, GITHUB_TOKEN } from '~/helpers';
import { FakeUser, User } from '~/models';
import { saveLastLoginUserEventAndCheckQueriesToday } from '~/server/services';

export default async (req, res) => {
  const { code } = useQuery(req);

  if (!code) {
    return sendRedirect(res, '/');
  }

  let user = FakeUser;

  if (!process.env.IS_OFFLINE) {
    const response: any = await $fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      }
    });

    if (response.error) {
      return sendRedirect(res, '/');
    }

    setCookie(res, GITHUB_TOKEN, response.access_token, { path: '/' });
    user = await githubFetch<User>('/user', {}, response.access_token);
  }

  try {
    await saveLastLoginUserEventAndCheckQueriesToday(user.login);
    return sendRedirect(res, '/wizard');
  } catch {
    return sendRedirect(res, '/limit');
  }
};
