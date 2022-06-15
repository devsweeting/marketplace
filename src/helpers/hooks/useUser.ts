import { useContext } from 'react';
import { UserContext } from '@/helpers/auth/UserContext';

/**
 * Gets the current user from the global {@link UserContext}. Note that
 * this is only available client side shortly after initial page load.
 */
export const useUser = () => {
  const context = useContext(UserContext);

  return context.user;
};
