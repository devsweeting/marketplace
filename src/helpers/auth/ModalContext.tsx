<<<<<<< HEAD
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

=======
import React, { createContext, useCallback, useEffect, useState, useMemo, Dispatch } from 'react';
=======
import type { Dispatch } from 'react';
import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';
>>>>>>> 390a7dc (fixed lint errors)

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

>>>>>>> d57d901 (open login modal on click if not logged in)
  useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
