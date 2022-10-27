import { getAssetById } from '@/api/endpoints/assets';
import type { IAsset } from '@/types/assetTypes';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { AskingPrice } from '../AskingPrice';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import { PaymentService } from '../PaymentService';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';

export const Conditional = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const [orderSummary, setOrderSummary] = useState<IAsset>();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];

  useEffect(() => {
    void getAssetById(item.id).then((asset) => setOrderSummary(asset));
  }, [item]);
  const conditionalComponent = () => {
    if (!orderSummary) {
      return;
    }
    switch (page) {
      case 0: {
        return <Cart setPage={setPage} page={page} orderSummary={orderSummary} />;
      }
      case 1: {
        return <PaymentMethods setPage={setPage} page={page} />;
      }
      case 2: {
        return <PaymentService setPage={setPage} page={page} orderSummary={orderSummary} />;
      }
      case 3: {
        return <AskingPrice setPage={setPage} page={page} />;
      }
      default: {
        return <Cart setPage={setPage} page={page} orderSummary={orderSummary} />;
      }
    }
  };
  return <>{conditionalComponent()}</>;
};
