import { createContext, useEffect, useMemo, useReducer, useContext } from 'react';

interface IWishListState {
  wishListObj: { [key: string]: string };
}

interface IWishListAction {
  type: string;
  payload: string;
}

interface IWishListContext {
  wishListState: IWishListState;
  setWishListState: (payload: { type: string; payload: string }) => void;
}

type Props = {
  children: React.ReactNode;
};

type ILocalStorageInitialValue = [ILocalStorageItem] | any[];
type ILocalStorageItem = { id: string };

const initialWishListState = {
  wishListObj: {
    id: '',
  },
};

export const reducer = (state: IWishListState, action: IWishListAction) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishListObj: {
          ...state.wishListObj,
          id: action.payload,
        },
      };
    default:
      return state;
  }
};

const WishListContext = createContext<IWishListContext>({
  wishListState: initialWishListState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWishListState: () => {},
});

export const WishListWrapper = ({ children }: Props) => {
  const [wishListState, setWishListState] = useReducer(reducer, initialWishListState);

  const contextValue = useMemo(
    () => ({
      setWishListState,
      wishListState,
    }),
    [wishListState, setWishListState],
  );

  useEffect(() => {
    if (wishListState.wishListObj !== initialWishListState.wishListObj) {
      let localStorageInitialValue: ILocalStorageInitialValue = [];
      if (localStorage.getItem('wishList')) {
        localStorageInitialValue = JSON.parse(localStorage.getItem('wishList') as string);

        localStorageInitialValue.forEach((item: ILocalStorageItem) => {
          if (item.id === wishListState.wishListObj.id) {
            localStorageInitialValue.splice(localStorageInitialValue.indexOf(item), 1);

            console.log('localStorageWishList', localStorageInitialValue);
          }
        });
      }
      localStorageInitialValue.push(wishListState.wishListObj as ILocalStorageItem);
      localStorage.setItem('wishList', JSON.stringify(localStorageInitialValue));
    }
  }, [wishListState.wishListObj]);

  return <WishListContext.Provider value={contextValue}>{children}</WishListContext.Provider>;
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListWrapper');
  }
  return context;
};
