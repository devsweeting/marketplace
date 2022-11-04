import { getAssetById } from '@/api/endpoints/assets';
import type { IAsset } from '@/types/assetTypes';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import { PaymentService } from '../PaymentService';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';
import { RetrieveUserInfo } from '../RetrieveUserInfo';
import { Box } from '@mui/material';

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
    void getAssetById(item.id).then((res) => {
      setOrderSummary(res);
    });
  }, [item.id]);

  const conditionalComponent = () => {
    if (!orderSummary) {
      return null;
    }
    switch (page) {
      case 0: {
        return <Cart setPage={setPage} page={page} orderSummary={orderSummary} />;
      }
      case 1: {
        return <PaymentMethods setPage={setPage} page={page} />;
      }
      case 2: {
        return <RetrieveUserInfo setPage={setPage} page={page} />;
      }
      case 3: {
        return <PaymentService setPage={setPage} page={page} orderSummary={orderSummary} />;
      }

      default: {
        return <Cart setPage={setPage} page={page} orderSummary={orderSummary} />;
      }
    }
  };
  return <Box sx={{ display: 'flex', flexDirection: 'column' }}>{conditionalComponent()}</Box>;
};
