<<<<<<< HEAD
import type { Dispatch } from 'react';
import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';

export interface IModalContext {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
}

const defaultState = {
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpen: () => {},
};

export const ModalContext = createContext<IModalContext>(defaultState);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [isOpen]);

  useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
=======
import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';

export interface IModalContext {
  toggle: () => void;
}
export const ModalContext = createContext<IModalContext>({
  toggle: () => false,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen(!open), [open]);

  const contextValue = useMemo(
    () => ({
      toggle,
    }),
    [toggle],
>>>>>>> 583b0a9 (Modal Context and provider)
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
