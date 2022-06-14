import { useContext } from 'react';
import { UserContext } from '@/helpers/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);

  return context.user;
};
