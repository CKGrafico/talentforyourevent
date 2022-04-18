// From https://github.com/Atinux/discuss

import { githubFetch, GITHUB_COOKIE, GITHUB_TOKEN } from '~/helpers';

export const useGithubCookie = () => useCookie(GITHUB_TOKEN);

export const useGithubUser = async () => {
  const cookie = useGithubCookie();
  const user = useState(GITHUB_COOKIE);

  if (cookie.value && !user.value) {
    user.value = await githubFetch('/user', {}, useGithubCookie().value);
  }

  return user;
};

export const githubLogin = () => {
  if (process.client) {
    const { GITHUB_CLIENT_ID } = useRuntimeConfig();
    window.location.replace(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=public_repo`);
  }
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
