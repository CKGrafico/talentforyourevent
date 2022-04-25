export type User = { login: string; pendingQueries?: number };

export const FakeUser: User = {
  login: 'fake_user',
  pendingQueries: 3
};
