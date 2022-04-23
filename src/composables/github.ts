// From https://github.com/Atinux/discuss

import { githubFetch, GITHUB_COOKIE, GITHUB_TOKEN } from '~/helpers';
import { User } from '~/models';

export const useGithubCookie = () => useCookie(GITHUB_TOKEN);

export const useGithubUser = async () => {
  const { IS_OFFLINE } = useRuntimeConfig();

  if (IS_OFFLINE) {
    return ref({ login: 'fake_user' } as User);
  }

  const cookie = useGithubCookie();
  const user = useState<User>(GITHUB_COOKIE);

  if (cookie.value && !user.value) {
    user.value = await githubFetch('/user', {}, useGithubCookie().value);
  }

  return user;
};

export const githubLogin = () => {
  if (!process.client) {
    return;
  }

  const { GITHUB_CLIENT_ID, IS_OFFLINE } = useRuntimeConfig();
  let url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=public_repo`;

  if (IS_OFFLINE) {
    url = '/wizard';
  }

  window.location.replace(url);
};

export const githubLogout = async () => {
  useGithubCookie().value = null;
  useState(GITHUB_COOKIE).value = null;
  navigateTo('/');
};

export function checkIfUserIsLogged(user) {
  if (!user?.value) {
    navigateTo('/');
  }
}
