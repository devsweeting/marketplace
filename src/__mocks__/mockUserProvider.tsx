import type { IUser } from '@/types/user';
import { UserProvider } from '@/helpers/auth/UserContext';
import type { ReactNode } from 'react';
import * as meEndpoint from '@/api/endpoints/me';

export interface IMockUserProviderProps {
  user: IUser | undefined;
  children: ReactNode;
}

let globalUser: IUser | undefined;

jest.mock('@/api/endpoints/me', () => ({
  me: jest.fn().mockImplementation(async () => globalUser),
}));

export const MockUserProvider = ({ user, children }: IMockUserProviderProps) => {
  globalUser = user;

  return <UserProvider>{children}</UserProvider>;
};
