import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import type { IUser } from '../../types/user';

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

export function getCurrentUser(): IUser | undefined {
  return currentUser;
}

export async function refreshUser(): Promise<void> {
  try {
    const newUser = await fetch('/api/me').then((res) => res.json());
    currentUser = newUser;
    globalSetUser?.(newUser);
  } catch {
    globalSetUser?.(undefined);
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
    [user, refreshUser, logout],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
