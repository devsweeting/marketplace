import { getAssetById } from '@/api/endpoints/assets';
import { useState } from 'react';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import type { CartItem } from '@/helpers/auth/CartContext';
import { Box } from '@mui/material';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
import { OrderSummary } from '../OrderSummary';
import { RetrieveUserInfo } from '../RetrieveUserInfo';
import { StripePaymentService } from '../Stripe/StripePaymentService';

export const Conditional = ({ cartItem }: { cartItem: CartItem }) => {
  const [page, setPage] = useState(0);
  const [jumpBalance, setJumpBalance] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);
  const assetId = cartItem.assetId;

  const getOrderSummary = async (id: string, signal?: AbortSignal | undefined) => {
    if (!id) {
      return null;
    }
    const orderSummary = await getAssetById(id, signal);
    return orderSummary;
  };
  const [orderSummary, orderSummaryLoadingState] = useEndpoint(
    (signal) => getOrderSummary(assetId, signal),
    [assetId],
  );

  const conditionalComponent = () => {
    if (!orderSummary) {
      return null;
    }
    switch (page) {
      case 0: {
        return <Cart cartItem={cartItem} setPage={setPage} orderSummary={orderSummary} />;
      }
      case 1: {
        return (
          <PaymentMethods
            jumpBalance={jumpBalance}
            setJumpBalance={setJumpBalance}
            setPage={setPage}
            cartItem={cartItem}
          />
        );
      }
      case 2: {
        return <RetrieveUserInfo setPage={setPage} />;
      }
      case 3: {
        return (
          <StripePaymentService
            setPage={setPage}
            orderSummary={orderSummary}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            open={open}
            setOpen={setOpen}
            cartItem={cartItem}
          />
        );
      }

      // TODO remove this step, it's combined into the last
      // note -- still hit on the pay with "jump balance option"
      case 4: {
        return <OrderSummary cartItem={cartItem} />;
      }

      default: {
        return <Cart setPage={setPage} cartItem={cartItem} orderSummary={orderSummary} />;
      }
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {orderSummaryLoadingState === 'success' && conditionalComponent()}
    </Box>
  );
};
