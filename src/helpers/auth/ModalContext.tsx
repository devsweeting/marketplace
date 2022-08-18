import type { Dispatch } from 'react';
import { createContext, useCallback, useEffect, useState, useMemo } from 'react';

export interface IModalContext {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<boolean>;
}

const defaultState = {
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsModalOpen: () => {},
};

export const ModalContext = createContext<IModalContext>(defaultState);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    isModalOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isModalOpen]);

  useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
    }),
    [isModalOpen, setIsModalOpen],
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
