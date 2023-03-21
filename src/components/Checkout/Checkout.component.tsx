import Box from '@mui/material/Box';
import { alpha, Modal } from '@mui/material';
import { Conditional } from './Conditional';
import { useEffect, useRef, useState } from 'react';
import { CartItem, useCart } from '@/helpers/auth/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import usePaymentIntentStripe from '@/pages/api/stripe/paymentIntent';
import { loadStripe } from '@stripe/stripe-js';
import { useLocalStorage } from '@/helpers/hooks/useLocalStorage';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const Checkout = ({ isOpen }: { isOpen: boolean }) => {
  const { closeModal } = useCart();
  const ref = useRef(null as null | HTMLDivElement);
  const [height, setHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const [cartItems] = useLocalStorage<CartItem[]>('@local-cart', []);
  const item = cartItems[0];

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    height: 'max-content',
    maxHeight: 'calc(100% - 80px)',
    maxWidth: '1024px',

    bgcolor: 'background.paper',
    outline: 'none !important',
    overflowY: scrollHeight < height ? 'scroll' : 'auto',
  };

  useEffect(() => {
    if (ref.current != null && ref.current.clientHeight && ref.current.scrollHeight) {
      setHeight(ref.current?.clientHeight);
      setScrollHeight(ref.current.scrollHeight);
    }
  }, []);

  // ---------STRIPE INTEGRATION---------

  //returns the client secret from the Stripe Payment Intent
  const [clientSecret, setClientSecret] = useState<string | undefined>();

  useEffect(() => {
    const fetchIntent = async () => {
      const clientSecret = await usePaymentIntentStripe(item);
      setClientSecret(clientSecret);
    };
    void fetchIntent();

    return () => {
      setClientSecret(undefined);
    };
  }, []);

  // ------------------

  if (!(Object.keys(ref).length > 0) || clientSecret === undefined) {
    return null;
  }
  console.log('CLIENT SECRET mounted!', clientSecret);

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.85),
        },
      }}
    >
      <Box ref={ref} sx={style}>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
          key={clientSecret}
        >
          <Conditional clientSecret={clientSecret} />
        </Elements>
      </Box>
    </Modal>
  );
};
