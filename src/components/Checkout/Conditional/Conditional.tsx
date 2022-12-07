import { getAssetById } from '@/api/endpoints/assets';
import { useState } from 'react';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import { PaymentService } from '../PaymentService';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';
import { RetrieveUserInfo } from '../RetrieveUserInfo';
import { Box } from '@mui/material';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';

export const Conditional = () => {
  const [page, setPage] = useState(0);
  // const [orderSummary, setOrderSummary] = useState<IAsset>();
  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const id = cartItems[0]?.id ?? undefined;

  const getOrderSummary = async (id: string, signal?: AbortSignal | undefined) => {
    if (!id) {
      return null;
    }
    const orderSummary = await getAssetById(id, signal);
    return orderSummary;
  };
  const [orderSummary, orderSummaryLoadingState] = useEndpoint(
    (signal) => getOrderSummary(id, signal),
    [id],
  );

  const conditionalComponent = () => {
    if (!orderSummary) {
      return null;
    }
    switch (page) {
      case 0: {
        return <Cart setPage={setPage} orderSummary={orderSummary} />;
      }
      case 1: {
        return <PaymentMethods setPage={setPage} />;
      }
      case 2: {
        return <RetrieveUserInfo setPage={setPage} />;
      }
      case 3: {
        return <PaymentService setPage={setPage} orderSummary={orderSummary} />;
      }

      default: {
        return <Cart setPage={setPage} orderSummary={orderSummary} />;
      }
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {orderSummaryLoadingState === 'success' && conditionalComponent()}
    </Box>
  );
};
