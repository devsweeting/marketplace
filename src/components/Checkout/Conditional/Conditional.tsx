import { getAssetById } from '@/api/endpoints/assets';
import { useCart } from '@/helpers/auth/CartContext';
import type { IAsset } from '@/types/assetTypes';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { AskingPrice } from '../AskingPrice';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import { PaymentService } from '../PaymentService';

export const Conditional = ({
  page,
  setPage,
  ref,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  const [orderSummary, setOrderSummary] = useState<IAsset>();
  const { cartItems } = useCart();
  const item = cartItems[0];
  useEffect(() => {
    if (!item) {
      return;
    }
    void getAssetById(item.id).then((asset) => setOrderSummary(asset));
  }, [item]);
  const conditionalComponent = () => {
    if (!orderSummary) {
      return;
    }
    switch (page) {
      case 0: {
        return <Cart setPage={setPage} page={page} ref={ref} orderSummary={orderSummary} />;
      }
      case 1: {
        return <PaymentMethods setPage={setPage} page={page} ref={ref} />;
      }
      case 2: {
        return (
          <PaymentService setPage={setPage} page={page} ref={ref} orderSummary={orderSummary} />
        );
      }
      case 3: {
        return <AskingPrice setPage={setPage} page={page} />;
      }
      default: {
        return <Cart setPage={setPage} page={page} ref={ref} orderSummary={orderSummary} />;
      }
    }
  };
  return <>{conditionalComponent()}</>;
};
