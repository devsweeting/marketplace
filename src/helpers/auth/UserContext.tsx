import { createContext, useEffect, useState, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IUser } from '../../types/user';
import AwaitLock from 'await-lock';

export interface IUserContext {
  user?: IUser;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export interface IUserProvider {
  children?: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshUser: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

let currentUser: IUser | undefined;

let globalSetUser: Dispatch<SetStateAction<IUser | undefined>> | undefined;

const _lock = new AwaitLock();

export async function getCurrentUser(): Promise<IUser | undefined> {
  await _lock.acquireAsync();

  _lock.release();

  return currentUser;
}

export async function refreshUser(): Promise<void> {
  await _lock.acquireAsync();

  try {
    const newUser = await fetch('/api/me').then((res) => res.json());

    if (newUser) {
      newUser.exp = new Date(newUser.exp);
    }

    // If the user ids are the same we ensure that current user
    // stays the same object instead of a new one being created
    if (newUser && currentUser && newUser.id == currentUser.id) {
      Object.assign(currentUser, newUser);
    } else {
      currentUser = newUser;
    }

    globalSetUser?.(currentUser);
  } catch {
    globalSetUser?.(undefined);
  } finally {
    _lock.release();
  }
}

export function logout() {
  globalSetUser?.(undefined);
}
/**
 * Custom provider for {@link UserContext} that loads the user from the `/api/me`
 * endpoint on initial mount and then provides the loaded value to all consumers
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: IUserProvider) => {
  const [user, setUser] = useState<IUser | undefined>();
  globalSetUser = setUser;

  useEffect(() => {
    refreshUser().catch(() => {
      return;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      refreshUser,
      logout,
    }),
    [user],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
