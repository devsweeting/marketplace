import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';
import type { IUser } from '../../types/user';

export interface IUserContext {
  user?: IUser;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshUser: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
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
