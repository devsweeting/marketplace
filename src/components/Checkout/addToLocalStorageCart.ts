const CART = 'cart';
const getLocalCart = () => {
  const cart = JSON.parse(localStorage.getItem(CART) as string);
  return cart;
};
export const localCartAssetLookup = (id: string) => {
  try {
    const isThereALocalCart = localStorage.getItem(CART);
    if (isThereALocalCart) {
      const cart = getLocalCart();
      if (cart.some((asset: { id: string }) => asset.id === id)) {
        return true;
      }
    }
    return false;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const fetchAssetFromCartById = async (id: string) => {
  try {
    const cart = await getLocalCart();
    if (localCartAssetLookup(id)) {
      if (cart) {
        return cart;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
export const addAssetOnLocalCart = async (id: string, numberOfUnits: number) => {
  try {
    let cart = await getLocalCart();
    if (!localCartAssetLookup(id)) {
      if (!cart) {
        cart = [{ id: id, numberOfUnits: numberOfUnits }];
      }
      localStorage.setItem(CART, JSON.stringify(cart));
    }

    cart = [{ id: id, numberOfUnits: numberOfUnits }];

    localStorage.setItem(CART, JSON.stringify(cart));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }
};
export const removeCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(CART);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }
};
