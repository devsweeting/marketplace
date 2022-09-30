import type { IUser } from '@/types/user';

export function me(): Promise<IUser | undefined> {
  return fetch('/api/me').then((res) => res.json());
}
