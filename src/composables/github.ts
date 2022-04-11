// From https://github.com/Atinux/discuss

export const useGithubCookie = () => useCookie('gh_token');

export const githubFetch = (url: string, fetchOptions: any = {}) => {
  return $fetch(url, {
    baseURL: 'https://api.github.com',
    ...fetchOptions,
    headers: {
      Authorization: `token ${useGithubCookie().value}`,
      ...fetchOptions.headers
    }
  });
};

export const useGithubUser = async () => {
  const cookie = useGithubCookie();
  const user = useState('gh_user');
  if (cookie.value && !user.value) {
    user.value = await githubFetch('/user');
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
  useState('gh_user').value = null;
  navigateTo('/');
};

export function checkIfUserIsLogged(user) {
  if (!user?.value) {
    navigateTo('/');
  }
}
