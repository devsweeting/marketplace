import type { IUser } from '@/types/user';

export const me = (): Promise<IUser | undefined> => {
  // console.log('me function');
  // console.trace();
  return fetch('/api/me').then((res) => res.json());
};
