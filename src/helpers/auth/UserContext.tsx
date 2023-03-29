import { createContext, useEffect, useState, useMemo, useContext } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';
import type { IUser } from '@/types';
import AwaitLock from 'await-lock';

export interface IUserContext {
  user?: IUser;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

let globalCurrentUser: IUser | undefined;

let globalSetUser: Dispatch<SetStateAction<IUser | undefined>> | undefined;

const _userRefreshLock = new AwaitLock();

export async function getCurrentUser(): Promise<IUser | undefined> {
  await _userRefreshLock.acquireAsync();

  _userRefreshLock.release();

  return globalCurrentUser;
}

export async function refreshUser(): Promise<void> {
  await _userRefreshLock.acquireAsync();

  try {
    const newUser: IUser | undefined = await fetch('/api/me').then((res) => res.json());

    if (newUser?.exp) {
      newUser.exp = new Date(newUser.exp);
    }

    // If the user ids are the same we ensure that current user
    // stays the same object instead of a new one being created
    if (newUser && globalCurrentUser && newUser.id == globalCurrentUser.id) {
      Object.assign(globalCurrentUser, newUser);
    } else {
      globalCurrentUser = newUser;
    }
  } catch {
    globalCurrentUser = undefined;
  } finally {
    _userRefreshLock.release();
  }

  globalSetUser?.(globalCurrentUser);
}

export function logout() {
  globalSetUser?.(undefined);
}

export const UserContext = createContext<IUserContext>({
  refreshUser,
  logout,
});

export interface IUserProviderProps {
  children: ReactNode;
}

/**
 * Custom provider for {@link UserContext} that loads the user from the `/api/me`
 * endpoint on initial mount and then provides the loaded value to all consumers
 */
export const UserProvider = ({ children }: IUserProviderProps) => {
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
