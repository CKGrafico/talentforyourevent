// From https://github.com/Atinux/discuss

import { githubFetch, GITHUB_COOKIE, GITHUB_TOKEN } from '~/helpers';
import { FakeUser, User } from '~/models';

const useGithubCookie = () => useCookie(GITHUB_TOKEN);

export const useGithubUser = async () => {
  const { IS_OFFLINE } = useRuntimeConfig();

  if (IS_OFFLINE) {
    return ref(FakeUser);
  }

  const cookie = useGithubCookie();
  const user = useState<User>(GITHUB_COOKIE);

  if (cookie.value && !user.value) {
    user.value = await githubFetch('/user', {}, cookie.value);
  }

  const userInfoResponse = await $fetch('/api/github/user-info', {
    headers: {
      [GITHUB_TOKEN]: cookie.value
    }
  });

  user.value = { ...user.value, ...userInfoResponse };

  return user;
};

export const githubLogin = () => {
  if (!process.client) {
    return;
  }

  const { GITHUB_CLIENT_ID, IS_OFFLINE } = useRuntimeConfig();
  let url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=public_repo`;

  if (IS_OFFLINE) {
    url = '/api/github/callback?code=offline';
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
