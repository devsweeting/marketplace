import { getAssetById } from '@/api/endpoints/assets';
import { useState } from 'react';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import type { CartItem } from '@/helpers/auth/CartContext';
import { Box } from '@mui/material';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
import { StripePaymentService } from '../Stripe/StripePaymentService';
import type { UpdateIntentFunc } from '@/pages/api/stripe/paymentIntent';

export const Conditional = ({
  cartItem,
  updatePaymentIntent,
}: {
  cartItem: CartItem;
  updatePaymentIntent: UpdateIntentFunc;
}) => {
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
        return (
          <StripePaymentService
            setPage={setPage}
            orderSummary={orderSummary}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            open={open}
            setOpen={setOpen}
            cartItem={cartItem}
            updatePaymentIntent={updatePaymentIntent}
          />
        );
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
