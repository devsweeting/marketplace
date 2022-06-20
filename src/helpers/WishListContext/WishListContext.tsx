import React, { createContext, useEffect, useMemo, useReducer, useContext } from 'react';

interface IWishList {
  wishList: [
    {
      id: string;
    },
  ];
}

interface IAction {
  type: string;
  payload: any;
}

const initialWishList = {
  wishList: [
    {
      id: '',
    },
  ],
};

export const wishListReducer = (state: IWishList, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishList: {
          id: payload,
        },
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: [
          {
            id: '',
          },
        ],
      };
    default:
      return state;
  }
};

const WishListContext = createContext<{ wishList: any; setWishList: any }>({
  wishList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWishList: () => [{}],
});

export const WishListWrapper = ({ children }: { children: React.ReactNode }) => {
  const [wishList, setWishList] = useReducer(wishListReducer, initialWishList);

  const contextValue = useMemo(
    () => ({
      wishList,
      setWishList,
    }),
    [wishList, setWishList],
  );

  useEffect(() => {
    if (wishList !== initialWishList) {
      let localStorageWishList: IWishList = [];
      if (localStorage.getItem('wishList')) {
        localStorageWishList = JSON.parse(localStorage.getItem('wishList') as string);

        localStorageWishList.forEach((item: any) => {
          if (item.id === wishList.wishList.id) {
            localStorageWishList.splice(localStorageWishList.indexOf(item), 1);

            console.log('localStorageWishList', localStorageWishList);
          }
        });
      }
      localStorageWishList.push(wishList.wishList);
      localStorage.setItem('wishList', JSON.stringify(localStorageWishList));
    }
  }, [wishList]);

  return <WishListContext.Provider value={contextValue}>{children}</WishListContext.Provider>;
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListWrapper');
  }
  return context;
};
