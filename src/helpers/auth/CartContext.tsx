import type { ReactNode } from 'react';
import { useState, useContext, createContext, useCallback } from 'react';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { Checkout } from '@/components/Checkout';

type CartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: string;
  quantity: number;
  fractionPriceCents: number;
  totalPrice: number;
};

type CartContext = {
  reOpenCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  closeModal: () => void;
  increaseCartQuantity: (id: string, quantity: number, fractionPriceCents: number) => void;
  decreaseCartQuantity: (id: string, quantity: number, fractionPriceCents: number) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  isDisabled: boolean;
};

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialState = { isOpen: false, isDisabled: false };
  const [cartModalState, setCartModalState] = useState(initialState);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('@local-cart', []);

  const cartQuantity = cartItems.reduce(
    (quantity: number, item: { quantity: number; fractionPriceCents: number }) =>
      item.quantity + quantity,
    0,
  );

  const openCart = () => {
    setCartModalState({ ...cartModalState, isOpen: true });
  };

  const reOpenCart = () => {
    setCartModalState({ ...cartModalState, isDisabled: false, isOpen: true });
  };
  const closeCart = useCallback(() => {
    const newState = { ...cartModalState, isDisabled: true, isOpen: false };
    setCartModalState(newState);
    setCartItems([]);
  }, [cartModalState, setCartItems]);
  const closeModal = () => {
    const newState = { isDisabled: true, isOpen: false };
    setCartModalState(newState);
  };

  const increaseCartQuantity = useCallback(
    (id: string, quantity: number, fractionPriceCents: number) => {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
          return [
            ...currItems,
            {
              id,
              quantity: quantity,
              fractionPriceCents: fractionPriceCents,
              totalPrice: Math.ceil(quantity * (fractionPriceCents ?? 0)) / 100,
            },
          ];
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
                fractionPriceCents: item.fractionPriceCents,
                totalPrice: Math.ceil((item.quantity + 1) * (item.fractionPriceCents ?? 0)) / 100,
              };
            } else {
              return item;
            }
          });
        }
      });
    },
    [setCartItems],
  );

  const shouldBeOpen = () => {
    const cartItem = cartItems[0];

    if (cartModalState.isDisabled === false || cartItem?.id !== undefined) {
      return cartModalState.isOpen;
    }

    return false;
  };
  const decreaseCartQuantity = useCallback(
    (id: string) => {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id)?.quantity === 1) {
          return currItems.filter((item) => item.id !== id);
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity - 1,
                fractionPriceCents: item.fractionPriceCents,
                totalPrice: Math.ceil((item.quantity - 1) * (item.fractionPriceCents ?? 0)) / 100,
              };
            } else {
              return item;
            }
          });
        }
      });
    },
    [setCartItems],
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setCartItems((currItems) => {
        return currItems.filter((item) => item.id !== id);
      });
    },
    [setCartItems],
  );

  return (
    <CartContext.Provider
      value={{
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        reOpenCart,
        closeModal,
        isDisabled: cartModalState.isDisabled,
      }}
    >
      {children}
      <Checkout isOpen={shouldBeOpen()} />
    </CartContext.Provider>
  );
};
