import type { ReactNode } from 'react';
import { useState, useContext, createContext } from 'react';
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
  openCart: () => void;
  closeCart: () => void;
  increaseCartQuantity: (id: string, quantity: number, fractionPriceCents: number) => void;
  decreaseCartQuantity: (id: string, quantity: number, fractionPriceCents: number) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('@local-cart', []);

  const cartQuantity = cartItems.reduce(
    (quantity: number, item: { quantity: number; fractionPriceCents: number }) =>
      item.quantity + quantity,
    0,
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function increaseCartQuantity(id: string, quantity: number, fractionPriceCents: number) {
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
  }

  function decreaseCartQuantity(id: string) {
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
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <Checkout isOpen={isOpen} />
    </CartContext.Provider>
  );
};
