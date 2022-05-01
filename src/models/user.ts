export type User = { login: string; pendingQueries?: number };
export type UserSpeaker = {
  id: number;
  biography: string;
  twitter: string;
  technologies: {
    name: string;
  };
  categories: {
    name: string;
  };
};

export const FakeUser: User = {
  login: 'fake_user',
  pendingQueries: 3
};
