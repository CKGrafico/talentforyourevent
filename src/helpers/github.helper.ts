export const GITHUB_COOKIE = 'gh_user';
export const GITHUB_TOKEN = 'gh_token';

export function githubFetch<T>(url: string, fetchOptions: any = {}, token: string) {
  return $fetch<T>(url, {
    baseURL: 'https://api.github.com',
    ...fetchOptions,
    headers: {
      Authorization: `token ${token}`,
      ...fetchOptions.headers
    }
  });
}
