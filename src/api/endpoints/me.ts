import type { IUser } from '@/types/user';

export const me = (): Promise<IUser | undefined> => {
  return fetch('/api/me').then((res) => res.json());
};
