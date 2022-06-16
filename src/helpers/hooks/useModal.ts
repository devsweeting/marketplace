import { useContext } from 'react';
import { ModalContext } from '@/helpers/auth/ModalContext';

export const useModal = () => {
  const context = useContext(ModalContext);

  return context;
};
