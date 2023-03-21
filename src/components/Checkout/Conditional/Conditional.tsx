import { getAssetById } from '@/api/endpoints/assets';
import { useState } from 'react';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';
import { PaymentService } from '../PaymentService';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';
import type { CartItem } from '@/helpers/auth/CartContext';
import { Box } from '@mui/material';
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
import { OrderSummary } from '../OrderSummary';
import { RetrieveUserInfo } from '../RetrieveUserInfo';
import { CardWrapper } from '../Stripe/CardForm.styles';
import { SplitForm } from '../Stripe/CardForm.component';

export const Conditional = ({ clientSecret }: { clientSecret: string }) => {
  const [page, setPage] = useState(0);
  const [jumpBalance, setJumpBalance] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);

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
        return (
          <PaymentMethods
            jumpBalance={jumpBalance}
            setJumpBalance={setJumpBalance}
            setPage={setPage}
          />
        );
      }
      case 2: {
        return <RetrieveUserInfo setPage={setPage} />;
      }
      case 3: {
        return (
          <span>
            <PaymentService
              setPage={setPage}
              orderSummary={orderSummary}
              alertMessage={alertMessage}
              setAlertMessage={setAlertMessage}
              open={open}
              setOpen={setOpen}
            />
            <CardWrapper>
              <SplitForm clientSecret={clientSecret} />
            </CardWrapper>
          </span>
        );
      }

      case 4: {
        return (
          <OrderSummary
            setPage={setPage}
            isValid={true}
            orderSummary={orderSummary}
            setAlertMessage={setAlertMessage}
            setOpen={setOpen}
          />
        );
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
