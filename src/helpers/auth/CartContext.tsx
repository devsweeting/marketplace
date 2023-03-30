import type { ReactNode } from 'react';
import { useState, useContext, createContext, useCallback } from 'react';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import { Checkout } from '@/components/Checkout';

type CartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  name: string;
  description: string;
  assetId: string;
  sellOrderId: string;
  quantity: number;
  fractionPriceCents: number;
  totalPrice: number;
};

type CartContext = {
  reOpenCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  closeModal: () => void;
  increaseCartQuantity: (
    name: string,
    descrition: string,
    assetId: string,
    sellOrderId: string,
    quantity: number,
    fractionPriceCents: number,
  ) => void;
  decreaseCartQuantity: (
    name: string,
    descrition: string,
    assetId: string,
    sellOrderId: string,
    quantity: number,
    fractionPriceCents: number,
  ) => void;
  removeFromCart: (assetId: string) => void;
  cartQuantity: number;
  isDisabled: boolean;
  addSingleItemToCart: (
    name: string,
    descrition: string,
    assetId: string,
    sellOrderId: string,
    quantity: number,
    fractionPriceCents: number,
    totalPrice: number,
  ) => void;
};

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const initialState = { isOpen: false, isDisabled: false };

  const [cartModalState, setCartModalState] = useState(initialState);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('@local-cart', []);

  const initialCartItem = cartItems.length > 0 ? cartItems[cartItems.length - 1] : cartItems[0];

  const [cartItem, setCartItem] = useState<CartItem | null>(initialCartItem);

  const cartQuantity = cartItems.reduce(
    (quantity: number, item: { quantity: number; fractionPriceCents: number }) =>
      item.quantity + quantity,
    0,
  );

  //Declare the function to update the cart at the top of the component tree to force the CartContext to update the UI immediately.
  const addSingleItemToCart = (
    name: string,
    description: string,
    assetId: string,
    sellOrderId: string,
    quantity: number,
    fractionPriceCents: number,
    totalPrice: number,
  ) => {
    setCartItem({
      name: name,
      description: description,
      assetId: assetId,
      sellOrderId: sellOrderId,
      quantity: quantity,
      fractionPriceCents: fractionPriceCents,
      totalPrice: totalPrice,
    });
  };

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
    (
      name: string,
      description: string,
      assetId: string,
      sellOrderId: string,
      quantity: number,
      fractionPriceCents: number,
    ) => {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.assetId === assetId) == null) {
          return [
            ...currItems,
            {
              name,
              description,
              assetId,
              sellOrderId,
              quantity: quantity,
              fractionPriceCents: fractionPriceCents,
              totalPrice: Math.ceil(quantity * (fractionPriceCents ?? 0)) / 100,
            },
          ];
        } else {
          return currItems.map((item) => {
            if (item.assetId === assetId) {
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
    if (cartModalState.isDisabled === false || cartItem?.assetId !== undefined) {
      return cartModalState.isOpen;
    }
    return false;
  };

  const decreaseCartQuantity = useCallback(
    (id: string) => {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.assetId === id)?.quantity === 1) {
          return currItems.filter((item) => item.assetId !== id);
        } else {
          return currItems.map((item) => {
            if (item.assetId === id) {
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
    (assetId: string) => {
      setCartItems((currItems) => {
        return currItems.filter((item) => item.assetId !== assetId);
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
        addSingleItemToCart,
      }}
    >
      {children}
      <Checkout isOpen={shouldBeOpen()} cartItem={cartItem} />
    </CartContext.Provider>
  );
};

// NOTE -- this is the working function to update the entire cart, versus a single item.
//
// const updateCartItems = (currItems: CartItem[]) => {
//   // If an asset doesn't already exist in the cart, add it.
//   if (currItems.find((item) => item.id === asset.id) == null) {
//     return [
//       ...currItems,
//       {
//         id: asset.id,
//         quantity: sliderValue,
//         fractionPriceCents: sellOrderData?.fractionPriceCents as number,
//         totalPrice: totalPrice,
//       },
//     ];
//   } else {
//     //If the asset aready exists in cart, update its details
//     return currItems.map((item) => {
//       if (item.id === asset.id) {
//         return {
//           ...item,
//           quantity: sliderValue,
//           fractionPriceCents: sellOrderData?.fractionPriceCents as number,
//           totalPrice: totalPrice,
//         };
//       } else {
//         return item;
//       }
//     });
//   }
// };
