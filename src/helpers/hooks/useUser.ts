import { useContext } from 'react';
import { UserContext } from '@/helpers/auth/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);

  return context.user;
};
