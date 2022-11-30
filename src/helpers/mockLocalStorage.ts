import type { CartItem } from './auth/CartContext';

const localStorageMock = (function () {
  let store: { [key: string]: CartItem[] } = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: CartItem[]) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
    getAll() {
      return store;
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

export const setLocalStorage = (id: string, data: any) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
