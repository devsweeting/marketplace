import { createContext, useCallback, useEffect, useState, useMemo } from 'react';
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

/**
 * Custom provider for {@link UserContext} that loads the user from the `/api/me`
 * endpoint on initial mount and then provides the loaded value to all consumers
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: IUserProvider) => {
  const [user, setUser] = useState<IUser | undefined>();

  const refreshUser = useCallback(async () => {
    try {
      const newUser = await fetch('/api/me').then((res) => res.json());

      setUser(newUser);
    } catch {
      setUser(undefined);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

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
