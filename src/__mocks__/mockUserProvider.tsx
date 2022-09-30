import type { IUser } from '@/types/user';
import { UserProvider } from '@/helpers/auth/UserContext';
import type { ReactNode } from 'react';

export interface IMockUserProviderProps {
  user: IUser | undefined;
  children: ReactNode;
}

export const MockUserProvider = ({ user, children }: IMockUserProviderProps) => {
  jest.mock('@/api/endpoints/me', () => ({
    me: jest.fn().mockImplementation(async () => user),
  }));

  return <UserProvider>{children}</UserProvider>;
};
