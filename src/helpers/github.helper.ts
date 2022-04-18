export const githubFetch = (url: string, fetchOptions: any = {}, token: string) => {
  return $fetch(url, {
    baseURL: 'https://api.github.com',
    ...fetchOptions,
    headers: {
      Authorization: `token ${token}`,
      ...fetchOptions.headers
    }
  });
};

export const GITHUB_COOKIE = 'gh_user';
export const GITHUB_TOKEN = 'gh_token';
