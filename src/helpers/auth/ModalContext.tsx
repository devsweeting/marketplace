import {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import type { Dispatch } from 'react';

export interface IModalContext {
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}

type ModalState = {
  [key: string]: boolean;
  login: boolean;
  verification: boolean;
};

type ModalAction = {
  type: 'login' | 'verification';
  visible: boolean;
};

export const ModalContext = createContext<IModalContext | undefined>(undefined);

const initialState: ModalState = {
  login: false,
  verification: false,
};

const reducer = (state: ModalState, action: ModalAction) => {
  return { ...state, [action.type]: action.visible };
};

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

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
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModalContext was used outside the provider');
  }

  return context;
}

export { ModalContextProvider, useModalContext };
