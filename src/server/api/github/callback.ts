import { sendRedirect, setCookie, useQuery } from 'h3';
import { GITHUB_TOKEN } from '~/helpers';

export default async (req, res) => {
  const { code } = useQuery(req);

  if (!code) {
    return sendRedirect(res, '/');
  }

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

  return sendRedirect(res, '/wizard');
};
