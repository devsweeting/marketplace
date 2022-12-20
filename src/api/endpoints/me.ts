import type { IUser } from '@/types';

export const me = (): Promise<IUser | undefined> => {
  return fetch('/api/me').then((res) => res.json());
};
